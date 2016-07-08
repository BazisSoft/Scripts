Panel = AddPanel();
C = Panel.Contour;
C.Clear();
// ������������� � ����� ������
L1 = C.AddLine(0, 0, 300, 0);
L2 = C.AddLine(300, 0, 300, 200);
C.AddArc3(NewPoint(300, 200), NewPoint(150, 250), NewPoint(0, 200));
L3 = C.AddLine(0, 200, 0, 0);

//���������� ������� ������ ����
C.Rounding(290, 10, 20);
//����� �� ����� ������
C.Facet(10, 10, 20);

//����� �����
Hole = NewContour();
Hole.AddCircle(150, 20, 60);
C.Substraction(Hole);

// ���������� ������
C.Rounding(80, 20, 25);
C.Rounding(220, 20, 25);

Panel2 = AddPanel();
Panel2.PositionY = 300;
C2 = Panel2.Contour;
C2.Clear();
// ������������� �� ������������ ������
C2.AddRoundRect(0, 0, 150, 100, 25);
// ��������� ������������ �����
C2.Symmetry(160, 0, 160, 1, true);
// ������� ������ ������ ��������������
C2.Fit(0, 0, 320, 200);