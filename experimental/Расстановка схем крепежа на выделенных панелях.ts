/**
 * Стадии расстановки
 */
enum ActionStage {
    /**
     * Удаление лишних стыков
     */
    DeleteExcessJoints,
    /**
     * Выбор ребра монтирования
     */
    ChangingEdges
}

/**
 * Класс, отвечающий за установку стыка
 */
class JointMaker {
    /**
     * Стык
     */
    joint: AdvancedJoint;
    /**
     * Информация о стыке
     */
    info: JointInfo;

    constructor(newInfo: JointInfo) {
        this.info = newInfo;
        this.joint = NewAdvancedJoint(newInfo);
        this.info.SetEdgesOwner(edgeBlock);
    };
    /**
     * Установить новую схему для стыка
     * @param newScheme 
     */
    SetScheme(newScheme: ParamFastener): boolean {
        this.joint.Scheme = newScheme;
        return true;
    }
    /** 
     * Смонтировать стык
     */
    MakePreview() {
        this.joint.Mount();
    }
};
/**
 * Список стыков
 */
class JointList extends Array<JointMaker>{
    /**
     * Установить схему для всех стыков в списке
     * @param newScheme Новая схема
     */
    SetScheme(newScheme: ParamFastener) {
        this.forEach(element => {
            element.SetScheme(newScheme);
        });
    }
    /**
     * Предпросмотр стыков
     */
    MakePreview() {
        this.forEach(element => {
            if (element.info.JointType != pjtUnknown) {
                element.joint.Mount();
            }
        });
    }
}
/**
 * Проверка, является ли параметрический крепеж схемой
 * @param param параметрический крепеж
 */
function ParamIsScheme(param: ParamFastener | InfFurniture) {
    if (param) {
        if (param.GetInfo)
            param = param.GetInfo().Params;
        return param && param.DatumMode == fdmJoint && param.IsValid();
    }
    return false;
}

/**
 * имя файла с настройками
 */
const settingsFilename = 'jointSettings.xml';
function LoadSettings(){
    if (system.fileExists(settingsFilename)){
        return Action.Properties.Load(settingsFilename);
    }
}
function SaveSettings(){
    Action.Properties.Save(settingsFilename);
}

/**
 * Блок временных объектов стыка
 */
let edgeBlock = BeginBlock('edges');
EndBlock();

let CurStage = ActionStage.DeleteExcessJoints;
let cnt = Model.SelectionCount;
let infoList = new JointList();
let removedList = new JointList();
for (let i = 0; i < cnt; i++) {
    let obj = Model.Selections[i];
    for (let k = i + 1; k < cnt; k++) {
        let obj2 = Model.Selections[k]
        let info = NewJointInfo(obj, obj2);
        if (info) {
            for (let j = 0; j < info.JointCount; j++) {
                if (info.Joints[j].JointType != pjtUnknown)
                    infoList.push(new JointMaker(info.Joints[j]));
            }
        }
    }
}

Action.OnDraw = function () {
    for (let i = 0; i < infoList.length; i++) {
        let info = infoList[i];
        let jointInfo = info.info;
        if (removedList.indexOf(info) < 0)
            jointInfo.Draw(selectedColor.Value);
        else if (CurStage == ActionStage.DeleteExcessJoints)
            jointInfo.Draw(removedColor.Value);
    }
};
Model.UnSelectAll();

Action.OnClick = () => {
    if (CurStage == ActionStage.DeleteExcessJoints){
        let minDist = -1;
        let result: JointMaker = null;
        for (let i = 0; i < infoList.length; i++) {
            let jointInfo = infoList[i];
            let dist = jointInfo.info.RayIntersect(Action.MouseX, Action.MouseY);
            //если не найдено пересечение продолжаем цикл
            if (dist < 0)
                continue;
            if (!result || (dist < minDist)){
                minDist = dist;
                result = jointInfo;
            }
        }
        if (result){
            let index = removedList.indexOf(result)
            if (index > -1){
                removedList.splice(index, 1);
            }
            else{
                removedList.push(result);
            }
        }
    }
    if (CurStage == ActionStage.ChangingEdges){
        let edge = Model.DS.FindEdge(edgeBlock, Action.MousePos, 5);
        let found = false;
        if (edge) {
            for (let i = 0; i < infoList.length; i++) {
                let info = infoList[i];
                if (info.joint.SelectEdge(edge)) {
                    found = true;
                    break;
                }
            }
        }
        if (found)
            infoList.MakePreview();
    }
}

Action.Continue();
Action.OnFinish = () => {
    // удаление блока со вспомогательными объектами
    DeleteObject(edgeBlock);
    Action.OnDraw = null;
    SaveSettings();
}

let furnSel = Action.Properties.NewFurniture('Схема');
furnSel.OnChange = () => {
    const msg = 'Выберите схему крепежа';
    let newScheme = furnSel.Value;
    if (ParamIsScheme(newScheme)) {
        infoList.SetScheme(newScheme.GetInfo().Params);
        if (Action.Hint == msg)
            Action.Hint = '';
    }
    else {
        Action.Hint = msg;
        furnSel.ClearValue();
    }
    if (CurStage == ActionStage.ChangingEdges){
        infoList.MakePreview();
    }
}

let selectedColor = Action.Properties.NewColor('Цвет активных стыков');
// информация о цветах.
// http://docwiki.embarcadero.com/RADStudio/Seattle/en/Colors_in_the_VCL
selectedColor.Value = 0xFF00FF; // пурпурный
let removedColor = Action.Properties.NewColor('Цвет неактивных стыков');
removedColor.Value = 0x808080; // Темно-серый
selectedColor.OnValueChange = removedColor.OnValueChange = Action.OnDraw;
if (LoadSettings()){
    let newScheme = furnSel.Value;
    if (newScheme && ParamIsScheme(newScheme)){
        infoList.SetScheme(newScheme.GetInfo().Params);
    }
    else{
        furnSel.ClearValue();
    }
}

let countStr = Action.Properties.NewNumber('Количество стыков');
countStr.Value = infoList.length;

let mountSelectedBtn = NewButtonInput('Монтировать выделенные стыки');
mountSelectedBtn.OnChange = () =>{
    removedList.forEach(element => {
        let index = infoList.indexOf(element);
        if (index >= 0){
            infoList.splice(index, 1);
        }
    });
    mountSelectedBtn.Visible = false;
    clearMountedBtn.Visible = false;
    CurStage = ActionStage.ChangingEdges;

    let finishBtn = NewButtonInput('Закончить');
    finishBtn.OnChange = () => {
        Action.Finish();
    }    
    infoList.MakePreview();
    countStr.Value = infoList.length;
}

let clearMountedBtn = NewButtonInput('Удалить стыки, имеющие крепеж');
clearMountedBtn.OnChange = () =>{
    for( let i = infoList.length - 1; i > -1; i--){
        let jointInfo = infoList[i];
        if (jointInfo.joint.Info.JointExtrusion.FindConnectedFasteners().length > 0){
            infoList.splice(i, 1);
        }
    }
    countStr.Value = infoList.length;
}