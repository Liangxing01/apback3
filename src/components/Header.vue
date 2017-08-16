<template>
	<header class="m-head-box">
		<img src="../assets/logo.png"/>
		<span class="loginName">超级管理员</span>
	</header>
</template>
<style type="text/css">
	.m-head-box{ 
		position: fixed;
		top: 0; 
		height: 50px; 
		background: #72d0eb; 
		width: 100%; 
		z-index: 2; 
	}

	.m-head-box img{
		height: 36px;
		margin-top: 7px;
		margin-left: 10px;
	}
	.loginName{ float: right; 
		margin-right: 20px;
		margin-top: 7px;
		line-height: 36px;
		color: #fff;
		font-size: 14px;
	}
</style>