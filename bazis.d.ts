
declare type System = {
    /**
     * Вывести диагностическое сообщение (для отладки)
     * @param str
     */
    log(str);
    /**
     * Существует ли указанный файл?
     * @param filename
     */
    fileExists(filename);
    /**
     * Открыть диалог выбора файла
     * @param extension
     */
    askFileName(extension): String;
    /**
     * Записать текст в файл
     * @param filename
     * @param  content
     */
    writeTextFile(filename, content);
    /**
     * Записать текст в файл с запросом имени файла
     * @param extension
     * @param  content
     */
    askWriteTextFile(extension, content);
    /**
     * Считать текст из файла
     * @param filename
     */
    readTextFile(filename): String;
    /**
     * Считать текст из файла с запросом выбора файла
     * @param extension
     */
    askReadTextFile(extension): String;
    /**
     * Выполнить зашифрованный код
     * @param str
     */
    secureExec(str);
    /**
     * Выполнить внешнюю программу
     * @param str
     */
    exec(str): Boolean;
    /**
     * Задерживает выполнение программы на указанное время (в милисекундах)
     * @param ms
     */
    sleep(ms);
    /**
     * Текущая версия Bazis API
     */
    apiVersion: Number;

}

declare type IDispatch = {
    /**
     * Информациях о методах и свойствах объекта
     */
    GetTypeInfo: String;

}

declare type Model3D = {
    /**
     * Размер модели
     */
    GSize: Vector;
    /**
     * Габарит модели
     */
    GMin: Vector;
    /**
     * Габарит модели
     */
    GMax: Vector;
    /**
     * Выделенный объект модели
     */
    Selected: Object3;
    /**
     * Количество выделенных элементов
     */
    SelectionCount: Number;
    /**
     * Список выделенных элементов
     */
    Selections: Array<Object3>;
    /**
     * Количество объектов в модели
     */
    Count: Number;
    /**
     * Список объектов модели
     */
    Objects: Array<Object3>;

}

declare type Action3D = {
    /**
     * Если someBool, то запрещены любые функции взаимодействия с пользователем
     */
    Interactive: Boolean;
    /**
     * Продолжить вызывать прерывания по завершению основного тела скрипта, не завершая команды
     */
    Continue();
    /**
     * Применить изменения в модели внесенные в скрипте
     */
    Commit();
    /**
     * Завершить команду
     */
    Finish();
    /**
     * Отменить команду
     */
    Cancel();
    /**
     * Выполнить функцию, в которой доступны запросы Get*
     * @param func
     */
    AsyncExec(func);
    /**
     * Позиция курсора
     */
    MouseX: Number;
    /**
     * Позиция курсора
     */
    MouseY: Number;
    /**
     * Текущая позиция маркера
     */
    Pos3: Vector;
    /**
     * Нормаль к текущему виду
     */
    ViewDir: Vector;
    /**
     * Вектор вверх текущего вида
     */
    UpDir: Vector;
    /**
     * Вектор вправо текущего вида
     */
    RightDir: Vector;
    /**
     * Разрешать подсвечивать точки
     */
    ShowPoints: Boolean;
    /**
     * Разрешать подсвечивать ребра
     */
    ShowEdges: Boolean;
    /**
     * Установить строку подсказки
     */
    Hint: String;
    /**
     * Установить сообщение об ошибке
     */
    ErrorHint: String;
    /**
     * Установить мигающую подсказку
     */
    BlinkHint: String;
    /**
     * Включить режим Орто относительно точки
     * @param pos
     */
    BeginOrtho3(pos);
    /**
     * Отключить режим Орто
     */
    EndOrtho3();
    /**
     * Сдвинуть курсор к ближайшей точке привязки
     */
    CursorToClosestPoint();
    /**
     * Сдвинуть курсор к ближайшей линии
     */
    CursorToClosestLine();
    /**
     * Сдвинуть курсор к ближайшей середине линии
     */
    CursorToMiddleOfLine();
    /**
     * Найти точку на модели в текущем положении курсора мыши
     */
    Find3DPoint(): Vector;
    /**
     * Найти точку на плоскости X0Z
     */
    Find3DPointXZPlane(): Vector;
    /**
     * Найти объект под курсором мыши
     */
    Get3DObject(): Object3;
    /**
     * Обработчик щелчка мыши
     */
    OnClick: Function;
    /**
     * Обработчик щелчка мыши
     */
    OnMove: Function;
    /**
     * Обработчик начала работы скрипта. Вызывается после загрузки значений свойств
     */
    OnStart: Function;
    /**
     * Обработчик завершения работы скрипта
     */
    OnFinish: Function;
    /**
     * Запустить тонирование изображения
     */
    RayTraceScene();
    /**
     * Обработчик завершения работы скрипта
     */
    OnRayTraceFinished: Function;
    /**
     * Набор редактируемых свойств
     */
    Properties: ScriptProperty;

}

declare type ScriptMenu = {
    /**
     * Имя свойства
     */
    Name: String;
    /**
     * Обработчик изменения свойства и вложенных свойств
     */
    OnChange: Function;
    /**
     * Количество вложенных свойств
     */
    Count: Number;
    /**
     * Список вложенных свойств
     */
    Items: Array<ScriptProperty>;
    /**
     * Очистить вложенные свойства
     */
    Clear();
    /**
     * Флаг, сохраняется ли свойство в файл
     */
    Store: Boolean;
    /**
     * Сохранить введенные пользователем данные в файле xml
     * @param filename
     */
    Save(filename);
    /**
     * Загрузить значения полей из файла xml
     * @param filename
     */
    Load(filename): Boolean;
    /**
     * Создать вложенную группу свойств
     * @param caption
     */
    NewGroup(caption): ScriptGroupProperty;
    /**
     * Создать строковое свойство
     * @param caption
     */
    NewString(caption): ScriptStringProperty;
    /**
     * Создать свойство вида Да/Нет
     * @param caption
     */
    NewBool(caption): ScriptBooleanProperty;
    /**
     * Создать числовое свойство
     * @param caption
     */
    NewNumber(caption): ScriptNumberProperty;
    /**
     * Создать кнопку
     * @param caption
     */
    NewButton(caption): ScriptButtonProperty;

}

declare type PropertyLayout = {
    /**
     * Левая граница
     */
    Left: Number;
    /**
     * Правая граница
     */
    Right: Number;
    /**
     * Верхняя граница
     */
    Top: Number;
    /**
     * Нижняя граница
     */
    Bottom: Number;
    /**
     * Ширина свойства
     */
    Width: Number;
    /**
     * Высота свойства
     */
    Height: Number;

}

