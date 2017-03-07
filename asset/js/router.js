
(function() {
angular.module('app')
    .config(function($stateProvider, $urlRouterProvider){
       console.log('router:');
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise('/route1');
      
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'asset/template/home/home.view.html',
          controller: 'homeCtrl',
          controllerAs: 'vm'
        })
        .state('home.detail', {
          url: '/details/:person_id',
          templateUrl: 'asset/template/home/home.detail.view.html',
          controller:'homeDetailCtrl',
          controllerAs: 'vm'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'asset/template/login/login.view.html',
          controller: 'loginCtrl',
          controllerAs: 'vm'
        })
        .state('account', {
          url: '/account',
          templateUrl: 'asset/template/register/account.view.html',
          controller: 'accountCtrl',
          controllerAs: 'vm'
        })
        .state('user', {
          url: '/user',
          templateUrl: 'asset/template/register/user.view.html',
          controller: 'userCtrl',
          controllerAs: 'vm'

        })
        .state('register', {
          url: '/register',
          templateUrl: 'asset/template/register/register.view.html',
          controller: 'registerCtrl',
          controllerAs: 'vm'
        })
        .state('item', {
          url: '/item',
          templateUrl: 'asset/template/item/item.view.html',
          controller: 'itemCtrl',
          controllerAs: 'vm'
        })
        .state('route1', {
            url: '/route1',
            templateUrl: 'asset/template/item/list.view.html',
            controller: 'itemListCtrl',
            controllerAs: 'vm',
            resolve: {
              user: function(resource, $stateParams) {
                return resource.getSignedIn();
              }
            }
        })
        .state('route2', {
            url: "/route2",
            templateUrl: "asset/js/route2.html",
            resolve: {
              user: function(resource, $stateParams) {
                return resource.getSignedIn();
              }
            },
            controller: function($scope){
                console.log('roter-inne-2');
            }
        })
          .state('route2.list', {
              url: '/list',
              templateUrl: 'asset/js/route2.list.html',
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
    });
}());