<template>
	<div class="login">
		<div class="login-form">
			<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
			  <el-form-item label="用户名" prop="username">
			    <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
			    <el-button @click="resetForm('ruleForm2')">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>	
		<loading :loadtext="loading.text" :loading="loading.loading"></loading>
	</div>
</template>
<script>
import loading from './loading'
	export default {
		data() {
				var validateUser = (rule, value, callback) => {
					if (value === '') {
						callback(new Error('请输入用户名'));
					} else {
						callback();
					}
				};
				var validatePass = (rule, value, callback) => {
					if (value === '') {
						callback(new Error('请输入密码'));
					} else {
						callback();
					}
				};

				return {
					ruleForm2: {
						username: '',
						pass: ''

					},
					rules2: {
						username: [{
							validator: validateUser,
							trigger: 'blur'
						}],
						pass: [{
							validator: validatePass,
							trigger: 'blur'
						}]
					},
					loading:{
						loading:false,
						text:''
					}
				}
			},
			methods: {
				submitForm(formName) {
					let user={
						username:this.ruleForm2.username,
						pass:this.ruleForm2.pass
					}
					this.$refs[formName].validate((valid) => {
						if (valid) {
							this.loading.loading=true;
							this.loading.text='登录中';
							this.$store.dispatch('UserLogin',user)
							this.$router.push({
                                    path: '/'
                                });
						} else {
							console.log('error submit!!');
							return false;
						}
					});
				},
				resetForm(formName) {
					this.$refs[formName].resetFields();
				}
			},
			components:{
				loading
			}
	}	
</script>
<style scoped lang="less">
	.login{
		width: 100%;
		margin:0 auto;
		.login-form{
			padding-right: 20px;
		}
	}
</style>