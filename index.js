var express = require('express'),
    bodyParser = require('body-parser'),
    route = require('./config/route'),
    log = require('./config/log'),
    app = express();

//使用Log4J
log.use(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// 静态资源目录
app.use('/public', express.static(__dirname + '/public'));


route.use(app);


app.listen(3000);
