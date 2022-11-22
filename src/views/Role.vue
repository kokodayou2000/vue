<template>
<div>
  <div style="margin: 10px 0">
    <el-input style="width: 200px"
              placeholder="请输入名称"
              suffix-icon="el-icon-search"
              v-model="name"
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
    <el-table-column prop="name" label="角色名称" width="100">
    </el-table-column>
    <el-table-column prop="description" label="角色信息" width="100">
    </el-table-column>
    <el-table-column prop="flag" label="唯一标识" width="100">
    </el-table-column>

    <el-table-column prop="option" label="操作">
      <template v-slot="scope">
        <el-button type="info" slot="reference" @click="handleAddMenu(scope.row.id)">分配菜单<i class="el-icon-menu"/></el-button>
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


  <el-dialog title="菜单分配" :visible.sync="menuDialogVisible" width="30%">
    <!--expanded 默认展开  checked 选中-->
    <el-tree
        :data="menuData"
        show-checkbox
        @check-change="handleCheckChange"
        node-key="id"
        ref="tree"
        :props="defaultProps"
        :default-expanded-keys="expands"
        :default-checked-keys="checks"
    >
      <span class="custom-tree-node" slot-scope="{node,data}">
        <span><i :class="data.icon"/>  {{data.name}}</span>
      </span>
    </el-tree>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="saveRoleMenu" >确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%">
    <el-form label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="唯一标识">
        <el-input v-model="form.flag" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save" >确 定</el-button>
    </div>
  </el-dialog>


</div>
</template>

<script>
export default {
  name: "Role",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:10,
      records:[],
      name: "",
      description:"",
      dialogTableVisible:false,
      dialogFormVisible:false,
      menuDialogVisible: false,
      menuForm: {},
      form:{},
      expands:[],
      checks:[],
      //全局变量记录要删除的集合
      multipleSelection:[],
      headerBg:'headerBg',
      menuData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleId:0,
    }
  },
  created() {
    // this.loadDataFunction();
    this.loadPage()
  },
  methods:{
    saveRoleMenu(){

      this.request.post("/roleMenu/"+this.roleId,this.$refs.tree.getCheckedKeys()).then(
          (res)=>{
            if (res.code === '200'){
              this.menuDialogVisible = false
              this.$message.success("修改成功")
            }else{
              this.$message.error("修改失败")
            }
          }
      )


    },
    handleCheckChange(data, checked, indeterminate) {
    },
    handleEditMenu(){
      this.dialogFormVisible = true
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
      this.request.get("/role/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
        }
      })
          .then(res => {
            this.tableData = res.records
            this.total = res.total
          })
    },
    reset(){
      this.name=""
      this.loadPage()
    },
    handleAdd(){
      //显示新增页
      this.dialogFormVisible=true
      this.form={}
    },
    handleAddMenu(roleId){
      this.menuDialogVisible=true

      this.roleId = roleId
      this.request.get("/menu/findAll")
          .then(res => {
            this.menuData = res.data
            //id的数组
            this.expands = this.menuData.map(v => v.id)
          })

      //将checks赋值
      this.request.get("/roleMenu/getIds/"+roleId)
          .then(res => {
            this.checks = res.data
          })

    },
    save(){

      this.request.post("/role",this.form).then( res=>{
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

      this.menuDialogVisible = false
      this.loadPage()
    },
    handleEdit(row){
      this.form = row
      this.dialogFormVisible = true
    },
    handleDelete(id){
      this.request.delete("/role/"+id)
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

      this.request.post("/role/del/batch",ids)
          .then(res =>{
            if(res){
              this.$message.success("批量删除成功")
              this.loadPage()
            }else{
              this.$message.error("批量删除失败")
            }}
          )
    },
  }

}
</script>

<style>
.headerBg{
  background-color: #eeeeee !important;
}
</style>