
import Vue from 'vue'
import Router from 'vue-router'
import text from '@/page/text'
import Home from '@/page/index'
import Lab from '@/page/lab'
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
    },
    {
      path: '/text',
      name: 'text',
      component: text
    },
    {
      path: '/lab',
      name: 'lab',
      component: Lab
    }
  ]
})
