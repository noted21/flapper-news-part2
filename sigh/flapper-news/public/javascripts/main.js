var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {templeteUrl: 'partial/home.html'})
    .when('/login', {
        templeteUrl: 'partials/login.html',
        controller: 'loginController',
        access: {restricted: false}
    })
    
    .when('/logout', {
        controller: 'logoutController',
        access: {restricted: true}
    })
    
    .when('/register', {
        templeteUrl: 'partials/register.html',
        controller: 'registerController',
        access: {restricted: false}
    })
    
    .when('/one', {
        templete: '<h1>This is page one!</h1>',
        access: {restricted: false}
    })
    
    .when('/two', {
        templete: '<h1>This is page two!</h1>',
        access: {restricted: false}
    })
    .otherwise({redirectTo: '/'});
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        
        console.log(next);
        
        if (next.access.restricted && AuthService.isLoggedIn() === false) {
            $location.path('/login');
        }
    });
});