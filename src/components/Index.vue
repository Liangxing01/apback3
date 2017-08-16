<template>
	<main>
		<HeaderList/>
		<NavList/>
		<section class="mainBox">
			<section class="mainContent">
				<router-view></router-view>
			</section>
		</section>
	</main>
</template>

<script type="text/javascript">
import	NavList from '@/components/Nav';
import HeaderList from '@/components/Header';

export default{
	components:{
		NavList, HeaderList
	}
}
</script>


<style type="text/css">
	.mainBox{ margin-top: 50px; margin-left: 240px; padding: 20px; background: #e1e1e1;}
	.mainContent{ 
		width: 100%;
		background: #fff; 
		min-height: 900px;
		border: 1px solid #e1e1e1;
		border-radius: 4px;
	}

	.content{ padding: 20px 10px; }
</style>