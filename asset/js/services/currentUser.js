(function (){
    
angular.module('app')
    .factory('currentUser', currentUser);
    
    function currentUser() {
        
        return {
            userId   : userId,
            storeId  : storeId,
            signedIn : signedIn
        };
        
        var userId = {};
        var storeId = {};
        var signedIn = {};
    }
    
    
}());