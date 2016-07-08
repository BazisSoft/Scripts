Left = 0;
Right = 0;
Top = 0;
Bottom = 0;

// если это не режим редактирования, то указываем границы
if (!ParametricBlock)
{
    SetCamera(p3dFront);
    Left = GetEdge('Укажите первую вертикальную границу', AxisY).GFirst.x;
    Right = GetEdge('Укажите вторую вертикальную границу', AxisY).GFirst.x;
    Top = GetEdge('Укажите первую горизонтальную границу', AxisX).GFirst.y;
    Bottom = GetEdge('Укажите вторую горизонтальную границу', AxisX).GFirst.y;

    if (Left > Right) {
        aaa = Left
        Left = Right
        Right = aaa
    }
    if (Bottom > Top) {
        aaa = Bottom
        Bottom = Top
        Top = aaa
    }
}

MakeProp();

if (!ParametricBlock) {
    FileOptions = 'Save.xml';
    Action.Properties.Load(FileOptions);
    SzLeft.Value = Left;
    SzBottom.Value = Bottom;
    SzWidth.Value = Right - Left;
    SzHeight.Value = Top - Bottom;
    DepthVal.Value = 298;
}

BtnOK = NewButtonInput("Построить")
BtnOK.OnChange = function() {Action.Finish()};

function MakeProp() {
    Prop = Action.Properties;

    //группа корпус
    Korp = Prop.NewGroup('Корпус');
    SzLeft = Korp.NewNumber('Лево', Left);
    SzLeft.Visible = false;
    SzBottom = Korp.NewNumber('Низ', Bottom);
    SzBottom.Visible = false;
    SzWidth = Korp.NewNumber('Ширина', Right - Left);
    SzHeight = Korp.NewNumber('Высота', Top - Bottom);
    DepthVal = Korp.NewNumber('Глубина');
    DepthVal.Value = 298;
    SideMat = Korp.NewMaterial('ДСП корпуса');
    ButtC = Korp.NewButt('Кромка корпуса');

    //группа вставная полка
    PolkaVs = Prop.NewBool('Вставная полка');
    PolkaVs.Value = true;
    PolkaVs.OnChange = function() {PolkaVs.ChildrenEnabled = PolkaVs.Value};
    CountPol = PolkaVs.NewNumber('Количество');
    CountPol.Value = 1;
    ShelfOffset = PolkaVs.NewNumber('Отступ с боков');
    ShelfOffset.Value = 1.5;
    ShelfZag = PolkaVs.NewNumber('Заглубление');
    ShelfZag.Value = 22;

    //группа фасад
    Doors = Prop.NewCombo('Фасады', 'Панель - Панель\nПанель - Рамка\nРамка - Панель\nРамка - Рамка');
    //VesFas = Doors.NewNumber('Вес фасадов');
    //VesFas.Enabled = false;
    //VesFas.Value = SumFas;
    MatFas = Doors.NewMaterial('Материал');
    ButtD = Doors.NewButt('Кромка');
    KolDv = Doors.NewCombo('Кол-во дверей',  '1\n2');
    PetliLeftRight = Doors.NewCombo('Петли', 'Слева\nСправа');

    //группа столешница
    Stolesh = Prop.NewBool('Столешница');
    Stolesh.Value = true;
    Stolesh.OnChange = function() {Stolesh.ChildrenEnabled = Stolesh.Value};
    MatStol = Stolesh.NewMaterial('Материал');

    // группа фурнитура
    FurnGroup = Prop.NewGroup('Фурнитура');
    Ruch = FurnGroup.NewFurniture('Ручка');
    Angle = FurnGroup.NewCombo('Угол поворота ручки',  '0\n90')
    Опора = FurnGroup.NewFurniture('Опора');
    Pet = FurnGroup.NewFurniture('Петля');
    НавескаЛевая = FurnGroup.NewFurniture('Навеска Левая');
    НавескаПравая = FurnGroup.NewFurniture('Навеска Правая');
    Евровинт = FurnGroup.NewFurniture('Евровинт');
    Полкодержатель = FurnGroup.NewFurniture('Полкодержатель');
    Шкант = FurnGroup.NewFurniture('Шкант');

    //обработка нажатия кнокпи
    Btn = Prop.NewButton('Построить');
    Btn.OnClick = function() {
    Action.Finish()};
}

