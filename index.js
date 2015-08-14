var express = require('express'),
    app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// 静态资源目录
app.use('/public', express.static(__dirname + '/public'));

app.listen(3000);
