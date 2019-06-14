<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ memberInfo.name }}</div> -->
    <div class="page-title">
      <div class="left">全国星评委管理</div>
    </div>
    <div class="add" style="margin-bottom:20px">
    <el-button type="primary" size="mini" @click="handleAdd()">新增省星评委</el-button>
    </div>
    <el-table
    :data="list"
    border
    fit
    highlight-current-row
    style="width: 100%;"
    v-loading="listLoading"
    >
      <el-table-column label="负责人"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="职务"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.admin_name?scope.row.admin_name:'无名字'}}({{ scope.row.admin_mobile}})</span>
        </template>
      </el-table-column>
      <el-table-column label="负责地区"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.regions  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="dialogFormVisible2=true">修改</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDel(row,'deleted')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title='添加省级星评委' :visible.sync="dialogFormVisible2" center>
      <el-form ref="dataForm"  :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="选择权限" aria-required="选择成员">
          <el-input v-model="dialoginfo.name"  clearable />
        </el-form-item>
        <el-form-item label="主要负责人" prop="选择成员">
          <el-input v-if='dialogStatus=="create"' v-model="dialoginfo.judge_name" @focus="dialogFormVisible=true"  clearable />
          <div v-else><span>已选择</span>{{choseMember.name}}-{{choseMember.mobile}} <el-button icon="el-icon-close" size='small' circle @click="delchoseItem()"></el-button></div>
        </el-form-item>
        <el-form-item label="负责省份" prop="选择成员">
          <el-button  size="mini" v-for="(item,index) in dialoginfo.region_ids" :key="index">{{item}}</el-button>
          <el-button icon="el-icon-edit" circle size="mini"></el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer left">
        <el-button @click="handleUpdate()">
          取消
        </el-button>
        <el-button type="primary" @click="dialogFormVisible2=false">
          确认
        </el-button>
      </div>
    </el-dialog>

    <Memberchose :dialogFormVisible='dialogFormVisible' :dialogStatus='dialogStatus'  @closedialog='closedialog' ></Memberchose>
  </div>
</template>

<script>
import Memberchose from '@/components/Memberchose'
export default {
  name: 'Myspace',
  data() {
    return {
      dialogFormVisible:false,
      dialogFormVisible2:false,
      dialoginfo:{
        name:'',
        judge_name:'',
        region_ids:[1,2,3],
      },
      dialogStatus: '',
      selsctroles:'',
      memlistshow:true,
      memlist:[],
      choseMember:{},
      temp:{
        roles:'',
        memberid:'',
      },
      isOnfocus:false,
      listLoading:false,
      list:[],
      roletype:{
        '3':'星评员', '4':'星评管理员',  '5':'星评超级管理员', '6':'全国星评','7':'业主'
      }
    }
  },
  components:{Memberchose},
  watch:{},
  created() {
    window.console.log(this.$store)
    this.getbaseInfo();
  },
  methods: {
    closedialog(){
      this.dialogFormVisible = false;
    },
    createData(){
      window.console.log("createData")
      window.console.log(this.selsctroles)
    },
    updateData(){
      window.console.log("updateData")

    },
    handleAdd(){
      this.dialogStatus = 'create';
      this.dialogFormVisible2 = true
    },
    handleUpdate(row) {
      // this.choseMember=row;
      // this.selsctroles= row.role_id==5?'2':'1';
      // this.memberSeach2=row.name?row.name:'没名字'+'('+row.mobile+')'
      // this.dialogStatus = 'update';
      this.dialogFormVisible = true
    },
    handleDel(row){
      let str=row.name?row.name:'未命名'+'('+row.mobile+')'
       this.$confirm('确定要将 '+str+' 从本星评委中移除么', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getbaseInfo(){
      this.postAxios('org/list').then(res=>{
          if(res.code==0){
            this.list=res.org_list;
          }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .page-title{
      margin-bottom: 30px;
      font-weight:bolder;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>
