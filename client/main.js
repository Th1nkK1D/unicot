import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Queue } from '../imports/queue.js';
 
angular.module('unicot', [
  angularMeteor
]).controller('mainController',['$scope','$http',function($scope,$http) {
    $scope.test = 'Hi there!';

    /* Add song */
    $scope.add = function(url) {
      /*
      let url = 'https://www.youtube.com/watch?v=WXmTEyq5nXc';
      let jsonURL = 'http://www.youtube.com/oembed?url='+url+'&format=json';
      let ytObject;

      console.log(ytObject);
      */

      Meteor.call('add',url);
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
        return Queue.find({});
      }
    })
}]);