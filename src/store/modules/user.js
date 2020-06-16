import * as fb from 'firebase'
import axios from 'axios'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
      userData.idToken
    }`
    },
    clearUser(state) {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    async registerUser({commit}, payload) {
      commit('setLoading', true)
      payload['returnSecureToken'] = true;
      try {
        const adminId = await fb.database().ref('rang').once('value');
        await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuYE3igktWj1yn3OQz-TiUz-GrLtaHXm4', payload)
          .then(({data}) => {
              data['isAdmin'] = data.localId === adminId.val().id;
              commit('setUser', data)
            })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        throw error
      }
    },
    async loginUser({commit}, payload) {
      commit('setLoading', true)
      try {
        const adminId = await fb.database().ref('rang').once('value')
        await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuYE3igktWj1yn3OQz-TiUz-GrLtaHXm4', payload)
          .then(({data}) => {
              data['isAdmin'] = data.localId === adminId.val().id;
              commit('setUser', data)
            })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        throw error
      }
    },
    logoutUser({commit}) {
      commit('clearUser')
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isAdmin(state) {
      return state.user.isAdmin
    },
    loggedIn(state) {
      return !!state.user
    }
  }
}