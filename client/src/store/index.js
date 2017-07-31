import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/api'
Vue.use(Vuex)

const state={
	username:'',
	nickname:'',
	token:window.sessionStorage.getItem('token')
}

const mutations={
	'LOGIN':(state,data)=>{

		window.sessionStorage.setItem('token',data.token);
		window.localStorage.setItem('user',data.nickname)
		console.log(window.localStorage.getItem('user'))
	},
	'LOGOUT':(state)=>{
		state.token=null;
		window.sessionStorage.removeItem('token')
	},
	'USERNAME':(state,data)=>{
		state.name=data[0].num
	}
}

const actions={
	UserLogin({commit},data){
		api.userLogin(data).then((response)=>{
		commit('LOGIN',response.data)
		})
	},
	UserLogout({commit}){
		commit('LOGOUT')
	},
	UserName({commit}){
		api.getInfo().then((response)=>{
			commit('USERNAME',response.data)
		})
		
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})