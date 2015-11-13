var logger = require('../helpers/LoggerHelper').logger,
    ProductLineDAL = require('../dal/ProductLineDAL'),
    AppUtils = require('../helpers/AppUtils');

var renderWelcomePage  = function (req, res) {

    ProductLineDAL.getAllProductLine().then(function(data) {
        res.render(AppUtils.getViewPath('component/welcome.ejs'), {
            productLine: data
        });
    });
};

var renderNotFoundPage  = function (req, res) {
    res.render(AppUtils.getViewPath('component/error.ejs'), {
        status : 404,
        text : '404'
    });
};
var renderErrorPage  = function (req, res) {
    res.render(AppUtils.getViewPath('component/error.ejs'), {
        status : 500,
        text : '500'
    });
};

var redirectWelcome = function(req, res, next) {
    //读取cookie获取产品线ID
    var productLineID = req.cookies.productLineID;
    if(!productLineID) {
        res.redirect('/welcome#!'+ req.url);
    }else {
        next();
    }
};

module.exports = {
    renderWelcomePage : renderWelcomePage,
    renderNotFoundPage : renderNotFoundPage,
    renderErrorPage : renderErrorPage,
    redirectWelcome : redirectWelcome
};