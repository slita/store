'use strict';

angular.module('app').controller('LoginController', function( $http) {
    
    
    
    
    console.log('foo');

    var vm = this;
    vm.foo = 'hej hopp',
    vm.login = login,
/*    vm.username = null,
    vm.password = null,*/
    vm.dataLoading = false;
    
    function login (){
        alert("login:" + vm.username +"-"+vm.password);
        
    }
    
})