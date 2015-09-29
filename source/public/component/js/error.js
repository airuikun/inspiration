var template =

    angular.module('ucpen', [
        'ngAnimate',
        'ui.bootstrap',
        'ngCookies'
    ])
.factory('goback', function($rootScope, $cookieStore) {
    return function(){
        // $cookieStore.put('productLineID', id);
        // console.log($cookieStore.get('productLineID'));
        window.history.back();
    };
})
.run(function($rootScope, $templateRequest, $timeout, goback) {
    // $rootScope.productLine = productLine;
    $rootScope.goback = goback;


    // $rootScope.text = text;
});