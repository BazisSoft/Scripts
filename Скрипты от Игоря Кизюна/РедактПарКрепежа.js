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

try {
  var FBDB = NewCOMObject('FBDBDialog.FBDB');
} catch (Error){
  alert('Для регистрации FBDBDialog.dll в зависимости от установленной ' +
        'версии ОС Windows необходимо выполнить одну из следующих команд:\n' +
        'WinX32: regsvr32 %windir%\\System32\\FBDBDialog.dll\n' +
        'WinX64: regsvr32 %windir%\\SysWOW64\\FBDBDialog.dll\n\n' +
        decodeURIComponent(escape(Error.message)));
  Action.Cancel();
};

const Автоматически = 0;
const Сквозное = 1;
const Глухое = 2;
var VTModelTree = Action.Control.Owner.Owner.dpModelTree.Components[3].VTModelTree;
var DrillModes = new Array('Автоматически', 'Сквозное', 'Глухое');
var Objects = new Object();
var Selection = new Array();
var Highlighted = new Array();
var SelObjects = new Array();

function SetSelection(List) {
  Model.UnHighlightAll();
  Model.UnSelectAll();
  for (var i = 0; i < List.length; i++) {
    List[i].Selected = true;
  };
};

function SetHighlighted(List) {
  Model.UnHighlightAll();
  for (var i = 0; i < List.length; i++) {
    List[i].Highlighted = true;
  };
};

function CompareHole(A, B) {
  if (A.DrillMode != B.DrillMode) {
    return false;
  } else {
    switch (true) {
      case A.DrillMode == Автоматически:
      case A.DrillMode == Глухое:
        if (A.Diameter.toFixed(3) != B.Diameter.toFixed(3)   ||
            A.Depth.toFixed(3) != B.Depth.toFixed(3)) return false
        break;
      case A.DrillMode == Сквозное:
        if (A.Diameter.toFixed(3) != B.Diameter.toFixed(3)) return false;
        break;
    };
   };
  return true;
};

function CompareHoles(A, B) {
  if (A.Holes.Count == B.Holes.Count &&
      A.ForEstimate == B.ForEstimate) {
    var ElementsA = A.GetParams('AdvParamData').FindNode('Elements');
    var ElementsB = B.GetParams('AdvParamData').FindNode('Elements');
    if (ElementsA && ElementsB) {
      if (ElementsA.Count == ElementsB.Count) {
        for (var j = 0; j < ElementsA.Count; j++) {
          if (ElementsA[j].Value != ElementsB[j].Value) return false;
        };
      } else {
        return false;
      };
    } else if ((!ElementsA && ElementsB)  || (ElementsA && !ElementsB)) {
      return false;
    };
    for (var i = 0; i < A.Holes.Count; i++) {
      if (!CompareHole(A.Holes.Items[i], B.Holes.Items[i])) return false;
    };
    return true;
  }
  return false;
};

function GetFBDBDialog(Control) {
  var Result = FBDB.Dialog(ConnectionString);
  if (Result) {
    switch (true) {
      case Result.split('\r')[1] != '':
        Control.Value = Result;
        break;
      default:
        Control.Value = Result.split('\r')[0];
        break;
    };
  };
};

