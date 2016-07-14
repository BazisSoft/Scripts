var Controls  = Action.Properties;
var Items     = new Array();
var Selection = new Array();
var RepMat    = /(\s*) \(Артикул ([^(Артикул )]*)\)/;
var Objects   = {
      Panels: {
        Items:  new Object(),
        Owners: new Object()
      },
      Butts:  {
        Items:  new Object(),
        Owners: new Object()
      },
      Cuts:   {
        Items:  new Object(),
        Owners: new Object()
      }
    };
var MainForm       = NewForm();
MainForm.Width     = 400;
MainForm.Height    = 41;
MainForm.Caption   = 'Редактировать наименование';
MainForm.Resizable = false;
MainForm.Dockable  = false;

function ReadIniFile(FileName) {
  var Data = system.readTextFile(FileName);
  var Regex = {
        Section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        Param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        Comment: /^\s*;.*$/
      };
  var Value = {};
  var Lines = Data.split(/\r\n|\r|\n/);
  var Section = null;
  Lines.forEach(function(Line) {
    if (Regex.Comment.test(Line)) {
      return;
    } else if (Regex.Param.test(Line)) {
      var Match = Line.match(Regex.Param);
      if (Section) {
        Value[Section][Match[1]] = Match[2];
      } else {
        Value[Match[1]] = Match[2];
      };
    } else if (Regex.Section.test(Line)) {
      var Match = Line.match(Regex.Section);
      Value[Match[1]] = {};
      Section = Match[1];
    } else if (Line.length == 0 && Section) {
      Section = null;
    };
  });
  return Value;
};

if (!system.fileExists('ADODB.ini')) {
  alert('Не найден файл (ADODB.ini) с настройками для подключения к БД!');
  Action.Cancel();
} else {
  var IniFile = ReadIniFile('ADODB.ini');
  if (!system.fileExists(IniFile['General']['FBCFile'])) {
    alert('Настройки подключения к БД указанные в файле (ADODB.ini)' +
          ' не являются верными!');
    Action.Cancel();
  };
};

var ConnectionString = 'Driver={Firebird/InterBase(r) driver};' +
                       'Dbname=' + IniFile['General']['FDBServ'] + '/'
                                 + IniFile['General']['FBSPort'] + ':'
                                 + IniFile['General']['FDBFile'] + ';' +
                       'CHARSET=NONE;' +
                       'PWD=masterkey;' +
                       'UID=SYSDBA;' +
                       'Client=' + IniFile['General']['FBCFile'];
var Query = 'Select\n' +
            '  MATERIAL_ADVANCE.LABEL_EDGE,\n' +
            '  MATERIAL.NAME_MAT\n' +
            'From\n' +
            '  MATERIAL_ADVANCE Inner Join\n' +
            '  MATERIAL On MATERIAL.ID_M = MATERIAL_ADVANCE.ID_M';
var Connection = NewCOMObject('ADODB.Connection');
var Recordset  = NewCOMObject('ADODB.Recordset');

try {
  Connection.Open(ConnectionString);
  Recordset.ActiveConnection = Connection;
  Recordset.Open(Query);
} catch(Error) {
  Recordset.Close;
  Connection.Close;
  alert(decodeURIComponent(escape(Error.message)));
  Action.Cancel();
};

Array.prototype.ObjectInArray = function(Object) {
  for (var i = 0; i < this.length; i++) {
    if (this[i].UID == Object.UID) return true;
  };
  return false;
};

function SetSelection(List) {
  Model.UnSelectAll();
  for (var i = 0; i < List.length; i++) {
    List[i].Selected = true;
  };
};

function EqualsMaterial(A, B) {
  switch (true) {
    case (B instanceof TFurnPanel):
    case (B instanceof TExtrusionBody):
    case (B instanceof T2DTrajectoryBody):
      if (A.MaterialName  == B.MaterialName &&
          A.MaterialWidth == B.MaterialWidth &&
          A.Thickness     == B.Thickness) {
        return true;
      };
      break;
    case (B instanceof TFurnPlastic):
      if (A.MaterialName  == B.Material &&
          A.MaterialWidth == B.MaterialWidth &&
          A.Thickness     == B.Thickness) {
        return true;
      };
      break;
  };
  return false;
};

