module.exports = function() {
	return function(data, key, filter) {
		// console.log(data, key, filter) 
		if(!data) return

		return data.filter(function(value) {
			
			for (var i = filter.length - 1; i >= 0; i--) {

				var compare = (function() {
					for (var x = value[key].length - 1; x >= 0; x--) {
						if (value[key][x].toLowerCase() == filter[i].toLowerCase()) {
							return true;
						}
					};

					return false;
				})();

				if ( ! compare) return false;
			};

			return true

		});

	}
}