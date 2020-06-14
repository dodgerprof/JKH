export default{
  state: {
    loading: false,
    error: null
  },  
  mutations: {
    setLoading (state, payload){
      state.loading = payload;
    },
    setError (state, payload){
      state.error = payload;
    }
  },
  actions: {
    setLoading ({commit}, payload){
      commit('setLoading', payload)
    },
    setError ({commit}, payload){
      commit('setError', payload)
    }
  },
  getters: {
    loading (state){
      return state.loading
    },
    error (state){
      return state.error
    }
  }
}