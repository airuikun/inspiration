var db = require('./ORM'),
    Category = require('../models/Category');

var CategoryTable = db.define('category', Category.getType());
//同步表
CategoryTable.sync();


//获取该产品线所有类型
function getAllProductLine(productLineID) {
    return new Promise(function(resolve, reject) {
        CategoryTable.find({
            productLineID : productLineID
        }, function(err, data) {
            if(err) {
                console.error(err);
                reject(err);
            }else {
                resolve(JSON.stringify(data));
            }
        });
    });
}

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
                'componentName' : arr[i]['componentName']
            });

        }else {
            resultObj[arr[i]['categoryID']] = {
                'id' : arr[i]['categoryID'],
                'category' : arr[i]['categoryName'],
                'example' : [ {
                    'componentID' : arr[i]['componentID'],
                    'componentName' : arr[i]['componentName']
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
    queryCategoriesByProductLineID : queryCategoriesByProductLineID,
    getAllProductLine : getAllProductLine
};