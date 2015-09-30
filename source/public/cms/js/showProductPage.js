$(function(){
    //点击删除
    $(".del").click(function() {
        var productLineID = $(this).attr('id');

        if(confirm("删除后将无法恢复,确定要删除吗？"))
        {
            $.post("/cms/delProduct", {'productLineID':productLineID}, function(data) {
                var res = data;
                alert(res.message);
                if(res.status == 200){
                    window.location.reload();
                }
                return ; 
            })
        }
    })

    //点击编辑
    $(".edit").click(function() {
        $(".listTable").hide(500);
        $(".ediTable").show(500);
        var productName = $(this).attr('pname'),
            productLineID = $(this).attr('pid');

        $(".text").val(productName);

        //点击取消
        $(".editQx").click(function() {
            $(".listTable").show(500);
            $(".ediTable").hide(500);
        });

        //点击确定
        $(".sub").click(function() {
            productName = $(".text").val();
            if(!productName) {//没有填写东西
                alert("请填产品线名称");
                return; 
            } 
            else {
                $.post("/cms/ediProduct", {
                        'productName':productName,
                        'productLineID':productLineID
                    }, 
                    function(data) {
                        var res = data;
                        alert(res.message);
                        if(res.status == 200){
                            window.location.reload();
                        }
                        return ; 
                    }
                )
            }
        });

    })
})