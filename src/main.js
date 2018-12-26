// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'

// import axios from './api/index';
// Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */


// Vue.filter('phoneFilter', function(value) {
//   if(value&&value.indexOf(";")!=-1){ 
//     let newStrArr = value.split(";");

//       return newStrArr[1];
//   }
//   return value;
// });

import { queryList } from "./api/index"
import util from "./util/util";
router.beforeEach((to, from, next) => {
  // console.log(1111)
  let code = util.getCode('code')
  alert(code)
  if (!code) {
    util.weixinauth()
  } else {
    queryList({ code: code }).then(res => {
      console.log(res, 36)
      alert(res)
    })
    next()
  }
}
)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
