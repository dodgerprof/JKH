import * as fb from 'firebase'

class User {
  constructor (id, isAdmin = false) {
    this.id = id;
    this.admin = isAdmin;
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setAdmin(state, adminId){
      if (state.user.id === adminId)
        state.user.admin = true
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('setLoading', true)
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        //Обращение которое сохраняется в user(↑) возвращает undefined при обращении к uid
        //Приходится вызывать метод ↓ и у него забирать uid
        fb.auth().onAuthStateChanged(userId => {          
            commit('setUser', new User(userId.uid))
         })   
        
        const adminId = await fb.database().ref('rang').once('value')
        commit('setAdmin', adminId.val().id)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {      
      commit('setLoading', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        //Обращение которое сохраняется в user(↑) возвращает undefined при обращении к uid
        //Приходится вызывать метод ↓ и у него забирать uid
        fb.auth().onAuthStateChanged(userId => {          
            commit('setUser', new User(userId.uid))
         })
        
        const adminId = await fb.database().ref('rang').once('value')
        commit('setAdmin', adminId.val().id)
        commit('setAdmin', true)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
