import {createStore} from '@hummer/tenon-store'
import {createLoggerPlugin} from './logger'
export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment ({commit}) {
      commit('increment')
    }
  },
  plugins: [createLoggerPlugin()]
})