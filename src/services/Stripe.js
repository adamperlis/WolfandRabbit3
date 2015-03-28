module.exports = function($sce, Modals) {

	this.apiKey = "foobar";

	this.view = function() {
		// open a new modal and show this video
		Modals.open({
			template: require('../html/partials/stripe.html'),
			stripe: this,
			controller: function($scope) {
				console.log($scope)
			}
		})
	}
}