var fileLog = {};
var isConsole = false;
var log4js = require('log4js');
var fs = require("fs");
var path = require("path");

// 加载配置文件
var objConfig = require("../config/log4js.json");

// 检查配置文件所需的目录是否存在，不存在时创建
if(objConfig.appenders){
    var baseDir = objConfig["customBaseDir"];
    var defaultAtt = objConfig["customDefaultAtt"];

    for(var i= 0, j=objConfig.appenders.length; i<j; i++){
        var item = objConfig.appenders[i];
        if(item["type"] == "console")
            continue;

        if(defaultAtt != null){
            for(var att in defaultAtt){
                if(item[att] == null)
                    item[att] = defaultAtt[att];
            }
        }
        if(baseDir != null){
            if(item["filename"] == null)
                item["filename"] = baseDir;
            else
                item["filename"] = baseDir + item["filename"];
        }
        var fileName = item["filename"];
        if(fileName == null)
            continue;
        var pattern = item["pattern"];
        if(pattern != null){
            fileName += pattern;
        }
        var category = item["category"];
        var dir = path.dirname(fileName);
        checkAndCreateDir(dir);
    }
}

// 目录创建完毕，才加载配置，不然会出异常
log4js.configure(objConfig);

var logDebug = log4js.getLogger('logDebug');
var logInfo = log4js.getLogger('logInfo');
var logWarn = log4js.getLogger('logWarn');
var logErr = log4js.getLogger('logErr');
var consoleLog = log4js.getLogger('console');

fileLog.log = fileLog.debug = function(msg){
    if(msg == null)
        msg = "";
    logDebug.debug(msg);
};

fileLog.info = function(msg){
    if(msg == null)
        msg = "";
    logInfo.info(msg);
};

fileLog.warn = function(msg){
    if(msg == null)
        msg = "";
    logWarn.warn(msg);
};

fileLog.write = function(msg, exp){
    if(msg == null)
        msg = "";
    if(exp != null)
        msg += "\r\n" + exp;
    logErr.error(msg);
};

// 配合express用的方法
exports.use = function(app) {
    //页面请求日志, level用auto时,默认级别是WARN
    app.use(log4js.connectLogger(logInfo, {level:'debug', format:':method :url'}));
};

exports.logger = isConsole ? consoleLog : fileLog;

// 判断日志目录是否存在，不存在时创建日志目录
function checkAndCreateDir(dir){
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}
