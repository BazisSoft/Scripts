//-- window WindowInfo
WindowInfo = {Form : NewForm()};
Props = WindowInfo.Form.Properties;
WindowInfo.Form.Width = 320;
WindowInfo.Form.Height = 401;
WindowInfo.Form.Caption   = 'Информация';
WindowInfo.Form.OKButton  = true;
WindowInfo.Form.Resizable = false;
//-- window WindowInfo properties
WindowInfo.ImageTable = Props.NewImage('Таблица', 'ТаблСоотвМДФ.jpg');
WindowInfo.ImageTable.SetLayout(0, 0, 319, 347);
//-- window WindowInfo events
//-- window WindowInfo ends

Prop = Action.Properties;
Furniture = Prop.NewFurniture('Эластичный фрагмент:');
Furniture.Store = false;
DeleteFlag  = Prop.NewBool('Удалять оригиналы', true);
VisibleFlag = Prop.NewBool('Видимость оригиналов', false);
SelectNew   = Prop.NewBool('Выделить новые', true);

Prop.NewButton('Таб. соотв. ЛДСП -> МДФ').OnClick = function() {
  WindowInfo.Form.ShowModal();
};

Prop.Load('ЗаменаПанелейСборок.xml');

var Connection = NewCOMObject('ADODB.Connection');
var RecordSet = NewCOMObject('ADODB.Recordset');

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

var Material = {
  MaterialName: new String(),
  Thickness: new Number(),
  TexOrient: new Number(),
  IsButts: new Boolean(),
  Butt: {
    MaterialName: new String(), //материал
    Thickness: new Number(), //толщина
    Sign: new String(), //обозначение
    ClipPanel: new Boolean(), //подрезать
    Overhung: new Number(), //свес
    Allowance: new Number() //припуск
  }
};

Materials = new Array();
Panels = new Array();
Selection = new Array();
Replacement = new Array();

function SetSelectionVisible(Value) {
  for (var i = 0; i < Selection.length; i++) {
    Selection[i].Visible = Value;
    Selection[i].Selected = Value;
  };
};

function DeleteSelection() {
  for (var i = 0; i < Selection.length; i++)
    DeleteObject(Selection[i]);
  Selection = new Array();
};

if (!Model.Selected) {
  Model.Selected = GetObject("Укажите объект для замены");
};

for (var i = 0; i < Model.SelectionCount; i++) {
  Selection.push(Model.Selections[i]);
};

Prop.NewButton('Завершить').OnClick = function() {
  var bazis9 = system.apiVersion >= 90;
  for (var i = 0; i < Selection.length; i++) {
    Replacement[i].Owner = Selection[i].Owner;
    var index = 0;
    if (bazis9) {
      index = Selection[i].OwnerIndex;
    };
    Replacement[i].ReTransform(Model, Selection[i].Owner);
    Selection[i].Visible = true;
    if (DeleteFlag.Value) {
      DeleteObject(Selection[i]);
    };
    if (bazis9) {
      Replacement[i].OwnerIndex = index;
    };
    Undo.Added(Replacement[i]);
  };
  Selection = new Array();
  if (SelectNew.Value) {
    for (var i = 0; i < Replacement.length; i++) {
      Replacement[i].Selected = true;
    };
  };
  Action.Finish();
};

Action.OnStart = function() {
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
  var Query = 'Select\n' +
              '  MATERIAL.NAME_MAT, ' +
              '  MATERIAL.ARTICLE, ' +
              '  MATERIAL_ADVANCE.THICKNESS, ' +
              '  MATERIAL_ADVANCE.OVERHANG, ' +
              '  MATERIAL_ADVANCE.LABEL_EDGE\n' +
              'From\n' +
              '  MATERIAL Inner Join\n' +
              '  MATERIAL_ADVANCE On MATERIAL.ID_M = MATERIAL_ADVANCE.ID_M';
  var ConnectionString = 'Driver={Firebird/InterBase(r) driver};' +
                         'Dbname=' + IniFile['General']['FDBServ'] + '/'
                                   + IniFile['General']['FBSPort'] + ':'
                                   + IniFile['General']['FDBFile'] + ';' +
                         'CHARSET=NONE;' +
                         'PWD=masterkey;' +
                         'UID=SYSDBA;' +
                         'Client=' + IniFile['General']['FBCFile'];
  try {
    Connection.Open(ConnectionString);
    RecordSet.ActiveConnection = Connection;
    RecordSet.Open(Query);
  } catch(Error) {
    RecordSet.Close;
    Connection.Close;
    alert(decodeURIComponent(escape(Error.message)));
    Action.Cancel();
  };
};

