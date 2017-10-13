// модуль bazis_module должен находиться в папке node_modules
import * as baz from 'bazis_module';
let obj = Model.Selected;
if (obj){
    let openedFile = Action.ModelFilename;
    let newFileName = system.askFileNameSave('b3d');
    if (newFileName){
        baz.saving.SaveObject(obj, newFileName);
        if (openedFile)
            Action.LoadModel(openedFile);
        else if (!baz.common.isOldApi())
            Action.NewModel();
    }
}