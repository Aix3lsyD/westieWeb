"use strict";angular.module("clientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.router","ui.bootstrap","firebase"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/home"),a.state("home",{url:"/home",templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).state("about",{url:"/about",templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).state("points",{url:"/points",templateUrl:"views/search.html",controller:"SearchCtrl",controllerAs:"search"}).state("user",{url:"/user/:id/view",templateUrl:"views/user.html",controller:"UserCtrl",controllerAs:"user"}).state("events",{url:"/events/view",templateUrl:"views/events.html",controller:"EventsCtrl",controllerAs:"events"}).state("viewDances",{url:"/dance/add",templateUrl:"views/viewDances.html",controller:"viewHighlightsCtrl",controllerAs:"viewHighlights"}).state("addPlacement",{url:"/myWCS/addPlacement",templateUrl:"views/addPlacement.html",controller:"AddPlacementCtrl",controllerAs:"placement",params:{data:null}})}]).constant("FIREBASE_URL","https://westie.firebaseio.com"),angular.module("clientApp").factory("WCSUser",["$resource",function(a){return a("/api/user/:id")}]).factory("User",["FIREBASE_URL","$firebaseArray","$firebaseObject",function(a,b,c){return{forUser:function(b){var c=new Firebase(a+"/users/"+b);return c}}}]),angular.module("clientApp").factory("WCSEvents",["$resource",function(a){return a("/api/events/:id",null,{query:{method:"GET",params:{id:"id"},isArray:!1},get:{method:"GET"}})}]),angular.module("clientApp").factory("AuthSvc",["FIREBASE_URL","$firebaseAuth",function(a,b){var c=new Firebase(a),d=b(c),e=d.$getAuth();return{forAuth:function(){return d},forDisplay:function(){if(e){var a={firstname:e.facebook.cachedUserProfile.first_name||"",lastname:e.facebook.cachedUserProfile.last_name||"",displayName:e.facebook.displayName||"",pictureURL:e.facebook.cachedUserProfile.picture.data.url||""};return a}return null}}}]),angular.module("clientApp").factory("placementSvc",["AuthSvc","FIREBASE_URL","$firebaseArray",function(a,b,c){return{forUser:function(){var d=a.forAuth().$getAuth().facebook.cachedUserProfile.id,e=new Firebase(b+"/placements/"+d),f=c(e),g={ref:e,array:f};return g},forAll:function(){return null}}}]),angular.module("clientApp").directive("errSrc",function(){return{link:function(a,b,c){b.bind("error",function(){c.src!=c.errSrc&&c.$set("src",c.errSrc)})}}}),angular.module("clientApp").controller("MainCtrl",["$location","$state","AuthSvc","User",function(a,b,c,d){var e=this;this.isLoggedIn=function(){return c.forAuth().$getAuth()},this.profileInfo=c.forDisplay(),this.logout=function(){c.forAuth().$unauth(),b.go("home")},this.login=function(){c.forAuth().$authWithOAuthPopup("facebook").then(function(a){console.log("Logged in as:",a.uid),e.profileInfo={firstname:a.facebook.cachedUserProfile.first_name||"",lastname:a.facebook.cachedUserProfile.last_name||"",displayName:a.facebook.displayName||"",pictureURL:a.facebook.cachedUserProfile.picture.data.url||""},d.forUser(a.facebook.cachedUserProfile.id).once("value",function(b){b.exists()||(console.log("user did not exist"),d.forUser(a.facebook.cachedUserProfile.id).set({firstname:a.facebook.cachedUserProfile.first_name,lastname:a.facebook.cachedUserProfile.last_name,displayName:a.facebook.displayName,pictureURL:a.facebook.cachedUserProfile.picture.data.url}))})})["catch"](function(a){console.error("Authentication failed:",a)})}}]),angular.module("clientApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("clientApp").controller("SearchCtrl",["$http",function(a){this.getWestie=function(b){return a.get("/api/userList/"+b).then(function(a){return a.data})},this.setWestie=function(a){this.selectedUser=a.value}}]),angular.module("clientApp").controller("UserCtrl",["$state","$stateParams","WCSUser","AuthSvc",function(a,b,c,d){var e=this,f=!1;d.forAuth().$getAuth()&&(f=!0);var g=function(a){var b,c;for(b=0;b<a.length;b++)if("Advanced"==a[b].name){c=a[b];break}var d,f=new Date,g=f.getDate(),h=f.getMonth()+1,i=f.getFullYear()-3,j=new Date(h+"/"+g+"/"+i);for(d=0;d<c.follower_placements.length;d++){var k=new Date(c.follower_placements[d].end_date);k>=j&&(e.runningAdvancedFollower+=parseInt(c.follower_placements[d].points))}e.results[0].divisions[b].followerRunningPoints=e.runningAdvancedFollower;var l;for(l=0;l<c.leader_placements.length;l++){var k=new Date(c.leader_placements[l].end_date);k>=j&&(e.runningAdvancedLeader+=parseInt(c.leader_placements[l].points))}e.results[0].divisions[b].leaderRunningPoints=e.runningAdvancedLeader};e.isFollower=!1,e.data=c.get({id:b.id}),e.data.$promise.then(function(a){e.dancer=angular.fromJson(a),e.results=e.dancer.results,g(e.dancer.results[0].divisions),e.isFollower=e.dancer.results[0].divisions[0].follower_points>e.dancer.results[0].divisions[0].leader_points});e.selectedRow=null,e.selectedTab="Leader",e.selectedDivison=null,e.runningAdvancedLeader=0,e.runningAdvancedFollower=0,e.userLoggedIn=function(){return f},e.setSelectedRow=function(a){e.selectedRow=a},e.setSelectedTab=function(a){e.selectedTab=a},e.setSelectedDivision=function(a){e.selectedDivison=a},e.setSelected=function(a,b,c){e.setSelectedRow(a),e.setSelectedDivision(c),e.setSelectedTab(b)};e.isSelected=function(a,b,c){var d=a==e.selectedRow,f=b==e.selectedTab,g=c==e.selectedDivison;return d&&f&&g},e.addHighlight=function(b,c,d){var e={event:c,placement:d,division:b,comp:"1"};a.go("addPlacement",{data:e}),console.log(dancerData.results[0])}}]),angular.module("clientApp").controller("EventsCtrl",["WCSEvents",function(a){var b=this;b.data=a.get(),b.events=angular.fromJson(this.data),b.results=b.events.results,console.log(b.results)}]),angular.module("clientApp").controller("AddPlacementCtrl",["$state","placementSvc",function(a,b){var c=this;if(c.division=a.params.data?a.params.data.comp:"",a.params.data)switch(a.params.data.placement){case"1":case"2":case"3":case"4":case"5":c.placement=a.params.data.placement.toString();break;default:c.placement="6"}console.log(a.params.data.placement),c.partner="",c.event=a.params.data?a.params.data.event:"",c.video="",c.security="",console.log(c.division);var d={divison:c.divison,placement:c.placement,partner:c.partner,event:c.event,video:c.video,security:c.security};c.addHighlight=function(a){b.forUser().ref.push(a),console.log(b.forUser().array)},c.saveHighlight=function(){d={division:c.division,placement:c.placement,partner:c.partner,event:c.event,video:c.video,security:c.security},console.log("saveHighlight called"),c.addHighlight(d)}}]),angular.module("clientApp").controller("viewHighlightsCtrl",["placementSvc","AuthSvc",function(a,b){function c(a,b){b||(b=window.location.href),a=a.replace(/[\[\]]/g,"\\$&");var c=new RegExp("[?&]"+a+"(=([^&#]*)|&|#|$)"),d=c.exec(b);return d?d[2]?decodeURIComponent(d[2].replace(/\+/g," ")):"":null}var d="http://img.youtube.com/vi/",e=this;b.forDisplay().displayName;e.highlights=a.forUser().array,e.getThumbnail=function(a){var b=c("v",a);if(b){var e=d+b+"/default.jpg";return e}return null},e.isValidYouTube=function(a){return c("v",a)?!0:!1},e.getDivision=function(a){var b=a.toString();switch(b){case"1":return"JJ";case"2":return"SS";case"3":return"CL";case"4":return"RS";case"5":return"EX";case"6":return"M";default:return""}},e.getPlacement=function(a){var b=a.toString();switch(b){case"1":return"1st";case"2":return"2nd";case"3":return"3rd";case"4":case"5":return a+"th";case"6":return"F";default:return"D"}}}]),angular.module("clientApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/addPlacement.html",'<form class="form-horizontal" ng-submit="placement.saveHighlight()" name="userForm" novalidate> <fieldset> <!-- Form Name --> <legend>Add Highlight</legend> <!-- Select Basic --> <div class="form-group"> <label class="col-md-4 control-label" for="selectbasic">Division</label> <div class="col-md-4"> <select ng-model="placement.division" id="selectbasic" name="selectDivision" class="form-control" required> <option value="1">Jack and Jill</option> <option value="2">Strictly Swing</option> <option value="3">Classic</option> <option value="4">Rising Star</option> <option value="5">Exhibition/Demo</option> <option value="6">Masters</option> </select> </div> <p ng-show="userForm.selectDivision.$invalid && !userForm.selectDivision.$pristine" class="help-block">A Division is required.</p> </div> <!-- Select Basic --> <div class="form-group"> <label class="col-md-4 control-label" for="placementSelect">Placement</label> <div class="col-md-2"> <select ng-model="placement.placement" id="placementSelect" name="placementSelect" class="form-control" required> <option value="1">1st</option> <option value="2">2nd</option> <option value="3">3rd</option> <option value="4">4th</option> <option value="5">5th</option> <option value="6">N/A</option> </select> </div> <p ng-show="userForm.placementSelect.$invalid && !userForm.placementSelect.$pristine" class="help-block">A Placement is required.</p> </div> <!-- Text input--> <div class="form-group"> <label class="col-md-4 control-label" for="textinput">Partner</label> <div class="col-md-5"> <input ng-model="placement.partner" id="textinput" name="parterInput" type="text" placeholder="Partner" class="form-control input-md"> <p ng-show="userForm.parterInput.$invalid && !userForm.parterInput.$pristine" class="help-block">A Division is required.</p> </div> </div> <!-- Text input--> <div class="form-group"> <label class="col-md-4 control-label" for="eventinput">Event Name</label> <div class="col-md-5"> <input ng-model="placement.event" id="eventinput" name="eventInput" type="text" placeholder="WCS Event" class="form-control input-md" required> </div> </div> <!-- Text input--> <div class="form-group"> <label class="col-md-4 control-label" for="videolink">Video Link</label> <div class="col-md-5"> <input ng-model="placement.video" id="videolink" name="videolink" type="text" placeholder="YouTube Link..." class="form-control input-md"> </div> </div> <!-- Select Basic --> <div class="form-group"> <label class="col-md-4 control-label" for="securitySelect">Security</label> <div class="col-md-2"> <select ng-model="placement.security" id="securitySelect" name="securitySelect" class="form-control" required> <option value="1">Public</option> <option value="2">Private</option> </select> </div> </div> <!-- Button --> <div class="form-group"> <label class="col-md-4 control-label" for="submit"></label> <div class="col-md-4"> <button type="submit" name="submit" class="btn btn-primary" ng-disabled="userForm.$invalid">Save</button> </div> </div> </fieldset> </form>'),a.put("views/events.html",'<div class row> <table class="table table-striped"> <caption style="font-weight:bold;font-style:italic">Upcoming Events</caption> <div class="col-lg-6 col-lg-offset-6"> <div class="input-group"> <input type="text" ng-model="events.query" class="form-control" placeholder="Search for..."> </div><!-- /input-group --> </div><!-- /.col-lg-6 --> <thead> <tr> <th>Date</th> <th>Name</th> <th>Location</th> <th>Contact</th> <th>Ticket</th> </tr> </thead> <tbody> <tr ng-repeat="e in events.events.results | filter:events.query"> <td>{{e.eventdate}}</td> <td><a ng-href="{{e.event}}"> {{e[\'event/_text\']}}</a></td> <td>{{e.eventlocation}}</td> <td><a ng-href="{{e.eventperson}}">{{e[\'eventperson/_text\']}}</a></td> <td>{{e.ticketperson}}</td> </tr> </tbody> </table> <!--{{events.events.results.collection1}}--> </div>'),a.put("views/main.html",'<div id="myCarousel" class="carousel slide" data-ride="carousel"> <!-- Indicators --> <ol class="carousel-indicators"> <li data-target="#myCarousel" data-slide-to="0" class="active"></li> <li data-target="#myCarousel" data-slide-to="1"></li> <li data-target="#myCarousel" data-slide-to="2"></li> <li data-target="#myCarousel" data-silde-to="3"></li> </ol> <div class="carousel-inner" role="listbox"> <div class="item active"> <img class="homeCarouselImg" src="../images/c.4c08359d.jpg" alt="First slide"> <div class="container"></div> </div> <div class="item"> <img class="homeCarouselImg" src="../images/c1.d6ae9ae7.jpg" alt="Second slide"> </div> <div class="item"> <img class="homeCarouselImg" src="../images/c2.5767b3f0.jpg" alt="Third slide"> </div> <div class="item"> <img class="homeCarouselImg" src="../images/c3.0b66f7a0.jpg" alt="Third slide"> </div> </div> <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div><!-- /.carousel -->'),a.put("views/search.html",'<div> <!--<form class="form-horizontal">--> <!--<input type="text" ng-model="search.wcsID">--> <!--<button class="btn" ui-sref="user({id:search.wcsID})"><i class="glyphicon-search"></i>Search</button>--> <!--</form>--> <h4>Points Search</h4> <!--<pre>Model: {{search.asyncSelected | json}}</pre>--> <div class="input-group"> <input type="text" ng-model="search.wcsID" placeholder="Search for a Westie..." uib-typeahead="westie as westie.label for westie in search.getWestie($viewValue)" typeahead-on-select="search.setWestie($item)" typeahead-min-length="3" typeahead-loading="loadingLocations" typeahead-no-results="noResults" class="form-control"> <span class="input-group-btn"> <button class="btn btn-default" ui-sref="user({id:search.wcsID.value})"><i class="glyphicon glyphicon-search"></i> Search</button> </span> </div> <i ng-show="loadingLocations" class="glyphicon glyphicon-refresh"></i> <div ng-show="noResults"> <i class="glyphicon glyphicon-remove"></i> No Results Found </div> <br><br> </div>'),a.put("views/user.html",'<div class="points"> <h3>{{user.dancer[\'full_name\']}} </h3> <uib-tabset> <uib-tab heading="Leader"> <div class row> <table class="table table-striped" ng-repeat="division in user.dancer.results[0].divisions"> <caption style="font-weight:bold;font-style:italic">{{division.name}} - {{division.leader_points}} points</caption> <caption ng-show="division.leaderRunningPoints" style="font-weight:bold;font-style:italic">All-Star Qualifying - {{division.leaderRunningPoints}} points</caption> <thead> <tr> <th>Event</th> <th>Location</th> <th>Date</th> <th>Result</th> <th>Points</th> </tr> </thead> <tbody> <tr ng-repeat="lplacement in division.leader_placements" ng-click="user.setSelected($index, \'Leader\', division.name)" ng-class="{selected: user.isSelected($index, \'Leader\', division.name)}"> <td width="30%">{{lplacement.name}}</td> <td width="30%">{{lplacement.location}}</td> <td width="20%">{{lplacement.start_date | limitTo: 10 }}</td> <td width="10%">{{lplacement.result}}</td> <td width="5%">{{lplacement.points}}</td> <td width="5%"><button ng-click="user.addHighlight(division.name,lplacement.name, lplacement.result)" ng-show="user.isSelected($index, \'Leader\', division.name) && user.userLoggedIn()" type="button" class="btn btn-xs btn-info"> <span class="glyphicon glyphicon-plus"></span> </button> </td> </tr> </tbody> </table> </div> </uib-tab> <uib-tab heading="Follower" active="user.isFollower"> <div class row> <table class="table table-striped" ng-repeat="division in user.dancer.results[0].divisions" ng-click="user.setSelected(lplacement.id, \'Follower\', division.name) && user.userLoggedIn()"> <caption style="font-weight:bold;font-style:italic">{{division.name}} - {{division.follower_points}} points</caption> <caption ng-show="division.followerRunningPoints" style="font-weight:bold;font-style:italic">All-Star Qualifying - {{division.followerRunningPoints}} points</caption> <thead> <tr> <th>Event</th> <th>Location</th> <th>Date</th> <th>Result</th> <th>Points</th> </tr> </thead> <tbody> <tr ng-repeat="lplacement in division.follower_placements"> <td width="30%">{{lplacement.name}}</td> <td width="30%">{{lplacement.location}}</td> <td width="20%">{{lplacement.start_date}}</td> <td width="10%">{{lplacement.result}}</td> <td width="5%">{{lplacement.points}}</td> <td width="5%"><button ng-show="user.isSelected($index, \'Leader\', division.name)" type="button" class="btn btn-xs btn-info"> <span class="glyphicon glyphicon-plus"></span> </button> </td> </tr> </tbody> </table> </div> </uib-tab> </uib-tabset> </div>'),a.put("views/viewDances.html",'<div class="col-md-6 col-md-offset-3"> <button ui-sref="addPlacement" id="singlebutton" name="singlebutton" class="btn btn-lg btn-primary center-block"> Add a highlight </button> <br> </div> <div class="videoComponent"> <div class="container"> <div class="row"> <div class="[ col-xs-12 col-sm-offset-2 col-sm-8 ]"> <ul class="event-list"> <li ng-repeat="highlight in viewHighlights.highlights"> <time datetime="2014-07-20"> <span class="day">{{viewHighlights.getDivision(highlight.division)}}</span> <span class="month">{{viewHighlights.getPlacement(highlight.placement)}}</span> <!--<span class="year">2014</span>--> <!--<span class="time">ALL DAY</span>--> </time> <img alt="Independence Day" ng-src="{{viewHighlights.isValidYouTube(highlight.video) ? viewHighlights.getThumbnail(highlight.video) : \'../images/default.5950912d.png\' }}"> <!--<img alt="Independence Day" ng-src="{{viewHighlights.getThumbnail(highlight.video)}}" fallback-src="../images/default.5950912d.png" />--> <div class="info"> <h2 class="title"><a href="{{highlight.video}}">{{highlight.event}}</a></h2> <p class="desc">{{highlight.partner}}</p> </div> <!--<div class="social">--> <!--<ul>--> <!--<li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>--> <!--<li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>--> <!--<li class="google-plus" style="width:33%;"><a href="#google-plus"><span class="fa fa-google-plus"></span></a></li>--> <!--</ul>--> <!--</div>--> </li> </ul> </div> </div> </div> </div> <!--<div class="videoComponent">--> <!--<div class="container">--> <!--<div class="row">--> <!--<div class="[ col-xs-12 col-sm-offset-2 col-sm-8 ]">--> <!--<ul class="event-list">--> <!--<li>--> <!--<time datetime="2014-07-20">--> <!--<span class="day">4</span>--> <!--<span class="month">Jul</span>--> <!--<span class="year">2014</span>--> <!--<span class="time">ALL DAY</span>--> <!--</time>--> <!--<img alt="Independence Day" src="https://farm4.staticflickr.com/3100/2693171833_3545fb852c_q.jpg" />--> <!--<div class="info">--> <!--<h2 class="title">Independence Day</h2>--> <!--<p class="desc">United States Holiday</p>--> <!--</div>--> <!--&lt;!&ndash;<div class="social">&ndash;&gt;--> <!--&lt;!&ndash;<ul>&ndash;&gt;--> <!--&lt;!&ndash;<li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>&ndash;&gt;--> <!--&lt;!&ndash;<li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>&ndash;&gt;--> <!--&lt;!&ndash;<li class="google-plus" style="width:33%;"><a href="#google-plus"><span class="fa fa-google-plus"></span></a></li>&ndash;&gt;--> <!--&lt;!&ndash;</ul>&ndash;&gt;--> <!--&lt;!&ndash;</div>&ndash;&gt;--> <!--</li>--> <!--<li>--> <!--<time datetime="2014-07-20 0000">--> <!--<span class="day">8</span>--> <!--<span class="month">Jul</span>--> <!--<span class="year">2014</span>--> <!--<span class="time">12:00 AM</span>--> <!--</time>--> <!--<div class="info">--> <!--<h2 class="title">One Piece Unlimited World Red</h2>--> <!--<p class="desc">PS Vita</p>--> <!--<ul>--> <!--<li style="width:50%;"><a href="#website"><span class="fa fa-globe"></span> Website</a></li>--> <!--<li style="width:50%;"><span class="fa fa-money"></span> $39.99</li>--> <!--</ul>--> <!--</div>--> <!--<div class="social">--> <!--<ul>--> <!--<li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>--> <!--<li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>--> <!--<li class="google-plus" style="width:33%;"><a href="#google-plus"><span class="fa fa-google-plus"></span></a></li>--> <!--</ul>--> <!--</div>--> <!--</li>--> <!--<li>--> <!--<time datetime="2014-07-20 2000">--> <!--<span class="day">20</span>--> <!--<span class="month">Jan</span>--> <!--<span class="year">2014</span>--> <!--<span class="time">8:00 PM</span>--> <!--</time>--> <!--<img alt="My 24th Birthday!" src="https://farm5.staticflickr.com/4150/5045502202_1d867c8a41_q.jpg" />--> <!--<div class="info">--> <!--<h2 class="title">Mouse0270\'s 24th Birthday!</h2>--> <!--<p class="desc">Bar Hopping in Erie, Pa.</p>--> <!--<ul>--> <!--<li style="width:33%;">1 <span class="glyphicon glyphicon-ok"></span></li>--> <!--<li style="width:34%;">3 <span class="fa fa-question"></span></li>--> <!--<li style="width:33%;">103 <span class="fa fa-envelope"></span></li>--> <!--</ul>--> <!--</div>--> <!--<div class="social">--> <!--<ul>--> <!--<li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>--> <!--<li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>--> <!--<li class="google-plus" style="width:33%;"><a href="#google-plus"><span class="fa fa-google-plus"></span></a></li>--> <!--</ul>--> <!--</div>--> <!--</li>--> <!--<li>--> <!--<time datetime="2014-07-31 1600">--> <!--<span class="day">31</span>--> <!--<span class="month">Jan</span>--> <!--<span class="year">2014</span>--> <!--<span class="time">4:00 PM</span>--> <!--</time>--> <!--<img alt="Disney Junior Live On Tour!" src="http://www.thechaifetzarena.com/images/main/DL13_PiratePrincess_thumb.jpg" />--> <!--<div class="info">--> <!--<h2 class="title">Disney Junior Live On Tour!</h2>--> <!--<p class="desc"> Pirate and Princess Adventure</p>--> <!--<ul>--> <!--<li style="width:33%;">$49.99 <span class="fa fa-male"></span></li>--> <!--<li style="width:34%;">$29.99 <span class="fa fa-child"></span></li>--> <!--</ul>--> <!--</div>--> <!--<div class="social">--> <!--<ul>--> <!--<li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>--> <!--<li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>--> <!--<li class="google-plus" style="width:33%;"><a href="#google-plus"><span class="fa fa-google-plus"></span></a></li>--> <!--</ul>--> <!--</div>--> <!--</li>--> <!--</ul>--> <!--</div>--> <!--</div>--> <!--</div>--> <!--</div>-->')}]);