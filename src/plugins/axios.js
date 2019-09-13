'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import { AUTH_TOKEN_EXPIRED } from '../store/auth/mutation-types'

let config = {
  baseURL: 'http://localhost:8888',
  timeout: 60 * 1000,
  withCredentials: false
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const responseUrl = error.request.responseURL || error.config.url
    if (responseUrl.slice(-5) !== 'login' && error.response.status === 401) {
      store.commit(`auth/${AUTH_TOKEN_EXPIRED}`)
    }
    return Promise.reject(error)
  }
)

const AxiosPlugin = {}
AxiosPlugin.install = function (Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(AxiosPlugin)
