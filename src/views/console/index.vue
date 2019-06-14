<template>
  <div class="mytask-container">
    <div class="page-title">
      <div class="left">{{name}}</div>
    </div>
    <div class="mytaskitem">
      <el-row style="margin-bottom:10px;"><el-col :span='24'><i class="el-icon-bell" />我的任务</el-col></el-row>
      <el-row :gutter="12" class="rowcenter">
        <el-col :span="6">
          <el-card shadow="hover">
            <div>6</div>
            <div>待处理任务</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div>1</div>
            <div>已超时任务</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div>8</div>
            <div>已处理任务</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div>128</div>
            <div>部门任务</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>

<script>
import { roleName } from '@/utils/validate'
export default {
  name: 'Mytask',
  data() {
    return {
      name:roleName(this.$store.state.user.roleid),
      id:'123'
    }
  },
  watch: {
  },
  created(){
    window.console.log(this.$store)
    window.console.log()
  },
  methods: {
  
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
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>