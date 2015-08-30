var uuid = require('node-uuid'),
    ModelBase = require('./ModelBase'),
    util = require('util');

/**
 * @param componentID 组件ID
 * @param fileName
 * @param path
 * @constructor
 */
var ComponentFile = function(componentID, fileName, path, fileSize) {
    this.componentFileID = uuid.v1();
    this.fileName = fileName;
    this.componentID = componentID;
    this.path = path;
    this.createTime = new Date();
    this.fileSzie = fileSize;
    ModelBase.call(this)
};


ComponentFile.getType = function() {
    return {
        componentFileID : String,
        fileName : String,
        componentID : String,
        path : String,
        createTime : Date
    }
};


//继承原型方法
util.inherits(ComponentFile, ModelBase);

module.exports = ComponentFile;
