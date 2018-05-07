import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import ico from './ico/index'
import shared from './shared/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ico: ico,
    user: user,
    shared: shared
  }
})
