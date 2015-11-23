var logger = require('../helpers/LoggerHelper').logger,
    db = require('./ORM'),
    ComponentFile = require('../models/ComponentFile');


var ComponentFileTable = db.define('componentFile', ComponentFile.getType(),{
    cache   : false
});
//同步表
//ComponentFileTable.sync();


//创建文件，传的是文件对象数组
function saveFiles(files) {
    return new Promise(function(resolve, reject) {
        ComponentFileTable.create(files,function(err, data) {
            if(err) {
                logger.error(err);
                reject(err);
            }else {
                logger.log(JSON.stringify(data));
                resolve(data);
            }
        })
    });
}

//找到某一个ID下的所有文件列表
function getFilesByComponentID(componentID) {
    return new Promise(function(resolve, reject) {
        ComponentFileTable.find({
            componentID : componentID
        }, function(err, data) {
            if(err) {
                logger.error(err);
                reject(err);
            }else {
                logger.log(JSON.stringify(data));
                resolve(data);
            }
        });
    });
}

// 根据componentId及文件名，更新path
function updFilePathByCidAndFname(componentID, fileName, path) {

    return new Promise(function(resolve, reject) {

        ComponentFileTable.find({
            fileName : fileName,
            componentID : componentID
        }, function (err, data) {
            if(data.id) {
                data[0].path = path;
                data[0].save(function (err) {
                   reject(err);
                });
                resolve(200);
            }else{
                resolve(400);
            }
            
        });
    })
}

function hasComponentFile(path) {
    return new Promise(function(resolve, reject) {
        ComponentFileTable.find({
            path : path
        }, 1, function (err, data) {
            if(data && data[0] && data[0].id) {
                resolve(true);
            }else{
                resolve(false);
            }
            
        });
    })
}

//删除某一个ID下的所有文件列表
function deleteFilesByComponentID(componentID) {
    return new Promise(function(resolve, reject) {
        ComponentFileTable.find({
            componentID : componentID
        }).remove(function (err) {
            if(err) {
                logger.error('删除' + componentID + '文件失败', err);
                reject(err);
            }else {
                resolve(componentID);
            }
        });
    });
}

//删除某一个id下的文件
function deleteFileByID(componentFileID) {
    return new Promise(function(resolve, reject) {
        ComponentFileTable.find({
            componentFileID: componentFileID
        }).remove(function (err) {
            if (err) {
                logger.error('删除' + componentFileID + '文件失败', err);
                reject(err);
            } else {
                resolve(componentFileID);
            }
        });
    });
}



//这里提交给上层Controller调用
module.exports = {
    saveFiles : saveFiles,
    getFilesByComponentID : getFilesByComponentID,
    deleteFilesByComponentID : deleteFilesByComponentID,
    deleteFileByID : deleteFileByID,
    updFilePathByCidAndFname : updFilePathByCidAndFname,
    hasComponentFile : hasComponentFile
};