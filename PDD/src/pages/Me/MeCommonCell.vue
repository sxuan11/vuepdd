<template>
    <div class="cell" @click="clickCell(leftTitle)">
      <div class="cell-left" :style="{color:leftTitleColor}">
        <i :class="leftIcon" v-show="leftIcon"></i>
        <span v-show="leftTitle">{{leftTitle}}</span>
      </div>
      <div class="cell-right" :style="{color:rightTitleColor}">
        <span class="right-title">{{rightTitle}}</span>
        <span class="icon" v-show="isShowRightArrow">></span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "MeCommonCell",
        props:{
          leftTitle:{
            type:String,
            default:''
          },
          leftIcon:{
            type:String,
            default:''
          },
          leftTitleColor:{
            type:String,
            default:''
          },
          rightTitle:{
            type:String,
            default:''
          },
          rightTitleColor:{
            type:String,
            default:''
          },
          rightIcon:{
            type:String,
            default:''
          },
          isShowRightArrow:{
            type:Boolean,
            default:true
          },
          clickCell:{
            type:Function,
            default:()=>{}
          },
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .cell
    height 40px
    background-color: #fff
    display: flex
    justify-content space-between
    align-items center
    padding 2px
    border-bottom 1px solid #f5f5f5
    margin-top 1px
    .cell-right
      display: flex
      align-items center
  .icon
    margin-right 5px
    color #d8d8d8
  .right-title
    color #999999
    font-size: 12px;
</style>
