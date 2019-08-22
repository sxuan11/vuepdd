<template>
    <div class="home">
       <ly-tab
         v-model="selectedId"
         :items="items"
         :options="options"
         @change="handleChange"
         class="fix"
       >
       </ly-tab>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
          return{
            selectedId:0,//选中的id
            items:[
              {label:'热门'},
              {label:'女装'},
              {label:'百货'},
              {label:'鞋包'},
              {label:'母婴'},
              {label:'手机'},
              {label:'电器'},
              {label:'男装'},
              {label:'食品'},
              {label:'内衣'},
              {label:'运动'},
              {label:'美妆'},
              {label:'电脑'},
              {label:'汽车'},
              {label:'家纺'},
              {label:'医药'},
              {label:'家装'},
              {label:'家具'},
              {label:'水果'},
            ],
            options: {
              activeColor: "red"
              // 可在这里指定labelKey为你数据里文字对应的字段
            },
            subRouteUrl:[
              '/home/hot',
              '/home/baihuo',
              '/home/Dress',
              '/home/mobile',
              '/home/muying',
              '/home/xiebao',
            ]
          }
        },
        methods:{
          handleChange(item,index){
            this.$router.replace(this.subRouteUrl[index])
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .home
    background: #fff
    width: 100%
    height: 100%
  .fix
    position fixed
    left 0
    top 0
    z-index 998
</style>
