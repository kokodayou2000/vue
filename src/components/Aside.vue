<template>
  <el-menu :default-openeds="['1', '3']"
           style="min-height: 100%; overflow-x: hidden;"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapsed"
           router
  >

<!--    @select="handlerSelect"-->
    <!--          头部logo-->
    <div style="height: 60px;line-height: 60px;text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative;top:5px;margin-right: 5px;"/>
      <b style="color: white" v-show="logoTextShow">后台管理系统</b>
    </div>


<!--    <template v-for="item in menu_List" >-->
<!--      <el-submenu :index= "item.path" >-->
<!--        <template slot="title">-->
<!--          <i :class="item.icon"></i>-->
<!--          <span slot="title" >{{item.description}}</span>-->
<!--        </template>-->


<!--      <template v-for="subItem in item.children" v-if="item.children !== null">-->
<!--        <el-menu-item :index= "subItem.path" >-->
<!--          <template slot="title">-->
<!--            <i :class="subItem.icon"></i>-->
<!--            <span slot="title" >{{subItem.description}}</span>-->
<!--          </template>-->
<!--        </el-menu-item>-->
<!--      </template>-->

<!--      </el-submenu>-->
<!--    </template>-->

    <div v-for="item in menu_List" :key="item.id">
      <div v-if="item.path">
        <el-menu-item :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{item.description}}</span>
        </el-menu-item>
      </div>

      <div v-else>
        <el-submenu :index="item.id +''">
          <template slot="title">
            <i :class="item.icon"/>
            <span slot="title">{{item.description}}</span>
          </template>
          <div v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item :index="subItem.path">
              <i :class="subItem.icon"/>
              <span slot="title">{{subItem.description}}</span>
            </el-menu-item>
          </div>
        </el-submenu>
      </div>

    </div>



  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data(){
    return {
      menus:{},
      menu_List:{},
    }
  },
  props: {
    isCollapsed: Boolean,
    logoTextShow: Boolean
  },
  created() {

    this.menus = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    this.menu_List = this.menus.menuList;

    console.log(this.menus)
  },
  methods:{
    // handlerSelect(index){
    //   console.log(index)
    //   console.log(this.$router.options.routes)
    // }
    //当时为了省力，过滤了一级菜单
    // calList(){
    //   return this.menu_List.filter(l => l.pid !==0)
    // }

  },

}
</script>

<style scoped>

</style>