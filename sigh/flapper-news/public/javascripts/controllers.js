angular.module('myApp').controller('loginController',
    ['scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {
        console.log(AuthService.getUserStatus());
        
        $scope.login = function () {
            $scope.error = false;
            $scope.disabled = true;
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
            
            .then(function () {
                $location.path('/');
                $scope.disabled = false;
                $scope.loginForm = {};
            })
            
            .catch(function () {
                $scope.error = true;
                $scope.errorMessage = "Invalid Username and/or Password";
                $scope.disabled = false;
                $scope.loginForm = {};
            });
        };
    }]);
    
angular.module('myApp').controller('registerController',
    ['$scope, $location, AuthService',
    function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());
    
    $scope.register = function () {
        $scope.error = false;
        $scope.disabled = true;
        AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        
        .then(function () {
            $location.path('/login');
            $scope.disabled = false;
            $scope.registerForm = {};
        })
        .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Something went Wrong!";
            $scope.disabled = false;
            $scope.registerForm = {};
        });
    };
    }]);