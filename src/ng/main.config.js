(function () {
    "use strict";
    var app = angular.module("mainApp", [
    'ui.router',
    'ngRoute',
    'oc.lazyLoad'
    
]);
    app.config(['$stateProvider', '$urlRouterProvider', '$routeProvider', '$locationProvider', '$httpProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $httpProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true
        });
        //$rlRouterProvider.otherwise("/dashboard/home");
        var version = "?bust=" + (new Date()).getTime();
        const config = {
            'version': '8.6'
        }
        $urlRouterProvider.otherwise("/login");
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'ng/directives/login.tpl.html' + version,
            controller: "loginController",
            caseInsensitiveMatch: true,
            authenticate: false,
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                            name: 'mainApp',
                            files: [
                    'ng/controllers/login.controller.js',
                    'ng/services/auth.service.js'
                    ]
                        }),
                        $ocLazyLoad.load({
                            name: 'toggle-switch',
                            files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                        }),
                        $ocLazyLoad.load({
                            name: 'icon-fonts',
                            files: [
                            "bower_components/font-awesome/css/font-awesome.min.css"
                                ]
                        }),
                        $ocLazyLoad.load({
                            name: 'ngAnimate',
                            files: ['bower_components/angular-animate/angular-animate.js']
                        })
                    $ocLazyLoad.load({
                        name: 'ngCookies',
                        files: ['bower_components/angular-cookies/angular-cookies.js']
                    })
                    $ocLazyLoad.load({
                        name: 'ngResource',
                        files: ['bower_components/angular-resource/angular-resource.js']
                    })
                    $ocLazyLoad.load({
                        name: 'ngSanitize',
                        files: ['bower_components/angular-sanitize/angular-sanitize.js']
                    })
                    $ocLazyLoad.load({
                        name: 'ngAnimate',
                        files: ['bower_components/angular-animate/angular-animate.min.js']
                    })
                    $ocLazyLoad.load({
                        name: 'angular-loading-bar',
                        files: [
                            'bower_components/angular-loading-bar/build/loading-bar.min.js',
                            'bower_components/angular-loading-bar/build/loading-bar.min.css',
                        ]
                    })
                }
            }
        }).state('dashboard', {
            url: '/dashboard',
            templateUrl: 'ng/directives/dashboard.tpl.html' + version,
            caseInsensitiveMatch: true,
            authenticate: false,
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                            name: 'mainApp',
                            files: [
                    'ng/controllers/login.controller.js',
                    ]
                        }),
                        $ocLazyLoad.load({
                            name: 'icon-fonts',
                            files: [
                            "bower_components/font-awesome/css/font-awesome.min.css"
                                ]
                        })
                    $ocLazyLoad.load({
                            name: 'toggle-switch',
                            files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                        }),
                        $ocLazyLoad.load({
                            name: 'ngAnimate',
                            files: ['bower_components/angular-animate/angular-animate.js']
                        })
                    $ocLazyLoad.load({
                        name: 'ngCookies',
                        files: ['bower_components/angular-cookies/angular-cookies.js']
                    })
                    $ocLazyLoad.load({
                        name: 'ngResource',
                        files: ['bower_components/angular-resource/angular-resource.js']
                    })
                    $ocLazyLoad.load({
                        name: 'ngSanitize',
                        files: ['bower_components/angular-sanitize/angular-sanitize.js']
                    })
                    $ocLazyLoad.load({
                        name: 'ngAnimate',
                        files: ['bower_components/angular-animate/angular-animate.min.js']
                    })
                    $ocLazyLoad.load({
                        name: 'angular-loading-bar',
                        files: [
                            'bower_components/angular-loading-bar/build/loading-bar.min.js',
                            'bower_components/angular-loading-bar/build/loading-bar.min.css',
                        ]
                    })
                }
            }
        }).state('dashboard.home', {
            url: '/home',
            templateUrl: 'ng/directives/home.tpl.html' + version,
            controller: "mainController",
            caseInsensitiveMatch: true,
            authenticate: true,
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        files: ['ng/controllers/main.controller.js']
                    })
                }
            }
        }).state('dashboard.user', {
            url: '/user',
            authenticate: false,
            templateUrl: 'ng/directives/user.tpl.html' + version,
            caseInsensitiveMatch: true,
        });
  }]);
    app.run(function ($rootScope) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            console.log(event);
            console.log(current);
            console.log(next);
            console.log('$routeChangeStart: ' + next.originalPath)
        });
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate && !AuthService.isAuthenticated()) {
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    });
})();
