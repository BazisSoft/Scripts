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
     * @param newScheme 
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
                element.joint.JointBlock.Owner = Model.Temp;
            }
        });
    }
}
/**
 * Проверка, является ли параметр схемой
 * @param param параметрический крепеж
 */
function ParamIsScheme(param: ParamFastener | InfFurniture) {
    if (param) {
        if (param.DatumMode)
            return param.DatumMode == fdmJoint;
        else if (param.GetInfo)
            return param.GetInfo().Params.DatumMode == fdmJoint;
    }
    return false;
}

/**
 * Блок временных объектов стыка
 */
let edgeBlock = BeginBlock('edges');
EndBlock();

let cnt = Model.SelectionCount;
let infoList = new JointList();
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
        if (jointInfo.JointType != pjtUnknown)
            jointInfo.DrawLines();
    }
};

Action.OnClick = () => {
    let edge = Model.DS.FindEdge(edgeBlock, Action.MousePos, 5);
    if (edge) {
        for (let i = 0; i < infoList.length; i++) {
            let info = infoList[i];
            if (info.joint.SelectEdge(edge)) {
                break;
            }
        }
    }
}

Action.Continue();
Action.OnFinish = () => {
    Action.OnDraw = null;
}

let furnSel = Action.Properties.NewFurniture('Схема');
furnSel.OnChange = () => {
    let newScheme = furnSel.Value;
    if (ParamIsScheme(newScheme)) {
        infoList.SetScheme(newScheme.GetInfo().Params);
        finishBtn.Visible = true;
    }
    else {
        alert('Выберите схему крепежа');
        furnSel.ClearValue();
    }
}
NewButtonInput('Предпросмотр').OnChange = () => {
    infoList.MakePreview();
}
let finishBtn = NewButtonInput('Закончить');
finishBtn.Visible = false;
finishBtn.OnChange = () => {
    // удаление блока со вспомогательными объектами
    DeleteObject(edgeBlock);
    Action.Finish();
}