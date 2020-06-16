import * as firebase from 'firebase'

class Request {
  constructor(message, ownerId, comments = [], id = null) {
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
  mutations: {
    loadRequest(state, payload) {
      state.requests = payload;
    },
    updateRequest(state, {
      message,
      id
    }) {
      const request = state.requests.find(request => {
        return request.id === id
      })
      request.comments.push(message)
    }
  },
  actions: {
    async createRequest({commit,getters}, payload) {
      commit('setLoading', true)
      try {
        const newRequest = new Request(
          payload,
          getters.user.localId
        )
        const request = await firebase.database().ref('requests').push(newRequest)
        commit('setLoading', false)
      } catch (error) {
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
            let comments = request.comments ? Object.values(request.comments) : []
            resultRequests.push(
              new Request(
                request.message,
                request.ownerId,
                comments,
                key
              ))
          })
          commit('loadRequest', resultRequests)
        }
        commit('setLoading', false)
      } catch (error) {
        console.log(error);
        throw error
      }
    },
    async addComment({commit}, {message,id}) {
      try {
        await firebase.database().ref('requests').child(id).child('comments').push(message);
        commit('updateRequest', {
          message,
          id
        })
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    requests(state, getters) {
      if (!getters.user.isAdmin) {
        return state.requests.filter((request) => {
          return request.ownerId === getters.user.localId
        })
      }
      return state.requests
    }
  }
}