function PrintObjects(Object) {
  s = '';
  for (var Key in Object) {
    if (Key.toString() !== 'ComObject') {
      system.log(Key + ':' + Object[Key] + '\n');
      s += Key + ':' + Object[Key] + '\n';
    } else {
      system.log(Object + ', ' + Key);
    }
  }
  system.writeTextFile('Info.txt', s);
};

Properties = Action.Properties;
Furniture = Properties.NewFurniture('Эластичный фрагмент:');
Reflected = Properties.NewBool('Отразить');
Action.Properties.Load('Пл.xml');

var Index = new Number();
var Point = new Object();
var Points = new Array();
var Plintus = new Object();

Action.Properties.NewButton('Отменить').OnClick = function() {
  Points.pop();
  DeleteNewObjects();
  MakePlintus();
};

Action.Properties.NewButton('Завершить').OnClick = function() {
  Action.Finish();
};

Furniture.OnChange = function() {
  DeleteNewObjects();
  MakePlintus();
};

Reflected.OnChange = function() {
  DeleteNewObjects();
  MakePlintus();
};

Action.OnFinish = function() {
  Action.Properties.Save('Пл.xml');
};

function VectorNegative(A) {
  return NewVector(-A.x, -A.y, -A.z);
};

function VectorSub(A, B) {
  return NewVector(A.x - B.x, A.y - B.y, A.z - B.z);
};

function VectorLength(A) {
  return Math.sqrt(A.x * A.x + A.y * A.y + A.z * A.z);
};

function PointLength(A) {
  return Math.sqrt(A.x * A.x + A.y * A.y);
};

function VectorUnit(A) {
  var L1 = 1.0 / VectorLength(A);
  return NewVector(A.x * L1, A.y * L1, A.z * L1);
};

function GetObjectAngles(Object) {
  Rotation = Object.Rotation;
  q1 = Rotation.ImagPart.x;
  q2 = Rotation.ImagPart.y;
  q3 = Rotation.ImagPart.z;
  q4 = Rotation.RealPart;
  return NewVector(Math.atan2(2 * (q1 * q2 + q3 * q4), 1 - 2 * (q2 * q2 + q3 * q3)),
                   Math.asin(2 * (q1 * q3 - q4 * q2)),
                   Math.atan2(2 * (q1 * q4 + q2 * q3), 1 - 2 * (q3 * q3 + q4 * q4)));
};

function RadiansToAngle(Radians) {
  return 180 / Math.PI * Radians
};

