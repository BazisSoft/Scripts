// задание полей ввода
Prop = Action.Properties;
SideMat = Prop.NewMaterial('Боковины');
DepthVal = Prop.NewNumber('Глубина');
DepthVal.Value = Model.GSize.z;
ShelfMat = Prop.NewMaterial('Полки');
ShelfCount = Prop.NewNumber('Количество');
ShelfCount.Value = 5;
ShelfOffset = Prop.NewNumber('Отступ');
ShelfOffset.Value = 2;
ShelfFast = Prop.NewFurniture('Крепёж');

if (ParametricBlock) {
    Left = ParametricBlock.GMin.x;
    Right = ParametricBlock.GMax.x;
    Top = ParametricBlock.GMax.y;
    Bottom = ParametricBlock.GMin.y;

    PWidth = Prop.NewNumber('Ширина', Right - Left);
    PWidth.OnChange = function() { Right = Left + PWidth.Value; MakeShelf() };
    PHeight = Prop.NewNumber('Высота', Top - Bottom);
    PHeight.OnChange = function() { Top = Bottom + PHeight.Value; MakeShelf() };
} else {
    // запрос габаритов ниши
    Left = GetEdge('Укажите левую границу', AxisY).First.x;
    Right = GetEdge('Укажите правую границу', AxisY).First.x;
    Top = GetEdge('Укажите верхнюю границу', AxisX).First.y;
    Bottom = GetEdge('Укажите нижнюю границу', AxisX).First.y;
}

Prop.OnChange = function() { MakeShelf() };
MakeShelf();
OkBtn = NewButtonInput('Построить');
OkBtn.OnChange = function() { Action.Finish() };
Action.Continue(); // не завершать  действие

function MakeShelf() {
    DeleteNewObjects(); // удалить объкты созданные в этой команде
    BeginParametricBlock("стеллаж");

    Depth = DepthVal.Value;
    Offset = ShelfOffset.Value;
    Count = ShelfCount.Value;
    SideMat.SetActive(); // строить боковины из материала указнного в SideMat
    LeftPanel = AddVertPanel(0, Bottom, Depth, Top, Left);
    RightPanel = AddVertPanel(0, Bottom, Depth, Top, Right - SideMat.Thickness);

    PosY = Bottom;
    SectionHeight = Top - Bottom;
    YInc = (SectionHeight - Count * ShelfMat.Thickness) / (Count + 1);

    ShLeft = Left + SideMat.Thickness + Offset;
    ShRight = Right - SideMat.Thickness - Offset;

    ShelfMat.SetActive(); // строить полки из материала указнного в ShelfMat
    BeginBlock("Полки");
    for (var k = 0; k < Count; k++) {
        PosY += YInc;
        Panel = AddHorizPanel(ShLeft, 0, ShRight, Depth, PosY);
        // закрепить полки крепежом выбранным в ShelfFast на боковинах
        ShelfFast.Value.Mount(Panel, LeftPanel, ShLeft, PosY, 32);
        ShelfFast.Value.Mount(Panel, RightPanel, ShRight, PosY, 32);
        ShelfFast.Value.Mount(Panel, LeftPanel, ShLeft, PosY, Depth - 32);
        ShelfFast.Value.Mount(Panel, RightPanel, ShRight, PosY, Depth - 32);
        PosY += ShelfMat.Thickness;
    }
    EndBlock();

    EndParametricBlock();
}