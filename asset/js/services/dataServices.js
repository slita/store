(function() {
angular.module('app')
    .factory('dataServices', function ($http, $q, constant, $cacheFactory) {
        
        return {
          getUserData           : getUserData,
          getSignedIn           : getSignedIn,
          getItem               : getItem,
          httpCacheRemoveUser   : httpCacheRemoveUser
        };
        
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
                url: 'index.php/api/get_one_store/' + userId
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
        
        
        function successCallback(response){
            return response.data;
        }
        function errorHandle(response){
            return $q.reject('Error in app. (HTTP status:' + response.status + ')');
        }
        
        function httpCacheRemoveUser (){
            var httpCache = $cacheFactory.get('$http');
            if (httpCache) {
                httpCache.remove('index.php/api/signed_in/user');
            }            
        }
 
    });

}());