function Primenit()
{
    if (SzWidth.Value > 600)
    {
        PetliLeftRight.Enabled = false;
        KolDv.Enabled = false;
    }
    else
    {
        if (SzWidth.Value == 600)
        {
            KolDv.Enabled = true;
            if (KolDv.ItemIndex == 0)
                PetliLeftRight.Enabled = true;
            else
                PetliLeftRight.Enabled = false;
        }
        else
        {
            KolDv.Enabled = false;
            PetliLeftRight.Enabled = true;
        }
    }

    if (SzHeight.Value > 820)
    {
        НавескаЛевая.Enabled = true;
        НавескаПравая.Enabled = true;
        Опора.Enabled = false;
    } else {
        НавескаЛевая.Enabled = false;
        НавескаПравая.Enabled = false;
        Опора.Enabled = true;
    }

    if (Angle.ItemIndex == 0)
        Fi = 0;
    else
        Fi = 90;

    if (DepthVal.Value <= 199)
        alert('Глубина копуса менее 200 мм!\nВедите значение заново.')
    else
        MakeShelf();
}


Action.OnStart = function ()//обработка событий в любых полях ввода свойства
{
    Prop.OnChange = Primenit;
    Primenit();
};


Action.Continue();

function EvrAndShkant(Panel1, Panel2, X, Y, Z, Sdvig) {
    Евровинт.Value.Mount(Panel1, Panel2, X, Y, Z);
    Шкант.Value.Mount(Panel1, Panel2, X, Y, Z + Sdvig);
}

function Petlya(Panel1, Panel2, X, Y, Z) {
    Pet.Value.Mount(Panel1, Panel2, X, Y, Z);
}

function Petli() {
    Petlya(Planka, DverUP, PetX3, Y1, Depth);
    Petlya(Planka, DverUP, Right - PetX3 + Left, Y1, Depth);
}

function Ruchka(Panel, X, Y, Z, S){
    Ruch.Value.Mount1(Panel, X, Y, Z, S)
}

function Dver1() //установка оной двери с петлями и ручкой
{
    MatFas.SetActive();
    DverUP = AddFrontPanel(Left + Fuga, CenrtY + Fuga, Right - Fuga, Top - Fuga, Depth);
    DverUP.TextureOrientation = ftoVertical; //направление текстуры
    DverUP.AddButt(ButtD, 0);
    DverUP.AddButt(ButtD, 1);
    DverUP.AddButt(ButtD, 2);
    DverUP.AddButt(ButtD, 3);
    DverUP.Name = 'Дверь верхняя';
    DverX = DverUP.GSize.x / 1000;
    DverY = DverUP.GSize.y / 1000;
    DverZ = MatFas.Thickness / 1000;
    DverPlot = 700;
    DV = DverX * DverY * DverZ * DverPlot;
    DverVes = + DV.toPrecision(3);//вес двери
    Petli();
}

function Dver2() //установка двух дверей с петлями и ручками
{
    MatFas.SetActive()
    DverDN = AddFrontPanel(Left + Fuga, Bottom + Fuga, Right - Fuga, CenrtY - Fuga, Depth);
    DverDN.TextureOrientation = ftoVertical; //направление текстуры
    DverDN.AddButt(ButtD, 0);
    DverDN.AddButt(ButtD, 1);
    DverDN.AddButt(ButtD, 2);
    DverDN.AddButt(ButtD, 3);
    DverDN.Name = 'Дверь нижняя';
    Ruchka(DverDN, CentrX, Bottom + Fuga + 50, DepthDver, 0);
}

