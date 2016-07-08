FileOptions = '���������.xml';
var ns
MakeProperties();
ns = SelectNishe();
MakeBoxes(ns);
Action.Hint = '���������� ��������� �����';

BtnOk = NewButtonInput("���������");
BtnOk.OnChange = function() {
    Action.Finish()
};

Action.Continue();

function MakeProperties() {
    Prop = Action.Properties;

    Prop.OnChange = function() {
        if (ns) MakeBoxes(ns)
    };

    P = Prop.NewImage('����������', 'KULAKFAS4.bmp');
    BoxName = Prop.NewString('��� �����', '����');
    BoxCount = Prop.NewNumber('����������', 1);
    P = Prop.NewImage('����������', '���.wmf');

    Front = P.NewMaterial('�����');
    fo1 = Front.NewNumber('������� �� �����');
    fo1.Store = false;
    fo2 = Front.NewNumber('������ ������');
    fo3 = Front.NewNumber('������ �����');
    fo3.NewBool('��������');

    bottom = P.NewMaterial('���');
    bottom.NewNumber('B - Bd', 0);

    botd = bottom.NewImage('����������� ��� � ������', '����������� ���.wmf');
    botd.MaxHeight = 70;
    botd.NewNumber('Xz');
    botd.NewNumber('Xf');
    botd.NewNumber('Ld');

    Bok = P.NewMaterial('��������');
    BokButt = Bok.NewButt('������');

    back = P.NewBool('������ ������', true);
    back.OnChange = function() {
        back.ChildrenEnabled = back.Value
    }
    back.NewMaterial('��������');
    furn1 = back.NewFurniture('�����');
    back.NewNumber('Hz', 0);
    back.NewNumber('B-Bz', 0);
    back.NewNumber('B-Bz1', 0);

    P = Prop.NewImage('����������', 'KULAKFAS4.bmp');

    Action.Properties.Load(FileOptions);
    botd.Load('���.xml')
    Action.OnFinish = function() {
        Action.Properties.Save(FileOptions);
        botd.Save('���.xml');
    };
}

function MakeBoxes(nishe) {
    DeleteNewObjects();
    Count = BoxCount.Value;
    y1 = nishe.y1;
    y2 = nishe.y2;
    dy = (nishe.y2 - nishe.y1) / Count;
    nishe.y2 = nishe.y1;
    for (var k = 0; k < Count; k++) {
        nishe.y1 = nishe.y2;
        nishe.y2 = nishe.y1 + dy;
        MakeBox(nishe);
    }
    nishe.y1 = y1;
    nishe.y2 = y2;
}

function MakeBox(nishe) {

    KromkaBok = function(bok) {
        for (k = 0; k < bok.Contour.Count; k++) {
            bok.AddButt(BokButt, k);
        }
        bok.Build();
    }

    BeginBlock(BoxName.Value);
    Front.SetActive();
    Facade = AddFrontPanel(nishe.x1, nishe.y1, nishe.x2, nishe.y2, nishe.z2);
    bottom.SetActive();
    Dno = AddHorizPanel(nishe.x1, nishe.z1, nishe.x2, nishe.z2, nishe.y1);
    Bok.SetActive();
    Bok1 = AddVertPanel(nishe.z1, nishe.y1, nishe.z2, nishe.y2, nishe.x1);
    Bok2 = AddVertPanel(nishe.z1, nishe.y1, nishe.z2, nishe.y2, nishe.x2 - ActiveMaterial.Thickness);
    KromkaBok(Bok1);
    KromkaBok(Bok1);
    furn1.Value.Mount(Dno, Bok1, nishe.x1 + 100, nishe.y1 + 100, (nishe.z1 + nishe.z2) / 2);
    EndBlock();
}

// ����� ����
function SelectNishe() {
    var nishe = {};
    var x1 = GetEdge("������� ����� �������", AxisY).First.x;
    var x2 = GetEdge("������� ������ �������", AxisY).First.x;
    nishe.x1 = Math.min(x1, x2);
    nishe.x2 = Math.max(x1, x2);

    var y1 = GetEdge("������� ������� �������", AxisX).First.y;
    var y2 = GetEdge("������� ������ �������", AxisX).First.y;
    nishe.y1 = Math.min(y1, y2);
    nishe.y2 = Math.max(y1, y2);
    nishe.z1 = Model.GMin.z;
    nishe.z2 = Model.GMax.z;
    return nishe;
}