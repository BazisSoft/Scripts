KrMat = NewButtMaterialInput("������");
BtnStop = NewButtonInput("���������");

// ��������� ��������� � ����������� �����
// ��� ������� �� ������ ������� ������ ��� ����� ����������, �.�.
// �� �������� ������� GetObject()
while (true) {
    Panel = GetPanel("������� ������");
    // ������� Panel.Butts ���������,
    // ��� � ���������� ������� ���� �������� ������
    // (�.�. �� ������� ������ ������)
    if (Panel.Butts.Count == 0) {
        // ���������� ����� ��������������� ��������
        // ����� ��� ��������� �������� ���� �� ��������
        StartEditing(Panel);
        // ��������� ���� ��������� ������� ������
        for (i = 0; i < Panel.Contour.Count; i++) {
            Panel.AddButt(KrMat, i);
        }
    } else
        alert('������ ��� ����������');
}

function $input(id) {
    // ���� ������ �� ������ ������
    if (id == BtnStop.id)
    // �� ��������� ������
        return true;
}