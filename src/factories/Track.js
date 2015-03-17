module.exports = function(Cart, $filter) {
	var addToCart = function() {
		Cart.add(this)
	}

	var removeFromCart = function() {
		Cart.slice(this)
		console.log(this)
	}

	var getCost = function() {

	}

	var Track = function(data) {

		data.addToCart = addToCart;

		data.removeFromCart = removeFromCart;

		for (var i = 0; i < data.licenses.length; i++) {
			if ( Number(data.licenses[i].cost)===data.licenses[i].cost && data.licenses[i].cost%1===0 ) {
				data.licenses[i].cost = $filter('currency')(data.licenses[i].cost)
			}
		};

		data.license = data.licenses[0]

		return data
	}

	return Track
}