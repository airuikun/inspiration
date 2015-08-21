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
            $http.post('/save', parts).then(function(response) {
                console.info(response);
            }).catch(function(response) {
                console.error(response);
                // alert(response.config.data.html);
                // alert(response.config.data.javascript);
                // alert(response.config.data.css);
            });
        };
    })
    .controller('projectList', function($scope) {
        $scope.proList = '爱书旗 神马搜索 UC优视 商搜 框计算 阿里巴巴 阿里云 淘宝 支付宝 移动事业群 蚂蚁金服 阿里影业 菜鸟 国际事业部'.split(' ');
    })

.controller('animateList', function($scope) {
    $scope.aniList = ["样例1", "样例2", "样例3", "样例4"];
})

.run(function($rootScope, $templateRequest, compile, save) {
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
});