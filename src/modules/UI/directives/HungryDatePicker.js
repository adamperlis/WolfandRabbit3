module.exports = function(Modals) {
    return {
        restrict: 'A',
        scope: {
            select: '&'
        },
        link: function($scope, element, attrs) {

            var select = $scope.select;

            element.bind('focus', function() {
                Modals.open({
                    templateUrl: '/html/UI/HungryDatePicker.html',
                    controller: function($scope, ModalInstance) {
                        var moment = require('moment');
                        var start = new moment();

                        $scope.current = start;

                        var draw = (function draw() {
                            var days = [],
                                date = 1,
                                weeks = [];

                            while (moment($scope.current).date(date).subtract(1, 'days').months() == moment($scope.current).date(date).months() || date == 1) {

                                var weekday = moment($scope.current).date(date);

                                if (weekday.isoWeeks() != weekday.add(1, 'days').isoWeeks()) {
                                    if ( ! weeks.length) {
                                        var lastMonthsLastDays = []
                                        for (var i = 0; i < 7 - days.length; i++) {
                                            lastMonthsLastDays.push(moment($scope.current).date(0 - i));
                                        };

                                        if (lastMonthsLastDays.length < 7) {
                                            days = lastMonthsLastDays.reverse().concat(days);
                                        }
                                    }

                                    if (days.length > 0) {
                                        weeks.push(days);
                                    }

                                    var days = [];
                                }
                                
                                days.push(moment($scope.current).date(date));
                                date++
                            }

                            // Any leftover days of the month
                            if (days) {
                                weeks.push(days);
                            }

                            // fill the end of the calendar-looking month
                            if (weeks[weeks.length - 1].length < 7) {
                                var difference = 7 - weeks[weeks.length - 1].length

                                for (var i = 0; i < difference ; i++) {
                                    weeks[weeks.length - 1].push(moment($scope.current).add(1, 'months').date(i+1));
                                };
                            }

                            $scope.$evalAsync(function() {
                                $scope.weeks = weeks;
                            });

                            return draw;
                        })();

                        var disablePrev = (function disablePrev() {

                            if (moment($scope.current).subtract(1, 'months').isBefore($scope.minDate || start)) {
                                $scope.disablePrev = true;
                            } else {
                                $scope.disablePrev = false;
                            }

                            return disablePrev;
                        })();

                        $scope.select = function(selectedDate) {
                            select({selectedDate: selectedDate});
                            ModalInstance.close();
                        }

                        $scope.go = function(amount, unit) {
                            $scope.current = moment($scope.current).add(amount, unit);

                            disablePrev();
                            draw();
                        }

                    },
                })
            })
        }
    }
}