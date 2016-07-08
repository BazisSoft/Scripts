Edit = NewFloatInput("Ввод_числа");
Edit.Value = 12;
Edit.OnChange = function() {
    alert('Изменено число');
}

Btn1 = NewButtonInput("Кнопка1");
Btn1.OnChange = function() {
    alert('Нажата Кнопка1');
}

Btn2 = NewButtonInput("Кнопка2");
Btn2.OnChange = function() {
    alert('Нажата Кнопка2');
};


Action.OnClick = function() {
    alert('Щелчок в области модели ' + Action.MouseX + ' ' + Action.MouseY)
};

Action.Continue();