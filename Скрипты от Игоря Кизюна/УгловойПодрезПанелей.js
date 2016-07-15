function PrintObjects(Object) {
  for (var Key in Object) {
    system.log(Key + ':' + Object[Key] + '\n');
  }
};

function IsEqualObjects(Object, Compare) {
  for (var Key in Compare) {
    if (Object[Key] !== Compare[Key]) return false;
  }
  return true;
};

function RadiansToAngle(Radians) {
  return 180 / Math.PI * Radians
}

function VectorAdd(A, B) {
  return NewVector(A.x + B.x, A.y + B.y, A.z + B.z);
}

function GAxisXYInPanel(Panel) {
  return VectorAdd(Panel.NToGlobal(AxisX), Panel.NToGlobal(AxisY));
}

function IsEdgeInPanel(Edge, Panel) {
  fSuccess = false;
  for (var i = 0; i < Panel.EdgesCount; i++) {
    if (IsEqualObjects(Panel.Edges[i].GFirst, Edge.GFirst) &&
      IsEqualObjects(Panel.Edges[i].GLast, Edge.GLast) ||
      IsEqualObjects(Panel.Edges[i].GFirst, Edge.GLast) &&
      IsEqualObjects(Panel.Edges[i].GLast, Edge.GFirst)) {
      fSuccess = true;
      return Panel.Edges[i];
    }
  }
};

function GetEgeInPanel(Hint, Panel, Dir) {
  do {
    Edge = GetEdge(Hint, Dir);
    Result = IsEdgeInPanel(Edge, Panel);
    if (!fSuccess) {
      alert('Selected edge is error!')
    } else {
      Edge = Result;
    };
  } while (!fSuccess);
  return Edge;
};

function GetNormEdge(Edge, Panel) {
  if (IsEqualObjects(Edge.Dir(), AxisX) ||
      IsEqualObjects(Edge.Dir(), Axis_X)) {
    Axis = AxisY;
  } else {
    Axis = AxisX;
  }
  for (var i = 0; i < Panel.EdgesCount; i++) {
    if (IsEqualObjects(Axis, Panel.Edges[i].Dir())) {
      return Panel.Edges[i];
    }
  }
};

function GetAngle(PanelA, PanelB, EdgeA) {
  Contour = NewContour();
  Edge = GetNormEdge(EdgeA, PanelA);
  First = PanelA.ToObject(Edge.First);
  Last = PanelA.ToObject(Edge.Last);
  Contour.AddLine(First.x, First.z, Last.x, Last.z);
  Edge = GetNormEdge(EdgeA, PanelB);
  First = PanelB.ToObject(Edge.First);
  Last = PanelB.ToObject(Edge.Last);
  Contour.AddLine(First.x, First.z, Last.x, Last.z);

  Contour.OrderContours(true);
  if (Contour.IsClockOtherWise()) Contour.InvertDirection();
  Angle = Contour.Objects[0].LineAngle() - Contour.Objects[1].LineAngle();
  if (Math.abs(Angle) >= 0 && Math.abs(Angle) <= Math.PI) {
    Angle = Math.abs(Angle);
  } else {
    Angle = Math.PI * 2 - Math.abs(Angle);
  }
  return parseFloat(Angle.toFixed(12));
}

function SetCut(Panel, Angle, Edge) {
  StartEditing(Panel);
  Cut = Panel.AddCut('Уг XX гр.');
  Contour = Cut.Contour;
  Contour.AddLine(0, 0, 0, Panel.Thickness);
  Contour.AddLine(0, Panel.Thickness, Panel.Thickness * Math.tan(Angle), Panel.Thickness);
  Contour.AddLine(Panel.Thickness * Math.tan(Angle), Panel.Thickness, 0, 0);
  if (Edge.First.z != Panel.Thickness) {
    Contour.Rotate(0, Panel.Thickness / 2, 180);
    Trajectory = Cut.Trajectory.AddLine(Edge.Last.x, Edge.Last.y, Edge.First.x, Edge.First.y);
  } else {
    Contour.Rotate(0, Panel.Thickness / 2, 0);
    Trajectory = Cut.Trajectory.AddLine(Edge.First.x, Edge.First.y, Edge.Last.x, Edge.Last.y);
  }
  Cut.Sign = 'Уг ' + Math.abs(RadiansToAngle(Angle).toFixed(3)).toString().replace(/\./, ',') + ' гр.';
  Panel.Build();
}

function DeleteCuts(Panel) {
  StartEditing(Panel);
  for (var i = 0; i < Panel.Cuts.Count; i ++) {
    Panel.Cuts.Delete(Panel.Cuts[i]);
  }
  Panel.Build();
}

var fSuccess = false;

Panel01 = GetPanel('Panel01');
Panel02 = GetPanel('Panel02');
Edge01 = GetEgeInPanel('Edge01', Panel01, GAxisXYInPanel(Panel01));
A = GetAngle(Panel01, Panel02, Edge01);
system.log(RadiansToAngle(A));
if (confirm('Выпоdлнить биссекторный подрез панелей?')) {
  SetCut(Panel01, A / 2, Edge01);
  Edge02 = GetEgeInPanel('Edge02', Panel02, GAxisXYInPanel(Panel02));
  SetCut(Panel02, A / 2, Edge02);
} else {
  SetCut(Panel01, Math.PI - Math.PI / 2 - A, Edge01);
}