var ProductLineDAL = require('../dal/ProductLineDAL'),
    AppUtils = require('../helpers/AppUtils');

var renderWelcomePage  = function (req, res) {

    ProductLineDAL.getAllProductLine().then(function(data) {
        res.render(AppUtils.getViewPath('component/welcome.ejs'), {
            productLine: data
        });
    });
};

var renderNotFoundPage  = function (req, res) {
    res.render(AppUtils.getViewPath('component/404.ejs'));
};
var renderErrorPage  = function (req, res) {
    res.render(AppUtils.getViewPath('component/500.ejs'));
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