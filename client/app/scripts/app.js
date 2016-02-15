'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'firebase'
  ])

  /*
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
*/

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home',
        {
          url: '/home',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs:'main'
        })
      .state('about',
        {
          url: '/about',
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
      .state('points',
        {
          url: '/points',
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl',
          controllerAs: 'search'
        })
      .state('user',
        {
          url: '/user/:id/view',
          templateUrl: 'views/user.html',
          controller: 'UserCtrl',
          controllerAs: 'user'
        })
      .state('events',
        {
          url: '/events/view',
          templateUrl: 'views/events.html',
          controller: 'EventsCtrl',
          controllerAs: 'events'
        });

}).constant("FIREBASE_URL", "https://westie.firebaseio.com");
