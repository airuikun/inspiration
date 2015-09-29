var template =

    angular.module('ucpen', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.codemirror',
        'ngCookies'
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
.controller('projectList', function($rootScope, $cookies) {
    $rootScope.proList = productLine;

    //顶部项目组默认名称
    $rootScope.productName = $cookies.get('productLineName');
    $rootScope.productLineID = $cookies.get('productLineID');

})
.factory('projectGroup', function($rootScope, $cookies) {
        return function(id, name) {
            // window.location.href = '/component/edit/';
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 15);

            $rootScope.productName = $cookies.put('productLineName', name, {
            'expires': expireDate,
            'path': '/'
        });
            $rootScope.productLineID = $cookies.put('productLineID', id, {
            'expires': expireDate,
            'path': '/'
        });

            console.log($cookies.get('productLineName'));
            console.log($cookies.get('productLineID'));
            window.location.href = '/';

        };
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
        window.location.href = '/component/create';
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
                for ( var i = 0; i < $rootScope.files.length; i++ ) {
                    if ( $rootScope.files[i].componentFileID == componentFileID ) {
                        // angular.element('.' + componentFileID).remove();
                        $rootScope.files.splice(i,1);
                    }
                }
            })
            .error(function() {
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

// .filter('addDateTime', function($rootScope){
//     return function(){
//         if (  ) {}
//     };
// })
.factory('watchUpdateContent', function($rootScope) {
    return function() {
        $rootScope.$watch('updateContent', function() {
            if ($rootScope.updateContent == '') {
                $rootScope.updateContent = new Date();
            }
        });
    }

})
.run(function($rootScope, $templateRequest, compile, save, createPage, choiceCategory, gotoExample, $timeout, deleteFiles, historyVersion, watchUpdateContent, projectGroup) {
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
        $rootScope.html = window.decodeURIComponent($rootScope.component.html);
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
    
    //历史版本消息
    $rootScope.updateContent = '';
    //监听历史版本描述
    $rootScope.watchUpdateContent = watchUpdateContent;


    //点击项目组
    $rootScope.projectGroup = projectGroup;

});