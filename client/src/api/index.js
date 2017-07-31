
import axios from 'axios'


// Vue.prototype.$http = axios;
axios.defaults.baseURL = '/api'

export default {
	userLogin(data){
		return axios.post('/login',data)
	},
	getInfo(){
		return axios.get('/123')
	}
}