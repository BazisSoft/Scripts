function SetObjectsVisible(Obj) {
  for (var i = 0; i < Obj.length; i++) {
    Obj[i].Visible = true;
    Obj[i].Selected = true;
  };
};

var Objects = new Array();
var Art = prompt('Введите номер или несклько номеров выделяемых объектов.\n' +
                 'Например: 4 или 4;5;9');
if (Art.length > 0) {
  var Arts = Art.replace(/ /gim, '').
                 replace(/\*|{|\[|\\|\/|x|х|:|;|ч|ж|э|б|ю|<|>|\?/gim, ';').
                 replace(/[^;,.0-9]/gim, '').
                 split(/;/);
  system.log(JSON.stringify(Arts));
  UnSelectAll();
  Model.forEach(function(Object) {
    for (var i = 0; i < Arts.length; i++) {
      if (Arts[i].length > 0) {
        if (Object.ArtPos.toString().toLowerCase() ==
            Arts[i].toString().toLowerCase()) {
          Objects.push(Object);
        };
      };
    };
  });
  SetObjectsVisible(Objects);
};