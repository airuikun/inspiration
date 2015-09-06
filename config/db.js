var orm = require("orm");
var opts = {
    database: "inspiration",
    protocol: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    query: {
        debug : false,
        pool: true
    }
};

function connDB() {
    return new Promise(function(resolve, reject) {
        console.info('正在连接数据库');
        orm.connect(opts, function(err, db) {
            if(err) {
                reject(err);
                console.error('数据库连接失败', err);
            }else {
                console.info('数据库连接成功');
                resolve(db);
            }
        });
    });
}
module.exports = connDB;