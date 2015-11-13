var logger = require('../helpers/LoggerHelper').logger,
    ProductLine = require('../dal/ProductLineDAL'),
    SafetyHelper = require('../helpers/SafetyHelper'),
    pageTitle = "动效平台后台管理",

    CmsController = {
    //管理系统分为主页及主页中的上左右下4个页面组成
    init: function(req, res) {//主页面
        res.render('cms/index', {"pageTitle":pageTitle});
        res.end();
    },
    top: function(req, res) {
        res.render('cms/top', {"pageTitle":pageTitle});
        res.end();
    },
    bottom: function(req, res) {
        res.render('cms/bottom', {"pageTitle":pageTitle});
        res.end();
    },
    left: function(req, res) {
        res.render('cms/left', {"pageTitle":pageTitle});
        res.end();
    },
    right: function(req, res) {
        res.render('cms/right', {"pageTitle":pageTitle});
        res.end();
    },
    //添加产品线页面
    addProductPage: function(req, res) {
        res.render('cms/addProductPage', {"pageTitle":pageTitle});
        res.end();
    },
    //查看产品线页面
    showProductPage: function(req, res) {
        ProductLine.getAllProductLine().then(function(data) {
            res.render('cms/showProductPage', {
                "pageTitle":pageTitle,
                "data":data
            });
            res.end();
        }, function(error){//错误信息不用传递到页面,错误后页面不显示数据即可
            logger.error(error);
            res.render('cms/showProductPage', {
                "pageTitle":pageTitle,
                "data":[]
            });
            res.end();
        })
        
    },
    //添加分类页面
    addCategoryPage: function(req, res) {
        ProductLine.getAllProductLine().then(function(data) {
            res.render('cms/addCategoryPage', {
                "pageTitle":pageTitle,
                "data":data
            });
            res.end();
        }, function(error){//错误信息不用传递到页面,错误后页面不显示数据即可
            logger.error(error);
            res.render('cms/addCategoryPage', {
                "pageTitle":pageTitle,
                "data":[]
            });
            res.end();
        })
    },
    //查看分类页面
    showCategoryPage: function(req, res) {

        var productId = req.params.pid;
        
        //根据ID查询出分类列表,编辑或删除后需要显示之前的ID数据
        ProductLine.getProduct2Category(productId).then(function(pro2CateData) {
            //查询全部产品线
            ProductLine.getAllProductLine().then(function(data) {
                res.render('cms/showCategoryPage', {
                    "pageTitle":pageTitle,
                    "proData":data,
                    "pro2CateData":pro2CateData,
                    "productId":productId
                });
                res.end();
            }, function(error){//错误信息不用传递到页面,错误后页面不显示数据即可
                logger.error(error);
                res.render('cms/showCategoryPage', {
                    "pageTitle":pageTitle,
                    "proData":[]
                });
                res.end();
                
            })  
        })
    },
    //添加产品线ajax接口
    addProductApi: function(req, res) {
        var ProductName = SafetyHelper.stripscript(req.body.ProductName),//XSS过滤
            result = {};
            ProductLine.addProduct(ProductName).then(function(data) {

                result.message = "添加成功";
                result.status = 200;

                res.send(result);
                res.end();

            },function(err) {
                logger.error(e);
                result.message = "添加失败,产品线可能已存在";
                result.status = 400;

                res.send(result);
                res.end();
                
            })
    },

    //删除产品线ajax接口
    delProductApi: function(req, res) {
        var productLineID = req.body.productLineID,
            result = {};
        ProductLine.delProduct(productLineID).then(function(data) {
            result.message = "删除成功";
            result.status = 200;
            res.send(result);
            res.end();
        })
    },

    //修改产品线ajax接口
    ediProductApi: function(req, res) {
        var ProductName = SafetyHelper.stripscript(req.body.productName),//XSS过滤
            productLineID = req.body.productLineID,
            result = {};
            ProductLine.ediProduct(productLineID,ProductName).then(function(data) {

                result.message = "修改成功";
                result.status = 200;

                res.send(result);
                res.end();

            },function(err) {
                logger.error(err);
                result.message = "修改失败";
                result.status = 400;

                res.send(result);
                res.end();

            })
    },

    //添加产品线ajax接口
    addCategoryApi: function(req, res) {
        var productId = req.body.productId,
            categoryName = req.body.categoryName,
            result = {};
            ProductLine.addCategory(productId, categoryName).then(function(data) {

                result.message = "添加成功";
                result.status = 200;

                res.send(result);
                res.end();

            },function(err) {
                logger.error(err);
                result.message = "添加失败,产品线下此分类可能已存在";
                result.status = 400;

                res.send(result);
                res.end();
                
            })
    },

    //查看指定产品线下分类信息
    getCategoryApi: function(req, res) {
        var productId = req.body.productId,
            result = {'message':''};
            ProductLine.getProduct2Category(productId).then(function(data) {
                if(data[0]) {//查询到了结果
                    var len = data.length;
                    for(var i=0;i<len;i++){
                        var rs = data[i],
                            dataTime = new Date(rs.createTime).toLocaleDateString(),
                            num =i+1;
                        result.message+="<tr class='pro2cat'>";
                        result.message+="<td align='center' valign='middle'>"+num+"</td>";
                        result.message+="<td align='center' valign='middle'>"+rs.name+"</td>";
                        result.message+="<td align='center' valign='middle'>"+dataTime+"</td>";
                        result.message+="<td align='center' valign='middle'><span pid='"+rs.productLineID+"' cid='"+rs.categoryID+"' cname='"+rs.name+"' class='crosshair edit'>修改</span> / <span pid='"+rs.productLineID+"' cid='"+rs.categoryID+"' class='crosshair del'>删除</span></td>";
                        result.message+="</tr>";
                    }
                }
                result.status = 200;
                res.send(result);
                res.end();

            },function(err) {
                logger.error(err);      
                result.message = "暂无结果";
                result.status = 400;

                res.send(result);
                res.end();
                
            })
    },

    //修改产品线ajax接口
    editCategoryApi: function(req, res) {
        var categoryName = SafetyHelper.stripscript(req.body.categoryName),//XSS过滤
            productId = req.body.productId,
            categoryId = req.body.categoryId,
            result = {};
            ProductLine.editCategory(categoryId,categoryName,productId).then(function(data) {
                result.message = "修改成功";
                result.status = 200;

                res.send(result);
                res.end();

            },function(err) {
                logger.error(err);
                result.message = "修改失败";
                result.status = 400;

                res.send(result);
                res.end();
            })
    },

    //删除分类ajax接口
    delCategoryApi: function(req, res) {
        var categoryId = req.body.categoryId,
            result = {};
        ProductLine.delCategory(categoryId).then(function(data) {
            result.message = "删除成功";
            result.status = 200;
            res.send(result);
            res.end();
        })
    },
};

module.exports = CmsController;








