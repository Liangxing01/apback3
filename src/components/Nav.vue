<template>
	<nav class="m-nav-content">
	  <ul class="primaryNav">
	    <li v-for="(list,index) in lists" :data-id="index" :class="{active: list.active}">
	      <a v-if="list.hasChild" href="javascript:void(0)" @click="showChild($event)" >
	      	<span class="icon" :class="list.icon"></span>
	      	{{list.name}}
	      </a>
	      <router-link v-else :to="list.addr">
	      	<span class="icon" :class="list.icon" @click=""></span>
	      	{{list.name}}
	      </router-link>
	      <transition name="fade">
		      <ul v-if="list.hasChild" v-show="list.active" class="subNav">
		      	<li v-for="(child, num) in list.child" @click="clickSubNav($event)" :data-parent="index" :data-id="num" :class="{active: child.active}">
		      		<router-link :to="child.addr">{{child.name}}</router-link>
		      	</li>
		      </ul>
	      </transition>
	    </li>
	  </ul>
	</nav>
</template>

<script type="text/javascript">
	export default {
		data: function (){
			return{
				lists: [
					{ 
						name: '概览',
						addr: '/hello',
						icon: 'glyphicon glyphicon-play-circle',
						active: false,
						hasChild: false,
					},
					{
						name: '平台设置',
						addr: '',
						icon: 'glyphicon glyphicon-list-alt',
						active: false,
						hasChild: true,
						child:[
							{
								name: '基本设置',
								addr: '/index/baseSetting',
								active: false,
							},
							{
								name: 'IP白名单',
								addr: '/index/IPWMenu',
								active: false,
							},
							{
								name: 'MAC白名单',
								addr: '/index/MacMenu',
								active: false,
							},
							{
								name: 'Tcp封禁',
								addr: '/index/TcpMenu',
								active: false,
							},
							{
								name: 'DNS劫持',
								addr: '/index/DnsMenu',
								active: false,
							},
							{
								name: '网页重定向',
								addr: '/index/WebReNav',
								active: false,
							},
						],
					},
					{
						name: '无线认证',
						addr: '',
						icon: 'glyphicon glyphicon-lock',
						active: false,
						hasChild: true,
						child:[
							{
								name: '基本配置',
								addr: '/index/base',
								active: false,
							},
							{
								name: '流量记录',
								addr: '/index/record',
								active: false,
							},
							{
								name: '内网合法IP',
								addr: '/index/legitimateIp',
								active: false,
							},
						],
					},
					{
						name: '注销',
						icon: 'glyphicon glyphicon-earphone',
						addr: '/main/contack_us',
						active: false,
						hasChild: false
					}
				]
			}
		},
		methods:{
			showChild: function(targ){
				var num = parseInt(targ.target.parentNode.getAttribute('data-id'));
				this.reActive();
				this.lists[num].active = !this.lists[num].active;
			},
			reActive:function(){
				this.lists.map(function(data){
					if(data.active == true){
						data.active = false;
					}else{
						data.hasChild && data.child.map(function(data){
							data.active && (data.active = false);
						})
					}
				})
			},
			clickSubNav:function(event){
				var num = event.target.parentNode.getAttribute('data-id');
				var parentId = event.target.parentNode.getAttribute('data-parent');
				this.lists[parentId].child.map(function(data){
					data.active = false;
				})
				this.lists[parentId].child[num].active = true;
			}
		}
	}	
</script>

<style type="text/css" ecope>
	.m-nav-content{
		position: fixed;
		left: 0;
		width: 240px;
		padding: 10px 0;
		height: 100%;
		background:#1C2B36;
		overflow-y: auto;
	}
	.m-nav-content a{ 
		display: inline-block;
		width: 100%;
		color: #667fa0;
		font-size: 12px;
		text-decoration: none;
		padding: 8px 15px 8px 2px;
		line-height: 24px;
	}
	.m-nav-content span{ color: #667fa0; font-size: 12px;}
	.m-nav-content .primaryNav li > a { text-indent: 48px; }
	.primaryNav>.active span{ color: #FFF; }
	.primaryNav>.active>a{ color: #fff; background:#121e1f}
	.primaryNav>.active> ul{background:#17232C }
	.m-nav-content a:hover{ color: #fff; background: #1C2B36;}
	.m-nav-content li{ 
		line-height: 32px;
		font-size: 14px;
		position: relative;
 	}
 	.m-nav-content li .icon{ position: absolute; left: -20px; top: 13px; }
	/*.m-nav-content .primaryNav > .active{ background: #55CCDC; }*/
	.m-nav-content .subNav{ background: #131E25; }
	.m-nav-content .subNav > .active a{ color: #fff;  text-decoration: none;}
 	.fade-enter-active, .fade-leave-active{ transition: opacity .5s ease-in-out}
 	.fade-enter, .fade-leave-to{ opacity: 0 }
</style>