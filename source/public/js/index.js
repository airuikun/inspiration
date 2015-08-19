var template = angular.module('ucpen', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.codemirror'
]);

template.value('template', '<!DOCTYPE html><html><head><meta charset="utf-8"><style>{{css}}</style></head><body>{{html}}<script>{{javascript}}</script></body></html>')

    .factory('compile', function (template, $sce) {
        return function (parts) {
            var code = template.replace(
                /{{(.+?)}}/g,
                function (_, type) {
                    return parts[type]
                });
            return $sce.trustAsHtml(code)
        }
    })

    .factory('save', function ($http) {
        return function (parts) {
            $http.post('/save', parts).then(function (response) {
                console.info(response)
            }).catch(function (response) {
                console.error(response);
                alert(response.config.data.html);
                alert(response.config.data.javascript);
                alert(response.config.data.css);
            })
        }
    })

    .run(function ($rootScope, $templateRequest, compile, save) {
        $rootScope.compile = compile;
        $rootScope.save = save;
        $templateRequest('init.html').then(function (data) {
            $rootScope.html = data
        });

        $templateRequest('init.css').then(function (data) {
            $rootScope.css = data
        });

        $templateRequest('init.js').then(function (data) {
            $rootScope.javascript = data
        });
    });