function Dver3()
{
    //BeginBlock("Фасад рамочный");
    ProfGor = AddExtrusion();
    ProfGor.MaterialName = 'Профиль рамочный узкий';
    ProfGor.MaterialWidth = 19;
    File = 'Узкий профиль.frw';
    //ProfGor.Contour.Load(File);
    ProfGor.Thickness = SH - Fuga * 2;
    ProfGor.Orient(AxisX, AxisY)
    ProfGor.Position = NewVector(Left + Fuga, Bottom + Fuga, Depth);
    ProfGor.Name = 'Профиль горизонтальный';
    ProfGor.Clip(NewVector(0, 0, 0), NewVector(0, -1, 1));
    ProfGor.Clip(NewVector(0, 0, ProfGor.Thickness), NewVector(0, -1, -1));
    ProfGor.Build();
    ProfGor2 = AddSymmetry(ProfGor, NewVector(0, (Top - Bottom) * 0.25 + Bottom, 0),  AxisY);
    ProfGor2.Build();
    ProfVer = AddExtrusion();
    ProfVer.MaterialName = 'Профиль рамочный узкий';
    ProfVer.MaterialWidth = 19;
    //ProfVer.Contour.Load(File);
    ProfVer.Orient(AxisY, Axis_X)
    ProfVer.Thickness = ((Top - Bottom) * 0.5 - (Fuga * 2));
    ProfVer.Position = NewVector(Right - Fuga, Fuga + Bottom, Depth);
    ProfVer.Name = 'Прфиль вертикальный';
    ProfVer.Clip(NewVector(0, 0, 0), NewVector(0, -1, 1));
    ProfVer.Clip(NewVector(0, 0, ProfVer.Thickness), NewVector(0, -1, -1));
    ProfVer.Build();
    ProfVer2 = AddSymmetry(ProfVer,  NewVector((Right - Left) * 0.5 + Left, 0, 0),  Axis_X);
    ProfVer2.Build();
    FrontPan = AddFrontPanel(Left + Fuga + 12, Bottom + Fuga + 12, Right - Fuga - 12, (CenrtY - Fuga) - 12, Depth + 14)
    FrontPan.Thickness = 4;
    FrontPan.MaterialName = 'Стекло 4 мм';
    FrontPan.Name = 'Стекло для рамки';
    FrontPan.TextureOrientation = TextureOrientation.Horizontal;
    FrontPan.Build();
    XS = FrontPan.GSize.x;
    YS = FrontPan.GSize.y;
    ZS = FrontPan.Thickness;
    VesST = (XS * YS * ZS / 1000000000 * 2500);
    VST = +VesST.toPrecision(3);
    LGor = ProfGor.Thickness * 2;
    LVer = ProfVer.Thickness * 2;
    VesR = (LGor + LVer) / 1000 * 0.3;
    VR = +VesR.toPrecision(3);
    VesFasRam = VST + VR;//вес фасада (рамка + вставка)
}


