var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 静态资源目录
app.use('/public', express.static(__dirname + '/public'));

// 配置路由
require('./config/routes')(app);
// 配置日志
require('./config/log')(app);

app.listen(3000);
