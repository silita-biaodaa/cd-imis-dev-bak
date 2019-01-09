
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from './axios/index'
Vue.prototype.$axios = axios

import './assets/js/flexible_css'
import './assets/js/makegrid'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import clocklist from '@/components/clockList'
import popup from '@/components/popup'
import head from '@/components/headgoto'
import { InlineCalendar, XInput, Datetime, XTextarea, XButton, AlertPlugin, Group } from 'vux'
Vue.component('inline-calendar', InlineCalendar)
Vue.component('x-input', XInput)
Vue.component('datetime', Datetime)
Vue.component('x-textarea', XTextarea)
Vue.component('x-button', XButton)
Vue.component('group', Group)
Vue.component('v-clock', clocklist)
Vue.component('v-popup', popup)
Vue.component('v-head', head)
// Vue.use(AlertPlugin)


//load层
var tpl=null;
Vue.prototype.loading =() =>{
  var loading = Vue.extend(require('@/components/loading.vue'));
  tpl = new loading().$mount().$el;  // 创建实例，挂载到文档以后的地方
  document.body.appendChild(tpl);
  return tpl
}
Vue.mixin({
  methods: {
    hideLoading: function () {
      if(tpl){
        document.body.removeChild(tpl);
      }
    }
  }
})

import { queryList,User } from "./api/index"
import util from "./util/util"
router.beforeEach((to, from, next) => {
  let code = util.getCode('code')
  if (!code) {
  //用户授权
  // util.weixinauth()
  next()
} else {
  var auth = localStorage.getItem('Authorization');

  console.log(to.fullPath);
  if(!auth||to.fullPath=='/home'){
    queryList({ code: code }).then(res => {
      if ( res.code == 1 ) {
      localStorage.setItem('Authorization', res.data.token)
      if(res.data.isFirst==0){
        //进入打卡设置
        next()
      }else{
        User({}).then( resd => {
          localStorage.setItem('userName',resd.data.name);
        })
      }

      if(res.data.isFirst==1){
        //进入打卡
        localStorage.setItem('tabNum','2');
        next('nav/card')
      }
      if(res.data.isFirst==2){
        //进入打卡圈
        localStorage.setItem('tabNum','0');
        next('nav/friend')
      }
    }
  })

  }else{
    next();
  }
}
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
