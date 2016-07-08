Panel = AddPanel(200, 100);
// нижний паз
Cut1 = Panel.AddCut('Паз1');
Cut1.Trajectory.AddLine(0, 0, 200, 0);
Cut1.Contour.AddRectangle(0, 0, 10, 5);

// верхний паз
Cut2 = Panel.AddCut('Паз2');
Cut2.Trajectory.AddLine(200, 100, 0, 100);
Cut2.Contour.AddRectangle(0, Panel.Thickness, 10, Panel.Thickness - 5);