declare type ScriptProperty = {
    /**
     * Имя свойства
     */
    Name: String;
    /**
     * Разрешить редактирование имени (для создания таблиц)
     */
    NameEditable: Boolean;
    /**
     * Возможность выделение свойства пользователем
     */
    Enabled: Boolean;
    /**
     * Выделение вложенных свойств
     */
    ChildrenEnabled: Boolean;
    /**
     * Видимость свойства в окне свойств
     */
    Visible: Boolean;
    /**
     * Развернуты ли вложенные свойства
     */
    Expanded: Boolean;
    /**
     * Обработчик изменения свойства и вложенных свойств
     */
    OnChange: Function;
    /**
     * Обработчик изменения свойства
     */
    OnValueChange: Function;
    /**
     * Обработчик активации свойства или меню
     */
    OnActivate: Function;
    /**
     * Обработчик деактивации свойства или меню
     */
    OnDeactivate: Function;
    /**
     * Цвет фона
     */
    BackColor: Number;
    /**
     * Пользовательское число
     */
    Tag: Number;
    /**
     * Количество вложенных свойств
     */
    Count: Number;
    /**
     * Список вложенных свойств
     */
    Items: Array<ScriptProperty>;
    /**
     * Очистить вложенные свойства
     */
    Clear();
    /**
     * Флаг, сохраняется ли свойство в файл
     */
    Store: Boolean;
    /**
     * Сохранить введенные пользователем данные в файле xml
     * @param filename
     */
    Save(filename);
    /**
     * Загрузить значения полей из файла xml
     * @param filename
     */
    Load(filename): Boolean;
    /**
     * Проверка корректности значения
     */
    OnValueValidate: Function;
    /**
     * Флаг корректности введенного значения, выставляется пользовательским обработчиком
     */
    ValueValid: Boolean;
    /**
     * Проверить значение свойства и вложенных свойств
     */
    Validate(): Boolean;
    /**
     * Расположение свойства на форме
     */
    Layout: PropertyLayout;
    /**
     * Задать расположение свойства на форме
     * @param  L
     * @param  T
     * @param  W
     * @param  H
     */
    SetLayout(L, T, W, H);
    /**
     * Задать выравнивание компонента
     */
    Align: AlignType;
    /**
     * Выравнивать с отступами
     */
    AlignWithMargins: Boolean;
    /**
     * Отступы между компонентами
     * @param  L
     * @param  R
     * @param  T
     * @param  B
     */
    SetMargins(L, R, T, B);
    /**
     * Выравнивание текста в надписи
     */
    Alignment: AlignmentType;
    /**
     * Создать вложенную группу свойств
     * @param caption
     */
    NewGroup(caption): ScriptGroupProperty;
    /**
     * Создать вложенную группу свойств c рисунком
     * @param caption
     * @param imagefile
     */
    NewImage(caption, imagefile): ScriptGroupProperty;
    /**
     * Создать строковое свойство
     * @param caption
     */
    NewString(caption): ScriptStringProperty;
    /**
     * Создать свойство вида Да/Нет
     * @param caption
     */
    NewBool(caption): ScriptBooleanProperty;
    /**
     * Создать числовое свойство
     * @param caption
     */
    NewNumber(caption): ScriptNumberProperty;
    /**
     * Создать кнопку
     * @param caption
     */
    NewButton(caption): ScriptButtonProperty;
    /**
     * Создать свойство с кнопкой редактирования
     * @param caption
     */
    NewSelector(caption): ScriptSelectorProperty;
    /**
     * Создать свойство - выпадающий список
     * @param caption
     * @param  Item1
     */
    NewCombo(caption, Item1): ScriptComboProperty;
    /**
     * Создать свойство типа материал
     * @param caption
     */
    NewMaterial(caption): ScriptMaterialProperty;
    /**
     * Создать свойство типа материал
     * @param caption
     */
    NewButt(caption): ScriptButtProperty;
    /**
     * Создать свойство типа материал
     * @param caption
     */
    NewFurniture(caption): ScriptFurnitureProperty;
    /**
     * Создать свойство типа цвет
     * @param caption
     */
    NewColor(caption): ScriptColorProperty;
    /**
     * Создать разделитель
     */
    NewSeparator: ScriptProperty;
    /**
     * Создать надпись
     * @param caption
     */
    NewLabel(caption): ScriptProperty;
    /**
     * Всплывающее меню
     */
    PopupMenu: ScriptMenu;
    /**
     * Выпадающее меню
     */
    DropDownMenu: ScriptMenu;

}

/**
 * Тип выравнивания текста на надписи
 */
declare enum AlignmentType {
    /**
     * Выравнивание по левому краю
     */
    Left,
    /**
     * Выравнивание по правому краю
     */
    Right,
    /**
     * Выравнивание по центру
     */
    Center

}

/**
 * Типы выравнивания компонентов на форме
 */
declare enum AlignType {
    /**
     * Не выравнивается по форме
     */
    None,
    /**
     * Выравнивается по верхнему краю
     */
    Top,
    /**
     * Выравнивается по нижнему краю
     */
    Bottom,
    /**
     * Выравнивается по левому краю
     */
    Left,
    /**
     * Выравнивается по правому краю
     */
    Right,
    /**
     * Выравнивается по всей площади родительского компонента
     */
    Client

}

/**
 * Позиция немодального окна
 */
declare enum WindowPosition {
    /**
     * Стандартная позиция формы
     */
    Default,
    /**
     * Форма пристыковывается слева
     */
    Left,
    /**
     * Форма пристыковывается справа
     */
    Right

}

/**
 * Позиция фурнитуры при установке крепежа
 */
declare enum FurniturePosition {
    /**
     * Установка фурнитуры внутри стыка
     */
    Inside,
    /**
     * Установка фурнитуры снаружи стыка
     */
    Outside,
    /**
     * Установка фурнитуры вверху стыка (только для стыков с горизонтальной панелью)
     */
    Up,
    /**
     * Установка фурнитуры внизу стыка (только для стыков с горизонтальной панелью)
     */
    Down

}

/**
 * Тип схемы установки крепежа
 */
