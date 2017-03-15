(function() {
    
    angular.module('app')

    .factory('dataServices', function ($http, $q, constant, $cacheFactory, $timeout) {
        
        return {
          getUserData           : getUserData,
          getSignedIn           : getSignedIn,
          getItem               : getItem,
          httpCacheRemoveUser   : httpCacheRemoveUser,
          signOut               : signOut,
          signIn                : signIn,
          postUserData          : postUserData,
          insertNewUser         : insertNewUser,
          insertStoreItem       : insertStoreItem,
          insertStore           : insertStore,
          getStore              : getStore,
          insertItem            : insertItem,
          testDefer             : testDefer
        };
        
        function insertStore(data){
            return $http({
                method: 'POST',
                url: 'index.php/api/insert_store',
                data: data
            })
            .then(successCallback)
            .catch(errorHandle)           
        }      
        function insertItem(storeId,data){
            return $http({
                method: 'POST',
                url: 'index.php/api/insert_item/' + storeId,
                data: data
            })
            .then(successCallback)
            .catch(errorHandle)           
        }      
        function insertStoreItem(storeId,data){
            return $http({
                method: 'POST',
                url: 'index.php/api/insert_store_item/' + storeId,
                data: data
            })
            .then(successCallback)
            .catch(errorHandle)           
        }
        function insertNewUser(data) {
            
            return $http({
                method: 'POST',
                url: 'index.php/api/insert_person',
                data: data
            })
            .then(successCallback)
            .catch(errorHandle)
        }   
        function postUserData(userId,data){
            return $http({
                method: 'POST',
                url: 'index.php/api/update_person/' + userId,
                data: data
                })
                .then(successCallback)
                .catch(errorHandle)
        } 
        function getUserData (){
            return $http({
                method: 'GET',
                url: 'index.php/api/signed_in/user',
                headers: {'MyAppVersion': constant.APP_VERSION}
            })
            .then(successCallback)
            .catch(errorHandle)
        }
        function getSignedIn() {
            return $http({
                method: 'GET',
                url: 'index.php/api/signed_in/user',
                cache: true,
                headers: {'MyAppVersion': constant.APP_VERSION}
            })
            .then(successCallback)
            .catch(errorHandle)
        }
        function signIn(data){
            return $http({
                method: 'POST',
                url: 'index.php/api/login',
                data: data
                })
                .then(successCallback)
                .catch(errorHandle)
        }                
        function signOut(userId) {
            return $http({
                method: 'GET',
                url: 'index.php/api/logout/' + userId
            })
            .then(successCallback)
            .catch(errorHandle)
        }
        function getItem(userId){
            return $http({
                method: 'GET',
                url: 'index.php/api/items/' + userId
                })
            .then(successCallback)
            .catch(errorHandle)
        }
        function getStore(userId){
            return $http({
                method: 'GET',
                url: 'index.php/api/get_one_store/' + userId,
                cache: true
                })
                .then(successCallback)
                .catch(errorHandle)
        }     
        function successCallback(response){
            return response.data;
        }
        function errorHandle(response){
            return $q.reject('Error in app. (HTTP status:' + response.status + ')');
        }
        function httpCacheRemoveUser (userId){
            var httpCache = $cacheFactory.get('$http');
            if (httpCache) {
                httpCache.removeAll();
                // httpCache.remove('index.php/api/signed_in/user');
                // httpCache.remove('index.php/api/get_one_store/' + userId);
            }            
        }
        function testDefer (){
            var deferred = $q.defer();
        
            var list = [
                {'name': 'foo'},
                {'name': 'bar'}
            ];
        
            deferred.notify('Hej Agnes');
        
            // Wait for a sec...
            $timeout(function () {
              console.log('testDefer');  
     
                if (true) {
                    deferred.notify('Hej Per');
                    deferred.notify('Din lista kommer...');                    
                    
                    deferred.resolve(list);
                   

                } else {
                    deferred.reject('Error (55)...');
                }
            }, 2000); 
                
            //Promise
            return deferred.promise;           
        }

    });

}());