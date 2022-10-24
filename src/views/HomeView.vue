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
                      v-model="username"
            />
            <el-input style="width: 200px"
                      placeholder="请输入邮箱"
                      suffix-icon="el-icon-message"
                      class="ml-5"
                      v-model="email"
            />
            <el-button class ="ml-5" type="primary" @click="loadPage">搜索</el-button>
            <el-button class ="ml-5" type="warning" @click="reset">重置</el-button>
          </div>

          <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd"  class="ml-5">新增<i class="el-icon-circle-plus-outline"/></el-button>

            <el-popconfirm
                class="ml-5"
                confirm-button-text='确定'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确定批量删除吗？"
                @confirm="delBatch"
            >
              <el-button type="danger" slot="reference"  >批量删除<i class="el-icon-remove-outline"/></el-button>
            </el-popconfirm>

            <el-button type="primary"  class="ml-5">导入<i class="el-icon-bottom"/></el-button>
            <el-button type="primary"  class="ml-5">导出<i class="el-icon-top"/></el-button>
          </div>


          <el-table :data="tableData" border stripe
                    :header-cell-class-name="headerBg"
                    @selection-change="handleSelectionChange">
<!--多选框，为了批量删除-->
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>


            <el-table-column prop="id" label="id" width="40">
            </el-table-column>
            <el-table-column prop="username" label="用户名称" width="100">
            </el-table-column>
            <el-table-column prop="nickname" label="用户昵称" width="100">
            </el-table-column>
            <el-table-column prop="email" label="用户邮箱">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>

            <el-table-column prop="option" label="操作">
              <template v-slot="scope">
                <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"/></el-button>
                  <el-popconfirm
                      class="ml-5"
                      confirm-button-text='确定'
                      cancel-button-text='取消'
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定删除吗？"
                      @confirm="handleDelete(scope.row.id)"
                  >
                    <el-button type="danger" slot="reference" >删除<i class="el-icon-delete"/></el-button>
                  </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>


          <div style="padding: 10px 0">
<!--            size-change 和 current-change-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5,10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>

<!--          <el-dialog title="用户信息" :visible.sync="dialogTableVisible">-->
<!--            <el-table :data="gridData">-->
<!--              <el-table-column property="date" label="日期" width="150"></el-table-column>-->
<!--              <el-table-column property="name" label="姓名" width="200"></el-table-column>-->
<!--              <el-table-column property="address" label="地址"></el-table-column>-->
<!--            </el-table>-->
<!--          </el-dialog>-->

<!--          &lt;!&ndash; Form &ndash;&gt;-->
<!--          <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

          <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="70px">
              <el-form-item label="用户名">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
<!--              <el-form-item label="活动区域" >-->
<!--                <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--                  <el-option label="区域一" value="shanghai"></el-option>-->
<!--                  <el-option label="区域二" value="beijing"></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="save" >确 定</el-button>
            </div>
          </el-dialog>



        </el-main>
      </el-container>
    </el-container>
</template>

<script>

import request from "@/utils/request";

export default {
  name: 'Home',
  data(){
    return {
      tableData: [],
      total:0,
      records:[],
      msg: "Hello deng",
      pageNum:1,
      pageSize:5,
      isCollapsed:false,
      collapseBtnClass:'el-icon-s-fold',
      isCollapse:false,
      sideWidth:200,
      logoTextShow:true,
      headerBg:'headerBg',
      username: "",
      email:"",
      nickname:"",

      dialogTableVisible:false,
      dialogFormVisible:false,
      form:{},
      //全局变量记录要删除的集合
      multipleSelection:[]
    }
  },
  created() {
    // this.loadDataFunction();
    this.loadPage()
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
    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.loadPage()
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.loadPage()
    },
    //使用axios的优势的能在request里面设置一些通用数据，可以更好的设置参数
    loadPage(){
      request.get("/user/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          username:this.username,
          email:this.email
        }
      })
          .then(res => {
            this.tableData = res.records
            this.total = res.total
          })

      // fetch("http://localhost:8081/user/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&username="+this.username+"&email="+this.email)
      //     .then(
      //         res=>res.json() //将字符串转换为json
      //     ).then(res => {
      //   this.tableData = res.records;
      //   this.total = res.total;
      // })
      console.log("username= "+this.username+"  email= "+this.email)
    },
    reset(){
      this.username=""
      this.email=""
      this.loadPage()
    },
    handleAdd(){
      //显示新增页
      this.dialogFormVisible=true
      this.form={}
    },
    save(){
      request.post("/user",this.form).then( res=>{
        if (res){
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.loadPage()
        }else{
          this.$message.error("保存失败")
        }
        })
    },
    cancel(){
      this.loadPage()
      this.dialogFormVisible = false
    },
    handleEdit(row){
      this.form = row
      this.dialogFormVisible = true
    },
    handleDelete(id){
      request.delete("/user/"+id)
          .then(res =>{
            if(res){
              this.$message.success("删除成功")
              this.loadPage()
            }else{
              this.$message.error("删除失败")
            }}
          )
    },
    handleSelectionChange(val){
      //val就对应的复选框选择的数据
      this.multipleSelection=val
    },
    delBatch(){
      //执行批量删除的方法
      //将对象数组变成id的数组 [object1{},object2{},object3{}] -> [id1,id2,id3]
      let ids = this.multipleSelection.map(v => v.id)

      request.post("/user/del/batch",ids)
          .then(res =>{
            if(res){
              this.$message.success("批量删除成功")
              this.loadPage()
            }else{
              this.$message.error("批量删除失败")
            }}
          )

    }
  }

}
</script>
<style>
.headerBg{
  background-color: #eeeeee !important;
}
</style>