declare enum SchemeType {
    /**
     * Тип схемы с фиксированным отступом
     */
    WithBase,
    /**
     * Симметричный тип схемы
     */
    Symmetric,
    /**
     * Тип схемы с переменным шагом
     */
    VariableStep

}

/**
 * Направление монтирования секции
 */
declare enum SectionMountDir {
    /**
     * Справа налев
     */
    RightToLeft,
    /**
     * Слева направо
     */
    LeftToRight,
    /**
     * Сверху вниз
     */
    UpToDown,
    /**
     * Снизу вверх
     */
    DownToUp,
    /**
     * Спереди назад
     */
    FwdToBack,
    /**
     * Сзади вперед
     */
    BackToFwd

}

/**
 * Тип монтирования секции
 */
declare enum SectionMountType {
    /**
     * Фиксировать отступ между объектами
     */
    FixStep,
    /**
     * Фиксировать размер объектов по направлению
     */
    FixObj,
    /**
     * Фиксировать размер объектов и отступ между ними
     */
    FixObjAndStep

}

declare type FurnitureScheme = {
    /**
     * Установка крепежа в стык 2-х панелей
     * @param panel1
     * @param panel2
     */
    Mount(panel1, panel2);
    /**
     * Задать количество крепежа для схемы
     * @param count
     */
    SetFurnitureCount(count);
    /**
     * Название схемы
     */
    Name: String;
    /**
     * Основная фурнитура
     */
    Furniture: InfFurniture;
    /**
     * Дополнительная фурнитура
     */
    AdditionalFurn: InfFurniture;
    /**
     * Тип схемы
     */
    SchemeType: SchemeType;
    /**
     * Минимальный отступ (для симметричной схемы)
     */
    MinSymmetricIndent: Number;
    /**
     * Отступ в процентах (для симметричной схемы)
     */
    Percent: Boolean;
    /**
     * Фиксировать отступ (для симметричной схемы)
     */
    FixSymmetricIndent: Boolean;
    /**
     * Фиксированный отступ (для схемы с фиксированным отступом)
     */
    FixBaseIndent: Number;
    /**
     * Минимальный отступ от противоположного края (для схемы с фиксированным отступом)
     */
    MinBaseIndent: Number;
    /**
     * Кратность шага основной фурнитуры
     */
    FurnitureStep: Number;
    /**
     * Кратность шага Дополнительной фурнитуры
     */
    AdditionalFurnStep: Number;
    /**
     * Положение фурнитуры в стыке
     */
    FurniturePosition: FurniturePosition;

}

declare type FurnitureSchemes = {
    /**
     * Сохранить список схем в файл
     * @param filename
     */
    SaveTo(filename);
    /**
     * Добавить список схем из файла
     * @param filename
     */
    AddFromFile(filename);
    /**
     * Найти схему по имени
     * @param SchemeName
     */
    GetScheme(SchemeName): FurnitureScheme;
    /**
     * Получить номер схемы в списке
     * @param Scheme
     */
    IndexOf(Scheme): Number;
    /**
     * Присутствие схемы в списке
     * @param Scheme
     */
    Exists(Scheme): Boolean;
    /**
     * Добавить схему в список
     * @param  FurnScheme
     */
    AddScheme(FurnScheme);
    /**
     * Удалить схему по имени
     * @param SchemeName
     */
    DeleteScheme(SchemeName);
    /**
     * Удалить схему по номеру
     * @param  index
     */
    DeleteIndex(index);
    /**
     * Принять изменения в схеме
     * @param Scheme
     */
    AcceptScheme(Scheme);
    /**
     * Создать новую схему
     * @param SchemeName
     */
    NewScheme(SchemeName): FurnitureScheme;
    /**
     * Список схем
     */
    Schemes: Array<FurnitureScheme>;
    /**
     * Количество схем в списке
     */
    Count: Number;

}

declare type SectionScheme = {
    /**
     * Установить секцию
     * @param size
     * @param  position
     */
    Mount(size, position);
    /**
     * Имя секции
     */
    Name: string;
    /**
     * Направление монтирования
     */
    MountDir: SectionMountDir;
    /**
     * Основной элемент
     */
    Elem: InfFurniture;
    /**
     * Дополнительный элемент
     */
    AdditionalElem: InfFurniture;
    /**
     * Задать количество основных элементов в секции
     * @param  count
     */
    SetElemCount(count);
    /**
     * Тип монтирования
     */
    MountType: SectionMountType;
    /**
     * Центрирование элементов
     */
    CenterElements: boolean;
    /**
     * Начальный отступ
     */
    StartIndent: Number;
    /**
     * Конечный отступ
     */
    EndIndent: Number;
    /**
     * Шаг/кратность шага между элементами
     */
    Step: Number;
    /**
     * Отступ между элементами
     */
    BetweenStep: boolean;

}


/**
 * Тип ошибки анализа модели
 */
declare enum ErrorType {
    /**
     * Пересечение объектов
     */
    ObjIntersection,
    /**
     * Пересечение фурнитуры
     */
    FastIntersection,
    /**
     * Неправильная установка фурнитуры
     */
    FastIncorrect,
    /**
     * Материала нет в наличии
     */
    MatNotExists,
    /**
     * Материал отсутствует на складе
     */
    MatOutOfStock,
    /**
     * Панель невозможно разместить на плите
     */
    PanelTooLarge,
    /**
     * Пластик невозможно разместить на панели
     */
    PlasticTooLarge,
    /**
     * Панель не закреплена
     */
    PanelNotFixed

}

declare type InspectorError = {
    /**
     * Тип ошибки
     */
    ErrorType: ErrorType;
    /**
     * Количество объектов в ошибке
     */
    ErrorObjectsCount: Number;
    /**
     * Список объектов, относящихся к ошибке
     */
    ErrorObjects: Array<Object3>;
    /**
     * Сообщение ошибки
     */
    ErrorMessage: String;
    /**
     * Имена объектов в ошибке
     */
    ObjectsNames: String;

}

declare type InspectorOptions = {
    /**
     * Проверка пересечения объектов
     */
    ObjIntersectionAnalyze: Boolean;
    /**
     * Проверка пересечения фурнитуры
     */
    FastIntersectionAnalyze: Boolean;
    /**
     * Проверка корректности фурнитуры
     */
    FastIncorrectAnalyze: Boolean;
    /**
     * Проверка скрепления панелей
     */
    PanelNotFixedAnalyze: Boolean;
    /**
     * Проверка размера панели на плите
     */
    PanelTooLargeAnalyze: Boolean;
    /**
     * Проверка размера пластика на плите
     */
    PlasticTooLargeAnalyze: Boolean;
    /**
     * Проверка материала в наличии
     */
    MatNotExistsAnalyze: Boolean;
    /**
     * Проверка материала на складе
     */
    MatOutOfStockAnalyze: Boolean;

}

