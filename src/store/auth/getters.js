export default {
  isAuthenticated (state) {
    return !!state.accessToken
  },
  payload (state) {
    if (!state.accessToken) {
      return {}
    }

    const token = state.accessToken.split('.')
    const payloadString = window.atob(token[1])
    return JSON.parse(payloadString)
  },
  exp (state, getters) {
    if (!getters.payload.hasOwnProperty('exp')) {
      return 0
    }
    return getters.payload.exp
  }
}
