p1 = GetPoint('������� ������ �����');
p2 = GetPoint('������� ������ �����');
Panel = AddFrontPanel(p1.x, p1.y, p2.x, p2.y, p1.z);
Panel.Contour.AddCircle( (p2.x - p1.x) / 2, (p2.y - p1.y) / 2, 10);
