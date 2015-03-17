module.exports = function($rootScope) {

	$rootScope.items = [];

	this.add = function(item) {
		
		for (var i = 0; i < $rootScope.items.length; i++) {			
			if ($rootScope.items[i].id == item.id) {
				return false;
			}
		};

		$rootScope.items.push(item);
	}

	this.slice = function(item) {



		var index = $rootScope.items.indexOf(item);
		console.log(index)
		$rootScope.items.splice(index,1);

		console.log($rootScope.items)
	}

	this.getItems = function(){
		return $rootScope.items
	}

}