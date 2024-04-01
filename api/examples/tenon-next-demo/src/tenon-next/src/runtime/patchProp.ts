// import { Base } from './nodes'
import {patchClass} from './handlers/class'
import {patchStyle} from './handlers/style'
import {patchAttrs} from './handlers/attrs'
import {patchEvents} from './handlers/events'
import { HummerElement } from '../../../../../../packages/hummer-api/src'

export function patchProp(
  el: HummerElement,
  key: string,
  prevValue: any,
  nextValue: any,
  isSVG = false,
  prevChildren:any,
  parentComponent:any,
  parentSuspense:any,
  unmountChildren:any
) {
  switch(key){
    case 'class':
      patchClass(el, key, prevValue, nextValue)
      break;
    case 'style':
      patchStyle(el, key, prevValue, nextValue)
      break;
    default:
      if(isOn(key)){
        patchEvents(el, key, prevValue, nextValue, parentComponent)
      }else{
        patchAttrs(el, key, prevValue, nextValue)
      }
      break;
  }
}

function isOn(key:string){
  const onRE = /^on[^a-z]/
  return onRE.test(key)
}