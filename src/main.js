import Vue from 'vue'
import vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import router from './router'
import * as firebase from "firebase/app";
import '@/styles/bootstrap.css';
import '@/styles/global.scss'

Vue.use(vuelidate);
Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App),
  created() {
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
    const user = firebase.auth().onAuthStateChanged(user => { 
      if (user) {
        //Не получилось реализовать продление сессии
        //Точнее она есть, но данные приходят после редиректа, но уже поздно
        this.$store.dispatch('autoLoginUser', user)
      }
    })
          
    this.$store.dispatch('fetchRequests')    
  }
}).$mount('#app')