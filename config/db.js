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
module.exports = orm.connect(opts);