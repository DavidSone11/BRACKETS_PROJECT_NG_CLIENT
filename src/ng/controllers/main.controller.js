var app = angular.module("mainApp");
app.controller("mainController", function ($scope, $http) {
    $scope.message = "RequireJs Integrated successfully";
    $scope.createUser = function () {
        var user = {
            username: "santosh",
            password: "123456"
        }
        var url = "/api/v1/user";
        $http({
            method: 'POST',
            url: url,
            data: user,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function success(successresponse) {
            console.log("dsada" + successresponse + "santosh");
        }, function error(errorresponse) {});
    }
});
