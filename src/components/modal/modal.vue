<template>
	<div class="m-modal-box" v-show="showMoadl">
		<div class="m-modal-content">
			<div class="m-modal-title">
				<span @click="closeModal">×</span>
				{{modalTitle}}
			</div>
			<div class="m-modal-body">
					<slot></slot>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export	default{
		props: ['modalShow', 'modalTitle'],
		computed:{
			showMoadl: function(){
				return this.modalShow;
			}
		},
		methods:{
			closeModal: function(){
				this.$emit('close');
			}
		}
	}
</script>


<style type="text/css">
	.m-modal-box{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.8);
	}
	
	.m-modal-content{
		position: absolute;
		left: 50%;
		top: 100px;
		transform: translateX(-50%);
		border-radius: 6px;
		background: #fff;
		-webkit-box-shadow: 0 3px 9px rgba(0,0,0,.5);
		box-shadow: 0 3px 9px rgba(0,0,0,.5);
	}

	.m-modal-title{
		background: #54b6d1;
		line-height: 34px;
		padding: 8px 15px;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		color: #fff;
		font-size: 16px;
	}

	.m-modal-title span{ 
		position: absolute; 
		right: 10px; 
		font-size: 24px;
		cursor: pointer; }
	.m-modal-body{ padding: 10px 15px;}
</style>