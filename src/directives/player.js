module.exports = function($rootScope, $animate, $timeout) {
	return {
		restrict: 'E',
		scope: {
			track: '=',
		},
		template: require('../html/partials/player.html'),
		controller:function($scope){
			var self = this;

			this.setAudioElement = function(e) {
				self.audioElement = e;
			}

			this.play = function() {
				self.audioElement.load()
				self.audioElement.play()
				$scope.$evalAsync(function() {
					$scope.playing = true;				
				})
			}

			$scope.pause = function() {
				console.log('Pause!')
				self.audioElement.pause()
				$scope.$evalAsync(function() {
					$scope.playing = false;
				});
			}
		},
		link: function(scope, element, attrs, ctrl) {
			scope.playing = false;
		}
	}
}