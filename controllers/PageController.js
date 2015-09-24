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

module.exports = {
    renderWelcomePage : renderWelcomePage,
    renderNotFoundPage : renderNotFoundPage,
    renderErrorPage : renderErrorPage
};