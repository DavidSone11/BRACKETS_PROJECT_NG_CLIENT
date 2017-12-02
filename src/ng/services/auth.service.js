' use strict';
/**
 * Author      : Santosh
   Date Created: 6 NOV 17
   Description : To handle the Factory for Login module
 */


var app = angular.module('mainApp');
app.factory('AuthenticateFactory', ['$http', '$q', '$state', '$window', '$location', function ($http, $q, $state, $window, $location) {



    return {
        isLoggedIn: false,
        plan:"",
        user:"",
        role:"",
        checkIsLoggedIn: function () {
            if ($window.sessionStorage["token"] && $window.sessionStorage["user"]) {
                isLoggedIn = true;
            } else {
                isLoggedIn = false;
                delete this.user;

            }
            return (isLoggedIn) ? isLoggedIn : false;
        },
        login: function (username, password) {
            return $http.post("/api/v1/auth", {
                username: username,
                password: password
            });
        },
        logout: function () {

            if (isLoggedIn) {

                isLoggedIn = false;
                delete user;
                delete role;
                delete plan;
                delete $window.sessionStorage["plan"];
                delete $window.sessionStorage["token"];
                delete $window.sessionStorage["user"];
                delete $window.sessionStorage["role"];
                $state.go("login");
            }

        }

    }

}]);
