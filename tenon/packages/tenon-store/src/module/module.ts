import { forEachValue } from '../util'

// Base data struct for store's module, package with some attribute and method
export default class Module {
  public runtime:any
  public _children:any
  public _rawModule:any
  public state:any
  constructor (rawModule:any, runtime:any) {
    this.runtime = runtime
    // Store some children item
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule
    const rawState = rawModule.state

    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }

  get namespaced () {
    return !!this._rawModule.namespaced
  }

  addChild (key:any, module:any) {
    this._children[key] = module
  }

  removeChild (key:any) {
    delete this._children[key]
  }

  getChild (key:any) {
    return this._children[key]
  }

  hasChild (key:any) {
    return key in this._children
  }

  update (rawModule:any) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }

  forEachChild (fn:Function) {
    forEachValue(this._children, fn)
  }

  forEachGetter (fn:Function) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  forEachAction (fn:Function) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  forEachMutation (fn:Function) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
