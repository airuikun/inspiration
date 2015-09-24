var express = require('express'),
    path = require('path'),
    //http://yijiebuyi.com/blog/90c1381bfe0efb94cf9df932147552be.html
    //表单默认提交方式为www-form-urlencoded
    //有文件传输的为form-data类型，需要引入connect-multiparty库
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    ComponentController = require('../controllers/ComponentController'),
    CategoryController = require('../controllers/CategoryController'),
    OperationController = require('../controllers/OperationController'),
    PageController = require('../controllers/PageController');

module.exports = function(app) {
    // 静态资源目录
    app.use('/favicon.ico', express.static(path.join(path.dirname(require.main.filename), '/public/favicon.ico')));
    app.use('/public', express.static(path.join(path.dirname(require.main.filename), '/public')));

    // 首页
    app.get('/', ComponentController.renderIndexPage);
    // 编辑组件页面
    app.get('/component/edit/:componentID', ComponentController.renderEditPage);
    // 编辑组件版本页面
    app.get('/component/edit/:componentID/:componentHistoryID', ComponentController.renderEditPage);
    // 新建组件页面
    app.get('/component/create', ComponentController.renderCreationPage);

    // 组件类的路由
    app.post('/component/create', multipartMiddleware, ComponentController.create);
    app.post('/component/edit', multipartMiddleware, ComponentController.edit);
    app.get('/file/:componentFileID', ComponentController.deleteFile);

    //类别
    app.post('/category/create', CategoryController.createCategory);
    //app.get('/category/:productLineID', CategoryController.getCategoriesByProductLineID);

    //产品线
    app.post('/productLine/create', CategoryController.createProductLine);

    //操作功能类 add by zdw 15.09.16
    // var bodyParser = require('body-parser');
    // app.use(bodyParser.text());//从body获取内容时需使用此方式
    app.post('/api/sass2css', OperationController.sass2css);


    // 欢迎页
    app.get('/welcome', PageController.renderWelcomePage);
    // 欢迎页
    app.get('/error', PageController.renderErrorPage);

    // 404页
    app.use(PageController.renderNotFoundPage);
};
