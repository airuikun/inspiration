$(function(){
    //添加分类
    $('.sub').click(function(){
        var productId = $('.changePro').val(),
            categoryName = $('.text').val();
        categoryName = categoryName.replace(/(^\s*)/g, "");//过滤左侧空格
        categoryName = stripscript(categoryName);//防XSS攻击,过滤
        if(!categoryName) {//没有填写东西
            alert("请填写分类名称");
            return; 
        } 
        else {
            $.post("/cms/addCategory", {
                    'productId':productId,
                    'categoryName':categoryName
                },
                function(data) {
                    var res = data;
                    alert(res.message);
                    if(200 == res.status){
                        window.location.href="/cms/showCategory/"+productId;
                    }
                    return ; 
                }
            )
        }
    })
})

