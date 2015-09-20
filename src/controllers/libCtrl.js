module.exports = function($scope, $state, Tracks, $animate){
	$scope.filtered = [];

	Tracks.getTracks().then(function(tracks){
		console.log(tracks)
		$scope.tracks = tracks
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