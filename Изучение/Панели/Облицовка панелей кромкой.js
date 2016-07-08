KrMat = NewButtMaterialInput("Кромка");
BtnStop = NewButtonInput("Закончить");

// выполняем выделение в бесконечном цикле
// при нажатии на отмену команды скрипт все равно завершится, т.к.
// он вызывает функцию GetObject()
while (true) {
    Panel = GetPanel("Укажите панель");
    // условие Panel.Butts проверяет,
    // что у выбранного объекта есть свойство кромки
    // (т.е. мы указали именно панель)
    if (Panel.Butts.Count == 0) {
        // вызывается перед редактированием объектов
        // чтобы эти изменения возможно было бы отменить
        StartEditing(Panel);
        // облицовка всех элементов контура панели
        for (i = 0; i < Panel.Contour.Count; i++) {
            Panel.AddButt(KrMat, i);
        }
    } else
        alert('Панель уже облицована');
}

function $input(id) {
    // если нажали на кнопку отмены
    if (id == BtnStop.id)
    // то завершаем скрипт
        return true;
}