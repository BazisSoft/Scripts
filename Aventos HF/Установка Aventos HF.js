Left = 0;
Right = 0;
Top = 0;
Bottom = 0;

// ���� ��� �� ����� ��������������, �� ��������� �������
if (!ParametricBlock)
{
    SetCamera(p3dFront);
    Left = GetEdge('������� ������ ������������ �������', AxisY).GFirst.x;
    Right = GetEdge('������� ������ ������������ �������', AxisY).GFirst.x;
    Top = GetEdge('������� ������ �������������� �������', AxisX).GFirst.y;
    Bottom = GetEdge('������� ������ �������������� �������', AxisX).GFirst.y;

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

BtnOK = NewButtonInput("���������")
BtnOK.OnChange = function() {Action.Finish()};

function MakeProp() {
    Prop = Action.Properties;

    //������ ������
    Korp = Prop.NewGroup('������');
    SzLeft = Korp.NewNumber('����', Left);
    SzLeft.Visible = false;
    SzBottom = Korp.NewNumber('���', Bottom);
    SzBottom.Visible = false;
    SzWidth = Korp.NewNumber('������', Right - Left);
    SzHeight = Korp.NewNumber('������', Top - Bottom);
    DepthVal = Korp.NewNumber('�������');
    DepthVal.Value = 298;
    SideMat = Korp.NewMaterial('��� �������');
    ButtC = Korp.NewButt('������ �������');

    //������ �������� �����
    PolkaVs = Prop.NewBool('�������� �����');
    PolkaVs.Value = true;
    PolkaVs.OnChange = function() {PolkaVs.ChildrenEnabled = PolkaVs.Value};
    CountPol = PolkaVs.NewNumber('����������');
    CountPol.Value = 1;
    ShelfOffset = PolkaVs.NewNumber('������ � �����');
    ShelfOffset.Value = 1.5;
    ShelfZag = PolkaVs.NewNumber('�����������');
    ShelfZag.Value = 22;

    //������ �����
    Doors = Prop.NewCombo('������', '������ - ������\n������ - �����\n����� - ������\n����� - �����');
    //VesFas = Doors.NewNumber('��� �������');
    //VesFas.Enabled = false;
    //VesFas.Value = SumFas;
    MatFas = Doors.NewMaterial('��������');
    ButtD = Doors.NewButt('������');
    KolDv = Doors.NewCombo('���-�� ������',  '1\n2');
    PetliLeftRight = Doors.NewCombo('�����', '�����\n������');

    //������ ����������
    Stolesh = Prop.NewBool('����������');
    Stolesh.Value = true;
    Stolesh.OnChange = function() {Stolesh.ChildrenEnabled = Stolesh.Value};
    MatStol = Stolesh.NewMaterial('��������');

    // ������ ���������
    FurnGroup = Prop.NewGroup('���������');
    Ruch = FurnGroup.NewFurniture('�����');
    Angle = FurnGroup.NewCombo('���� �������� �����',  '0\n90')
    ����� = FurnGroup.NewFurniture('�����');
    Pet = FurnGroup.NewFurniture('�����');
    ������������ = FurnGroup.NewFurniture('������� �����');
    ������������� = FurnGroup.NewFurniture('������� ������');
    �������� = FurnGroup.NewFurniture('��������');
    �������������� = FurnGroup.NewFurniture('��������������');
    ����� = FurnGroup.NewFurniture('�����');

    //��������� ������� ������
    Btn = Prop.NewButton('���������');
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
        ������������.Enabled = true;
        �������������.Enabled = true;
        �����.Enabled = false;
    } else {
        ������������.Enabled = false;
        �������������.Enabled = false;
        �����.Enabled = true;
    }

    if (Angle.ItemIndex == 0)
        Fi = 0;
    else
        Fi = 90;

    if (DepthVal.Value <= 199)
        alert('������� ������ ����� 200 ��!\n������ �������� ������.')
    else
        MakeShelf();
}


Action.OnStart = function ()//��������� ������� � ����� ����� ����� ��������
{
    Prop.OnChange = Primenit;
    Primenit();
};


Action.Continue();

