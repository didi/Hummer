import { ObjectDirective, VNode } from '@vue/runtime-core'
// TODO: Switch as SwitchElement
import { Input as InputElement, TextArea as TextAreaElement } from '@hummer/hummer-api'
import { 
  InputEvent,
  // SwitchEvent,
  // SwitchEventState,
  InputEventState,
  addEventListener
} from '../../utils/event'
import {
  isArray,
  invokeArrayFns,
  toNumber
} from '@vue/shared'


type AssignerFn = (value: any) => void
type ModelDirective<T> = ObjectDirective<T & { _assign: AssignerFn }>

const getModelAssigner = (vnode: VNode): AssignerFn => {
  const fn = vnode.props!['onUpdate:modelValue']
  return isArray(fn) ? value => invokeArrayFns(fn, value) : fn
}

export const vModelText: ModelDirective<
  InputElement | TextAreaElement
> = {
  beforeMount(el, { value, modifiers: { lazy, trim, number } }, vnode: VNode) {
    el.text = value == null ? '' : value
    el._assign = getModelAssigner(vnode)
    const castToNumber = !!number
    addEventListener(el, 'input', (e: InputEvent) => {
      let domValue: string | number = e.text
      if (lazy) {
        if (e.state === InputEventState.CONFIRMED || e.state === InputEventState.ENDED) {
          let value = transformValue(trim, castToNumber, domValue)
          el._assign(value)
        }
      } else {
        if (e.state === InputEventState.CHANGED) {
          let value = transformValue(trim, castToNumber, domValue)
          el._assign(value)
        }
      }
    })
  },
  beforeUpdate(el, { value, modifiers: { trim, number } }, vnode: VNode) {
    el._assign = getModelAssigner(vnode)
    if (el.focused) {
      if (trim && (el.text as string).trim() === value) {
        return
      }
      if ((number) && toNumber(el.text) === value) {
        return
      }
    }
    const newValue = value == null ? '' : value
    if (el.text !== newValue) {
      el.text = newValue
    }
  }
}
function transformValue(trim: boolean, castToNumber: boolean, value: string): (string | number) {
  let domValue = value
  if (trim) {
    domValue = domValue.trim()
  }
  if (castToNumber) {
    domValue = toNumber(domValue)
  }
  return domValue
}

// export const vModelSwitch: ModelDirective<SwitchElement> = {
//   beforeMount(el, { value }, vnode: VNode) {
//     el.value = value == null ? '' : value
//     el._assign = getModelAssigner(vnode)
//     addEventListener(el, 'switch', (e: SwitchEvent) => {
//       let { state } = e
//       if (state === SwitchEventState.CLOSE) {
//         el._assign(false)
//       } else if (state === SwitchEventState.OPEN) {
//         el._assign(true)
//       }
//     })
//   },
//   beforeUpdate(el, { value, modifiers: { trim, number } }, vnode: VNode) {
//     el._assign = getModelAssigner(vnode)
//     if (el.value === value) {
//       return
//     }
//     el.value = value
//   }
// }