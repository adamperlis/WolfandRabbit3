module.exports = function($scope, $state, Tracks, $animate, Tags, Audio){
	$scope.filtered = [];

	Tracks.getTracks().then(function(tracks){
		console.log(tracks)
		$scope.tracks = tracks
	})

	Tags.getTags().then(function(tags){
		console.log(tags)
		$scope.tags = tags
	})

	$scope.toggleState = function(track) {	
		Audio.toggleState(track)
	}

	$scope.playing = Audio.playing
	
	Audio.notify.on('played paused', function(e) {
		if (e == "played") {
			$scope.playing = Audio.track
		} else {
			$scope.playing = null;
		}
	})


	$scope.filter = function(tag){
		$scope.$evalAsync(function() {

			var index = $scope.filtered.indexOf(tag)

			if ( index > -1){
				$scope.filtered.splice(index, 1)
			} else {
				$scope.filtered.push(tag);
			}
		})
	}

}