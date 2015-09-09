var db = require('../config/db'),
    ComponentHistory = require('../models/ComponentHistory');


var ComponentHistoryTable = db.define('componentHistory', ComponentHistory.getType());
//同步表
ComponentHistoryTable.sync();

//获取所有的产品线
function getAllComponentHistory() {
    return new Promise(function(resolve, reject) {
        ComponentHistoryTable.find({}, function(err, data) {
            if(err) {
                console.error(err);
                throw err;
            }else {
                resolve(JSON.stringify(data));
            }
        });
    });
}

//创建产品线
function createComponentHistory(ComponentHistory) {
    return new Promise(function(resolve, reject) {
        ComponentHistoryTable.create([ComponentHistory],function(err, data) {
            if(err) {
                console.error(err);
                throw err;
            }else {
                console.log('生成组件版本成功', JSON.stringify(data));
                resolve();
            }
        });

    });
}

var getComponentHistoryByComponentIDSQL = 'SELECT componentHistory.componentHistoryID, componentHistory.html, componentHistory.js, componentHistory.css, component.componentID , component.name, component.remarks FROM (SELECT componentID, name, remarks FROM component WHERE component.componentID = ?) component inner join componentHistory ON componentHistory.componentID = component.componentID ORDER BY componentHistory.createTime DESC LIMIT 1';
//找到某一个组件下最新版本的组件历史
function getComponentHistoryByComponentID(componentID) {
    return new Promise(function(resolve, reject) {
        db.driver.execQuery(getComponentHistoryByComponentIDSQL,  [componentID], function(err, data) {
            if(err) {
                console.error(err);
                throw err;
            }else {
                resolve(data);
            }
        });
    });
}

//这里提交给上层Controller调用
module.exports = {
    getAllComponentHistory : getAllComponentHistory,
    createComponentHistory : createComponentHistory,
    getComponentHistoryByComponentID : getComponentHistoryByComponentID
};