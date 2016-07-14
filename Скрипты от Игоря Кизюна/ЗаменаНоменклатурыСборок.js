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

var Objects = new Object();
var VTModelTree = Action.Control.Owner.Owner.dpModelTree.Components[3].VTModelTree;

function SetSelection(Control) {
  var List = Objects[Control.Name];
  UnSelectAll();
  for (var i = 0; i < List.length; i++) {
    List[i].Selected = true;
  };
};

function SetParameter(Control) {
  var List = Objects[Control.Name];
  for (var i = 0; i < List.length; i++) {
    Undo.Changing(List[i]);
    List[i].Name = Control.Value;
  };
  VTModelTree.Refresh();
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

Model.forEach(function(Object) {
  if ((Object == '[object TFurnAsm]' ||
       Object == '[object TAsmKit]') &&
      (Object.Owner != '[object TFurnAsm]' &&
       Object.Owner != '[object TAsmKit]')) {
    var ObjectName = Object.Name.split('\r')[0];
    if(typeof(Objects[ObjectName]) == 'undefined') {
      Objects[ObjectName] = new Array();
    };
    Objects[ObjectName].push(Object);
  };
});

var i = new Number();
for (var Key in Objects) {
  var NewSelector =
  'Selector' + i + '= Action.Properties.NewSelector(Key, Objects[Key][0].Name);\n' +
  'Selector' + i + '.CanClear = false;                                         \n' +
  'Selector' + i + '.OnActivate = function() {                                 \n' +
  '  SetSelection(Selector' + i + ');                                          \n' +
  '};                                                                          \n' +
  'Selector' + i + '.OnClick = function() {                                    \n' +
  '  GetFBDBDialog(Selector' + i + ');                                         \n' +
  '};                                                                          \n' +
  'Selector' + i + '.OnValueChange = function() {                              \n' +
  '  SetParameter(Selector' + i + ');                                          \n' +
  '};                                                                            ';
  eval(NewSelector);
  i++;
};

Action.Properties.NewButton('Завершить').OnClick = function() {
  Action.Finish();
};

Action.Continue();