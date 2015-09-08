var conn = require('../config/db'),
    ComponentHistory = require('../models/ComponentHistory');


var getComponentHistoryTable = conn.then(function(db) {
    var ComponentHistoryTable = db.define("componentHistory", ComponentHistory.getType());
    //同步表
    ComponentHistoryTable.sync();
    return ComponentHistoryTable;
});

//获取所有的产品线
function getAllComponentHistory() {
    return new Promise(function(resolve, reject) {
        getComponentHistoryTable.then(function(componentHistoryTable) {
            componentHistoryTable.find({}, function(err, data) {
                if(err) {
                    console.error(err);
                    reject(err);
                }else {
                    resolve(JSON.stringify(data));
                }
            });
        });
    });
}

//创建产品线
function createComponentHistory(ComponentHistory) {
    return new Promise(function(resolve, reject) {
        getComponentHistoryTable.then(function(componentHistoryTable) {
            componentHistoryTable.create([ComponentHistory],function(err, data) {
                if(err) {
                    console.error(err);
                    reject(err);
                }else {
                    console.log('上传组件版本成功', JSON.stringify(data));
                    resolve();
                }
            })
        });

    });
}

//这里提交给上层Controller调用
module.exports = {
    getAllComponentHistory : getAllComponentHistory,
    createComponentHistory : createComponentHistory
};