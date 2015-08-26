var ProductLine = require('../models/ProductLine'),
    ComponentCategory = require('../models/Category');


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

    createCategory : function(req, res) {
        var data = req.body;
        createComponentCategory(data).then(function(data) {
            //渲染页面
            //res.render('index', data.componentItem.componentItemID);
            res.send(JSON.stringify(data));
        }).catch(function(e) {
            console.error(e);
            res.redirect('error');
        });
    }
};


//创建组件、组件项
function createProductLine(data) {
    //组件
    var productLine = new ProductLine(data.name);
    return saveDB(productLine);
}

//更新组件、组件项
function createComponentCategory(data) {
    //组件
    var componentCategory = new ComponentCategory(data.productLineID, data.name);
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








