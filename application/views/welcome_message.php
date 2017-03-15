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
    <script src="asset/js/services/dataServices.js"></script>
    <script src="asset/js/services/constantService.js"></script>
    <script src="asset/js/services/currentUser.js"></script>
    
</head>



<div id="container">

	<div id="body">

		<div class="row">


	          <ui-view></ui-view>

	    </div>
		
	</div>

	  <p class="footer"> <a href="user_guide/">User Guide</a> - Page rendered in <strong>{elapsed_time}</strong> seconds. <?php echo  (ENVIRONMENT === 'development') ?  'CodeIgniter Version <strong>' . CI_VERSION .'- php:' .phpversion().'</strong>' : '' ?></p>
  </div>
   
</body>
 
</html>