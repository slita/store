
(function() {
angular.module('app')
    .config(function($stateProvider, $urlRouterProvider){
       console.log('router:');
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise('/home');
      
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'asset/template/home/home.view.html',
          controller: 'homeCtrl',
          controllerAs: 'vm',
          resolve: {
            user: function(dataServices) {
              return dataServices.getSignedIn();
            }
          }
        })
        .state('home.detail', {
          url: '/details/:person_id',
          templateUrl: 'asset/template/home/home.detail.view.html',
          controller:'homeDetailCtrl',
          controllerAs: 'vm'
        })
        .state('home.login', {
          url: '/login',
          templateUrl: 'asset/template/login/login.view.html',
          controller: 'loginCtrl',
          controllerAs: 'vm'
        })
        .state('home.account', {
          url: '/account',
          templateUrl: 'asset/template/register/account.view.html',
          controller: 'accountCtrl',
          controllerAs: 'vm'
        })
        .state('home.account.user', {
          url: '/user',
          templateUrl: 'asset/template/register/user.view.html',
          controller: 'userCtrl',
          controllerAs: 'vm'
        })
        .state('home.register', {
          url: '/register',
          templateUrl: 'asset/template/register/register.view.html',
          controller: 'registerCtrl',
          controllerAs: 'vm'
        })
        .state('home.item', {
          url: '/item',
          templateUrl: 'asset/template/item/item.view.html',
          controller: 'itemCtrl',
          controllerAs: 'vm'
        })
        .state('home.route1', {
            url: '/route1',
            templateUrl: 'asset/template/item/list.view.html',
            controller: 'itemListCtrl',
            controllerAs: 'vm'
        })
        .state('home.route2', {
            url: "/route2",
            templateUrl: "asset/js/route2.html",
            controller: function($scope, currentUser){
             
                var vm = this;
                vm.userId = currentUser.userId;
                console.log('roter-inne-2', vm.userId);
               
            }
        })
          .state('route2.list', {
              url: '/list',
              templateUrl: 'asset/js/route2.list.html',
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
    })
    
    .run(function($rootScope) {

      // $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
       
        
      //     console.log('Successfully changed routes');
  
      // });
      // $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
  
      // });
      // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {
  
      // });
    
    });
}());