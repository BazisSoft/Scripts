# Содержание

## [Общие сведения](#common_info)  
### [Демонстрационные примеры БАЗИС-скрипт](#demo_samples)  
### [Редактор скриптов](#script_editor)  
#### [Запуск редактора](#launch_editor)  
#### [Интерфейс Редактора скриптов](#script_editor_interface)
#### [Команды редактора](#script_editor_menu)
#### [Вкладка скрипта](#script_editor_tab)

## [Организация взаимодействия с пользователем](#user_interface)
### [Элементы управления на панелях инструментов](#dynamic_controls)
### [Элементы управления вспомогательной панели Свойства](#property_controls)
### [Выдача сообщений пользователю](#user_messages)

## [Синтаксис языка](#language_syntax)
### [Список ключевых слов языка программирования БАЗИС-Script](#keywords)
### [Список зарезервированных слов](#reserved_words)
### [Комментарии](#comments)
### [Переменные](#variables)
### [Константы](#constants)
### [Арифметические операции](#arithmetic_ops)
### [Логические операции](#logical_ops)
### [Операции сравнения](#compare_ops)
### [Оператор if...else](##if_else)
### [Оператор switch](#switch)
### [Оператор условного выражения](#conditional_op)
### [Операторы break и continue](#break_continue)
### [Цикл for](#for_cycle)
### [Цикл while](#while_cycle)
### [Цикл do...while](#do_while_cycle)
### [Оператор with](#with_op)
### [Оператор try...catch...throw](#exception_handling)
### [Функции](#functions)

