var app = angular.module("mainApp");
app.controller("loginController", function ($scope, $http,$location,AuthenticateFactory) {
    
     $scope.isLoggedIn = AuthenticateFactory.checkIsLoggedIn();
    
    console.log($scope.isLoggedIn);
    
    $scope.login = function () {
        var user = {
            username: "santosh",
            password: "123456"
        }
       
        
        $location.path("/dashboard/home");
        
    }
});
