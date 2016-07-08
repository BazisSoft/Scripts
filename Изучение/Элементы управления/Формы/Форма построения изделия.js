//-- window Window1
Window1 = { Form : NewForm() };
Props = Window1.Form.Properties;
Window1.Form.Width = 435;
Window1.Form.Height = 227;
Window1.Form.Caption = 'Построение изделия с использованием схем расстановки крепежа';
Window1.Form.CancelButton = True;
Window1.Form.OKButton = True;
Window1.Form.Resizable = True;
//-- window Window1 properties

Window1.Group3 = Props.NewGroup('Параметры изделия');
Window1.Group3.SetLayout(4, 4, 210, 157);
Window1.Group3.AlignWithMargins = True;
Window1.Group3.Align  = AlignType.Left;
Window1.LengthNum = Window1.Group3.NewNumber('Длина');
Window1.LengthNum.SetLayout(4, 17, 202, 20);
Window1.LengthNum.SetMargins(2, 2, 2, 2);
Window1.LengthNum.AlignWithMargins = True;
Window1.LengthNum.Value = 500;
Window1.LengthNum.Align  = AlignType.Top;
Window1.WidthNum = Window1.Group3.NewNumber('Ширина');
Window1.WidthNum.AlignWithMargins = True;
Window1.WidthNum.SetMargins(2, 2, 2, 2);
Window1.WidthNum.SetLayout(4, 41, 202, 20);
Window1.WidthNum.Value = 1200;
Window1.WidthNum.Align  = AlignType.Top;
Window1.HeigthNum = Window1.Group3.NewNumber('Высота');
Window1.HeigthNum.AlignWithMargins = True;
Window1.HeigthNum.SetMargins(2, 2, 2, 2);
Window1.HeigthNum.SetLayout(4, 65, 202, 20);
Window1.HeigthNum.Value = 1800;
Window1.HeigthNum.Align  = AlignType.Top;

Window1.Group4 = Window1.Group3.NewGroup('Схема расстановки крепежа');
Window1.Group4.SetLayout(5, 90, 200, 71);
Window1.Group4.AlignWithMargins = True;
Window1.Group4.Align = AlignType.Top;
Window1.ComboTop = Window1.Group4.NewCombo('Верхняя панель', '');
Window1.ComboTop.SetLayout(5, 18, 196, 20);
Window1.ComboTop.AlignWithMargins = True;
Window1.ComboTop.Align  = AlignType.Top;
Window1.ComboBot = Window1.Group4.NewCombo('Нижняя панель', '');
Window1.ComboBot.AlignWithMargins = True;
Window1.ComboBot.SetLayout(5, 44, 196, 20);
Window1.ComboBot.Align  = AlignType.Top;

Window1.Group5 = Props.NewGroup('Изображение изделия');
Window1.Group5.SetLayout(220, 4, 198, 157);
Window1.Group5.AlignWithMargins = True;
Window1.Group5.Align = AlignType.Client;

Window1.Image1 = Window1.Group5.NewImage('Название', 'TestModel.png');
Window1.Image1.SetLayout(2, 15, 194, 140);
Window1.Image1.Align  = AlignType.Client;
//-- window Window1 events

Window1.Form.OnShow = function(){
  Schemes = OpenFurnitureSchemes('Schemes.config'); //Открытие фала со схемами, лежащего в этой же папке
  for (var i = 0; i < Schemes.Count; i++){
    Window1.ComboTop.AddItem(Schemes.Schemes[i].Name);
    Window1.ComboBot.AddItem(Schemes.Schemes[i].Name);
  }
  Window1.ComboTop.ItemIndex = -1;
  Window1.ComboBot.ItemIndex = -1;
}
Window1.Form.OnClose = function(){
    Action.Cancel();
}
Window1.Form.OnOkButtonClick = function(){
    Action.Finish();
}
Window1.Form.OnCancelButtonClick = function(){
    Action.Cancel();
}
Window1.LengthNum.OnChange = function(){
    BuildModel();
}
Window1.WidthNum.OnChange = function(){
    BuildModel();
}
Window1.HeigthNum.OnChange = function(){
    BuildModel();
}
Window1.ComboTop.OnChange = function(){
    BuildModel();
}
Window1.ComboBot.OnChange = function(){
    BuildModel();
}
//-- window Window1 ends
Window1.Form.Show(WindowPosition.Default);

function BuildModel(){
  DeleteNewObjects();
  var length = Window1.LengthNum.Value;
  var width = Window1.WidthNum.Value;
  var heigth = Window1.HeigthNum.Value;
  var topscheme = Window1.ComboTop.Value;
  var botscheme = Window1.ComboBot.Value;
  MakeModel(length, heigth, width, topscheme, botscheme)
}

function MakeModel(l, h, w, top, bot){
  botpan = AddHorizPanel(0, 0, w, l, 0);
  toppan = AddHorizPanel(0, 0, w, l, h - 16);
  leftpan = AddVertPanel(0, 16, l, h - 16, 0);
  rightpan = AddVertPanel(0, 16, l, h - 16, w - 16);
  bsidepan = AddFrontPanel(0, 16, w, h - 16, 0);
  if (top != ''){
    topscheme = Schemes.GetScheme(top);
    topscheme.Mount(toppan, leftpan);
    topscheme.Mount(toppan, rightpan);
    topscheme.Mount(toppan, bsidepan);
  }
  if (bot != ''){
    botscheme = Schemes.GetScheme(bot);
    botscheme.Mount(botpan, leftpan);
    botscheme.Mount(botpan, rightpan);
    botscheme.Mount(botpan, bsidepan);
  }
}
