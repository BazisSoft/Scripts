Properties = Action.Properties;
Operation  = Properties.NewCombo('Действие', 'Скруглениe\nФаска\n' +
                                             'Дуга3Т\nВолна\nПодрез\n' +
                                             'Вырез\nПрямоугольник\n' +
                                             'Вырез вогнутый\nВырез прямоугольный\n' +
                                             'Сократить площадь\nОбъединить');
Dimension  = Properties.NewNumber('Размер');
Divide     = Dimension.NewBool('Делить дуги');
Step       = Dimension.NewNumber('Шаг');
Save       = Dimension.NewBool('Запоминать указанный объект');
Clear      = Dimension.NewBool('Удалять кромку объекта');

Properties.NewButton('Размер: +/-').OnClick  = function() {
  Dimension.Value = -Dimension.Value;
};

Properties.NewButton('Размер: -Ш').OnClick  = function() {
  Dimension.Value -= Step.Value;
};

Properties.NewButton('Размер: +Ш').OnClick  = function() {
  Dimension.Value += Step.Value;
};

Cancel     = Properties.NewButton('Отменить действие');

var Bazis9 = system.apiVersion >= 90;
if (Bazis9) Properties.NewSeparator();

Properties.NewButton('Завершить').OnClick = function() {
  Action.Finish();
};

var BackUps = new Array();
var Panel   = new Object();
var Panels  = new Array();
var Objects = new Array();

Operation.OnValueChange = function() {
  Panels = new Array();
  switch (Operation.Value) {
    case 'Сократить площадь':
    case 'Объединить':
      BackUps        = new Array();
      Clear.Enabled  = false;
      Cancel.Enabled = false;
      break;
    default:
      Clear.Enabled  = true;
      Cancel.Enabled = true;
      break;
  };
};

Cancel.OnClick = function() {
  if (BackUps.length > 0) {
    OldObject = BackUps.pop();
    OldPanel = OldObject.Panel;
    StartEditing(OldPanel);
    OldPanel.Contour.Clear();
    OldPanel.Contour.AddList(OldObject.Contour.MakeCopy());
    OldPanel.Build();
  };
};

Array.prototype.ObjectInArray = function(Object) {
  for (var i = 0; i < this.length; i++) {
    if (this[i].UID == Object.UID) return true;
  };
  return false;
};

Array.prototype.SumValuesOfKey = function(Key) {
  var Result = new Number();
  for (var i = 0; i < this.length; i++) {
    if (!isNaN(this[i][Key])) {
      Result += this[i][Key];
    };
  };
  return Result;
};

function ToAngle(Radians) {
  return 180 / Math.PI * Radians
};

function VectorSub(A, B) {
  return NewVector(A.x - B.x, A.y - B.y, A.z - B.z);
};

function GetObjectAngles(Object) {
  with (Object.Rotation) {
    q1 = ImagPart.x;
    q2 = ImagPart.y;
    q3 = ImagPart.z;
    q4 = RealPart;
  };
  return NewVector(Math.atan2(2 * (q1 * q2 + q3 * q4), 1 - 2 * (q2 * q2 + q3 * q3)),
                   Math.asin( 2 * (q1 * q3 - q4 * q2)),
                   Math.atan2(2 * (q1 * q4 + q2 * q3), 1 - 2 * (q3 * q3 + q4 * q4)));
};

function SortByArea(List) {
  for (var i = List.length - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (geometry.Area(List[j]) < geometry.Area(List[j + 1])) {
        var Value = List[j];
        List[j] = List[j + 1];
        List[j + 1] = Value;
      };
    };
  };
  return List;
};

function FindClosedContours(Original) {
  var CopyContour = NewContour();
  var Result      = new Array();
  CopyContour.AddList(Original.MakeCopy());
  while (true) {
    ClosedContour = NewContour();
    if (CopyContour.FindContour(ClosedContour, true)) {
      Result.push(ClosedContour)
    } else {
      break;
    };
  };
  return SortByArea(Result);
};

function EqualsArea(A, B) {
  if (geometry.Area(A) != geometry.Area(B)) return false;
  return true
};

function ObjectsLength(List) {
  var Result = new Number();
  for (var i = 0; i < List.Count; i++) {
    Result += List[i].ObjLength();
  };
  return parseFloat(Result.toFixed(10));
};

function EqualsLength(A, B) {
  if (ObjectsLength(A) != ObjectsLength(B)) return false;
  return true;
};

