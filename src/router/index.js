import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login.vue'
import registration from '@/views/registration.vue'
import profile from '@/views/profile.vue'
import * as firebase from "firebase/app";
import autoGuard from './auth-guard.js'



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
    beforeEnter: autoGuard
  }
  ]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

