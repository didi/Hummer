import {extend} from '../../index'
const attrs = ["border","border-left", "border-right", "border-top", "border-bottom"]
const borderBreakReadius = /([\.\w]+)\s+(\w+)\s+([\w#\s\(,\.\)]+)/
interface Style {
  attr: string,
  value: string
}

export function transformBorder(style:Record<string, string>):Record<string, string>{
  let tempStyle:Record<string, string> = {
    ...style
  }
  attrs.forEach(attr => {
    if(!style[attr]){
      return;
    }else {
      delete tempStyle[attr]
      tempStyle = extend(transformBorderStyle({
        attr: attr,
        value: style[attr]
      }), tempStyle)
    }
  })
  return tempStyle
}

/**
 * 转换Border Style
 * @param value string
 * ex.borderLeft: 1px solid #eee; borderWidth: 1px; borderStyle: solid; borderColor: #eee;
 */
function transformBorderStyle({
  attr,
  value
}:Style){
  let matches = value.match(borderBreakReadius)
  // 如果不符合标准Border写法，返回为空
  if(!matches){
    return {}
  }
  let [,borderWidth, borderStyle, borderColor] = matches
  return {
    [attr+"-width"]: borderWidth,
    [attr+"-style"]: borderStyle,
    [attr+"-color"]: borderColor,
  }
}