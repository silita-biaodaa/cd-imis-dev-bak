
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from './axios/index'
Vue.prototype.$axios = axios

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)


import { InlineCalendar, XInput, Datetime, XTextarea, XButton, AlertPlugin, Group } from 'vux'
Vue.component('inline-calendar', InlineCalendar)
Vue.component('x-input', XInput)
Vue.component('datetime', Datetime)
Vue.component('x-textarea', XTextarea)
Vue.component('x-button', XButton)
Vue.component('group', Group)
Vue.use(AlertPlugin)
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// import { queryList } from "./api/index"
import util from "./util/util"
router.beforeEach((to, from, next) => {
  let code = util.getCode('code')
  if (!code) {
    util.weixinauth()
    // next()
  } else {
    queryList({ code: '1234' }).then(res => {
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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})