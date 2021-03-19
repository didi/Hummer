import { Base } from '../nodes/Base'
import {parseStringStyle, styleTransformer} from '@hummer/tenon-utils'
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
  // 样式转换为 Hummer 特有样式
  style = styleTransformer.transformStyle(style);
  el.setStyle(style)
}
