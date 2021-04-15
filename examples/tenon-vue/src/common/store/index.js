import {createStore, createHummerPlugin} from '@hummer/tenon-store'
import {createLoggerPlugin} from './logger'

import State from './state'
import Mutation from './mutation'
import Action from './action'

export default createStore({
  state: State,
  mutations: Mutation,
  actions: Action,
  plugins: [createLoggerPlugin(), createHummerPlugin()]
})