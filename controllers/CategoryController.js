var ProductLine = require('../models/ProductLine'),
    Category = require('../models/Category');


var CategoryController = {
    createProductLine : function(req, res) {
        var data = req.body;
        createProductLine(data).then(function(data) {
            //渲染页面
            //res.render('index', data.componentItem.componentItemID);
            res.send(JSON.stringify(data));
        }).catch(function(e) {
            console.error(e);
            res.redirect('error');
        });
    },
    //创建类别
    createCategory : function(req, res) {
        var data = req.body;
        createCategory(data).then(function(data) {
            //渲染页面
            //res.render('index', data.componentItem.componentItemID);
            res.send(JSON.stringify(data));
        }).catch(function(e) {
            console.error(e);
            res.redirect('error');
        });
    },

    //获取某个产品线下所有的类别
    getCategoriesByProductLineID : function(req, res) {
        var productLineID = req.params.productLineID;
        console.debug('productLineID', productLineID);

        //查询数据库
        var result = [];

        for(var i = 0; i < 5; i++) {
            result.push(new Category(productLineID, '类型' + i));
        }
        res.send(JSON.stringify(result));
    }
};


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


module.exports = CategoryController;








