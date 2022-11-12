<template>
<div>
  <el-row :gutter="10" style="margin-bottom: 40px;font-size: large">
    <el-col :span="6">
      <el-card style="color: #409EFF">
        <div><i class="el-icon-user-solid"/>用户总数</div>
        <div style="padding: 10px 0;text-align: center;font-weight: bold">
          <el-tag style="font-size: medium">
            100
          </el-tag>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card style="color: #67C23A">
        <div><i class="el-icon-money"/>金额总数</div>
        <div style="padding: 10px 0;text-align: center;font-weight: bold">
          <el-tag style="font-size: medium">
            100
          </el-tag>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card style="color: #F56C6C">
        <div><i class="el-icon-bank-card"/>销量总数</div>
        <div style="padding: 10px 0;text-align: center;font-weight: bold">
          <el-tag style="font-size: medium">
            100
          </el-tag>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card style="color: #E6A23C">
        <div><i class="el-icon-s-shop"/>门店总数</div>
        <div style="padding: 10px 0;text-align: center;font-weight: bold">
          <el-tag style="font-size: medium">
            100
          </el-tag>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="12">

      <div id="bar" style="width: 500px;height: 400px"/>

    </el-col>
    <el-col :span="12">
      <div id="pie" style="width: 500px;height: 400px"/>
    </el-col>
  </el-row>

</div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Home",
  methods:{


  },
  created() {

  },
  mounted() { //在div渲染之后在触发的
    let chartDom = document.getElementById('bar');
    let myChart = echarts.init(chartDom);
    let option = {
      title:{
        text :"各季度会员统计",
        subtext:"趋势图",
        left:'center'
      },
      tooltip:{
        trigger:'item'
      },
      legend:{
        orient:'vertical',
        left:'left'
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'星巴克',
          data: [],
          type: 'bar'
        },
        {
          name:'星巴克',
          data: [],
          type: 'line'
        },
        {
          name:'瑞幸',
          data: [],
          type: 'bar',
          color:'green'
        },
        {
          name:'瑞幸',
          data: [],
          type: 'line'
        },

      ]

    };



    this.request.get("/echarts/members").then(
        (res)=>{
          console.log(res.data)
          option.xAxis.data = res.data.x;
          option.series[0].data = res.data.y;
          option.series[1].data = res.data.y;

          option.series[2].data = [1,2,3,4];
          option.series[3].data = [1,2,3,4];
          myChart.setOption(option);
        }
    )

  }

}


</script>

<style scoped>

</style>