declare type ModelInspector = {
    /**
     * Проверить модель
     * @param Model
     */
    Run(Model);
    /**
     * Список ошибок
     */
    ErrorList: Array<InspectorError>;
    /**
     * Опции анализа
     */
    Options: InspectorOptions;

}

declare type ScriptForm = {
    /**
     * Набор редактируемых свойств
     */
    Properties: ScriptProperty;
    /**
     * Показать форму
     * @param WindowPos
     */
    Show(WindowPos);
    /**
     * Показать модальную форму
     */
    ShowModal: Boolean;
    /**
     * Заголовок формы
     */
    Caption: String;
    /**
     * Ширина формы
     */
    Width: Number;
    /**
     * Высота формы
     */
    Height: Number;
    /**
     * Минимальная ширина формы
     */
    MinWidth: Number;
    /**
     * Минимальная высота формы
     */
    MinHeight: Number;
    /**
     * Видимость формы
     */
    Visible: Boolean;
    /**
     * Положение левого края формы
     */
    Left: Number;
    /**
     * Положение верхнего края формы
     */
    Top: Number;
    /**
     * Показывать кнопку "ОК" на форме
     */
    OKButton: Boolean;
    /**
     * Текст кнопки "ОК"
     */
    OKButtonCaption: String;
    /**
     * Показывать кнопку "Отмена" на форме
     */
    CancelButton: Boolean;
    /**
     * Текст кнопки "Отмена"
     */
    CancelButtonCaption: String;
    /**
     * Обработчик закрытия формы
     */
    OnClose: Function;
    /**
     * Закрыть форму
     */
    Close;
    /**
     * Обработчик открытия формы
     */
    OnShow: Function;
    /**
     * Возможность изменять размеры формы
     */
    Resizable: Boolean;
    /**
     * Возможность пристыковывать не модальную форму
     */
    Dockable: Boolean;
    /**
     * Обработчик нажатия на кнопку OK
     */
    OnOkButtonClick: Function;
    /**
     * Обработчик нажатия на кнопку Cancel
     */
    OnCancelButtonClick: Function;

}

declare type ScriptParamFastenerDB = {
    /**
     * Загрузить базу из файла
     * @param  filename
     */
    LoadFromFile(filename): String;
    /**
     * Добавить базу из файла
     * @param  filename
     */
    AddFromFile(filename): String;
    /**
     * Сохранить базу в файл
     * @param  filename
     */
    SaveToFile(filename): String;

}

declare type ScriptGroupProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * 
     */
    Image: String;
    /**
     * 
     */
    MaxHeight: Number;

}

declare type ScriptStringProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * 
     */
    Value: String;

}

declare type ScriptBooleanProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * 
     */
    Value: Boolean;

}

declare type ScriptNumberProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * 
     */
    MinValue: Number;
    /**
     * 
     */
    MaxValue: Number;
    /**
     * 
     */
    Value: Number;
    /**
     * 
     */
    ValueStep: Number;

}

declare type ScriptButtonProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * Обработчик нажатия на кнопку
     */
    OnClick: Function;

}

declare type ScriptSelectorProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * 
     */
    Value: String;
    /**
     * Обработчик нажатия на кнопку редактирования свойства
     */
    OnClick: Function;

}

declare type ScriptComboProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * 
     */
    ItemIndex: Number;
    /**
     * Добавить элемент в список
     * @param item
     */
    AddItem(item);
    /**
     * 
     */
    Value: String;

}

declare type ScriptMaterialProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * 
     */
    Thickness: Number;
    /**
     * 
     */
    Width: Number;
    /**
     * Установить активным. Все последующие элементы будут построены из этого материала
     */
    SetActive();

}

declare type ScriptButtProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * Толщина кромки
     */
    Thickness: Number;
    /**
     * Ширина ленты
     */
    Width: Number;
    /**
     * Установить активным. Все последующие элементы будут построены из этого материала
     */
    SetActive();

}

declare type ScriptFurnitureProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * 
     */
    Value: InfFurniture;

}

declare type ScriptColorProperty = {
    /**
     * 
     */
    $$proto: ScriptProperty;
    /**
     * 
     */
    Value: Number;

}

declare type Undo3D = {
    /**
     * 
     * @param obj
     */
    Changing(obj);
    /**
     * 
     * @param obj
     */
    RecursiveChanging(obj);

}

declare type FurnMaterial = {
    /**
     * 
     */
    Name: String;
    /**
     * 
     */
    Thickness: Number;
    /**
     * 
     */
    Width: Number;
    /**
     * Создать материал из наименования и толщины (ширины)
     * @param name
     * @param thick
     */
    Make(name, thick);

}

declare type Vector = {
    /**
     * 
     */
    x: Number;
    /**
     * 
     */
    y: Number;
    /**
     * 
     */
    z: Number;

}

declare type Point = {
    /**
     * 
     */
    x: Number;
    /**
     * 
     */
    y: Number;

}

declare type Edge3 = {
    /**
     * Начало ребра в ЛСК
     */
    First: Vector;
    /**
     * Конец ребра в ЛСК
     */
    Last: Vector;
    /**
     * Начало ребра
     */
    GFirst: Vector;
    /**
     * Конец ребра
     */
    GLast: Vector;

}

