module.exports = function($rootScope) {

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

	this.add = function(item) {
		
		for (var i = 0; i < $rootScope.cart.items.length; i++) {			
			if ($rootScope.cart.items[i].id == item.id) {
				return false;
			}
		};



		$rootScope.cart.items.push(item);

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
		};

		$rootScope.cart.taxes = $rootScope.cart.subtotal * taxRate

		$rootScope.cart.total = $rootScope.cart.taxes + $rootScope.cart.subtotal
	}

	this.getItems = function(){
		return $rootScope.cart.items
	}

}