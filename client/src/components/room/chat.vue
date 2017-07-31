<template>
	<div class="chat">
		<template v-if="isDirection=='left'">
			<div class="left-chat chat-wrapper">
		      	<el-button>{{nickname}}</el-button>
		   		<div class="el-tooltip__popper is-dark" x-placement="right">{{text}}<div  class="popper__arrow" style="top: 11px;"></div></div>
		    </div>
		</template>
		<template v-if="isDirection=='right'">
			<div class="right-chat chat-wrapper">
			<el-button>{{nickname}}</el-button>
			<div class="el-tooltip__popper is-dark" x-placement="left" style="">{{text}}<div  class="popper__arrow" style="top: 11px;"></div></div> 	
		    </div>
    	</template>		
	</div>
</template>
<script>
	export default {
		props:{
			isDirection:{},
			nickname:{},
			text:{}
		},
		mounted(){
			this.$nextTick(()=>{
				
			})
		}
	}
</script>
<style scoped lang="less">
	.chat{
		.avtar{
			display: inline-block;
			width:60px;
			height: 30px;
			border-radius: 10px;
			background:#ff4949;
			text-align:center;
			line-height:30px;
			color:#fff;
		}
		.chat-wrapper{margin-bottom: 10px;}
		.left-chat{
			position:relative;
			text-align:left;
			.el-tooltip__popper{
				position: absolute;
				top: 0px;
				left: 60px; 
				transform-origin: left center 0px;
				z-index: 2000;
			}
		}
		.right-chat{
			position:relative;
			text-align:right;
			.el-tooltip__popper{
				position: absolute; 
				top: 0px;
				right: 60px;
				transform-origin: right center 0px;
				z-index: 2000;
			}
		}

	}

</style>