import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login.vue'
import registration from '@/views/registration.vue'
import profile from '@/views/profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    },
  {
    path: '/registration',
    name: 'registration',
    component: registration,
    },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    meta: {
      requiresAuth: true
    }
  }
  ]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})

export default router