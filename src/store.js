import Vue from 'vue'
import Vuex from 'vuex'
import auth from './store/auth'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    auth
  },
  plugins: [createPersistedState({
    key: 'vuex-jwt-sample',
    paths: [
      'auth'
    ]
  })]
})
