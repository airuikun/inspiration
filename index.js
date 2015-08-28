var express = require('express'),
    bodyParser = require('body-parser'),
    multipart = require('connect-multiparty'),
    ComponentController = require('./controllers/ComponentController'),
    multipartMiddleware = multipart(),
    app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// 静态资源目录
app.use('/public', express.static(__dirname + '/public'));

// http://yijiebuyi.com/blog/90c1381bfe0efb94cf9df932147552be.html
//表单默认提交方式为www-form-urlencoded
//有文件传输的为form-data类型，需要引入connect-multiparty库

var componentHander = (function() {
    var componentController = new ComponentController();
    return {

        createComponent : function(req, res) {
            var data = req.body,
                files = req.files;
            //当组件存储完成、文件上传完成，才响应
            componentController.createComponent(data, files).then(function(data) {
                //渲染页面
                //res.render('index', data.componentItem.componentItemID);
                res.send('ok');
            }).catch(function(e) {
                console.error(e);
                res.redirect('error');
            });
        },

        editComponent : function (req, res) {
            var data = req.body,
                files = req.files;
            //当组件存储完成、文件上传完成，才响应
            componentController.editComponent(data, files).then(function(data) {
                //渲染页面
                //res.render('index', data.componentItem.componentItemID);
                res.send('ok');
            }).catch(function(e) {
                console.error(e);
                res.redirect('error');
            });
        }
    }
})();

app.post('/component/create', multipartMiddleware, componentHander.createComponent);

app.post('/component/edit', multipartMiddleware, componentHander.editComponent);

app.listen(3000);