function EvrAndShkant(Panel1, Panel2, X, Y, Z, Sdvig) {
    ��������.Value.Mount(Panel1, Panel2, X, Y, Z);
    �����.Value.Mount(Panel1, Panel2, X, Y, Z + Sdvig);
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

function Dver1() //��������� ���� ����� � ������� � ������
{
    MatFas.SetActive();
    DverUP = AddFrontPanel(Left + Fuga, CenrtY + Fuga, Right - Fuga, Top - Fuga, Depth);
    DverUP.TextureOrientation = ftoVertical; //����������� ��������
    DverUP.AddButt(ButtD, 0);
    DverUP.AddButt(ButtD, 1);
    DverUP.AddButt(ButtD, 2);
    DverUP.AddButt(ButtD, 3);
    DverUP.Name = '����� �������';
    DverX = DverUP.GSize.x / 1000;
    DverY = DverUP.GSize.y / 1000;
    DverZ = MatFas.Thickness / 1000;
    DverPlot = 700;
    DV = DverX * DverY * DverZ * DverPlot;
    DverVes = + DV.toPrecision(3);//��� �����
    Petli();
}

function Dver2() //��������� ���� ������ � ������� � �������
{
    MatFas.SetActive()
    DverDN = AddFrontPanel(Left + Fuga, Bottom + Fuga, Right - Fuga, CenrtY - Fuga, Depth);
    DverDN.TextureOrientation = ftoVertical; //����������� ��������
    DverDN.AddButt(ButtD, 0);
    DverDN.AddButt(ButtD, 1);
    DverDN.AddButt(ButtD, 2);
    DverDN.AddButt(ButtD, 3);
    DverDN.Name = '����� ������';
    Ruchka(DverDN, CentrX, Bottom + Fuga + 50, DepthDver, 0);
}

function Dver3()
{
    //BeginBlock("����� ��������");
    ProfGor = AddExtrusion();
    ProfGor.MaterialName = '������� �������� �����';
    ProfGor.MaterialWidth = 19;
    File = '����� �������.frw';
    //ProfGor.Contour.Load(File);
    ProfGor.Thickness = SH - Fuga * 2;
    ProfGor.Orient(AxisX, AxisY)
    ProfGor.Position = NewVector(Left + Fuga, Bottom + Fuga, Depth);
    ProfGor.Name = '������� ��������������';
    ProfGor.Clip(NewVector(0, 0, 0), NewVector(0, -1, 1));
    ProfGor.Clip(NewVector(0, 0, ProfGor.Thickness), NewVector(0, -1, -1));
    ProfGor.Build();
    ProfGor2 = AddSymmetry(ProfGor, NewVector(0, (Top - Bottom) * 0.25 + Bottom, 0),  AxisY);
    ProfGor2.Build();
    ProfVer = AddExtrusion();
    ProfVer.MaterialName = '������� �������� �����';
    ProfVer.MaterialWidth = 19;
    //ProfVer.Contour.Load(File);
    ProfVer.Orient(AxisY, Axis_X)
    ProfVer.Thickness = ((Top - Bottom) * 0.5 - (Fuga * 2));
    ProfVer.Position = NewVector(Right - Fuga, Fuga + Bottom, Depth);
    ProfVer.Name = '������ ������������';
    ProfVer.Clip(NewVector(0, 0, 0), NewVector(0, -1, 1));
    ProfVer.Clip(NewVector(0, 0, ProfVer.Thickness), NewVector(0, -1, -1));
    ProfVer.Build();
    ProfVer2 = AddSymmetry(ProfVer,  NewVector((Right - Left) * 0.5 + Left, 0, 0),  Axis_X);
    ProfVer2.Build();
    FrontPan = AddFrontPanel(Left + Fuga + 12, Bottom + Fuga + 12, Right - Fuga - 12, (CenrtY - Fuga) - 12, Depth + 14)
    FrontPan.Thickness = 4;
    FrontPan.MaterialName = '������ 4 ��';
    FrontPan.Name = '������ ��� �����';
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
    VesFasRam = VST + VR;//��� ������ (����� + �������)
}


function MakeShelf()
{
    DeleteNewObjects();

    // ������� ������ ������� �� ���������� (�.�. ��� ����������)
    Left = SzLeft.Value;
    Bottom = SzBottom.Value;
    Right = SzLeft.Value + SzWidth.Value;
    Top = SzBottom.Value + SzHeight.Value;
    NameBL = '����� ';
    SH = Right - Left;
    SH1 = SH.toFixed().toString();
    BL = BeginParametricBlock(NameBL + SH1);

    Fuga = 2; //����� ��� ������
    CentrX = (SH * 0.5 + Left);//��� ����� �� ��� �
    CenrtY = ((Top - Bottom ) * 0.5 + Bottom);//��� ����� �� ��� �
    Depth = DepthVal.Value;

    Offset = ShelfOffset.Value;
    SideMat.SetActive();
    DepthDver = Depth + SideMat.Thickness;
    LeftX = Left + SideMat.Thickness;
    RightX = Right - SideMat.Thickness;
    Y1 = Top - SideMat.Thickness;
    Y2 = Bottom + SideMat.Thickness;
    Z1 = 16;
    ActiveMaterial.Make('��� �����', 4);
    Zadst = AddFrontPanel(LeftX - 5, Y1 + 5, RightX + 5, Y2 - 5, Z1); //��������� ������ ������
    Smech = Z1 + Zadst.Thickness;
    CZ = Zadst.Contour;
    SideMat.SetActive();

    //������ ������� ������ �� ��� �
    PetX0 = SH - Fuga * 2;
    PetX1 = PetX0 - 200;
    PetX2 = PetX1 % 32;
    PetX3 = ((PetX0 - PetX1 + PetX2) * 0.5) + Left + Fuga;

    //Odds = SH.toFixed(); //������ �������
    LeftPanel = AddVertPanel(0, Bottom, Depth, Top, Left); //��������� ������ ����
    RightPanel = AddVertPanel(0, Bottom, Depth, Top, RightX); //��������� ������� ����
    Dno = AddHorizPanel(LeftX, 0, RightX, Depth, Bottom); // ��������� ���
    Planka = AddHorizPanel(LeftX, 0, RightX, Depth, Top - SideMat.Thickness); // ��������� ������ ������

    PosY = Bottom;
    YInc = ((Top - Bottom) - SideMat.Thickness) / 2;
    ShLeft = LeftX + Offset; //����� ��� �������� ����� �����
    ShRight = RightX - Offset; //����� ��� �������� ����� ������
    Prol = ((Y1 - Y2) - SideMat.Thickness * CountPol.Value) / (CountPol.Value + 1)

    //������� ������� ��� �������
    LeftPanel.TextureOrientation = ftoVertical;
    RightPanel.TextureOrientation = ftoVertical;
    Dno.TextureOrientation = ftoHorizontal;
    Zadst.TextureOrientation = ftoVertical;
    Planka.TextureOrientation = ftoHorizontal;

    //���� �� �������
    Cut1 = LeftPanel.AddCut('��� 16 (4�6)');
    Cut1.Trajectory.AddLine(18, 0, 18, LeftPanel.ContourHeight);
    Cut1.Contour.AddRectangle(-2, 0, 2, 6);
    Cut2 = RightPanel.AddCut('��� 16 (4�6)');
    Cut2.Trajectory.AddLine(18, 0, 18, RightPanel.ContourHeight);
    Cut2.Contour.AddRectangle(-2, RightPanel.Thickness, 2, RightPanel.Thickness - 6)
    Cut3 = Dno.AddCut('��� 16 (4�6)');
    Cut3.Trajectory.AddLine(0, -18, Dno.ContourWidth, -18);
    Cut3.Contour.AddRectangle(-2, Dno.Thickness - 6, 2, Dno.Thickness);
    Cut4 = Planka.AddCut('��� 16 (4�6)'); //���
    Cut4.Trajectory.AddLine(0, -18, Planka.ContourWidth, -18);
    Cut4.Contour.AddRectangle(-2, 0, 2, 6);

    //������ �� �������
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

    //�������� �������
    LeftPanel.Name = '��� �����';
    RightPanel.Name = '��� ������';
    Zadst.Name = '������ ������';
    Planka.Name = '�����';
    Dno.Name = '�����';

    A1 = Depth - 37; //��������� ������� ���������
    A2 = A1 % 32; //������� �� ������� �������
    Zag = ShelfZag.Value; //����������� �������� ����� �������
    WidthPol = Depth - Smech - ShelfZag.Value;

    //��������� �������� �����
    if (ShelfZag.Value < 0 || WidthPol <= 142) {
        alert('�������� ����������� ����� �� ���������!\n������ �������� ������.')
    } else {
        if (PolkaVs.Value == true) {
            for (var k = 0; k < CountPol.Value; k++)
                if (ShelfOffset.Value < 0 || ShelfOffset.Value > 5) {
                    alert('�������� ������� ����� �� ���������!\n������� �������� ������.')
                } else {
                    if (ShelfOffset.Value > 0) {
                        Y2 += Prol;
                        SideMat.SetActive();
                        Zpol = Depth - Zag;
                        Polka = AddHorizPanel(ShLeft, Smech, ShRight, Zpol, Y2);
                        ZPD1 = A2 + 64; //��� ��� �������������� �����
                        OstFase = (Zpol - ZPD1) % 32;
                        ZPD2 = Zpol - OstFase - 32
                        Polka.TextureOrientation = ftoHorizontal;
                        Polka.AddButt(ButtC, 0);
                        Polka.AddButt(ButtC, 1);
                        Polka.AddButt(ButtC, 2);
                        Polka.AddButt(ButtC, 3);
                        Polka.Name = '����� ��������';
                        Polkoder = ��������������.Value;
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
                        ZPD1 = A2 + 64; //��� ��� �������������� �����
                        OstFase = (Zpol - ZPD1) % 32;
                        ZPD2 = Zpol - OstFase - 32
                        Polka.TextureOrientation = ftoHorizontal;
                        Polka.AddButt(ButtC, 2);
                        Polka.Name = '�����';
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
        NavesL = ������������.Value;
        NavesL.Mount(Planka, LeftPanel, LeftX, Y1, Smech);
        NavesR = �������������.Value;
        NavesR.Mount(Planka, RightPanel, RightX, Y1, Smech);

    Dver1();
    Dver3();
    BL = EndParametricBlock();
    SumFas = VesFasRam + DverVes;
    if (VesFas == undefined)
      VesFas = Doors.NewNumber('��� �������');
    VesFas.Value = SumFas;
    VesFas.Enabled = false;
    system.log(SumFas);
}