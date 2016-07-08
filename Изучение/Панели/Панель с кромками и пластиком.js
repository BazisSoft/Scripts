Material = NewMaterialInput("��������");
Butt = NewButtMaterialInput("������");
Butt2 = NewButtMaterialInput("������2");
Plastic = NewMaterialInput("�������");
Btn = NewButtonInput("OK");
MakePanel(); // �������� ������
Action.Continue(); // �� ����� ��������� ������ �����

function MakePanel() {
    // �������� ������ �� Material
    Material.SetActive();
    Panel = AddPanel(200, 300);

    // �������� ������ �� ���� ����� � ���
    Panel.Contour.Clear();
    p1 = NewPoint(0, 0);
    p2 = NewPoint(100, 0);
    p3 = NewPoint(0, 100);
    L1 = Panel.Contour.AddLine(p1, p2);
    L2 = Panel.Contour.AddArc3(p2,  NewPoint(80, 80),  p3);
    L3 = Panel.Contour.AddLine(p3, p1);

    // ������� �� ������������� ������� ���� ������,
    // � �� ������������� ������
    Panel.AddButt(Butt, L1);
    Panel.AddButt(Butt2, L2);
    Panel.AddButt(Butt, L3);

    // ������� ������� � ����� ������
    Panel.AddPlastic(Plastic, true);
    Panel.AddPlastic(Plastic, false);

    // �������� ��������� � ������
    Panel.Build();
}

// ������� ���������� ������������� ��� ������� ��
// ����� ������� �����
function $input(id) {
  // ������ ������ ���� � ��� ���������
  DeleteNewObjects();
  MakePanel();

  // ���� ������ �� ������ ���������, �� ��������� ������
  if (id == Btn.id)
    return true;  
}