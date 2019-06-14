<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ memberInfo.name }}</div> -->
    <div class="page-title">
      <div class="left">基本资料</div>
    </div>
    <el-form :model="basedata" label-width="150px" >
      <el-form-item label="场所名称"  required>
        <el-input v-model="basedata.name" disabled ></el-input>
      </el-form-item>
      <el-form-item label="场所地址"  required>
        <el-input v-model="basedata.address" disabled ></el-input>
      </el-form-item>
      <el-form-item label="联系人"  required>
        <el-input v-model="basedata.linkman" disabled ></el-input>
      </el-form-item>
      <el-form-item label="联系电话"  required>
        <el-input v-model="basedata.phone" disabled ></el-input>
      </el-form-item>
      <el-form-item label="营业执照(扫描件)"  required>
          <img v-if="basedata.licenseimg" :src="basedata.licenseimg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-form-item>
      <el-form-item label="消防证(扫描件)"  required>
          <img v-if="basedata.fireimg" :src="basedata.fireimg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-form-item>
      <el-form-item label="场所经营许可证(扫描件)"  required>
        <img v-if="basedata.businessimg" :src="basedata.businessimg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-form-item>
      <el-form-item label="建筑施工图(扫描件)"  required>
        <img v-if="basedata.buildingimg" :src="basedata.buildingimg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Myspace',
  data() {
    return {
      memberInfo: {},
      basedata:{
        name:''
      },
    }
  },
  created() {
    console.log(this.$store)
    // this.getmemberInfo()
    // this.getbaseInfo();
    // this.getbusinessinfo();
    // this.getfileUrl();
  },
  methods: {
    getmemberInfo() {
        var _this=this;
        this.postAxios('member/info').then(res=>{
            if(res.errCode==0){
                _this.memberInfo=res.memberInfo;
            }else{
                this.$router.path(`/login`)
            }
        })
    },
    getbaseInfo(){
      var _this=this;
            this.postAxios('netbar/authinfo').then(json=>{
                console.log(json)
                if(json.netbarInfo!=null){
                    var data=json.netbarInfo;
                    _this.issubmit=true;
                    _this.basedata.name=data.name;
                    _this.oldName=data.name;
                    _this.basedata.companyname=data.companyName;
                    _this.basedata.address=data.address;
                    _this.basedata.legalman=data.legalMan;
                    _this.basedata.linkman=data.linkMan;
                    _this.basedata.job=data.job;
                    _this.basedata.phone=data.phone;
                    _this.basedata.licenseimg=data.licenseImg;
                    _this.basedata.fireimg=data.fireImg;
                    _this.basedata.superviseimg=data.superviseImg;
                    _this.basedata.businessimg=data.businessImg;
                    _this.basedata.buildingimg=data.buildingImg;
                    _this.barstate=data.state;
                    if(data.state==0){
                        _this.resubmit=true;
                    }
                }else{
                    window.location.href='basehandler.html'
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
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: auto;
    height: 100px;
    display: block;
  }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>
