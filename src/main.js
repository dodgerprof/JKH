import Vue from 'vue'
import vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import router from './router'
import * as firebase from "firebase/app"
import '@/styles/bootstrap.css'
import '@/styles/global.scss'
import axios from 'axios'

Vue.use(vuelidate);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('setUser', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logoutUser')
        }
        return Promise.reject(error)
      }
    )
    firebase.initializeApp({
      apiKey: "AIzaSyCuYE3igktWj1yn3OQz-TiUz-GrLtaHXm4",
      authDomain: "citric-adviser-261606.firebaseapp.com",
      databaseURL: "https://citric-adviser-261606.firebaseio.com",
      projectId: "citric-adviser-261606",
      storageBucket: "citric-adviser-261606.appspot.com",
      messagingSenderId: "904626168571",
      appId: "1:904626168571:web:b418a29d1b7fde934a065e",
      measurementId: "G-4G24HYSFTX"
    });
    this.$store.dispatch('fetchRequests')
  }
}).$mount('#app')