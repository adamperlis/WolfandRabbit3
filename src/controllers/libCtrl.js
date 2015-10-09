module.exports = function($scope, $state, Tracks, $animate, Tags){
	$scope.filtered = [];

	Tracks.getTracks().then(function(tracks){
		console.log(tracks)
		$scope.tracks = tracks
	})

	Tags.getTags().then(function(tags){
		console.log(tags)
		$scope.tags = tags
	})

	$scope.play = function(track) {	
		// console.log(track)	
		$scope.currentTrack = track
	}
	

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