<template>
	<div class="loading2">
		<el-table
	    v-loading="loading" 
	    :element-loading-text="loadtext"
	    style="width: 100%" >

	  </el-table>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				data:' '
			}
		},
		props:{
			loadtext:{
				type:String
			},
			loading:{
				type:false
			}
		}
	}
</script>
<style scoped lang="less">
	.el-table__empty-block{display: none!important;}
</style>