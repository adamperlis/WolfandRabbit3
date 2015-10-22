module.exports = function(Audio) {
	return {
		restrict: 'E',
		require: '^player',
		link: function(scope, element, attrs, playerController) {
			Audio.setAudioElement(element[0])
		}
	}
}