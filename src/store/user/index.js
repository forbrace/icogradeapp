import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    googleSignIn ({commit}) {
      commit('clearError', true)
      commit('setLoading', true)

      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().useDeviceLanguage()

      firebase.auth().signInWithPopup(provider)
        .then(
          result => {
            commit('setLoading', false)
            const newUser = result.user
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    googleSignInAsync ({commit}) {
      return new Promise((resolve, reject) => {
        commit('clearError', true)
        commit('setLoading', true)

        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().useDeviceLanguage()

        firebase.auth().signInWithPopup(provider)
          .then(
            result => {
              commit('setLoading', false)
              const newUser = result.user
              commit('setUser', newUser)
              resolve()
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
              reject(error)
            }
          )
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {...payload, userIcos: []})
    },
    googleSignOut ({commit}) {
      firebase.auth().signOut()
        .then(
          () => {
            commit('setUser', null)
          }, (error) => {
            console.log(error)
          })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
