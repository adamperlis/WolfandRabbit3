module.exports = function(Cart, $filter) {
	var addToCart = function() {
		Cart.add(this)
	}

	var removeFromCart = function() {
		Cart.remove(this)
	}

	var getCost = function() {

	}

	return function(data) {
		var tags = [];

		data.addToCart = addToCart;

		data.removeFromCart = removeFromCart;

		data.license = data.licenses[0]

        for (var i = data.tags.length - 1; i >= 0; i--) {
        	tags.push(data.tags[i].tag);
        };

        data.tags = tags;

		return data
	}
}