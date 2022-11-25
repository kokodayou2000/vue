<template>

<div class="wrapper">
  <div style="margin:200px auto; background-color: #fff;
              width: 350px;height: 300px;
              padding: 20px;border-radius: 10px">
    <div style="margin: 20px 0; text-align: center;font-size: 24px;"><b>登录</b></div>

    <el-form :model="user" :rules="rules" ref="userForm">

    <el-form-item prop="username">
      <el-input v-model="user.username" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user"> </el-input>
    </el-form-item>



    <el-form-item prop="password">
      <el-input v-model="user.password" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password></el-input>
    </el-form-item>



    </el-form>
    <div style="margin: 10px 0;text-align: right">
      <el-button type="primary" size="small" autpcomplete="off" @click="submitForm('userForm')">登录</el-button>
      <el-button type="warning" size="small" autpcomplete="off" @click="register()" >注册</el-button>
    </div>



  </div>

</div>

</template>

<script>
import {setRouters} from "@/router";

export default {
  name: "Login",
  data(){
    return {
      user:{
        username:"",
        password:""
      },
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    login() {
      this.request.post("/user/login", this.user)
          .then(res => {
            if (res.code === '200') {
              localStorage.setItem("user",JSON.stringify(res.data)) //存储用户信息到浏览器
              localStorage.setItem("menus",JSON.stringify(res.data.menuList)) //存储用户信息到浏览器
              //动态设置当前用户的路由
              setRouters();
              this.$router.push('/home')
              this.$message.success("登录成功")
            } else {
              this.$message.error(res.msg)
            }
          })
    },
    submitForm(userForm) {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!');
          this.$message.error("请按照规定输入账号密码")
          return false;
        }
      });
    },
    register(){
      this.$router.push("/register")
    }
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