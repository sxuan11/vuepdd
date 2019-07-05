// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

// 引入路由器
import router from './router/index'
import LyTab from 'ly-tab'
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.jpg'
Vue.use(VueLazyload, {
  loading
});

Vue.use(LyTab);

//字体图标
import "@/common/css/style.css"

//引入mint-ui
import { Actionsheet } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

/* eslint-disable no-new */
new Vue({
  el:'#app',
  router,
  store,
  render: h=>h(App)
});