Action.OnFinish = function() {
  SetSelectionVisible(true);
  Prop.Save('ЗаменаПанелейСборок.xml');
  try {
    RecordSet.Close;
    Connection.Close;
  } catch(Error) {
    //alert(decodeURIComponent(escape(Error.message)));
  };
};

function GetMaterials(obj) {
  if (obj.toString() == '[object TFurnBlock]' ||
      obj.toString() == '[object TDraftBlock]' ||
      obj.toString() == '[object TFurnAsm]') {
    for (var i = 0; i < obj.Count; i++) {
      GetMaterials(obj[i]);
    };
  } else {
    if (obj.MaterialWidth <= 0) {
      Material.MaterialName = obj.MaterialName;
      Material.Thickness = obj.Thickness;
      Material.TexOrient = obj.TextureOrientation;
      Material.IsButts = false;
      for (var i = 0; i < obj.Butts.Count; i++) {
        if (obj.Butts.Butts[i].Profile == null) {
          Material.IsButts = true;
          Material.Butt.MaterialName = obj.Butts.Butts[i].Material;
          Material.Butt.Allowance = obj.Butts.Butts[i].Allowance;
          Material.Butt.ClipPanel = obj.Butts.Butts[i].ClipPanel;
          Material.Butt.Overhung = obj.Butts.Butts[i].Overhung;
          Material.Butt.Sign = obj.Butts.Butts[i].Sign;
          Material.Butt.Thickness = obj.Butts.Butts[i].Thickness;
        };
      };
      Materials.push(Material);
    };
  };
};

