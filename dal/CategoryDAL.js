var conn = require('../config/db'),
    ComponentDAL = require('./ComponentDAL'),
    Category = require('../models/Category');

var getCategoryTable = conn.then(function(db) {
    var ComponentCategoryTable = db.define("category", Category.getType());
    //同步表
    ComponentCategoryTable.sync();
    return ComponentCategoryTable;
});


var getAllCategoriesSQL = 'SELECT component.componentID , component.name as componentName, cate.categoryID, cate.name as categoryName FROM (select categoryID, name from category where productLineID = ?) cate inner join component ON component.categoryID = cate.categoryID';
//查询出该产品线下对应的类型
function queryCategoriesByProductLineID(db, productLineID) {
    return new Promise(function(resolve, reject) {
        db.driver.execQuery(getAllCategoriesSQL,  [productLineID], function(err, data) {
            if(err) {
                console.log(err);
                throw err;
            }else {
                resolve(formatCategories(data));
            }
        });
    });
}


function formatCategories(arr) {
    var resultObj = {};

    for(var i = 0; i < arr.length; i++) {
        if(arr[i]['categoryID'] in resultObj) {
            resultObj[arr[i]['categoryID']]['example'].push({
                'componentID' : arr[i]['componentID'],
                'componentName' : arr[i]['categoryName']
            });

        }else {
            resultObj[arr[i]['categoryID']] = {
                'id' : arr[i]['categoryID'],
                'category' : arr[i]['categoryName'],
                'example' : [ {
                    'componentID' : arr[i]['componentID'],
                    'componentName' : arr[i]['categoryName']
                }]
            };
        }
    }
    var result = [];
    for(var key in resultObj) {
        result.push(resultObj[key]);
    }
    return result;
}



//获取产品线下的所有分类
function getAllCategories(productLineID) {
    return conn.then(function(db) {
        return queryCategoriesByProductLineID(db, productLineID);
    });

    //resolve([{
    //    id: "aniList1",
    //    category: "分类1",
    //    example: ["样例1", "样例2", "样例3", "样例4"]
    //}, {
    //    id: "aniList2",
    //    category: "分类2",
    //    example: ["样例1", "样例2", "样例3", "样例4"]
    //}, {
    //    id: "aniList3",
    //    category: "分类3",
    //    example: ["样例1", "样例2", "样例3", "样例4"]
    //}, {
    //    id: "aniList4",
    //    category: "分类4",
    //    example: ["样例1", "样例2", "样例3", "样例4"]
    //}]);
}

module.exports = {
    getAllCategories : getAllCategories
};