## [Общее для всех модулей](#common_variables)
### [Глобальные константы](#global_consts)
<!--
AxisX
AxisY
AxisZ
Axis_X
Axis_Y
Axis_Z
-->
### [Глобальные перечисляемые типы](#global_enums)
<!--
TProjection3dEnum
PanelSideEnum 
SalonAnimationType
TextureDir
WindowPosition
FurnSchemeType
SchemeFurnPos
ErrorType
DatumMode
FurniturePosition
ElementType
FurnPositionMode
-->
[//]: # (Глобальные свойства и методы)
### [Глобальные свойства](#global_props)
<!--
system
Model
Action
ActiveMaterial
AnimationType
-->
### [Глобальные методы](#global_methods)
<!--
prompt
alert
confirm
OpenFurniture
SelectAll
UnSelectAll
ViewAll
SetCamera
GetPoint
GetObject
GetPanel
GetEdge
AddPanel
AddFrontPanel
AddHorizPanel
AddVertPanel
AddExtrusion
AddTrajectory
AddBlock
AddAssembly
AddDraftBlock
AddCopy
DeleteNewObjects
DeleteObject
StartEditing
BeginBlock
EndBlock
NewButtonInput
NewFloatInput
NewNumberInput
NewMaterialInput
NewButtMaterialInput
NewFurnitureInput
FormatMatName
OrientCamera
ExtractMatName
ExtractMatCode
NewVector
NewPoint
NewContour
NewCOMObject
NewForm
-->
## [Общие типы для всех модулей](#common_types)
### [Geometry2D](#geometry2d_class)
<!--
Методы
Intersect
Compare
Distance
Area
-->
### [System](#system_class)
<!--
Методы
include
log
fileExists
writeTextFile
askWriteTextFile
readTextFile
askReadTextFile
secureExec
exec
getFileName
getFileNameWithoutExtension
askFileNameSave
askFolder
Свойства
apiVersion
developerApiVersion
-->
### [Model3D](model3d_class)
<!--
Свойства
Selected
SelectionCount
Selections
Count
Objects
-->
### [Action3D](action3d_class)
<!--
Свойства
Interactive
MouseX
MouseY
Pos3
ViewDir
UpDir
RightDir
ShowPoints
ShowEdges
Hint
ErrorHint
BlinkHint
OnClick
OnMove
OnStart
OnFinish
Properties
OnRayTraceFinished
ModelFilename
Методы
Continue
Commit
Finish
Cancel
AsyncExec
BeginOrtho3
EndOrtho3
CursorToClosestPoint
CursorToClosestLine
CursorToMiddleOfLine
Find3DPoint
Find3DPointXZPlane
Get3Dobject
RayTraceScene
LoadModel
SaveModel
NewModel
NewFurniture
NewFragment
Revert
ArrangePositions
ReplaceFurniture
ChooseMaterial
-->
### [ScriptProperty](#script_prop_class)
<!--
Свойства
Name
Enabled
ChildrenEnabled
Visible
OnChange
Count
Items
Expanded
OnDeactivate
OnValueValidate
ValueValid
NameEditable
BackColor
PopupMenu
DropDownMenu
OnActivate
OnValueChange
Tag
Методы
Clear
NewCOMObject
Save
Load
NewGroup
NewImage
NewString
NewBool
NewNumber
NewButton
NewMaterial
NewButt
NewFurniture
NewColor
NewSeparator
Validate
-->
### [ScriptGroupProperty](#script_group_class)
<!--
Свойства
Image
MaxHeight
Scrollable
-->
### [ScriptStringProperty](#script_string_class)
<!--
Свойства
Value
-->
### [ScriptBooleanProperty](#script_bool_class)
<!--
Свойства
Value
-->
### [ScriptNumberProperty](#script_number_class)
<!--
Свойства
MaxValue
MinValue
ValueStep
Value
-->
### [ScriptButtonProperty](#script_button_class)
<!--
Свойства
Value
OnClick
-->
### [ScriptMaterialProperty](#script_material_class)
<!--
Свойства
Width
Методы
SetActive
-->
### [ScriptButtProperty](#script_butt_class)
<!--
Свойства
Thickness
Width
Методы
SetActive
-->
### [ScriptFurnitureProperty](#script_furn_class)
<!--
Свойства
Value
-->
### [ScriptColorProperty](#script_color_class)
<!--
Свойства
Value
-->
### [ScriptMenu](#script_menu_class)
<!--
Свойства
Name
OnChange
Count
Items
Store
Методы
Clear
Save
Load
NewGroup
NewString
NewBool
NewNumber
NewButton
-->

### [FurnMaterial](#furn_mat_class)
<!--
Свойства
Name
Thickness
Width
Методы
Make
-->
### [Vector](#vector_class)
<!--
Свойства
x
y
z
-->
### [Point](#point_class)
<!--
Свойства
x
y
-->
### [Edge3](#edge3_class)
<!--
Свойства
First
Last
GFirst
GLast
-->
### [Object3](#object3_class)
<!--
Свойства
Name
ArtPos
Owner
Visible
Selected
List
AsList
AsPanel
Position
PositionX
PositionY
PositionZ
GMax
GMin
GSize
GabMin
GabMax
UserPropCount
UserProperty
UserPropertyName
Методы
SetDefaultTransform
Translate
Rotate
TranslateGCS
RotateGCS
RotateX
RotateY
RotateZ
Orient
OrientGCS
Reflect
ToObject
ToGlobal
NToObject
NToGlobal
Build
IsOwner
-->
### [List3D](#list3d_class)
<!--
Свойства
Count
IsElastic
Objects
Методы
ElasticResize
Load
-->
### [Panel](#panel_class)
<!--
Свойства
Contour
Butts
Cuts
Plastics
ContourHeight
ContourWidth
Thickness
MaterialName
MaterialWidth
Методы
AddButt
AddCut
AddPlastic
IsButtVisible
-->
### [Extrusion](#extrusion_class)
<!--
Свойства
Contour
Thickness
MaterialName
-->
### [Trajectory](#trajectory_class)
<!--
Свойства
Contour2D
Trajectory2D
MaterialName
Пример
-->
### [Block](#block_class)
<!--
Свойства
IsFastener
-->
### [Assembly](#assembly_class)
<!--
Свойства
AnimType
-->
### [PanelButts](#panel_butts_class)
<!--
Свойства
Count
Методы
Butts[]
Add
-->
### [PanelButt](#panel_butt_class)
<!--
Свойства
ElemIndex
Sign
Material
Thickness
Width
ClipPanel
Overhung
Allowance
CutIndex
Profile
-->
### [PanelPlastics](#panel_plastics_class)
<!--
Свойства
Count
Методы
Plastics[]
Add
-->
### [PanelPlastic](#panel_plastic_class)
<!--
Свойства
Material
Thickness
TextureOrientation
-->
### [PanelCuts](#panel_cuts_class)
<!--
Свойства
Count
Методы
Add
Cuts
-->
### [PanelCut](#panel_cut_class)
<!--
Свойства
Name
Sign
Trajectory
Contour
-->
### [Contour2D](#contour2d_class)
<!--Свойства
Count
Objects
Width
Height
Min
Max
Методы
Clear
Move
Rotate
AddRectangle
AddRoundRect
AddLine
AddCircle
AddArc
AddArc3
AddEquidistantRecursive
Subtraction
Addition
RoundingEx
FacetEx
Rounding
Facet
Find
Fit
Elastic
Symmetry
Load
OrderContours
AddEquidistant
IsPointInside
IsInContour
IsClosedContour
IsContourRectangl
-->
### [InControl](#incontrol_class)
<!--
Свойства
id
Enabled
Visible
Hint
OnChange
-->
### [InButton](#inbutton_class)
<!--
Свойства
Caption
Combo
Методы
NewSubMenu
-->
### [InFloat](#infloat_class)
<!--
Свойства
Value
ReadOnly
Fixed
-->
### [InNumber](#innumber_class)
<!--
Свойства
Value
ReadOnly
Fixed
-->
### [InMaterial](#inmaterial_class)
<!--
Свойства
Name
Thickness
Width
Методы
SetActive
Apply
-->
### [InButtMaterial](#inbuttmaterial_class)
<!--
Свойства
Name
Sign
Thickness
Width
Overhung
Allowance
ClipPanel
-->
### [InFurniture](#infurniture_class)
<!--
Свойства
DatumModeFilter
DatumMode
Методы
Mount
Mount1
MountScheme
MountBox
-->
### [ModelInspector](#model_inspector_class)
<!--
Свойства
ErrorList
Options
Методы
Run
-->
### [InspectorOptions](#inspector_options_class)
<!--
Свойства
ObjIntersectionAnalyze
FastIntersectionAnalyze
FastIncorrectAnalyze
PanelNotFixedAnalyze
PanelTooLargeAnalyze
PlasticTooLargeAnalyze
MatNotExistsAnalyze
MatOutOfStockAnalyze
-->
### [InspectorError](#inspector_error_class)
<!--
Свойства
ErrorType
ErrorObjectsCount
ErrorObjects
ErrorMessage
ObjectsNames
-->
### [ImportExportSVG](#import_export_svg_class)
<!--
Свойства
CurveQuality
GroupElems
Методы
Save
Load
-->
### [ImportExport](#import_export_class)
<!--
Свойства
SVG
-->
### [InfFurniture](#furniture_info_class)
<!--
Свойства
DatumModeFilter
DatumMode
Методы
Mount
Mount1
MountScheme
MountBox
Make
EncodeToString
DecodeFromString
Choose
-->
### [RootProperties](#root_props_class)
<!--
Методы
NewFurnitureValue
-->
### [Elem2D](#elem2d_class)
<!--
Свойства
ElType
Методы
IsLine
AsLine
IsCircle
AsCircle
IsEllipse
AsEllipse
IsArc
AsArc
IsList
AsList
ObjLength
-->
### [Line2D](#line2d_class)
<!--
Свойства
Pos1
Pos2
-->
### [Arc2D](#arc2d_class)
<!--
Свойства
Pos1
Pos2
Center
ArcDir
-->
### [Circle2D](#circle2d_class)
<!--
Свойства
Center
CirRadius
Dir
-->
### [Ellipse2D](#ellipse2d_class)
<!--
Свойства
Center
MajorRadius
MinorRadius
MajorAxisAngle
Dir
-->
### [FurnArticle](#furn_article_class)
<!--
Свойства
Name
OrderCode
OrderName
DatumMode
Методы
NameWithCode
-->
## [БАЗИС-Мебельщик](#woodworker_ww)
## [Глобальные константы БАЗИС-Мебельщик](#ww_constants)
<!--
p3dFront
p3dLeft
p3dRight
p3dTop
p3dBottom
p3dIsometric
-->

## [Типы в БАЗИС-Мебельщик](#ww_types)
### [ScriptForm](#script_form_class)
<!--Свойства
Properties
Caption
Width
Height
MinWidth
MinHeight
Visible
Left
Top
OKButton
OKButtonCaption
CancelButton
CancelButtonCaption
OnClose
OnShow
Resizable
Dockable
OnOkButtonClick
OnCancelButtonClick
Методы
Show
ShowModal
Close
-->

<!--Мастер построения дверей-->
### [DoorsMaker](#doors_maker_class)
<!--
Методы
Silent
ShowErrors
Save
Load
Setup
-->
<!--Мастер построения ящиков-->
### [BoxesMaker](#boxes_maker_class)
<!--
Методы
ShowErrors
Save
Load
Setup
-->
## [БАЗИС-Смета](#estimate)
## [Глобальные свойства БАЗИС-Смета](#estimate_props)
<!--
Panel
Holes
Material
Result
Objects
-->
## [Типы в БАЗИС-Смета](#estimate_types)
### [EstimateObject](#estimate_object_class)
<!--
Методы
AsPanel
IsPanel
AsButt
IsButt
AsPlastic
IsPlastic
AsExtrusionBody
IsExtrusionBody
AsTrajectoryBody
IsTrajectoryBody
-->
### [EstimateObjectList](#estimate_objlist_class)
<!--
Свойства
Count
Items
-->
### [PanelHoles](#panel_holes_class)
<!--
Свойства
Count
Holes
-->
### [PanelHole](#panel_hole_class)
<!--
Свойства
Depth
Diameter
-->
## [БАЗИС-Салон](#salon)
## [Типы в БАЗИС-Салон](#salon_types)
### [ScItemTovarList](#tovar_items_class)
<!--
Свойства
Items
Count
TovarName
TovarArticul
IsNotStandart
Методы
FindByName
-->
### [ScItemTovar](#tovar_item_class)
<!--
Свойства
Article
Name
Material
GroupMaterial
TypeElement
ObjList
-->
### [TovarItems]()
### [TScItemTovar]()
### [SalonUtils](salon_utils_obj)
<!--Свойства
PathAttachments
Методы
GetFullPathAttachment
-->

Приложение I.
Создание экранной формы в визуальном режиме . . . . 187
19

# <a name="common_info">Общие сведения</a>  
БАЗИС-скрипты представляют собой ориентированные на прикладного программиста 
инструментальные средства автоматизации проектирования мебели на базе модуля 
БАЗИС-Мебельщик. БАЗИС-скрипты используют синтаксис языка Javascript и 
сохраняются в файлах с расширением js.
## <a name="demo_samples">Демонстрационные примеры БАЗИС-скрипт</a>
В комплект поставки системы БАЗИС включены демонстрационные примеры, 
иллюстрирующие применение скриптов. Используя эти примеры, можно создавать 
собственные скрипты.  
При установке модуля БАЗИС-Мебельщик файлы скриптов автоматически сохраняются в 
папку `<имя системного диска>:\Program Files\BazisSoft\Bazis X\Samples\>`, где X 
представляет собой номер версии.
## <a name="script_editor">Редактор скриптов</a>  
### <a name="launch_editor">Запуск редактора</a>  
Команды работы со скриптами расположены в разделе Скрипты Главного меню 
модуля БАЗИС-Мебельщик. Команда Редактор скриптов позволяет открыть окно 
редактора. Другие команды раздела совпадают с именами файлов скриптов. Если 
щелкнуть левой кнопкой мыши по имени скрипта, он автоматически запустится на 
выполнение. Если выполнить такой щелчок, удерживая нажатой клавишу 
<kbd>Ctrl</kbd>, будет раскрыто окно Редактор скриптов, в котором будет показан
текст скрипта (рис. 1).
### <a name="script_editor_interface">Интерфейс Редактора скриптов</a>
#### <a name="script_editor_menu">Команды редактора</a>
Команды главного меню являются стандартными и позволяют выполнять операции с 
файлами скриптов, а также закрыть окно редактора. Несколько скриптов могут быть 
открыты в редакторе одновременно. Их тексты располагаются на вкладках окна. 
Одна из вкладок является активной. Именно к скрипту, текст которого находится 
на этой вкладке, применяются команды редактора. Команда Запуск заускает 
активный скрипт на выполнение.
#### <a name="script_editor_tab">Вкладка скрипта</a>
Редактор скриптов представляет собой текстовый редактор. Синтаксис команд скрипта 
подсвечивается.
> Текст скрипта можно подготовить в любом стороннем текстовом редакторе.
# <a name="user_interface">Организация взаимодействия с пользователем</a>
Взаимодействие пользователя с программой может выполняться с использованием 
следующих способов:  
- элементы управления (кнопки, поля ввода и т.п.), расположенные на панели 
инструментов,
- элементы управления, расположенные на вспомогательной панели **Свойства**,
- выдача пользователю сообщений, в том числе, требующих его реакции.  

Для простых команд, у которых количество параметров невелико, целесообразно 
располагать элементы управления на панели инструментов. В качестве аналога можно 
привести стандартные команды системы БАЗИС, например, команды группы **Операции**. 
При этом для ускорения доступа к ним автоматически назначаются «горячие клавиши»:
- для доступа к кнопкам <kbd>Shift</kbd>>+<kbd>1</kbd>, <kbd>Shift</kbd>>+
<kbd>2</kbd> и т.д.
- для доступа к полям ввода <kbd>Alt</kbd>>+<kbd>1</kbd>, <kbd>Alt</kbd>+
<kbd>2</kbd> и т.д.  

При создании сложных скриптов, предназначенных для построения параметрических 
моделей, целесообразно размещать элементы управления на вспомогательной панели 
**Свойства**. Это позволяет групировать их, в том числе и
на нескольких уровнях.
## <a name="dynamic_controls"> Элементы управления на панелях инструментов</a>
Чтобы сформировать элементы управления на панелях инструментов, следует
использовать следующие методы:
- NewButtonInput
- NewFloatInput
- NewNumberInput
- NewMaterialInput
- NewButtMaterialInput
- NewFurnitureInput  

## <a name="property_controls">Элементы управления вспомогательной панели Свойства</a>
Чтобы использовать элементы управления вспомогательной панели **Свойства**, 
следует использовать следующие методы и свойства объекта Action.Properties:
- NewGroup – Создать вложенную группу свойств.
- NewImage – Создать вложенную группу свойств c рисунком.
- NewString – Создать свойство типа Строка.
- NewBool – Создать свойство типа Да/Нет.
- NewNumber – Создать свойство типа Число.
- NewButton – Создать свойство с кнопкой редактирования.
- NewMaterial – Создать свойство типа Материал.
- NewButt – Создать свойство типа Материал кромки.
- NewFurniture – Создать свойство типа Фурнитура.
- NewColor – Создать свойство типа Цвет.
- NewSeparator – Создать разделитель.
- PopupMenu – Всплывающее меню.
- DropDownMenu – Выпадающее меню.

## <a name="user_messages">Выдача сообщений пользователю</a>
Выдача пользователю сообщений обеспечивается использованием следующих методов:
- alert – Вывести на экран сообщение или значения параметров.
- confirm – Вывести на экран диалог подтверждения или отмены.
- Hint – Установить строку подсказки.
- ErrorHint –Установить сообщение об ошибке.

# <a name="language_syntax">Синтаксис языка</a>
Синтаксис языка скриптов похож на C++ и Java. Но в любом языке программирования 
присутствует своя специфика представления ключевых и зарезервированных слов, 
составляющих ядро для программирования на этом языке. Ключевые слова всегда 
доступны программисту, но для их использования нужно придерживаться правильного 
синтаксиса.
## <a name="keywords">Список ключевых слов языка программирования БАЗИС)Script:</a>
- break
- switch
- for
- typeof
- continue
- try
- new
- while
- const
- finally
- case
- this
- return
- throw
- in
- default
- var
- else
- if
- catch
- do
- function
- with

## <a name="reserved_words">Список зарезервированных слов:</a>
- boolean
- double
- goto
- interface
- byte
- enum
- implements
- long
- char
- export
- import
- native
- throws
- float
- int
- short

## <a name="comments">Комментарии</a>
К комментариям относится часть кода скрипта, которая никогда не будет выполняться 
программой, однако она очень полезна при дальнейшей разработке. Например, 
используя комментарии, легко можно найти участок созданной ранее программы или 
предоставить возможность другим пользователям сделать это. Комментарии могут 
начинаться с символов <//>, либо вы можете закомментировать участок кода, начав 
с символа открытия комментария </*> и закрыв, соответственно, символом <*/>.  
Примеры:
```js
box(0,0,0,100,100,100,"box1"); //построение параллелепипеда. Все что написано после знака <//> и есть комментарий к коду
/*
Этот участок кода никогда не будет исполнен, он нужен лишь для того, чтобы
в дальнейшем понять, что делалось в данном скрипте, а может быть для от
ладки участка программы...
*/
```
Весь участок кода начиная с символа </*> и заканчивая <*/> игнорируется 
программой и является комментарием
## <a name="variables">Переменные</a>
Для создания переменной используется ключевое слово var.
Примеры:
```js
var x; //создаю переменную x без инициализации
var x = 100; //создаю переменную x, равную 100 целого типа, возможные значения от -2147483648 до 2147483647.
var x, y = 100; //создаю сразу несколько переменных
var x = new Array(4); //создаю массив с 4 элементами(x[0],x[1],x[2],x[3])
var x = "Текст для вывода на экран\nНа второй строке информация\nНа третьей строке..."; //создаю переменную с текстовым содержанием
var x = true; //создаю переменную логического содержания true(истина) или false(ложь)
var x = 1516.2298; //создаю переменную вещественного типа, возможные значения от -1.17549435Е-38 до 3.40282347Е+38.
```
> Внимание! Для корректной работы скриптов имена переменных должны начинаться со 
> строчной или заглавной латинской буквы или знака подчеркивания; имя не должно 
> содержать никаких специальных символов, например: !, ?,| и т.д.; имя не должно 
> совпадать с ключевыми словами языка. Если вы некорректно зададите имя переменной, 
> то при выполнении скрипта будет выведено сообщение об ошибке и ее описание.

При задании текстовой переменной можно использовать спецсимволы, приведенные в 
табл. 1.
Табл.1.
|Символ | Описание                               |
|:----- |----------------------------------------|
|**\b** |Возврат на один символ с его удалением  |
|**\t** | Горизонтальная табуляция               |
|**\n** | Новая строка                           |
|**\v** | Вертикальная табуляция                 |
|**\r** | Возврат каретки                        |
|**\”** | Двойная кавычка                        |
|**\’** | Одинарная кавычка                      |
|**\\** | Обратная косая черта                   |


## <a name="constants">Константы</a>
Для создания констант используется ключевое слово const. Отличием констант 
является то, что их значение нельзя изменить. Основным преимуществом таких типов 
является меньшее количество байт, занятых этими переменными и, как следствие, 
ускорение выполнения кода при использовании const где это возможно.
**Примеры:**1
```js
const message = "Неизменяемый текст"; //создаю константу текстового типа
```
**Арифметические операции**
- Сложение. Пример x+y
- Вычитание. Пример x"y
- Умножение. Пример x*y
- Деление. Пример x/y
- Остаток от деления. Пример: х % у

Для простоты использования в языке скриптов можно использовать сокращенные записи 
этих операций (табл. 2).

**Табл.2.**
|Операция   |Описание|
|-----------|--------|
|**x += y** | Сокращенная запись x = x + y|
|**x )= y** | Сокращенная запись x = x " y|
|**x *= y** | Сокращенная запись x = x * y|
|**х /= у** | Сокращенная запись x = x / y|
|**х %= у** | Сокращенная запись x = x % y|
|**++x**    | Сокращенная запись x = x + 1. Увеличение на 1 до присваивания|
|**))x**    | Сокращенная запись x = x " 1. Уменьшение на 1 до присваивания|
|**x++**    | Сокращенная запись x = x + 1. Увеличение на 1 после присваивания|
|**x))**    | Сокращенная запись x = x " 1. Уменьшение на 1 после присваивания|