function ReadParameters(Control) {
  var Result = Control.Value.replace(/\*|{|\[|\\|\/|х|:|;|ч|ж/gim, 'x').
                             replace(/ /gim, '').
                             replace(/,|<|>|б|ю/gim, '.').
                             replace(/[^\.x0-9]/gim, '').
                             replace(/\.{1,}/gim, '.').
                             replace(/x{1,}/gim, 'x').
                             split(/x/);
  for (var i = 0; i < Result.length; i++) {
    if (!isNaN(parseFloat(Result[i]))) {
      Result[i] = parseFloat(Result[i]);
    } else {
      alert('Введенное значение не распознано');
      return false;
    };
  };
  return Result;
};

function DeleteHoles() {
  for (var Key in Objects) {
    var List = Objects[Key];
    for (var i = 0; i < List.length; i++) {
      for (var j = 0; j < List[i].Holes.Count; j++) {
        switch (List[i].Holes.List[j].DrillMode) {
          case Автоматически:
          case Глухое:
            if (!List[i].Holes.List[j].Diameter &&
                !List[i].Holes.List[j].Depth) {
              List[i].Holes.Remove(List[i].Holes.List[j]);
              j--;
            };
            break;
          case Сквозное:
            if (!List[i].Holes.List[j].Diameter) {
              List[i].Holes.Remove(List[i].Holes.List[j]);
              j--;
            };
            break;
        };
      };
      List[i].DrillHoles();
    };
  };
  Model.UpdateScene();
};

function SetParameters(Control) {
  system.log('SetParameters');
  var List = Objects[Control.Name];
  for (var i = 0; i < Control.Count; i++) {
    switch (typeof(Control[i].Value)) {
      case 'string':
        var Parameters = ReadParameters(Control[i]);
        switch (true) {
          case Parameters.length > 1:
            if (Control[i][0].ItemIndex == 1) {
              Control[i][0].ItemIndex = 0;
              Control[i][0].Value = DrillModes[0];
            };
            Control[i].Value = Parameters.join('x').replace(/\./g, ',');
            for (var j = 0; j < List.length; j++) {
              with (List[j].Holes.List[i]) {
                Diameter  = Parameters[0];
                Depth     = Parameters[1];
                DrillMode = Control[i][0].ItemIndex;
              };
              List[j].DrillHoles();
            };
            break;
          case Parameters.length == 1:
            if (Control[i][0].ItemIndex != 1) {
              Control[i][0].ItemIndex = 1;
              Control[i][0].Value = DrillModes[1];
            };
            Control[i].Value = Parameters[0].toString().replace(/\./g, ',');
            for (var j = 0; j < List.length; j++) {
              with (List[j].Holes.List[i]) {
                Diameter  = Parameters[0];
                DrillMode = Control[i][0].ItemIndex;
              };
              List[j].DrillHoles();
            };
            break;
        };
        break;
      case 'boolean':
        for (var j = 0; j < List.length; j++) {
          List[j].ForEstimate = Control[i].Value;
          if (List[j].ForEstimate) {
            List[j].Name = Control.Value;
          } else {
            if (List[j].Holes.Count == 1) {
              List[j].Name = Parameters.join('x').replace(/\./g, ',');
            } else {
              List[j].Name = Control.Value;
            };
          };
        };
        break;
      default:
        SetElements(List, ToArray(Control[i]));
        break;
    };
  };
  Model.UpdateScene();
};

function ToArray(Object) {
  var Result = new Array();
  for (var i = 0; i < Object.Count; i++) {
    if (Object[i].Value) Result.push(Object[i].Value);
  };
  return Result;
};

function SetElements(List, Array) {
  system.log('SetElements');
  for (var i = 0; i < List.length; i++) {
    var AdvParamData = List[i].GetParams('AdvParamData');
    var Elements = AdvParamData.FindNode('Elements');
    if (Array.length) {
      if (!Elements) {
        Elements = AdvParamData.NodeNew('Elements');
      } else {
        Elements.Clear();
      };
      for (var j = 0; j < Array.length; j++) {
        Elements.NodeNew().Value = Array[j];
      };
    } else {
      if (Elements) AdvParamData.DeleteNode('Elements');
    };
  };
  VTModelTree.Refresh();
};

function GetElements(Control, List) {
  Control.Clear();
  for (var i = 0; i < List.length; i++) {
    eval(
     'Control.NewSelector(' + (i + 1) + ', List[' + i + ']);                        \n' +
     'Control[' + i + '].OnClick = function() {                                     \n' +
     '  GetFBDBDialog(Control[' + i + ']);                                          \n' +
     '};                                                                            \n' +
     'Control[' + i + '].PopupMenu.NewButton("Править: " + Control[' + i + '].Name);\n' +
     'Control[' + i + '].PopupMenu[0].OnClick = function() {                        \n' +
     '  var Result = prompt("Введите наименование");                                \n' +
     '  if (Result != "" && Result != Control[' + i + '].Value) {                   \n' +
     '    Control[' + i + '].Value = Result;                                        \n' +
     '  };                                                                          \n' +
     '};                                                                            \n' +
     'Control[' + i + '].OnActivate = function() {                                  \n' +
     '  SetSelection(Objects[Control.Owner.Name]);                                  \n' +
     '};                                                                            \n' +
     'Control[' + i + '].OnValueChange = function() {                               \n' +
     '  if (!Control[' + i + '].Value) {                                            \n' +
     '    SetElements(Objects[Control.Owner.Name], ToArray(Control));               \n' +
     '    GetElements(Control, ToArray(Control));                                   \n' +
     '  } else {                                                                    \n' +
     '    Control[' + i + '].PopupMenu[0].Value = Control[' + i + '].Value;         \n' +
     '    SetParameters(Control.Owner);                                             \n' +
     '  };                                                                          \n' +
     '};                                                                              '
    );
  };
};

function GetParameters(Control) {
  var Object = Objects[Control.Name][0];
  with (Object.Holes) {
    for (var j = 0; j < Count; j++) {
      switch (List[j].DrillMode) {
        case Автоматически:
        case Глухое:
          var Name = (parseFloat(List[j].Diameter.toFixed(12)) + 'x' +
                      parseFloat(List[j].Depth.toFixed(12))).toString().replace(/\./g, ',');
          break;
        case Сквозное:
          var Name = parseFloat(List[j].Diameter.toFixed(12)).toString().replace(/\./g, ',');
          break;
      };
      eval(
       'Control.NewString(Name, Name);                                      \n' +
       'Control[' + j + '].Expanded = false;                                \n' +
       'Control[' + j + '].OnValueChange = function() {                     \n' +
       '  SetParameters(Control);                                           \n' +
       '};                                                                  \n' +
       'Control[' + j + '].OnActivate = function() {                        \n' +
       '  SetSelection(Objects[Control.Name]);                              \n' +
       '};                                                                  \n' +
       'Control[' + j + '].NewCombo("Тип отв.", DrillModes.join("\\n"));    \n' +
       'Control[' + j + '][0].ItemIndex = List[' + j + '].DrillMode;        \n' +
       'Control[' + j + '][0].Value = DrillModes[List[' + j + '].DrillMode];\n' +
       'Control[' + j + '][0].OnValueChange = function() {                  \n' +
       '  SetParameters(Control);                                           \n' +
       '};                                                                  \n' +
       'Control[' + j + '][0].OnActivate = function() {                     \n' +
       '  SetSelection(Objects[Control.Name]);                              \n' +
       '};                                                                    '
      );
    };
  };
  var i = new Number(Control.Count);
  Control.NewBool('Учитывать в смете:', Object.ForEstimate);
  Control[i].OnValueChange = function() {
    SetParameters(Control);
  };
  i++;
  Control.NewButton('Добавить').Name = 'Составные части:';
  Control[i].Expanded = false;
  Control[i].OnClick = function() {
    GetFBDBDialog(Control[i].NewSelector((Control[i].Count + 1)));
    if (!Control[i][Control[i].Count - 1].Value) {
      var Result = prompt("Введите наименование");
      if (Result != '') {
        Control[i][Control[i].Count - 1].Value = Result;
      };
    };
    GetElements(Control[i], ToArray(Control[i]));
    SetElements(Objects[Control.Name], ToArray(Control[i]));
  };
  var Elements = Object.GetParams('AdvParamData').FindNode('Elements');
  if (Elements) {
    GetElements(Control[i], ToArray(Elements));
  };
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

for (var i = 0; i < Model.SelectionCount; i++) {
  Selection.push(Model.Selections[i]);
  if (Model.Selections[i].List === true) {
    SelObjects = SelObjects.concat(ListToArray(Model.Selections[i]));
  } else {
    SelObjects.push(Model.Selections[i]);
  };
};

for (var i = 0; i < Model.HighlightCount; i++) {
  Highlighted.push(Model.Highlights[i]);
  if (Model.Highlights[i].List === true) {
    SelObjects = SelObjects.concat(ListToArray(Model.Highlights[i]));
  } else {
    SelObjects.push(Model.Highlights[i]);
  };
};

for (var i = 0; i < SelObjects.length; i++) {
  if (SelObjects[i] == '[object TFastener]') {
    var j = new Number();
    var ObjectName = SelObjects[i].Name.split(/\r/)[0] + '#' + j;
    while (typeof(Objects[ObjectName]) != 'undefined' &&
           !CompareHoles(SelObjects[i], Objects[ObjectName][0])) {
      j++;
      ObjectName = SelObjects[i].Name.split(/\r/)[0] + '#' + j;
    };
    if (typeof(Objects[ObjectName]) == 'undefined') {
      Objects[ObjectName] = new Array();
    };
    if (Objects[ObjectName].length) {
      if (CompareHoles(SelObjects[i], Objects[ObjectName][0])) {
        Objects[ObjectName].push(SelObjects[i]);
      };
    } else {
      Objects[ObjectName].push(SelObjects[i]);
    };
  };
};

var Controls = Action.Properties;
var i = new Number();
for (var Key in Objects) {
  eval(
   'Controls.NewSelector(Key, Objects[Key][0].Name);                 \n' +
   'Controls[' + i + '].CanClear = false;                            \n' +
   'Controls[' + i + '].Expanded = false;                            \n' +
   'GetParameters(Controls[' + i + ']);                              \n' +
   'Controls[' + i + '].PopupMenu.NewButton("Править: Наименование");\n' +
   'Controls[' + i + '].PopupMenu[0].OnClick = function() {          \n' +
   '  var Result = prompt("Введите наименование");                   \n' +
   '  if (Result != "" && Result != Controls[' + i + '].Value) {     \n' +
   '    Controls[' + i + '].Value = Result;                          \n' +
   '  };                                                             \n' +
   '};                                                               \n' +
   'Controls[' + i + '].OnActivate = function() {                    \n' +
   '  SetSelection(Objects[Controls[' + i + '].Name]);               \n' +
   '};                                                               \n' +
   'Controls[' + i + '].OnClick = function() {                       \n' +
   '  GetFBDBDialog(Controls[' + i + ']);                            \n' +
   '};                                                               \n' +
   'Controls[' + i + '].OnValueChange = function() {                 \n' +
   '  SetParameters(Controls[' + i + ']);                            \n' +
   '};                                                                 '
   );
  i++;
};

Delete = Controls.NewBool('Удалять отв. равные Нулю:');

Controls.NewButton('Завершить').OnClick = function() {
  Action.Finish();
};

Action.OnFinish = function() {
  if (Delete.Value) DeleteHoles();
  SetSelection(Selection);
  SetHighlighted(Highlighted);
};

Action.Continue();