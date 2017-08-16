<template>
	<div class="content">
		<div class="m-wMenu-btn">
			<button class="btn btn-info" @click="showModal">{{addTitle}}</button>
			<myCheckbox :isChecked="icon" v-on:changeIcon="funClose"/>
		</div>

		<div class="m-wMenu-content">
			<table class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>名字</th>
						<th>IP</th>
						<th>IP前缀</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="list in tableDate.list">
						<td>{{list.name}}</td>
						<td>{{list.ip}}</td>
						<td>{{list.prefix}}</td>
						<td>
							<button class="btn btn-xs btn-danger" @click="deleteTraMenu(list)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<myModal :modalShow="modal" :modalTitle="addTitle" v-on:close="closeModal">
			<div class="m-wMenu-addContent">
				<div class="m-addCont-item">
					<label>IP：</label>
					<input type="text" name="" class="form-control" placeholder="请输入IP" v-model="addTrafParams.ip">
				</div>
				<div class="m-addCont-item">
					<label>IP前缀：</label>
					<input type="text" name="" class="form-control" placeholder="请输入IP前蕞" v-model="addTrafParams.prefix">
				</div>
				<div class="m-addCont-item">
					<button class="btn btn-primary" @click="addTraMenu">点击提交</button>
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
			tableDate: '',
			icon: false,
			modal: false,
			client: null,
			addTitle: '添加合法IP',
			addTrafParams:{
				ip: '',
				prefix: ''
			}
		}
	},
	methods:{
		init: function(){
			var mqtt = require('mqtt');
			this.client = mqtt.connect('mqtt://192.168.0.251:9000');

			this.client.on('connect', function(){
				this.client.subscribe( id + '/bpos/msg/trafficdir_tx');
				this.client.publish( id+'/bpos/cmd/trafficdir', '{"enable":-1,"action":2,"remote":0}')
			}.bind(this))

			this.client.on('message', function(topic, message){
				if( topic == id + '/bpos/msg/trafficdir_tx') {
					var data = JSON.parse(message.toString());
					this.tableDate = data
					this.icon = data.enable;
				}
			}.bind(this))
		},
		addTraMenu: function(){
			this.addTrafParams.enable = -1;
			this.addTrafParams.action = 1;
			this.addTrafParams.remote = 0;
			if( this.addTrafParams.ip == ''){
				alert("ip地址不能为空,请重新输入！");
				return;
			}
			if( this.addTrafParams.prefix == ''){
				alert("ip前缀不能为空,请重新输入！");
				return;
			}
			this.client.publish(id+'/bpos/cmd/trafficdir', JSON.stringify(this.addTrafParams));
			this.modal = false;
			this.client.publish(id+'/bpos/cmd/trafficdir', '{"enable":-1,"action":2}');
		},
		deleteTraMenu: function(obj){
			obj.enable = -1;
			obj.action = 0;
			obj.remote = 0;
			debugger;
			this.client.publish(id+'/bpos/cmd/trafficdir', JSON.stringify(obj));
			this.client.publish(id+'/bpos/cmd/trafficdir', '{"enable":-1,"action":2}')
		},
		funClose: function(){
			this.icon = !this.icon;
			var obj = { enable: this.icon ? 1 : 0, remote: 0};
			this.client.publish( id+'/bpos/cmd/trafficdir', JSON.stringify(obj));
			this.client.publish( id+'/bpos/cmd/trafficdir', '{"enable":-1,"action":2}')
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

<style type="text/css">
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