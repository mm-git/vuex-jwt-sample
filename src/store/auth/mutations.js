import * as types from './mutation-types'

export default {
  [types.AUTH_REQUESTING] (state) {
    state.status = 'requesting'
  },
  [types.AUTH_REFRESHING] (state) {
    state.status = 'refreshing'
  },
  [types.AUTH_LOGIN] (state, { accessToken, refreshToken }) {
    state.status = 'login'
    state.accessToken = accessToken
    state.refreshToken = refreshToken
  },
  [types.AUTH_TOKEN_TIMEOUT] (state) {
    state.status = 'token_timeout'
    state.accessToken = ''
    state.refreshToken = ''
  },
  [types.AUTH_LOGOUT] (state) {
    state.status = 'logout'
    state.accessToken = ''
    state.refreshToken = ''
  }
}
