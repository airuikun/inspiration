var logger = require('../helpers/LoggerHelper').logger,
    db = require('./ORM'),
    Component = require('../models/Component');

var ComponentTable = db.define('component', Component.getType(),{
    cache   : false
});
//同步表
//ComponentTable.sync();

//获取所有的产品线
function getAllComponent() {
    return new Promise(function(resolve, reject) {
        ComponentTable.find({
            status : 1
        }, function(err, data) {
            if(err) {
                logger.error(err);
                reject(err);
            }else {
                resolve(JSON.stringify(data));
            }
        });
    });
}

//创建组件
function createComponent(component) {
    return new Promise(function(resolve, reject) {
        ComponentTable.create([component],function(err, data) {
            if(err) {
                logger.error(err);
                reject(err);
            }else {
                logger.debug('上传组件成功', JSON.stringify(data));
                resolve(JSON.stringify(data));
            }
        });

    });
}

//更新组件
function updateComponent(componentID, newComponent) {
    return new Promise(function(resolve, reject) {
        ComponentTable.find({
            componentID : componentID
        }, function(err, component) {
            if(err) reject(err);
            for(var key in newComponent) {
                component[0][key] = newComponent[key];
            }
            component[0].save(function (err) {
                if(err) reject(err);
                resolve();
            })
        });

    });
}

//获取所有的产品线
function getAllComponent() {
    return new Promise(function(resolve, reject) {
        ComponentTable.find({}, function(err, data) {
            if(err) {
                logger.error(err);
                reject(err);
            }else {
                resolve(JSON.stringify(data));
            }
        });
    });
}

function getProductCategory2Component(productId,categoryId){
    return new Promise(function(resolve, reject) {
        ComponentTable.find({
            productLineID : productId,
            categoryID : categoryId,
            status : 1
        }, function(err, data) {
            if(err) {
                logger.error(err);
                reject(err);
            }else {
                resolve(data);
            }
        });
    });
}

function delComponent(comid){
    return new Promise(function(resolve, reject) {
        ComponentTable.find({
            componentID : comid,
        }, function(err, data) {
            if(data[0].id) {
                data[0].status = 2;
                data[0].save(function (err) {
                   reject(err);
                });
                resolve(200);
            }else{
                resolve(400);
            }
        });
    });
}

//这里提交给上层Controller调用
module.exports = {
    getAllComponent : getAllComponent,
    createComponent : createComponent,
    updateComponent : updateComponent,
    getProductCategory2Component : getProductCategory2Component,
    delComponent : delComponent,
};