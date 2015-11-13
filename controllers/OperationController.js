var SassHelper = require('../helpers/SassHelper'),
    logger = require('../helpers/LoggerHelper').logger,
OperationController = {
    sass2css: function(req, res) {
        var data = req.body.css,
        result = {
            data : {},
            status : 400
        };

        if(!data) {
           result.status = 400;
           result.message = "content is null";
           res.send(result);
           res.end();
        }
        //将sass代码转化为css代码
        SassHelper.sass2css(data).then(function(resData) {
            result.message = "success";
            result.status = 200;
            result.data = resData.css.toString("utf8");

            res.send(result);
            res.end();
        }, 
        function(error) {//转化失败
            logger.error(error);
            result.message = error.message;
            result.status = 400;

            res.send(result);
            res.end();
        });
    }
};

module.exports = OperationController;
