module.exports = function($resource, $q) {
	var resource = $resource('/api/tags', {}, {
		get: {
			method:'GET'
		}
	})

	this.getTags = function() {
		var deferred = $q.defer();

		resource.get({}, function(response){
			// console.log(response);
			deferred.resolve(response.data);
		})

		return deferred.promise;
	}
}