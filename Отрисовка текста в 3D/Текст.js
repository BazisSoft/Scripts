var Prop = Action.Properties;
var SizePar = Prop.NewNumber('������ ������', 100);
var ColorPar = Prop.NewColor('����');
var TextPar = Prop.NewString('�����');

symbols = JSON.parse( system.readTextFile('Font.json') ).Font.Symbols.Symbol;
smbMap = {};
for (var k = 0; k < symbols.length; ++k) {
    var symbol = symbols[k];
    smbMap[symbol.ID] = symbol;
}

function MakeText() {
    DeleteNewObjects();
    var block = BeginParametricBlock("�����")
    var Text3D = AddContour();
    Text3D.Name = '�����';

    Text3D.Color = ColorPar.Value;
    var TextContour = Text3D.Contour;
    var PosX = 0;

    var scale = SizePar.Value;

    var text = TextPar.Value;
    for (var i = 0; i < text.length; ++i) {
      var id = text.charCodeAt(i);
      if (id >= 1040) {
        id = id - 1040 + 192;
      }
      var symbol = smbMap[id];
      if (symbol) {
        if (symbol.Lines) {
            var lines = symbol.Lines.Line;
            for (var k = 0; k < lines.length; ++k) {
              var line = lines[k];
              TextContour.AddLine(parseFloat(line.x1) * scale + PosX,
                                  parseFloat(line.y1) * scale,
                                  parseFloat(line.x2) * scale + PosX,
                                  parseFloat(line.y2) * scale);
            }
        }
        PosX += symbol.IncX * scale;
      }
    }

    Text3D.Build();
    EndParametricBlock();
    return block;
}

if (ParametricBlock) {
    // �������� ������ ���������� ��������������
    Prop.NewButton('���������').OnClick = function() {
      Action.Finish();
    }
    Prop.OnChange = MakeText;
    Action.Continue();
}
else {
    while (true) {
        TextPar.Visible = false;
        var P1 = GetPoint("������� ����� ������");
        var P2 = GetPoint("������� ����� �����");
        var text = prompt("������� �����");
        TextPar.Value = text;
        TextPar.Visible = true;
        Text3D = MakeText();
        var dir = NewVector(P2.x - P1.x, P2.y - P1.y, P2.z - P1.z);
        var axisY = Vector.cross(dir, Action.ViewDir, NewVector());
        var il = 1 / Math.sqrt(axisY.x * axisY.x + axisY.y * axisY.y + axisY.z * axisY.z);
        axisY.x *= il;
        axisY.y *= il;
        axisY.z *= il;
        Text3D.OrientGCS(Vector.negative(Action.ViewDir), axisY);
        Text3D.Position = P1;
        Action.Commit();
    }
}