declare type Object3 = {
    /**
     * 
     */
    $$proto: Object;
    /**
     * Наименование
     */
    Name: String;
    /**
     * Артикул
     */
    ArtPos: String;
    /**
     * Родитель объекта
     */
    Owner: List3D;
    /**
     * Видимость объекта
     */
    Visible: Boolean;
    /**
     * Является ли объект выделенным
     */
    Selected: Boolean;
    /**
     * Цвет линий объекта
     */
    Color: Number;
    /**
     * Является ли объект структурным
     */
    List: Boolean;
    /**
     * Привести объект к структурному
     */
    AsList: List3D;
    /**
     * Привести объект к типу панели
     */
    AsPanel: Panel;
    /**
     * Положение объекта
     */
    Position: Vector;
    /**
     * Координата x
     */
    PositionX: Number;
    /**
     * Координата y
     */
    PositionY: Number;
    /**
     * Координата z
     */
    PositionZ: Number;
    /**
     * Установить нулевые положение и ориентацию объекта
     */
    SetDefaultTransform();
    /**
     * Сместить объект
     * @param dir
     */
    Translate(dir);
    /**
     * Повернуть вокруг заданной оси
     * @param axis
     * @param angle
     */
    Rotate(axis, angle);
    /**
     * 
     * @param dir
     */
    TranslateGCS(dir);
    /**
     * 
     * @param axis
     * @param angle
     */
    RotateGCS(axis, angle);
    /**
     * Повернуть вокруг оси X
     * @param angle
     */
    RotateX(angle);
    /**
     * Повернуть вокруг оси Y
     * @param angle
     */
    RotateY(angle);
    /**
     * Повернуть вокруг оси Z
     * @param angle
     */
    RotateZ(angle);
    /**
     * Развернуть объект вдоль осей
     * @param axisz
     * @param axisy
     */
    Orient(axisz, axisy);
    /**
     * 
     * @param axisz
     * @param axisy
     */
    OrientGCS(axisz, axisy);
    /**
     * Преобразовать точку в ЛСК объекта
     * @param pos
     */
    ToObject(pos): Vector;
    /**
     * Преобразовать точку из ЛСК объекта
     * @param pos
     */
    ToGlobal(pos): Vector;
    /**
     * Преобразовать нормаль в ЛСК объекта
     * @param dir
     */
    NToObject(dir): Vector;
    /**
     * Преобразовать нормаль из ЛСК объекта
     * @param dir
     */
    NToGlobal(dir): Vector;
    /**
     * Локальные размеры объекта
     */
    GSize: Vector;
    /**
     * Габарит объекта в ЛСК
     */
    GMin: Vector;
    /**
     * Габарит объекта в ЛСК
     */
    GMax: Vector;
    /**
     * Габарит объекта
     */
    GabMin: Vector;
    /**
     * Габарит объекта
     */
    GabMax: Vector;
    /**
     * Получить список общего крепежа на двух панелях
     * @param Obj
     */
    FindConnectedFasteners(Obj): Array<Object3>;
    /**
     * Количество пользовательских свойств
     */
    UserPropCount: Number;
    /**
     * Значения свойства по его имени или индексу
     */
    UserProperty: Array<Object>;
    /**
     * Названия свойств
     */
    UserPropertyName: Array<String>;
    /**
     * Перестроить объект после изменения его свойств
     */
    Build();

}

declare type List3D = {
    /**
     * 
     */
    $$proto: Object3;
    /**
     * Количество объектов в структуре
     */
    Count: Number;
    /**
     * Список объектов
     */
    Objects: Array<Object3>;
    /**
     * Найти объект по имени
     * @param name
     */
    Find(name): Object3;
    /**
     * Являетсяли объект эластичным
     */
    IsElastic(): Boolean;
    /**
     * Растянуть объект до требуемых размеров
     * @param newSize
     */
    ElasticResize(newSize): Vector;
    /**
     * Загрузить объекты из файлов *.b3d,*.f3d
     * @param file
     */
    Load(file): Boolean;

}

declare type Panel = {
    /**
     * 
     */
    $$proto: Object3;
    /**
     * Контур панели
     */
    Contour: Contour2D;
    /**
     * Ширина контура панели
     */
    ContourWidth: Number;
    /**
     * Высота контура панели
     */
    ContourHeight: Number;
    /**
     * Толщина панели
     */
    Thickness: Number;
    /**
     * Материал панели
     */
    MaterialName: String;
    /**
     * Ширина материала
     */
    MaterialWidth: Number;
    /**
     * Ориентация текстуры
     */
    TextureOrientation: TextureOrientation;
    /**
     * Список кромок
     */
    Butts: PanelButts;
    /**
     * Список пластиков
     */
    Plastics: PanelPlastics;
    /**
     * Список пазов
     */
    Cuts: PanelCuts;
    /**
     * Закрыта ли кромка другими панелями? Указывается индекс кромки и расстояние до панелей.
     * @param index
     * @param distance
     */
    IsButtVisible(index, distance): Boolean;
    /**
     * Является ли контур прямоугольным?
     */
    IsContourRectangle: Boolean;
    /**
     * Накатать кромку на элемент
     * @param material
     * @param elem
     */
    AddButt(material, elem): PanelButt;
    /**
     * Наклеить пластик на панель
     * @param material
     * @param someBoolean
     */
    AddPlastic(material, someBoolean): PanelPlastic;
    /**
     * Создать новый паз
     * @param name
     */
    AddCut(name): PanelCut;

}

declare type Extrusion = {
    /**
     * 
     */
    $$proto: Object3;
    /**
     * Контур профиля
     */
    Contour: Contour2D;
    /**
     * Длина профиля
     */
    Thickness: Number;
    /**
     * Материал
     */
    MaterialName: String;
    /**
     * Ширина материала
     */
    MaterialWidth: Number;
    /**
     * Отрезать часть профиля в точке pos перпендикулярно normal
     * @param pos
     * @param normal
     */
    Clip(pos, normal);

}

declare type Trajectory = {
    /**
     * 
     */
    $$proto: Object3;
    /**
     * 
     */
    Contour2D: Contour2D;
    /**
     * 
     */
    Trajectory2D: Contour2D;
    /**
     * 
     */
    MaterialName: String;
    /**
     * Ширина материала
     */
    MaterialWidth: Number;

}

declare type Block = {
    /**
     * 
     */
    $$proto: List3D;
    /**
     * 
     */
    AnimType: AnimationType;
    /**
     * Флаг составной фурнитуры
     */
    IsFastener(): Boolean;

}

declare type Assembly = {
    /**
     * 
     */
    $$proto: List3D;
    /**
     * 
     */
    AnimType: AnimationType;

}

declare type Contour3D = {
    /**
     * 
     */
    $$proto: Object3;
    /**
     * Элементы вспомогательного контура
     */
    Contour: Contour2D;

}

declare type Size3D = {
    /**
     * 
     */
    $$proto: Object3;
    /**
     * Перестроить по точкам
     * @param Pos1
     * @param Pos2
     * @param TopPos
     */
    MakeOnPoints(Pos1, Pos2, TopPos);
    /**
     * Размер
     */
    Value: Number;

}


/**
 * Типы анимации сборок и блоков
 */
