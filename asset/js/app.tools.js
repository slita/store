// Code goes here
'use strict';

(function() {  
angular.module('app')
    .controller('alertCtrl',function(){


        var vm = this;
        vm.addAlert     = addAlert,
        vm.closeAlert   = closeAlert,
        vm.createAlert  = createAlert,
        vm.alerts       = [],
        vm.foo          = 'bar';
        
        
        console.info('alertCtrl');     
        
        
        function createAlert (){
            
        }
        
        function addAlert(data) {
            vm.alerts.push(data);

        }

        function closeAlert(index) {
            vm.nodeObject = null;
            vm.alerts.splice(index, 1);
        }
 

    }); 
}());
