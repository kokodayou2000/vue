<template>
  <div>
    <el-container style="min-height: 100vh;">
<!--      overflow:hidden 表示溢出的时候自动隐藏-->
      <el-aside :width="sideWidth+'px'"
                style="background-color: rgb(238, 241, 246);
                /*阴影效果*/
                box-shadow: 2px 0 6px rgb(0 21 41 / 35%);"
      >
        <Aside :isCollapsed="isCollapsed" :logoTextShow="logoTextShow"/>
      </el-aside>

      <el-container>
        <el-header style="border-bottom: 1px solid #ccc;">
          <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" :user="user" :menu="user.menu_List"/>
        </el-header>

        <el-main>
<!--          表示当前页面的子路由会在 router-view里面展示-->
          <router-view @refreshUser="getUser" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

// import request from "@/utils/request";

import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: 'Home',
  data(){
    return {
      collapseBtnClass:'el-icon-s-fold',
      isCollapsed:false,
      sideWidth:200,
      logoTextShow:true,
      user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    }
  },
  components:{
    Aside,
    Header,
  },
  created() {
    //从后台拿到最新的数据
    this.getUser();
  },
  methods:{
    collapse(){
      //让侧边栏变小
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed){
        this.sideWidth=64;
        this.collapseBtnClass = 'el-icon-s-unfold';
        this.logoTextShow = !this.logoTextShow;
      }else{
        this.sideWidth=200;
        this.collapseBtnClass = 'el-icon-s-fold';
        this.logoTextShow = !this.logoTextShow;
      }
    },
    getUser(){
      //从浏览器缓存中得到userName
      let userName = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).username: "";
      //从后台获取数据，传送给header组件
      this.request.get("/user/getUserByName/"+userName).then((res)=>{
        //重新赋值
        this.user = res.data
      })
    }
  }
}
</script>
