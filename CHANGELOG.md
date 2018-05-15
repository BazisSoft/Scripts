# Изменения в скриптах в системе Базис:

## Общие сведения:
1. Здесь представлены обновления и дополнения функционала скриптов 
  в следующем формате: текст, описывающий изменение функционала и код в формате
  файла определений TypeScript.
2. Изменения в экспериментальном файле определений 
  [experimental.d.ts](https://github.com/BazisSoft/vscode-bazis-debug/blob/master/experimental.d.ts) 
  (в расширении VSCode) здесь не описываются.

---

## [Важные изменения](#important)

## [Текущие изменения](#current)

## [Базис 10. Обновление. Январь 2018](#january2018)

## [Базис 10. Обновление. Июль 2017](#july2017)

## [Базис 10. Первый релиз. Июнь 2017](#june2017)

---
## <a name = "important">Важные изменения</a>:

1. Базис 10. Обновление. Январь 2018 - [developerApiVersion и apiVersion](#devApi);
2. Базис 10. Первый релиз. Июнь 2017 - [Схемы крепежа](#schemes);
---

## <a name = "current">Текущие изменения</a>:
Обновлено автодополнение для 2D элемента:
```ts

interface Elem2D {
    ElType: ElementType;
    IsLine(): boolean;
    AsLine(): Line2D;
    IsCircle(): boolean;
    AsCircle(): Circle2D;
    IsEllipse(): boolean;
    AsEllipse(): Ellipse2D;
    IsArc(): boolean;
    AsArc(): Arc2D;
    IsList(): boolean;
    AsList(): Contour2D;
    ObjLength(): number;
}
```

Обновлено автодополнение для объекта "кромка":
```ts
interface PanelButt {
    ElemIndex: number;
    Sign: string;
    Material: string;
    Thickness: number;
    Width: number;
    ClipPanel: boolean;
    Overhung: number;
    Allowance: number;
    CutIndex: number;
    Profile: Contour2D;
}
```

Добавлена функция выбора материала из базы.
```ts
interface Action3D {
    ChooseMaterial(): string;
}
```
Добавлены функции для извлечения имени и кода материала из полного имени материала
```ts
function ExtractMatName(material: string): string;
function ExtractMatCode(material: string): string;
```

## <a name = "january2018">Базис 10. Обновление. Январь 2018</a>:
Добавлена функция поворота камеры
```ts
function OrientCamera(dir: Vector);
```
Добавлена функция замены фурнитуры
```ts
interface Action3D {
    ReplaceFurniture(Old: string[], New: InfFurniture[], Fasteners: Object3[]);
}
```
Добавлено свойство артикула модели
```ts
interface FurnArticle{
    Name: string
    NameWithCode(): string;
    Code: string;
    FurnType: string;
    Author: string;
    Subject: string;
    Enterprise: string;
    Notes: string;
    OrderCode: string;
    OrderName: string;
    DatumMode: DatumMode;
}

var Article: FurnArticle;
```

Добавлена функция расстановки позиций
```ts
enum FurnPositionMode{
    All = 0,
    New = 1,
    Check = 2
}
interface Action3D {
    ArrangePositions(Mode: TFurnPositionMode, Model: List3D): boolean;
}
```

Добавлены функции создания модели/фурнитуры/фрагмента и функция отмены изменений, сделанных в скрипте
```ts
 interface Action3D {
    NewModel();
    NewFurniture();
    NewFragment();

    Revert();
 }
```

1. Исправлена установка схем крепежа из скриптов. 
  Теперь схемы ставятся через поле выбора фурнитуры (функция MountScheme).
2. Добавлена установка секций из скриптов через поле выбора фурнитуры (функция MountBox)
3. Для поля выбора фурнитуры
    * Добавлен фильтр по типу монтирования
    * Добавлено свойство только для чтения, возвращающее тип монтирования выбранной фурнитуры

```ts
interface InFurniture extends InControl {
    MountScheme(panel1: Panel, panel2: Panel, FurniturePosition: FurniturePosition, BasisPoint: Vector): Object3;
    MountBox(Position: Vector, Size: Vector, axisZ: Vector, axisY: Vector): Object3;
    DatumModeFilter: DatumMode;
    DatumMode: DatumMode;
}

interface InfFurniture {
    MountScheme(panel1: Panel, panel2: Panel, FurniturePosition: FurniturePosition, BasisPoint: Vector): Object3;
    MountBox(Position: Vector, Size: Vector, axisZ: Vector, axisY: Vector): Object3;
    DatumModeFilter: DatumMode;
    DatumMode: DatumMode;
}

declare enum FurniturePosition {
    Inside,
    Outside,
    Up,
    Down
}

declare enum DatumMode{
    None,
    Face,
    FaceFace,
    FaceButt,
    FaceEdge,
    ParallelFaces,
    Box,
    Scheme
}
```
**Только для `InfFurniture`
(недоступно для элемента выбора фурнитуры на динамической панели)**: 
1. Добавлено сохранение параметров фурнитуры в строку и извлечение 
  параметров фурнитуры из строки. 
2. Добавлено создание объекта фурнитуры только с параметрами толщин.

Добавлен метод выбора фурнитуры и создание объекта, содержащего информацию о 
  фурнитуре, из корневого свойства (`Action.Properties`).
  Изменено описание корневого свойства скрипта.

```ts

interface InfFurniture {
    EncodeToString(): string;
    DecodeFromString(str: string);
    Choose(): boolean;
}

interface Action3D{
    Properties: RootProperties;
}

declare interface RootProperties extends ScriptProperty{
    NewFurnitureValue(): InfFurniture;
}
```


<a name = "devApi">Добавлено новое свойство developerApiVersion.</a>

>**ЭТО ВАЖНО:** версия Bazis API (system.apiVersion) теперь имеет тип Number и 
> следует спецификации "Семантического версионирования" 
> (подробнее на сайте http://semver.org/lang/ru/) в формате ХХУУ, 
> где ХХ - мажор версия и УУ - минор версия. Начинается с номера 1001.  
>
>Минор версия (УУ, в данном случае 01) - увеличивается, когда в API сделаны изменения, 
>  совместимые с предыдущими версиями или добавлены новые функции. 
>  Например: скрипт, написанный в версии 1001, будет работать в версии 1003. 
>  Но не гарантируется, что скрипт, написанный в версии 1003, 
>  будет работать в версии 1001 (например, если функции, используемые в скрипте 
>  были добавлены в версии).
>
>Мажор версия (в данном случае 10) - увеличивается, когда в API сделаны изменения, 
>  несовместимые с предыдущей версией. Например: скрипт, написанный в версии 10ХХ 
>  с большой долей вероятности может неправильно работать в версии 11ХХ и наоборот.

```ts
interface System{
    apiVersion: number;
    developerApiVersion: number;
}
```

Добавлено свойство Scrollable у типа ScriptGroupProperty (только для форм). 
  При значении true добавляет на компонент типа "группа" полосы прокрутки;  
```ts
interface ScriptGroupProperty{
    Scrollable: boolean;
}
```

Добавлено свойство IsNotStandart для объекта TovarItems (для Салона). 
  Возвращает true, если объект не стандартный.
```ts
interface ScItemTovarList{
    IsNotStandart: boolean;
}
```

Добавлено свойство IsOwner для типа Object3. 
  Возвращает true, если объект obj (параметр функции) является родителем 
  текущего объекта, то есть текущий объект вложен в объект obj. Метод работает
  рекурсивно, то есть идет по всему дереву модели вплоть до корневого элемента
  (самой модели). У всех объектов в модели `IsOwner(Model)` возвращает true
```ts
interface Object3{
    IsOwner(obj: Object3): boolean;
}
```

Добавлено описание 2Д элементов.
```ts
declare enum ElementType{
    Unknown,
    Line,
    Arc,
    Circle,
    List,
    Ellipse
}
declare interface Elem2D{
    ElType: ElementType;
    IsLine(): boolean;
    AsLine(): Line2D;
    IsCircle(): boolean;
    AsCircle(): Circle2D;
    IsEllipse(): boolean;
    AsEllipse(): Ellipse2D;
    IsArc(): boolean;
    AsArc(): Arc2D;
    IsList(): boolean;
    AsList(): Contour2D;
}
declare interface Line2D extends Elem2D{
    Pos1: Point;
	Pos2: Point;
}
declare interface Arc2D extends Elem2D{
    Pos1: Point;
    Pos2: Point;
	Center: Point;
	ArcDir: boolean;

}
declare interface Circle2D extends Elem2D{
    Center : Point;
    CirRadius: number;
	Dir: boolean;
}
interface Ellipse2D extends Elem2D{
    Center: Point;
    MajorRadius: number;
    MinorRadius: number;
    MajorAxisAngle: number;
    Dir: boolean;
}

interface Contour2D {
	Objects: Elem2D[];
}
```

---




## <a name = "july2017">Базис 10. Обновление. Июль 2017</a>:

Добавлен импорт-экспорт SVG

```ts
function NewImportExport(): ImportExport;

interface ImportExport{
    SVG: ImportExportSVG;
}

interface ImportExportSVG{
    CurveQuality: number;
    GroupElems: boolean;
    Save(filename: string, contour: Contour2D): boolean;
    Load(filename: string, contour: Contour2D): boolean;
}
```

Добавлены новые функции для работы с файлами. 
Функция require в объекте System переименована в include
```ts
interface System {
    include(filename: string);
    askFolder(caption?: string, defaultFolder?: string): string;
    getFileName(filename: string): string;
    getFileNameWithoutExtension(filename: string): string;
    askFileNameSave(ext: string): string;
}
```

Добавлена функция рекурсивного добавления эквидистанты контура
```ts
interface Contour2D{
    AddEquidistantRecursive(contour: Contour2D, offset: number, Side: boolean, Rounding: boolean);
}
```

Добавлены загрузка сохранение и имя файла модели
```ts
interface Action3D {
    LoadModel(filename: string): boolean;
    SaveModel(filename: string);
    ModelFilename: string;
}
```

Добавлено форматирование имени материала
```ts
declare function FormatMatName(matName: string): string;
```

---




## <a name = "june2017">Базис 10. Первый релиз. Июнь 2017</a>:
Добавлена функция создания полуфабриката и тонирование изображения
```ts
interface Action3D {
    RayTraceScene();
    OnRayTraceFinished: Function;
}

declare function AddDraftBlock(name: string): Block;
```

Добавлен анализ модели
```ts
declare enum ErrorType {
    ObjIntersection,
    FastIntersection,
    FastIncorrect,
    MatNotExists,
    MatOutOfStock,
    PanelTooLarge,
    PlasticTooLarge,
    PanelNotFixed

}

declare interface InspectorError {
    ErrorType: ErrorType;
    ErrorObjectsCount: number;
    ErrorObjects: Array<Object3>;
    ErrorMessage: string;
    ObjectsNames: string;

}

declare interface InspectorOptions {
    ObjIntersectionAnalyze: boolean;
    FastIntersectionAnalyze: boolean;
    FastIncorrectAnalyze: boolean;
    PanelNotFixedAnalyze: boolean;
    PanelTooLargeAnalyze: boolean;
    PlasticTooLargeAnalyze: boolean;
    MatNotExistsAnalyze: boolean;
    MatOutOfStockAnalyze: boolean;

}

declare interface ModelInspector {
    Run(Model: List3D);
    ErrorList: Array<InspectorError>;
    Options: InspectorOptions;

}

declare function NewModelInspector(): ModelInspector;
```

Добавлено свойство элемента товара для скриптов в Салоне.
```ts
declare interface ScItemTovar {
    Article: string;
    Name: string;
    Material: string;
    GroupMaterial: string;
    TypeElement: string;
    ObjList: List3D;
}

declare interface ScItemTovarList {
    Items: Array<ScItemTovar>;
    Count: number;
    TovarName: string;
    TovarArticul: string;
    FindByName(name: string, CaseSensitive: boolean): ScItemTovar;
}

declare var TovarItems: ScItemTovarList;
```

<a name = 'schemes'>Схемы крепежа</a>: 
- Удалено описание интерфейсов FurnitureScheme и FurnitureSchemes. 
- Удалены функции OpenFurnitureScheme, OpenFurnitureSchemes, NewFurnitureScheme.