declare enum AnimationType {
    /**
     * Не учитывается в салоне
     */
    None,
    /**
     * Учитывается в салоне, не имеет анимации
     */
    Custom,
    /**
     * Дверь левая
     */
    DoorLeft,
    /**
     * Дверь правая
     */
    DoorRight,
    /**
     * Дверь откидная
     */
    DoorFlap,
    /**
     * Дверь подъемная
     */
    DoorLift,
    /**
     * Дверь купе левая
     */
    SDoorLeft,
    /**
     * Дверь купе правая
     */
    SDoorRight,
    /**
     * Ящик
     */
    Box,
    /**
     * Опора
     */
    Support,
    /**
     * Ручка
     */
    Handle,
    /**
     * Фасад
     */
    Facade

}

/**
 * Направление текстуры материала на панели
 */
declare enum TextureOrientation {
    /**
     * Нет
     */
    None,
    /**
     * Горизонтально
     */
    Horizontal,
    /**
     * Вертикально
     */
    Vertical

}

declare type PanelButts = {
    /**
     * 
     */
    Add(): PanelButt;
    /**
     * 
     */
    Count: Number;
    /**
     * 
     */
    Butts: Array<PanelButt>;

}

declare type PanelButt = {
    /**
     * 
     */
    ElemIndex: Number;
    /**
     * 
     */
    Sign: String;
    /**
     * 
     */
    Material: String;
    /**
     * 
     */
    Thickness: Number;

}

declare type PanelPlastics = {
    /**
     * 
     */
    Add(): PanelPlastic;
    /**
     * 
     */
    Count: Number;
    /**
     * 
     */
    Plastics: Array<PanelPlastic>;

}

declare type PanelPlastic = {
    /**
     * 
     */
    Material: String;
    /**
     * 
     */
    Thickness: Number;
    /**
     * 
     */
    TextureOrientation: TextureOrientation;

}

declare type PanelCuts = {
    /**
     * 
     */
    Add(): PanelCut;
    /**
     * 
     */
    Count: Number;
    /**
     * 
     */
    Cuts: Array<PanelCut>;

}

declare type PanelCut = {
    /**
     * 
     */
    Name: String;
    /**
     * Условное обозначение
     */
    Sign: String;
    /**
     * Траектория паза
     */
    Trajectory: Contour2D;
    /**
     * Профиль паза
     */
    Contour: Contour2D;

}

declare type Contour2D = {
    /**
     * Количество элементов контура
     */
    Count: Number;
    /**
     * Ширина контура
     */
    Width: Number;
    /**
     * Высота контура
     */
    Height: Number;
    /**
     * Левый нижний угол охватывающего прямоугольника
     */
    Min: Point;
    /**
     * Правый верхний угол охватывающего прямоугольника
     */
    Max: Point;
    /**
     * Очистить контур
     */
    Clear();
    /**
     * Сдвинуть все элементы
     * @param dx
     * @param dy
     */
    Move(dx, dy);
    /**
     * Повернуть вокруг точки
     * @param x
     * @param y
     * @param angle
     */
    Rotate(x, y, angle);
    /**
     * Добавить прямоугольник
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    AddRectangle(x1, y1, x2, y2);
    /**
     * Добавить прямоугольник со скурглёнными краями
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param rad
     */
    AddRoundRect(x1, y1, x2, y2, rad);
    /**
     * Добавить линию
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    AddLine(x1, y1, x2, y2): Object;
    /**
     * Добавить окружность
     * @param xc
     * @param yc
     * @param rad
     */
    AddCircle(xc, yc, rad): Object;
    /**
     * Добавить дугу по началу, концу и центру
     * @param p1
     * @param p2
     * @param centre
     * @param someBoolean
     */
    AddArc(p1, p2, centre, someBoolean): Object;
    /**
     * Добавить дугу по 3 точкам
     * @param p1
     * @param p2
     * @param p3
     */
    AddArc3(p1, p2, p3): Object;
    /**
     * Добавить эквидистанту контура. Последние 2 параметры отвечают за направление и скругление
     * @param contour
     * @param offset
     * @param someBool
     * @param someBool2
     */
    AddEquidistant(contour, offset, someBool, someBool2);
    /**
     * Вычесть замкнутый контур
     * @param contour
     */
    Subtraction(contour);
    /**
     * Сложить с замкнутым контуром
     * @param contour
     */
    Addition(contour);
    /**
     * Скругление элементов
     * @param elem1
     * @param elem2
     * @param x
     * @param y
     * @param radius
     */
    RoundingEx(elem1, elem2, x, y, radius): Object;
    /**
     * Фаска на 2 элементах
     * @param elem1
     * @param elem2
     * @param l1
     * @param l2
     */
    FacetEx(elem1, elem2, l1, l2): Object;
    /**
     * Скругление в указанной точке
     * @param x
     * @param y
     * @param radius
     */
    Rounding(x, y, radius): Object;
    /**
     * Фаска в указанной точке
     * @param x
     * @param y
     * @param l
     */
    Facet(x, y, l): Object;
    /**
     * Найти ближайший элемент по координатам
     * @param x
     * @param y
     */
    Find(x, y): Object;
    /**
     * Вписать весь контур в заданные габариты
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    Fit(x1, y1, x2, y2);
    /**
     * Растянуть контур резиновой нитью
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param dx
     * @param dy
     */
    Elastic(x1, y1, x2, y2, dx, dy);
    /**
     * Отразить контур относительно линии
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param someBoolean
     */
    Symmetry(x1, y1, x2, y2, someBoolean);
    /**
     * Загрузить контур из файла *.frw
     * @param file
     */
    Load(file): Boolean;
    /**
     * Находится ли точка внутри контура?
     * @param x
     * @param y
     */
    IsPointInside(x, y): Boolean;
    /**
     * Находится ли контур внутри другого?
     * @param contour
     */
    IsInContour(contour): Boolean;
    /**
     * Является ли контур замкнутым?
     */
    IsClosedContour(): Boolean;
    /**
     * Является ли контур прямоугольным?
     */
    IsContourRectangle(): Boolean;
    /**
     * Упорядочить элеметны контура в одном направлении
     * @param someBoolean
     */
    OrderContours(someBoolean): Boolean;

}