**Примеры:**
```js
var i = 0;
var a = ++i; //В этом примере переменная i будет сначала увеличена на единицу, а затем переменной a будет присвоен результат. Итог: a = 1.
``` 
```js
var i = 0;
var a = i++; //В этом примере значение переменной i сначала будет присвоено переменной a и только после увеличено на 1. Итог: a = 0.
```
## <a name="logical_ops"> Логические операции</a>
- Логическое "И" " &&
- Логическое "ИЛИ" " ||
**Примеры:**
```js
var i = 0;
var f = 5;
if (f>i && f!=0) {} //Итог: true, т.к. первое и второе условие  true
var i = 10;
var f = 15;
if (i==f || f==0) {} //Итог: false, т.к. ни первое, ни второе условие неверно.
```
## <a name="compare_ops">Операции сравнения</a>
Такие операции необходимы для сравнения одной переменной или константы с другой. 
В табл. 3 приведен список всех возможных операций сравнения:  
**Табл.3.**
|Операция | Описание|
|---------|------------|
|**x == y** | Возвращает true, если x и y равны между собой|
|**x != y** | Возвращает true, если x и y не равны между собой|
|**x === y**| Возвращает true, если x и y равны между собой и их типы совпадают|
|**х < у**  | Возвращает true, если x меньше чем y|
|**х <= у** | Возвращает true, если x меньше или равен y|
|**х > у**  | Возвращает true, если x больше чем y|
|**х >= у** | Возвращает true, если x больше или равен y|

