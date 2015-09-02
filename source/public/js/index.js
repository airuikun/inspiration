var template =

    angular.module('ucpen', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.codemirror'
    ])

.value('template', '<!DOCTYPE html><html><head><meta charset="utf-8"><style>{{css}}</style></head><body>{{html}}<script>{{javascript}}</script></body></html>')

.factory('compile', function(template, $sce) {
    return function(parts) {
        var code = template.replace(
            /{{(.+?)}}/g,
            function(_, type) {
                return parts[type];
            });
        return $sce.trustAsHtml(code);
    };
})

.factory('save', function($http) {
        return function(parts) {
            $http.post('/component/create', parts).then(function(response) {
                console.info(response);
            }).catch(function(response) {
                console.error(response);
            });

            // $http.post('/component/create', {
            //     data: new FormData(form)
            // }).then(function(response) {
            //     console.info(response);
            // }).catch(function(response) {
            //     console.error(response);
            //     // alert(response.config.data.html);
            //     // alert(response.config.data.javascript);
            //     // alert(response.config.data.css);
            // });
        };
    })

.controller('projectList', function($scope) {
    $scope.proList = '爱书旗 神马搜索 UC优视 商搜 框计算 阿里巴巴 阿里云 淘宝 支付宝 移动事业群 蚂蚁金服 阿里影业 菜鸟 国际事业部'.split(' ');
})

.controller('animateList', function($scope) {
    // $scope.category = ["分类1", "分类2", "分类3", "分类4"];
    // $scope.aniList1 = ["样例1", "样例2", "样例3", "样例4"];
    // $scope.aniList2 = ["样例1", "样例2", "样例3", "样例4"];
    // $scope.aniList3 = ["样例1", "样例2", "样例3", "样例4"];
    // $scope.aniList4 = ["样例1", "样例2", "样例3", "样例4"];
})
//点击新建页面
.factory('createPage', function($rootScope) {
    return function(){
        // $rootScope.html = '';
        // $rootScope.javascript = '';
        // $rootScope.css = '';

        // //显示新建页面信息
        // $rootScope.isShowCreate = true;
        window.location.href = '../views/createpage.html';
    };
})

//点击选择分类
.factory('choiceCategory', function($rootScope) {
    return function( category ){
        // $rootScope.category = category;
        $rootScope.categoryCur = category;
        // alert($rootScope.categoryCur);
    };
})



.run(function($rootScope, $templateRequest, compile, save, createPage, choiceCategory) {
    $rootScope.compile = compile;
    $rootScope.save = save;
    $templateRequest('init.html').then(function(data) {
        $rootScope.html = data;
    });

    $templateRequest('init.css').then(function(data) {
        $rootScope.css = data;
    });

    $templateRequest('init.js').then(function(data) {
        $rootScope.javascript = data;
    });


    //保存当前锁选择的分类
    $rootScope.categoryCur = "分类";

    //用户填写的样例名称
    $rootScope.exampleName = '';




    //生成分类
    // $rootScope.category = [{
    //     id: "aniList1",
    //     category: "分类1",
    //     example: ["样例1", "样例2", "样例3", "样例4"]
    // }, {
    //     id: "aniList2",
    //     category: "分类2",
    //     example: ["样例1", "样例2", "样例3", "样例4"]
    // }, {
    //     id: "aniList3",
    //     category: "分类3",
    //     example: ["样例1", "样例2", "样例3", "样例4"]
    // }, {
    //     id: "aniList4",
    //     category: "分类4",
    //     example: ["样例1", "样例2", "样例3", "样例4"]
    // }];
    $rootScope.category = categories;

    //点击新建页面
    $rootScope.createPage = createPage;

    //点击选择分类choiceCategory
    $rootScope.choiceCategory = choiceCategory;


    //控制新建页面信息的变量 默认新建页面的信息是隐藏的
    $rootScope.isShowCreate = false;



});