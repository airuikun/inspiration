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
        };
    })
.factory('gotoExample', function($http) {
        return function(id) {
            // window.location.href = '/component/edit/';
        };
    })
.controller('projectList', function($scope) {
    $scope.proList = productLine;
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


//点击去下载文件
.factory('deleteFiles', function($http, $rootScope, $document) {
        return function(componentFileID) {
            $http.get('/file/' + componentFileID)
            .success(function() {
                alert('success');
                for ( var i = 0; i < $rootScope.files.length; i++ ) {
                    if ( $rootScope.files[i].componentFileID == componentFileID ) {
                        // angular.element('.' + componentFileID).remove();
                        $rootScope.files.splice(i,1);
                    }
                }
            })
            .error(function() {
                alert('fail');
            });
 
        };
    })


//点击历史版本
.factory('historyVersion', function($rootScope) {
    return function( componentID,componentHistoryID ){
        // alert(componentID);
        // alert(componentHistoryID);
        window.location = '/component/edit/' + componentID + '/' + componentHistoryID;
    };
})
.run(function($rootScope, $templateRequest, compile, save, createPage, choiceCategory, gotoExample, $timeout, deleteFiles, historyVersion) {
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


    //生成编辑页面的分类选项
    $rootScope.category = category;

    //点击新建页面
    $rootScope.createPage = createPage;

    //点击选择分类choiceCategory
    $rootScope.choiceCategory = choiceCategory;


    //控制新建页面信息的变量 默认新建页面的信息是隐藏的
    $rootScope.isShowCreate = true;

    //点击样例
    $rootScope.gotoExample = gotoExample;


    //从数据段获取的到页面信息
    $timeout(function(){
        // console.log('test');
        // console.log(component);

        $rootScope.component = component[0];
        $rootScope.exampleName = $rootScope.component.name;
        $rootScope.html = $rootScope.component.html;
        $rootScope.css = $rootScope.component.css;
        $rootScope.javascript = $rootScope.component.js;
        $rootScope.remarks = $rootScope.component.remarks;
        $rootScope.componentID = $rootScope.component.componentID;
        $rootScope.componentHistoryID = $rootScope.component.componentHistoryID;
        $rootScope.categoryID = component.categoryID; 
        //文件
        $rootScope.files = files;
        //历史版本
        $rootScope.componentHistory = componentHistory;


        //渲染编辑页面的分类选项
        //显示默认的分类
        $rootScope.categoryCur = "分类";
        var cateId = component[0].categoryID;
        for ( var i in category ) {
            if ( category[i].categoryID == cateId ) {
                $rootScope.categoryCur = category[i].name;
                $rootScope.categoryId = category[i].categoryID;
            }
        }

    
        //左边栏
        $rootScope.components = components;
        


    }, 300);

    //跳转到下载文件页面
    $rootScope.deleteFiles = deleteFiles;

    //跳转到历史版本页面
    $rootScope.historyVersion = historyVersion;
    




});