Action.OnStart = function() {
  Properties.Load('СкруглениеУглов.xml');
  Action.ShowPoints = true;
  switch (Operation.Value) {
    case 'Сократить площадь':
    case 'Объединить':
      Clear.Enabled  = false;
      Cancel.Enabled = false;
      break;
    default:
      Clear.Enabled  = true;
      Cancel.Enabled = true;
      break;
  };
};

Action.OnFinish = function() {
  Properties.Save('СкруглениеУглов.xml');
  Model.UnHighlightAll();
};

Action.OnMove = function() {
  Obj = Action.Get3DObject();
  if (Obj instanceof TFurnPanel) {
    Panel = Obj.AsPanel;
    if (!Panel.Highlighted) {
      Model.UnHighlightAll();
      Panel.Highlighted = true;
    };
  } else if (!Save.Value) {
    Panel = new Object();
    Model.UnHighlightAll();
  };
};

Action.OnClick = function() {
  if (Panel.AsPanel != undefined) {
    if (!Panels.ObjectInArray(Panel)) {
      Panels.push(Panel);
    };
    StartEditing(Panel);
    Contour = Panel.Contour;
    if (Operation.Value != 'Сократить площадь' &&
        Operation.Value != 'Объединить') {
      Contour.OrderContours(true);
      if (Contour.IsClockOtherWise()) Contour.InvertDirection();
    };
    OldContour = NewContour();
    OldContour.AddList(Contour.MakeCopy());
    if (Dimension.Value != 0 || Operation.Value == 'Прямоугольник' ||
        Operation.Value == 'Объединить') {
      Point = Contour.ClosestPoint(Panel.ToObject(Action.Pos3));
      switch (Operation.Value) {
        case 'Скруглениe':
          Contour.Rounding(Point.x, Point.y, Dimension.Value);
          if (EqualsLength(Contour, OldContour)) {
            Contour.Rounding(Point.x, Point.y, -Dimension.Value);
          };
          break;
        case 'Фаска':
          Arc = Contour.Rounding(Point.x, Point.y, Dimension.Value);
          if (EqualsLength(Contour, OldContour)) {
            Arc = Contour.Rounding(Point.x, Point.y, -Dimension.Value);
          };
          if (!EqualsLength(Contour, OldContour)) {
            Contour.AddLine(Arc.Pos1.x, Arc.Pos1.y, Arc.Pos2.x, Arc.Pos2.y);
            Contour.Delete(Arc);
          };
          break;
        case 'Дуга3Т':
          Line = Contour.Find(Point.x, Point.y);
          if (Line.IsLine()) {
            Offset = NewPoint(0               * Line.NormDir().x -
                              Dimension.Value * Line.NormDir().y,
                              Dimension.Value * Line.NormDir().x +
                              0               * Line.NormDir().y);
            Center = NewPoint(Line.LineCenter().x - Offset.x,
                              Line.LineCenter().y - Offset.y);
            Arc3 = Contour.AddArc3(Line.Pos1, Center, Line.Pos2);
            if (Divide.Value) {
              Contour.AddArc(Line.Pos1, Center, Arc3.Center, Dimension.Value > 0);
              Contour.AddArc(Center, Line.Pos2, Arc3.Center, Dimension.Value > 0);
              Contour.Delete(Arc3);
            };
            Contour.Delete(Line);
          };
          break;
        case 'Волна':
          Line = Contour.Find(Point.x, Point.y);
          if (Line.IsLine()) {
            Line01 = Contour.AddLine(Line.Pos1.x, Line.Pos1.y,
                                     Line.LineCenter().x, Line.LineCenter().y);
            Line02 = Contour.AddLine(Line.LineCenter().x, Line.LineCenter().y,
                                     Line.Pos2.x, Line.Pos2.y);
            Contour.Delete(Line);
            Offset = NewPoint(0               * Line01.NormDir().x -
                              Dimension.Value * Line01.NormDir().y,
                              Dimension.Value * Line01.NormDir().x +
                              0               * Line01.NormDir().y);
            Center = NewPoint(Line01.LineCenter().x - Offset.x,
                              Line01.LineCenter().y - Offset.y);
            Arc3 = Contour.AddArc3(Line01.Pos1, Center, Line01.Pos2);
            if (Divide.Value) {
              Contour.AddArc(Line01.Pos1, Center, Arc3.Center, Dimension.Value > 0);
              Contour.AddArc(Center, Line01.Pos2, Arc3.Center, Dimension.Value > 0);
              Contour.Delete(Arc3);
            };
            Contour.Delete(Line01);
            Offset = NewPoint( 0               * Line02.NormDir().x -
                              -Dimension.Value * Line02.NormDir().y,
                              -Dimension.Value * Line02.NormDir().x +
                               0               * Line02.NormDir().y);
            Center = NewPoint(Line02.LineCenter().x - Offset.x,
                              Line02.LineCenter().y - Offset.y);
            Arc3 = Contour.AddArc3(Line02.Pos1, Center, Line02.Pos2);
            if (Divide.Value) {
              Contour.AddArc(Line02.Pos1, Center, Arc3.Center, -Dimension.Value > 0);
              Contour.AddArc(Center, Line02.Pos2, Arc3.Center, -Dimension.Value > 0);
              Contour.Delete(Arc3);
            };
            Contour.Delete(Line02);
          };
          break;
        case 'Подрез':
          if (Bazis9) {
            var Contours = FindClosedContours(Contour);
            Contour.Clear();
            for (var i = 0; i < Contours.length; i++) {
              if (Contours[i].IsClockOtherWise()) Contours[i].InvertDirection();
              var Equidistant = NewContour();
              switch (true) {
              case i == 0:
                Equidistant.AddEquidistant(Contours[i], Dimension.Value, false, false);
                break;
              case i > 0:
                Equidistant.AddEquidistant(Contours[i], -Dimension.Value, false, false);
                break;
              };
              Contour.AddList(Equidistant.MakeCopy());
            };
          } else {
            alert('БМ8 не имеет API функции построения эквидистанты.');
          };
          break;
        case 'Вырез':
          if (Bazis9) {
            var Contours = FindClosedContours(Contour);
            Contour.Clear();
            Contour.AddList(Contours[0].MakeCopy());
            if (Contour.IsClockOtherWise()) Contour.InvertDirection();
            var Equidistant = NewContour();
            Equidistant.AddEquidistant(Contour, Dimension.Value, false, false);
            Contour.AddList(Equidistant.MakeCopy());
          } else {
            alert('БМ8 не имеет API функции построения эквидистанты.');
          };
          break;
        case 'Прямоугольник':
          var Contours = FindClosedContours(Contour);
          Contour.Clear();
          if (Math.abs(Dimension.Value)) {
            Contour.AddRoundRect(Contours[0].Min.x, Contours[0].Min.y,
                                 Contours[0].Max.x, Contours[0].Max.y,
                                 Math.abs(Dimension.Value));
          } else {
            Contour.AddRectangle(Contours[0].Min.x, Contours[0].Min.y,
                                 Contours[0].Max.x, Contours[0].Max.y);
          };
          break;
        case 'Вырез вогнутый':
          var Contours = FindClosedContours(Contour);
          Contour.Clear();
          var SubtractsContour = NewContour();
          SubtractsContour.AddCircle(Point.x, Point.y,
                                     Math.abs(Dimension.Value));
          Contours[0].Subtraction(SubtractsContour);
          for (var i = 0; i < Contours.length; i++) {
            Contour.AddList(Contours[i].MakeCopy());
          };
          break;
        case 'Вырез прямоугольный':
          var Contours = FindClosedContours(Contour);
          Contour.Clear();
          var SubtractsContour = NewContour();
          SubtractsContour.AddRectangle(Point.x - Dimension.Value,
                                        Point.y - Dimension.Value,
                                        Point.x + Dimension.Value,
                                        Point.y + Dimension.Value);
          Contours[0].Subtraction(SubtractsContour);
          for (var i = 0; i < Contours.length; i++) {
            Contour.AddList(Contours[i].MakeCopy());
          };
          break;
        case 'Сократить площадь':
          var Angle    = new Number();
          var CurAngle = new Number();
          var Area     = new Number();
          var CurArea  = new Number();
          var Copy     = NewContour();
          Area = parseFloat((Contour.Height * Contour.Width).toFixed(3));
          for (var i = 0; i < parseInt(180 / Dimension.Value.toFixed(3)); i++) {
            Copy = Contour.MakeCopy();
            Angle += Dimension.Value;
            Copy.Rotate(0, 0, Angle);
            CurArea = parseFloat((Copy.Height * Copy.Width).toFixed(3));
            if (CurArea < Area) {
              CurAngle = Angle;
              Area = CurArea;
            };
          };
          Contour.Rotate(0, 0, -CurAngle);
          Panel.Rotate(Panel.NToGlobal(AxisZ), CurAngle);
          for (var i = 0; i < Panel.Cuts.Count; i++) {
            Trajectory = Panel.Cuts[i].Trajectory;
            Trajectory.Rotate(0, 0, -CurAngle);
          };
          break;
        case 'Объединить':
          if (Panels.length > 1) {
            if (Panels[0].MaterialName != Panels[1].MaterialName ||
                Panels[0].Thickness != Panels[1].Thickness) {
              if (!confirm('Материалы панелей разные, продолжть?')) {
                Panels = new Array();
                break;
              };
            };
            var Contours = FindClosedContours(Panels[1].Contour);
            var Elements = Contours.SumValuesOfKey('Count');
            var Angle    = new Number();
            var Angles   = VectorSub(GetObjectAngles(Panels[1]),
                                     GetObjectAngles(Panels[0]));
            var Holes    = new Array();
          //system.log(JSON.stringify(Angles));
            var Orient = NewVector(Math.abs(Panels[0].NToGlobal(AxisZ).x),
                                   Math.abs(Panels[0].NToGlobal(AxisZ).y),
                                   Math.abs(Panels[0].NToGlobal(AxisZ).z));
            if ((Orient.z > Orient.x) && (Orient.z > Orient.y)) {
            //system.log('Фронтальная');
              Angle = ToAngle(Angles.x);
            } else if (Orient.x > Orient.y) {
            //system.log('Вертикальная');
              Angle = ToAngle(Angles.y);
            } else {
            //system.log('Горизонтальная');
              Angle = ToAngle(Angles.x);
            };
            Panels[0].Visible = false;
            var Offset   = VectorSub(Panels[1].ToObject(Panels[0].ToGlobal(Panels[0].Contour.Min)),
                                     Panels[0].Contour.Min);
            var Copy     = Panels[0].Contour.MakeCopy();
            Copy.Rotate(Panels[0].Contour.Min.x, Panels[0].Contour.Min.y,
                        Angle);
            Copy.Move(Offset.x, Offset.y);
            Panels[1].Contour.AddList(Copy);
            for (var i = 0; i < Panels[0].Butts.Count; i++) {
              Butt = Panels[1].Butts.Add();
              Butt.Assign(Panels[0].Butts[i]);
              Butt.ElemIndex += Elements;
            };
            for (var i = 0; i < Panels[0].Cuts.Count; i++) {
              Cut = Panels[1].Cuts.Add();
              Cut.Assign(Panels[0].Cuts[i]);
              Cut.Trajectory.Rotate(Panels[0].Contour.Min.x, Panels[0].Contour.Min.y,
                                    Angle);
              Cut.Trajectory.Move(Offset.x, Offset.y);
            };
            Panels[1].ArtPos += ',' + Panels[0].ArtPos;
            if (!Dimension.Value) {
              if (Panels[0].FindConnectedFasteners()) {
                Holes = Holes.concat(Panels[0].FindConnectedFasteners());
              };
              if (Panels[1].FindConnectedFasteners()) {
                Holes = Holes.concat(Panels[1].FindConnectedFasteners());
              };
              if (Holes.length) {
                for (var i = 0; i < Holes.length; i++) {
                  Holes[i].ForEstimate = false;
                };
                alert('Учет фурнитуры в смете на объединенных панелях отменен!');
              };
            };
            DeleteObject(Panels[0]);
            Panels = new Array();
          };
          break;
        };
    } else {
      alert('Параметр "Размер" должен отличаться от нуля!');
    };
    if (Operation.Value != 'Сократить площадь' &&
        Operation.Value != 'Объединить') {
      Contour.OrderContours(true);
      for (var i = 0; i < Contour.Count; i++) {
        if (Contour[i].IsArc()) {
          if (parseFloat(Contour[i].ObjLength().toFixed(12)) == 0 ||
              parseFloat(Contour[i].ObjLength().toFixed(12)) ==
              parseFloat((Contour[i].ArcRadius() * 2 * Math.PI).toFixed(12))) {
            Contour.Delete(Contour[i]);
            Contour.OrderContours(true);
            system.log('Найдена дуга длинной 2PI*R!');
          };
        };
    	  if (Contour[i].IsLine()) {
          if (parseFloat(Contour[i].ObjLength().toFixed(12)) == 0) {
            Contour.Delete(Contour[i]);
            Contour.OrderContours(true);
            system.log('Найден отрезок нулевой длинны!');
          };
        };
      };
      if (!Contour.IsClosedContour()) {
        Contour.Clear();
        Contour.AddList(OldContour.MakeCopy());
        Contour.OrderContours(true);
        system.log('Контур не замкнут!');
      };
      if (!EqualsLength(Contour, OldContour) ||
          !EqualsArea(Contour, OldContour)) {
        var BackUp = {
          Panel:   Panel,
          Contour: OldContour
        };
        BackUps.push(BackUp);
        if (Panel.Butts.Count > 0 && Clear.Value) Panel.Butts.Clear();
      };
    };
    Panel.Build();
  };
};

Action.Continue();