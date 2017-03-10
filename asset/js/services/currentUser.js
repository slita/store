(function (){
    
angular.module('app')
    .factory('currentUser', currentUser);
    
    function currentUser() {
        
        return {
            userId: userId 
        };
        
        var userId = {};
    }
    
    
}());