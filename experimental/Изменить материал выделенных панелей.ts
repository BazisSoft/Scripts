/**
 * класс - информация о панели
 */
class PanelInfo {
  panel: Panel;
  //редакторы изменения толщины
  /*
   * левый: в сторону локального -z
   */
  editorLeft: ValueEditor;
  /**
   * правый: в сторону локального +z
   */
  editorRight: ValueEditor;
  thicknessDiff: number;
  //конструктор класса
  constructor(p: Panel) {
    this.panel = p;
    this.editorLeft = NewValueEditor(0);
    this.editorLeft.Visible = false;
    this.editorLeft.Text = 0;
    this.editorRight = NewValueEditor(0);
    this.editorRight.Visible = false;
    this.editorRight.Text = 0;
  }
}

/**
 * массив всех информаций о панели
 */
class PanelsInfo extends Array<PanelInfo>{
}

/**
 * функция поиска информации о панели по ValueEditor
 */
function FindEditor(edit: ValueEditor) {
  let found = false;
  let isLeft = false;
  for (let k = 0; k < panels.length; k++) {
    let info = panels[k];
    if (info.editorLeft == edit) {
      found = true;
      isLeft = true;
    }
    else if (info.editorRight == edit) {
      found = true;
    }
    if (found) {
      return {
        left: isLeft,
        panelInfo: info
      };
    }
  }
  return undefined;
}

/**
 * функция заполнения информации об изменении толщины панели
 */
function MakeInfo() {
  let autoExists: boolean = (transformer.TestVersion) && transformer.TestVersion() > 0;
  for (let i = 0; i < panels.length; i++) {
    let info = panels[i];
    let panel = info.panel;
    let thicknessDiff = ActiveMaterial.Thickness - panel.Thickness;
    info.thicknessDiff = thicknessDiff;
    transformer.AddPanelThicknessChange(panel, thicknessDiff);
    info.editorLeft.Visible = true;
    info.editorLeft.Readonly = false;
    info.editorRight.Visible = true;
    info.editorRight.Readonly = false;
    if (!autoExists) {
      info.editorLeft.Value = -transformer.PanelShift[panel];
      info.editorRight.Value = thicknessDiff - info.editorLeft.Value;
    }
  }
  if (autoExists) {
    transformer.Compute(true);
    for (let i = 0; i < panels.length; i++) {
      let info = panels[i];
      info.editorLeft.Value = -transformer.PanelShift[info.panel];
      info.editorRight.Value = info.thicknessDiff - info.editorLeft.Value;
    }
  }
}

/**
 * Перерасчет позиции ValueEditor на экране
 * @param info 
 */
function ResetEditPos(info: PanelInfo) {
  let panel = info.panel;
  var localPosLeft = panel.GMin;
  var localPosRight = panel.GMin;
  //отступ левого и правого ValueEditor от GMin панели
  var indent = Model.DS.MillimetersInPixel() * (50);
  localPosLeft.z -= indent;
  var pos = panel.ToGlobal(localPosLeft);
  info.editorLeft.Position = Model.DS.ToScreen(pos)

  localPosRight.z += indent;
  pos = panel.ToGlobal(localPosRight);
  info.editorRight.Position = Model.DS.ToScreen(pos)
}

/**
 * применение изменений
 */
function ApplyChanges() {
  for (let i = 0; i < panels.length; i++) {
    panels[i].panel.MaterialName = ActiveMaterial.Name;
  }
  transformer.Apply(Undo);
  Action.Commit();
}

var transformer = NewModelTransformer();

/*second variant*/
var panel;
Action.Continue();

var FinishSelecting = false;

NewButtonInput('Отменить').OnChange = () => {
  Action.Cancel();
}

NewButtonInput('Закончить').OnChange = () => {
  ApplyChanges();
  Action.Finish();
}

let panels = new PanelsInfo();

for (var i = 0; i < Model.SelectionCount; i++) {
  let panel = Model.Selections[i].AsPanel;
  if (panel) {
    let newInfo = new PanelInfo(panel);
    panels.push(newInfo);
  }
}

let matInput = NewMaterialInput('Новый материал');
matInput.OnChange = () => {
  ActiveMaterial.Make(matInput.Name, matInput.Thickness);
  //обработка события отрисовки
  Action.OnDraw = function () {
    for (let k = 0; k < panels.length; k++)
      ResetEditPos(panels[k]);
  }
  MakeInfo();
}

//обработчик изменения значения в ValueEditor
Action.OnValueChange = () => {
  let searchResult = FindEditor(Action.ActionValueEditor)
  let info = searchResult.panelInfo;
  let thicknessDiff = info.thicknessDiff;
  let left = info.editorLeft;
  let right = info.editorRight;
  let panel = info.panel;

  /*if (searchResult){
    let edit = ? info.editorLeft : info.editorRight;
  }*/
  if (searchResult.left) {
    if (thicknessDiff > 0) {
      if (left.Value < 0)
        left.Value = 0;
      if (left.Value > thicknessDiff)
        left.Value = thicknessDiff;
    }
    else {
      if (left.Value > 0)
        left.Value = 0;
      if (left.Value < thicknessDiff)
        left.Value = thicknessDiff;
    }

    transformer.PanelShift[panel] = - left.Value;
    right.Value = thicknessDiff - left.Value;
  }
  else {
    if (thicknessDiff > 0) {
      if (right.Value < 0)
        right.Value = 0;
      if (right.Value > thicknessDiff)
        right.Value = thicknessDiff;
    } else {
      if (right.Value > 0)
        right.Value = 0;
      if (right.Value < thicknessDiff)
        right.Value = thicknessDiff;
    }

    left.Value = thicknessDiff - right.Value;
    transformer.PanelShift[panel] = - left.Value;
  }
}