<template>
	<div class="room">
		<div class="top-wrapper"><span>{{nickname}}</span>聊天室</div>
		<div class="center-wrapper">
			<div v-if="join" class="join-msg"><span>{{join}}</span></div>
				<chat v-for="item in items" :key="item.id" :isDirection="item.dir" :nickname="item.name" :text="item.msg"></chat>
				
		</div>
		<div class="bot-wrapper">
			<textarea v-model="content"></textarea>
			<button @click="sendmsg">发送</button>
		</div>
	</div>
</template>
<script>
import chat from './chat'
import * as io from 'socket.io-client'
	export default {
			data(){
				return {
					content:'',
					nickname:'',
					socket:null,
					join:'',
					items:[]
				}
			},
			created(){
				this.nickname=window.localStorage.getItem('user')
				this.socket = io.connect('http://192.168.88.14:3000');
				let first=sessionStorage.getItem('first');

				if (!first) {
					this.socket.emit('join',this.nickname)
				}
				this.socket.on('hi',(data)=>{
				this.join=data;
				})		
				this.socket.on('recivemsg',(name,data,dir)=>{
					var o={
						name:name,
						msg:data,
						dir:dir
					}

				this.items.push(o);
				console.log('sss',this.items)
				})		
				this.socket.on('minerecivemsg',(name,data,dir)=>{
					var o={
						name:name,
						msg:data,
						dir:dir
					}
					this.items.push(o);
				})
			},
			methods:{
				sendmsg(){
					this.socket.emit('sendmsg',this.nickname,this.content)
				}
			},
			components:{
				chat
			}
	}
</script>
<style scoped lang="less">
	.room{
		width: 100%;
		overflow: hidden;
		margin:0 auto;
		.top-wrapper{
			position: fixed;
			top:0;
			left:0;
			width:100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			background: #20a0ff;
			color:#fff;
		}
		.bot-wrapper{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100px;
			border-top: 1px solid #20a0ff;
			display: flex;
			textarea{
				height: 100%;
				flex:1;
				font-size:16px;
			}
			button{
				height: 100%;
				border:none;
				background:#20a0ff;
				color: #fff;
				font-size: 20px;
				flex:0 0 100px;
			}
		}
		.center-wrapper{
			width: 100%;
			margin:50px 0 100px;
			height: 100%;
			box-sizing: border-box;;
			padding:10px;
			.join-msg{
				width:100%;
				text-align:center;
				margin-bottom: 10px;
				height: 20px;
				line-height:20px;
				color:#777;
				font-size:20px;
				span{
					padding: 0 10px;
					line-height:20px;
					background:#ccc;
				}
			}
		}
	}
</style>