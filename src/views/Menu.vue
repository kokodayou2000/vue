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
            row-key="id"
            default-expand-all
            @selection-change="handleSelectionChange"
  >
    <!--多选框，为了批量删除-->
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="id" width="80"></el-table-column>
    <el-table-column prop="name" label="名称" ></el-table-column>
    <el-table-column prop="path" label="路径" ></el-table-column>
    <el-table-column prop="icon" label="图标" >
      <template slot-scope="scope">
        <i :class="scope.row.icon" style="font-size: 25px"/>
      </template>
    </el-table-column>
    <el-table-column prop="description" label="描述" ></el-table-column>
    <el-table-column prop="option" label="操作" width="280">
      <template slot-scope="scope">
        <el-button type="info" @click="addChildrenMenu(scope.row.id)">新增子菜单<i class="el-icon-plus"/></el-button>
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





  <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%">
    <el-form label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="form.path" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标">
          <el-select clearable v-model="form.icon" placeholder="请选择" style="width: 80%">
            <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.value">
              <i :class="item.value" /> {{item.name}}
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="描述">
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
  name: "Menu",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      records: [],
      name: "",
      path: "",
      icon: "",
      description: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      menuDialogVisible: false,
      form: {},
      menuForm: {},
      //全局变量记录要删除的集合
      multipleSelection: [],
      headerBg: 'headerBg',
      options:[],
      }
  },
  created() {
    // this.loadDataFunction();
    //this.loadPage()
    this.loadAll()
  },
  methods:{
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    //使用axios的优势的能在request里面设置一些通用数据，可以更好的设置参数
    loadPage(){
      this.request.get("/menu/page",{
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
    addChildrenMenu(pid){
      this.dialogFormVisible = true;
      this.form={};
      if (pid){
        this.form.pid = pid;
      }
    },
    loadAll(){
      this.request.get("/menu/findAll", {
        params:{
          name:this.name
        }
      })
          .then(res => {
            this.tableData = res.data
            console.log(res)
          })
    },
    reset(){
      this.name=""
      this.loadAll()
    },
    handleAdd(){
      //显示新增页
      this.dialogFormVisible=true
      this.form={}
    },
    save(){
      this.request.post("/menu",this.form).then( res=>{
        if (res){
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.loadAll()
        }else{
          this.$message.error("保存失败")
        }
      })
    },
    saveMenu(){
      this.request.post("/menu",this.menuForm).then( res=>{
        if (res){
          this.$message.success("保存成功")
          this.menuDialogVisible = false
          this.loadAll()
        }else{
          this.$message.error("保存失败")
        }
      })
    },
    cancel(){
      this.loadAll()
      this.dialogFormVisible = false
    },
    handleEdit(row){
      this.form = row
      this.dialogFormVisible = true
      //请求图标的数据
      this.request.get("/dict/getIcons")
          .then( res =>{
          this.options = res.data
        }
      )
    },
    handleEditMenu(id){
      let userId = id
      this.menuDialogVisible = true
    },
    handleDelete(id){
      this.request.delete("/menu/"+id)
          .then(res =>{
            if(res){
              this.$message.success("删除成功")
              this.loadAll()
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

      this.request.post("/menu/del/batch",ids)
          .then(res =>{
            if(res){
              this.$message.success("批量删除成功")
              this.loadAll()
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