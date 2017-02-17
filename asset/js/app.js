// Code goes here
'use strict';

angular.module('app', ["ui.router"]);

angular.module('app').controller('mainCtrl', function($scope, $http) {
    
/*    var vm = angular.extend(this, {
      
      bar : 'default'

    });  */
    

    var vm = this;
    vm.a = 'Hej vm.foo';

    $scope.foo = '- Hej Angular' ;
    
    
    $http({
        method: 'GET',
        url: 'index.php/api/per'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('hepp');
        console.log(response.data);
        $scope.list = response.data;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        
        
    });
    
    
    
});