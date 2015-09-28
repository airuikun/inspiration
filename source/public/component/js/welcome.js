var template =

    angular.module('ucpen', [
        'ngAnimate',
        'ui.bootstrap',
        'ngCookies'
    ])
.factory('cookieFunc', function($rootScope, $cookies) {
    return function( id, name ){
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 15);
        $cookies.put('productLineID', id, {
            'expires': expireDate
        });
        $cookies.put('productLineName', name, {
            'expires': expireDate
        });
        console.log($cookies.get('productLineID'));
        console.log($cookies.get('productLineName'));
        window.location.href = '/component/create';
    };
})
.run(function($rootScope, $templateRequest, $timeout, cookieFunc) {
    $rootScope.productLine = productLine;
    $rootScope.cookieFunc = cookieFunc;
});