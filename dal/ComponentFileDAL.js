var conn = require('../config/db'),
    ComponentFile = require('../models/ComponentFile');


var getComponentFileTable = conn.then(function(db) {
    var ComponentFileTable = db.define("componentFile", ComponentFile.getType());
    console.log(111)
    //同步表
    ComponentFileTable.sync();
    return ComponentFileTable;
});


//创建文件，传的是文件对象数组
function saveFiles(files) {
    return new Promise(function(resolve, reject) {
        getComponentFileTable.then(function(componentFileTable) {
            componentFileTable.create(files,function(err, data) {
                if(err) {
                    console.error(err);
                    reject(err);
                }else {
                    console.log(JSON.stringify(data));
                    resolve(data);
                }
            })
        })
    });
}

//找到某一个ID下的所有文件列表
function getFilesByComponentID(componentID) {
    return new Promise(function(resolve, reject) {
        getComponentFileTable.then(function(componentFileTable) {
            componentFileTable.find({
                componentID : componentID
            }, function(err, data) {
                if(err) {
                    console.error(err);
                    reject(err)
                }else {
                    console.log(JSON.stringify(data));
                    resolve(data);
                }
            });
        });
    });
}

//删除某一个ID下的所有文件列表
function deleteFilesByComponentID(componentID) {
    return new Promise(function(resolve, reject) {
        getComponentFileTable.then(function(componentFileTable) {
            componentFileTable.find({
                componentID : componentID
            }).remove(function (err) {
                if(err) {
                    console.error('删除' + componentID + '文件失败', err);
                    reject(err);
                }else {
                    resolve(componentID);
                }
            });
        });
    });
}

//删除某一个id下的文件
function deleteFileByID(componentFileID) {
    return new Promise(function(resolve, reject) {
        getComponentFileTable.then(function(componentFileTable) {
            componentFileTable.find({
                componentFileID: componentFileID
            }).remove(function (err) {
                if (err) {
                    console.error('删除' + componentFileID + '文件失败', err);
                    reject(err);
                } else {
                    resolve(componentFileID);
                }
            });
        });
    });
}



//这里提交给上层Controller调用
module.exports = {
    saveFiles : saveFiles,
    getFilesByComponentID : getFilesByComponentID,
    deleteFilesByComponentID : deleteFilesByComponentID,
    deleteFileByID : deleteFileByID
};