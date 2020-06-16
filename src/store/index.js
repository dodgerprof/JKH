import Vue from 'vue'
import Vuex from 'vuex'

import requests from './modules/requests'
import user from './modules/user'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    requests,
    common
  }
})