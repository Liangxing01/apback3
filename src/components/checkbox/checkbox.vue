<template>
	<div class="u-checkbox">
		<input type="checkbox" name="" v-model="showIsChecked">
		<div class="myIcon" @click="clickCheckbox">
			<label>功能启停：</label>
			<span :class="{active: !showIsChecked}">关</span><span :class="{active: showIsChecked}">开</span>
		</div>
	</div>
</template>

<script type="text/javascript">
	export	default{
		props:['isChecked'],
		computed:{
			showIsChecked: function(){
				return this.isChecked
			}
		},
		methods:{
			clickCheckbox: function(){
				this.$emit('changeIcon')
			}
		}
	}
</script>

<style type="text/css">
	.u-checkbox input{ display: none; }
	.myIcon{ display: inline-block; border-radius: 6px;}
	.myIcon span{
		padding: 5px 15px;
		font-size: 16px;
		line-height: 24px;
		color: #fff;
		cursor: pointer;
		background: #dcdcdc;
	}
	.myIcon span.active{background: #46b8da; }
</style>