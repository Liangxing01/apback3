<template>
	<table>
		<thead>
			<tr>
				<th v-for="(index,col) in th_data">{{col.text}}</th>
			</tr>
		</thead>
		<tbody>
			
		</tbody>
	</table>
</template>

<script type="text/javascript">
	export	default{
		props: {
			th_data:{
				type: Array,
				require: true,
			},
			url:{
				type: String,
				require: true,
			},
			pageNum:{
				type: Number,
				default: 10
			}
		},

		

		data: () =>{
			return{
				total: 0,
				curr: 1,
				data: [],
				params:{},
			}
		}
	}
</script>