<template>
  <div class="mytask-container">
    <div class="page-title">
      <div class="left"><i class="el-icon-bell" /> 全部任务</div>
    </div>
    <div class="mytaskitem">
      <el-row :gutter="12" class="rowcenter">
        <el-col :span="12">
          <div>
          <span style="display:inline-block;width:100px;text-align:right;">任务状态</span>
            <el-radio-group v-model="radio1" size="medium" border >
              <el-radio-button label="全部" style='margin:5px;border-radius: 0px' class="btn-radio" ></el-radio-button>
              <el-radio-button label="待处理" style='margin:5px;border-left:1px solid #DCDFE6;border-radius: 0px' class="btn-radio"></el-radio-button>
              <el-radio-button label="已处理" style='margin:5px;border-left:1px solid #DCDFE6;border-radius: 4px' class="btn-radio"></el-radio-button>
              <el-radio-button label="未开始" style='margin:5px;border-left:1px solid #DCDFE6;border-radius: 0px' class="btn-radio"></el-radio-button>
            </el-radio-group>
          </div>
          <div>
          <span style="display:inline-block;width:100px;text-align:right;">处理人</span>
            <el-radio-group v-model="radio2" size="medium" border>
              <el-radio-button label="全部" style='margin:5px;border-radius: 0px' class="btn-radio"></el-radio-button>
              <el-radio-button label="个人" style='margin:5px;border-left:1px solid #DCDFE6;border-radius: 0px' class="btn-radio"></el-radio-button>
              <el-radio-button label="本星评委" style='margin:5px;border-left:1px solid #DCDFE6;border-radius: 0px' class="btn-radio"></el-radio-button>
              <el-radio-button label="下属辖区" style='margin:5px;border-left:1px solid #DCDFE6;border-radius: 0px' class="btn-radio"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="12" style="padding:5px">
          <el-input v-model="listQuery" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleSeach" />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSeach">Search</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="address" label="任务" width='260' align='center'></el-table-column>
          <el-table-column prop="starnum" label="申请星级" align='center'></el-table-column>
          <el-table-column prop="name" label="任务状态" align='center'></el-table-column>
          <el-table-column prop="date" label="开始时间" align='center'></el-table-column>
          <el-table-column prop="name" label="当事人" align='center'></el-table-column>
          <el-table-column prop="state" label="评审状态" align='center'></el-table-column>
          <el-table-column prop="date" label="操作时间" align='center'></el-table-column>
          <el-table-column prop="date" label="完成时间" align='center'></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background :page-size=20 layout="prev, pager, next" :total="datatotal" @current-change='handleSizeChange' :current-page="page">
        </el-pagination>
      </el-row>
    </div>
    
  </div>
</template>

<script>
import { roleName } from '@/utils/validate'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'Mytask',
  directives: { waves },
  data() {
    return {
      name:roleName(this.$store.state.user.roleid),
      radio1:'全部',
      radio2:'全部',
      listQuery:'',
      datatotal:60,
      page:1,
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            starnum:'3',
            state:'初审中',
            address: '上海市普陀区金沙江路 1518 弄'
          }]
    }
  },
  watch: {
  },
  created(){
    window.console.log(this.$store)
    window.console.log()
  },
  methods: {
    handleSizeChange(val){
      console.log(val)
    },
    handleClick(item){
      console.log(item)
    },
    handleSeach(){
      console.log(this.listQuery)
    }
  }
}
</script>

<style lang="scss" scoped>
.mytask {
  &-container {
    margin: 30px;
    .page-title{
      margin-bottom: 30px;
      font-weight:bolder;
    }
    .rowcenter{
    text-align: center;
    }
    .filter-item{
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>