**Примеры:**
```js
true==1 // Итог: true (true преобразуется в 1)
true===1 // Итог: false (true не преобразуется в 1)
5 <= "5" // Итог: true (строка "5" преобразуется в число)
5 === "5" // Итог: false (строка "5" не преобразуется в число)
5 > 4 // Итог: true (5 больше 4)
```
## <a name="if_else">Оператор if...else</a>
Принцип действия следующий: сначала проверяется условие if и если оно верно, то 
выполняется следующий код, а если нет, то выполняется код в записи else, если 
он указан
**Примеры:**
```js
if (10 > 5)
{
//Здесь выполняем код, если условие верно
}
else
{
//Здесь выполняем код, если условие не сработало
}
if (10 < 11)
{
//Здесь выполняем код, если условие верно
} //Оператор else пропущен, следовательно если условие не сработает, то никакой код выполняться не будет
```
## <a name="switch">Оператор switch</a>
Делается выбор по заданному значению. Эта функцию является заменой операторов 
if ... else и является более удобной, когда требуется перебрать множество 
значений
**Пример:**
```js
var num = 10;
switch (num)
{
case 1:
//Выполняем код, если num == 1
break;
case 2:
//Выполняем код, если num == 2
break;
case 100:
//Выполняем код, если num == 100
break;
default:
//Выполняем код, если значение найдено не было
}
```
## <a name="conditional_op">Оператор условного выражения</a>
Очень компактная и удобная функция для выбора одного из двух доступных значений. 
Принцип работы:  
результат = (условие) ? значение1(если условие верно) : значение2(если 
условие не сработало)
> Представляет собой удобный и гибкий способ использования циклов. На языке C/C++ 
> такой оператор работает медленнее обычного оператора if ... else. Однако при 
> написании скриптов вопрос оптимизации не стоит так остро и потому такая форма 
> записи встречается часто.
**Пример:**
```js
var S = (1 > 0) ? 1500 : 1600; //Соответственно в этом выражении S = 1500, так как условие верно
```
## <a name="break_continue">Операторы break и continue</a>
- break – Команда используется внутри цикла для принудительного прекращения 
выполнения цикла.
- continue – Пропустить невыполненную часть цикла и продолжить выполнения цикла 
со следующими значениями.

