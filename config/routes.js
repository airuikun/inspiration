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
    PageController = require('../controllers/PageController'),
    CmsController = require('../controllers/CmsController');

module.exports = function(app) {
    // 静态资源目录
    app.use('/favicon.ico', express.static(path.join(path.dirname(require.main.filename), '/public/favicon.ico')));

    app.use('/public/upload', function(req, res, next) {
        res.setHeader('Content-Type', 'application/octet-stream');
        next();
    });

    var oneDay = 86400000;

    app.use('/public', express.static(path.join(path.dirname(require.main.filename), '/public'), { maxAge: oneDay }));

    // 首页
    app.get('/', PageController.redirectWelcome, ComponentController.renderIndexPage);
    // 编辑组件页面
    app.get('/component/edit/:componentID', PageController.redirectWelcome, ComponentController.renderEditPage);
    // 编辑组件版本页面
    app.get('/component/edit/:componentID/:componentHistoryID', PageController.redirectWelcome, ComponentController.renderEditPage);
    // 新建组件页面
    app.get('/component/create', PageController.redirectWelcome, ComponentController.renderCreationPage);

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
    // 系统内部错误
    app.get('/error', PageController.renderErrorPage);
    // 404
    app.get('/404', PageController.renderNotFoundPage);


    // 404页
    //app.use(PageController.renderNotFoundPage);

    //cms管理
    app.get('/cms', CmsController.init);//初始化全首页
    app.get('/cms/top', CmsController.top);//首页顶部
    app.get('/cms/bottom', CmsController.bottom);//首页底部
    app.get('/cms/left', CmsController.left);//首页左侧
    app.get('/cms/right', CmsController.right);//首页右侧
    app.get('/cms/addProduct', CmsController.addProductPage);//添加产品线管理页面
    app.get('/cms/showProduct', CmsController.showProductPage);//查看产品线管理页面
    app.get('/cms/addCategory', CmsController.addCategoryPage);//添加分类管理页面
    app.get('/cms/showCategory/:pid', CmsController.showCategoryPage);//查看分类管理页面
    app.get('/cms/showComponent/:pid/:cid', CmsController.showComponentPage);//查看组件页面
    //cms管理ajax接口
    //app.get('/cms/addProductApi/:projectName', CmsController.addProductApi);//添加产品线
    app.post('/cms/addProduct', CmsController.addProductApi);//添加产品线
    app.post('/cms/delProduct', CmsController.delProductApi);//删除产品线
    app.post('/cms/ediProduct', CmsController.ediProductApi);//修改产品线
    app.post('/cms/addCategory', CmsController.addCategoryApi);//添加分类
    app.post('/cms/showCategory', CmsController.getCategoryApi);//获取产品线下全部分类
    app.post('/cms/editCategory', CmsController.editCategoryApi);//修改分类
    app.post('/cms/delCategory', CmsController.delCategoryApi);//删除分类
    app.post('/cms/showComponent', CmsController.getComponentApi);//获取组件
    app.post('/cms/delCom', CmsController.delComApi);//删除组件
};
