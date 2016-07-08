// свойства скрипта
Pr = Action.Properties;
Material = Pr.NewMaterial('Материал');
Butt = Pr.NewButt('Кромка');
Pr.NewImage('Столешница', 'Drawing.wmf');
Width = Pr.NewNumber('Длина', 1200);
Height = Pr.NewNumber('Ширина', 900);
Width1 = Pr.NewNumber('Длина1', 400);
Height1 = Pr.NewNumber('Ширина1', 600);
Rad = Pr.NewNumber('Радиус', 100);
Rad1 = Pr.NewNumber('Скругление углов', 10);

PropFile = 'Params.xml';
Pr.Load(PropFile);

// построение столещницы
Panel = AddPanel(10, 10);
function Build() {

    DeleteNewObjects();
    Material.SetActive();
    var Pos = Panel.Position;
    Panel = AddHorizPanel(0, 0, Width.Value, Height.Value, 750);
    Panel.Position = Pos;


    function AddButt(func) {
        for (var i = 0; i < arguments.length; i++) {
            var butt = Panel.AddButt(Butt, arguments[i]);
            if (butt && arguments.length > 1)
                butt.CutIndex = 1;
        }
    }

    Panel.Position = Pos;
    var C = Panel.Contour;
    C.Clear();
    L1 = C.AddLine(0, 0, Width.Value, 0);
    L2 = C.AddLine(Width.Value, 0, Width.Value, Height1.Value);
    L3 = C.AddLine(Width.Value, Height1.Value, Width1.Value, Height1.Value);
    L4 = C.AddLine(Width1.Value, Height1.Value, Width1.Value, Height.Value);
    L5 = C.AddLine(Width1.Value, Height.Value, 0, Height.Value);
    L6 = C.AddLine(0, Height.Value, 0, 0);
    if (Rad.Value > 0) {
        A1 = C.Rounding(Width1.Value + 1, Height1.Value + 1, Rad.Value);
        if (Rad1.Value <= 0) {
            AddButt(L1);
            AddButt(L2);
            AddButt(L3, A1, L4);
            AddButt(L5);
            AddButt(L6);
        }
    } else if (Rad1.Value <= 0) {
        AddButt(L1);
        AddButt(L2);
        AddButt(L3);
        AddButt(L4);
        AddButt(L5);
        AddButt(L6);
    }
    if (Rad1.Value > 0) {
        C.Rounding(1, 1, Rad1.Value);
        C.Rounding(Width.Value - 1, 1, Rad1.Value);
        C.Rounding(Width.Value - 1, Height1.Value - 1, Rad1.Value);
        C.Rounding(Width1.Value - 1, Height.Value - 1, Rad1.Value);
        C.Rounding(1, Height.Value - 1, Rad1.Value);
        for (var k = 0; k < Panel.Contour.Count; k++) {
            var b = Panel.AddButt(Butt, k);
            if (b) b.CutIndex = 1;
        }
    }
    C.Symmetry(0, 0, 1, 0, false);
    Panel.Build();
}

Build();

// обработчики событий
Pr.OnChange = Build;
Action.OnMove = function() {
    Panel.Position = Action.Pos3;
}
Action.OnClick = function() {
    Pr.Save(PropFile);
    Action.Finish();
}

Action.ShowPoints = true;
Action.Continue();