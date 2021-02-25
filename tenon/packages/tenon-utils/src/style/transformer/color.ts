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
  // 处理 #eee 这种场景
  if(/^#/.test(value) && value.length === 4){
    return normalizeColor(value)
  }else {
    return getColor(value)
  }
}
function normalizeColor(value: string){
  return value.replace(/(\w)/ig, function(match){
    return `${match}${match}`
  })
}