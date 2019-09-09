import * as types from './mutation-types'

export default {
  [types.REQUESTING] (state) {
    state.status = 'requesting'
  },
  [types.FETCH] (state, { todoList }) {
    state.status = 'fetch'
    state.todoList = todoList
  },
  [types.CLEAR] (state) {
    state.status = 'clear'
    state.todoList = []
  },
  [types.FAILED] (state) {
    state.status = 'failed'
    state.todoList = []
  }
}
