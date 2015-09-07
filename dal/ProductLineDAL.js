var conn = require('../config/db'),
    ProductLine = require('../models/ProductLine');


var getProductLineTable = conn.then(function(db) {
    var productLineTable = db.define("productLine", ProductLine.getType());
    //同步表
    productLineTable.sync();
    return productLineTable;
});

//获取所有的产品线
function getAllProductLine() {
    return new Promise(function(resolve, reject) {
        getProductLineTable.then(function(productLineTable) {
            productLineTable.find({}, function(err, data) {
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
function createProductLine(productLine) {
    return new Promise(function(resolve, reject) {
        getProductLineTable.then(function(productLineTable) {
            productLineTable.create([productLine],function(err, data) {
                if(err) {
                    console.error(err);
                }else {
                    console.log(JSON.stringify(data));
                }
            })
        });

    });
}

//查找
//getAllProductLine().then(function(data) {
//    console.debug(data);
//});

//新增
//var productLine = new ProductLine('神马搜索');
//createProductLine(productLine);

//更多例子(连表，更新看我的写的demo https://github.com/hacke2/node-orm2-mysql-demo)


//这里提交给上层Controller调用
module.exports = {
    getAllProductLine : getAllProductLine,
    createProductLine : createProductLine
};