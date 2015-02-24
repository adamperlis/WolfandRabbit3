module.exports = function($resource, $q, Video) {  

	var resource = $resource('http://vimeo.com/api/v2/user/:username/videos.json', {}, {
		get: { 
			method: 'GET',
			isArray : true,
		}
	})

	this.getVideosByUserName = function(username) {
		var deferred = $q.defer();

		resource.get({
			username: username
		}, function(response) {
			for (var i = response.length - 1; i >= 0; i--) {
				response[i] = new Video(response[i])
			};
			deferred.resolve(response);
		})

		return deferred.promise;
	}

}