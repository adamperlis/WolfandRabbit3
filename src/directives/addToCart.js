module.exports = function($rootScope, $animate, $timeout) {
	return {
		restrict: 'C',
		link: function($scope, element, attrs) {
			$rootScope.$on("itemAddedToCart", function() {
				$animate.addClass(element, 'added').then(function(){
					// element.removeClass('added')

					$timeout(function() {
						$animate.removeClass(element, 'added')
					}, 1)

					// console.log("item added")
				})
			
			})
			
		}
	}
}