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

//创建组件
function createComponent(component) {
    return new Promise(function(resolve, reject) {
        ComponentTable.create([component],function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                console.debug('上传组件成功', JSON.stringify(data));
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
            if(err) throw e;
            for(var key in newComponent) {
                component[0][key] = newComponent[key];
            }
            component[0].save(function (err) {
                if(err) throw err;
                resolve();
            })
        });

    });
}


//这里提交给上层Controller调用
module.exports = {
    getAllComponent : getAllComponent,
    createComponent : createComponent,
    updateComponent : updateComponent
};