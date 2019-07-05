//引入模块
import Vue from 'vue'
import Router from 'vue-router'


/* import Home from './../pages/Home/Home'
import Recommend from './../pages/Recommend/Recommend'
import Chat from './../pages/Chat/Chat'
import Me from './../pages/Me/Me'
import Search from './../pages/Search/Search'
import Login from '../pages/Login/Login' */

const Home = ()=>import('./../pages/Home/Home')
const Recommend = ()=>import('./../pages/Recommend/Recommend')
const Chat = ()=>import('./../pages/Chat/Chat')
const Me = ()=>import('./../pages/Me/Me')
const Search = ()=>import('./../pages/Search/Search')
const Login = ()=>import('./../pages/Login/Login')



import baihuo from '../pages/Home/Childiren/baihuo'
import mobile from '../pages/Home/Childiren/mobile'
import muying from '../pages/Home/Childiren/muying'
import xiebao from '../pages/Home/Childiren/xiebao'
import Dress from '../pages/Home/Childiren/Dress'
import Hot from '../pages/Home/Childiren/Hot/Hot'
// import Search1 from "../pages/Search/Search1";

import Loginz from '../pages/Login/Loginz'

import MeSetting from './../pages/Me/MeSetting'
import MeDetail from './../pages/Me/MeDetail'
//声明使用
Vue.use(Router);

//输出路由对象
export default new Router({
  //配置一级路由
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    //首页
    {
      path:'/home',
      component:Home,
      children:[
        //二级路由
        {path:'hot', component:Hot,meta:{
            showBottomTabBar:true
          }},
        {path:'baihuo', component:baihuo,meta:{
            showBottomTabBar:true
          }},
        {path:'mobile', component:mobile,meta:{
            showBottomTabBar:true
          }},
        {path:'muying', component:muying,meta:{
            showBottomTabBar:true
          }},
        {path:'xiebao', component:xiebao,meta:{
            showBottomTabBar:true
          }},
        {path:'Dress', component:Dress,meta:{
            showBottomTabBar:true
          }},
        {path: '/home', redirect:'hot'},

      ],
      meta:{
        showBottomTabBar:true
      }
    },
    //推荐
    {
      path:'/recommend',
      component:Recommend,
      meta:{
        showBottomTabBar:true
      }
    },
    //搜索
    {
      path:'/search',
      component:Search,
      meta:{
        showBottomTabBar:true
      }
    },
    //聊天
    {
      path:'/chat',
      component:Chat,
      meta:{
        showBottomTabBar:true
      }
    },
    //我的
    {
      path:'/me',
      component:Me,
      meta:{
        showBottomTabBar:true
      }
    },
    //登录
    {
      path:'/login',
      component:Login,
      meta:{
        showBottomTabBar:false
      }
    },
    {
      path:'/loginz',
      component:Loginz,
      meta:{
        showBottomTabBar:false
      }
    },
    {
      path:'/mesetting',
      component:MeSetting,
      meta:{
        showBottomTabBar:false
      }
    },
    {
      path:'/medetail',
      component:MeDetail,
      meta:{
        showBottomTabBar:false
      }
    },
  ]
})
