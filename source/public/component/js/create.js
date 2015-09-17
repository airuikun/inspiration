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
    console.log('send');
        return function(parts) {
            $http.post('http://100.85.120.170:3000/sa2css', parts).then(function(response) {
                console.log('大伟的数据：');
                console.info(response);
            }).catch(function(response) {
                console.log('大伟的数据：');
                console.error(response);
            });
        };
    })
.factory('gotoExample', function($http) {
        return function(id) {
            alert(id);
            // window.location.href = '/component/edit/';
        };
    })
.controller('projectList', function($scope) {
    $scope.proList = productLine;
    console.log($scope.proList);

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
    return function( categoryID, name ){
        // $rootScope.id, name = category;
        $rootScope.categoryCur = name;

        $rootScope.categoryId = categoryID;
        // alert($rootScope.categoryCur);
    };
})



.run(function($rootScope, $templateRequest, compile, save, createPage, choiceCategory, gotoExample) {
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

    //生成左边栏
    $rootScope.component = component;

    //生成分类
    $rootScope.categories = categories;



    //点击新建页面
    $rootScope.createPage = createPage;

    //点击选择分类choiceCategory
    $rootScope.choiceCategory = choiceCategory;


    //控制新建页面信息的变量 默认新建页面的信息是隐藏的
    $rootScope.isShowCreate = true;

    //点击样例
    $rootScope.gotoExample = gotoExample;



});