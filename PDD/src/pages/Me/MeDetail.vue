<template>
    <div class="user-detail">
      <div class="user-detail-top">
        <router-link tag="div" to="/me" class="router-l"><</router-link>
        <span>基本信息</span>
        <p>...</p>
      </div>
      <div class="user-detail-group">
        <div class="user-item">
          <span>头像</span>
          <img src="./images/me_icon.png" alt="">
        </div>
        <div class="user-item">
          <span>手机</span>
          <span>{{user_phone | phoneFormat }}</span>
        </div>
        <div class="user-item"  @click="changeName">
          <span>昵称</span >
          <span>{{user_name}}</span>
        </div>
        <div class="user-item" @click="sheetVisible = true">
          <span>性别</span>
          <span>{{user_sex}}</span>
        </div>
        <div class="user-item"  @click="changeAddress">
          <span>收货地址</span>
          <span>{{user_address}}</span>
        </div>
        <div class="user-item" @click="openPicker">
          <span>生日</span>
          <span>{{user_birthday}}</span>
        </div>
        <div class="user-item" @click="changeSign">
          <span>个性签名</span>
          <span>{{user_sign}}</span>
        </div>
      </div>
      <button class="btn" @click="saveUserInfo">修改</button>
      <!--选择性别-->
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
      <!--选择生日-->
      <mt-datetime-picker
        ref="picker"
        v-model="pickerValue"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate=startDate
        :endDate=endDate
        @confirm="handleConfirm"
      >
      </mt-datetime-picker>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import  moment from 'moment'
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import {mapActions} from 'vuex'
    import {changeUserInfo} from "../../api";
    export default {
        name: "MeDetail",
        data(){
          return{
            user_sign:'',//用户的个性签名
            user_address:'',//用户的地址
            user_name:'',//用户的昵称
            user_phone:'',
            user_birthday:'',
            user_sex:'',

            // 2. 性别
            sheetVisible: false,
            actions: [
              {name: '男', method: this.selectSex},
              {name: '女', method: this.selectSex},
            ],

            pickerValue:'',
            startDate:new Date('1960-01-01'),
            endDate:new Date(),
          }

        },
        computed:{
          ...mapState(['userInfo']),
        },
        mounted(){
          this.user_name=this.userInfo.user_name || '';
          this.user_sign=this.userInfo.user_sign || '未填写';
          this.user_address=this.userInfo.user_address || '未填写';
          this.user_phone=this.userInfo.user_phone || '未填写';
          this.user_birthday=this.userInfo.user_birthday || '未填写';
          this.user_sex=this.userInfo.user_sex || '未填写';
        },

        methods:{
          ...mapActions(["changeUserInfo"]),
          //修改个性签名
          changeSign(){
            MessageBox.prompt('请输入个性签名').then(({ value, action }) => {
              this.user_sign= value;
            })
          },
          //修改收获地址
          changeAddress(){
            MessageBox.prompt('请输入收货地址').then(({ value, action }) => {
              this.user_address= value;
            })
          },
          //修改昵称
          changeName(){
            MessageBox.prompt('请输入昵称').then(({ value, action }) => {
              this.user_name= value;
            })
          },
          //选择性别
          selectSex(name){
            console.log(name);
            this.user_sex = name.name;
          },
          //选择日期
          openPicker(){
            this.$refs.picker.open();
          },
          //保存生日
          handleConfirm(date){
            this.user_birthday=moment(date).format("YYYY年MM月DD日");
          },
          //保存所有修改
          async saveUserInfo(){
            let result =await changeUserInfo(
              this.userInfo.id,
              this.user_name,
              this.user_sex,
              this.user_address,
              this.user_birthday,
              this.user_sign,
            );
            Toast({
              message: result.message,
              position: 'bottom',
              duration: 2000
            });

            if (result.success_code === 200){
              this.$store.dispatch("getUserInfo");
            }
            setTimeout(()=>{
              this.$router.replace('/me')
            },1000)
          },
          },
        filters:{
          phoneFormat(user_phone){
            let phoneArr = [...user_phone];
            let str='';
            phoneArr.forEach((item,index)=>{
              if (index === 3 || index === 4 || index === 5 || index === 6) {
                str+="*"
              }else{
                str+=item;
              }
            });
            return str;
          }
        },

    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .user-detail-top
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
      padding-right 15px
  .user-detail-group
    display: flex
    flex-direction column
    background-color: #fff
    width: 100%
    height: 400px
    margin-top 5px
    .user-item
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
      height: 50px
      border-bottom 2px solid #fcfcfc
      margin-bottom 2px
      padding 5px
      img
        width: 10%
        border-radius 50px
        margin-right 15px
      span
        padding-right 15px
      input
        border none
        width: 50px
  .btn
    width: 80%
    margin-top 20px
    margin-left 10%
    background-color: #e9232c
    border-radius 10px
    border none
    color #f5f5f5
    height: 40px
    font-size 16px

</style>
