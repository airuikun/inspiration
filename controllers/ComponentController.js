var Component = require('../models/Component'),
    ComponentHistory = require('../models/ComponentHistory');


var ComponentController = function() {

};


//创建组件、组件项
ComponentController.prototype.createComponent = function(data, files) {
    //组件
    var component = new Component(data.name, data.typeID, 'userid', data.remarks); //用户ID后期通过session给值
    //历史版本
    var componentItem = new ComponentHistory(component.componentID, data.html, data.js, data.css, 'userid', data.remarks); //用户ID后期通过session给值

    //首先保存到数据然，然后再保存到文件中
    return saveDB({
        component : component,
        componentItem : componentItem,
        files : files
    }).then(saveFile);
};

//更新组件、组件项
ComponentController.prototype.editComponent = function(data, files) {
    //组件
    //var component = ComponentModel.getComponentByID(data.componentID) //从Model层获取数据
    var component = new Component(data.name, data.typeID, 'userid', data.remarks); //模拟
    component.setParameters(data);
    //历史版本
    var componentItem = new ComponentHistory(component.componentID, data.html, data.js, data.css, 'userid', data.remarks); //用户ID后期通过session给值

    //首先保存到数据然，然后再保存到文件中
    return saveDB({
        component : component,
        componentItem : componentItem,
        files : files
    }).then(saveFile);
};


//模拟保存到数据库
function saveDB(data) {
    return new Promise(function(resolve, reject) {
        //模拟保存数据
        console.log('component ID 为' +data.component.componentID + '保存成功');
        resolve(data);
    });
};

function saveFile(data) {
    return new Promise(function(resolve, reject) {
        for(var i = 0; i <  data.files.file.length; i++) {
            console.log(data.files.file[i].name + '保存成功');0
        }
        resolve(data);
    });
}


module.exports = ComponentController;








