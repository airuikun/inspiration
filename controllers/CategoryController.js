var ProductLine = require('../models/ProductLine'),
    Category = require('../models/Category');

//创建组件、组件项
function createProductLine(data) {
    //组件
    var productLine = new ProductLine(data.name);
    return saveDB(productLine);
}

//更新组件、组件项
function createCategory(data) {
    //组件
    var componentCategory = new Category(data.productLineID, data.name);
    return saveDB(componentCategory);
}

//模拟保存到数据库
function saveDB(data) {
    return new Promise(function(resolve, reject) {
        //模拟保存数据
        console.debug(JSON.stringify(data) + ' 数据存数成功');
        resolve(data);
    });
}

var CategoryController = {
    createProductLine: function(req, res) {
        var data = req.body;

        createProductLine(data).then(function(data) {
            //渲染页面
            //res.render('index', data.componentItem.componentItemID);
            res.send(JSON.stringify(data));
        }).catch(function(e) {
            res.redirect('error');
        });
    },

    //创建类别
    createCategory: function(req, res) {
        var data = req.body;

        createCategory(data).then(function(data) {
            //渲染页面
            //res.render('index', data.componentItem.componentItemID);
            res.send(JSON.stringify(data));
        }).catch(function(e) {
            res.redirect('error');
        });
    }
};

module.exports = CategoryController;








