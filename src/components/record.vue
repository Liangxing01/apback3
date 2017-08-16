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
								name: '上报周期'
							},
							{
								name: '心跳周期'
							}
						],
			}
		}
	}
</script>

<style type="text/css">
	.m-gateway-title{
		background: #72d0eb; 
		line-height: 32px; 
		color: #fff; 
		font-size: 16px;
		padding: 5px 0 5px 15px;
	}
	.m-gateway-content{padding: 20px;border-top: none; }
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