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
						<th>MAC</th>
						<th>ip前缀</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="list in tcpList.list">
						<td>{{list.name}}</td>
						<td>{{list.ip}}</td>
						<td>{{list.prefix}}</td>
						<td>
							<button class="btn btn-xs btn-danger" @click="deleteTcpMenu(list)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<myModal :modalShow="modal" :modalTitle="addModal" v-on:close="closeModal">
			<div class="m-wMenu-addContent">
				<div class="m-addCont-item">
					<label>名称：</label>
					<input type="text" name="" class="form-control" placeholder="请输入名称" v-model="addTcpParams.name">
				</div>
				<div class="m-addCont-item">
					<label>IP类型：</label>
					<select class="form-control" v-model="addTcpParams.family">
						<option value="4">ipv4</option>
						<option value="6">ipv6</option>
					</select>
				</div>
				<div class="m-addCont-item">
					<label>IP：</label>
					<input type="text" name="" class="form-control" placeholder="请输入IP" v-model="addTcpParams.ip">
				</div>
				<div class="m-addCont-item">
					<label>IP前缀：</label>
					<input type="text" name="" class="form-control" placeholder="请输入IP前缀" v-model="addTcpParams.prefix">
				</div>
				<div class="m-addCont-item">
					<button class="btn btn-primary" @click="addTcpMenu">点击提交</button>
				</div>
			</div>
		</myModal>
	</div>
</template>

<script type="text/javascript">
import myCheckbox from '@/components/checkbox/checkbox';
import myModal from '@/components/modal/modal';

export default{
	data: () => {
		return {
			tcpList: '',
			icon: false,
			modal: false,
			addModal: '添加规则',
			client: null,
			id: 'BPD8AE9000221E',
			addTcpParams: {
				name: '',
				prefix: '',
				family: 4,
				ip: ''
			}
		}
	},
	methods:{
		init: function(){
			var mqtt = require('mqtt');
			this.client = mqtt.connect('mqtt://192.168.0.251:9000');

			this.client.on('connect', function(){
				console.log(111);
				this.client.subscribe( this.id + '/bpos/msg/tcpblockbyip_tx');
				this.client.publish( this.id+'/bpos/cmd/tcpblockbyip', '{"enable":-1,"action":2}')
			}.bind(this))

			this.client.on('message', function(topic, message){
				console.log(topic);
				if( topic == 'BPD8AE9000221E/bpos/msg/tcpblockbyip_tx') {
					var data = JSON.parse(message.toString());
					this.tcpList = data;
					this.icon = data.enable;
				}
			}.bind(this))
		},
		addTcpMenu: function(){
			this.addTcpParams.enable = -1;
			this.addTcpParams.action = 1;
			this.addTcpParams.remote = 0;
			if( this.addTcpParams.name == ''){
				alert("名称不能为空,请重新输入！");
				return;
			}
			if( this.addTcpParams.ip == ''){
				alert("ip地址不能为空,请重新输入！");
				return;
			}
			if( this.addTcpParams.prefix == ''){
				alert("ip前缀不能为空,请重新输入！");
				return;
			}
			debugger;
			this.client.publish( this.id+'/bpos/cmd/tcpblockbyip', JSON.stringify(this.addTcpParams));
			this.modal = false;
			this.client.publish( this.id+'/bpos/cmd/tcpblockbyip', '{"enable":-1,"action":2}');
		},
		deleteTcpMenu: function(obj){
			obj.enable = -1;
			obj.action = 0;
			obj.remote = 0;
			this.client.publish( this.id+'/bpos/cmd/tcpblockbyip', JSON.stringify(obj));
			this.client.publish( this.id+'/bpos/cmd/tcpblockbyip', '{"enable":-1,"action":2}')
		},
		funClose: function(){
			this.icon = !this.icon;
			var obj = { enable: this.icon ? 1 : 0, remote: 0};
			console.log(obj);
			this.client.publish( this.id+'/bpos/cmd/tcpblockbyip', JSON.stringify(obj));
			this.client.publish( this.id+'/bpos/cmd/tcpblockbyip', '{"enable":-1,"action":2}')
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