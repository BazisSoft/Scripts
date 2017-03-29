class PanelInfo{
    private panel: Panel;
    private fasts: Array<Object3>;
    private objects: Array<Object3>;
    constructor(p: Panel){
        this.panel = p;
        this.fasts = p.FindConnectedFasteners();
        this.objects = this.GetConnectedObjects();
    }
    private GetConnectedObjects(): Array<Object3> {
        if (!this.fasts){
            throw new Error('fasts dont exist');
        }
        let result = new Array<Object3>();
        for (let i = 0; i < this.fasts.length; i++){
            let newObjects = this.fasts[i].FindFastenedObjects();
            for (let j = 0; j < newObjects.length; j++)
            {
                if (result.indexOf(newObjects[j]) < 0 && newObjects[j] != this.panel){
                    result.push(newObjects[j]);
                }
            }
        }
        return result;
    }
    public GetConnectedObjectsNames(): Array<string>{
        let result = new Array<string>();
        for (let i = 0; i < this.objects.length; i ++){
            result.push(this.objects[i].Name);
        }
        return result;
    }
    public GetFastenersNames(): Array<string>{
        let result = new Array<string>();
        for (let i = 0; i < this.fasts.length; i ++){
            result.push(this.fasts[i].Name);
        }
        return result;
    }

}

let panel: Panel = GetPanel('Укажите панель');
if (panel){
    let info = new PanelInfo(panel);
    alert(`-Объекты: \n${info.GetConnectedObjectsNames().join('\n')} \n\n-Крепеж:\n${info.GetFastenersNames().join('\n')}`);
}