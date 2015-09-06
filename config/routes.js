var ComponentController = require('../controllers/ComponentController'),
    CategoryController = require('../controllers/CategoryController'),
    //http://yijiebuyi.com/blog/90c1381bfe0efb94cf9df932147552be.html
    //表单默认提交方式为www-form-urlencoded
    //有文件传输的为form-data类型，需要引入connect-multiparty库
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();

module.exports = function(app) {
    // 首页
    app.get('/', multipartMiddleware, ComponentController.renderIndexPage);
    // 编辑组件页面
    app.get('/component/edit', multipartMiddleware, ComponentController.renderEditPage);
    // 新建组件页面
    app.get('/component/create', multipartMiddleware, ComponentController.renderCreationPage);

    // 组件类的路由
    app.post('/component/create', multipartMiddleware, ComponentController.create);
    app.post('/component/edit', multipartMiddleware, ComponentController.edit);
    //app.get('/component/category/:categoryID', ComponentController.getComponentsByCategoryID);
    //app.get('/file/:fileID', ComponentController.downFile);

    //类别
    app.post('/category/create', CategoryController.createCategory);
    //app.get('/category/:productLineID', CategoryController.getCategoriesByProductLineID);

    //产品线
    app.post('/productLine/create', CategoryController.createProductLine);
};
