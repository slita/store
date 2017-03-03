// Code goes here
'use strict';

(function() {  
angular.module('app', ["ui.router"]);
}());


(function() {
angular.module('app')
    .controller('mainCtrl', function($http, appData, $scope) {
        
        /**
         *  Kotrollera om user är inloggad (cookieinfomation)
         *  och om inloggad läser in data.user
         * 
         */
        var vm = this;
        angular.extend(vm, {
          data      : {},
          fullName  : '',
          loggedIn  : false,
          mess      : 'foo'
          
        });  
    
        $scope.$on('loggedIn', function(event, data) { 
            
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
    
        var vm          = this;
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
    
        var vm          = this;
        vm.fullName     = appData.getFullName();
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
    
            });
            
            $scope.$emit('loggedIn', true);
            $state.go('account');
        }
    
    })
    .controller('homeCtrl', function( $http, $stateParams, $state, appData, $scope) {
    
        var vm          = this;
        vm.name         = appData.getFullName();
        vm.deletePerson = deletePerson;
        vm.person_id    = $stateParams.person_id;
    
        
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
    
        var vm          = this;
        vm.name         = "Perre",
        vm.data         = {},
        vm.person_id    = $stateParams.person_id,
        vm.update       = update,
        vm.logout       = logout;
        
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
    
                });
      
    
    })
    .controller('itemCtrl',function($http, appData){

        var vm = this;
        angular.extend(vm, {
            newItem : newItem,    
            data    : {},
            store   : {}
        }); 
        
        /** Get store */
        $http({
            method: 'GET',
            url: 'index.php/api/get_one_store/' + appData.getUserId()
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                
                if (angular.isObject(response.data)) {
                    vm.store = response.data;
                } 
                
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
        });
        

        function newItem(){
            
            if (angular.isUndefined(vm.store.store_id)) {
                
                vm.store.person_id = appData.getUserId();
                console.log('skicka', vm.store);
                $http({
                    method: 'POST',
                    url: 'index.php/api/insert_store',
                    data: vm.store
                    }).then(function successCallback(response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        
                        console.log('id',response.data);
                        
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
            }
        }
        
    })
    .service('appData', function() {
        
        /**
         * service appData, 
         * contain data about the application
         * 
         */
        
        
        this.data = {
            user: {}
        };
        
    
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
}());
