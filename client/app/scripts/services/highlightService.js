'use strict';

angular.module('clientApp')
  .factory('placementSvc', function(AuthSvc, FIREBASE_URL, $firebaseArray){





    //console.log(authData);



    return {

      forUser: function(){
        var currentUser = AuthSvc.forAuth().$getAuth().facebook.cachedUserProfile.id;
        var ref = new Firebase(FIREBASE_URL + '/placements/' + currentUser);
        var array = $firebaseArray(ref);
        var obj = {

          ref: ref,
          array: array
        };
        return obj;
      },
      forAll: function(){

          return null;
      }

    };

  });
