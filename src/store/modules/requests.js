import * as firebase from 'firebase'

class Request{
  constructor(message, ownerId, comments = [], id = null){
    this.message = message;    
    this.ownerId = ownerId;
    this.comments = comments; 
    this.id = id;
  }
  
}


export default {
  state: {
    requests: []
  },
  mutations:{
    loadRequest(state, payload){
      state.requests = payload;
    },
    updateRequest(state, {message, id}){
      const request = state.requests.find(request => {
        return request.id === id
      })
      request.comments.push(message)
    }
  },
  actions: {
    async createRequest ({commit, getters}, payload){
      commit('setLoading', true)
      try{
        const newRequest = new Request(
          payload,
          getters.user.id,
          []
        )
        const request = await firebase.database().ref('requests').push(newRequest)
        commit('setLoading', false)
      } catch(error){        
        console.log(error);
        commit('setLoading', false)
      }      
    },
    async fetchRequests({commit}, payload) {
      commit('setLoading', true)
      const resultRequests = []
      try {
        const requestsVal = await firebase.database().ref('requests').once('value')
        if (requestsVal.val() !== null) {
          const requests = requestsVal.val();
          Object.keys(requests).forEach(key => {
            const request = requests[key]
            resultRequests.push(
              new Request(
                request.message,
                request.ownerId,
                request.comments,
                key))
          })
          commit('loadRequest', resultRequests)
          }
          commit('setLoading', false)        
      } catch (error) {
        console.log(error);
        commit('setError', false)
        throw error
      }
    },
   async addComment({commit}, {message, id}){
      try{
        await firebase.database().ref('requests').child(id).child('comments').push(message);  
        commit('updateRequest', {message, id})
      } catch(error){
        console.log(error);
      }
    }
  },
  getters: {
    requestsUser (state, getters){
      return state.requests.filter((request) =>{
      return  request.ownerId === getters.user.id
      })
    },
    requestsAll (state, getters){
      return state.requests
    }
  }
}