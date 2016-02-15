'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('EventsCtrl', function (WCSEvents) {

    var ctrl = this;

    ctrl.data = WCSEvents.get();
    ctrl.events = angular.fromJson(this.data);

    ctrl.results = ctrl.events.results;

    console.log(ctrl.results);
  });
