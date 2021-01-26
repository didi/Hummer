import {getColor} from '../common/color'
import {makeMap} from '../../utils'
import {hexify} from './unit'

const colorAttrs = "color,background-color,border-color,border-top-color,border-left-color,border-right-color,border-bottom-color,placeholder-color,cursor-color"
const isColorAttr = makeMap(colorAttrs)
const rgbaReg = /rgba?/
export function transformColor(style:Record<string, string>):Record<string, string>{
  Object.keys(style).forEach(key => {
    if(isColorAttr(key)){
      let value = style[key]
      if(isRgba(value)){
        style[key] = hexify(value)
      }else {
        style[key] = transformColorStyle(value)
      }
    }
  })
  return style
}

function isRgba(color:string){
  return rgbaReg.test(color)
}
function transformColorStyle(value: string):string{
  return getColor(value)
}