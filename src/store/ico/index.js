import * as firebase from 'firebase'

export default {
  state: {
    loadedIcos: []
  },
  mutations: {
    setLoadedIcos (state, payload) {
      state.loadedIcos = payload
    },
    createIco (state, payload) {
      state.loadedIcos.push(payload)
    },
    updateIco (state, payload) {
      let ico = state.loadedIcos.find(ico => {
        return ico.id === payload.id
      })
      if (payload.name) ico.name = payload.name
      if (payload.url) ico.url = payload.url
      if (payload.grade) ico.grade = payload.grade
      if (payload.price) ico.price = payload.price
      if (payload.numberOfICOTokens) ico.numberOfICOTokens = payload.numberOfICOTokens
      if (payload.totalNumberOfTokens) ico.totalNumberOfTokens = payload.totalNumberOfTokens
      if (payload.totalSupply) ico.totalSupply = payload.totalSupply
      if (payload.icoMarketCap) ico.icoMarketCap = payload.icoMarketCap
      if (payload.appPrototype) ico.appPrototype = payload.appPrototype
      if (payload.team) ico.team = payload.team
      if (payload.advisers) ico.advisers = payload.advisers
      if (payload.idea) ico.idea = payload.idea
      if (payload.community) ico.community = payload.community
      if (payload.type) ico.type = payload.type
      if (payload.date) ico.date = payload.date
    },
    deleteIco (state, payload) {
      const ico = state.loadedIcos.find(ico => {
        return ico.id === payload.id
      })
      const index = state.loadedIcos.indexOf(ico)
      if (index > -1) {
        return state.loadedIcos.splice(index, 1)
      }
    }
  },
  actions: {
    loadIcos ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('icos').once('value')
        .then(
          data => {
            const icos = []
            const obj = data.val()
            for (let key in obj) {
              icos.push({
                id: key,
                name: obj[key].name,
                url: obj[key].url,
                grade: obj[key].grade,
                price: obj[key].price,
                numberOfICOTokens: obj[key].numberOfICOTokens,
                totalNumberOfTokens: obj[key].totalNumberOfTokens,
                totalSupply: obj[key].totalSupply,
                icoMarketCap: obj[key].icoMarketCap,
                appPrototype: obj[key].appPrototype,
                team: obj[key].team,
                advisers: obj[key].advisers,
                idea: obj[key].idea,
                community: obj[key].community,
                type: obj[key].type,
                date: obj[key].date,
                creatorId: obj[key].creatorId
              })
            }
            // icos.filter((ico) => ico.creatorId === getters.user.uid)
            commit('setLoadedIcos', icos)
            commit('setLoading', false)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            console.log(error)
          }
        )
    },
    createIco ({commit, getters}, payload) {
      commit('setLoading', true)
      const ico = {
        name: payload.name,
        grade: payload.grade,
        url: payload.url,
        price: payload.price,
        numberOfICOTokens: payload.numberOfICOTokens,
        totalNumberOfTokens: payload.totalNumberOfTokens,
        totalSupply: payload.totalSupply,
        icoMarketCap: payload.icoMarketCap,
        appPrototype: payload.appPrototype,
        team: payload.team,
        advisers: payload.advisers,
        idea: payload.idea,
        community: payload.community,
        type: payload.type,
        date: payload.date,
        creatorId: getters.user.uid
      }
      firebase.database().ref('icos').push(ico)
        .then(
          data => {
            commit('setLoading', false)
            const key = data.key
            commit('createIco', {
              ...ico,
              id: key
            })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            console.log(error)
          }
        )
    },
    updateIco ({commit}, payload) {
      commit('setLoading', true)
      let ico = payload
      firebase.database().ref('icos/' + payload.id).update(ico)
        .then(() => {
          commit('setLoading', false)
          commit('updateIco', ico)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    deleteIco ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('icos/' + payload.id).remove()
        .then(() => {
          commit('setLoading', false)
          commit('deleteIco', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedIcos (state) {
      return state.loadedIcos.sort((a, b) => {
        return a.date > b.date
      })
    },
    loadedIco (state) {
      return (icoId) => {
        return state.loadedIcos.find((ico) => {
          return ico.id === icoId
        })
      }
    }
  }
}
