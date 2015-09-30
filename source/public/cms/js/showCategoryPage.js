$(function(){
    //选择产品线后显示对应列表
    $('.changePro').change(function() {
        var productId = $(this).val();
        $('.pleaseSelect').remove();
        
        $.post("/cms/showCategory", {
                'productId':productId
            },
            function(data) {
                var res = data;
                if(res.status == 200){
                    if(res.message){
                        $('.pro2cat').remove();
                        $('.showList').append(res.message);
                    }else{
                        alert("暂无结果");
                    }
                }else{
                    alert("查询失败");
                }
                return ; 
            }
        )
    })

    //点击修改
    $('table').delegate('.edit', 'click', function() {
        $(".listTable").hide(500);
        $(".ediTable").show(500);
        var categoryName = $(this).attr('cname'),
            productId = $(this).attr('pid'),
            categoryId = $(this).attr('cid');
        $('.text').val(categoryName);

        var proLen = $('.editChangePro').children('option').length;
        $('.editChangePro').children('option').attr('selected',false);
        for(var i=0;i<proLen;i++){
            if($('.editChangePro').children('option').eq(i).attr('value')==productId){
                $('.editChangePro').children('option').eq(i).attr('selected',true);
            }
        }

        //点击确认修改
        $('.sub').click(function() {

            var productId = $(".editChangePro").val(),
                categoryName = $(".text").val();

            if(!categoryName){
                alert("请填写分类名称");
                return;
            }

            $.post("/cms/editCategory", {
                    'productId':productId,
                    'categoryId':categoryId,
                    'categoryName':categoryName
                },
                function(data) {
                    var res = data;
                    alert(res.message);
                    if(res.status == 200){
                        window.location.href="/cms/showCategory/"+productId;   
                    }
                    return ; 
                }
            )

        })

    });

    //点击删除
    $('table').delegate('.del', 'click', function() {
        var categoryId = $(this).attr('cid'),
            productId = $(this).attr('pid');

        if(confirm("删除后将无法恢复,确定要删除吗？"))
        {
            $.post("/cms/delCategory", {'categoryId':categoryId}, function(data) {
                var res = data;
                alert(res.message);
                if(res.status == 200){
                    window.location.href="/cms/showCategory/"+productId;   
                }
                return ; 
            })
        }
    });

    //点击取消
    $('table').delegate('.editQx', 'click', function() {
        $(".listTable").show(500);
        $(".ediTable").hide(500);
    });

})