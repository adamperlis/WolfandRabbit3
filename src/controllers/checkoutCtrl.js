module.exports = function($scope, $state, Tracks, Stripe){
	Tracks.getTracks().then(function(tracks){
		console.log(tracks)
		$scope.tracks = tracks
	})

	$scope.filter = function(tag){
		$scope.$evalAsync(function() {
			$scope.filtered = tag
		})
	}

	console.log(Stripe)

	$scope.stripe = Stripe

}