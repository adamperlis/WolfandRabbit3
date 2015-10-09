module.exports = function() {
	return {
		restrict: 'E',
		require: '^player',
		link: function(scope, element, attrs, playerController) {
			playerController.setAudioElement(element[0])

			scope.$watch('track', function(track) {
				if (track) {
					playerController.play();
				}
			})

		}
	}
}