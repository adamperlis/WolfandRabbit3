module.exports = function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode(true).hashPrefix('!')

	$stateProvider.state('home', {
		url: '/',
		views: {
			'default': {
				templateUrl: '../src/html/home.html',
				controller: 'homeCtrl'
			}
		}
	})

	$stateProvider.state('library', {
		url: '/library',
		views: {
			'default': {
				templateUrl: '../src/html/library.html',
				controller: 'libCtrl'
			}
		}
	})
}