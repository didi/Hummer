/**
 * 属性的拆解
 * 
 */
import { makeMapByArr } from "../../utils"
import {extend} from '../../index'

const commonAttrs = ["margin", "padding"]
const borderAttrs = ["border-radius"]
const attrs = commonAttrs.concat(borderAttrs)
// const directions = ["left", "right", "top", "bottom"]
const isDirectAttr = makeMapByArr(commonAttrs)
const isBorderDirectAttr = makeMapByArr(borderAttrs)
interface Style {
  attr: string,
  value: string
}
export function transformBreakToken(style: Record<string, string>) {
  let tempStyle:Record<string, string> = {
    ...style
  }
  attrs.forEach(attr => {
    if(!style[attr]){
      return
    }
    if(isDirectAttr(attr)){
      delete tempStyle[attr]
      tempStyle = extend(breakDirectionAttr({
        attr: attr,
        value: style[attr]
      }), tempStyle)
    }else if(isBorderDirectAttr(attr)){
      delete tempStyle[attr]
      tempStyle = extend(breakBorderRadiusAttr({
        attr: attr,
        value: style[attr]
      }, /\s+/), tempStyle)
    }
  })
  return tempStyle
}

/**
 * 进行属性方向的拆解
 * Ex. margin: 10 => margin-left: 10;margin-right: 10;margin-top:10;margin-bottom:10;
 * @param Style  
 */
function breakDirectionAttr({ attr, value }: Style, splitReg: RegExp = /\s/) {
  let vals = value.split(splitReg).map(item => {
    return item.trim()
  })
  let top,right,bottom,left
  switch (vals.length) {
    case 1:
      top = vals[0];
      right = vals[0];
      bottom = vals[0];
      left = vals[0];
      break;
    case 2:
      top = vals[0];
      right = vals[1];
      bottom = vals[0];
      left = vals[1];
      break;
    case 3:
      top = vals[0];
      right = vals[1];
      bottom = vals[2];
      left = vals[1];
      break;
    case 4:
      top = vals[0];
      right = vals[1];
      bottom = vals[2];
      left = vals[3];
      break;
    default:
      top = 0;
      bottom = 0;
      left = 0;
      right = 0;
      break;
  }
  return {
    [attr+'-top']: top,
    [attr+'-right']: right,
    [attr+'-bottom']: bottom,
    [attr+'-left']: left,
  }
}


/**
 * 进行属性方向的拆解
 * Ex. border-radius: 10 10 => border-top-left-radius: 10;border-top-right-radius: 10;border-bottom-left-radius:10;border-bottom-right-radius:10;
 * TODO: 处理 border-radius: 10px / 20px 场景
 * @param Style  
 */

function breakBorderRadiusAttr({ attr, value }: Style, splitReg: RegExp = /\s+/) {
  let vals = value.split(splitReg).map(item => {
    return item.trim()
  })
  let topLeft,topRight,bottomLeft,bottomRight
  if(vals.length === 1){
    return {
      'border-radius': vals[0]
    }
  }
  switch (vals.length) {
    case 1:
      topLeft = vals[0];
      topRight = vals[0];
      bottomRight = vals[0];
      bottomLeft = vals[0];
      break;
    case 2:
      topLeft = vals[0];
      topRight = vals[1];
      bottomRight = vals[0];
      bottomLeft = vals[1];
      break;
    case 3:
      topLeft = vals[0];
      topRight = vals[1];
      bottomRight = vals[2];
      bottomLeft = vals[1];
      break;
    case 4:
      topLeft = vals[0];
      topRight = vals[1];
      bottomRight = vals[2];
      bottomLeft = vals[3];
      break;
    default:
      topLeft = 0;
      topRight = 0;
      bottomRight = 0;
      bottomLeft = 0;
      break;
  }
  return {
    ['border-top-left-radius']: topLeft,
    ['border-top-right-radius']: topRight,
    ['border-bottom-right-radius']: bottomRight,
    ['border-bottom-left-radius']: bottomLeft,
  }
}
