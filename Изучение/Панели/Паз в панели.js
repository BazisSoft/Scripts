Panel = AddPanel(200, 100);
// ������ ���
Cut1 = Panel.AddCut('���1');
Cut1.Trajectory.AddLine(0, 0, 200, 0);
Cut1.Contour.AddRectangle(0, 0, 10, 5);

// ������� ���
Cut2 = Panel.AddCut('���2');
Cut2.Trajectory.AddLine(200, 100, 0, 100);
Cut2.Contour.AddRectangle(0, Panel.Thickness, 10, Panel.Thickness - 5);