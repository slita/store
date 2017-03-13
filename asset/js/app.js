// Code goes here
'use strict';

(function() {  
angular.module('app', ['ui.router'])

    .controller('mainCtrl', function($scope, $state, currentUser, dataServices) {
        
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

    
        
        function updateUser (){
            // When change user data!
            // Remove cach 'http'
            // Reload user info
            console.log('updateUser');
            dataServices.httpCacheRemoveUser(currentUser.userId);
            dataServices.getSignedIn().then(getUserSuccess, getUserError); 

            
        }
        function signOut (){
            // Remove cach 'http'
            // Remove other caches
            dataServices.httpCacheRemoveUser(currentUser.userId);
            dataServices.signOut(currentUser.userId);
            currentUser.signedIn = false;
            vm.loggedIn          = false;
            $state.go('route1');
            
        }       
        function signIn (data){
            // Remove cach
            // Change user or sign in
            
            dataServices.httpCacheRemoveUser(currentUser.userId);
            dataServices.getSignedIn().then(getUserSuccess, getUserError); 
            $state.go('route1');       
            
        }  
        function getUserSuccess(data) {
            vm.loggedIn             = data.signed_in;
     //       appData.setUser(data);
            vm.fullName             = data.first_name + data.last_name;
            currentUser.signedIn    = true;
            currentUser.userId      = data.person_id;
            
            console.log('mainCtrl-getUser',vm.fullname);
        }   
        function getUserError(error) {
            currentUser.signedIn    = false;
            console.log('error:', error );
        } 
        

        
        
        console.log('mainCtrl2');  
       
        /**
         * Main controller
         * 
         */
         
         
        // Sign in the first time
        dataServices.httpCacheRemoveUser();
        dataServices.getSignedIn().then(getUserSuccess, getUserError);
        
        // Event handler
        
        $scope.$on('updateUser', updateUser);
        $scope.$on('signOut', signOut);
        $scope.$on('signIn', signIn);
        
                

    })
    
    .controller('registerCtrl', function($scope, dataServices, currentUser) {
    
        var vm      = this;
        vm.register = register;
        vm.user     = {};
        
        // Default name for new store
        var store       = {
            'store_name': 'My Store',
            'person_id': 12
        };
        

        function register() {
            
            // Insert new User
            dataServices.insertNewUser(vm.user).then(insertNewUserSuccess,insertNewUserError); 
            
        }
        function insertNewUserSuccess(data){
            console.log('newUserSuccess', data);
            currentUser.userId = data;
            store.person_id = data;
            
            // Insert new store
            dataServices.insertStore(store).then(insertStoreSuccess);
            
        }
        function insertStoreSuccess(data){
            console.log('insertStoreSuccess', data);
            currentUser.storeId = data;
            
            // Sign in
            dataServices.signIn(vm.user).then(signInSuccess, signInError);
 
        }         
        function insertNewUserError(error){
            console.log('newUserError', error);
            
        }  
        
        function signInSuccess(user) {
            currentUser.userId = user.person_id;
            $scope.$emit('signIn');
            
        }   
        function signInError(error) {
            console.log('error:', error );
        
        }  
        
    }) 
    .controller('loginCtrl', function($state, $scope, dataServices, currentUser){
    
        var vm          = this;
        vm.login        = login;
        vm.text         = '';
    
        function login() {
       
            dataServices.signIn(vm.user).then(signInSuccess, signInError);
            
            function signInSuccess(user) {
                currentUser.userId = user.person_id;
                $scope.$emit('signIn');
                
            }   
            function signInError(error) {
                console.log('error:', error );
                vm.text = 'Wrong username or password';
            }   
        }
    
    })
    .controller('accountCtrl', function($scope){
    
        var vm          = this;
        vm.logout       = logout;

        function logout(){
            
            /**
             *  Loggaut user och ta bort cookie, 
             *  gå sedan till root.
             * 
             */

            $scope.$emit('signOut');
        }
  
    })
    .controller('userCtrl', function($scope, user, $state, dataServices) {
    
        var vm      = this;
        vm.update   = update;
        vm.fullName = user.first_name + user.last_name;
        vm.user     = user;
       
        function update(){

            dataServices.postUserData(vm.user.person_id, vm.user).then(postUserDataSuccess);
            
            function postUserDataSuccess(){
                
                $scope.$emit('updateUser');
                $state.go('account');                
            }
        }
    
    })
    .controller('homeCtrl', function( $http, $stateParams, $state, appData, $scope) {
    
        /**
         * List all users, this is righit now only for developmant
         */
    
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
    }) //Development
    .controller('homeDetailCtrl', function( $http, $stateParams) {
        /** 
         * View selected user, this is for developmant righit now.
         */
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
      
    
    }) // Development
    .controller('itemCtrl',function(dataServices, currentUser, $state, $scope){


        var vm = this;
        vm.item     =  {},
        vm.store    = {},
        vm.signedIn =  currentUser.signedIn,
        vm.insertItem  = insertItem,
        vm.message  = null,
        
        console.log('itemCtrl', currentUser);
        
        // Get store
        dataServices.getStore(currentUser.userId).then(getStoreSuccess, getStoreError);
        
        // Get store success
        function getStoreSuccess(data){
            currentUser.storeId = data.store_id; 
            vm.store = data;
        }
        
        // Get store error
        function getStoreError(error){
            // Shall we create a store then? Maby!
            console.log('getStoreError', error);
        }
        
        // Insert new item 
        function insertItem(){
            
            dataServices.insertItem(currentUser.storeId, vm.item).then(insertItemSuccess);
            
        }
        
        // Insert new item success
        function insertItemSuccess(data){
            console.log('insertItemSuccess',data);
            vm.message = 'Inserted ok!';
            //vm.item = {};
        }
        
    }) 
    .controller('itemListCtrl',function($scope, dataServices, $cacheFactory, currentUser){
        
        var vm = this;
        vm.item = {};

        console.log('itemListCtrl', currentUser.signedIn);
        var foo = $cacheFactory.get('foo')
        if (!foo) {
            console.log('not defined', foo);
            foo = $cacheFactory('foo');
        } else {
            
        }

        if (currentUser.signedIn) {
            dataServices.getItem(currentUser.userId)
            .then(getItemSuccess, getItemError);  
                
        } else {
            
        }

        function getItemSuccess(items) {
            vm.items = items;
        }   
        function getItemError(error) {
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