declare type Geometry2D = {
    /**
     * Вычислить точки пересечения двухмерных элементов
     * @param elem1
     * @param elem2
     */
    Intersect(elem1, elem2): Array<Point>;
    /**
     * Сравнить элементы
     * @param elem1
     * @param elem2
     */
    Compare(elem1, elem2): Boolean;
    /**
     * Найти кратчайшее расстояние между элементами
     * @param elem1
     * @param elem2
     */
    Distance(elem1, elem2): Number;
    /**
     * Найти площадь контура
     * @param contour
     */
    Area(contour): Number;

}

declare type InControl = {
    /**
     * 
     */
    id: Number;
    /**
     * 
     */
    Enabled: Boolean;
    /**
     * 
     */
    Visible: Boolean;
    /**
     * 
     */
    Hint: String;
    /**
     * Обработчик
     */
    OnChange: Function;

}

declare type InButton = {
    /**
     * 
     */
    $$proto: InControl;
    /**
     * Создать подменю
     * @param caption
     */
    NewSubMenu(caption): InButton;
    /**
     * 
     */
    Combo: Boolean;

}

declare type InFloat = {
    /**
     * 
     */
    $$proto: InControl;
    /**
     * 
     */
    Value: Number;
    /**
     * 
     */
    ReadOnly: Boolean;
    /**
     * 
     */
    Fixed: Boolean;

}

declare type InNumber = {
    /**
     * 
     */
    $$proto: InControl;
    /**
     * 
     */
    Value: Number;
    /**
     * 
     */
    ReadOnly: Boolean;
    /**
     * 
     */
    Fixed: Boolean;

}

declare type InMaterial = {
    /**
     * 
     */
    $$proto: InControl;
    /**
     * 
     */
    Name: String;
    /**
     * 
     */
    Thickness: Number;
    /**
     * 
     */
    Width: Number;
    /**
     * Установить активным. Все последующие элементы будут построены из этого материала
     */
    SetActive();
    /**
     * Применить материал к указанному объекту
     * @param Object3
     */
    Apply(Object3);

}

declare type InButtMaterial = {
    /**
     * 
     */
    $$proto: InControl;
    /**
     * 
     */
    Name: String;
    /**
     * 
     */
    Sign: String;
    /**
     * 
     */
    Thickness: Number;
    /**
     * 
     */
    Width: Number;
    /**
     * 
     */
    Overhung: Number;
    /**
     * 
     */
    Allowance: Number;
    /**
     * 
     */
    ClipPanel: Boolean;

}

declare type InFurniture = {
    /**
     * 
     */
    $$proto: InControl;
    /**
     * Установить крепеж между двух панелей
     * @param panel1
     * @param panel2
     * @param x
     * @param y
     * @param z
     */
    Mount(panel1, panel2, x, y, z): Object3;
    /**
     * Установить крепеж на плоскость панели
     * @param panel
     * @param x
     * @param y
     * @param z
     * @param angle
     */
    Mount1(panel, x, y, z, angle): Object3;

}

declare type InfFurniture = {
    /**
     * Установить крепеж между двух панелей
     * @param panel1
     * @param panel2
     * @param x
     * @param y
     * @param z
     */
    Mount(panel1, panel2, x, y, z): Object3;
    /**
     * Установить крепеж на плоскость панели
     * @param panel
     * @param x
     * @param y
     * @param z
     * @param angle
     */
    Mount1(panel, x, y, z, angle): Object3;

}

declare type DoorsMaker = {
    /**
     * 
     */
    Silent: Boolean;
    /**
     * 
     */
    ShowErrors: Boolean;
    /**
     * Сохранить параметры установки дверей в файл
     * @param filename
     */
    Save(filename);
    /**
     * Загрузить параметры установки дверей из файла
     * @param filename
     */
    Load(filename): Boolean;
    /**
     * Установить двери в секцию (Объект - Panel или Edge)
     * @param LeftObject
     * @param RightObject
     * @param TopObject
     * @param BottomObject
     */
    Setup(LeftObject, RightObject, TopObject, BottomObject);

}

declare type BoxesMaker = {
    /**
     * 
     */
    ShowErrors: Boolean;
    /**
     * Сохранить параметры установки ящиков в файл
     * @param filename
     */
    Save(filename);
    /**
     * Загрузить параметры установки ящиков из файла
     * @param filename
     */
    Load(filename): Boolean;
    /**
     * Установить ящик в секцию. LeftObject, RightObject - панели. TopObject, BottomObject - Panel или Edge
     * @param LeftObject
     * @param RightObject
     * @param TopObject
     * @param BottomObject
     */
    Setup(LeftObject, RightObject, TopObject, BottomObject);

}

declare type ScItemTovar = {
    /**
     * Артикул элемента товара
     */
    Article: String;
    /**
     * Имя элемента товара
     */
    Name: String;
    /**
     * Текущий материал
     */
    Material: String;
    /**
     * Имя группы материалов на замену
     */
    GroupMaterial: String;
    /**
     * Имя типа элемента
     */
    TypeElement: String;
    /**
     * Список объектов из модели входящих в состав элемента товара
     */
    ObjList: List3D;

}

declare type ScItemTovarList = {
    /**
     * Доступ к элементу товара по индексу
     * @param [index]
     */
    Items([index]): ScItemTovar;
    /**
     * Количество элементов товара
     */
    Count: Number;
    /**
     * Имя товара
     */
    TovarName: String;
    /**
     * Найти элемент товара по имени
     * @param name
     * @param CaseSensitive
     */
    FindByName(name, CaseSensitive): ScItemTovar;

}





declare type Arguments = {
    /**
     * 
     */
    callee: Function;
    /**
     * 
     */
    length: Number;
    /**
     * 
     */
    $$proto: Object;

}
/**
 * Создать 3D точку по координатам
 * @param x
 * @param y
 * @param z
 */
declare function NewVector(x, y, z): Vector;

/**
 * Создать 2D точку по координатам
 * @param x
 * @param y
 */
declare function NewPoint(x, y): Point;

/**
 * Создать плоский контур
 */
declare function NewContour(): Contour2D;

/**
 * Создать новый COM объект по его типу
 * @param CLSID
 */
declare function NewCOMObject(CLSID): IDispatch;

/**
 * Создать форму со свойствами
 */
declare function NewForm(): ScriptForm;

/**
 * Открыть схему установки крепежа
 * @param filename
 * @param  schemeGroup
 * @param  schemeName
 */
declare function OpenFurnitureScheme(filename, schemeGroup, schemeName): FurnitureScheme;

/**
 * Открыть группу схем установки крепежа
 * @param filename
 * @param  schemeGroup
 */
