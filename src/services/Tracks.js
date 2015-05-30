module.exports = function($resource, $q, Track) { 
	var resource = $resource('/api/tracks', {}, {
		get: { 
			method: 'GET',
		}
	})

	this.getTracks = function() {
		var deferred = $q.defer();

		resource.get({}, function(response) {
			console.log(response)
			for (var i = response.data.length - 1; i >= 0; i--) {
				response.data[i] = new Track(response.data[i])
			};
			deferred.resolve(response.data);
		})

		return deferred.promise;
	}
}
