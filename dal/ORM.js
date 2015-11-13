var logger = require('../helpers/LoggerHelper').logger,
    orm = require("orm"),
    opts = require('../config/db.json'),
    db = null;


console.info('正在连接数据库');
db = orm.connect(opts, function(err) {
    if(err) {
        logger.error(err);
    }else {
        logger.info('数据库连接成功');
    }
});

//执行sql,仅限于直接写sql查询
db._exec = function(sql) {
    return new Promise(function(resolve, reject) {
        db.driver.execQuery(sql, function(err, data) {
            if(err) {
                logger.error('SQL执行错误 ' + sql);
                reject(err);
            }else {
                resolve(data);
            }
        });
    });
};

//查询数据,仅限于直接写sql查询
db._fetchAll = function(sql){
    return new Promise(function(resolve, reject) {
        db._exec(sql).then(function(data) {
            resolve(data);
        },function(error) {
            logger.error('SQL执行错误 ' + sql);
            reject(error);
        });
    });
};

module.exports = db;