declare function OpenFurnitureSchemes(filename, schemeGroup): FurnitureSchemes;

/**
 * Создать схему установки крепежа
 * @param schemeName
 */
declare function NewFurnitureScheme(schemeName): FurnitureScheme;

/**
 * Создать схему секции
 * @param schemeName
 */
declare function NewSectionScheme(schemeName): SectionScheme;

/**
 * Создать базу параметрического крепежа
 */
declare function NewParamFastenerDB(): ScriptParamFastenerDB;

/**
 * 
 */
declare var AxisX: Vector;

/**
 * 
 */
declare var AxisY: Vector;

/**
 * 
 */
declare var AxisZ: Vector;

/**
 * 
 */
declare var Axis_X: Vector;

/**
 * 
 */
declare var Axis_Y: Vector;

/**
 * 
 */
declare var Axis_Z: Vector;

/**
 * Системные функции
 */
declare var system: System;

/**
 * Структура модели
 */
declare var Model: Model3D;

/**
 * Вспомогательные геометрические функции
 */
declare var geometry: Geometry2D;

/**
 * Активный скрипт
 */
declare var Action: Action3D;

/**
 * Текущий материал
 */
declare var ActiveMaterial: FurnMaterial;

/**
 * История модели
 */
declare var Undo: Undo3D;

/**
 * Вывести окно ввода строки
 * @param message
 */
declare function prompt(message): String;

/**
 * Вывести окно сообщения
 * @param str
 */
declare function alert(str);

/**
 * Показать окно подтверждения (Да/Нет)
 * @param message
 */
declare function confirm(message): Boolean;

/**
 * Открыть фурнитуру для установки на модель
 * @param filename
 */
declare function OpenFurniture(filename): InfFurniture;

/**
 * Выделить всё
 */
declare function SelectAll();

/**
 * Снять выделение с модели
 */
declare function UnSelectAll();

/**
 * Показать всё
 */
declare function ViewAll();

/**
 * Установить текущий вид
 * @param p3d
 */
declare function SetCamera(p3d);

/**
 * Запрос точки
 * @param hint
 */
declare function GetPoint(hint): Vector;

/**
 * Запрос объекта модели
 * @param hint
 */
declare function GetObject(hint): Object3;

/**
 * Запрос панели
 * @param hint
 */
declare function GetPanel(hint): Panel;

/**
 * Запрос выбора ребра, параллельного указанному вектору
 * @param hint
 * @param Axis
 */
declare function GetEdge(hint, Axis): Edge3;

/**
 * Создать панель указанных размеров
 * @param width
 * @param height
 */
declare function AddPanel(width, height): Panel;

/**
 * Создать фронтальную панель
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param z
 */
declare function AddFrontPanel(x1, y1, x2, y2, z): Panel;

/**
 * Создать горизонтальную панель
 * @param x1
 * @param z1
 * @param x2
 * @param z2
 * @param y
 */
declare function AddHorizPanel(x1, z1, x2, z2, y): Panel;

/**
 * Создать вертикальную панель
 * @param z1
 * @param y1
 * @param z2
 * @param y2
 * @param x
 */
declare function AddVertPanel(z1, y1, z2, y2, x): Panel;

/**
 * Создать профиль
 * @param name
 */
declare function AddExtrusion(name): Extrusion;

/**
 * Создать тело по траектории
 * @param name
 */
declare function AddTrajectory(name): Trajectory;

/**
 * Создать мебельный блок
 * @param name
 */
declare function AddBlock(name): Block;

/**
 * Создать полуфабрикат
 * @param name
 */
declare function AddDraftBlock(name): Block;

/**
 * Создать мебельную сборку
 * @param name
 */
declare function AddAssembly(name): Block;

/**
 * Создать копию объекта
 * @param obj
 */
declare function AddCopy(obj): Object3;

/**
 * Создать симметричную копию объекта
 * @param obj
 * @param  pos
 * @param  normal
 */
declare function AddSymmetry(obj, pos, normal): Object3;

/**
 * Создать вспомогательный контур в пространстве
 */
declare function AddContour(): Contour3D;

/**
 * Создать размер
 * @param pos1
 * @param pos2
 * @param toppos
 */
declare function AddSize(pos1, pos2, toppos): Size3D;

/**
 * Удалить объекты ранее созданные в скрипте
 */
declare function DeleteNewObjects();

/**
 * Удалить объект из модели
 * @param obj
 */
declare function DeleteObject(obj);

/**
 * Функция начала редактирования объекта
 * @param obj
 */
declare function StartEditing(obj): Object3;

/**
 * Начать создание блока. Все созданные далее объекты попадают внутрь блока
 * @param name
 */
declare function BeginBlock(name): Block;

/**
 * Закончить создание блока
 */
declare function EndBlock();

/**
 * Начать создание редактируемого блока
 * @param name
 */
declare function BeginParametricBlock(name): Block;

/**
 * Закончить создание редактируемого блока
 */
declare function EndParametricBlock();

/**
 * Редактируемый блок. Переменная установлена, если скрипт запущен в режиме редактирования
 */
declare var ParametricBlock: Block;

/**
 * Создать элемент управления - кнопку
 * @param caption
 */
declare function NewButtonInput(caption): InButton;

/**
 * Создать элемент управления для ввода целого числа
 * @param caption
 */
declare function NewFloatInput(caption): InFloat;

/**
 * Создать элемент управления для ввода числа
 * @param caption
 */
declare function NewNumberInput(caption): InNumber;

/**
 * Создать элемент управления для выбора материала
 * @param caption
 */
declare function NewMaterialInput(caption): InMaterial;

/**
 * Создать элемент управления для выбора кромочного материала
 * @param caption
 */
declare function NewButtMaterialInput(caption): InButtMaterial;

/**
 * Создать элемент управления для выбора фурнитуры
 * @param caption
 */
declare function NewFurnitureInput(caption): InFurniture;

/**
 * Создать элемент управления для анализа модели
 */
declare function NewModelInspector(): ModelInspector;

/**
 * Создать мастер установки дверей
 * @param caption
 */
declare function NewDoorsMaker(caption): DoorsMaker;

/**
 * Создать мастер установки ящиков
 * @param caption
 */
declare function NewBoxesMaker(caption): BoxesMaker;

/**
 * Список элементов товара. Только для Салона
 */
declare var TovarItems: ScItemTovarList;

