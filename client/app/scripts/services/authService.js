'use strict';

angular.module('clientApp')
    .factory('AuthSvc', function(FIREBASE_URL, $firebaseAuth){
    
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    var authData = auth.$getAuth();
    
    //console.log(authData);
    
    return {
        
        forAuth: function(){
            return auth;
        },
        forDisplay: function(){
            
            if(authData){
            
            var data = { 
                
                  firstname: authData.facebook.cachedUserProfile.first_name || '',
                  lastname: authData.facebook.cachedUserProfile.last_name || '',
                  displayName: authData.facebook.displayName || '',
                  pictureURL: authData.facebook.cachedUserProfile.picture.data.url || ''
                
            };
        
            return data;
            }
            else{
                return null;
            }
        }
        
    }
    
});