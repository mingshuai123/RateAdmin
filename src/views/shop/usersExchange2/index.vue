<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ memberInfo.name }}</div>
  </div>
</template>

<script>

export default {
  name: 'Myspace',
  data() {
    return {
      memberInfo: {},
    }
  },
  created() {
    this.getmemberInfo()
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
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
