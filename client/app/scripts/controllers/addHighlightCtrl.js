/**
 * Created by evansk on 2/16/2016.
 */

angular.module('clientApp')
  .controller('AddPlacementCtrl', function ($state, placementSvc) {

    //console.log($state.params);


    var ctrl = this;

    //console.log(placementSvc.forUser());
    //console.log("test controller load");

      ctrl.division = $state.params.data ? $state.params.data.comp : ''

      if($state.params.data){

        switch($state.params.data.placement){
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
                ctrl.placement = $state.params.data.placement.toString();
                //console.log("switch ran");
                break;
          default:
                ctrl.placement = '6';
                break;
        }

      }

      console.log($state.params.data.placement)

      //ctrl.placement = ''
      ctrl.partner = ''
      ctrl.event = $state.params.data ? $state.params.data.event : ''
      ctrl.video = ''
      ctrl.security = ''

    console.log(ctrl.division);

    var hightLight =  {

      divison: ctrl.divison,
      placement: ctrl.placement,
      partner : ctrl.partner,
      event: ctrl.event,
      video: ctrl.video,
      security :ctrl.security

    };


    ctrl.addHighlight = function(data){

      placementSvc.forUser().ref.push(data);
      console.log(placementSvc.forUser().array);

    };



    ctrl.saveHighlight = function(){

       hightLight =  {
        division: ctrl.division,
        placement: ctrl.placement,
        partner : ctrl.partner,
        event: ctrl.event,
        video: ctrl.video,
        security :ctrl.security

      };

      console.log("saveHighlight called");
      ctrl.addHighlight(hightLight);
    }


  });
