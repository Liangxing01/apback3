<template>
	<div class="content">
		<div class="m-wMenu-btn">
			<button class="btn btn-info" @click="showModal">{{addModal}}</button>
			<myCheckbox :isChecked="icon" v-on:changeIcon="funClose"/>
		</div>
		<div class="m-wMenu-content">
			<table class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>名称</th>
						<th>域名</th>
						<th>IP</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="list in macList.list">
						<td>{{list.name}}</td>
						<td>{{list.domain}}</td>
						<td>{{list.ip}}</td>
						<td>
							<button class="btn btn-xs btn-danger" @click="deleteDnsMenu(list)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<myModal :modalShow="modal" :modalTitle="addModal" v-on:close="closeModal">
			<div class="m-wMenu-addContent">
				<div class="m-addCont-item">
					<label>名称：</label>
					<input type="text" name="" class="form-control" placeholder="请输入名称" v-model="addDnsParams.name">
				</div>
				<div class="m-addCont-item">
					<label>IP类型：</label>
					<select class="form-control" v-model="addDnsParams.family">
						<option value="4">ipv4</option>
						<option value="6">ipv6</option>
					</select>
				</div>
				<div class="m-addCont-item">
					<label>IP：</label>
					<input type="text" name="" class="form-control" placeholder="请输入IP" v-model="addDnsParams.ip">
				</div>
				<div class="m-addCont-item">
					<label>域名：</label>
					<input type="text" name="" class="form-control" placeholder="注：不能以http开头" v-model="addDnsParams.domain">
				</div>
				<div class="m-addCont-item">
					<button class="btn btn-primary" @click="addDnsMenu">点击提交</button>
				</div>
			</div>
		</myModal>
	</div>
</template>

<script type="text/javascript">
import myCheckbox from '@/components/checkbox/checkbox';
import myModal from '@/components/modal/modal';
const id = 'BPD8AE9000221E';

export default{
	data: () => {
		return {
			macList: '',
			modal: false,
			icon: false,
			addModal: '添加项目',
			client: null,
			addDnsParams:{
				name: '',
				domain: '',
				ip: '',
				family: 4,
			}
		}
	},
	methods:{
		init: function(){
			var mqtt = require('mqtt');
			this.client = mqtt.connect('mqtt://192.168.0.251:9000');

			this.client.on('connect', function(){
				this.client.subscribe( id + '/bpos/msg/dnshijackbydomain_tx');
				this.client.publish( id+'/bpos/cmd/dnshijackbydomain', '{"enable":-1,"action":2}')
			}.bind(this))

			this.client.on('message', function(topic, message){
				console.log(topic);
				if( topic == 'BPD8AE9000221E/bpos/msg/dnshijackbydomain_tx') {
					var data = JSON.parse(message.toString());
					this.macList = data;
					this.icon = data.enable;
				}
			}.bind(this))
		},
		addDnsMenu: function(){
			this.addDnsParams.enable = -1;
			this.addDnsParams.action = 1;
			this.addDnsParams.remote = 0;
			if( this.addDnsParams.name == ''){
				alert("名称不能为空,请重新输入！");
				return;
			}
			if( this.addDnsParams.ip == ''){
				alert("ip地址不能为空,请重新输入！");
				return;
			}
			if( this.addDnsParams.prefix == ''){
				alert("ip前缀不能为空,请重新输入！");
				return;
			}
			debugger;
			this.client.publish(id+'/bpos/cmd/dnshijackbydomain', JSON.stringify(this.addDnsParams));
			this.modal = false;
			this.client.publish(id+'/bpos/cmd/dnshijackbydomain', '{"enable":-1,"action":2}');
		},
		deleteDnsMenu: function(obj){
			obj.enable = -1;
			obj.action = 0;
			obj.remote = 0;
			debugger;
			this.client.publish(id+'/bpos/cmd/dnshijackbydomain', JSON.stringify(obj));
			this.client.publish(id+'/bpos/cmd/dnshijackbydomain', '{"enable":-1,"action":2}')
		},
		funClose: function(){
			this.icon = !this.icon;
			var obj = { enable: this.icon ? 1 : 0};
			this.client.publish( id+'/bpos/cmd/dnshijackbydomain', JSON.stringify(obj));
			this.client.publish( id+'/bpos/cmd/dnshijackbydomain', '{"enable":-1,"action":2}')
		},
		closeModal: function(){
			this.modal = false;
		},
		showModal: function(){
			this.modal = true;
		}
	},
	created:function(){
		this.init();
	},
	components:{
		myCheckbox, myModal
	}
}
</script>

<style type="text/css" scoped>
.m-wMenu-content table{ margin-top: 20px; }
.m-wMenu-content td, .m-wMenu-content th{ text-align: center; }
.u-checkbox{ float: right; margin-right: 20px; margin-top: 5px; }

.m-addCont-item label{ 
	display: inline-block; 
	width: 120px;
	line-height: 24px;
	padding: 5px 0;
	text-align: right;
}
.m-addCont-item{ margin: 10px 20px; }
.m-addCont-item select, .m-addCont-item input{ display: inline-block; }
.m-addCont-item input{ width: 240px; margin-right: 80px}
.m-addCont-item select{ width: 80px; }
.m-wMenu-addContent .m-addCont-item:last-child{ text-align: center; }
</style>