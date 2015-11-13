var logger = require('./LoggerHelper').logger,
    sass = require('node-sass');
/*
* sass字符串转化为css字符串方法
* param sassStr string sass字符串
* return promiseObj , content is cssString
*/
function sass2css(sassStr) {
    return new Promise(function(resolve, reject) {
        sass.render({
            data : sassStr
        }, function(err,result) {
            if(err) {//失败
                logger.error('sass转换失败');
                reject(err);
            }
            else {
                resolve(result);  
            }
        });
    });
}

module.exports = {
    sass2css : sass2css
};