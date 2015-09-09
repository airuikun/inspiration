var db = require('../config/db'),
    Component = require('../models/Component');

var ComponentTable = db.define('component', Component.getType());
//同步表
ComponentTable.sync();

//获取所有的产品线
function getAllComponent() {
    return new Promise(function(resolve, reject) {
        ComponentTable.find({}, function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                resolve(JSON.stringify(data));
            }
        });
    });
}

//创建产品线
function createComponent(Component) {
    return new Promise(function(resolve, reject) {
        ComponentTable.create([Component],function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                console.debug('上传组件成功', JSON.stringify(data));
                resolve();
            }
        });

    });
}


//这里提交给上层Controller调用
module.exports = {
    getAllComponent : getAllComponent,
    createComponent : createComponent
};