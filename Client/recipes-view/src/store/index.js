import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogged: {
      user: null,
      admin: null,
      token: null
    }
  },
  mutations: {
    updateUserLogged (state, payload) {
      state.userLogged.user = payload.user
      state.userLogged.admin = payload.admin
      state.userLogged.token = payload.token
    }
  },
  actions: {
  },
  modules: {
  }
})