function EqualsPlastic(A, B) {
  switch (true) {
    case (B instanceof TFurnPanel):
    case (B instanceof TExtrusionBody):
    case (B instanceof T2DTrajectoryBody):
      if (A.Material      == B.MaterialName &&
          A.MaterialWidth == B.MaterialWidth &&
          A.Thickness     == B.Thickness) {
        return true;
      };
      break;
    case (B instanceof TFurnPlastic):
      if (A.Material      == B.Material &&
          A.MaterialWidth == B.MaterialWidth &&
          A.Thickness     == B.Thickness) {
        return true;
      };
      break;
  };
  return false;
};

function EqualsButts(A, B) {
  if (A.Material  == B.Material &&
      A.Width     == B.Width &&
      A.Thickness == B.Thickness &&
      A.Sign      == B.Sign) {
    return true;
  };
  return false;
};

function EqualsCuts(A, B) {
  if (A.Name == B.Name &&
      A.Sign == B.Sign) {
    return true;
  };
  return false;
};

function ListToArray(List) {
  var Result = new Array();
  for (var i = 0; i < List.Count; i++) {
    if (List[i].List === true) {
      Result = Result.concat(ListToArray(List[i]));
    } else {
      Result.push(List[i]);
    };
  };
  return Result;
};

function SetMaterials(Control) {
  system.log('SetMaterials');
  Panels = Objects.Panels.Items[Control.Name];
  Owners = Objects.Panels.Owners[Control.Name];
  for (var i = 0; i < Owners.length; i++) {
    StartEditing(Owners[i]);
  };
  for (var i = 0; i < Panels.length; i++) {
    switch (true) {
      case (Panels[i] instanceof TFurnPanel):
      case (Panels[i] instanceof TExtrusionBody):
      case (Panels[i] instanceof T2DTrajectoryBody):
        Panels[i].MaterialName = Control.Value;
        break;
      case (Panels[i] instanceof TFurnPlastic):
        Panels[i].Material     = Control.Value;
        break;
    };
    if (!(Panels[i] instanceof T2DTrajectoryBody)) {
      Panels[i].Thickness      = Control[1].Value;
    } else {
      system.log('T2DTrajectoryBody');
    };
    Panels[i].MaterialWidth    = Control[2].Value;
  };
  for (var i = 0; i < Owners.length; i++) {
    Owners[i].Build();
  };
};

function SetButts(Control) {
  system.log('SetButts');
  Butts =  Objects.Butts.Items[Control.Name];
  Owners = Objects.Butts.Owners[Control.Name];
  for (var i = 0; i < Owners.length; i++) {
    StartEditing(Owners[i]);
  };
  for (var i = 0; i < Butts.length; i++) {
    Butts[i].Material  = Control.Value;
    Butts[i].Thickness = Control[1].Value;
    Butts[i].Width     = Control[2].Value;
    Butts[i].Sign      = Control[3].Value;
  };
  for (var i = 0; i < Owners.length; i++) {
    Owners[i].Build();
  };
};

function SetCuts(Control) {
  system.log('SetCuts');
  Cuts   =  Objects.Cuts.Items[Control.Name];
  Owners = Objects.Cuts.Owners[Control.Name];
  for (var i = 0; i < Owners.length; i++) {
    StartEditing(Owners[i]);
  };
  for (var i = 0; i < Cuts.length; i++) {
    Cuts[i].Name = Control.Value;
    Cuts[i].Sign = Control[0].Value;
  };
  for (var i = 0; i < Owners.length; i++) {
    Owners[i].Build();
  };
};

function EditMaterialName(Control) {
  MainForm.Properties.Clear();
  MainForm.String = MainForm.Properties.NewString('', Control.Value);
  MainForm.String.SetLayout(0, 0, MainForm.Width, 22);
  MainForm.String.OnValueChange = function() {
    Control.Value = MainForm.String.Value;
  };
  MainForm.Show(WindowPosition.Default);
};

