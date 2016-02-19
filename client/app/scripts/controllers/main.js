'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($location, $state, AuthSvc, User) {

    var ctrl = this;

    this.isLoggedIn = function(){

        return AuthSvc.forAuth().$getAuth();

    };


    this.profileInfo = AuthSvc.forDisplay();
    //console.log(ctrl.profileInfo);


    this.logout = function(){

      AuthSvc.forAuth().$unauth();
      $state.go('home');

    };


//    this.login = function(){
//
//      console.log('login function called');
//
//      var ref = new Firebase('https://westie.firebaseio.com');
//      ref.authWithOAuthPopup('facebook', function(error, authData) {
//        if (error) {
//          console.log('Login Failed!', error);
//        } else {
//          console.log('Authenticated successfully with payload:', authData);
//        }
//      });
//
//    }


     this.login = function(){

     //console.log('login function called');

     AuthSvc.forAuth().$authWithOAuthPopup('facebook').then(function(authData) {
        console.log('Logged in as:', authData.uid);

       ctrl.profileInfo = {

         firstname: authData.facebook.cachedUserProfile.first_name || '',
         lastname: authData.facebook.cachedUserProfile.last_name || '',
         displayName: authData.facebook.displayName || '',
         pictureURL: authData.facebook.cachedUserProfile.picture.data.url || ''

       };




         User.forUser(authData.facebook.cachedUserProfile.id).once('value', function(snapshot){

             if(!snapshot.exists()){

                 console.log('user did not exist');
                 //console.log(snapshot);

                  User.forUser(authData.facebook.cachedUserProfile.id).set({

                  firstname: authData.facebook.cachedUserProfile.first_name,
                  lastname: authData.facebook.cachedUserProfile.last_name,
                  displayName: authData.facebook.displayName,
                  pictureURL: authData.facebook.cachedUserProfile.picture.data.url

                    });

             }

         });

      //ctrl.profileInfo = AuthSvc.forDisplay();

     }).catch(function(error) {
        console.error('Authentication failed:', error);
     });
    };
     //end login function;

  });