function SetMaterial(obj) {
  if (obj.toString() == '[object TFurnBlock]' ||
      obj.toString() == '[object TDraftBlock]' ||
      obj.toString() == '[object TFurnAsm]') {
    for (var i = 0; i < obj.Count; i++) {
      SetMaterial(obj[i]);
    };
  } else {
    for (var i = 0; i < Materials.length; i++) {
      if (obj.MaterialWidth <= 0) {
        if (Materials[i].Thickness == obj.Thickness && Materials[i].IsButts == true) {
          for (var j = 0; j < obj.Butts.Count; j++) {
            if (obj.Butts.Butts[j].Profile == null) {
              obj.Butts.Butts[j].Material = Materials[i].Butt.MaterialName;
              obj.Butts.Butts[j].Allowance = Materials[i].Butt.Allowance;
              obj.Butts.Butts[j].ClipPanel = Materials[i].Butt.ClipPanel;
              obj.Butts.Butts[j].Overhung = Materials[i].Butt.Overhung;
              obj.Butts.Butts[j].Sign = Materials[i].Butt.Sign;
              obj.Butts.Butts[j].Thickness = Materials[i].Butt.Thickness;
            };
          };
        } else if (obj.Butts.Count > 0) {
          if (obj.Butts.Butts[0].Material.match(/\(([^()]*)\)/) !== null &&
              Materials[i].MaterialName.match(/\{([^{}]*)\}/) !== null) {
            Records = new Array();
            Par = obj.Butts.Butts[0].Material.match(/\(([^()]*)\)/)[0];
            Art = Materials[i].MaterialName.match(/\{([^{}]*)\}/)[1];
            RecordSet.Filter = "(NAME_MAT LIKE '%" + Par + "%') AND " +
                               "(NAME_MAT LIKE '%" + Art + "%')";
            system.log("(NAME_MAT LIKE '%" + Par + "%') AND " +
                       "(NAME_MAT LIKE '%" + Art + "%')");
            while(RecordSet.EOF == 0) {
              if (RecordSet.Fields.Item('ARTICLE').Value !== null &&
			            RecordSet.Fields.Item('ARTICLE').Value.length > 0) {
                Material.Butt.MaterialName = RecordSet.Fields.Item('NAME_MAT').Value + '\r' +
                                             RecordSet.Fields.Item('ARTICLE').Value;
              } else {
                Material.Butt.MaterialName = RecordSet.Fields.Item('NAME_MAT').Value;
              };
              Material.Butt.Overhung = RecordSet.Fields.Item('OVERHANG').Value;
              Material.Butt.Sign = RecordSet.Fields.Item('LABEL_EDGE').Value;
              Material.Butt.Thickness = RecordSet.Fields.Item('THICKNESS').Value;
              Records.push(Material.Butt);
              RecordSet.MoveNext();
            };
            if (Records.length > 0) {
              for (var k = 0; k < obj.Butts.Count; k++) {
                if (obj.Butts.Butts[k].Profile == null) {
                obj.Butts.Butts[k].Material = Records[0].MaterialName;
                obj.Butts.Butts[k].Overhung = Records[0].Overhung;
                obj.Butts.Butts[k].Sign = Records[0].Sign;
                obj.Butts.Butts[k].Thickness = Records[0].Thickness;
                };
              };
            };
          };
        };
        if (Materials[i].Thickness == obj.Thickness) {
          obj.MaterialName = Materials[i].MaterialName;
          obj.Thickness = Materials[i].Thickness;
          obj.TextureOrientation = Materials[i].TexOrient;
        } else {
          if(Materials[i].MaterialName.match(/\{([^{}]*)\}/) !== null) {
            Records = new Array();
            Par = obj.Thickness.toString().replace(/\./, ',');
            Art = Materials[i].MaterialName.match(/\{([^{}]*)\}/)[0];
            RecordSet.Filter = "(NAME_MAT LIKE '%" + Art + "%') AND " +
                               "(THICKNESS = " + Par + ")";
            system.log("(NAME_MAT LIKE '%" + Art + "%') AND " +
                       "(THICKNESS = " + Par + ")");
            while(RecordSet.EOF == 0) {
              if (RecordSet.Fields.Item('ARTICLE').Value !== null &&
			      RecordSet.Fields.Item('ARTICLE').Value.length > 0) {
                Records.push(RecordSet.Fields.Item('NAME_MAT').Value + '\r' +
                             RecordSet.Fields.Item('ARTICLE').Value);
              } else {
                Records.push(RecordSet.Fields.Item('NAME_MAT').Value);
              };
              RecordSet.MoveNext();
            };
            if (Records.length > 0) {
              obj.MaterialName = Records[0];
              obj.TextureOrientation = Materials[i].TexOrient;
            };
          };
        };
      };
    };
  };
};

Prop.OnChange = function() {
  DeleteNewObjects();
  Replacement = new Array();
  SetSelectionVisible(VisibleFlag.Value);
  Panel = AddPanel(100, 100);
  for (var i = 0; i < Selection.length; i++) {
    Materials = new Array();
    obj = Selection[i];
    Fasad = Furniture.Value.Mount1(Panel, NewVector(0, 0, 0), 0);
    Fasad.ElasticResize(obj.GSize);
    //Fasad.Position = obj.ToGlobal(obj.GMin);
    //Fasad.Rotation = obj.Rotation;
    if (obj.Owner.toString() == '[object TFurnBlock]' ||
        obj.Owner.toString() == '[object TDraftBlock]' ||
        obj.Owner.toString() == '[object TFurnAsm]') {
      Fasad.AssignTransform(obj);
      Fasad.ReTransform(obj.Owner, Model);
    } else {
      Fasad.Position = obj.ToGlobal(obj.GMin);
      Fasad.Rotation = obj.Rotation;
    };
    GetMaterials(obj);
    SetMaterial(Fasad);
    Fasad.Build();
    Replacement.push(Fasad);
  };
  Panel.Free();
};

Action.Continue();