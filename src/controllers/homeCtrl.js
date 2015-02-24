module.exports = function($scope, $state, $resource, Videos) {

	$scope.message = 'Hello Adam Perlis'

	Videos.getVideosByUserName('user15769322').then(function(data) {
		console.log(data);
		$scope.videos = data
	})

}