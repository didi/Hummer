import { HummerElement as Base } from "../../../../../../../packages/hummer-api/src";
import {parseStringStyle, styleTransformer} from '@hummer/tenon-utils'
export function patchStyle( 
  el: Base,
  key: string,
  prevValue: any,
  nextValue: any){
  
  let style = nextValue
  if(typeof nextValue === 'string'){
    style = parseStringStyle(nextValue)
  }
  // 样式转换为 Hummer 特有样式
  style = styleTransformer.transformStyle(style, el);

  el.style = style
}