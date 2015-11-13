var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express();

//跨域请求设置 add by zdw 15.09.17
/*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  //允许所有域来跨域请求
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods","POST,GET"); //允许的请求类型
    next();
});*/
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

// 配置路由
require('./config/routes')(app);
// 配置日志
require('./helpers/LoggerHelper').use(app);

app.listen(3000);