**Пример:**
```js 
var S = "Имя_объекта1";
var FindedName = "";
for (var i = 0; i < 10; ++i)
{
    var tested = "Имя_объекта" + i;
    if (tested != S) continue; //Продолжаю поиск со следующими значениями
    else{
        FindedName = tested;
        break; //Принудительно прекращаю поиск, потому как имя объекта уже найдено и цикл больше не нужен
    }
}
if (FindedName != "")
    infomsg("Нашли объект по имени: " + FindedName);
else
    warning("Объект не найден");
```
## <a name="for_cycle">Цикл for</a>
Принцип действия:
for ( имя_переменной и ее стартовое значение; максимальное значение переменной; 
изменение переменной)  
{  
//Тело цикла  
}  
**Пример:**
```js
var num = 0;
for (var i = 0; i < 10; ++i)
{
num += i; //При каждом прохождении цикла значение num увеличивается на величину i
}
history(num); //Поместить результат в историю команд
//Несложно догадаться, что после выполнения такого кода программы num = 45 (0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45).
```
## <a name="while_cycle">Цикл while</a>
Аналог оператора организации цикла For; При использовании while нет 
инициализации переменной и ее изменения.
Принцип действия:
while ( условие )
{
//Тело цикла
}
**Пример:**
```js
//Предыдущий пример с оператором for можно записать следующим образом:
var num = 0, i = 0; //Инициализация переменной i в отличии от цикла For происходит заранее
while (i < 10)
{
    num += i; //При каждом прохождении цикла значение num увеличивается на величину i
    ++i; //В отличии от цикла For изменяем значение переменной i в теле цикла
}
history(num); //Результат как и в предыдущем примере num = 45
```
## <a name="do_while_cycle">Цикл do...while</a>
Одна из разновидностей цикла while. Разница состоит в том, что независимо от 
условия while цикл выполнится хотя бы один раз.
Принцип действия:
do
{
//Тело цикла
} while ( условие )
**Пример:**
```js 
//Предыдущий пример с оператором for можно записать следующим образом:
var num = 0, i = 0; //Инициализация переменной i в отличии от цикла For происходит заранее
do
{
    num += i; //При каждом прохождении цикла значение num увеличивается на величину i
    ++i; //В отличии от цикла For изменяем значение переменной i в теле цикла
} while (i < 10)
history(num); //Результат как и в предыдущем примере num = 45
```
## <a name="with_op">Оператор with</a>
Необходим при неоднократном обращении к одному и тому же объекту.
Пример:
```js
//Без оператора with:
history(Math.PI);
history(Math.abs(2));
history(Math.max(4, 10, 7, 6));
//С оператором with:
with(Math)
{
    history(PI);
    history(abs(2));
    history(max(4, 10, 7, 6));
}
```
## <a name="exception_handling">Оператор try...catch...throw</a>
Перехват ошибок выполнения кода программы.
**Пример:**
```js
try
{
    //Участок программы, который может привести к ошибке выполнения
    var S = 100;
    if (S > 99)
        throw ("Значение S слишком большое: " + S); //Сделать выброс
    //Здесь можно продолжить выполнение программы
}
catch (...)
{
    //Этот код будет выполнен в случае возникновения ошибки
    critical(e); //Выводим сообщение об ошибке
}
finally
{
    //Код выполняется в любом случае
    infomsg("Завершили выполнение программы");
}
```
## <a name="functions">Функции</a>
Создание собственных функций в файле скрипта
Принцип действия:
function NameOfFunc(arg1,arg2...argn)
{
//Код функции
return 0; //Возвращаемое значение 0 или любое другое значение
}
**Пример:**
```js
function helloUser(name)
{
infomsg("Доброго времени суток, "+name)
}
var name = GetPar("Ваше имя");
helloUser(name);
```
Вы можете создавать функцию без параметров, а в случае необходимости передать 
ей параметры и узнать их значение при помощи объекта arguments внутри функции.
**Пример:**
```js
function multiply() //Функция перемножения
{
var result = 1;
for (var i = 0; i < arguments.length; ++i)
result *= arguments[i]; //Перемножаю аргументы между собой
return result;
}
infomsg("Результат перемножения 2,3,5,7: " + multiply(2,3,5,7));
```
# <a name="common_variables">Общее для всех модулей</a>
## <a name="global_consts">Глобальные константы</a>
### AxisX
Объект, состоящий из трех свойств:
- x = 1
- y = 0
- z = 0
### AxisY
Объект, состоящий из трех свойств:
- x = 0
- y = 1
- z = 0
### AxisZ
Объект, состоящий из трех свойств:
- x = 0
- y = 0
- z = 1
### Axis_X
Объект, состоящий из трех свойств:
- x = -1
- y = 0
- z = 0
### Axis_Y
Объект, состоящий из трех свойств:
- x = 0
- y = -1
- z = 0
### Axis_Z
Объект, состоящий из трех свойств:
- x = 0
- y = 0
- z = -1
### Направления обзора. Совпадают с основными видами.
|Значение | Описание|
|---------|---------|
|**p3dFront**| Вид спереди.|
|**p3dLeft**| Вид слева.|
|**p3dRight**| Вид справа.|
|**p3dTop**| Вид сверху.|
|**p3dBottom**| Вид снизу.|
|**p3dIsometric**| Аксонометрия.|

