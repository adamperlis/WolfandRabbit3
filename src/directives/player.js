module.exports = function($rootScope, $animate, $timeout, Audio) {
	return {
		restrict: 'E',
		scope: {
			track: '=',
			audioCurrentTime: "=audioCurrentTime",
		},
		template: require('../html/partials/player.html'),
		controller:function($scope){

			$scope.toggleState = function() {
				Audio.toggleState()
			}

			$scope.onTimeUpdate = function () {
                var currTime = self.currentTime;
                if (currTime - $scope.audioCurrentTime > 0.5 || $scope.audioCurrentTime - currTime > 0.5) {
                    self.currentTime = $scope.audioCurrentTime;
                }
                $scope.$apply(function () {
                    $scope.audioCurrentTime = self.currentTime;
                });
            }

		},
		link: function(scope, element, attrs, ctrl) {
			Audio.notify.on('played paused', function() {
				scope.playing = !Audio.audioElement.paused
				console.log(Audio.track)
			})

		}
	}
}