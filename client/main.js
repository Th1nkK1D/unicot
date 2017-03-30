/* Unicot - Main Angular front-end file
 * https://github.com/Th1nkK1D/unicot
 * (c) Th1nk.K1D 2017
 */

import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Queue } from '../imports/queue.js';

//Angular init
angular.module('unicot', [
  angularMeteor
]).controller('mainController',['$scope','$http',function($scope,$http) {
    //Add song to queue
    $scope.add = function(url) {      
      
      //Fetch Youtube data
      $http({method: 'JSONP', url: 'https://noembed.com/embed?url='+url+'&format=json'}).
        then(function(data, status) {
          //Get video id
          let vid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];
          let title = data.data.title;
          $scope.url = null;

          Meteor.call('add',vid,title);
          });
    }
    //Play or resume current song
    $scope.play = function() {
      Meteor.call('play');
    }
    //Pause current song
    $scope.pause = function() {
      Meteor.call('pause');
    }
    //Skip to next song
    $scope.skip = function() {
      Meteor.call('skip');
    }
    //Stop the song, clear queue
    $scope.stop = function() {
      Meteor.call('stop');
    }
    //Adjust volume down
    $scope.volumeDown = function() {
      Meteor.call('volumeDown');
    }
    //Adjust volume up
    $scope.volumeUp = function() {
      Meteor.call('volumeUp');
    }
    //Remove song from queue
    $scope.remove = function(song) {
      Meteor.call('remove',song._id);
    }

    $scope.helpers({
      //return current song and next song in queue
      queue() {
        Meteor.subscribe('queue');

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