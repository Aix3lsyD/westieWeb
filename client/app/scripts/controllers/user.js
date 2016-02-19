'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('UserCtrl', function ($state, $stateParams, WCSUser, AuthSvc) {

    var userLoggedIn = false;

    if(AuthSvc.forAuth().$getAuth()){
      userLoggedIn = true;
    }


    var ctrl = this;

    ctrl.data = WCSUser.get({id: $stateParams.id});
    ctrl.dancer = angular.fromJson(this.data);

    var dancerData = ctrl.dancer;

    ctrl.results = ctrl.dancer.results;

    console.log(ctrl.dancer);

    ctrl.selectedRow = null;
    ctrl.selectedTab = 'Leader';
    ctrl.selectedDivison = null;


    ctrl.userLoggedIn = function(){

      return userLoggedIn;

    };


    ctrl.setSelectedRow = function(idSelectedRow){
      ctrl.selectedRow = idSelectedRow;
    }



    ctrl.setSelectedTab = function(tab){

      ctrl.selectedTab = tab;

    };

    ctrl.setSelectedDivision = function(division){

      ctrl.selectedDivison = division;

    };


    ctrl.setSelected = function(row, tab, division){

      ctrl.setSelectedRow(row);
      ctrl.setSelectedDivision(division);
      ctrl.setSelectedTab(tab);

      //printSelected();
    };

    var printSelected = function(){

      console.log("Row: " + ctrl.selectedRow);
      console.log("Division: " + ctrl.selectedDivison);
      console.log("Tab: " + ctrl.selectedTab);

    };

    ctrl.isSelected = function(row,tab, division){

      var bRow = (row == ctrl.selectedRow);
      var bTab = (tab == ctrl.selectedTab);
      var bDivision = (division == ctrl.selectedDivison);

      return bRow && bTab && bDivision

    };

    ctrl.addHighlight = function(division, event, placement){

      var myData = {

        event: event,
        placement: placement,
        division: division,
        comp: "1"

      }

      $state.go('addPlacement', {data: myData});

      console.log(dancerData.results[0]);

    }


  });
