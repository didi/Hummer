import {isBorderStyle, isLength, Style, hasRgbaColor, getRgbaColor} from '../common/utils'
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
 * @param value 待拆解的属性值 * 
 * ex.borderLeft: 1px solid #eee; borderWidth: 1px; borderStyle: solid; borderColor: #eee;
 * ex.border: none; borderStyle: none;
 * ex.border: 1px 
 */
function transformBorderStyle(attr:string, borderValue:string){
  let tempStyle:Style = {};
  // 处理 rgba 的颜色场景
  if(!hasRgbaColor(borderValue)){
    let values = borderValue.trim().split(/\s+/);
    tempStyle = traverseBorderValue(values, attr)
  }else{
    let rgbaColor = getRgbaColor(borderValue)
    if(rgbaColor){
      borderValue = borderValue.split(rgbaColor).join("")
      let values = borderValue.trim().split(/\s+/)
      tempStyle = traverseBorderValue(values, attr)
      tempStyle[attr +'-color'] = rgbaColor
    }else{
      let values = borderValue.trim().split(/\s+/);
      tempStyle = traverseBorderValue(values, attr)
    }
  }
  return tempStyle
}

/**
 * 遍历数组，获取标准的 Border Value
 * @param values Array<string>
 * @param attr Unit Border Type
 * @returns Style
 */
function traverseBorderValue(values:Array<string>, attr:string){
  let tempStyle:Style = {}
  values.forEach((value) => {
    if(isBorderStyle(value)){
      tempStyle[attr + "-style"] = value
    }else if(isLength(value)){
      tempStyle[attr + "-width"] = value
    }else{
      tempStyle[attr + "-color"] = value
    }
  })
  return tempStyle
}
