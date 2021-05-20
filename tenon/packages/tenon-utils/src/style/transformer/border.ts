import {isBorderStyle, isLength, Style} from '../common/utils'
import {extend} from '../../index'
const attrs = ["border","border-left", "border-right", "border-top", "border-bottom"]

export function transformBorder(style:Record<string, string>):Record<string, string>{
  let tempStyle:Record<string, string> = {
    ...style
  }
  attrs.forEach(attr => {
    if(!style[attr]){
      return;
    }else {
      delete tempStyle[attr]
      tempStyle = extend(transformBorderStyle(attr, style[attr]), tempStyle)
    }
  })
  return tempStyle
}

/**
 * 转换Border Style，进行聚合属性的拆解
 * 参考 MDN 文档：https://developer.mozilla.org/en-US/docs/Web/CSS/border
 * The border property may be specified using one, two, or three of the values listed below. The order of the values does not matter.
 * @param attr 待拆解的属性
 * @param value 待拆解的属性值
 * ex.borderLeft: 1px solid #eee; borderWidth: 1px; borderStyle: solid; borderColor: #eee;
 * ex.border: none; borderStyle: none;
 */
function transformBorderStyle(attr:string, borderValue:string){
  let values = borderValue.trim().split(/\s+/);
  let tempStyle:Style = {};
  for(let i=0,len=values.length; i<len; i++){
    if(isBorderStyle(values[i])){
      tempStyle[attr + "-style"] = values[i]
    }else if(isLength(values[i])){
      tempStyle[attr + "-width"] = values[i]
    }else{
      tempStyle[attr + "-color"] = values[i]
    }
  }
  return tempStyle
}

