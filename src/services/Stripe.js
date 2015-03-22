module.exports = function($sce, Modals) {

	var view = function() {
		// open a new modal and show this video
		Modals.open({
			template: require('../html/partials/stripe.html'),
			stripe: this
		})
	}

	var Stripe = function(data) {

		this.view = view;
		console.log(view)

	}
}