<template>
    <el-container style="min-height: 100vh;">
<!--      overflow:hidden 表示溢出的时候自动隐藏-->
      <el-aside :width="sideWidth+'px'"
                style="background-color: rgb(238, 241, 246);
                /*阴影效果*/
                box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
        ">
        <el-menu :default-openeds="['1', '3']"
                 style="min-height: 100%; overflow-x: hidden;"
                 background-color="rgb(48,65,86)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse-transition="false"
                 :collapse="isCollapsed"
        >
<!--          头部logo-->
          <div style="height: 60px;line-height: 60px;text-align: center">
            <img src="../assets/logo.png" alt="" style="width: 20px; position: relative;top:5px;margin-right: 5px;"/>
          <b style="color: white" v-show="logoTextShow">后台管理系统</b>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span slot="title" >导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title" >导航二</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title" >导航三</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
<!--        line-heigth:60px 就是让文字居中了 ，60这个数字是通过开发者模式看到这个容器的高度是60的 -->
        <el-header style="font-size: 12px;border-bottom: 1px solid #ccc;line-height: 60px;display: flex">
          <div style="flex:1;font-size:18px">
            <span :class="collapseBtnClass" style="cursor: pointer;" @click="collapse"></span>
          </div>
          <el-dropdown style="width:70px;cursor: pointer;">
<!--            <i class="el-icon-setting" style="margin-right: 15px"></i>-->
            <span>王小虎</span> <i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>

        <el-main>
          <div style="margin-bottom: 10px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
          </el-breadcrumb>

          </div>

          <div style="margin: 10px 0">
            <el-input style="width: 200px"
                      placeholder="请输入名称"
                      suffix-icon="el-icon-search"
            />
            <el-input style="width: 200px"
                      placeholder="请输入邮箱"
                      suffix-icon="el-icon-message"
                      class="ml-5"
            />
            <el-button class ="ml-5" type="primary">搜索</el-button>
          </div>

          <div style="margin: 10px 0">
            <el-button type="primary">新增<i class="el-icon-circle-plus-outline"/></el-button>
            <el-button type="danger">批量删除<i class="el-icon-remove-outline"/></el-button>
            <el-button type="primary">导入<i class="el-icon-bottom"/></el-button>
            <el-button type="primary">导出<i class="el-icon-top"/></el-button>
          </div>


          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column prop="option" label="操作">
              <template>
                <el-button type="success">编辑<i class="el-icon-edit"/></el-button>
                <el-button type="danger">删除<i class="el-icon-delete"/></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding: 10px 0">
            <el-pagination
                :page-sizes="[5, 10,15, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

export default {
  name: 'Home',
  data(){
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(10).fill(item),
      msg: "Hello deng",
      isCollapsed:false,
      collapseBtnClass:'el-icon-s-fold',
      isCollapse:false,
      sideWidth:200,
      logoTextShow:true,
      headerBg:'headerBg'
    }
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

    }
  }

}
</script>
<style>
.headerBg{
  background-color: #eeeeee !important;
}
</style>