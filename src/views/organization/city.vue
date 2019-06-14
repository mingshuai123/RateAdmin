<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ memberInfo.name }}</div> -->
    <div class="page-title">
      <div class="left">全国星评委星评成员管理</div>
    </div>
    <div class="add" style="margin-bottom:20px">
    <el-button type="primary" size="mini" @click="handleAdd()">新增成员</el-button>
    </div>
    <el-table
    :data="list"
    border
    fit
    highlight-current-row
    style="width: 100%;"
    v-loading="listLoading"
    >
      <el-table-column label="姓名" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职务"  align="center">
        <template slot-scope="scope">
          <span>{{ roletype[scope.row.role_id]  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="待处理"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pending_num  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理中" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.working_num  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已超时" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timeout_num  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已处理"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.finish_num  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDel(row,'deleted')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close='closedialog'>
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="权限" prop="选择权限">
          <el-radio-group v-model="selsctroles" size="medium">
            <el-radio  label="1" border >星评员</el-radio>
            <el-radio  label="2" border >负责人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="成员" prop="选择成员" aria-required="选择成员">
          <el-input v-if='dialogStatus=="create"' v-model="memberSeach" @focus="isOnfocus?'':membershow()"  clearable />
          <el-input v-else v-model="memberSeach2" @focus="isOnfocus?'':membershow()"  clearable disabled/>
        </el-form-item>
        <!-- 成员列表 -->
        <div class="memlist" v-if='memlistshow'>
          <el-form-item v-for='(item,index) in memlist' :key="index" >
            <span>{{item.name?item.name:'未填写name'}}-{{item.mobile}}</span>
            <el-button size='small' @click.native.prevent="choseItem(item)">选择</el-button>
          </el-form-item>
        </div>
        <el-form-item  class="" v-else>
          <span>已选择</span>{{choseMember.name}}-{{choseMember.mobile}} <el-button icon="el-icon-close" size='small' circle @click="delchoseItem()"></el-button>
        </el-form-item >

      </el-form>
      <div slot="footer" class="dialog-footer left">
        <el-button @click="dialogFormVisible= false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Myspace',
  data() {
    return {
      dialogFormVisible:false,
      dialogStatus: '',
      textMap: {
        update: '修改星评员权限',
        create: '添加星评员'
      },
      memberSeach:'',
      memberSeach2:'',
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
  watch:{
    memberSeach:function(){
      this.getmemberList();
    }
  },
  created() {
    window.console.log(this.$store)
    this.getbaseInfo();
  },
  methods: {
    closedialog(){
      this.dialogFormVisible = false;
      this.selsctroles='';
      this.choseMember={};
      this.memlistshow=true;
      this.memlist=[];
      this.memberSeach='';
      this.isOnfocus=false;
    },
    choseItem(item){
      if(item.org_name!=''){
        this.$message.error('该用户是“'+item.org_name+'”的星评员。只有解除职务以后才可以选择')
      }else{
      this.memlistshow=false;
      this.choseMember=item;
      }
    },
    delchoseItem(){
      this.memlistshow=true;
      this.choseMember={};
    },
    membershow(){
      this.isOnfocus=true;
      this.getmemberList()
    },
    getmemberList(){
      let data={k:this.memberSeach}
      this.postAxios('common/judge/search',data).then((res)=>{
        window.console.log(res);
        if(res.code != 0){
          this.$message.error(res.message);
          return;
        }
        this.memlist=res.search_list
        if(res.search_list.length==0){
          this.$message.error("未查找到结果，该用户没有注册或者未填写真实姓名")
        }
      })
    },
    findmember(){
      this.getmemberList
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
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.choseMember=row;
      this.selsctroles= row.role_id==5?'2':'1';
      this.memberSeach2=row.name?row.name:'没名字'+'('+row.mobile+')'
      this.dialogStatus = 'update';
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
      this.postAxios('judge/list').then(res=>{
          if(res.code==0){
            this.list=res.judge_list
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
