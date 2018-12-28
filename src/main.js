
import Vue from 'vue'
import App from './App'
// import VueRouter from 'vue-router'
import router from './router/router'
// import router from 'vue-router'
// Vue.use(VueRouter);
import axios from './axios/index'
Vue.prototype.$axios = axios

import { InlineCalendar, XInput, Datetime, XTextarea, XButton } from 'vux'
Vue.component('inline-calendar', InlineCalendar)
Vue.component('x-input', XInput)
Vue.component('datetime', Datetime)
Vue.component('x-textarea', XTextarea)
Vue.component('x-button', XButton)
// import Mint from 'mint-ui';
// Vue.use(Mint);

// var router = new VueRouter()

// new Vue({
//   // el: '#app',
//   router
//   // components: { App },
//   // template: '<App/>'
// })
// new Vue({
//   router
// }).$mount('#app')

// const router = new VueRouter({
//   routes // (缩写) 相当于 routes: routes
// })
import { queryList } from "./api/index"
import util from "./util/util"
router.beforeEach((to, from, next) => {
  let code = util.getCode('code')
  if (!code) {
    util.weixinauth()

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
  }
})

/* eslint-disable no-new */
// router.start(App, '#app')
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// router.start(App, '#app')  