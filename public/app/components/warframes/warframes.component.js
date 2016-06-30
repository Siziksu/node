angular.module('app').component('warframeList', {
    templateUrl: 'app/components/warframes/warframes.template.html',
    controller: ['$scope', '$http', WarframeListController]
});

function WarframeListController($scope, $http) {
    console.log('WarframeListController');
    $scope.warframes_title = "List of Warframes";
    $http.get('/warframe/list').then(function(response) {
        $scope.warframes = response.data;
    }, function(response) {
        console.log('Error: ' + response.data);
    });
};
