var log4js = require('log4js');


log4js.configure({
    appenders: [
        //控制台输出
        {
            type: 'console',
            category: "console"
        }
        ////线上打开，否则没有这个软件会报错
        //{
        //    type: "dateFile",
        //    filename: 'logs/log.log',
        //    pattern: "_yyyy-MM-dd",
        //    alwaysIncludePattern: false,
        //    category: 'dateFileLog'
        //}//日期文件格式
    ],
    replaceConsole: true,   //替换console.log
    levels:{
        dateFileLog: 'ERROR',
        console : 'DEBUG'
    }
});

var dateFileLog = log4js.getLogger('dateFileLog');

exports.logger = dateFileLog;

exports.use = function(app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
    app.use(log4js.connectLogger(dateFileLog, {level:dateFileLog.level.ERROR, format:':method :url'}));
};