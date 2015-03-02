'use strict';

module.exports = function(Scroller) {
      return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var height

            angular.element(window).bind('scroll touchmove', function() {
                // console.log(window.pageYOffset)

                if (window.pageYOffset > 709) {
                    element.addClass('navbar-inverse');
                } else {
                    element.removeClass('navbar-inverse');
                }
               
            })

        }
    }
}