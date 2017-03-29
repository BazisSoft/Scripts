//класс, содержащий информацию о панели
class PanelInfo{
    //панель
    private panel: Panel;
    //крепеж в панели
    private fasts: Array<Object3>;
    //объекты, соединенные крепежом с панелью
    private objects: Array<Object3>;
    //коструктор класса
    constructor(p: Panel){
        this.panel = p;
        this.fasts = p.FindConnectedFasteners();
        this.objects = this.GetConnectedObjects();
    }
    //получить соединенные с панелью объекты
    private GetConnectedObjects(): Array<Object3> {
        //этого не должно произойти, но если массив крепежа не существует,
        //то вызывается исключение 
        if (!this.fasts){
            throw new Error('fasts dont exist');
        }
        let result = new Array<Object3>();
        for (let i = 0; i < this.fasts.length; i++){
            //newObjects - объекты, соединенные данным крепежом
            let newObjects = this.fasts[i].FindFastenedObjects();
            for (let j = 0; j < newObjects.length; j++)
            {      //проверка на дублирование         и    на исходную панель
                if (result.indexOf(newObjects[j]) < 0 && newObjects[j] != this.panel){
                    result.push(newObjects[j]);
                }
            }
        }
        return result;
    }
    //отдельная функция, результат которой - массив с именами всех объектов в this.objects
    public GetConnectedObjectsNames(): Array<string>{
        let result = new Array<string>();
        for (let i = 0; i < this.objects.length; i ++){
            result.push(this.objects[i].Name);
        }
        return result;
    }
    //отдельная функция, результат которой - массив с именами всей фурнитуры в this.fasts
    public GetFastenersNames(): Array<string>{
        //форматирование имени фурнитуры в стиле "имя(артикул)"
        function FormatFastName(name: string): string{
            let artPos = name.indexOf('\r');
            if (artPos >= 0){
                let result = `${name.slice(0, artPos)}(${name.slice(artPos + 1)})`
                return result;
            }
            return name;
        }
        let result = new Array<string>();
        for (let i = 0; i < this.fasts.length; i ++){
            result.push(FormatFastName(this.fasts[i].Name));
        }
        return result;
    }

}

let panel: Panel = GetPanel('Укажите панель');
if (panel){
    let info = new PanelInfo(panel);
    alert(`-Объекты: \n${info.GetConnectedObjectsNames().join('\n')} \n\n-Крепеж:\n${info.GetFastenersNames().join('\n')}`);
}