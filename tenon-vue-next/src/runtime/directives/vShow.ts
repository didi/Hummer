import { ObjectDirective } from '@vue/runtime-core'
import { HummerElement as Base } from '@hummer/hummer-api'

interface VShowElement extends Base {
  _vod: string
}
const DefaultDisplay = 'flex';

export const vShow: ObjectDirective<VShowElement> = {
  beforeMount(el, { value }, { transition }) {
    if(el.style.display === 'none'){
      el._vod = ''
    }else {
      el._vod = el.style.display || DefaultDisplay
    }
    if (transition && value) {
      transition.beforeEnter(el)
      
    } else {
      setDisplay(el, value)
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el)
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return
    if (transition) {
      if (value) {
        transition.beforeEnter(el)
        setDisplay(el, true)
        transition.enter(el)
      } else {
        transition.leave(el, () => {
          setDisplay(el, false)
        })
      }
    } else {
      setDisplay(el, value)
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value)
  }
}

function setDisplay(el: VShowElement, value: unknown): void {
  el.superSetStyle({
    display: value ? el._vod : 'none',
    flexDirection: el.style.flexDirection || 'column'
  })
}
