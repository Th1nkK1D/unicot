import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Queue } from '../imports/queue.js';
 
angular.module('unicot', [
  angularMeteor
]).controller('mainController',['$scope','$http',function($scope,$http) {
    $scope.test = 'Hi there!';

    $scope.add = function() {
      let url = 'https://www.youtube.com/watch?v=WXmTEyq5nXc';
      let jsonURL = 'http://www.youtube.com/oembed?url='+url+'&format=json';
      let ytObject;

      console.log(ytObject);
    }

    $scope.helpers({
      queue() {
        return Queue.find({});
      }
    })
}]);