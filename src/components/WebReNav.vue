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
						<th>原网址</th>
						<th>跳转地址</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="list in macList.list">
						<td>{{list.name}}</td>
						<td>{{list.url}}</td>
						<td>{{list.rdurl}}</td>
						<td>
							<button class="btn btn-xs btn-danger" @click="deleteWebMenu(list)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<myModal :modalShow="modal" :modalTitle="addModal" v-on:close="closeModal">
			<div class="m-wMenu-addContent">
				<div class="m-addCont-item">
					<label>名称：</label>
					<input type="text" name="" class="form-control" placeholder="请输入名称" v-model="addWebParams.name">
				</div>
				<div class="m-addCont-item">
					<label>原网址：</label>
					<input type="text" name="" class="form-control" placeholder="注：不能有http开头" v-model="addWebParams.url">
				</div>
				<div class="m-addCont-item">
					<label>跳转网址：</label>
					<input type="text" name="" class="form-control" placeholder="注：必须有http或https开头" v-model="addWebParams.rdurl">
				</div>
				<div class="m-addCont-item">
					<button class="btn btn-primary" @click="addWebMenu">点击提交</button>
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
			icon: false,
			modal: false,
			addModal: '添加重定向',
			addWebParams:{
				name: '',
				url: '',
				rdurl: ''
			}
		}
	},
	methods:{
		init: function(){
			var mqtt = require('mqtt');
			this.client = mqtt.connect('mqtt://192.168.0.251:9000');

			this.client.on('connect', function(){
				this.client.subscribe( id + '/bpos/msg/httpredirect_tx');
				this.client.publish( id+'/bpos/cmd/httpredirect', '{"enable":-1,"action":2}')
			}.bind(this))

			this.client.on('message', function(topic, message){
				console.log(topic);
				if( topic == 'BPD8AE9000221E/bpos/msg/httpredirect_tx') {
					var data = JSON.parse(message.toString());
					this.macList = data;
					this.icon = data.enable;
				}
			}.bind(this))
		},
		addWebMenu: function(){
			this.addWebParams.enable = -1;
			this.addWebParams.action = 1;
			this.addWebParams.remote = 0;
			if( this.addWebParams.name == ''){
				alert("名称不能为空,请重新输入！");
				return;
			}
			if( this.addWebParams.url == ''){
				alert("地址不能为空,请重新输入！");
				return;
			}
			if( this.addWebParams.rdurl == ''){
				alert("重复不能为空,请重新输入！");
				return;
			}
			this.client.publish(id+'/bpos/cmd/httpredirect', JSON.stringify(this.addWebParams));
			this.modal = false;
			this.client.publish(id+'/bpos/cmd/httpredirect', '{"enable":-1,"action":2}');
		},
		deleteWebMenu: function(obj){
			obj.enable = -1;
			obj.action = 0;
			obj.remote = 0;
			this.client.publish(id+'/bpos/cmd/httpredirect', JSON.stringify(obj));
			this.client.publish(id+'/bpos/cmd/httpredirect', '{"enable":-1,"action":2}')
		},
		funClose: function(){
			this.icon = !this.icon;
			var obj = { enable: this.icon ? 1 : 0};
			this.client.publish( id+'/bpos/cmd/httpredirect', JSON.stringify(obj));
			this.client.publish( id+'/bpos/cmd/httpredirect', '{"enable":-1,"action":2}')
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
	components: {
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