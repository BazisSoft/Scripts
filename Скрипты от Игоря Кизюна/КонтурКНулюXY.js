var Items = new Array();

function ToArray(List) {
  var Result = new Array();
  for (var i = 0; i < List.Count; i++) {
    if (List[i].List === true) {
      Result = Result.concat(ToArray(List[i]));
    } else {
      Result.push(List[i]);
    };
  };
  return Result;
};

if (Model.Selected) {
  for (var i = 0; i < Model.SelectionCount; i++) {
    if (Model.Selections[i].List === true) {
      Items = Items.concat(ToArray(Model.Selections[i]));
    } else {
      Items.push(Model.Selections[i]);
    };
  };
} else {
  if (confirm('Редактировать все объекты модели?')) {
    Items = ToArray(Model);
  } else {
    Action.Cancel();
  };
};

for (var i = 0; i < Items.length; i++) {
  Object      = Items[i];
  Owner       = Items[i].Owner;
  Contour     = Items[i].Contour;
  Cuts        = Items[i].Cuts;
  BentContour = Items[i].BentContour;
  if (Object != '[object TFastenerHole]') {
    if (Contour) {
      Undo.Changing(Object);
      Object.Position = Owner.ToObject(Object.ToGlobal(Contour.Min));
      Offset          = NewPoint(-Contour.Min.x, -Contour.Min.y);
      Contour.Move(Offset.x, Offset.y);
      if (BentContour) {
          BentContour.Move(-BentContour.Min.x, -BentContour.Max.y);
        };
      if (Cuts) {
        for (var j = 0; j < Cuts.Count; j++) {
          Cuts[j].Trajectory.Move(Offset.x, Offset.y);
        };
      };
    };
  };
};

Model.FullBuild();