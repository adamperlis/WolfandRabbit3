'use strict';

module.exports = function($timeout, Scroller) {

    return {
        link: function($scope, element, attrs) {
            var height,
                offset;

            element.addClass('parallax');

            var getPositions = function() {
                height = element[0].offsetHeight;
                offset = Scroller.getOffset(element[0])
            }

            angular.element(window).bind('resize', function() {
                getPositions();
            });

            angular.element(window).bind('scroll touchmove', function() {
                if ( ! height) {
                    getPositions();
                }

                if (window.pageYOffset < 0) {
                    element.removeClass('fixed');
                    element.css('top', 0);
                    
                    return;
                }

                element.css('top', -(window.pageYOffset/2) + offset.top + "px")
            
            })

        }
    }
}