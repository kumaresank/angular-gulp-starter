angular.module('starterApp')
    .controller('HomeCtrl', [
        '$scope',
        function($scope) {
            console.log('Loaded.');
            $scope.message = 'Angular is configured with gulp';
        }
    ]);