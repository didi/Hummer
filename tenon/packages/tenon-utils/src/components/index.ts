import {makeMap} from '../utils'
const isNativeTagReg = /^ex-/

export const NativeTags = "view,text,image,input,textarea,button,scroller,switch,refresh,loadmore,list,viewpager"
export const isNativeTags = makeMap(NativeTags)
export const isCustomNativeTag = (tag:string) => {
  return isNativeTagReg.test(tag)
}

export * from './types'