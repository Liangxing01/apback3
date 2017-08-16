<template>
	<section clsas="m-gateway-box">
		<h4 class="m-gateway-title">网关设置</h4>
		<div class="m-gateway-content">
			<ul class="m-gateway-list">
				<li v-for="list in gatewayList">
					<label>{{list.name}}:</label>
					<input type="text" name="" class="form-control">
				</li>
			</ul>
			<div class="m-gateway-footer">
				<button class="btn btn-primary">确认提交</button>
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">

	export default{
		data: () => {
			return{
							gatewayList: [
							{
								name: '设备ID'
							},
							{
								name: '管理接口IPv4地址'
							},
							{
								name: '管理接口IPv4掩码'
							},
							{
								name: '管理接口IPv4网关'
							},
							{
								name: '管理接口IPv6地址'
							},
							{
								name: '管理接口IPv6前缀长度'
							},
							{
								name: '管理接口IPv6网关'
							},
							{
								name: '云服务器地址'
							},
							{
								name: '云服务器端口'
							},
							{
								name: 'IPv4 DNS'
							},
							{
								name: 'iPv6 DNS'
							},
						]
			}
		},
	}
</script>

<style type="text/css" scoped>
	.m-gateway-box{ 
		border: 1px solid #e1e1e1;
		border-radius: 4px;
		box-shadow: 0 1px 2px 1px transparent;
		-webkit-box-shadow: 0 1px 2px 1px transparent;
		-moz-box-shadow: 0 1px 2px 1px transparent; 
	}
	.m-gateway-title{
		background: #72d0eb; 
		line-height: 32px; 
		color: #fff; 
		font-size: 16px;
		padding: 5px 0 5px 15px;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	.m-gateway-content{
		padding: 20px;
		border-top: none;
	}
	.m-gateway-list li{ margin-bottom: 10px; }
	.m-gateway-list li label, .m-funStar-list li label{
		display: inline-block;
		font-weight: normal;
		width: 160px;
		line-height: 32px;
		text-align: right;
	}
	.m-gateway-list li input{
		display: inline-block;
		width: 320px;
	}

	.m-gateway-footer{ text-align: center;margin-top: 20px;width: 480px; }
</style>