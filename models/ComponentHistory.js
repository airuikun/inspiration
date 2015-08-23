var md5Helper = require('../helpers/md5Helper'),
    ModelBase = require('./ModelBase');

var ComponentHistory = function(componentID, html, js, css, userID, remarks) {
    var now = new Date();
    this.componentHistoryID = md5Helper.createMD5(now.getTime());
    this.componentID = componentID;
    this.html = html;
    this.js = js;
    this.css = css;
    this.userID = userID;   //修改人ID
    this.createTime = now;
    this.remarks = remarks || '';
    ModelBase.call(this);
};

//寄生组合式继承
var prototype = Object.create(ModelBase.prototype);
prototype.constructor = ComponentHistory;
ComponentHistory.prototype = prototype;

module.exports = ComponentHistory;

