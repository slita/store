// Code goes here
'use strict';

angular.module('app', ["ui.router"]);

angular.module('app')

.controller('mainCtrl', function($http, appData, $scope) {
    
    /**
     *  Kotrollera om user är inloggad (cookieinfomation)
     *  och om inloggad läser in data.user
     * 
     */
    
    var vm = angular.extend(this, {
      data      : {},
      fullName  : '',
      loggedIn  : false,
      mess      : 'foo'
      
    });  

    $scope.$on('loggedIn', function(event, data) { 
        console.log('mainController:',data); 
        vm.loggedIn = data;
        vm.fullName = appData.getFullName();
    });

    $http({
        method: 'GET',
        url: 'index.php/api/signed_in/user'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        vm.data.user = response.data;
        console.log('signed_in:',vm.data.user);
        appData.setUser(vm.data.user);
        vm.fullName = appData.getFullName();
        if (appData.getUserId() == undefined) {
             vm.loggedIn = false
        } else {
            vm.loggedIn = true;
        }
    });     
        
      
})
.controller('menuCtrl', function($http, appData) {
    
    /**
     *  Kotrollera om user är inloggad (cookieinfomation)
     *  och om inloggad läser in data.user
     * 
     */
    
    var vm = angular.extend(this, {
      data      : {},
      fullName  : '',
      loggedIn  : false
      
    });  


    $http({
        method: 'GET',
        url: 'index.php/api/signed_in/user'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        vm.data.user = response.data;
        console.log('signed_in:',vm.data.user);
        appData.setUser(vm.data.user);
        vm.fullName = appData.getFullName();
        if (appData.getUserId() == undefined) {
             vm.loggedIn = false
        } else {
            vm.loggedIn = true;
        }
    });     
        
      
})
.controller('registerCtrl', function( $http) {

    var vm      = this;
    vm.register = register;
    vm.user     = {};
    
    //vm.register();

    function register() {
        
        $http({
            method: 'POST',
            url: 'index.php/api/insert_person',
            data: vm.user
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
        
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }

})
.controller('loginCtrl', function($http, $stateParams, $state, $scope, appData){

    var vm = this;
    vm.login        = login;

    vm.data         = {};
    vm.user         = {};
    vm.loggedIn     = false;
    vm.text         = '';

    function login() {
        vm.text = '';
        
        

         $http({
            method: 'POST',
            url: 'index.php/api/login',
            data: vm.user
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                vm.data = response.data;
                console.log('förex',vm.data);

                appData.setUser(vm.data);
                $scope.$emit('loggedIn', true);
                $state.go('route1');
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                   vm.text = 'Wrong username or password';
                var test = 0;

        });       

    }

})
.controller('accountCtrl', function( $http, $stateParams, $state, appData, $scope) {

    var vm = this;

    vm.fullName         = appData.getFullName();
    vm.logout       = logout;
    vm.user         = appData.getUser();
    
    function logout(){
        
        /**
         *  Loggaut user och ta bort cookie, 
         *  gå sedan till root.
         * 
         * 
         */
        
         $http({
            method: 'GET',
            url: 'index.php/api/logout/' + appData.getUserId()
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                
            }); 
            
        /**
         * Sen meddelande till mainCtrl
         * gå till förstasidan
         * 
         */
        $scope.$emit('loggedIn', false);
        $state.go('route1');
    }

})
.controller('userCtrl', function($scope, $http, $stateParams, $state, appData) {

    var vm      = this;
    vm.update   = update;
    vm.fullName = appData.getFullName();
    vm.user     = appData.getUser();
   
   
    function update(){
        $http({
            method: 'POST',
            url: 'index.php/api/update_person/' + vm.user.person_id,
            data: vm.user
        }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

        }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('person-error', response)
        });
        
        $scope.$emit('loggedIn', true);
        $state.go('account');
    }

})
.controller('homeCtrl', function( $http, $stateParams, $state, appData, $scope) {

    var vm = this;

    vm.name         = appData.getFullName();
    vm.deletePerson = deletePerson;
    vm.person_id    = $stateParams.person_id;
    vm.logout       = logout;
    
    var bar = 'bar';
   

    $http({
        method: 'GET',
        url: 'index.php/api/persons'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            vm.allPersons = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        
    function logout(){
       //ta bort 
        /**
         *  Loggaut user och ta bort cookie, 
         *  gå sedan till root.
         * 
         * 
         
        
        console.log('logout');
        
         $http({
            method: 'GET',
            url: 'index.php/api/logout/' + appData.getUserId()
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                vm.allPersons = response.data;
            }); 
            
        /**
         * Sen meddelande till mainCtrl
         * gå till förstasidan
         * 
         * /
        $scope.$emit('loggedIn', false);
        $state.go('route1');*/
    }
  
    function deletePerson($id) {

        var url = 'index.php/api/delete_person/' + $id;
        
        $http({
            method: 'DELETE',
            url: url
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
        
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        
    }
    

})
.controller('homeDetailCtrl', function( $http, $stateParams) {

    var vm = this;
    
   
    
    vm.name="Perre",
    vm.data = {},
    vm.person_id = $stateParams.person_id,
    vm.update = update,
    vm.logout = logout;
    
    function logout (){
        
        $http({
        method: 'POST',
        url: 'index.php/api/logout/' + vm.person_id,
        data: vm.data
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                vm.data = response.data;
    
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('person-error', response)
            });      
        
    }
    
    function update (){
        
        $http({
        method: 'POST',
        url: 'index.php/api/update_person/' + vm.person_id,
        data: vm.data
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                vm.data = response.data;
    
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('person-error', response)
            });      
        
    }
    
    
    $http({
        method: 'GET',
        url: 'index.php/api/get_one_person/' + vm.person_id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                vm.data = response.data;
    
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('person-error', response)
            });
  

})
.service('appData', function() {
    
    this.data = {
        user: {}
    };
    
/*    this.setId = function (id) {
        
        this.data.id = id;
    }
    this.getId = function () {
        
        return this.data.id;
    }*/
    this.setUser = function (user){
        this.data.user = user;
    }
    this.getUserId = function (){
        return this.data.user.person_id;
    }
    this.getFullName = function(){
        var fullName = this.data.user.first_name + ' ' + this.data.user.last_name;
        return fullName;
    }
    this.getUser = function(){
        
        return this.data.user;
    }
    
})
.factory('resource', function resource ($http) {
    return {
      getSignedIn       : getSignedIn
    };

    function getSignedIn() {

        return $http({
            method: 'GET',
            url: 'index.php/api/signed_in/user'
            }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available

        }); 
    }
    
});