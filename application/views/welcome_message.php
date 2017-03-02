<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en" ng-app="app">
	
<head >
	<meta charset="utf-8">
	<title>Welcome</title>

    <!-- Bootstrap CSS -->
<!--    <link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/css/bootstrap.min.css" rel="stylesheet" />-->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  
	<link rel="stylesheet" href="asset/css/app.css">

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
	<!-- UI-Router -->
    <script src="//angular-ui.github.io/ui-router/release/angular-ui-router.js"></script>

    <script src="asset/js/app.js"></script>
    <script src="asset/js/router.js"></script>
    <script src="asset/js/login/login.controller.js"></script>
    
</head>

<body ng-controller="mainCtrl as vm">

<div id="container">


  <nav class="navbar navbar-default">
      <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Quick Start {{vm.loggedIn}}</a>
          </div>
          <ul class="nav navbar-nav">
            <li><a ui-sref="route1">Route 1</a></li>
            <li><a ui-sref="route2">Route 2</a></li>
            <li><a ui-sref="item">New item</a></li>

          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li ng-show="vm.loggedIn"><a ui-sref="account">{{vm.fullName}}</a></li>
            <li ng-show="!vm.loggedIn"><a ui-sref="login">Login</a></li>
          </ul>
      </div>
  </nav>  

	<div id="body">

		<div class="row">
	      <div class="span12">
	        <div class="well" ui-view=""></div>
	      </div>
	    </div>
		
	</div>

	  <p class="footer"> <a href="user_guide/">User Guide</a> - Page rendered in <strong>{elapsed_time}</strong> seconds. <?php echo  (ENVIRONMENT === 'development') ?  'CodeIgniter Version <strong>' . CI_VERSION .'- php:' .phpversion().'</strong>' : '' ?></p>
  </div>
   
</body>
 
</html>