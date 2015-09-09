var orm = require("orm"),
    db = null,
    opts = {
        database: "inspiration",
        protocol: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: "root",
        password: "root",
        query: {
            debug : true,
            pool: true
        }
    };


console.info('正在连接数据库');
try {
    db = orm.connect(opts);
    console.info('数据库连接成功');
}catch(err) {
    console.error('数据库连接失败', err);
}

module.exports = db;