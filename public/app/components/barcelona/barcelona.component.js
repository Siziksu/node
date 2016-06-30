angular.module('app').component('temperatureBarcelona', {
    templateUrl: 'app/components/barcelona/barcelona.template.html',
    controller: ['$scope', '$http', BarcelonaController]
});

function BarcelonaController($scope, $http) {
    console.log('BarcelonaController');
    $scope.barcelona_title = "Barcelona";
    $scope.refresh = function() {
        $http.get('/barcelona/temperature').then(function(response) {
            $scope.barcelona = response.data;
        }, function(response) {
            console.log('Error: ' + response.data);
        });
    }
    $scope.refresh();
};