function MakePlintus() {
  var Contour = NewContour();
  var Path = NewContour();
  if (Points.length > 1) {
    for (var i = 1; i < Points.length; i++) {
      Contour.AddLine(Points[i - 1].x, Points[i - 1].z,
                      Points[i].x,     Points[i].z);
    };
    if (Contour.Count > 0) {
      var Panel = AddPanel();
      Object = Furniture.Value.Mount1(Panel, NewVector(), 0);
      if (Reflected.Value) {
        Contour.InvertDirection();
      };
      if (Object !== undefined) {
        for (var j = 0; j < Contour.Count; j++) {
          var Plintus = AddCopy(Object[0]);
          var Angles = GetObjectAngles(Plintus);
          PlintusContour = NewContour();
          PlintusContour.Addition(Plintus.Contour);
          PlintusContour.Rotate(0, 0, RadiansToAngle(Angles.x));

          if (!Contour.IsClosedContour()) {
            var OutOffset = PlintusContour.Min.x;
            var InOffset =  PlintusContour.Max.x;
          } else {
            var OutOffset = PlintusContour.Min.x;
            var InOffset =  PlintusContour.Max.x;
          };

          var OutEquidistant = NewContour();
          var InEquidistant =  NewContour();
          OutEquidistant.AddEquidistant(Contour, OutOffset, true, false);
          InEquidistant.AddEquidistant(Contour, InOffset, true, false);
          if (Contour.IsClosedContour()) {
            //Contour.InvertDirection();
            OutEquidistant.InvertDirection();
            InEquidistant.InvertDirection();
          };

          StartOffset = NewPoint(0         * OutEquidistant[j].NormDir().x -
                                 OutOffset * OutEquidistant[j].NormDir().y,
                                 OutOffset * OutEquidistant[j].NormDir().x +
                                 0         * OutEquidistant[j].NormDir().y);
          EndOffset   = NewPoint(0         * InEquidistant[j].NormDir().x -
                                 InOffset  * InEquidistant[j].NormDir().y,
                                 InOffset  * InEquidistant[j].NormDir().x +
                                 0         * InEquidistant[j].NormDir().y);

          OutEquidistant[j].Move(StartOffset);
          InEquidistant[j].Move(EndOffset);

          var Lines = NewContour();
          //Lines.AddList(OutEquidistant.MakeCopy(OutEquidistant[j]));
          //Lines.AddList(InEquidistant.MakeCopy(InEquidistant[j]));
          Lines.AddLine(OutEquidistant[j].Pos1.x, OutEquidistant[j].Pos1.y,
                        OutEquidistant[j].Pos2.x, OutEquidistant[j].Pos2.y);
          Lines.AddLine(InEquidistant[j].Pos1.x, OutEquidistant[j].Pos1.y,
                        InEquidistant[j].Pos2.x, OutEquidistant[j].Pos2.y);
          Lines.AddLine(OutEquidistant[j].Pos1.x, OutEquidistant[j].Pos1.y,
                        InEquidistant[j].Pos2.x, InEquidistant[j].Pos2.y);
          Lines.AddLine(InEquidistant[j].Pos1.x, InEquidistant[j].Pos1.y,
                        OutEquidistant[j].Pos2.x, OutEquidistant[j].Pos2.y);

          var Lengts = new Array();
          for (var i = 0; i < Lines.Count; i++) {
            Lengts.push(Lines[i].ObjLength());
          };
          system.log(Math.max.apply(Math, Lengts));
          var LineIndex = Lengts.indexOf(Math.max.apply(Math, Lengts));
          system.log(JSON.stringify(Lines[LineIndex].Pos1));

          Path.AddLine(Lines[LineIndex].Pos1.x, Lines[LineIndex].Pos1.y,
                       Lines[LineIndex].Pos2.x, Lines[LineIndex].Pos2.y);

          if (Contour.IsClosedContour()) {
            //Path.OrderContours(true);
            //Path.InvertDirection();
          };

          var Start   = NewVector(Path[j].Pos1.x, Points[0].y, Path[j].Pos1.y);
          var End     = NewVector(Path[j].Pos2.x, Points[0].y, Path[j].Pos2.y);
          var Dir     = VectorSub(End, Start);
          var Length  = VectorLength(Dir);
          var NormDir = VectorUnit(Dir);

          var Offset = NewPoint();
          Plintus.Position = Start;
          Plintus.Thickness = Length;
          Plintus.Orient(NormDir, AxisY);
          Plintus.Rotate(NormDir, RadiansToAngle(Angles.x));

          //if (j > 0) {
            //P3 = Plintus.ToObject(NewVector(Contour[j].Pos2.x,
            //                                Points[0].y,
            //                                Contour[j].Pos2.z));
            //Dir2 = VectorSub(P3, NewVector(0, 0, Contour[j].ObjLength()));
            //Dir2Norm = VectorUnit(Dir2);
            //Dir2Norm.z =  Dir2Norm.z + 1;
            //MiddleDir = VectorUnit(Dir2Norm);
            //Plintus.Clip(NewVector(0, 0, Contour[j].ObjLength()), VectorNegative(MiddleDir));
            //system.log(JSON.stringify(MiddleDir));
          //};
          Plintus.Build();
        };
        if (Contour.IsClosedContour()) {
          Object.Free();
          Panel.Free();
          StartEditing(Model.Selected);
          Model.Selected.Contour.Clear();
          Model.Selected.Contour.Addition(Path);
          Model.Selected.Build();
        };
      } else {
        Panel.Free();
        alert('Фрагмент не выбран!');
        return;
      };
      Object.Free();
      Panel.Free();
    };
  };
};

while (true) {
  Point = GetPoint('Укажите точку ' + (Index + 1));
  if (Index > 0) {
    Point.y = Points[0].y;
    Points.push(Point);
  } else {
    Points.push(Point);
  };
  Index++;
  DeleteNewObjects();
  MakePlintus();
  //system.log(JSON.stringify(Point));
};

Action.Continue();