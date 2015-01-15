(function() {

    var app = angular.module('routeExample', ['ngRoute']);
        app.controller('MainController', ['$scope', '$http', '$route', '$routeParams', '$location', '$rootScope', function ($scope, $http, $route, $routeParams, $location, $rootScope) {

            !localStorage.getItem('storagedTransactions') ? $rootScope.transactions = [] : $rootScope.transactions = JSON.parse(localStorage.getItem('storagedTransactions'));

            if (!localStorage.getItem('storagedPayees')) {
                $http.get('/payees.json').
                    success(function (data, status, headers, config) {
                        $rootScope.payees = data;
                    }).
                    error(function (data, status, headers, config) {});
            }
            else {
                $rootScope.payees = JSON.parse(localStorage.getItem('storagedPayees'));
            }

            if(!localStorage.getItem('storagedAmount')) {
                $rootScope.amount = parseFloat(5821.98);
            }
            else {
                $rootScope.amount = parseFloat(localStorage.getItem('storagedAmount'));
            }

            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;

            $rootScope.$watchCollection('payees', function(){
                localStorage.setItem('storagedPayees', JSON.stringify($rootScope.payees));

            });
            $rootScope.$watchCollection('transactions', function(){
                localStorage.setItem('storagedTransactions', JSON.stringify($rootScope.transactions));
            });
            $rootScope.$watch('amount', function(){
                localStorage.setItem('storagedAmount', parseFloat($rootScope.amount));
            });

            console.log('main controller init');
        }]);

        app.controller('BalanceController', function ($scope, $routeParams) {
            $scope.name = "BalanceController";
            $scope.params = $routeParams;
        });

        app.controller('ChapterController', function ($scope, $routeParams) {
            $scope.name = "ChapterController";
            $scope.params = $routeParams;
        });

        app.controller('PaymentController', function ($scope, $routeParams) {
            $scope.name = "PaymentController";
            $scope.params = $routeParams;
        });

        app.config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/balance', {
                    templateUrl: 'balance.html',
                    controller: 'PayeeController'
                })
                .when('/payees', {
                    templateUrl: 'payees.html',
                    controller: 'PayeeController'
                })
                .when('/payee/new', {
                    templateUrl: 'payee.html',
                    controller: 'PayeeController'
                })
                .when('/payee/:id/edit', {
                    templateUrl: 'payee.html',
                    controller: 'PayeeController'
                })
                .when('/transactions/new', {
                    templateUrl: 'new_transaction.html',
                    controller: 'PaymentController'
                });

            // configure html5 to get links working on jsfiddle
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        });
        app.controller('RenderPayeesList', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
            $scope.name = "RenderPayeesList";

        }]);
        app.controller('RenderTransactionsList', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
            $scope.name = "RenderTransactionsList";
        }]);


        app.controller('PayeeController', ['$scope', '$routeParams', '$rootScope', '$location', function ($scope, $routeParams, $rootScope, $location) {
            $scope.name = "PayeeController";
            $scope.params = $routeParams;

            $scope.newPayeeId = (new Date).toString().split(' ').join(''); //or (new Date).toISOString; //or (new Date).getTime()
            $scope.newPayeeName = '';
            $scope.newNameOfBank = '';
            $scope.newIBAN = '';


            if ($location.path() == '/payee/new') {
                $scope.value = 'Create';
                $scope.nameAddEdit = 'Add a new payee';
                $scope.bankAddEdit = 'Name of bank';
                $scope.ibanAddEdit = 'IBAN';
            } else {
                $scope.value = 'Edit';
                $scope.nameAddEdit = 'Edit payee name';
                $scope.bankAddEdit = 'Edit name of bank';
                $scope.ibanAddEdit = 'Edit IBAN';
            }

            $scope.submitPayee = function(){
                if ($location.path() == '/payee/new') {
                    alert('fdp-test');
                    // var payee = {
                    //     payeeId: $scope.newPayeeId,
                    //     name: $scope.newPayeeName,
                    //     nameOfBank: $scope.newNameOfBank,
                    //     cardNumber: $scope.newIBAN
                    // };
                    // $rootScope.payees.push(payee);
                    //localStorage.setItem('payees', $rootScope.payees);
                    //$location.path('/payees');
                } else {
                    for(var i=0; i<($scope.payees).length; i++)
                        if($scope.payees[i].payeeId == $routeParams.id) {
                            $scope.payees[i].name = $scope.newPayeeName;
                            $scope.payees[i].nameOfBank = $scope.newNameOfBank;
                            $scope.payees[i].cardNumber = $scope.newIBAN;
                        };
                    $location.path('/payees');
                };

            };
            for(var i=0; i<($scope.payees).length; i++)
                if($scope.payees[i].payeeId == $routeParams.id) {
                    $scope.newPayeeName = $scope.payees[i].name;
                    $scope.newNameOfBank = $scope.payees[i].nameOfBank;
                    $scope.newIBAN = $scope.payees[i].cardNumber;
                }
        }]);

        app.controller('transferController', ['$scope', '$routeParams', '$rootScope', '$location', function ($scope, $routeParams, $rootScope, $location) {
            $scope.name = "selectController";
            $scope.myPayee = $scope.payees[0];
            $scope.transferCardNumber = $scope.myPayee.cardNumber;
            $scope.transferBankName = $scope.myPayee.nameOfBank;

            $scope.change = function(){
                $scope.transferCardNumber = $scope.myPayee.cardNumber;
                $scope.transferBankName = $scope.myPayee.nameOfBank;
            };
            $scope.inwork = true;
            $scope.submitTransfer = function() {
                var transaction = {
                    payeeId: $scope.myPayee.payeeId,
                    name: $scope.myPayee.name,
                    transferBankName: $scope.myPayee.nameOfBank,
                    transferCardNumber: $scope.myPayee.cardNumber,
                    transferSum: $scope.transferSum,
                    transactionID: (new Date).getTime()
                };
                if(parseInt($scope.transferSum)) {
                    if($rootScope.amount < $scope.transferSum){
                        alert('Your do not have enough money on your amount to make such transaction.')
                    }
                    else {
                        $rootScope.transactions.push(transaction);
                        $rootScope.amount -= $scope.transferSum;
                        $scope.inwork = false;
                        }
                    }
                else {
                    alert('Make sure, that you have put a numeric value of money amount.')
                }

            }
        }]);


})();
