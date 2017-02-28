

angular.module('app')
    .config(function($stateProvider, $urlRouterProvider){
      
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
        .state('register', {
          url: '/register',
          templateUrl: 'asset/template/register/register.view.html',
          controller: 'registerCtrl',
          controllerAs: 'vm'
        })
        .state('route1', {
            url: '/route1',
            templateUrl: 'asset/js/route1.html',
            resolve: {
              user: function(resource, $stateParams) {
              return resource.getSignedIn();
            }
          }
        })
          .state('route1.list', {
              url: '/list',
              templateUrl: 'asset/js/route1.list.html',
              controller: function($scope){
                $scope.items = ["A", "List", "Of", "Items"];
              }
          })
          
        .state('route2', {
            url: "/route2",
            templateUrl: "asset/js/route2.html"
        })
          .state('route2.list', {
              url: '/list',
              templateUrl: 'asset/js/route2.list.html',
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
    });