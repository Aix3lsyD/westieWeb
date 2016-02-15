'use strict';

angular.module('clientApp').factory('WCSUser', function($resource){
  return $resource('/api/user/:id');
}).factory('User', function(FIREBASE_URL, $firebaseArray, $firebaseObject){
     
    return {
        
        forUser: function(fbID){
             var ref = new Firebase(FIREBASE_URL + '/users/' + fbID);
             //var array = $firebaseArray(ref);    
             //var array = $firebaseObject(ref);    
             //return array;
             return ref;
        }
        
        
    }
    
});
