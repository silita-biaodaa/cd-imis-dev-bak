
import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/page/text'
import Home from '@/page/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: index
    // }
  ]
})
