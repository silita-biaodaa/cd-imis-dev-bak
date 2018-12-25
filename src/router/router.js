import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
Vue.use(Router)

const routes = [
  {
    path: '/index',
    name: 'index',
    component:index
  }
]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
