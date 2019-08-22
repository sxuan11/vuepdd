//引入模块
import Vue from 'vue'
import Router from 'vue-router'
import Home from './../pages/Home/Home'
import Recommend from './../pages/Recommend/Recommend'
import Chat from './../pages/Chat/Chat'
import Me from './../pages/Me/Me'
import Search from './../pages/Search/Search1'
import baihuo from '../pages/Home/Childiren/baihuo'
import mobile from '../pages/Home/Childiren/mobile'
import muying from '../pages/Home/Childiren/muying'
import xiebao from '../pages/Home/Childiren/xiebao'
import Dress from '../pages/Home/Childiren/Dress'
import Hot from '../pages/Home/Childiren/Hot/Hot'

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
    {
      path:'/home',
      component:Home,
      children:[
        //二级路由
        {path:'hot', component:Hot},
        {path:'baihuo', component:baihuo},
        {path:'mobile', component:mobile},
        {path:'muying', component:muying},
        {path:'xiebao', component:xiebao},
        {path:'Dress', component:Dress},
        {path: '/home', redirect:'hot'},
      ]
    },
    {
      path:'/recommend',
      component:Recommend
    },
    {
      path:'/chat',
      component:Chat
    },
    {
      path:'/me',
      component:Me
    },
    {
      path:'/search',
      component:Search
    },
  ]
})
