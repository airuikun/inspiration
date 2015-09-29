var uuid = require('node-uuid'),
    ModelBase = require('./ModelBase'),
    util = require('util');

var Category = function(productLineID, name) {
    var now = new Date();
    this.categoryID = uuid.v4();
    this.productLineID = productLineID;
    this.name = name;   //产品线名称
    this.createTime = now;
    this.status = 1;
    ModelBase.call(this);
};

Category.getType = function() {
    return {
        categoryID : String,
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
util.inherits(Category, ModelBase);

module.exports = Category;

