import { registerRuntimeHelpers } from '@vue/compiler-core'

export const V_MODEL_TEXT = Symbol(__DEV__ ? `vModelText` : ``)
export const V_MODEL_SWITCH = Symbol(__DEV__ ? `vModelSwitch` : ``)


export const V_SHOW = Symbol(__DEV__ ? `vShow` : ``)

export const V_MODEL_DYNAMIC = Symbol(__DEV__ ? `vModelDynamic` : ``)

export const V_ANIMATION = Symbol(__DEV__ ? `vAnimation` : ``)


registerRuntimeHelpers({
  [V_MODEL_TEXT]: `vModelText`,
  [V_MODEL_SWITCH]: `vModelSwitch`,
  [V_SHOW]: `vShow`,
  [V_MODEL_DYNAMIC]: `vModelDynamic`,
  [V_ANIMATION]: 'vAnimation'
})
