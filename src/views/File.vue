<template>
<div>

  <div style="margin: 10px 0">
    <el-input style="width: 200px"
              placeholder="请输入文件名称"
              suffix-icon="el-icon-search"
              v-model="name"
    />
    <el-button class ="ml-5" type="primary" @click="loadPage">搜索</el-button>
  </div>


  <div style="margin: 10px 0">

    <el-upload
        action="http://localhost:8081/user/import"

        :show-file-list="false"
        accept="xlsx"
        :on-success="handleFileUploadSuccess"
        style="display: inline-block"
    >
      <el-button type="primary"  class="ml-5" >上传文件<i class="el-icon-top"/></el-button>
    </el-upload>

    <el-popconfirm
        class="ml-5"
        confirm-button-text='确定'
        cancel-button-text='取消'
        icon="el-icon-info"
        icon-color="red"
        title="确定批量删除吗？"
        @confirm="delBatch"
    >
      <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline"/></el-button>
    </el-popconfirm>



    </div>

  <el-table :data="tableData" border stripe
            :header-cell-class-name="'headerBg'"
            @selection-change="handleSelectionChange">



    <!--多选框，为了批量删除-->
    <el-table-column
        type="selection"
        width="55">
    </el-table-column>




    <el-table-column prop="name" label="文件名称" width="100">
    </el-table-column>
    <el-table-column prop="type" label="文件类型" width="100">
    </el-table-column>
    <el-table-column prop="size" label="文件大小">
    </el-table-column>
    <el-table-column prop="url" label="下载">
      <template slot-scope="scope">
        <el-button type="primary" @click="download(scope.row.url)">下载</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="enable" label="启用">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.enable" @change="changeEnable(scope.row)" active-color="#13ce66" inactive-color="#ccc">
        </el-switch>
      </template>
    </el-table-column>


    <el-table-column prop="option" label="操作">
      <template v-slot="scope">
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

</div>

</template>

<script>
export default {
  name: "File",
  data() {
    return {
      tableData:[],
      name:'',
      multipleSelection:[],
      pageNum:1,
      pageSize:5,
      total:0,
    }

  },
  created() {
    this.loadPage()
  },

  methods: {
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
      this.request.get("/file/page",{
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
    save(){
      this.request.post("/file",this.form).then( res=>{
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
      this.request.delete("/file/"+id)
          .then(res =>{
            if(res.data === 'true'){
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

      this.request.post("/file/del/batch",ids)
          .then(res =>{
            if(res){
              this.$message.success("批量删除成功")
              this.loadPage()
            }else{
              this.$message.error("批量删除失败")
            }}
          )
    },

    handleFileUploadSuccess(res){
      console.log(res)
      this.$message.success("文件上传成功")
      this.loadPage()
    },
    download(url){
      window.open(url)
    },
    changeEnable(row){
      this.request.post("/file/update",row).then((res)=>{
        if(res.data === 'true'){
          this.$message.success("更新成功");
        }else{
          this.$message.error("更新失败");
        }
      })
    }



  }

}
</script>

<style scoped>

</style>