function GetSign(Control) {
  system.log('GetSign');
  var Result = new String();
  Recordset.Filter = "(NAME_MAT = '" + Control.Value.split(/\r/)[0] + "')";
  while (Recordset.EOF == 0) {
    Result = Recordset.Fields.Item('LABEL_EDGE').Value;
    Recordset.MoveNext();
  };
  return Result;
};

Action.OnFinish = function() {
  system.log('OnFinish');
  SetSelection(Selection);
  try {
    Recordset.Close;
    Connection.Close;
  } catch(Error) {
    alert(decodeURIComponent(escape(Error.message)));
  };
};

if (Model.Selected) {
  for (var i = 0; i < Model.SelectionCount; i++) {
    Selection.push(Model.Selections[i]);
    if (Model.Selections[i].List === true) {
      Items = Items.concat(ListToArray(Model.Selections[i]));
    } else {
      Items.push(Model.Selections[i]);
    };
  };
} else {
  if (confirm('Редактировать все панели модели?')) {
    Items = ListToArray(Model);
  } else {
    Action.Cancel();
  };
};

var j   = new Number();
var Key = new String();
for (var i = 0; i < Items.length; i++) {
  switch (true) {
    case (Items[i] instanceof TFurnPanel):
    case (Items[i] instanceof TExtrusionBody):
    case (Items[i] instanceof T2DTrajectoryBody):
      if (Items[i].MaterialName) {
        j   = 0;
        Key = Items[i].MaterialName.split(/\r/)[0] + '#' + j;
        while (Objects.Panels.Items[Key]  != undefined &&
               Objects.Panels.Owners[Key] != undefined &&
               !EqualsMaterial(Items[i], Objects.Panels.Items[Key][0])) {
          j++;
          Key = Items[i].MaterialName.split(/\r/)[0] + '#' + j;
        };
        if (Objects.Panels.Items[Key] == undefined) {
          Objects.Panels.Items[Key]  = new Array();
          Objects.Panels.Owners[Key] = new Array();
        };
        Objects.Panels.Items[Key].push(Items[i]);
        if (!Objects.Panels.Owners[Key].ObjectInArray(Items[i])) {
          Objects.Panels.Owners[Key].push(Items[i]);
        };
      };
      if (Items[i].Plastics) {
        for (var n = 0; n < Items[i].Plastics.Count; n++) {
          j   = 0;
          Key = Items[i].Plastics[n].Material.split(/\r/)[0] + '#' + j;
          while (Objects.Panels.Items[Key]  != undefined &&
                 Objects.Panels.Owners[Key] != undefined &&
                 !EqualsPlastic(Items[i].Plastics[n], Objects.Panels.Items[Key][0])) {
            j++;
            Key = Items[i].Plastics[n].Material.split(/\r/)[0] + '#' + j;
          };
          if (Objects.Panels.Items[Key]  == undefined &&
              Objects.Panels.Owners[Key] == undefined) {
            Objects.Panels.Items[Key]  = new Array();
            Objects.Panels.Owners[Key] = new Array();
          };
          Objects.Panels.Items[Key].push(Items[i].Plastics[n]);
          if (!Objects.Panels.Owners[Key].ObjectInArray(Items[i])) {
            Objects.Panels.Owners[Key].push(Items[i]);
          };
        };
      };
      if (Items[i].Butts) {
        for (var k = 0; k < Items[i].Butts.Count; k++) {
          j   = 0;
          Key = Items[i].Butts[k].Material.split(/\r/)[0] + '#' + j;
          while (Objects.Butts.Items[Key]  != undefined &&
                 Objects.Butts.Owners[Key] != undefined &&
                 !EqualsButts(Items[i].Butts[k], Objects.Butts.Items[Key][0])) {
            j++;
            Key = Items[i].Butts[k].Material.split(/\r/)[0] + '#' + j;
          };
          if (Objects.Butts.Items[Key]  == undefined &&
              Objects.Butts.Owners[Key] == undefined) {
            Objects.Butts.Items[Key]  = new Array();
            Objects.Butts.Owners[Key] = new Array();
          };
          Objects.Butts.Items[Key].push(Items[i].Butts[k]);
          if (!Objects.Butts.Owners[Key].ObjectInArray(Items[i])) {
            Objects.Butts.Owners[Key].push(Items[i]);
          };
        };
      };
      if (Items[i].Cuts) {
        for (var m = 0; m < Items[i].Cuts.Count; m++) {
          j   = 0;
          Key = Items[i].Cuts[m].Name.split(/\r/)[0] + '#' + j;
          while (Objects.Cuts.Items[Key]  != undefined &&
                 Objects.Cuts.Owners[Key] != undefined &&
                 !EqualsCuts(Items[i].Cuts[m], Objects.Cuts.Items[Key][0])) {
            j++;
            Key = Items[i].Cuts[m].Name.split(/\r/)[0] + '#' + j;
          };
          if (Objects.Cuts.Items[Key]  == undefined &&
              Objects.Cuts.Owners[Key] == undefined) {
            Objects.Cuts.Items[Key]  = new Array();
            Objects.Cuts.Owners[Key] = new Array();
          };
          Objects.Cuts.Items[Key].push(Items[i].Cuts[m]);
          if (!Objects.Cuts.Owners[Key].ObjectInArray(Items[i])) {
            Objects.Cuts.Owners[Key].push(Items[i]);
          };
        };
      };
      break;
  };
};

