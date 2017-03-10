// Code goes here
'use strict';

(function() {  
angular.module('app', ['ui.router'])

    .controller('mainCtrl', function($scope, appData, currentUser, dataServices) {
        
        /**
         *  Kotrollera om user är inloggad (cookieinfomation)
         *  och om inloggad läser in data.user
         * 
         */
         
        console.log('mainCtrl');         
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
        
        dataServices.getSignedIn().then(getUserSuccess, getUserError);
        
        function getUserSuccess(data) {
            vm.loggedIn = data.signed_in;
            appData.setUser(data);
            vm.fullName = appData.getFullName();
            currentUser.userId = data.person_id;
            console.log('mainCtrl-getUser');
        }   
        function getUserError(error) {
            console.log('error:', error );
        } 
        
        

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
    .controller('loginCtrl', function($http, $stateParams, $state, $scope, appData, dataServices){
    
        var vm          = this;
        vm.login        = login;
        vm.data         = {};
        vm.user         = {};
        vm.loggedIn     = false;
        vm.text         = '';
    
        

        
        function login() {
            
            dataServices.httpCacheRemoveUser();

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
                    
    
            });       
    
        }
    
    })
    .controller('accountCtrl', function( $http, $stateParams, $state, appData, $scope, dataServices) {
    
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

             dataServices.httpCacheRemoveUser();

            
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
    .controller('itemCtrl',function($http, dataServices, appData, $state, $scope, user){

        var vm = this;
        angular.extend(vm, {
            newItem         : newItem,
            getStore        : getStore, 
            insertStoreItem : insertStoreItem,
            data            : {},
            storeId         : 0,
            signedIn        : false
        }); 
        
        //$scope.$emit('signedIn', user);
        if (angular.isObject(appData.getUser())) {
        
            
            vm.signedIn = true;
            
            // get store
            vm.getStore();     
            
        } else {
            vm.signedIn = false;

        }
        

        
        // insert new store and item
        function newItem(){
            
            // Skapa en ny store om dem inte redan finns
            if (angular.isUndefined(vm.data.store_id)) {
                
                vm.storeId = 0;

            } else {

                vm.storeId = vm.data.store_id;
                
            }
            
            vm.insertStoreItem(vm.storeId);
 
            $state.go('route1');           
            
        }

        
        /** Get store */
        function getStore(){
            return $http({
                method: 'GET',
                url: 'index.php/api/get_one_store/' + appData.getUserId()
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    
                    if (angular.isObject(response.data)) {
                        vm.data = response.data;
                    } 
                    
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
            });
        }
        function insertStoreItem(storeId){
            vm.data.person_id = appData.getUserId();
            $http({
                method: 'POST',
                url: 'index.php/api/insert_store_item/' + storeId,
                data: vm.data
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    
                    vm.data.item_id = response.data;
                   
                    
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
            });
        }

    })
    .controller('itemListCtrl',function(appData, user, $scope, dataServices, $cacheFactory, currentUser){
        var vm = this;
        angular.extend(vm, {
            items       : {}
        }); 
        
        
        
        var foo = $cacheFactory.get('foo')
        if (!foo) {
            console.log('not defined', foo);
            foo = $cacheFactory('foo');
        } else {
            
        }
        
        $scope.$emit('signedIn', user);
        
        if (angular.isObject(user)) {
 
            dataServices.getItem(user.person_id)
                .then(getUserSuccess, getUserError);
        }

        function getUserSuccess(items) {
            vm.items = items;
        }   
        function getUserError(error) {
            console.log('error:', error );
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
        
    });


}());
