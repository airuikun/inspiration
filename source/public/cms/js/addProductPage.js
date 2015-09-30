$(function(){
    //添加项目
    $('.sub').click(function(){
        var ProductName = $('.addProject').val();
        ProductName = ProductName.replace(/(^\s*)/g, "");//过滤左侧空格
        ProductName = stripscript(ProductName);//防XSS攻击,过滤
        if(!ProductName) {//没有填写东西
            alert("请填产品线名称");
            return; 
        } 
        else {
            $.post("/cms/addProduct", {'ProductName':ProductName}, function(data) {
                alert(data.message);
                if(200 == data.status){
                    window.location.href="/cms/showProduct";
                }
                return ; 
            })
        }
    })
})

