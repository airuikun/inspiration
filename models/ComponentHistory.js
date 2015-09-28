var uuid = require('node-uuid'),
    ModelBase = require('./ModelBase'),
    util = require('util');

var ComponentHistory = function(componentID, html, js, css, userID, updateContent) {
    var now = new Date();
    this.componentHistoryID = uuid.v4();
    this.componentID = componentID;
    this.html = html;
    this.js = js;
    this.css = css;
    this.userID = userID;   //修改人ID
    this.createTime = now;
    this.updateContent = updateContent || ''; //更新内容
    ModelBase.call(this);
};

ComponentHistory.getType = function() {
    return {
        componentHistoryID : String,
        componentID : String,
        html : {
            type:'text',
            size : 5000
        },
        js : {
            type:'text',
            size : 5000
        },
        css : {
            type:'text',
            size : 5000
        },
        userID : String,
        createTime : {
            type : 'date',
            time : true
        },
        updateContent : String
    }
};

//继承原型方法
util.inherits(ComponentHistory, ModelBase);

module.exports = ComponentHistory;

