var template =

    angular.module('ucpen', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.codemirror',
        'ngCookies'
    ])

.value('template', '<!DOCTYPE html><html><head><meta charset="utf-8"><style>{{cssReal}}</style></head><body>{{html}}<script>{{javascript}}</script></body></html>')



.factory('save', function($http,$rootScope) {
        return function(parts) {
            $http.post('/api/sass2css', parts).then(function(response) {
                console.log('大伟的数据：');
                console.info(response);
                //真正生成动效的css
                $rootScope.cssReal = response.data.data;
                $rootScope.run();
            }).catch(function(response) {
                console.log('大伟的数据：');
                console.error(response);
            });
        };
    })

.factory('watchAll', function($rootScope,$timeout, save) {
    return function(){
        $rootScope.$watch('css', cssWatch);
        $rootScope.$watch('html', jsHtmlWatch);
        $rootScope.$watch('javascript', jsHtmlWatch);
        var t1;
        function jsHtmlWatch( data ){
            $timeout.cancel(t1);
            t1 = $timeout(function(){
                    $rootScope.run();
                }, 1000);
        }
        var t2;
        function cssWatch( data ){
            $timeout.cancel(t2);
            t2 = $timeout(function(){
                    $rootScope.save({css: $rootScope.css});
                }, 1000);
        }
    }
})



.run(function($rootScope, $sce, $timeout, template, watchAll, save) {


    $rootScope.save = save;

    $rootScope.preview = '';
    $rootScope.html = data[0].html;
    $rootScope.css = data[0].css;
    $rootScope.javascript = data[0].js;

    $rootScope.run = function () {
        var self = this;
        var code = template.replace(/{{(.+?)}}/g, function (_, type) {
          return self[type];
        });
        self.preview = $sce.trustAsHtml(code);
    };



    $timeout(function(){
        $rootScope.run();
    },1000);

    //监听数据的变化 
    watchAll();



});