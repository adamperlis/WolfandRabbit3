module.exports = function($rootScope, $sce, Modals, $http) {

	this.apiKey = "foobar";

	this.view = function() {
		// open a new modal and show this video
		Modals.open({
			template: require('../html/partials/stripe.html'),
			stripe: this,
            controller: 'stripeCheckoutCtrl'
		})
	}
}