var inspector = NewModelInspector();

Props = Action.Properties;
Bool1 = Props.NewBool("Пересечение крепежа","false");
Bool1.SetLayout(1, 1, 327, 22);
Bool1.Value = true;
Bool1.Align = AlignType.Top;
Bool2 = Props.NewBool("Пересечение объектов", false);
Bool2.SetLayout(1, 23, 327, 22);
Bool2.Value = true;
Bool2.Align = AlignType.Top;
Bool3 = Props.NewBool("Скрепление панелей", false);
Bool3.SetLayout(1, 45, 327, 22);
Bool3.Value = true;
Bool3.Align = AlignType.Top;
Bool4 = Props.NewBool("Корректность крепежа", false);
Bool4.SetLayout(1, 67, 327, 22);
Bool4.Value = true;
Bool4.Align = AlignType.Top;
Bool5 = Props.NewBool("Материал в наличии", false);
Bool5.SetLayout(1, 111, 327, 22);
Bool5.Value = true;
Bool5.Align = AlignType.Top;
Bool6 = Props.NewBool("Материал на складе", false);
Bool6.SetLayout(1, 89, 327, 22);
Bool6.Value = true;
Bool6.Align = AlignType.Top;
Bool7 = Props.NewBool("Размер панели на листе", false);
Bool7.SetLayout(1, 133, 327, 22);
Bool7.Value = true;
Bool7.Align = AlignType.Top;
Bool8 = Props.NewBool("Размер пластика на панели", false);
Bool8.SetLayout(1, 155, 327, 22);
Bool8.Value = true;
Bool8.Align = AlignType.Top;
function ChangeOptions(){
  Options = inspector.Options;
  Options.FastIntersectionAnalyze = Bool1.Value;
  Options.ObjIntersectionAnalyze = Bool2.Value;
  Options.PanelNotFixedAnalyze = Bool3.Value;
  Options.FastIncorrectAnalyze = Bool4.Value;
  Options.MatNotExistsAnalyze = Bool5.Value;
  Options.MatOutOfStockAnalyze = Bool6.Value;
  Options.PanelTooLargeAnalyze = Bool7.Value;
  Options.PlasticTooLargeAnalyze = Bool8.Value;
  inspector.Options = Options;
}

//-- window Window1
Window1 = { Form : NewForm() };
Props = Window1.Form.Properties;
Window1.Form.Width = 543;
Window1.Form.Height = 478;
Window1.Form.Caption = "Анализ Модели";
Window1.Form.OKButton = false;
//-- window Window1 properties

Window1.Group1 = Props.NewGroup("Название");
Window1.Group1.SetLayout(4, 26, 535, 429);
Window1.Group1.AlignWithMargins = true;
Window1.Group1.Align = AlignType.Client;

Window1.btncheck = Props.NewButton("Проверить модель");
Window1.btncheck.SetLayout(1, 1, 541, 22);
Window1.btncheck.Align = AlignType.Top;
//-- window Window1 events

function AnalyzeModel(){
  ChangeOptions();
  inspector.Run(Model);
  Window1.Group1.Clear();
  for (var i = 0; i < inspector.ErrorList.Count; i++){
    Btn = Window1.Group1.NewButton(inspector.ErrorList[i].ErrorMessage + ' ' + inspector.ErrorList[i].ObjectsNames);
    Btn.SetLayout( 10,  (i+1) * 30,  350,  25);
    Btn.Align = AlignType.Top;
    Btn.Tag = i;
    Btn.OnClick = function ShowPanels(button){
      Model.UnSelectAll();
      Error = inspector.ErrorList[button.Tag];
      for (var j = 0; j < Error.ErrorObjectsCount; j++){
        obj = Error.ErrorObjects[j];
        if (obj){
          system.log(obj.Name);
          obj.Selected = true;
        }
      }
    };
  }
  if (inspector.ErrorList.Count == 0)
    Window1.Group1.Name = 'Ошибок не найдено';
}

Window1.Form.OnShow = AnalyzeModel;

Window1.Form.OnClose = function (){
  Action.Finish();
}

Window1.btncheck.OnClick = function(){
  AnalyzeModel();
}
//-- window Window1 ends
Window1.Form.Show(WindowPosition.Right);