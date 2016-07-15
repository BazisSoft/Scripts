const C_VIOLET = 16711819;
const C_DEFAULT = 536870911;
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
var MaterialQuery =    'Select\n' +
                       '  MATERIAL.ID_M, MATERIAL.NAME_MAT, MATERIAL.ARTICLE\n' +
                       'From\n' +
                       '  MATERIAL\n' +
                       'Order By\n' +
                       '  MATERIAL.NAME_MAT';
var AdvanceQuery =     'Select\n' +
                       '  MATERIAL_ADVANCE.ID_M, MATERIAL_ADVANCE.THICKNESS, ' +
                       '  MATERIAL_ADVANCE.LABEL_EDGE\n' +
                       'From\n' +
                       '  MATERIAL_ADVANCE\n' +
                       'Order By\n' +
                       '  MATERIAL_ADVANCE.ID_M';
var ConnectionString = 'Driver={Firebird/InterBase(r) driver};' +
                       'Dbname=' + IniFile['General']['FDBServ'] + '/'
                                 + IniFile['General']['FBSPort'] + ':'
                                 + IniFile['General']['FDBFile'] + ';' +
                       'CHARSET=NONE;' +
                       'PWD=masterkey;' +
                       'UID=SYSDBA;' +
                       'Client=' + IniFile['General']['FBCFile'];
