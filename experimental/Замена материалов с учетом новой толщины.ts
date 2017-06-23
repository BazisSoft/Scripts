/*
 * Данный скрипт заменяет материал в модели с учетом толщины:
 * если толщина нового материала отличается от толщины старого,
 * модель автоматичеси перестроится
 */
// создание формы
let changeform = NewForm();
changeform.Caption = "Замена материала";
changeform.CancelButton = true;
changeform.OKButton = true;
changeform.Height = 367;
changeform.Width = 399;
let OldMatGroup = changeform.Properties.NewGroup("Старый материал");
OldMatGroup.Align = AlignType.Client;
OldMatGroup.SetLayout(1, 1, 132, 234);
let NewMatGroup = changeform.Properties.NewGroup("Новый материал");
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

/** Заполнение формы компонентами */
function FillForm() {

    Model.forEachPanel(panel => {
        let panelMat = panel.MaterialName;
        if (!materialChanges.ChangeExists(panelMat)) {
            materialChanges.changes.push(new MaterialChange(panelMat));
        }
    })
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
    materialChanges.ClearEmpty();
    Model.forEachPanel(panel => {
        let change = materialChanges.FindChange(panel.MaterialName);
        if (change) {
            let thicknessDiff = change.newMatThickness - panel.Thickness;
            panels.push(new PanelChange(panel, change.newMatName));
            transformer.AddPanelThicknessChange(panel, thicknessDiff);
        }
    })
    transformer.Compute(true);
}

/**
 * Применение изменений и перестроение модели
 */
function Apply() {
    panels.forEach(panelChange => {
        let panel = panelChange.panel;
        Undo.Changing(panel);
        panel.MaterialName = panelChange.newMatName;
    })
    transformer.Apply(Undo);
    Action.Commit();
    transformer.ClearChangesInfo();
}

changeform.OnOkButtonClick = () => {
    Compute();
    Apply();
}
changeform.OnClose = ()=>{
    Action.Finish();
}

FillForm();

changeform.Show();