var Panel;
P1 = GetPoint('������� ������ �����');
Panel = AddPanel(100, 100);
Panel.Position = P1;
Panel.Visible = false;
Action.Hint = '������� ������ �����';
Action.ShowPoints = true; // ������������ �����
Action.Cursor = acPointer; // �������� �����
Width = NewFloatInput('������');
Height = NewFloatInput('������');
Action.Continue(); // �� ��������� �������� �����

function VectorNeg(v) { return NewVector(-v.x, -v.y, -v.z )};

// ���������� �������� ����
Action.OnMove = function() {
    if (Panel) {
        Panel.Visible = true;
        Panel.Orient(VectorNeg(Action.ViewDir), Action.UpDir);
        Panel.Contour.Clear();
        p2 = Panel.ToObject(Action.Pos3);
        if (Width.Fixed)
            p2.x = Width.Value * sign(p2.x);
        if (Height.Fixed)
            p2.y = Height.Value * sign(p2.y);
        Panel.Contour.AddRectangle(0, 0, p2.x, p2.y);
        Width.Value = Math.abs(p2.x);
        Height.Value = Math.abs(p2.y);
        Panel.Build();
    }
}

// ���������� ����� ����
Action.OnClick = function() {
    if (Panel)
        return true; // ��������� ��������
}

// ���������� ��������� ����������
Width.OnChange = Height.OnChange = function() {
    Action.OnMove();
    if (Width.Fixed && Height.Fixed) {
        return true; // ��������� ��������
    }
}