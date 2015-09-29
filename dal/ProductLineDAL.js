var db = require('./ORM'),
    ProductLine = require('../models/ProductLine');


var ProductLineTable = db.define('productLine', ProductLine.getType(), {
    cache   : false
});
//同步表
ProductLineTable.sync();

//获取所有的产品线
function getAllProductLine() {
    return new Promise(function(resolve, reject) {
        ProductLineTable.find({
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

//创建产品线
function createProductLine(productLine) {
    return new Promise(function(resolve, reject) {
        ProductLineTable.create([productLine],function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                console.log(JSON.stringify(data));
            }
        });
    });

}

//这里提交给上层Controller调用
module.exports = {
    getAllProductLine : getAllProductLine,
    createProductLine : createProductLine
};