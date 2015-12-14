$(function(){
    //选择产品线后显示对应分类
    $('.changePro').change(function() {
        var productId = $(this).val();
        $('.pleaseSelect').remove();
        
        $.post("/cms/showComponent", {
                'pid':productId
            },
            function(data) { 
                var res = data;
                if(res.status == 200){
                    $('.cat2com').remove();
                    if(res.comMessage || res.cateMessage){
                        
                        $('.showList').append(res.comMessage);

                        $('.changeCat').html(res.cateMessage);
                    }
                }else{
                    alert("查询失败");
                }
                return ; 
            }
        )
    })


    //选择产品线后显示对应分类
    $("body").delegate(".changeCat","change",function() {
        var pidAndCid = $(this).val().split('⊙'),
            productId = pidAndCid[0],
            cid = pidAndCid[1];
        $('.pleaseSelectCat').remove();
        $.post("/cms/showComponent", {
                'pid': productId,
                'cid': cid,
            },
            function(data) { 
                var res = data;
                if(res.status == 200){
                    $('.cat2com').remove();
                    if(res.comMessage){
                        $('.showList').append(res.comMessage);
                    }
                }else{
                    alert("查询失败");
                }
                return ;
            }
        )
    })

    //点击删除
    $('table').delegate('.del', 'click', function() {
        var comid = $(this).attr('comid'),
            pid = $(this).attr('pid'),
            cateid = $(this).attr('cateid');
        if(confirm("删除后将无法恢复,确定要删除吗？"))
        {
            $.post("/cms/delCom", {'comid':comid}, function(data) {
                var res = data;
                if(res.status == 200){
                    window.location.href="/cms/showComponent/"+pid+'/'+cateid;   
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