## <a name="global_enums">Глобальные перечисляемые типы</a>
### **<a name="salon_anim_type_enum">SalonAnimationType</a>**
Типы анимации сборок.
|Значение | Описание|
|--------|----------|
|**None**| Не учитывается в салоне.|
|**Custom**| Учитывается в салоне, не имеет анимации.|
|**DoorLeft**| Дверь левая.|
|**DoorRight**| Дверь правая.|
|**DoorFlap**| Дверь откидная.|
|**DoorLift**| Дверь подъемная.|
|**SDoorLeft**| Дверь купе левая.|
|**SDoorRight**| Дверь купе правая.|
|**Drawer**| Ящик.|
|**Support**| Опора.|
|**Handle**| Ручка.|
|**Facade**| Фасад.|

### **TextureDir**
Ориентация текстуры пластика панели.
|Значение|Описание|
|--------|--------|
|**None**| Отсутствует.|
|**Horizontal**| Горизонтальная.|
|**Vertical**| Вертикальная.|

### **WindowPosition**
Позиция формы.
|Значение| Описание|
|--------|--------|
|**Default**| Стандартная позиция формы.|
|**Left**| Форма пристыковывается слева|
|**Right**| Форма пристыковывается справа|

### **FurnSchemeType**
Тип схемы расстановки крепежа
|Значение|Описание|
|--------|--------|
|**WithBase**| Тип схемы с фиксированным отступом.|
|**Symmetric**| Симметричный тип схемы.|
|**VariableStep**| Тип схемы с переменным шагом|

