/*
 * Данный скрипт заменяет материал в модели с учетом толщины:
 * если толщина нового материала отличается от толщины старого,
 * модель автоматичеси перестроится
 */
// создание формы
let changeform = NewForm();
let changeSelected = changeform.Properties.NewBool("Заменять на выделенных панелях");
changeSelected.Align = AlignType.Top;
changeSelected.Visible = changeSelected.Value = Model.SelectionCount > 0;
changeSelected.SetLayout(1, 0, 100, 22);
changeform.Caption = "Замена материала";
changeform.CancelButton = true;
changeform.OKButton = true;
changeform.Height = 359;
changeform.Width = 367;
let AllGroup = changeform.Properties.NewGroup('');
AllGroup.SetLayout(1, 30, 365, 274);
AllGroup.Align = AlignType.Client;
let OldMatGroup = AllGroup.NewGroup("Старый материал");
OldMatGroup.Align = AlignType.Client;
OldMatGroup.SetLayout(1, 1, 149, 311);
let NewMatGroup = AllGroup.NewGroup("Новый материал");
NewMatGroup.Align = AlignType.Right;
NewMatGroup.SetLayout(150, 1, 248, 311);

/**
 * Класс, отвечающий за хранение соответствий типа
 * "старый материал" -> "новый материал"
 */
class MaterialChange {
    constructor(prevMaterial: string) {
        this.prevMatName = prevMaterial;
    }
    /**
     * Наименование "старого" материала
     */
    prevMatName: string;
    /**
     * Наименование "нового" материала
     */
    newMatName: string | undefined;
    /**
     * Толщина "нового" материала
     */
    newMatThickness: number;
}

/**
 * Класс, хранящий список соответствий
 */
class MatChanges {
    /**
     * Список соответствий "старого" и "нового" материалов
     */
    changes: Array<MaterialChange> = [];
    ChangeExists(matName: string): boolean {
        let result = false;
        this.changes.forEach(change => {
            if (change.prevMatName === matName)
                result = true;
        })
        return result;
    }
    FindChange(matName: string): MaterialChange | undefined {
        let index = this.FindChangeIndex(matName);
        if (index > -1) {
            return this.changes[index];
        }
        return undefined;
    }
    FindChangeIndex(matName: string): number {
        for (let i = 0; i < this.changes.length; i++) {
            if (this.changes[i].prevMatName === matName) {
                return i;
            }
        }
        return -1;
    }
    ClearEmpty(){
        let changes = this.changes;
        for (let i = changes.length - 1; i > -1; i--){
            if (!changes[i].newMatName){
                changes.splice(i, 1);
            }
        }
    }
}
/** список соответствий старого и нового материалов */
let materialChanges = new MatChanges;

/**
 * Трансформер, отвечающий за перестроение модели при изменении толщины материала
 */
var transformer = NewModelTransformer();
// Выставляем максимальный выступ у углового соединения "Торец-Пласть" в 3 мм.
// Это значит, что Г-образное соединение будет считаться угловым 
// если выступ/отступ панели, соединяемой пластью, не превышает 3 мм.
transformer.CornerMaxOffset = 3;

/** Заполнение формы компонентами */
function FillForm() {
    OldMatGroup.Clear();
    NewMatGroup.Clear();
    materialChanges.changes.splice(0);

    function AddChange(panel: Panel){
        let panelMat = panel.MaterialName;
        if (!materialChanges.ChangeExists(panelMat)) {
            materialChanges.changes.push(new MaterialChange(panelMat));
        }
    }
    if (changeSelected.Value){
        function CheckObject(obj: Object3){
            if (obj.AsPanel)
                AddChange(<Panel>obj);
            else if (obj.List){
                let list = obj.AsList();
                for (let i = 0; i < list.Count; i++){
                    CheckObject(list[i]);
                }
            }
        }
        for (let i = 0; i < Model.SelectionCount; i++){
            CheckObject(Model.Selections[i]);
        }
    }
    else{
        Model.forEachPanel(AddChange);
    }
    let pos = 0;
    const posIncrement = 30;        
    materialChanges.changes.forEach(change => {
        /**Текстовое поле с наименованием старого материала */
        let oldLabel = OldMatGroup.NewLabel(FormatMatName(change.prevMatName));
        oldLabel.Align = AlignType.Top;
        oldLabel.AlignWithMargins = true;
        oldLabel.Top = pos;
        /**Поле выбора нового материала */
        let newMatSelector = NewMatGroup.NewMaterial('');
        newMatSelector.Align = AlignType.Top;
        newMatSelector.AlignWithMargins = true;
        newMatSelector.MaterialName = '';
        newMatSelector.Top = pos;
        newMatSelector.OnChange = () => {
            change.newMatName = newMatSelector.MaterialName;
            change.newMatThickness = newMatSelector.Thickness
        }
        pos += posIncrement;
    })
}
/**Класс, содержащий соответствие между новым */
class PanelChange{
    constructor(panel: Panel, newMatName: string){
        this.panel = panel;
        this.newMatName = newMatName;
    }
    panel: Panel;
    newMatName: string;
}
let panels: PanelChange[] = [];
/**
 * Вычисление будущих изменений
 */
function Compute(){
    function ComputePanel(panel: Panel){        
        let change = materialChanges.FindChange(panel.MaterialName);
        if (change) {
            let thicknessDiff = change.newMatThickness - panel.Thickness;
            panels.push(new PanelChange(panel, change.newMatName));
            transformer.AddPanelThicknessChange(panel, thicknessDiff);
        }
    }

    materialChanges.ClearEmpty();
    if (changeSelected.Value){

        function ComputeObject(obj: Object3){
            let panel = obj.AsPanel;
            if (panel){
                ComputePanel(panel);
            }
            else if (obj.List){
                let list = obj.AsList();
                for (let k = 0; k < list.Count; k++){
                    ComputeObject(list[k]);
                }
            }
        }

        for (let i = 0; i < Model.SelectionCount; i++){
            ComputeObject(Model.Selections[i]);
        }
    }
    else{
        Model.forEachPanel(ComputePanel)
    }
    transformer.Compute(true);
}

/**
 * Применение изменений и перестроение модели
 */
function Apply() {
    Model.UnSelectAll();
    panels.forEach(panelChange => {
        let panel = panelChange.panel;
        Undo.Changing(panel);
        panel.MaterialName = panelChange.newMatName;
        panel.Selected = true;
    })
    transformer.Apply(Undo);
    Action.Commit();
    transformer.ClearChangesInfo();
}

FillForm();

changeform.OnOkButtonClick = () => {
    Compute();
    Apply();
}
changeform.OnClose = ()=>{
    Action.Finish();
}

changeSelected.OnChange = ()=>{
    FillForm();
}

changeform.Show();