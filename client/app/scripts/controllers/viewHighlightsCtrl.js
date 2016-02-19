angular.module('clientApp')
  .controller('viewHighlightsCtrl', function(placementSvc, AuthSvc) {

    var baseurl = 'http://img.youtube.com/vi/';

    var ctrl = this;

    var user = AuthSvc.forDisplay().displayName;


    ctrl.highlights = placementSvc.forUser().array;
    //console.log(ctrl.highlights);

    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    ctrl.getThumbnail = function(link){

      var videoID = getParameterByName('v',link)
      if(videoID) {
        var url = baseurl + videoID + '/default.jpg';
        return url;
      }
      else{
        return null;
      }
    };

    ctrl.isValidYouTube = function(link){

      if(getParameterByName('v', link)){

        return true;
      }
      else{

        return false;
      }


    }

    ctrl.getDivision = function(int){

      var sInt = int.toString();

      switch(sInt){
        case '1':
              return 'JJ';
              break;
        case '2':
              return 'SS';
          break;
        case '3':
              return 'CL';
          break;
        case '4':
              return 'RS';
          break;
        case '5':
              return 'EX';
          break;
        case '6':
              return 'M';
          break;
        default:
              return '';
          break;
      }

    };

    ctrl.getPlacement = function(int){

      var sInt = int.toString();

      switch(sInt){
        case '1':
          return '1st';
        break;
        case '2':
          return '2nd';
        case '3':
          return '3rd';
        case '4':
        case '5':
          return int + 'th'
        case '6':
          return 'F';
        default:
          return 'D';
      }
    }


  });
