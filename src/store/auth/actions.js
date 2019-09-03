import Vue from 'vue'
import * as types from './mutation-types'

export default {
  async login (action, { userId, password }) {
    action.commit(types.AUTH_REQUESTING)

    let params = new URLSearchParams()
    params.append('userId', userId)
    params.append('password', password)

    try {
      const res = await Vue.axios.post('/login', params)
      if (res.data.status === 'OK') {
        action.commit(types.AUTH_LOGIN, res.data.data)
      } else {
        action.commit(types.AUTH_LOGOUT)
      }
    } catch (e) {
      action.commit(types.AUTH_LOGOUT)
    }
    return action.state.status === 'login'
  },
  async logout (action) {
    action.commit(types.AUTH_LOGOUT)
  },
  async refresh (action) {
    const limit = action.getters.exp - Math.floor(Date.now() / 1000)
    if (limit > 30) {
      return true
    }

    action.commit(types.AUTH_REFRESHING)

    const refreshToken = action.state.refreshToken
    try {
      const res = await window.axios({
        url: '/api/refresh',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      })
      if (res.status === 200 && !('errors' in res.data)) {
        action.commit(types.AUTH_REFRESH, res.data.data)
      } else {
        action.commit(types.AUTH_TOKEN_TIMEOUT)
      }
    } catch (e) {
      action.commit(types.AUTH_TOKEN_TIMEOUT)
    }
    return action.state.status === 'login'
  }
}
