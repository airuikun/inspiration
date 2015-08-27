var uuid = require('node-uuid'),
    ModelBase = require('./ModelBase'),
    util = require('util');

var ComponentHistory = function(componentID, html, js, css, userID, remarks) {
    var now = new Date();
    this.componentHistoryID = uuid.v1();
    this.componentID = componentID;
    this.html = html;
    this.js = js;
    this.css = css;
    this.userID = userID;   //修改人ID
    this.createTime = now;
    this.remarks = remarks || '';
    ModelBase.call(this);
};

ComponentHistory.getType = function() {
    return {
        componentHistoryID : String,
        componentID : String,
        html : String,
        js : String,
        css : String,
        userID : String,
        createTime : Date,
        remarks : String
    }
};

//继承原型方法
util.inherits(ComponentHistory, ModelBase);

module.exports = ComponentHistory;

