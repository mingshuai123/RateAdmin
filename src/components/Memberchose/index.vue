<template>
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
        <el-button @click="closedialog">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
</template>
<script>
export default {
  name: 'Memberchose',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    //   dialogFormVisible:false,
      dialogStatus: 'create',
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
  created() {},
  methods: {
    closedialog(){
        //   this.dialogFormVisible = false;

      this.$emit("closedialog", this.memberSeach);
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

    }
  }
}
</script>
