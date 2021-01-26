import { createStore, Store } from './store'
import { useStore } from './injectKey'
import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from './helpers'
import { createLogger } from './plugins/logger'
import {createHummerPlugin} from './plugins/hummer'

export default {
  createStore,
  Store,
  useStore,
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers,
  createLogger,
  createHummerPlugin
}

export {
  createStore,
  Store,
  useStore,
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers,
  createLogger,
  createHummerPlugin
}
