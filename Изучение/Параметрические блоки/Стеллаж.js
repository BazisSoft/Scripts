// ������� ����� �����
Prop = Action.Properties;
SideMat = Prop.NewMaterial('��������');
DepthVal = Prop.NewNumber('�������');
DepthVal.Value = Model.GSize.z;
ShelfMat = Prop.NewMaterial('�����');
ShelfCount = Prop.NewNumber('����������');
ShelfCount.Value = 5;
ShelfOffset = Prop.NewNumber('������');
ShelfOffset.Value = 2;
ShelfFast = Prop.NewFurniture('�����');

if (ParametricBlock) {
    Left = ParametricBlock.GMin.x;
    Right = ParametricBlock.GMax.x;
    Top = ParametricBlock.GMax.y;
    Bottom = ParametricBlock.GMin.y;

    PWidth = Prop.NewNumber('������', Right - Left);
    PWidth.OnChange = function() { Right = Left + PWidth.Value; MakeShelf() };
    PHeight = Prop.NewNumber('������', Top - Bottom);
    PHeight.OnChange = function() { Top = Bottom + PHeight.Value; MakeShelf() };
} else {
    // ������ ��������� ����
    Left = GetEdge('������� ����� �������', AxisY).First.x;
    Right = GetEdge('������� ������ �������', AxisY).First.x;
    Top = GetEdge('������� ������� �������', AxisX).First.y;
    Bottom = GetEdge('������� ������ �������', AxisX).First.y;
}

Prop.OnChange = function() { MakeShelf() };
MakeShelf();
OkBtn = NewButtonInput('���������');
OkBtn.OnChange = function() { Action.Finish() };
Action.Continue(); // �� ���������  ��������

function MakeShelf() {
    DeleteNewObjects(); // ������� ������ ��������� � ���� �������
    BeginParametricBlock("�������");

    Depth = DepthVal.Value;
    Offset = ShelfOffset.Value;
    Count = ShelfCount.Value;
    SideMat.SetActive(); // ������� �������� �� ��������� ��������� � SideMat
    LeftPanel = AddVertPanel(0, Bottom, Depth, Top, Left);
    RightPanel = AddVertPanel(0, Bottom, Depth, Top, Right - SideMat.Thickness);

    PosY = Bottom;
    SectionHeight = Top - Bottom;
    YInc = (SectionHeight - Count * ShelfMat.Thickness) / (Count + 1);

    ShLeft = Left + SideMat.Thickness + Offset;
    ShRight = Right - SideMat.Thickness - Offset;

    ShelfMat.SetActive(); // ������� ����� �� ��������� ��������� � ShelfMat
    BeginBlock("�����");
    for (var k = 0; k < Count; k++) {
        PosY += YInc;
        Panel = AddHorizPanel(ShLeft, 0, ShRight, Depth, PosY);
        // ��������� ����� �������� ��������� � ShelfFast �� ���������
        ShelfFast.Value.Mount(Panel, LeftPanel, ShLeft, PosY, 32);
        ShelfFast.Value.Mount(Panel, RightPanel, ShRight, PosY, 32);
        ShelfFast.Value.Mount(Panel, LeftPanel, ShLeft, PosY, Depth - 32);
        ShelfFast.Value.Mount(Panel, RightPanel, ShRight, PosY, Depth - 32);
        PosY += ShelfMat.Thickness;
    }
    EndBlock();

    EndParametricBlock();
}