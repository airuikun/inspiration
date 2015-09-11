var orm = require("orm"),
    opts = require('../config/db'),
    db = null;


console.info('正在连接数据库');
db = orm.connect(opts, function(err) {
    if(err) {
        console.error(err);
    }else {
        console.info('数据库连接成功');
    }
});

module.exports = db;
