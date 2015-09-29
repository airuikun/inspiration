var db = require('./ORM'),
    ComponentHistory = require('../models/ComponentHistory');


var ComponentHistoryTable = db.define('componentHistory', ComponentHistory.getType(),{
    cache   : false
});
//同步表
ComponentHistoryTable.sync();


var getAllComponentHistoryByComponentIDSQL = 'SELECT componentHistoryID, componentID, createTime, updateContent FROM componentHistory WHERE componentHistory.componentID = ?';
//获取某一个组件的所有的组件历史
function getAllComponentHistoryByComponentID(componentID) {
    return new Promise(function(resolve, reject) {
        db.driver.execQuery(getAllComponentHistoryByComponentIDSQL,  [componentID], function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                resolve(data);
            }
        });
    });
}

//通过ID获取组件历史
function getComponentHistoryByID(componentHistoryID) {
    return new Promise(function(resolve, reject) {
        ComponentHistoryTable.find({
            componentHistoryID : componentHistoryID,
            status : 1
        }, function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                resolve(data);
            }
        });
    });
}

//创建组件历史
function createComponentHistory(ComponentHistory) {
    return new Promise(function(resolve, reject) {
        ComponentHistoryTable.create([ComponentHistory],function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                console.log('生成组件版本成功', JSON.stringify(data));
                resolve(ComponentHistory.componentHistoryID);
            }
        });

    });
}

var getComponentHistoryByComponentIDSQL = 'SELECT componentHistory.componentHistoryID, componentHistory.html, componentHistory.js, componentHistory.css, component.componentID, component.categoryID, component.name, component.remarks FROM (SELECT componentID, categoryID, name, remarks, status FROM component WHERE component.componentID = ? AND component.status=1) component inner join componentHistory ON componentHistory.componentID = component.componentID ORDER BY componentHistory.createTime DESC LIMIT 1';
//找到某一个组件下最新版本的组件历史
function getComponentHistoryByComponentID(componentID) {
    return new Promise(function(resolve, reject) {
        db.driver.execQuery(getComponentHistoryByComponentIDSQL,  [componentID], function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                resolve(data);
            }
        });
    });
}

var getComponentHistoryByComponentHistoryIDSQL = 'SELECT componentHistory.componentHistoryID, componentHistory.html, componentHistory.js, componentHistory.css, component.componentID, component.categoryID, component.name, component.remarks FROM (SELECT componentHistoryID, componentID, html, js, css FROM componentHistory WHERE componentHistory.componentHistoryID = ?) componentHistory inner join component ON componentHistory.componentID = component.componentID AND  component.status=1';
//找到某一个组件历史
function getComponentHistoryByComponentHistoryID(componentHistoryID) {
    return new Promise(function(resolve, reject) {
        db.driver.execQuery(getComponentHistoryByComponentHistoryIDSQL,  [componentHistoryID], function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                resolve(data);
            }
        });
    });
}



//这里提交给上层Controller调用
module.exports = {
    getAllComponentHistoryByComponentID : getAllComponentHistoryByComponentID,
    createComponentHistory : createComponentHistory,
    getComponentHistoryByComponentID : getComponentHistoryByComponentID,
    getComponentHistoryByID : getComponentHistoryByID,
    getComponentHistoryByComponentHistoryID : getComponentHistoryByComponentHistoryID
};