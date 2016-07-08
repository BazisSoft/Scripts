// зададим параметры
Prop = Action.Properties;
Mt = Prop.NewMaterial('Материал');
Butt = Prop.NewButt('Кромка');
w = Prop.NewNumber('Ширина', 200);
h = Prop.NewNumber('Высота', 300);

// поставим кнопку завершения редактирования
Prop.NewButton('Закончить').OnClick = function() {
  Action.Finish();
}

// перестраиваем панель при изменении свойства
Prop.OnChange = function() {
    DeleteNewObjects(); // очистим область скрипта
    BeginParametricBlock("Параметрическая панель"); // и создадим параметрический блок
    Mt.SetActive();
    P = AddFrontPanel(0, 0, w.Value, h.Value, 0);
    P.AddButt(Butt, 0); P.AddButt(Butt, 1);
    P.AddButt(Butt, 2); P.AddButt(Butt, 3);
    EndParametricBlock();  // закончим создание блока
}

// построим панель при запуске скрипта
Prop.OnChange();
// и ждем завершения редактирования
Action.Continue();