// Code goes here
'use strict';

(function() {  
angular.module('app', ['ui.router','ngAnimate','ui.bootstrap','angularFileUpload'])

 
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
       
            
            dataServices.httpCacheRemoveUser(currentUser.userId);
            dataServices.signIn(vm.user).then(signInSuccess, signInError);
            
            function signInSuccess(user) {
                currentUser.userId = user.person_id;
                $scope.$emit('signIn');
                $state.go('home'); 
                
            }   
            function signInError(error) {
                console.log('error:', error );
                vm.text = 'Wrong username or password';
            }   
        }
    
    })
    .controller('startCtrl', function($state, $scope, dataServices, currentUser){
    
        var vm          = this;
        vm.search       = null,
        vm.change       = change;
        $scope.isFocused = true;
        
        console.log('startCtrl'); 
    
        function change() {
            console.log('send', vm.search);
            $scope.$emit('search',vm.search);
            $state.go('home');
        }
  
    
    })   
    .controller('accountCtrl', function($scope, $window, $state, $uibModal, $log){
    
        var vm              = this;
        vm.logout           = logout,
        vm.back             = back,
        vm.showModal        = showModal;

        function logout(){
            
            /**
             *  Loggaut user och ta bort cookie, 
             *  gå sedan till root.
             * 
             */

            $scope.$emit('signOut');
        }
        function back(){
            $window.history.back();
        }
        
        /**
         * Modal - test
         * 
         */
        
        vm.items = ['item1', 'item2', 'item3'];
        vm.animationsEnabled = true;

        function showModal(){
            
            // size =  '' or 'lg' or 'sm'
            var size = '';
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'asset/template/register/modal.view.html',
                controller: 'modalCtrl',
                controllerAs: 'vm',
                size: size,      
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
  
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
                $log.info('Selected: ' + vm.selected);
                
            }, function () {
               $log.info('Modal dismissed at: ' + new Date());
            });

        }
  
    })
    .controller('modalCtrl',function(dataServices, currentUser, $state, $uibModalInstance, items, $scope){


        var vm = this;
 
        console.log('modalCtrl', currentUser);
        
        vm.items = items;
        vm.selected = {
            item: vm.items[0]
        };
        
        $scope.ok = function () {
            $uibModalInstance.close(vm.selected.item);
        };
        
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
 
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
                $state.go('home');                
            }
        }
    
    })
    .controller('homeCtrl', function( $scope, $state, currentUser, dataServices, $q, $timeout, user, $log, $document) {
        /**
         *  Kotrollera om user är inloggad (cookieinfomation)
         *  och om inloggad läser in data.user
         * 
         */
         
        console.log('homeCtrl');         

        var vm = this;
        
        vm.data         = {},
        vm.fullName     = '',
        vm.loggedIn     = false,
        vm.search       = '',
        vm.mySearchEvent = mySearchEvent,  
        vm.init         = true,
        vm.mess         = 'foo',
        vm.changeSearch = changeSearch;
        vm.setFocus     = setFocus;
        vm.i            = i;


        //vm.setFocus("mySearch2");
        
        function setFocus(id){
            // var textbox = $document.getElementById(id);
            // textbox.focus();
            // textbox.scrollIntoView();
        }
        

        // Changed search field
        function changeSearch(){
            vm.init = false;
            //vm.setFocus("mySearch");
            //$scope.$broadcast("mySearch");
            //var textbox = $document.find("mySearch").attr("autofocus");
            //console.log('textbox', textbox );
            $timeout( function(){
                //$document.find("mySearch").attr("autofocus");
                //var x = $document.find('#mySearch');
                //x.attr("autofocus");
             document.getElementById("mySearch").focus();
             
            }, 1 );

        }
        
        function i(argument) {
            vm.init = false;
        }


        $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
         ];
        $scope.toggled = function(open) {
            $log.log('Dropdown is now: ', open);
        };

        /**
         * Main controller
         * 
         */

        // Sign in the first time
        currentUser.signedIn = false;
        dataServices.httpCacheRemoveUser();
        
        getUserSuccess(user);
        
        // dataServices.getSignedIn()
        //     .then(getUserSuccess, getUserError);
 
        // $timeout(function () {
        //       console.log('hoppaaa');  

        // });
        
        // $http.get(function(res){ 
        //     console.log(res) 
            
        // } /* Här lägger du det du vill vänta med tills requesten är klar */ , function(res){ console.error(res) })

  
        
        
        // Event handler
        $scope.$on('updateUser', updateUser);
        $scope.$on('signOut', signOut);
        $scope.$on('signIn', signIn);
        $scope.$on('search', mySearchEvent);
        
        // My event
        function mySearchEvent(event, data){
            switch(event.name) {
                
                // Search from start    
                case 'search':
                
                    console.log('search:', event);
                    vm.search = data;

                    
                break;
            default:
                alert('No event: ' + event.name);
            }
        }

        // Update user
        function updateUser (event, data){
            // When change user data!
            // Remove cach 'http'
            // Reload user info
            console.log('updateUser');
            dataServices.httpCacheRemoveUser(currentUser.userId);
            dataServices.getSignedIn().then(getUserSuccess, getUserError); 

            
        }
        
        // Sign out
        function signOut (event, data){
            // Remove cach 'http'
            // Remove other caches
            dataServices.httpCacheRemoveUser(currentUser.userId);
            dataServices.signOut(currentUser.userId);
            currentUser.signedIn = false;
            vm.loggedIn          = false;
            $state.go('home.route1');
            
        } 
        
        // Sign in
        function signIn (event, data){
            // Remove cach
            // Change user or sign in
            
            dataServices.httpCacheRemoveUser(currentUser.userId);
            dataServices.getSignedIn().then(getUserSuccess, getUserError); 
            $state.go('home.route1');       
            
        }
        

        // Get user success
        function getUserSuccess(data) {
            vm.loggedIn             = data.signed_in;
     //       appData.setUser(data);
            vm.fullName             = data.first_name + data.last_name;
            currentUser.signedIn    = true;
            currentUser.userId      = data.person_id;

            console.log('mainCtrl-getUser', currentUser);
        }  
        
        // Get user error
        function getUserError(error) {
            currentUser.signedIn    = false;
            console.log('error:', error );
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
    .controller('fileCtrl',function(dataServices, currentUser, $state, $scope, FileUploader){


        var vm = this;
        vm.file     =  {},
        vm.foo      = 'bar',
        vm.uploader = {};

        vm.uploader = new FileUploader({
            url: 'index.php/api/upload',
            alias: 'my_file',
            removeAfterUpload : true,
            headers : {myType: 'DINGALINGALENA'},
            formData: [{'ALFA':'PER'},{'BETA':'GUSTAFSON'}]
        });

        // FILTERS
      
        // a sync filter
        // vm.uploader.filters.push({
        //     name: 'syncFilter',
        //     fn: function(item /*{File|FileLikeObject}*/, options) {
        //         console.log('syncFilter');
        //         return this.queue.length < 10;
        //     }
        // });
      
        // an async filter
        vm.uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        vm.uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        vm.uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        vm.uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        vm.uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        vm.uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        vm.uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        vm.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        vm.uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', vm.uploader);        

        
    }) 
    .controller('storeCtrl',function(dataServices, currentUser, $state, $scope){


        var vm = this;
        vm.item     =  {},
        vm.store    = {},
        vm.signedIn =  currentUser.signedIn,
        vm.message  = '',
        vm.signedIn =  true;
        
        console.log('storeCtrl', currentUser);
        
        // Get store
        dataServices.getStore(currentUser.userId).then(getStoreSuccess, getStoreError);
        
        // Get store success
        function getStoreSuccess(data){
            currentUser.storeId = data.store_id; 
            vm.store = data;
            console.log('store', vm.store);
        }
        
        // Get store error
        function getStoreError(error){
            // Shall we create a store then? Maby!
            console.log('getStoreError', error);
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
    .controller('testCtrl', function($scope, user, $state, dataServices) {
        
        // Test deferred funktion
        dataServices.testDefer()
            .then(testDeferSuccess, null, testDeferNot)
            .catch(testDeferError)
            .finally(testDeferFinally);

        function testDeferSuccess(result) {
            console.log('testDeferSuccess', result);
        }         
        function testDeferError(error) {
            console.log('testDeferError', error);
        } 
        function testDeferNot(notification) {
            console.log('testDeferNot :'+ notification);
        } 
         function testDeferFinally() {
            console.log('testDeferFinally');
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
    .directive('focusOn', function($timeout) {
       return function(scope, element, attr) {
          scope.$on(attr.focusOn, function(e) {
              $timeout(function() {
                element[0].focus(); 
              });
          });
       };
});


}());
