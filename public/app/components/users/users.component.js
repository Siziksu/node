angular.module('app').component('userList', {
    templateUrl: 'app/components/users/users.template.html',
    controller: ['$scope', '$http', UserListController]
});

function UserListController($scope, $http) {
    console.log('UserListController');
    $scope.users_title = "List of Users";
    var users_length = 0;
    var users_limit = 5;
    $scope.limit = 0;
    $scope.button_compact_text = "";
    $http.get('/user/list').then(function(response) {
        $scope.users = response.data;
        users_length = $scope.users.length;
        $scope.limit = users_limit;
        $scope.button_compact_text = users_limit < users_length ? "View all" : "";
    }, function(response) {
        console.log('Error: ' + response.data);
    });
    $scope.compact = function() {
        if (users_limit < users_length) {
            $scope.limit = $scope.limit == users_length ? users_limit : users_length;
            $scope.button_compact_text = $scope.limit == users_length ? "Compact" : "View all";
        } else {
            $scope.limit = users_length;
            $scope.button_compact_text = "";
        }
    };
    $scope.addUser = function(user_name, user_password) {
        var user = {
            name : user_name,
            password : user_password
        }
        $http.post('/user', user).then(function(response) {
            $scope.users = response.data;
            users_length = $scope.users.length;
            setLimit($scope.users.length - 1);
        }, function(response) {
            console.log('Error: ' + response.data);
        });
    };
    function setLimit(length) {
        if (users_limit < users_length) {
            $scope.limit = $scope.limit == length ? users_length : users_limit ;
            $scope.button_compact_text = $scope.limit == users_length ? "Compact" : "View all";
        } else {
            $scope.limit = users_length;
            $scope.button_compact_text = "";
        }
    }
    $scope.restore = function() {
        $http.get('/restore').then(function(response) {
            $scope.users = response.data;
            users_length = $scope.users.length;
            setLimit($scope.users.length - 1);
        }, function(response) {
            console.log('Error: ' + response.data);
        });
    }
};
