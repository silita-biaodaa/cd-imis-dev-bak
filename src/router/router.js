
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/index'
import Card from '@/page/Card'
import friend from '@/page/friend'
import Nav from '@/page/Nav'
import Group from '@/page/group'
import Notice from '@/page/notice'
import Apply from '@/page/apply'
import Create from '@/page/create'

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
      path: '/nav',
      name: 'nav',
      component: Nav,
      children: [
        {
          path: 'friend',
          component: friend
        },         
        {
          path: 'card',
          component: Card
        },
        {
          path: 'group',
          component: Group
        }
      ]
    },
    { 
      path: '/notice',
      component: Notice 
    },
    {
      path: '/create',
      component: Create
    },
    {
      path: '/apply',
      component: Apply
    }
  ]
})
