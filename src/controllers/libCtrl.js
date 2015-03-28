module.exports = function($scope, $state, Tracks, $animate){
	Tracks.getTracks().then(function(tracks){
		console.log(tracks)
		$scope.tracks = tracks
	})

	$scope.filter = function(tag){
		$scope.$evalAsync(function() {
			$scope.filtered = tag
		})
	}

}