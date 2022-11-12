<template>
  <div>

  <div style="line-height: 60px;display: flex;" >
  <div style="flex:1;font-size:20px">
    <span :class="collapseBtnClass" style="cursor: pointer;font-size: 18px;" @click="collapse"></span>

    <el-breadcrumb separator="/" style="display: inline-block" class="ml-10" >

<!--      <el-breadcrumb-item :to="item.path" v-for="item in paths">{{item.name}}</el-breadcrumb-item>-->
      <el-breadcrumb-item :to="{ path: '/' }" >主页</el-breadcrumb-item>
      <el-breadcrumb-item >{{currentPathName}}</el-breadcrumb-item>

    </el-breadcrumb>

  </div>
    <img :src="user.avatarUrl"
         alt="" style="width: 45px;height:45px;border-radius: 50%;display:inline-block;position: relative;margin-top: 5px;margin-left: 5px">
  <el-dropdown style="width:70px;cursor: pointer;">

<span>

    <span style="display:inline-block;">{{user.nickname}}</span>
      <i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
</span>


    <el-dropdown-menu slot="dropdown" style="width: 100px;text-align: center" >
      <el-dropdown-item style="font-size: 16px" >
        <router-link to="/UserDetail">
        个人信息
        </router-link>
      </el-dropdown-item>
      <el-dropdown-item style="font-size: 16px">
        <span @click="logout()" style="text-decoration: none">退出</span>
        </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>

  </div>
</template>

<script>
export default {
  name: "Header",
  props:{
    collapseBtnClass:String,
    collapse:Function,
    user:Object,
  },
  computed:{
    currentPathName(){
      return this.$store.state.currentPathName;
    }
  },
  watch:{
    // '$route':function (){
    //   this.currentPathName = localStorage.getItem("currentPathName")
    // }
    currentPathName(newVal){
      console.log(newVal)
    }
  },
  data(){
    return{
      // currentPathName:''
      //
      //user: localStorage.getItem("user") ?  JSON.parse(localStorage.getItem("user")) : {}

    }
  },
  methods:{

    logout(){
      this.$router.push("/login")
      localStorage.removeItem("user")
      this.$message.success("退出成功")
    }
  }
}
</script>

<style scoped>

</style>