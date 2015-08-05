var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

// 静态资源目录
app.use('/public', express.static('public'));

app.listen(3000);
