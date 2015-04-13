module.exports = function($rootScope, $sce, Modals, $http) {

	this.apiKey = "foobar";

	this.view = function() {
		// open a new modal and show this video
		Modals.open({
			template: require('../html/partials/stripe.html'),
			stripe: this,
			checkoutform: {},
			controller: function($scope) {

				$scope.card = {};

				Stripe.setPublishableKey('pk_test_CW5yRHomB4M3eW4YmkU4BHAB');

				$scope.$watch('card.number', function(cardnumber) {
					if (cardnumber) {
						// console.log(Stripe.card.validateCardNumber(cardnumber))

						console.log($scope)

						// $scope.card.number.$invalid = (Stripe.card.validateCardNumber(cardnumber) ? false : true);

						// console.log(Stripe.card.cardType(cardnumber))
					}
				})


				$scope.submit = function(checkoutform) {
					$scope.checkoutform = checkoutform;

					if (checkoutform.$invalid) {
						return;
					}

					Stripe.card.createToken({
					  number: $scope.card.number,
					  cvc: $scope.card.cvc,
					  exp_month: $scope.card.exp_month,
					  exp_year: $scope.card.exp_year
					}, function(status, response){
						//add form validation
						if (status == 200) {
							console.log("success")

							$http.post('/charge', {
								token: response.id,
								amount: $rootScope.cart.total
							}).success().error()
						} else {
							$scope.$evalAsync(function() {
								$scope.error = response.error.message
							})
						}
					});
				}
			}
		})
	}
}