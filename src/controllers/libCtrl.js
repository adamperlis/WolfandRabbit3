module.exports = function($scope, $state, Tracks, $timeout){
	Tracks.getTracks().then(function(tracks){
		console.log(tracks)
		$scope.tracks = tracks
	})

	$scope.filter = function(tag){
		$scope.$evalAsync(function() {
			$scope.filtered = tag
		})
	}
	
    $scope.animation={fadeInUpOut:false};
    $scope.fadeInUpOut=function(){
      $scope.animation.fadeInUpOut=true;
      $timeout(function(){
        $scope.animation.fadeInUpOut=false;
      },2000,true);
    }

}