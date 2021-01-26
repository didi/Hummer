import { Base } from '../nodes/Base'
import {parseStringStyle} from '@hummer/tenon-utils'
export function patchStyle( 
  el: Base,
  key: string,
  prevValue: any,
  nextValue: any){
  let style = nextValue
  // Case1. For Dynamic String Style
  if(typeof nextValue === 'string'){
    style = parseStringStyle(nextValue)
  }
  el.setStyle(style)
}
