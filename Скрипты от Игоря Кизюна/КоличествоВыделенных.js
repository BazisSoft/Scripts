if (!Model.SelectionCount) {
  Action.Control.Owner.Owner.a3SelectByMat.Execute();
};
if (Model.SelectionCount) {
  alert('Выделенных элементов: ' + Model.SelectionCount + ' шт.');
};