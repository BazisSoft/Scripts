// Данный скрипт предназначен для быстрой замены материалов во всех моделях 
// всех файлов в папке, в которой он размещен.

fs = require('fs');
path = require('path');

let oldMat = NewMaterialInput('Старый материал');
let newMat = NewMaterialInput('Новый материал');
let ApplyBtn = NewButtonInput('Заменить материал');
ApplyBtn.Visible = false;
ApplyBtn.OnChange = function () {
    let newFolder = system.askFolder();
    if (newFolder) {
        ChangeMaterial(oldMat.Name, newMat.Name, newMat.Thickness, newFolder);
    }
}

function ShowFinishBtn() {
    ApplyBtn.Visible = (oldMatChanged && newMatChanged);
}
let oldMatChanged = false;
let newMatChanged = false;

function ConfirmDifferentThickness() {
    return confirm(`Материалы имеют разную толщину. Вы уверены, что хотите заменить ${FormatMatName(oldMat.Name)} 
        с толщиной ${oldMat.Thickness} на ${FormatMatName(newMat.Name)} с толщиной ${newMat.Thickness}?`);
}

//обработчики событий выбора материала для замены 
oldMat.OnChange = function () {
    oldMatChanged = true;
    if (newMatChanged && oldMat.Thickness != newMat.Thickness) {
        oldMatChanged = ConfirmDifferentThickness();
    }
    ShowFinishBtn();
}
newMat.OnChange = function () {
    newMatChanged = true;
    if (oldMatChanged && oldMat.Thickness != newMat.Thickness) {
        newMatChanged = ConfirmDifferentThickness();
    }
    ShowFinishBtn();
}

function ChangeMaterial(oldName, newName, newThickness, folder) {
    // список имен всех фалов в указанной папке
    let names = fs.readdirSync(folder);
    let files = [];
    let objCount = 0;
    let count = 0;

    function ProcessNextFile() {
        let fileName = names[count];
        Action.Hint = `обработка файла ${count + 1} из ${names.length} - ${fileName}`;
        // ext - расширение файла
        let ext = path.extname(fileName);
        // проверка расширения файла
        if (ext.toLowerCase() == '.b3d') {
            Action.LoadModel(folder + fileName);
            ViewAll();
            let modelChanged = false;
            //перебор всех объектов в модели                            
            Model.forEach(function (obj) {
                if (obj && obj.MaterialName == oldName) {
                    //запись изменения объекта для возможности отменый изменений
                    Undo.Changing(obj);
                    modelChanged = true;
                    obj.MaterialName = newName;
                    objCount++;
                    if (obj.Thickness)
                        obj.Thickness = newThickness;
                }
            })
            if (modelChanged) {
                Action.Commit();
                Model.Build();
                // Action.SaveModel(fileName);
                files.push(folder + fileName);
            }
        }
        count++;
        if (count < names.length) {
            Action.AsyncExec(ProcessNextFile);
        }
        else {
            alert(`Замена материалов с "${FormatMatName(oldMat.Name)}" на "${FormatMatName(newMat.Name)}" 
                произведена на ${objCount} объектах в ${files.length} файлах:\n${files.join('\n')}`);
            Action.Finish();
        }
    };
    ProcessNextFile();
}

Action.Continue();