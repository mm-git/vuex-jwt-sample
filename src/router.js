import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import List from './views/List'
import Timeout from './views/Timeout'

import store from './store'

Vue.use(Router)

const guardLogin = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/list')
}

const guardAPIAccess = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: guardLogin
    },
    {
      path: '/list',
      name: 'list',
      component: List,
      beforeEnter: guardAPIAccess
    },
    {
      path: '/timeout',
      name: 'timeout',
      component: Timeout,
      meta: { title: '' }
    }
  ]
})
