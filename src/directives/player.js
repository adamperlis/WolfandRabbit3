module.exports = function($rootScope, $animate, $timeout) {
	return {
		restrict: 'E',
		controller:function($scope){
			var audio = document.getElementById("track"); 

			function play() { 
			    audio.play(); 
			} 

			function pause() { 
			    audio.pause(); 
			}
		},
		link: function($scope, element, attrs, ctrl) {
			$rootScope.$on("play", function() {
				
				})
			
			})
			
		}
	}
}