var Connection = NewCOMObject('ADODB.Connection');
var MaterialRS = NewCOMObject('ADODB.Recordset');
var AdvanceRS = NewCOMObject('ADODB.Recordset');
try {
  Connection.Open(ConnectionString);
  MaterialRS.ActiveConnection = Connection;
  MaterialRS.Open(MaterialQuery);
  AdvanceRS.ActiveConnection = Connection;
  AdvanceRS.Open(AdvanceQuery);
} catch(Error) {
  MaterialRS.Close;
  AdvanceRS.Close;
  Connection.Close;
  alert(decodeURIComponent(escape(Error.message)));
  Action.Cancel();
};
function IsInArray(Value, Array) {
  for (var i = 0; i < Array.length; i++) {
    if (Array[i] == Value) {
      return true;
    };
  };
  return false;
};
function RadiansToAngle(Radians) {
  return 180 / Math.PI * Radians
};
function NotAllButts(Object, MatName) {
  var ElemIndexes = new Array();
  for (var i = 0; i < Object.Butts.Count; i++) {
    if (Object.Butts.Butts[i].Material.match(MatName)) {
      ElemIndexes.push(Object.Butts.Butts[i].ElemIndex);
    };
  };
  for (var j = 0; j < Object.Contour.Count; j++) {
    if (!IsInArray(Object.Contour.Objects[j].Data.ElemIndex, ElemIndexes)) {
      return true;
    };
  };
  return false;
};
function SetSelection(Array) {
  UnSelectAll();
  for (var i = 0; i < Array.length; i++) {
    Array[i].Selected = true;
  };
};
function SetHighlighted(Array) {
  Model.UnHighlightAll();
  for (var i = 0; i < Array.length; i++) {
    Array[i].Highlighted = true;
  };
};
function GetMaterials(Filter) {
  var Result = new Array();
  var Filters = new Array();
  var Material = {
    OldName: new String(),      //исходный материал
    Id: new Number(),           //ид материала
    MaterialName: new String(), //материал
    Thickness: new Number(),    //толщина
    Sign: new String(),         //обозначение
  };
  Material.OldName = Filter;
  for (var i = 0; i < Materials.length; i++) {
    if (Filter === Materials[i].OldName) {
      return Materials[i];
    };
  };
  Filter  = Filter.split(/\r/)[0];
  Filter  = Filter.replace(/\*/, 'x');
  Filter  = Filter.replace(/ПВЦ/i, 'ABS');
  Filter  = Filter.replace(/Меламин/i, 'ММ');
//Filter  = Filter.replace(/Белая/i, 'Белый');
//Filter  = Filter.replace(/Черная/i, 'Черный');
  Filter  = Filter.replace(/Волна/i, '"Волна"');
  Filter  = Filter.replace(/Гладкая/i, '"Гладкий"');
  Filter  = Filter.replace(/\(/i, ' (');
  Filter  = Filter.replace(/\[|\]|{|}|\.|,|=/g, ' ');
  Filters = Filter.replace(/ {1,}/g, ' ').replace(/^\s*|\s*$/g, '').split(/ /);
  for (var i = 0; i < Filters.length; i++) {
    if (i > 0) {
      Filter += " AND (NAME_MAT LIKE '%" + Filters[i] + "%')";
    } else {
      Filter = "(NAME_MAT LIKE '%" + Filters[i] + "%')";
    };
  };
  try {
    MaterialRS.Filter = Filter;
    var RecordsCount = 0;
    while(MaterialRS.EOF == 0) {
      Material.Id = MaterialRS.Fields.Item('ID_M').Value;
      if (MaterialRS.Fields.Item('ARTICLE').Value !== null &&
          MaterialRS.Fields.Item('ARTICLE').Value.length > 0) {
        Material.MaterialName = MaterialRS.Fields.Item('NAME_MAT').Value + '\r' +
                                MaterialRS.Fields.Item('ARTICLE').Value;
      } else {
        Material.MaterialName = MaterialRS.Fields.Item('NAME_MAT').Value;
      };
      RecordsCount++;
      MaterialRS.MoveNext();
    };
    AdvanceRS.Filter = 'ID_M = ' + Material.Id;
    while(AdvanceRS.EOF == 0) {
      Material.Thickness = AdvanceRS.Fields.Item('THICKNESS').Value;
      Material.Sign = AdvanceRS.Fields.Item('LABEL_EDGE').Value;
      AdvanceRS.MoveNext();
    };
    if (RecordsCount === 1 && Material.OldName !== Material.MaterialName) {
      Materials.push(Material);
      return Material;
    } else {
      Material.Id = undefined;
      Material.MaterialName = undefined;
      Material.Thickness = undefined;
      Material.Sign = undefined;
      Materials.push(Material);
      return Material;
    };
  } catch (Error) {
    alert(decodeURIComponent(escape(Error.message)));
    Action.Cancel();
  };
};
function EachObjects() {
  Model.forEach(function(Obj) {
    if ((Obj == '[object TFurnAsm]' ||
         Obj == '[object TAsmKit]') &&
        (Obj.Owner != '[object TFurnAsm]' &&
         Obj.Owner != '[object TAsmKit]')) {
      NewMaterial = GetMaterials(Obj.Name);
      if (NewMaterial.MaterialName !== undefined) {
        var Message = (Obj.Name + ' -> ' +
                       NewMaterial.MaterialName).replace(/\r/g, ':');
        system.log(Message);
        Action.Control.Owner.Caption = Message;
        Undo.Changing(Obj);
        Obj.Name = NewMaterial.MaterialName;
        Asm++;
      };
      if (Obj.Name.match(/Матрац*/i)) {
        AsmName = 'Матрац [' + Obj.GSize.x.toFixed(0) + 'x' +
                               Obj.GSize.y.toFixed(0) + 'x' +
                               Obj.GSize.z.toFixed(0) + ']';
        if (Obj.Name != AsmName) {
          Undo.Changing(Obj);
          Obj.Name = AsmName;
          Asm++;
        };
      };
      if (Obj.Name.match(/Коробка*/i)) {
        AsmName = 'Коробка [' + Obj.GSize.x.toFixed(0) + 'x' +
                               Obj.GSize.y.toFixed(0) + 'x' +
                               Obj.GSize.z.toFixed(0) + ']';
        if (Obj.Name != AsmName) {
          Undo.Changing(Obj);
          Obj.Name = AsmName;
          Asm++;
        };
      };
    };
    if ((Obj == '[object TExtrusionBody]' ||
         Obj == '[object T2DTrajectoryBody]' ||
         Obj == '[object T2DRotationBody]') &&
        (Obj.Owner != '[object TCSGOperation]' &&
         Obj.Owner != '[object TFurnAsm]' &&
         Obj.Owner != '[object TAsmKit]')) {
      NewMaterial = GetMaterials(Obj.MaterialName);
      if (NewMaterial.MaterialName !== undefined) {
        var Message = (Obj.MaterialName + ' -> ' +
                       NewMaterial.MaterialName).replace(/\r/g, ':');
        system.log(Message);
        Action.Control.Owner.Caption = Message;
        Undo.Changing(Obj);
        Obj.MaterialName = NewMaterial.MaterialName;
        Obj.Build();
        Mat++;
      };
    };
    if (Obj == '[object TFastener]') {
      var Elements = 0;
      if (Obj.AdvParamData !== null) {
        for (var i = 0; i < Obj.AdvParamData.Count; i++) {
          if (Obj.AdvParamData[i].Name === 'Elements') {
            for (var j = 0; j < Obj.AdvParamData[i].Count; j++) {
              NewMaterial = GetMaterials(Obj.AdvParamData[i][j].Value);
              if (NewMaterial.MaterialName !== undefined) {
                var Message = (Obj.AdvParamData[i][j].Value + ' -> ' +
                               NewMaterial.MaterialName).replace(/\r/g, ':');
                system.log(Message);
                Action.Control.Owner.Caption = Message;
                Undo.Changing(Obj);
                Obj.AdvParamData[i][j].Value = NewMaterial.MaterialName;
                Est++;
              };
              Elements++;
            };
          };
        };
      };
      if (Obj.ForEstimate === true) {
        NewMaterial = GetMaterials(Obj.Name);
        if (NewMaterial.MaterialName !== undefined) {
          var Message = (Obj.Name + ' -> ' +
                         NewMaterial.MaterialName).replace(/\r/g, ':');
          system.log(Message);
          Action.Control.Owner.Caption = Message;
          Undo.Changing(Obj);
          Obj.Name = NewMaterial.MaterialName;
          Est++;
        };
      };
      if (Obj.Name.indexOf('!', 0) === 0 && Elements === 0) {
        FastObj.push(Obj);
      };
    };
  });
};
if (confirm('Выполнить проверку имен панелей, сборок, наличия элементов ' +
            'составной фурнитуры, установленных параметров кромки и припуска, ' +
            'актуальности номенклатурных наименований фурнитуры, элементов ' +
            'и деталей мебели?')) {
  var Butts = 0;
  var Cuts = 0;
  var Names = 0;
  var Asm = 0;
  var Est = 0;
  var Mat = 0;
  var Colors = new Array();
  var CutsObj = new Array();
  var FastObj = new Array();
  var DimObj = new Array();
  var Materials = new Array();
  var Changing = false;
  var Caption = Action.Control.Owner.Caption;
  UnSelectAll();
  Action.Control.Owner.Owner.Item3DAnglesStdClick(); //Стандартная проекция
  Action.Control.Owner.Owner.SpTBXItem17.Click(); //Аксонометрия
  Action.Control.Owner.Owner.a1ViewAll.Execute(); //Показать все
  Action.Control.Owner.Caption = 'Ожидайте выполнения скрипта...';
  EachObjects();
  Model.forEachPanel(function(Obj) {
    for (var i = 0; i < Obj.Butts.Count; i++) {
      NewMaterial = GetMaterials(Obj.Butts.Butts[i].Material);
      if (NewMaterial.MaterialName !== undefined &&
          NewMaterial.Thickness    !== undefined &&
          NewMaterial.Sign         !== undefined) { //&& Obj.Butts.Butts[i].Profile == null) {
        var Message = (Obj.Butts.Butts[i].Material + ' -> ' +
                       NewMaterial.MaterialName).replace(/\r/g, ':');
        system.log(Message);
        Action.Control.Owner.Caption = Message;
        Undo.Changing(Obj);
        Obj.Butts.Butts[i].Material = NewMaterial.MaterialName;
        Obj.Butts.Butts[i].Thickness = NewMaterial.Thickness;
        Obj.Butts.Butts[i].Sign = NewMaterial.Sign;
        Mat++;
      };
      MatName = Obj.Butts.Butts[i].Material.toString();
      if (MatName.match(/([^()]*)\(/) === null) {
        Key = MatName
      } else {
        Key = MatName.match(/([^()]*)\(/)[1]
      };
      switch (Key) {
        case 'КромкаABS':
        case '!КромкаABS':
          if (Obj.Butts.Butts[i].ClipPanel != true ||
              Obj.Butts.Butts[i].Allowance != 1) {
            Undo.Changing(Obj);
            Obj.Butts.Butts[i].ClipPanel = true;
            Obj.Butts.Butts[i].Allowance = 1;
            Butts++;
          };
          break;
        case 'КромкаПВХ':
        case '!КромкаПВХ':
          if (Obj.Butts.Butts[i].ClipPanel != true ||
              Obj.Butts.Butts[i].Allowance != 1) {
            Undo.Changing(Obj);
            Obj.Butts.Butts[i].ClipPanel = true;
            Obj.Butts.Butts[i].Allowance = 1;
            Butts++;
          };
          break;
        case 'КромкаММ':
        case '!КромкаММ':
          if (Obj.MaterialWidth <= 0) {
            if (Obj.Butts.Butts[i].ClipPanel != true ||
                Obj.Butts.Butts[i].Allowance != 1) {
              Undo.Changing(Obj);
              Obj.Butts.Butts[i].ClipPanel = true;
              Obj.Butts.Butts[i].Allowance = 1;
              Butts++;
            };
          } else {
            if (Obj.Butts.Butts[i].ClipPanel != true ||
                Obj.Butts.Butts[i].Allowance != 0) {
              Undo.Changing(Obj);
              Obj.Butts.Butts[i].ClipPanel = true;
              Obj.Butts.Butts[i].Allowance = 0;
              Butts++;
            };
          };
          break;
        case 'КромкаHPL':
        case '!КромкаHPL':
          if (Obj.Butts.Butts[i].ClipPanel != true ||
              Obj.Butts.Butts[i].Allowance != 0) {
            Undo.Changing(Obj);
            Obj.Butts.Butts[i].ClipPanel = true;
            Obj.Butts.Butts[i].Allowance = 0;
            Butts++;
          };
          break;
        case 'Фаска':
        case '!Фаска':
          if (Obj.Butts.Butts[i].ClipPanel != false ||
              Obj.Butts.Butts[i].Allowance != 0) {
            Undo.Changing(Obj);
            Obj.Butts.Butts[i].ClipPanel = false;
            Obj.Butts.Butts[i].Allowance = 0;
            Butts++;
          };
          break;
        case 'Шлифовка':
        case '!Шлифовка':
          if (Obj.Butts.Butts[i].ClipPanel != false ||
              Obj.Butts.Butts[i].Allowance != 0) {
            Undo.Changing(Obj);
            Obj.Butts.Butts[i].ClipPanel = false;
            Obj.Butts.Butts[i].Allowance = 0;
            Butts++;
          };
          break;
        case 'Фацет':
        case '!Фацет':
          if (Obj.Butts.Butts[i].ClipPanel != false ||
              Obj.Butts.Butts[i].Allowance != 0) {
            Undo.Changing(Obj);
            Obj.Butts.Butts[i].ClipPanel = false;
            Obj.Butts.Butts[i].Allowance = 0;
            Butts++;
          };
          break;
        case 'СОФТ':
        case '!СОФТ':
          if (Obj.Butts.Butts[i].ClipPanel != false ||
              Obj.Butts.Butts[i].Allowance != 0) {
            Undo.Changing(Obj);
            Obj.Butts.Butts[i].ClipPanel = false;
            Obj.Butts.Butts[i].Allowance = 0;
            Butts++;
          };
          break;
        case 'Припуск':
        case '!Припуск':
          if (Obj.Butts.Butts[i].ClipPanel != false ||
              Obj.Butts.Butts[i].Allowance != parseFloat(MatName.match(/\(([^()]*)\)/)[1])) {
            Undo.Changing(Obj);
            Obj.Butts.Butts[i].ClipPanel = false;
            Obj.Butts.Butts[i].Allowance = parseFloat(MatName.match(/\(([^()]*)\)/)[1]);
            Butts++;
          };
          break;
      };
    };
    NewMaterial = GetMaterials(Obj.MaterialName);
    if (NewMaterial.MaterialName !== undefined) {
      var Message = (Obj.MaterialName + ' -> ' +
                     NewMaterial.MaterialName).replace(/\r/g, ':');
      system.log(Message);
      Action.Control.Owner.Caption = Message;
      Undo.Changing(Obj);
      Obj.MaterialName = NewMaterial.MaterialName;
      Mat++;
    };
    if (Obj.Plastics.Count) {
      for (var i = 0; i < Obj.Plastics.Count; i++) {
        NewMaterial = GetMaterials(Obj.Plastics[i].Material);
        if (NewMaterial.MaterialName !== undefined) {
          var Message = (Obj.Plastics[i].Material + ' -> ' +
                         NewMaterial.MaterialName).replace(/\r/g, ':');
          system.log(Message);
          Action.Control.Owner.Caption = Message;
          Undo.Changing(Obj);
          Obj.Plastics[i].Material = NewMaterial.MaterialName;
          Mat++;
        };
      };
    };
    Fasteners = Obj.FindConnectedFasteners();
    IsFasad = false;
    for (var i = 0; i < Fasteners.length; i++) {
      if (Fasteners[i].Name.match(/Петля/i)) {
        for (var j = 0; j < Fasteners[i].Holes.Count; j ++) {
          if (parseFloat(Fasteners[i].Holes[j].Diameter) == 26 ||
              parseFloat(Fasteners[i].Holes[j].Diameter) == 35) {
            Position = Obj.ToObject(Fasteners[i].ToGlobal(Fasteners[i].Holes[j].Position));
            if (Position.x > Obj.GMin.x && Position.y > Obj.GMin.y &&
                Position.z == Obj.GMin.z &&
                Position.x < Obj.GMax.x && Position.y < Obj.GMax.y &&
                Obj.MaterialWidth <= 0) {
              IsFasad = true;
            };
          };
        };
      };
    };
    if (IsFasad) {
      if (Obj.Plastics.Count) {
        if (!Obj.Name.match(/Дверь\(склейка\)/i)) {
          Undo.Changing(Obj);
          Obj.Name = 'Дверь(склейка)';
          Names++;
        };
      } else {
        if ( Obj.Name.match(/Дверь\d+/i) || Obj.Name.match(/Дверь\(склейка\)/i) ||
            !Obj.Name.match(/Дверь/i)) {
          Undo.Changing(Obj);
          Obj.Name = 'Дверь';
          Names++;
        };
      };
    } else {
      if (Obj.Plastics.Count) {
        if (Obj.Name.match(/Дверь/i) && !Obj.Name.match(/Дверь\(склейка\)/i)) {
          Undo.Changing(Obj);
          Obj.Name = 'Дверь(склейка)';
          Names++;
        };
      } else {
        if (Obj.Name.match(/Дверь\d+/i) || Obj.Name.match(/Дверь\(склейка\)/i)) {
          Undo.Changing(Obj);
          Obj.Name = 'Дверь';
          Names++;
        };
      };
    };
    if (Obj.Plastics.Count && Obj.Name !== 'Филенка') {
      if (NotAllButts(Obj, /!Припуск/i)) {
        CutsObj.push(Obj);
      };
      if ( Obj.Name.match(/Вертикальная/i) &&
          !Obj.Name.match(/Вертикальная\(склейка\)/i)) {
        Undo.Changing(Obj);
        Obj.Name = 'Вертикальная(склейка)';
        Names++;
      };
      if ( Obj.Name.match(/Горизонтальная/i) &&
          !Obj.Name.match(/Горизонтальная\(склейка\)/i)) {
        Undo.Changing(Obj);
        Obj.Name = 'Горизонтальная(склейка)';
        Names++;
      };
      if ( Obj.Name.match(/Фронтальная/i) &&
          !Obj.Name.match(/Фронтальная\(склейка\)/i)) {
        Undo.Changing(Obj);
        Obj.Name = 'Фронтальная(склейка)';
        Names++;
      };
    } else {
      if (Obj.Name.match(/Вертикальная\d+/i) ||
          Obj.Name.match(/Вертикальная\(склейка\)/i)) {
        Undo.Changing(Obj);
        Obj.Name = 'Вертикальная';
        Names++;
      };
      if (Obj.Name.match(/Горизонтальная\d+/i) ||
          Obj.Name.match(/Горизонтальная\(склейка\)/i)) {
        Undo.Changing(Obj);
        Obj.Name = 'Горизонтальная';
        Names++;
      };
      if (Obj.Name.match(/Фронтальная\d+/i) ||
          Obj.Name.match(/Фронтальная\(склейка\)/i)) {
        Undo.Changing(Obj);
        Obj.Name = 'Фронтальная';
        Names++;
      };
    };
    for (var i = 0; i < Obj.Cuts.Count; i++) {
      if (Obj.Cuts[i].Name == 'Уг XX гр.' ||
          Obj.Cuts[i].Name == 'Уг 45 гр.' ||
          Obj.Cuts[i].Name == 'Уг 22,5 гр.') {
        Contour = Obj.Cuts[i].Contour;
        Angle = Math.abs(RadiansToAngle(Math.atan(Contour.Width / Contour.Height)).toFixed(3));
        Sign = 'Уг ' + Angle.toString().replace(/\./, ',') + ' гр.';
        if (Obj.Cuts[i].Sign != Sign) {
          Undo.Changing(Obj);
          Obj.Cuts[i].Sign = Sign;
          if (Sign == 'Уг 45 гр.' || Sign == 'Уг 22,5 гр.') {
            Obj.Cuts[i].Name = Sign;
          } else {
            Obj.Cuts[i].Name = 'Уг XX гр.';
          };
          Cuts++;
        };
      };
    };
    if (Obj.IsContourRectangle) {
      if (parseFloat(Obj.GSize.x.toFixed(3)) !== parseFloat(Obj.GSize.x.toFixed(0)) ||
          parseFloat(Obj.GSize.y.toFixed(3)) !== parseFloat(Obj.GSize.y.toFixed(0))) {
        if (Obj.Color !== C_VIOLET) {
          Undo.Changing(Obj);
          Obj.Color = C_VIOLET;
          Colors.push(Obj);
        };
        DimObj.push(Obj);
      } else {
        if (Obj.Color !== C_DEFAULT) {
          Undo.Changing(Obj);
          Obj.Color = C_DEFAULT;
          Colors.push(Obj);
        };
      };
    };
    Obj.Build();
  });
  Action.Control.Owner.Caption = Caption;
  system.log('Проверено номенклатурных позиций: ' + Materials.length);
  if (FastObj.length > 0) {
    SetSelection(FastObj);
    if (confirm('Выделенная фурнитура является составной, но ее элементы в ' +
                'моделе отсутствуют!\nВыполнить замену этой фурнитуры?')) {
      Action.Control.Owner.Owner.a3FurnReplaceExecute(); //Замена фурнитуры
      Changing = true;
    };
  };
  if (CutsObj.length > 0) {
    SetSelection(CutsObj);
    alert('На выделенных объектах отсутствует или некорректно нанесен припуск!');
  };
  if (DimObj.length > 0) {
    //SetSelection(DimObj);
    alert('Размеры панелей Фиолетового цвета не кратны едининце!');
  };
  if (Butts > 0 || Cuts > 0 || Names > 0 || Asm > 0 || Est > 0 || Mat > 0 ||
      Colors.length > 0) {
    SetHighlighted(Colors);
    alert('Переименовано панелей: ' + Names + '\n' +
          'Изменено пар. кромок: ' + Butts + '\n' +
          'Изменено обозн. пазов: ' + Cuts  + '\n' +
          'Переименовано сборок: ' + Asm  + '\n' +
          'Переименовано ед. фурнитуры: ' + Est  + '\n' +
          'Переименовано материалов: ' + Mat  + '\n' +
          'Изменен цв. контура подсвеченых пан.: ' + Colors.length);
    Model.UnHighlightAll();
    Changing = true;
  };
  if (Changing) {
    if (confirm('В модель внесены изменения возможно это повлияет на ' +
                'нумерацию объектов.\nРасставить позиции заново?')) {
      Action.Control.Owner.Owner.dpModelTree.Controls[1].BtnArrangeClick(); //Расставить позиции заново
    } else {
      Action.Control.Owner.Owner.dpModelTree.Controls[1].ItemCheckPosClick(); //Проверить позиции
    };
  };
};
try {
  MaterialRS.Close;
  AdvanceRS.Close;
  Connection.Close;
} catch(Error) {
  //alert(decodeURIComponent(escape(Error.message)));
};