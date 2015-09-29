var uuid = require('node-uuid'),
    ModelBase = require('./ModelBase'),
    util = require('util');

var ProductLine = function(name) {
    var now = new Date();
    this.productLineID = uuid.v4();
    this.name = name;   //产品线名称
    this.createTime = now;
    this.status = 1;
    ModelBase.call(this);
};

ProductLine.getType = function() {
    return {
        productLineID : String,
        name : String,
        createTime : {
            type : 'date',
            time : true
        },
        status : Number
    }
};

//继承原型方法
util.inherits(ProductLine, ModelBase);

module.exports = ProductLine;

