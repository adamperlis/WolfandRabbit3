module.exports = function($scope) {
    $scope.card = {};

    Stripe.setPublishableKey('pk_test_CW5yRHomB4M3eW4YmkU4BHAB');

    $scope.$watch('card.number', function(cardnumber) {
        if (cardnumber) {

            // $scope.card.number.$invalid = (Stripe.card.validateCardNumber(cardnumber) ? false : true);
            var type = Stripe.card.cardType(cardnumber);

            $scope.cardType = (type == 'Unknown') ? '' : type;
        }
    })


    $scope.submit = function() {

        if ( ! Stripe.card.validateCardNumber($scope.card.number)) {
            $scope.error = "invalid card";
            return false;
        }

        if (this.checkout.$invalid) {
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