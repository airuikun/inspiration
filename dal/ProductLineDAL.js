var logger = require('../helpers/LoggerHelper').logger,
    db = require('./ORM'),
    uuid = require('node-uuid'),
    ProductLine = require('../models/ProductLine');


var ProductLineTable = db.define('productLine', ProductLine.getType(), {
    cache   : false
});
//同步表
//ProductLineTable.sync();

//获取所有的产品线
function getAllProductLine() {
    return new Promise(function(resolve, reject) {
        ProductLineTable.find({
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

//创建产品线
function createProductLine(productLine) {
    return new Promise(function(resolve, reject) {
        ProductLineTable.create([productLine],function(err, data) {
            if(err) {
                logger.error(err);
                reject(err);
            }else {
                logger.log(JSON.stringify(data));
            }
        });
    });
}

//添加产品线
var addProduct = function(productName) {
    return new Promise(function(resolve, reject) {
        var productId = uuid.v4();
        var sql = "insert into productLine(`productLineID`,`name`,`createTime`) values('"+productId+"','"+productName+"',now())";
        db._exec(sql).then(function(data){
            resolve(data);
        }, function(err) {
            logger.error(err);
            reject(err);
        });
    });
};

//删除产品线
var delProduct = function(productID) {
    var productSql = "update productLine set status=2 where productLineID='"+productID+"' limit 1",
        categorySql = "update category set status=2 where productLineID='"+productID+"'",
        componentSql = "update component set status=2 where productLineID='"+productID+"'";

    return Promise.all([db._exec(productSql), db._exec(categorySql), db._exec(componentSql)]);
};

//修改产品线
var ediProduct = function(productID,productName) {
    return new Promise(function(resolve, reject) {
        var productId = uuid.v4();
        var sql = "update productLine set name='"+productName+"' where productLineID='"+productID+"' limit 1";
        db._exec(sql).then(function(data){
            resolve(data);
        }, function(err) {
            reject(err);
        });
    });
};

//获取所有开放的产品线  暂时没用
function getAllProduct() {
    return new Promise(function(resolve, reject) {
        var sql = "select * from productLine where status!=2 order by createTime desc";
        db._fetchAll(sql).then(function(data){
            resolve(data);
        }, function(err) {
            reject(err);
        });
    });
};

//添加分类
var addCategory = function(productId, categoryName){
    return new Promise(function(resolve, reject) {
        var categoryId = uuid.v4();
        var sql = "insert into category(`categoryID`,`productLineID`,`name`,`createTime`) values('"+categoryId+"','"+productId+"','"+categoryName+"',now())";
        db._exec(sql).then(function(data){
            resolve(data);
        }, function(err) {
            reject(err);
        });
    });
};

//查询指定产品线下全部分类
var getProduct2Category = function(productId){
    return new Promise(function(resolve, reject) {
        var sql = "select * from category where productLineID='"+productId+"' and status!=2 order by createTime desc";
        db._exec(sql).then(function(data){
            resolve(data);
        }, function(err) {
            reject(err);
        })
    })
};

//查询指定产品线下全部分类
var editCategory = function(categoryId, categoryName, productId) {

    var editCategorySql = "update category set productLineID='"+productId+"',name='"+categoryName+"' where categoryID='"+categoryId+"' limit 1",
        editComponentSql = "update component set productLineID='"+productId+"' where categoryID='"+categoryId+"'";
    return Promise.all([db._exec(editCategorySql),db._exec(editComponentSql)]);
};

//删除分类
var delCategory = function(categoryId){

    var categorySql = "update category set status=2 where categoryID='"+categoryId+"' limit 1",
        componentSql = "update component set status=2 where categoryID='"+categoryId+"'";

    return Promise.all([db._exec(categorySql), db._exec(componentSql)]);
};


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
    createProductLine : createProductLine,
    addProduct : addProduct,
    delProduct : delProduct,
    ediProduct : ediProduct,
    getAllProduct : getAllProduct,
    addCategory : addCategory,
    getProduct2Category : getProduct2Category,
    editCategory : editCategory,
    delCategory : delCategory

};