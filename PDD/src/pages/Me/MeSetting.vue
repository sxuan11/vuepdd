<template>
    <div>
      <div class="manager">
        <router-link class="router-l" tag="div" to="/me"><</router-link>
        <span>账号管理</span>
        <p>...</p>
      </div>
      <div>
      <MeCommonCell left-icon="icon-send" left-title="实名认证" right-title="已实名认证" :clickCell="dealCellClick"/>
      <MeCommonCell left-icon="icon-deliver"  left-title="修改手机号" right-title="136****6666" :clickCell="dealCellClick"/>
      <MeCommonCell left-icon="icon-comment"  left-title="账号登录密码" right-title="定期修改更安全" :clickCell="dealCellClick"/>
    </div>
      <div style="margin-top: 10px">
        <MeCommonCell left-icon="icon-send" left-title="关联邮箱" right-title="已设置" :clickCell="dealCellClick"/>
        <MeCommonCell left-icon="icon-send" left-title="关联账号" right-title="未设置" :isShowRightArrow="false" :clickCell="dealCellClick"/>
      </div>
      <div style="margin-top: 10px">
        <MeCommonCell left-icon="icon-send" left-title="关联邮箱" right-title="已设置" :clickCell="dealCellClick"/>
      </div>
      <div class="logout" @click="dealLogout">
        <p>退出登录</p>
      </div>
    </div>
</template>

<script>
  import MeCommonCell from "./MeCommonCell"
  import {Toast,MessageBox } from 'mint-ui'
  import {mapActions} from 'vuex'
    export default {
        name: "MeSetting",
        data(){
          return{
            message:"确定要退出登录吗"
          }
        },
        components:{
          MeCommonCell,
        },
      methods: {
          ...mapActions(["logout"]),
        dealCellClick(leftTitle) {
          Toast('跳转' + leftTitle)
        },
        dealLogout() {
        MessageBox.confirm('确定要退出登录吗?').then(action => {
          if ("confirm" === action) {
              let result = this.logout({});
            console.log(result);
                 this.$router.replace('/home')

          }
        });
    }
    },
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .manager
    display: flex
    width: 100%
    height: 40px
    align-items center
    justify-content space-between
    background-color: #fff
    text-align center
    margin-bottom 5px
    .router-l
      padding-left 10px
    p
      font-size 20px
      padding-bottom 10px
      margin-right 15px
  .logout
    width: 100%
    height: 40px
    margin-top 10px
    background-color: #fff
    display: flex
    align-items center
    justify-content:center
</style>
