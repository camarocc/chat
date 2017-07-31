import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/login'
import Room from '@/components/room'

import {
  isLogin
} from '../utils/authUser'


Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Room',
      component: Room
    },
    {
    	path:'/login',
    	name:'Login',
    	component:Login
    }, 
    {
      path:'/hello',
      name:'Hello',
      component:Hello
    }
  ]
})


router.beforeEach(function(to, from, next) {
  if (!isLogin() ||0) {
    if (to.fullPath !== '/login') {
      return next({
        path: '/login'
      })
    }
    next()
  }
  next()
})

export default router