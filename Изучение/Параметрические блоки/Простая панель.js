// ������� ���������
Prop = Action.Properties;
Mt = Prop.NewMaterial('��������');
Butt = Prop.NewButt('������');
w = Prop.NewNumber('������', 200);
h = Prop.NewNumber('������', 300);

// �������� ������ ���������� ��������������
Prop.NewButton('���������').OnClick = function() {
  Action.Finish();
}

// ������������� ������ ��� ��������� ��������
Prop.OnChange = function() {
    DeleteNewObjects(); // ������� ������� �������
    BeginParametricBlock("��������������� ������"); // � �������� ��������������� ����
    Mt.SetActive();
    P = AddFrontPanel(0, 0, w.Value, h.Value, 0);
    P.AddButt(Butt, 0); P.AddButt(Butt, 1);
    P.AddButt(Butt, 2); P.AddButt(Butt, 3);
    EndParametricBlock();  // �������� �������� �����
}

// �������� ������ ��� ������� �������
Prop.OnChange();
// � ���� ���������� ��������������
Action.Continue();