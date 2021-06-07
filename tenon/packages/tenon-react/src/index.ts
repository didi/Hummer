import {render} from './render'
import {register as registerComponent} from '@hummer/tenon-core'

export * from '@hummer/tenon-core'
export * from './render'
export * from './hook'

export default {
  render,
  register: registerComponent
}