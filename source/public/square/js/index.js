var template =

    angular.module('ucpen', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.codemirror',
        'ngCookies'
    ])

.factory('gotoPreview', function() {
        return function(componentID) {
            window.location.href = '/component/preview/' + componentID;
        };
    })

.run(function($rootScope, $sce, gotoPreview) {

    $rootScope.component = data.component;
    //处理iframe的url  转化为真值url
    for ( var i = 0; i < $rootScope.component.length; i++ ) {
        $rootScope.component[i].url = $sce.trustAsResourceUrl('http://'+window.location.host+'/component/preview/'+$rootScope.component[i].componentID);
    }


    $rootScope.gotoPreview = gotoPreview;

});