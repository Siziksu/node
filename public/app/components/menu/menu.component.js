angular.module('app').component('menuHorizontal', {
    templateUrl: 'app/components/menu/menu.template.html',
    controller: ['$scope', '$http', '$location', MenuController]
});

function MenuController($scope, $http, $location) {
    console.log('MenuController');
    $http.get('/menu').then(function(response) {
        $scope.menu = response.data;
        var page = $location.absUrl().split("/");
        page[page.length - 1] = page[page.length - 1] == "" ? "index" : page[page.length - 1];
        for (var i = 0; i < $scope.menu.length; i++) {
            $scope.menu[i].style = $scope.menu[i].url === page[page.length - 1] ? 'active' : 'none';
        }
    }, function(response) {
        console.log('Error: ' + response.data);
    });
};
