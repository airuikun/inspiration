function form_submit(){
	document.getElementById("login").submit();
}
function form_reset(){
	document.getElementById("login").reset();
}
function reloadcode(){
    var verify=document.getElementById('safecode');
    verify.setAttribute('src','code.php?'+Math.random());
}

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