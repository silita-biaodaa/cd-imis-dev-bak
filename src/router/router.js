import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/page/index'
Vue.use(Router)

export default new Router({  
  // linkActiveClass: 'mui-active',
  // mode: 'history'
  routes: [
    {
      path: '/text',
      name: 'index',
      component: index
    }
  ]
})
