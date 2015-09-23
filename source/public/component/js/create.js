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
            $http.post('/api/sass2css', parts).then(function(response) {
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
.factory('watchAll', function($rootScope,$timeout) {
    return function(){
        $rootScope.$watch('css', cssWatch);
        $rootScope.$watch('html', jsHtmlWatch);
        $rootScope.$watch('javascript', jsHtmlWatch);
        var t1;
        function jsHtmlWatch( data ){
            $timeout.cancel(t1);
            t1 = $timeout(function(){
                    console.log(data);
                    $rootScope.run();
                }, 1000);
        }
        var t2;
        function cssWatch( data ){
            $timeout.cancel(t2);
            //$http.get().success().error();
            $rootScope.css = '#airuikun {' 
                    + 'width: 200px;' 
                    + 'height: 200px;' 
                    + 'background-color: red;'
                + '}';
            t2 = $timeout(function(){
                    console.log($rootScope.css);
                    $rootScope.run();
                }, 1000);
        }
    }
})


.run(function($rootScope, $templateRequest, compile, save, createPage, choiceCategory, gotoExample, $sce, $timeout, watchAll, template) {
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



    //执行效果
    $rootScope.preview = '';
    $rootScope.run = function () {
        var self = this;
        var code = template.replace(/{{(.+?)}}/g, function (_, type) {
          return self[type]
        });
        self.preview = $sce.trustAsHtml(code)
    };
    $timeout(function(){
        $rootScope.run();
    },1000);
    //监听数据的变化 
    watchAll();

});
