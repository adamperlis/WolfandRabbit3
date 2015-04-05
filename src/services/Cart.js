module.exports = function($rootScope, $sce, Modals) {

	Stripe.setPublishableKey('pk_test_CW5yRHomB4M3eW4YmkU4BHAB');

	function checkout() {
		Stripe.card.createToken({
		  number: 4242424242424242,
		  cvc: 812,
		  exp_month: 10,
		  exp_year: 2020
		}, function(status, response){
			// look in stripe docs to charge a card using JS and the card token
			console.log(status, response)
		});
	}

	$rootScope.cart = {
		items: [],
		total: 0,
		subtotal: 0,
		taxes: 0
	}

	var taxRate = .08875;

	this.view = function() {
		// open a new modal and show this video
		Modals.open({
			template: require('../html/partials/customLicense.html'),
			customLicense: this,
			controller: function($scope) {
				console.log($scope)
			}
		})
	}

	this.add = function(item) {
		
		for (var i = 0; i < $rootScope.cart.items.length; i++) {			
			if ($rootScope.cart.items[i].id == item.id) {
				return false;
			}
		};

		$rootScope.cart.items.push(item);

		$rootScope.$broadcast("itemAddedToCart")

		updateTotals()
	}

	this.remove = function(item) {

		for (var i = 0; i < $rootScope.cart.items.length; i++) {
			if ($rootScope.cart.items[i].id == item.id) {
				
				$rootScope.cart.items.splice(i, 1);

				updateTotals()

				return false
			}
		};
	}

	function updateTotals() {

		$rootScope.cart.subtotal = 0;

		for (var i = 0; i < $rootScope.cart.items.length; i++) {
			$rootScope.cart.subtotal += $rootScope.cart.items[i].license.cost 

			if ($rootScope.cart.items[i].license.cost == "Custom") { //check if Custom, if so then display pop up to contact.
				console.log("custom")
			}
		};

		$rootScope.cart.taxes = $rootScope.cart.subtotal * taxRate

		$rootScope.cart.total = $rootScope.cart.taxes + $rootScope.cart.subtotal
	}

	this.getItems = function() {

		return $rootScope.cart.items
	}

	$rootScope.changedValue = function() {

  		updateTotals()
    }    

}