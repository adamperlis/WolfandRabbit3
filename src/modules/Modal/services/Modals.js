module.exports = function($rootScope, Modal, $document, $compile, $q, $http, $templateCache, $controller) {

    this.modals = [];

    this.open = function(options) {
        var deferred = $q.defer();
        var modals = this.modals;

        if (modals.length > 0) {
            modals[modals.length - 1].close();
        }

        function compileTemplate(html, options) {
            var scope = angular.extend($rootScope.$new(), options);

            var compiled = $compile("<modal class='" + (options.class || '') + "'>" + html + "</modal>")(scope, function(e, scope) {
                $controller(options.controller, angular.extend({
                    $scope: scope,
                    ModalInstance: modals[modals.length - 1]
                }, options.resolve));
            });

            $document.find('body').eq(0).addClass('active-modal').append(compiled);
        }

        if (options.templateUrl) {
            $http.get(options.templateUrl, {
                cache: $templateCache
            }).then(function(result) {
                compileTemplate(result.data, options);
                deferred.resolve(modals[modals.length - 1])
            })
        } else if (options.template) {
            compileTemplate(options.template, options);
            deferred.resolve(modals[modals.length - 1]);
        }
        
        return deferred.promise;
    }

}