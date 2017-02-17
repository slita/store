

angular.module('app')
    .config(function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/route1")
      
      $stateProvider
        .state('home', {
          url: "/home",
          templateUrl: "asset/template/home/home.view.html"
        })
        .state('login', {
          url: "/login",
          templateUrl: "asset/template/login/login.view.html",
          controller:"LoginController",
          controllerAs: "vm"
        })
        .state('register', {
          url: "/register",
          templateUrl: "asset/template/register/register.view.html"
        })
        .state('route1', {
            url: "/route1",
            templateUrl: "asset/js/route1.html"
        })
          .state('route1.list', {
              url: "/list",
              templateUrl: "asset/js/route1.list.html",
              controller: function($scope){
                $scope.items = ["A", "List", "Of", "Items"];
              }
          })
          
        .state('route2', {
            url: "/route2",
            templateUrl: "asset/js/route2.html"
        })
          .state('route2.list', {
              url: "/list",
              templateUrl: "asset/js/route2.list.html",
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
    })