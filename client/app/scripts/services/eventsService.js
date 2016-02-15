'use strict';

angular.module('clientApp').factory('WCSEvents', function($resource){
  return $resource('/api/events/:id', null,
    {
      'query': {method:'GET', params:{id:'id'}, isArray:false},
      'get': {method:'GET'}
    });
});
