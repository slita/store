<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en" ng-app="app">
	
<head >
	<meta charset="utf-8">
	<title>Welcome</title>

    <!-- Bootstrap CSS -->
    <link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/css/bootstrap.min.css" rel="stylesheet" />
  
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
	<h1>Welcome to CodeIgniter! </h1>
    <div class="navbar">
      <div class="navbar-inner">
        <a class="brand" href="#">Quick Start</a>
        <ul class="nav">
          <li>
            <a ui-sref="route1">Route 1</a>
          </li>
          <li>
            <a ui-sref="route2">Route 2</a>
          </li>
          <li>
            <a ui-sref="home">Home</a>
          </li>          
          <li>
            <a ui-sref="login">Login</a>
          </li>          
          <li>
            <a ui-sref="register">Register</a>
          </li>
        </ul>
      </div>
    </div>
    
	<div id="body">
		<div class="row">
	      <div class="span12">
	        <div class="well" ui-view=""></div>
	      </div>
	    </div>
		
		<p> kolla detta: https://github.com/michalsn/CodeIgniter-AngularJS-App</p>	
		<p>Name: <input type="text" ng-model="name"></p>
		<p ng-bind="name"></p>
		<p>Vm: {{vm.a}} </p>
        {{list}}
	</div>

	<p class="footer"> <a href="user_guide/">User Guide</a> - Page rendered in <strong>{elapsed_time}</strong> seconds. <?php echo  (ENVIRONMENT === 'development') ?  'CodeIgniter Version <strong>' . CI_VERSION . '</strong>' : '' ?></p>
</div>
   
</body>
 
</html>