var i = new Number();
for (var Key in Objects.Panels.Items) {
  switch (true) {
    case (Objects.Panels.Items[Key][0] instanceof TFurnPanel):
    case (Objects.Panels.Items[Key][0] instanceof TExtrusionBody):
    case (Objects.Panels.Items[Key][0] instanceof T2DTrajectoryBody):
      Controls.NewSelector(Key, Objects.Panels.Items[Key][0].MaterialName).CanClear = false;
      break;
    case (Objects.Panels.Items[Key][0] instanceof TFurnPlastic):
      Controls.NewSelector(Key, Objects.Panels.Items[Key][0].Material).CanClear = false;
      break;
  };
  Controls[i].Expanded = false;
  Controls[i].NewMaterial('Материал:').Visible = false;
  Controls[i].NewNumber('Толщина:', Objects.Panels.Items[Key][0].Thickness);
  Controls[i].NewNumber('Ширина:', Objects.Panels.Items[Key][0].MaterialWidth);
  Controls[i].PopupMenu.NewButton('Править: наименование');
  eval(
    'Controls[' + i + '].OnClick = function() {                              \n' +
    '  Controls[' + i + '][0].Click();                                       \n' +
    '};                                                                      \n' +
    'Controls[' + i + '].PopupMenu[0].OnClick = function() {                 \n' +
    '  EditMaterialName(Controls[' + i + ']);                                \n' +
    '};                                                                      \n' +
    'Controls[' + i + '][0].OnValueChange = function() {                     \n' +
    '  Controls[' + i + '].Value    = Controls[' + i + '][0].ValueToString().\n' +
    '    replace(RepMat, "$1\\r$2");                                         \n' +
    '  Controls[' + i + '][1].Value = Controls[' + i + '][0].Thickness;      \n' +
    '  Controls[' + i + '][2].Value = Controls[' + i + '][0].Width;          \n' +
    '};                                                                      \n' +
    'Controls[' + i + '].OnChange = function() {                             \n' +
    '  SetMaterials(Controls[' + i + ']);                                    \n' +
    '};                                                                      \n' +
    'Controls[' + i + '].OnActivate = function() {                           \n' +
    '  SetSelection(Objects.Panels.Owners[Controls[' + i + '].Name]);        \n' +
    '};                                                                      \n' +
    'Controls[' + i + '][1].OnActivate = function() {                        \n' +
    '  SetSelection(Objects.Panels.Owners[Controls[' + i + '].Name]);        \n' +
    '};                                                                      \n' +
    'Controls[' + i + '][2].OnActivate = function() {                        \n' +
    '  SetSelection(Objects.Panels.Owners[Controls[' + i + '].Name]);        \n' +
    '};                                                                        '
  );
  i++;
};

