angular.module('app').component('userDetails', {
    templateUrl: 'app/components/details/details.template.html',
    controller: ['$scope', '$http', DetailsController]
});

function DetailsController($scope, $http) {
    console.log('DetailsController');
    $scope.details_title = "Select a user";
    $http.get('/user/list').then(function(response) {
        $scope.users = response.data;
    }, function(response) {
        console.log('Error: ' + response.data);
    });
    $scope.getDetailsOf = function() {
        $http.get('/user/' + $scope.user_selected.id).then(function(response) {
            $scope.user_details = response.data;
        }, function(response) {
            console.log('Error: ' + response.data);
        });
    }
};
