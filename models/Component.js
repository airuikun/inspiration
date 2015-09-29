var uuid = require('node-uuid'),
    ModelBase = require('./ModelBase'),
    util = require('util');

var Component = function(name, categoryID, userID, remarks, productLineID) {
    var now = new Date();
    this.componentID = uuid.v4();
    this.categoryID = categoryID;
    this.name = name;   //组件名称
    this.userID = userID;   //创建人ID
    this.remarks = remarks || '';
    this.createTime = now;
    this.modifyTime = now;
    this.status = 1;
    this.productLineID = productLineID;
    ModelBase.call(this);
};

Component.getType = function() {
    return {
        componentID : String,
        categoryID : String,
        productLineID : String,
        name : String,
        userID : String,
        createTime : {
            type : 'date',
            time : true
        },
        remarks : String,
        status : Number
    }
};

//继承原型方法
util.inherits(Component, ModelBase);

module.exports = Component;

