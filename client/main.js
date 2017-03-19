import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
angular.module('unicot', [
  angularMeteor
]).controller('mainController',['$scope',function($scope) {
    $scope.test = 'Hi there!';
}]);