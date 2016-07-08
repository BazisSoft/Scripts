Material = NewMaterialInput("Материал");
Butt = NewButtMaterialInput("Кромка");
Butt2 = NewButtMaterialInput("Кромка2");
Plastic = NewMaterialInput("Пластик");
Btn = NewButtonInput("OK");
MakePanel(); // построим панель
Action.Continue(); // не будем завершать скрипт сразу

function MakePanel() {
    // построим панель из Material
    Material.SetActive();
    Panel = AddPanel(200, 300);

    // построим контур из двух линий и дуг
    Panel.Contour.Clear();
    p1 = NewPoint(0, 0);
    p2 = NewPoint(100, 0);
    p3 = NewPoint(0, 100);
    L1 = Panel.Contour.AddLine(p1, p2);
    L2 = Panel.Contour.AddArc3(p2,  NewPoint(80, 80),  p3);
    L3 = Panel.Contour.AddLine(p3, p1);

    // накатем на прямолинейные участки одну кромку,
    // а на криволинейные другую
    Panel.AddButt(Butt, L1);
    Panel.AddButt(Butt2, L2);
    Panel.AddButt(Butt, L3);

    // наклеим пластик с обеих сторон
    Panel.AddPlastic(Plastic, true);
    Panel.AddPlastic(Plastic, false);

    // применим изменения в панели
    Panel.Build();
}

// функция вызывается автоматически при нажатии на
// любой элемент ввода
function $input(id) {
  // удалим панель если её уже создавали
  DeleteNewObjects();
  MakePanel();

  // если нажали на кнопку закончить, то завершаем скрипт
  if (id == Btn.id)
    return true;  
}