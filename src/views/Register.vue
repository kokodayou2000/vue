<template>

<div class="wrapper">
  <div style="margin:100px auto; background-color: #fff;
              width: 350px;height: 390px;
              padding: 20px;border-radius: 10px">
    <div style="margin: 10px 0; text-align: center;font-size: 24px;"><b>注 册</b></div>

    <el-form :model="user" :rules="rules" ref="userForm">
      <el-form-item prop="username">
      <el-input placeholder="请输入用户名" v-model="user.username" size="medium" style="margin: 5px 0" prefix-icon="el-icon-user"></el-input>
    </el-form-item>
      <el-form-item prop="nickname">
        <el-input placeholder="请输入昵称" v-model="user.nickname" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item prop="password">
      <el-input placeholder="请输入密码" v-model="user.password" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password></el-input>
    </el-form-item>
      <el-form-item prop="confirmPwd">
        <el-input placeholder="请确认密码" v-model="user.confirmPwd" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password></el-input>
      </el-form-item>
    </el-form>

    <div style="margin: 10px 0;text-align: right">
      <el-button type="primary" size="small" autpcomplete="off" @click="submitForm('userForm')">确定</el-button>
      <el-button type="warning" size="small" autpcomplete="off" @click="$router.push('/login')">返回登录</el-button>

    </div>



  </div>

</div>

</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      user:{
        username:"",
        password:"",
        nickname:"",
        confirmPwd:""
      },
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        confirmPwd: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],


      }
    }
  },
  methods: {
    login() {
      this.request.post("/user/register", this.user)
          .then(res => {
            if (res.code === '200') {
              localStorage.setItem("user",JSON.stringify(res.data)) //存储用户信息到浏览器
              this.$router.push('/login')
              this.$message.success("注册成功")
            } else {
              this.$message.error(res.msg)
            }
          })
    },
    submitForm(userForm) {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if (this.user.password !== this.user.confirmPwd){
            this.$message.error("两次密码不一致")
            return false
          }
          this.login()
        } else {
          console.log('error submit!!');
          this.$message.error("请输入符合标准的账号密码")
          return false;
        }
      });
    },
  }
}
</script>

<style>
.wrapper{
  height: 100vh;
  background-image: linear-gradient(to bottom right,#FC466B,#3F5EFB);
  overflow: hidden;
}


</style>