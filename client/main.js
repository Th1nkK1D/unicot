import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Queue } from '../imports/queue.js';
 
angular.module('unicot', [
  angularMeteor
]).controller('mainController',['$scope','$http',function($scope,$http) {
    /* Add song */
    $scope.add = function(url) {      
      
      // Fetch Youtube data
      $http({method: 'JSONP', url: 'https://noembed.com/embed?url='+url+'&format=json'}).
        then(function(data, status) {
          //console.log(data);

          let vid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];
          let title = data.data.title;
          $scope.url = null;

          Meteor.call('add',vid,title);
          });
    }

    $scope.play = function() {
      Meteor.call('play');
    }

    $scope.pause = function() {
      Meteor.call('pause');
    }

    $scope.skip = function() {
      Meteor.call('skip');
    }

    $scope.helpers({
      queue() {
        let queue = Queue.find({}).fetch();

        if(typeof queue != 'undefined' && queue.length > 0) {
          let data = {};

          data.playing = queue[0];
          queue.splice(0,1);
          data.nextList = queue;

          return data;
        } else {
          return null;
        }
      },
    })
}])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.
    'https://noembed.com/**'
  ]);
});;