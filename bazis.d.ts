
declare class System {
    /**
     * Вывести диагностическое сообщение (для отладки?)
     * @param str сообщение 
     */
    log(str: string);
    /** 
     * Возвращает true, если файл существует
     * @deprecated используйте fs.existsSync
     * @param filename путь к файлу
     */
    fileExists(filename: string): Boolean;
    /**
     * Открыть диалог выбора файла
     * @param extension расширение файла
     */
    askFileName(extension: string): String;
    /**
     * Записать текст в файл
     * @deprecated используйте fs.writeFileSync
     * @param filename путь к файлу
     * @param  content содержимое файла
     */
    writeTextFile(filename: string, content: string);
    /**
     * Записать текст в файл с запросом имени файла
     * @param extension Расширение файла
     * @param  content содержимое
     */
    askWriteTextFile(extension: string, content: string);
    /**
     * Считать текст из файла
     * @param filename Имя файла
     */
    readTextFile(filename: string): String;
    /**
     * Считать текст из файла с запросом выбора файла
     * @param extension Расширение файла
     */
    askReadTextFile(extension: string): String;
    /**
     * Выполнить зашифрованный код
     * @param str код скрипта
     */
    secureExec(str: string);
    /**
     * Выполнить внешнюю программу
     * @param str код программы
     */
    exec(str: string): Boolean;
    /**
     * Задерживает выполнение программы на указанное время
     * @param ms время (в миллисекундах)
     */
    sleep(ms: number);
    /**
     * Текущая версия Bazis API
     */
    apiVersion: Number;

}

declare class IDispatch {
    /**
     * Информациях о методах и свойствах объекта
     */
    GetTypeInfo: String;

}

