Properties = Action.Properties;
Material = Properties.NewMaterial('������������ ��������:');
Material.Store = false;
SelfCount = Properties.NewNumber('���-�� �����:');
Orientation = Properties.NewCombo('����������� ��������:', '�� �����������\n' +
                                                           '�� ���������');
Orientation.Store = false;
Options = Properties.NewGroup('������� �� ��������');
FrontOffset = Options.NewNumber('�������:');
BackOffset  = Options.NewNumber('�����:');
LeftOffset  = Options.NewNumber('�����:');
RightOffset = Options.NewNumber('������:');

Options.NewButton('�����').OnClick = function() {
  FrontOffset.Value = 0;
  BackOffset.Value  = 0;
  LeftOffset.Value  = 0;
  RightOffset.Value = 0;
};

Properties.NewButton('���������').OnClick = function() {
  Action.Finish();
};

Action.OnFinish = function() {
  Properties.Save('����������������.xml');
};

function Build() {
  var Y = Bottom;
  DeleteNewObjects();
  for(var i = (SelfCount.Count - 1); i > 0; i--) {
    Y += parseFloat(SelfCount[i].Name);
    if(SelfCount[(i - 1)][0].Value) {
      var Panel = AddHorizPanel(Left  + LeftOffset.Value,
                                Back  + BackOffset.Value,
                                Right - RightOffset.Value,
                                Front - FrontOffset.Value,
                                Y);
    } else {
      var Panel = AddHorizPanel(Left, Back, Right, Front, Y);
    };
    Y += Panel.Thickness;
    Panel.Name = '��������������';
    switch (Orientation.Value) {
    case '�� �����������':
      Panel.TextureOrientation = TextureOrientation.Horizontal;
      break;
    case '�� ���������':
      Panel.TextureOrientation = TextureOrientation.Vertical;
      break;
    };
  };
};

function ReCalc() {
  var List = new Array();
  var Result = new Number();
  for(var i = (SelfCount.Count - 1); i > -1; i--) {
    if(SelfCount[i].Value) {
      Result += parseFloat(SelfCount[i].Name);
      SelfCount[i].Name = SelfCount[i].Value;
      Result -= SelfCount[i].Value;
    } else {
      Result += parseFloat(SelfCount[i].Name);
      List.push(SelfCount[i]);
    };
  };
  var Inc = parseFloat(Result / List.length).toFixed(0);
  for(var i = List.length; i > 0; i--) {
    if(Result % i == 0) {
      Inc = Result / i;
    };
    List[(i - 1)].Name = Inc;
    Result -= Inc;
  };
  Build();
};

function Calc() {
  SelfCount.Clear();
  SelfCount.Value = parseInt(SelfCount.Value.toFixed(0));
  Action.Hint = '������ ������: ' +
                parseFloat((Top - Bottom).toFixed(3)) +
                ' ��.';
  var Count = SelfCount.Value;
  var Height = (Top - Bottom - Count * ActiveMaterial.Thickness).toFixed(12);
  var Inc = parseFloat((Height / (Count + 1)).toFixed(0));
  for(var i = (Count + 1); i > 0; i--) {
    if(Height % i == 0) {
      Inc = Height / i;
    };
    var NewNumber =
     'Number' + i + ' = SelfCount.NewNumber(Inc); \n' +
     'Number' + i + '.Store = false;              \n' +
     'Number' + i + '.OnValueChange = function() {\n' +
     '  ReCalc();                                 \n' +
     '};                                            ';
    eval(NewNumber);
    if(i > 1) {
      var NewBool =
       'Number' + i + '.Expanded = false;                               \n' +
       'Bool' + i + ' = Number' + i + '.NewBool("������������ ������:");\n' +
       'Bool' + i + '.Value = true;                                     \n' +
       'Bool' + i + '.OnValueChange = function() {                      \n' +
       '  Build();                                                      \n' +
       '};                                                                ';
      eval(NewBool);
    };
    Height -= Inc;
  };
  Build();
};

SelfCount.OnValueChange = function() {
  Calc();
};

Material.OnValueChange = function() {
  Material.SetActive();
  Calc();
};

Orientation.OnValueChange = function() {
  Build();
};

Options.OnChange = function() {
  Build();
};

Properties.Load('����������������.xml');
Action.ShowEdges = true;
var EdgeBack   = GetEdge('������� ����� ������ �������', AxisY);
var EdgeFront  = GetEdge('������� ������ �������� �������', AxisY);
var EdgeTop    = GetEdge('������� ������� �������', NewVector(1, 0, 1));
var EdgeBottom = GetEdge('������� ������ �������', NewVector(1, 0, 1));
Action.ShowEdges = false;
var Left   = EdgeBack.First.x;
var Right  = EdgeFront.First.x;
var Top    = EdgeTop.First.y;
var Bottom = EdgeBottom.First.y;
var Back   = EdgeBack.First.z;
var Front  = EdgeFront.First.z;
Calc();

Action.Continue();