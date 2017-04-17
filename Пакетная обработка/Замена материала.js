// Данный скрипт предназначен для быстрой замены материалов во всех моделях 
// всех файлов в папке, в которой он размещен.
import * as fs from 'fs';
import * as path from 'path';

let oldMat = NewMaterialInput('Старый материал');
let newMat = NewMaterialInput('Новый материал');
let ApplyBtn = NewButtonInput('Заменить материал');
ApplyBtn.Visible = false;
ApplyBtn.OnChange = function () {
    ChangeMaterial(oldMat.Name, newMat.Name, newMat.Thickness);
    Action.Finish();
}

function ShowFinishBtn() {
    ApplyBtn.Visible = (oldMatChanged && newMatChanged);
}
let oldMatChanged = false;
let newMatChanged = false;

//обработчики событий выбора материала для замены 
oldMat.OnChange = function () {
    oldMatChanged = true;
    if (newMatChanged && oldMat.Thickness != newMat.Thickness) {
        oldMatChanged = confirm(`Материалы имеют разную толщину. Вы уверены, что хотите заменить ` +
            `${oldMat.Name} с толщиной ${oldMat.Thickness} на ${newMat.Name} с толщиной ${newMat.Thickness}?`)
    }
    ShowFinishBtn();
}
newMat.OnChange = function () {
    newMatChanged = true;
    if (oldMatChanged && oldMat.Thickness != newMat.Thickness) {
        newMatChanged = confirm(`Материалы имеют разную толщину. Вы уверены, что хотите заменить ` +
            `${oldMat.Name} с толщиной ${oldMat.Thickness} на ${newMat.Name} с толщиной ${newMat.Thickness}?`)
    }
    ShowFinishBtn();
}

function ChangeMaterial(oldName, newName, newThickness) {
    // список имен всех фалов в папке, где находится скрипт
    let names = fs.readdirSync('./');
    // перебор всех имен файлов в папке
    for (let fileName of names) {
        // ext - расширение файла
        let ext = path.extname(fileName);
        // проверка расширения файла
        if (ext.toLowerCase() == '.b3d') {
            Action.LoadModel(fileName);
            //перебор всех объектов в модели                            
            Model.forEach(function (obj) {
                if (obj && obj.MaterialName == oldName) {
                    //запись изменения объекта для возможности отменый изменений
                    Undo.Changing(obj);
                    obj.MaterialName = newName;
                    if (obj.Thickness)
                        obj.Thickness = newThickness;
                }
            })
            Action.Commit();
            Action.SaveModel(fileName);
        }
    }
}
Action.Continue();