for (var Key in Objects.Butts.Items) {
  Controls.NewSelector(Key, Objects.Butts.Items[Key][0].Material).CanClear = false;
  Controls[i].Expanded = false;
  Controls[i].NewButt('Кромка:').Visible = false;
  Controls[i].NewNumber('Толщина:', Objects.Butts.Items[Key][0].Thickness);
  Controls[i].NewNumber('Ширина:', Objects.Butts.Items[Key][0].Width);
  Controls[i].NewString('Обозначение:', Objects.Butts.Items[Key][0].Sign);
  Controls[i].PopupMenu.NewButton('Править: наименование');
  eval(
    'Controls[' + i + '].OnClick = function() {                              \n' +
    '  Controls[' + i + '][0].Click();                                       \n' +
    '};                                                                      \n' +
    'Controls[' + i + '].PopupMenu[0].OnClick = function() {                 \n' +
    '  EditMaterialName(Controls[' + i + ']);                                \n' +
    '};                                                                      \n' +
    'Controls[' + i + '][0].OnValueChange = function() {                     \n' +
    '  Controls[' + i + '].Value    = Controls[' + i + '][0].ValueToString().\n' +
    '    replace(RepMat, "$1\\r$2");                                         \n' +
    '  Controls[' + i + '][1].Value = Controls[' + i + '][0].Thickness;      \n' +
    '  Controls[' + i + '][2].Value = Controls[' + i + '][0].Width;          \n' +
    '  Controls[' + i + '][3].Value = GetSign(Controls[' + i + ']);          \n' +
    '};                                                                      \n' +
    'Controls[' + i + '].OnChange = function() {                             \n' +
    '  SetButts(Controls[' + i + ']);                                        \n' +
    '};                                                                      \n' +
    'Controls[' + i + '].OnActivate = function() {                           \n' +
    '  SetSelection(Objects.Butts.Owners[Controls[' + i + '].Name]);         \n' +
    '};                                                                      \n' +
    'Controls[' + i + '][1].OnActivate = function() {                        \n' +
    '  SetSelection(Objects.Butts.Owners[Controls[' + i + '].Name]);         \n' +
    '};                                                                      \n' +
    'Controls[' + i + '][2].OnActivate = function() {                        \n' +
    '  SetSelection(Objects.Butts.Owners[Controls[' + i + '].Name]);         \n' +
    '};                                                                      \n' +
    'Controls[' + i + '][3].OnActivate = function() {                        \n' +
    '  SetSelection(Objects.Butts.Owners[Controls[' + i + '].Name]);         \n' +
    '};                                                                        '
  );
  i++;
};

for (var Key in Objects.Cuts.Items) {
  Controls.NewCombo(Key, Objects.Cuts.Items[Key][0].Name);
  Controls[i].Expanded = false;
  Controls[i].NewString('Обозначение:', Objects.Cuts.Items[Key][0].Sign);
  Controls[i].PopupMenu.NewButton('Править: наименование');
  eval (
    'Controls[' + i + '].PopupMenu[0].OnClick = function() {                 \n' +
    '  EditMaterialName(Controls[' + i + ']);                                \n' +
    '};                                                                      \n' +
    'Controls[' + i + '].OnChange = function() {                             \n' +
    '  SetCuts(Controls[' + i + ']);                                         \n' +
    '};                                                                      \n' +
    'Controls[' + i + '].OnActivate = function() {                           \n' +
    '  SetSelection(Objects.Cuts.Owners[Controls[' + i + '].Name]);          \n' +
    '};                                                                      \n' +
    'Controls[' + i + '][0].OnActivate = function() {                        \n' +
    '  SetSelection(Objects.Cuts.Owners[Controls[' + i + '].Name]);          \n' +
    '};                                                                        '
  );
  i++;
};

Controls.NewButton('Завершить').OnClick = function() {
  Action.Commit();
  Action.Finish();
};

Action.Continue();