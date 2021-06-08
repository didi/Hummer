/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectDirective } from '@vue/runtime-core'
import {Base} from '../nodes/Base'
interface Element extends Base {
  _vod: string
}

export const vAnimation: ObjectDirective<Element> = {
  mounted(el, { value }) {
    value && el.handleAnimation(value)
  },
  updated(el, { value, oldValue }) {
    // FIXME: Animation对象更新时,不会触发updated事件
    if(!value || value === oldValue){
      return
    }else{
      el.handleAnimation(value)
    }
  },
  beforeUnmount(el, { value }) {
    // TODO 是否在元素销毁的时候，去除动画
    console.log('Animation Unmounted')
  }
}

