var db = require('./ORM'),
    Category = require('../models/Category');

var ComponentCategoryTable = db.define('category', Category.getType());
//同步表
ComponentCategoryTable.sync();


var getAllCategoriesSQL = 'SELECT component.componentID , component.name as componentName, cate.categoryID, cate.name as categoryName FROM (select categoryID, name from category where productLineID = ?) cate inner join component ON component.categoryID = cate.categoryID';
//查询出该产品线下对应的类型
function queryCategoriesByProductLineID(productLineID) {
    return new Promise(function(resolve, reject) {
        db.driver.execQuery(getAllCategoriesSQL,  [productLineID], function(err, data) {
            if(err) {
                console.log(err);
                reject(err);
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


module.exports = {
    queryCategoriesByProductLineID : queryCategoriesByProductLineID
};