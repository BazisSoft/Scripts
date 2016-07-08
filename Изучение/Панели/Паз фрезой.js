Profile = 'Фреза.frw';
Panel = AddPanel(200, 100);

Cut = Panel.AddCut('Паз сзади');
Cut.Trajectory.AddRectangle(20, 20, 180, 80);
Cut.Contour.Load(Profile);
Cut.Contour.Symmetry(0, 0, 1, 0, false);

Cut = Panel.AddCut('Паз спереди');
Cut.Trajectory.AddRectangle(10, 10, 190, 90);
Cut.Contour.Load(Profile);
Cut.Contour.Move(0, Panel.Thickness);