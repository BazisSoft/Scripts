Sel = Model.Selected;
Model.Selected.UserProperty['Примечание'] = 'Используется 2 вида облицовки';
s = 'Примечание';
//s = 0;
alert(Sel.UserProperty[s]);
//for (k = 0; k < Sel.UserPropCount; k++)
//  alert(Sel.UserProperty[k]);