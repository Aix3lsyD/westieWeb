'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SeachCtrl
 * @description
 * # SeachCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SearchCtrl', function ($http) {

    this.getWestie = function(val){


      return $http.get('/api/userList/' + val)
        .then(function(result){
          return result.data;
        });
    };


    this.setWestie = function(val){

      //console.log(val.value);
      this.selectedUser = val.value;

    };

  });
