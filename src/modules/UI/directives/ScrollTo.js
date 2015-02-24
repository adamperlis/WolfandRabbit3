'use strict';

module.exports = function($location, $window, $timeout, Scroller) {
    var sections = [];

    return {
        restrict: 'A',
        link: function($scope, element, attrs) {

            function getValue(value, defaultValue) {
                return angular.isDefined(value) ? $scope.$parent.$eval(value) : defaultValue;
            }

            $timeout(function() {
                var target = document.getElementById(attrs.scrollTo);

                if (target == null) return;

                var exists = false;
                for (var i = sections.length - 1; i >= 0; i--) {
                    if (sections[i].target == target) {
                        exists = true;
                    }
                };

                if ( ! exists) {
                    sections.push({
                        name: attrs.scrollTo,
                        target: target,
                        element: element,
                    });
                }
            })

            angular.element($window).bind('scroll touchmove', function() {

                for (var i = 0; i < sections.length; i++) {
                    if (i == 0) {
                        var top = 0;
                    } else {
                        var top = Scroller.getOffset(sections[i].target).top - (parseInt(angular.element(sections[i].target).attr('offset')) || 0);
                    }

                    if ($window.pageYOffset >= top && $window.pageYOffset <= Scroller.getOffset(sections[i].target).top + sections[i].target.offsetHeight) {
                        sections[i].element.addClass('is-active');
                    } else if ($window.pageYOffset < 0) {
                        sections[0].element.addClass('is-active');
                    } else {
                        sections[i].element.removeClass('is-active');
                    }
                };
            });

            element.bind('click', function(e) {
                e.preventDefault();

                if (attrs.noClick) return;

                if (attrs.scrollTo == parseInt(attrs.scrollTo)) {
                    var destination = parseInt(attrs.scrollTo)
                } else {
                    var target = document.getElementById(attrs.scrollTo);

                    if ( ! target) {
                        return;
                    }

                    var targetElem = angular.element(target);
                    var destination = (target.getBoundingClientRect().top + $window.pageYOffset) - (parseInt(targetElem.attr('offset')) || 0);
                }

                Scroller.scroll(destination);
            });
        }
    }
}