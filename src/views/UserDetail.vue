<template>
<el-card style="width: 400px;border: #cccccc solid">
  <el-form label-width="70px">

    <el-upload
        class="avatar-uploader"
        action="http://localhost:8081/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
      <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar" alt="">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>


    <el-form-item label="用户名">
      <el-input v-model="form.username" :disabled="true" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input v-model="form.nickname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" :disabled="true" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.phone" :disabled="true" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-input type="textarea" v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">确定</el-button>
    </el-form-item>

  </el-form>
</el-card>

</template>

<script>
export default {
  name: "Person",
  data(){
    return {
      form:{},
      user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,

    }
  },
  created() {
    this.getUser()


  },
  methods:{
    getUser(){
      this.request.get("/user/getUserByName/"+this.user.username).then(
          (res)=>{
            console.log(res)
            this.form = res.data;
          }
      )
    },
    save(){
      this.request.post("/user",this.form)
          .then(res => {
            if (res) {
              this.$message.success("保存成功")
              //重新加载user对象，为了实时刷新用户头像等相关信息

              //触发父级更新User的方法
              this.$emit("refreshUser")

              //更新浏览器缓存
              this.getUser();
              this.user.token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
              console.log(this.user.token);
              this.user.nickname = this.form.nickname;

              this.user.password = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).password : null;
              this.user.username = this.form.username;
              localStorage.setItem("user",JSON.stringify(this.user));

              /*
              //重新刷新页面的方法不是很好
              let user = this.form
              let token = JSON.parse(localStorage.getItem("user")).token
              user.token = token;
              localStorage.setItem("user",JSON.stringify(user));
              location.reload();
               */

            }else{
              this.$message.error("保存失败")
            }
          })
    },
    handleAvatarSuccess(res){
      console.log(res);
      this.form.avatarUrl = res;
    }
  }
}
</script>

<style>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>