Edit = NewFloatInput("����_�����");
Edit.Value = 12;
Edit.OnChange = function() {
    alert('�������� �����');
}

Btn1 = NewButtonInput("������1");
Btn1.OnChange = function() {
    alert('������ ������1');
}

Btn2 = NewButtonInput("������2");
Btn2.OnChange = function() {
    alert('������ ������2');
};


Action.OnClick = function() {
    alert('������ � ������� ������ ' + Action.MouseX + ' ' + Action.MouseY)
};

Action.Continue();