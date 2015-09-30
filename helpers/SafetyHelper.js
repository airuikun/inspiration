//防XSS攻击过滤
function stripscript(s) 
{ 
    var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")        //格式 RegExp("[在中间定义特殊过滤字符]")
    var rs = ""; 
    for (var i = 0; i < s.length; i++) { 
     rs = rs+s.substr(i, 1).replace(pattern, ''); 
    }
    return rs;
}

module.exports = {
    stripscript : stripscript
};