declare class Model3D extends List3D {
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

declare class Action3D{
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
     * @param func функция для выполнения
     */
    AsyncExec(func: Function);
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
     * @param pos Координаты точки
     */
    BeginOrtho3(pos: Vector);
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

declare class ScriptMenu{
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
    Save(filename: string);
    /**
     * Загрузить значения полей из файла xml
     * @param filename
     */
    Load(filename: string): Boolean;
    /**
     * Создать вложенную группу свойств
     * @param caption Название группы
     */
    NewGroup(caption: string): ScriptGroupProperty;
    /**
     * Создать строковое свойство
     * @param caption Название свойства
     */
    NewString(caption: string): ScriptStringProperty;
    /**
     * Создать свойство вида Да/Нет
     * @param caption Название свойства
     */
    NewBool(caption: string): ScriptBooleanProperty;
    /**
     * Создать числовое свойство
     * @param caption Название свойства
     */
    NewNumber(caption: string): ScriptNumberProperty;
    /**
     * Создать кнопку
     * @param caption Название свойства
     */
    NewButton(caption: string): ScriptButtonProperty;

}

declare class PropertyLayout{
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

declare class ScriptProperty{
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
    Save(filename: string);
    /**
     * Загрузить значения полей из файла xml
     * @param filename
     */
    Load(filename: string): Boolean;
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
     * @param  L Отступ от левого края родительского объекта
     * @param  T Отступ от верхнего края родительского объекта
     * @param  W Ширина 
     * @param  H Высота 
     */
    SetLayout(L: number, T: number, W: number, H: number);
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
     * @param  L Отступ слева
     * @param  R Отступ справа
     * @param  T Отступ сверху
     * @param  B Отступ снизу
     */
    SetMargins(L: number, R: number, T: number, B: number);
    /**
     * Выравнивание текста в надписи
     */
    Alignment: AlignmentType;
    /**
     * Создать вложенную группу свойств
     * @param caption Название группы
     */
    NewGroup(caption: string): ScriptGroupProperty;
    /**
     * Создать вложенную группу свойств c рисунком
     * @param caption Название свойства
     * @param imagefile путь к файлу с рисунком
     */
    NewImage(caption: string, imagefile: string): ScriptGroupProperty;
    /**
     * Создать строковое свойство
     * @param caption Название свойства
     */
    NewString(caption: string): ScriptStringProperty;
    /**
     * Создать свойство вида Да/Нет
     * @param caption Название свойства
     */
    NewBool(caption: string): ScriptBooleanProperty;
    /**
     * Создать числовое свойство
     * @param caption Название свойства
     */
    NewNumber(caption: string): ScriptNumberProperty;
    /**
     * Создать кнопку
     * @param caption Название свойства
     */
    NewButton(caption: string): ScriptButtonProperty;
    /**
     * Создать свойство с кнопкой редактирования
     * @param caption Название свойства
     */
    NewSelector(caption: string): ScriptSelectorProperty;
    /**
     * Создать свойство - выпадающий список
     * @param caption Название свойства
     * @param  Item1 Первый элемент списка
     */
    NewCombo(caption: string, Item1?: string): ScriptComboProperty;
    /**
     * Создать свойство типа материал
     * @param caption Название свойства
     */
    NewMaterial(caption: string): ScriptMaterialProperty;
    /**
     * Создать свойство типа материал
     * @param caption Название свойства
     */
    NewButt(caption: string): ScriptButtProperty;
    /**
     * Создать свойство типа материал
     * @param caption Название свойства
     */
    NewFurniture(caption: string): ScriptFurnitureProperty;
    /**
     * Создать свойство типа цвет
     * @param caption Название свойства
     */
    NewColor(caption: string): ScriptColorProperty;
    /**
     * Создать разделитель
     */
    NewSeparator: ScriptProperty;
    /**
     * Создать надпись
     * @param caption Название свойства
     */
    NewLabel(caption: string): ScriptProperty;
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

declare class FurnitureScheme{
    /**
     * Установка крепежа в стык 2-х панелей
     * @param panel1
     * @param panel2
     */
    Mount(panel1: Panel, panel2: Panel);
    /**
     * Задать количество крепежа для схемы
     * @param count
     */
    SetFurnitureCount(count: number);
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

declare class FurnitureSchemes{
    /**
     * Сохранить список схем в файл
     * @param filename
     */
    SaveTo(filename: string);
    /**
     * Добавить список схем из файла
     * @param filename
     */
    AddFromFile(filename: string);
    /**
     * Найти схему по имени
     * @param SchemeName
     */
    GetScheme(SchemeName: string): FurnitureScheme;
    /**
     * Получить номер схемы в списке
     * @param Scheme
     */
    IndexOf(Scheme: FurnitureScheme): Number;
    /**
     * Наличие схемы в списке
     * @param Scheme
     */
    Exists(Scheme: FurnitureScheme): Boolean;
    /**
     * Добавить схему в список
     * @param  FurnScheme
     */
    AddScheme(FurnScheme: FurnitureScheme);
    /**
     * Удалить схему по имени
     * @param SchemeName
     */
    DeleteScheme(SchemeName: string);
    /**
     * Удалить схему по номеру
     * @param  index
     */
    DeleteIndex(index: number);
    /**
     * Принять изменения в схеме
     * @param Scheme
     */
    AcceptScheme(Scheme: FurnitureScheme);
    /**
     * Создать новую схему
     * @param SchemeName
     */
    NewScheme(SchemeName: string): FurnitureScheme;
    /**
     * Список схем
     */
    Schemes: Array<FurnitureScheme>;
    /**
     * Количество схем в списке
     */
    Count: Number;

}

declare class SectionScheme{
    /**
     * Установить секцию
     * @param size Размер секции
     * @param  position Позиция секции
     */
    Mount(size: Vector, position: Vector);
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
    SetElemCount(count: number);
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

declare class InspectorError{
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

declare class InspectorOptions{
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

declare class ModelInspector{
    /**
     * Проверить модель
     * @param Model
     */
    Run(Model: Model3D);
    /**
     * Список ошибок
     */
    ErrorList: Array<InspectorError>;
    /**
     * Опции анализа
     */
    Options: InspectorOptions;

}

declare class ScriptForm{
    /**
     * Набор редактируемых свойств
     */
    Properties: ScriptProperty;
    /**
     * Показать форму
     * @param WindowPos
     */
    Show(WindowPos: WindowPosition);
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
    Close();
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

declare class ScriptParamFastenerDB{
    /**
     * Загрузить базу из файла
     * @param  filename
     */
    LoadFromFile(filename: string): String;
    /**
     * Добавить базу из файла
     * @param  filename
     */
    AddFromFile(filename: string): String;
    /**
     * Сохранить базу в файл
     * @param  filename
     */
    SaveToFile(filename: string): String;

}

declare class ScriptGroupProperty extends ScriptProperty {
    /**
     * 
     */
    Image: String;
    /**
     * 
     */
    MaxHeight: Number;

}

declare class ScriptStringProperty extends ScriptProperty{
    /**
     * 
     */
    Value: String;

}

declare class ScriptBooleanProperty extends ScriptProperty{
    /**
     * 
     */
    Value: Boolean;

}

declare class ScriptNumberProperty extends ScriptProperty{
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

declare class ScriptButtonProperty extends ScriptProperty{
    /**
     * Обработчик нажатия на кнопку
     */
    OnClick: Function;

}

declare class ScriptSelectorProperty extends ScriptProperty{
    /**
     * 
     */
    Value: String;
    /**
     * Обработчик нажатия на кнопку редактирования свойства
     */
    OnClick: Function;

}

declare class ScriptComboProperty extends ScriptProperty{
    /**
     * 
     */
    ItemIndex: Number;
    /**
     * Добавить элемент в список
     * @param item
     */
    AddItem(item: string);
    /**
     * 
     */
    Value: String;

}

declare class ScriptMaterialProperty extends ScriptProperty{
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

declare class ScriptButtProperty extends ScriptProperty{
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

declare class ScriptFurnitureProperty extends ScriptProperty{
    /**
     * 
     */
    Value: InfFurniture;

}

declare class ScriptColorProperty extends ScriptProperty{
    /**
     * 
     */
    Value: Number;

}

declare class Undo3D{
    /**
     * 
     * @param obj
     */
    Changing(obj: Object3);
    /**
     * 
     * @param obj
     */
    RecursiveChanging(obj: Object3);

}

declare class FurnMaterial{
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
    Make(name: string, thick: number);

}

declare class Vector{
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

declare class Point{
    /**
     * 
     */
    x: Number;
    /**
     * 
     */
    y: Number;

}

declare class Edge3{
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

declare class Object3 extends Object{
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
     * @param dir Вектор смещения
     */
    Translate(dir: Vector);
    /**
     * Повернуть вокруг заданной оси
     * @param axis 
     * @param angle Угол (в градусах)
     */
    Rotate(axis: Vector, angle: number);
    /**
     * 
     * @param dir Вектор смещения
     */
    TranslateGCS(dir: Vector);
    /**
     * 
     * @param axis
     * @param angle Угол (в градусах)
     */
    RotateGCS(axis: Vector, angle: number);
    /**
     * Повернуть вокруг оси X
     * @param angle Угол (в градусах)
     */
    RotateX(angle: number);
    /**
     * Повернуть вокруг оси Y
     * @param angle Угол (в градусах)
     */
    RotateY(angle: number);
    /**
     * Повернуть вокруг оси Z
     * @param angle Угол (в градусах)
     */
    RotateZ(angle: number);
    /**
     * Развернуть объект вдоль осей
     * @param axisz
     * @param axisy
     */
    Orient(axisz: Vector, axisy: Vector);
    /**
     * 
     * @param axisz
     * @param axisy
     */
    OrientGCS(axisz: Vector, axisy: Vector);
    /**
     * Преобразовать точку в ЛСК объекта
     * @param pos
     */
    ToObject(pos: Vector): Vector;
    /**
     * Преобразовать точку из ЛСК объекта
     * @param pos
     */
    ToGlobal(pos: Vector): Vector;
    /**
     * Преобразовать нормаль в ЛСК объекта
     * @param dir
     */
    NToObject(dir: Vector): Vector;
    /**
     * Преобразовать нормаль из ЛСК объекта
     * @param dir
     */
    NToGlobal(dir: Vector): Vector;
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
    FindConnectedFasteners(Obj: Object3): Array<Object3>;
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

declare class List3D extends Object3{
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
    Find(name: string): Object3;
    /**
     * Являетсяли объект эластичным
     */
    IsElastic(): Boolean;
    /**
     * Растянуть объект до требуемых размеров
     * @param newSize
     */
    ElasticResize(newSize: Vector): Vector;
    /**
     * Загрузить объекты из файлов *.b3d,*.f3d
     * @param file
     */
    Load(file: string): Boolean;

}

declare class Panel extends Object3{
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
     * @param index индекс кромки
     * @param distance расстояние до панелей
     */
    IsButtVisible(index: number, distance: number): Boolean;
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
     * @param Front На лицевую пласть панели
     */
    AddPlastic(material: InMaterial, Front: boolean): PanelPlastic;
    /**
     * Создать новый паз
     * @param name
     */
    AddCut(name: string): PanelCut;

}

declare class Extrusion extends Object3{
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
    Clip(pos: Vector, normal: Vector);

}

declare class Trajectory extends Object3{
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

declare class Block extends List3D{
    /**
     * 
     */
    AnimType: AnimationType;
    /**
     * Флаг составной фурнитуры
     */
    IsFastener(): Boolean;

}

declare class Assembly extends List3D{
    /**
     * 
     */
    AnimType: AnimationType;

}

declare class Contour3D extends Object3{
    /**
     * Элементы вспомогательного контура
     */
    Contour: Contour2D;

}

declare class Size3D extends Object3{
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

declare class PanelButts{
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

declare class PanelButt{
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

declare class PanelPlastics{
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

declare class PanelPlastic{
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

declare class PanelCuts{
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

declare class PanelCut{
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

declare class Contour2D{
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
    Move(dx: number, dy: number);
    /**
     * Повернуть вокруг точки
     * @param x
     * @param y
     * @param angle Угол (в градусах)
     */
    Rotate(x: number, y: number, angle: number);
    /**
     * Добавить прямоугольник
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    AddRectangle(x1: number, y1: number, x2: number, y2: number);
    /**
     * Добавить прямоугольник со скурглёнными краями
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param rad
     */
    AddRoundRect(x1: number, y1: number, x2: number, y2: number, rad: number);
    /**
     * Добавить линию
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    AddLine(x1: number, y1: number, x2: number, y2: number): Object;
    /**
     * Добавить окружность
     * @param xc
     * @param yc
     * @param rad
     */
    AddCircle(xc: number, yc: number, rad: number): Object;
    /**
     * Добавить дугу по началу, концу и центру
     * @param p1
     * @param p2
     * @param centre
     * @param orient Ориентация против часовой стрелки
     */
    AddArc(p1: Point, p2: Point, centre: Point, orient: boolean): Object;
    /**
     * Добавить дугу по 3 точкам
     * @param p1
     * @param p2
     * @param p3
     */
    AddArc3(p1: Point, p2: Point, p3: Point): Object;
    /**
     * Добавить эквидистанту контура. Последние 2 параметры отвечают за направление и скругление
     * @param contour 
     * @param offset
     * @param Side
     * @param Rounding
     * @param Pos 
     */
    AddEquidistant(contour: Contour2D, offset: number, Side: boolean, Rounding: boolean, Pos?: Point);
    /**
     * Вычесть замкнутый контур
     * @param contour
     */
    Subtraction(contour: Contour2D);
    /**
     * Сложить с замкнутым контуром
     * @param contour
     */
    Addition(contour: Contour2D);
    /**
     * Скругление элементов
     * @param elem1
     * @param elem2
     * @param x
     * @param y
     * @param radius
     */
    RoundingEx(elem1, elem2, x: number, y: number, radius): Object;
    /**
     * Фаска на 2 элементах
     * @param elem1
     * @param elem2
     * @param l1
     * @param l2
     */
    FacetEx(elem1, elem2, l1: number, l2?:number): Object;
    /**
     * Скругление в указанной точке
     * @param x
     * @param y
     * @param radius
     */
    Rounding(x: number, y: number, radius: number): Object;
    /**
     * Фаска в указанной точке
     * @param x
     * @param y
     * @param l
     */
    Facet(x: number, y: number, l: number): Object;
    /**
     * Найти ближайший элемент по координатам
     * @param x
     * @param y
     */
    Find(x: number, y: number): Object;
    /**
     * Вписать весь контур в заданные габариты
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    Fit(x1: number, y1: number, x2: number, y2: number);
    /**
     * Растянуть контур резиновой нитью
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param dx
     * @param dy
     */
    Elastic(x1: number, y1: number, x2: number, y2: number, dx: number, dy: number);
    /**
     * Отразить контур относительно линии
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param Copy
     */
    Symmetry(x1: number, y1: number, x2: number, y2: number, Copy: boolean);
    /**
     * Загрузить контур из файла *.frw
     * @param file
     */
    Load(file: string): Boolean;
    /**
     * Находится ли точка внутри контура?
     * @param x
     * @param y
     */
    IsPointInside(x: number, y: number): Boolean;
    /**
     * Находится ли контур внутри другого?
     * @param contour
     */
    IsInContour(contour: Contour2D): Boolean;
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

declare class Geometry2D{
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
    Area(contour: Contour2D): Number;

}

declare class InControl{
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

declare class InButton extends InControl{
    /**
     * Создать подменю
     * @param caption
     */
    NewSubMenu(caption: string): InButton;
    /**
     * 
     */
    Combo: Boolean;

}

declare class InFloat extends InControl{
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

declare class InNumber extends InControl{
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

declare class InMaterial extends InControl{
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
     * @param obj
     */
    Apply(obj: Object3);

}

declare class InButtMaterial extends InControl{
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

declare class InFurniture extends InControl{
    /**
     * Установить крепеж между двух панелей
     * @param panel1
     * @param panel2
     * @param x
     * @param y
     * @param z
     */
    Mount(panel1: Panel, panel2: Panel, x: number, y: number, z: number): Object3;
    /**
     * Установить крепеж на плоскость панели
     * @param panel
     * @param x
     * @param y
     * @param z
     * @param angle Угол (в градусах)
     */
    Mount1(panel: Panel, x: number, y: number, z: number, angle: number): Object3;

}

declare class InfFurniture{
    /**
     * Установить крепеж между двух панелей
     * @param panel1
     * @param panel2
     * @param x
     * @param y
     * @param z
     */
    Mount(panel1: Panel, panel2: Panel, x: number, y: number, z: number): Object3;
    /**
     * Установить крепеж на плоскость панели
     * @param panel
     * @param x
     * @param y
     * @param z
     * @param angle Угол (В градусах)
     */
    Mount1(panel: Panel, x: number, y: number, z: number, angle: number): Object3;

}

declare class DoorsMaker{
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
    Save(filename: string);
    /**
     * Загрузить параметры установки дверей из файла
     * @param filename
     */
    Load(filename: string): Boolean;
    /**
     * Установить двери в секцию (Объект - Panel или Edge)
     * @param LeftObject
     * @param RightObject
     * @param TopObject
     * @param BottomObject
     */
    Setup(LeftObject: Panel | Edge3, RightObject: Panel | Edge3, TopObject: Panel | Edge3, BottomObject: Panel | Edge3);

}

declare class BoxesMaker{
    /**
     * 
     */
    ShowErrors: Boolean;
    /**
     * Сохранить параметры установки ящиков в файл
     * @param filename
     */
    Save(filename: string);
    /**
     * Загрузить параметры установки ящиков из файла
     * @param filename
     */
    Load(filename: string): Boolean;
    /**
     * Установить ящик в секцию. LeftObject, RightObject - панели. TopObject, BottomObject - Panel или Edge
     * @param LeftObject Левая панель
     * @param RightObject Правая панель
     * @param TopObject Верхняя граница (Панель или ребро)
     * @param BottomObject Нижняя граница (Панель или ребро)
     */
    Setup(LeftObject: Panel, RightObject:Panel, TopObject: Panel | Edge3, BottomObject: Panel | Edge3);

}

declare class ScItemTovar{
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

declare class ScItemTovarList{
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
    FindByName(name: string, CaseSensitive): ScItemTovar;

}





declare class Arguments extends Object{
    /**
     * 
     */
    callee: Function;
    /**
     * 
     */
    length: Number;

}
/**
 * Создать 3D точку по координатам
 * @param x
 * @param y
 * @param z
 */
declare function NewVector(x: number, y: number, z: number): Vector;

/**
 * Создать 2D точку по координатам
 * @param x
 * @param y
 */
declare function NewPoint(x: number, y: number): Point;

/**
 * Создать плоский контур
 */
declare function NewContour(): Contour2D;

/**
 * Создать новый COM объект по его типу
 * @param CLSID
 */
declare function NewCOMObject(CLSID: string): IDispatch;

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
declare function OpenFurnitureScheme(filename: string, schemeGroup: string, schemeName: string): FurnitureScheme;

/**
 * Открыть группу схем установки крепежа
 * @param filename
 * @param  schemeGroup
 */
declare function OpenFurnitureSchemes(filename: string, schemeGroup: string): FurnitureSchemes;

/**
 * Создать схему установки крепежа
 * @param schemeName
 */
declare function NewFurnitureScheme(schemeName: string): FurnitureScheme;

/**
 * Создать схему секции
 * @param schemeName
 */
declare function NewSectionScheme(schemeName: string): SectionScheme;

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
declare function OpenFurniture(filename: string): InfFurniture;

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
declare function SetCamera(p3d: Vector);

/**
 * Запрос точки
 * @param hint
 */
declare function GetPoint(hint: string): Vector;

/**
 * Запрос объекта модели
 * @param hint
 */
declare function GetObject(hint: string): Object3;

/**
 * Запрос панели
 * @param hint
 */
declare function GetPanel(hint: string): Panel;

/**
 * Запрос выбора ребра, параллельного указанному вектору
 * @param hint
 * @param Axis
 */
declare function GetEdge(hint: string, Axis: Vector): Edge3;

/**
 * Создать панель указанных размеров
 * @param width
 * @param height
 */
declare function AddPanel(width: number, height: number): Panel;

/**
 * Создать фронтальную панель
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param z
 */
declare function AddFrontPanel(x1: number, y1: number, x2: number, y2: number, z: number): Panel;

/**
 * Создать горизонтальную панель
 * @param x1
 * @param z1
 * @param x2
 * @param z2
 * @param y
 */
declare function AddHorizPanel(x1: number, z1: number, x2: number, z2: number, y: number): Panel;

/**
 * Создать вертикальную панель
 * @param z1
 * @param y1
 * @param z2
 * @param y2
 * @param x
 */
declare function AddVertPanel(z1: number, y1: number, z2: number, y2: number, x: number): Panel;

/**
 * Создать профиль
 * @param name
 */
declare function AddExtrusion(name: string): Extrusion;

/**
 * Создать тело по траектории
 * @param name
 */
declare function AddTrajectory(name: string): Trajectory;

/**
 * Создать мебельный блок
 * @param name
 */
declare function AddBlock(name: string): Block;

/**
 * Создать полуфабрикат
 * @param name
 */
declare function AddDraftBlock(name: string): Block;

/**
 * Создать мебельную сборку
 * @param name
 */
declare function AddAssembly(name: string): Block;

/**
 * Создать копию объекта
 * @param obj
 */
declare function AddCopy(obj: Object3): Object3;

/**
 * Создать симметричную копию объекта
 * @param obj
 * @param  pos 
 * @param  normal
 */
declare function AddSymmetry(obj: string, pos: Vector, normal: Vector): Object3;

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
declare function AddSize(pos1: Vector, pos2: Vector, toppos: Vector): Size3D;

/**
 * Удалить объекты ранее созданные в скрипте
 */
declare function DeleteNewObjects();

/**
 * Удалить объект из модели
 * @param obj
 */
declare function DeleteObject(obj: Object3);

/**
 * Функция начала редактирования объекта
 * @param obj
 */
declare function StartEditing(obj: Object3): Object3;

/**
 * Начать создание блока. Все созданные далее объекты попадают внутрь блока
 * @param name
 */
declare function BeginBlock(name: string): Block;

/**
 * Закончить создание блока
 */
declare function EndBlock();

/**
 * Начать создание редактируемого блока
 * @param name
 */
declare function BeginParametricBlock(name: string): Block;

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
declare function NewButtonInput(caption: string): InButton;

/**
 * Создать элемент управления для ввода целого числа
 * @param caption
 */
declare function NewFloatInput(caption: string): InFloat;

/**
 * Создать элемент управления для ввода числа
 * @param caption
 */
declare function NewNumberInput(caption: string): InNumber;

/**
 * Создать элемент управления для выбора материала
 * @param caption
 */
declare function NewMaterialInput(caption: string): InMaterial;

/**
 * Создать элемент управления для выбора кромочного материала
 * @param caption
 */
declare function NewButtMaterialInput(caption: string): InButtMaterial;

/**
 * Создать элемент управления для выбора фурнитуры
 * @param caption
 */
declare function NewFurnitureInput(caption: string): InFurniture;

/**
 * Создать элемент управления для анализа модели
 */
declare function NewModelInspector(): ModelInspector;

/**
 * Создать мастер установки дверей
 * @param caption
 */
declare function NewDoorsMaker(caption: string): DoorsMaker;

/**
 * Создать мастер установки ящиков
 * @param caption
 */
declare function NewBoxesMaker(caption: string): BoxesMaker;

/**
 * Список элементов товара. Только для Салона
 */
declare var TovarItems: ScItemTovarList;

