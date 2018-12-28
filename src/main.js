
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from './axios/index'
Vue.prototype.$axios = axios

import { InlineCalendar, XInput, Datetime, XTextarea, XButton, AlertPlugin } from 'vux'
Vue.component('inline-calendar', InlineCalendar)
Vue.component('x-input', XInput)
Vue.component('datetime', Datetime)
Vue.component('x-textarea', XTextarea)
Vue.component('x-button', XButton)
Vue.use(AlertPlugin)
// import Mint from 'mint-ui';
// Vue.use(Mint);

import { queryList } from "./api/index"
import util from "./util/util"
router.beforeEach((to, from, next) => {
  let code = util.getCode('code')
  if (!code) {
    util.weixinauth()
      // next()
  } else {

    queryList({ code: code }).then(res => {
      console.log(11111)
      // console.log(res, 36)
      alert(res.data.openid + '' + res.data.nickname)
       if ( res.code == 1 ) {
         localStorage.setItem('Authorization', res.data.token) 
          if (!res.data.isFirst) {
              next()               
          } else {
            if(to.fullPath==='/text'){
              next();
            }else{
              next('/text')
            }            
          }
       }
    }) 
    // next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})