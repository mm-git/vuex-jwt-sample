import Vue from 'vue'
import * as types from './mutation-types'

export default {
  async fetch (action) {
    const res = await action.dispatch('auth/refresh', {}, { root: true })
    if (!res) {
      return false
    }

    action.commit(types.REQUESTING)

    const accessToken = action.rootState.auth.accessToken
    const qql = `query {
      todoList{
        id
        title
        status
        createAt
      }
    }`

    try {
      const res = await Vue.axios({
        url: '/api/query',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        data: {
          query: qql
        }
      })
      if (res.status === 200 && !('errors' in res.data)) {
        action.commit(types.FETCH, { ...res.data.data })
      } else {
        action.commit(types.FAILED)
      }
    } catch (e) {
      action.commit(types.FAILED)
    }
    return action.state.status === 'login'
  }
}
