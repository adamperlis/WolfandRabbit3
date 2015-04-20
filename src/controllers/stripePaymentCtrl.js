module.exports = function($scope, $http, $rootScope) {
    $scope.card = {};

    Stripe.setPublishableKey('pk_test_CW5yRHomB4M3eW4YmkU4BHAB');

    $scope.$watch('card.number', function(cardnumber) {
        if (cardnumber && $scope.checkout) {
            $scope.checkout.number.$invalid = (Stripe.card.validateCardNumber(cardnumber) ? false : true);
        }

        if (cardnumber) {
            var type = Stripe.card.cardType(cardnumber);

            $scope.cardType = (type == 'Unknown') ? '' : type;
        }
    })

    $scope.submit = function() {

        $scope.error = ''
        $scope.success = false


        console.log(this)
       
        $scope.checkout = this.checkout

        $scope.checkout.number.$setValidity('card', (Stripe.card.validateCardNumber($scope.card.number) ? true : false));

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
                }).success(function() {
                    $scope.success = true
                    console.log('Server success')
                }).error(function() {
                    console.log('Server fail')
                })
            } else {
                $scope.$evalAsync(function() {
                    $scope.error = response.error.message
                })
            }
        });
    }

}