function MakeShelf()
{
    DeleteNewObjects();

    // границы теперь возьмем из параметров (т.к. они сохраняютя)
    Left = SzLeft.Value;
    Bottom = SzBottom.Value;
    Right = SzLeft.Value + SzWidth.Value;
    Top = SzBottom.Value + SzHeight.Value;
    NameBL = 'Полка ';
    SH = Right - Left;
    SH1 = SH.toFixed().toString();
    BL = BeginParametricBlock(NameBL + SH1);

    Fuga = 2; //зазор для дверей
    CentrX = (SH * 0.5 + Left);//ось шкафа по оси Х
    CenrtY = ((Top - Bottom ) * 0.5 + Bottom);//ось шкафа по оси У
    Depth = DepthVal.Value;

    Offset = ShelfOffset.Value;
    SideMat.SetActive();
    DepthDver = Depth + SideMat.Thickness;
    LeftX = Left + SideMat.Thickness;
    RightX = Right - SideMat.Thickness;
    Y1 = Top - SideMat.Thickness;
    Y2 = Bottom + SideMat.Thickness;
    Z1 = 16;
    ActiveMaterial.Make('ДВП Серая', 4);
    Zadst = AddFrontPanel(LeftX - 5, Y1 + 5, RightX + 5, Y2 - 5, Z1); //установка задней стенки
    Smech = Z1 + Zadst.Thickness;
    CZ = Zadst.Contour;
    SideMat.SetActive();

    //расчет позиций петель по оси Х
    PetX0 = SH - Fuga * 2;
    PetX1 = PetX0 - 200;
    PetX2 = PetX1 % 32;
    PetX3 = ((PetX0 - PetX1 + PetX2) * 0.5) + Left + Fuga;

    //Odds = SH.toFixed(); //ширина корпуса
    LeftPanel = AddVertPanel(0, Bottom, Depth, Top, Left); //установка левого бока
    RightPanel = AddVertPanel(0, Bottom, Depth, Top, RightX); //установка правого бока
    Dno = AddHorizPanel(LeftX, 0, RightX, Depth, Bottom); // установка дна
    Planka = AddHorizPanel(LeftX, 0, RightX, Depth, Top - SideMat.Thickness); // установка крышки сверху

    PosY = Bottom;
    YInc = ((Top - Bottom) - SideMat.Thickness) / 2;
    ShLeft = LeftX + Offset; //зазор для вкалдной полки слева
    ShRight = RightX - Offset; //зазор для вкалдной полки справа
    Prol = ((Y1 - Y2) - SideMat.Thickness * CountPol.Value) / (CountPol.Value + 1)

    //задание текстур для панелей
    LeftPanel.TextureOrientation = ftoVertical;
    RightPanel.TextureOrientation = ftoVertical;
    Dno.TextureOrientation = ftoHorizontal;
    Zadst.TextureOrientation = ftoVertical;
    Planka.TextureOrientation = ftoHorizontal;

    //пазы на панелях
    Cut1 = LeftPanel.AddCut('Паз 16 (4х6)');
    Cut1.Trajectory.AddLine(18, 0, 18, LeftPanel.ContourHeight);
    Cut1.Contour.AddRectangle(-2, 0, 2, 6);
    Cut2 = RightPanel.AddCut('Паз 16 (4х6)');
    Cut2.Trajectory.AddLine(18, 0, 18, RightPanel.ContourHeight);
    Cut2.Contour.AddRectangle(-2, RightPanel.Thickness, 2, RightPanel.Thickness - 6)
    Cut3 = Dno.AddCut('Паз 16 (4х6)');
    Cut3.Trajectory.AddLine(0, -18, Dno.ContourWidth, -18);
    Cut3.Contour.AddRectangle(-2, Dno.Thickness - 6, 2, Dno.Thickness);
    Cut4 = Planka.AddCut('Паз 16 (4х6)'); //паз
    Cut4.Trajectory.AddLine(0, -18, Planka.ContourWidth, -18);
    Cut4.Contour.AddRectangle(-2, 0, 2, 6);

    //кромка на панелях
    LeftPanel.AddButt(ButtC, 0);
    LeftPanel.AddButt(ButtC, 1);
    LeftPanel.AddButt(ButtC, 2);
    LeftPanel.AddButt(ButtC, 3);
    RightPanel.AddButt(ButtC, 0);
    RightPanel.AddButt(ButtC, 1);
    RightPanel.AddButt(ButtC, 2);
    RightPanel.AddButt(ButtC, 3);
    Dno.AddButt(ButtC, 0);
    Dno.AddButt(ButtC, 2);
    Planka.AddButt(ButtC, 0);
    Planka.AddButt(ButtC, 2);

    //названия панелей
    LeftPanel.Name = 'Бок левый';
    RightPanel.Name = 'Бок правый';
    Zadst.Name = 'Задняя стенка';
    Planka.Name = 'Полка';
    Dno.Name = 'Полка';

    A1 = Depth - 37; //установка первого евровинта
    A2 = A1 % 32; //остаток от глубины корпуса
    Zag = ShelfZag.Value; //заглубление вставной полки спереди
    WidthPol = Depth - Smech - ShelfZag.Value;

    //установка вставной полки
    if (ShelfZag.Value < 0 || WidthPol <= 142) {
        alert('Значение заглубления полки не корректно!\nВедите значение заново.')
    } else {
        if (PolkaVs.Value == true) {
            for (var k = 0; k < CountPol.Value; k++)
                if (ShelfOffset.Value < 0 || ShelfOffset.Value > 5) {
                    alert('Значение отступа полки не корректно!\nВведите значение заново.')
                } else {
                    if (ShelfOffset.Value > 0) {
                        Y2 += Prol;
                        SideMat.SetActive();
                        Zpol = Depth - Zag;
                        Polka = AddHorizPanel(ShLeft, Smech, ShRight, Zpol, Y2);
                        ZPD1 = A2 + 64; //отв под полкодержатель сзади
                        OstFase = (Zpol - ZPD1) % 32;
                        ZPD2 = Zpol - OstFase - 32
                        Polka.TextureOrientation = ftoHorizontal;
                        Polka.AddButt(ButtC, 0);
                        Polka.AddButt(ButtC, 1);
                        Polka.AddButt(ButtC, 2);
                        Polka.AddButt(ButtC, 3);
                        Polka.Name = 'Полка вставная';
                        Polkoder = Полкодержатель.Value;
                        Polkoder.Mount(Polka, LeftPanel, ShLeft, Y2, ZPD1);
                        Polkoder.Mount(Polka, RightPanel, ShRight, Y2, ZPD1);
                        Polkoder.Mount(Polka, LeftPanel, ShLeft, Y2, ZPD2);
                        Polkoder.Mount(Polka, RightPanel, ShRight, Y2, ZPD2);
                        Y2 += SideMat.Thickness;
                    } else {
                        Y2 += Prol;
                        SideMat.SetActive();
                        Zpol = Depth - Zag;
                        Polka = AddHorizPanel(ShLeft, Smech, ShRight, Zpol, Y2);
                        ZPD1 = A2 + 64; //отв под полкодержатель сзади
                        OstFase = (Zpol - ZPD1) % 32;
                        ZPD2 = Zpol - OstFase - 32
                        Polka.TextureOrientation = ftoHorizontal;
                        Polka.AddButt(ButtC, 2);
                        Polka.Name = 'Полка';
                        EvrAndShkant(Polka, LeftPanel, LeftX, PosY, (A2 + 32), 32);
                        EvrAndShkant(Polka, RightPanel, RightX, PosY, (A2 + 32), 32);
                        EvrAndShkant(Polka, LeftPanel, LeftX, PosY, ZPD2, -32);
                        EvrAndShkant(Polka, RightPanel, RightX, PosY, ZPD2, -32);
                        Y2 += SideMat.Thickness;
                    }
                }
        }
    }

        CZ.Clear();
        CZ.AddLine(0, -Zadst.GSize.y, 0, -43);
        CZ.AddLine(0, -43, 16, -43);
        CZ.AddLine(16, -43, 16, 0);
        CZ.AddLine(16, 0, Zadst.GSize.x - 16, 0);
        CZ.AddLine(Zadst.GSize.x - 16, 0, Zadst.GSize.x - 16, -43);
        CZ.AddLine(Zadst.GSize.x - 16, -43, Zadst.GSize.x, -43);
        CZ.AddLine(Zadst.GSize.x, -43, Zadst.GSize.x, -Zadst.GSize.y);
        CZ.AddLine(Zadst.GSize.x, -Zadst.GSize.y, 0, -Zadst.GSize.y);

        EvrAndShkant(Dno, LeftPanel, LeftX, Y2, (A2 + 32), 32);
        EvrAndShkant(Dno, RightPanel, RightX, Y2, (A2 + 32), 32);
        EvrAndShkant(Dno, LeftPanel, LeftX, Y2, (Depth - 37), -32);
        EvrAndShkant(Dno, RightPanel, RightX, Y2, (Depth - 37), -32);
        EvrAndShkant(Planka, LeftPanel, LeftX, PosY, (A2 + 32), 32);
        EvrAndShkant(Planka, RightPanel, RightX, PosY, (A2 + 32), 32);
        EvrAndShkant(Planka, LeftPanel, LeftX, PosY, (Depth - 37), -32);
        EvrAndShkant(Planka, RightPanel, RightX, PosY, (Depth - 37), -32);
        NavesL = НавескаЛевая.Value;
        NavesL.Mount(Planka, LeftPanel, LeftX, Y1, Smech);
        NavesR = НавескаПравая.Value;
        NavesR.Mount(Planka, RightPanel, RightX, Y1, Smech);

    Dver1();
    Dver3();
    BL = EndParametricBlock();
    SumFas = VesFasRam + DverVes;
    if (VesFas == undefined)
      VesFas = Doors.NewNumber('Вес фасадов');
    VesFas.Value = SumFas;
    VesFas.Enabled = false;
    system.log(SumFas);
}