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

    var ctrl = this;
    var userLoggedIn = false;



    if(AuthSvc.forAuth().$getAuth()){
      userLoggedIn = true;
    }

    var getRunningPoints = function(data){
      var i;
      var advancedData;

      for(i = 0; i < data.length; i++){
        if(data[i].name == 'Advanced'){
          advancedData = data[i];
          break;
        }
      }

      var d = new Date();
      var day = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear() - 3;

      var newDate = new Date(month + '/' + day + '/' + year);

      //console.log("3 years ago:" + newDate);

      var j;
      for(j = 0; j < advancedData.follower_placements.length; j++ ){
        var a = new Date(advancedData.follower_placements[j].end_date);
        if(a>=newDate) {
          ctrl.runningAdvancedFollower += parseInt(advancedData.follower_placements[j].points);
        }
      }

      ctrl.results[0]["divisions"][i].followerRunningPoints = ctrl.runningAdvancedFollower

      var k;
      for(k = 0; k < advancedData.leader_placements.length; k++ ){
        var a = new Date(advancedData.leader_placements[k].end_date);
        if(a>=newDate) {
          ctrl.runningAdvancedLeader += parseInt(advancedData.leader_placements[k].points);
        }
      }

      ctrl.results[0]["divisions"][i].leaderRunningPoints = ctrl.runningAdvancedLeader;

      //console.log(advancedData);
      //console.log("Running leader points: " + ctrl.runningAdvancedLeader);


      //console.log(ctrl.results[0]);

    };

    //ctrl.dancer;
      ctrl.isFollower = false;

    ctrl.data = WCSUser.get({id: $stateParams.id});
    ctrl.data.$promise.then(function(result){
      ctrl.dancer = angular.fromJson(result);
      ctrl.results = ctrl.dancer.results;
        //console.log(ctrl.results);
        getRunningPoints(ctrl.dancer.results[0]["divisions"]);
        ctrl.isFollower = (ctrl.dancer.results[0]["divisions"][0].follower_points > ctrl.dancer.results[0]["divisions"][0].leader_points);
    });

    var runningPoints = 0;

    ctrl.selectedRow = null;
    ctrl.selectedTab = 'Leader';
    ctrl.selectedDivison = null;
    ctrl.runningAdvancedLeader = 0;
    ctrl.runningAdvancedFollower = 0;



     //ctrl.isFollower = function(){
     //
     //    ctrl.isFollower = (ctrl.dancer.results[0]["divisions"][0].follower_points > ctrl.dancer.results[0]["divisions"][0].leader_points);
     //
     //};

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

      };

      $state.go('addPlacement', {data: myData});

      console.log(dancerData.results[0]);

    };



  });
