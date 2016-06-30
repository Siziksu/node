angular.module('app').controller('AppController', ['$scope', '$http', AppController]);

function AppController($scope, $http) {
    console.log('AppController');
    $scope.title = 'AngularJs, Node.js and Express';
};
