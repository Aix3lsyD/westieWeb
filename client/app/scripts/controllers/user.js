'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('UserCtrl', function ($stateParams, WCSUser) {

    this.data = WCSUser.get({id: $stateParams.id});
    this.dancer = angular.fromJson(this.data);
    this.results = this.dancer.results;

    console.log();

    console.log(this.data.results);
    //console.log(this.dancer.results[0])

  });
