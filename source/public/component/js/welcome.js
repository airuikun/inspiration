var template =

    angular.module('ucpen', [
        'ngAnimate',
        'ui.bootstrap',
        'ngCookies'
    ])
.factory('cookieFunc', function($rootScope, $cookies) {
    return function( id ){
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 15);
        $cookies.put('productLineID', id, {
            'expires': expireDate
        });
        console.log($cookies.get('productLineID'));
        window.location.href = '/component/create';
    };
})
.run(function($rootScope, $templateRequest, $timeout, cookieFunc) {
    $rootScope.productLine = productLine;
    $rootScope.cookieFunc = cookieFunc;
});