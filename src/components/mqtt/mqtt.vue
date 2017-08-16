<template>
	<div>
		<input type="hidden" name="" :value="init" ref="client">
	</div>
</template>

<script type="text/javascript">
	export default{
		data: () => {
			return {
				client: null,
				id: 'BPD8AE9000221E',
			}
		},
		computed:{
			init: function(){
				var mqtt = require('mqtt');
				return this.client = mqtt.connect('mqtt://192.168.0.251:9000');
			}
		}
	}
</script>