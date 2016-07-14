Properties = Action.Properties;
Density   = Properties.NewNumber('���������(��/�3):');
Operation = Properties.NewCombo('��� �������', '���\n������\n���');

var Panel = new Object();
var Objects = new Object();

Properties.Load('���������������������.xml');

Properties.NewButton('��������').OnClick = function() {
  Operation.Clear();
  Objects = new Object();
};

Properties.NewButton('��������� � ����').OnClick = function() {
  var Content = new String();
  for (var Key in Objects) {
    if (Objects[Key].Content > 0) {
      Content += Objects[Key].Caption + '\t' +
                 Objects[Key].Content.toString().replace(/\./, ',') + '\r\n';
    };
  };
  system.askWriteTextFile('txt', Content);
};

Properties.NewButton('���������').OnClick = function() {
  Action.Finish();
};

function ObjectsLength(List) {
  var Result = new Number();
  for (var i = 0; i < List.Count; i++) {
    Result += List[i].ObjLength();
  };
  return Result;
};

function CutsLength(List) {
  var Result = new Number();
  for (i = 0; i < List.Cuts.Count; i++) {
    Result += ObjectsLength(List.Cuts.Cuts[i].Trajectory);
  };
  return Result;
};

function AddControls() {
  var Cuts     = new Number();
  var Contours = new Number();
  var Mass     = new Number();
  Operation.Clear();
  for (var Key in Objects) {
    if (Objects[Key].Content > 0) {
      Operation.NewString(Objects[Key].Caption).Value =
        parseFloat(Objects[Key].Content.toFixed(3))
                   .toString().replace(/\./, ',');
    };
    switch (true) {
      case Key.match(/���/) == '���':
        Cuts += Objects[Key].Content;
        break;
      case Key.match(/������/) == '������':
        Contours += Objects[Key].Content;
        break;
      case Key.match(/���/) == '���':
        Mass += Objects[Key].Content;
        break;
    };
  };
  if (Cuts > 0) {
    Operation.NewString('�����(���):').Value =
      parseFloat(Cuts.toFixed(3)).toString().replace(/\./, ',');
   };
  if (Contours > 0) {
    Operation.NewString('�����(������):').Value =
      parseFloat(Contours.toFixed(3)).toString().replace(/\./, ',');
  };
  if (Mass > 0) {
    Operation.NewString('�����(�����):').Value =
      parseFloat(Mass.toFixed(3)).toString().replace(/\./, ',');
  };
};

Action.OnMove = function() {
  Obj = Action.Get3DObject();
  if (Obj instanceof TFurnPanel) {
    Panel = Obj.AsPanel;
    if (!Panel.Highlighted) {
      Model.UnHighlightAll();
      Panel.Highlighted = true;
    };
  } else {
    Panel = new Object();
    Model.UnHighlightAll();
  };
};

Action.OnClick = function() {
  if (Panel.AsPanel != undefined) {
    switch(Operation.Value) {
    case '���':
      if (Panel.ArtPos) {
        var Name = '���(' + Panel.ArtPos + '): ' +
                   parseFloat(Panel.ContourHeight.toFixed(3)) + 'x' +
                   parseFloat(Panel.ContourWidth.toFixed(3)) + 'x' +
                   parseFloat(Panel.Thickness.toFixed(3));
      } else {
        var Name = '���: ' +
                   parseFloat(Panel.ContourHeight.toFixed(3)) + 'x' +
                   parseFloat(Panel.ContourWidth.toFixed(3)) + 'x' +
                   parseFloat(Panel.Thickness.toFixed(3));
      };
      var Value = CutsLength(Panel) / 1000;
      if(typeof(Objects[Name]) == 'undefined') {
        Objects[Name] = new Object();
      };
      Objects[Name] = {
        Caption: Name,
        Content: Value
      };
      break;
    case '������':
      if (Panel.ArtPos) {
        var Name = '������(' + Panel.ArtPos + '): ' +
                   parseFloat(Panel.ContourHeight.toFixed(3)) + 'x' +
                   parseFloat(Panel.ContourWidth.toFixed(3)) + 'x' +
                   parseFloat(Panel.Thickness.toFixed(3));
      } else {
        var Name = '������: ' +
                   parseFloat(Panel.ContourHeight.toFixed(3)) + 'x' +
                   parseFloat(Panel.ContourWidth.toFixed(3)) + 'x' +
                   parseFloat(Panel.Thickness.toFixed(3));
      };
      var Value = ObjectsLength(Panel.Contour) / 1000;
      if(typeof(Objects[Name]) == 'undefined') {
        Objects[Name] = new Object();
      };
      Objects[Name] = {
        Caption: Name,
        Content: Value
      };
      break;
    case '���':
      if (Panel.ArtPos) {
        var Name = '���(' + Panel.ArtPos + '): ' +
                   parseFloat(Panel.ContourHeight.toFixed(3)) + 'x' +
                   parseFloat(Panel.ContourWidth.toFixed(3)) + 'x' +
                   parseFloat(Panel.Thickness.toFixed(3));
      } else {
        var Name = '���: ' +
                   parseFloat(Panel.ContourHeight.toFixed(3)) + 'x' +
                   parseFloat(Panel.ContourWidth.toFixed(3)) + 'x' +
                   parseFloat(Panel.Thickness.toFixed(3));
      };
      var Value = geometry.Area(Panel.Contour) * Panel.Thickness /
                  Math.pow(1000, 3) * Density.Value;
      if(typeof(Objects[Name]) == 'undefined') {
        Objects[Name] = new Object();
      };
      Objects[Name] = {
        Caption: Name,
        Content: Value
      };
      break;
    };
    AddControls();
  };
};

Action.OnFinish = function() {
  Properties.Save('���������������������.xml');
  Model.UnHighlightAll();
};

Action.Continue();