### **ErrorType**
Тип ошибки анализа модели
|Значение|Описание|
|--------|--------|
|**ObjIntersection**| Пересечение объектов|
|**FastIntersection**| Пересечение фурнитуры|
|**FastIncorrect**| Неправильная установка фурнитуры|
|**MatNotExists**| Материала нет в наличии|
|**MatOutOfStock**| Материал отсутствует на складе|
|**PanelTooLarge**| Панель невозможно разместить на плите|
|**PlasticTooLarge**| Пластик невозможно разместить на панели|
|**PanelNotFixed**| Панель не закреплена|

### **DatumMode**
Тип монтирования фурнитуры/фрагмента.
|Значение|Описание|
|--------|--------|
|**None**| Отсутствует|
|**Face**| На плоскость|
|**FaceFace**| По двум непараллельным плоскостям|
|**FaceButt**| По плоскости и середине торца панели|
|**FaceEdge**| По плоскости и ребру|
|**ParallelFaces**| На 2 параллельные плоскости|
|**Box**| Секция|
|**Scheme**| Крепеж по схеме|

### **FurniturePosition**
Позиция фурнитуры при установке крепежа по схеме.
|Значение|Описание|
|--------|--------|
|**Inside**| Установка фурнитуры внутри стыка|
|**Outside**| Установка фурнитуры снаружи стыка|
|**Up**| Установка фурнитуры вверху стыка (только для стыков с горизонтальной панелью)|
|**Down**| Установка фурнитуры внизу стыка (только для стыков с горизонтальной панелью)|

### **ElementType**
Тип 2D элемента
|Значение|Описание|
|--------|--------|
|**Unknown**| Неизвестный|
|**Line**| Линия|
|**Arc**| Дуга|
|**Circle**| Окружность|
|**List**| Список элементов|
|**Ellipse**| Эллипс|

### **FurnPositionMode**
Режим расстановки позиций
|Значение|Описание|
|--------|--------|
|**All**| Раставить позиции заново|
|**New**| Раставить позиции у новых объектов|
|**Check**| Проверить позиции|

## <a href="global_props">Глобальные свойства</a>
### **system**
Системные функции
Тип: [System](#system_class)

### **Model**
Структура модели
Тип: [Model3D](#model3d_class)

### **Action**
Активный скрипт
Тип: [Action3D](#action3d_class)

### **ActiveMaterial**
Текущий материал
Тип: [FurnMaterial](#furn_mat_class)

### **AnimationType**
Типы анимации сборок и блоков
Тип: [SalonAnimationType](#salon_anim_type_enum)

## <a href="global_methods">Глобальные методы</a>