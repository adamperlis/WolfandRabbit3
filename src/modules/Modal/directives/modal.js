module.exports = function($animate, Modals, Modal) {
    return {
        restrict: 'E',
        template: require('../html/index.html'),
        transclude: true,
        replace: true,
        link: function(scope, element, attrs) {

            Modals.modals.push(new Modal(element));

            var modal = Modals.modals[Modals.modals.length - 1];

            $animate.addClass(element, 'current');

            scope.close = function() {
                modal.close();
            }
        }
    }
}