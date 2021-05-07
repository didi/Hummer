/**
 * 属性适配，特定场景下增加属性值
 * @param style 待转换的Style值
 * @param view 组件
 */
import {NODE_IMAGE} from '../../components/types'
import {makeMap} from '../../utils'

const borderRadius = 'borderRadius,borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius'
const isBorderRadius = makeMap(borderRadius)

export function dynamicTransformAdapter(style:Record<string, string>, view:any){
  let tempStyle:Record<string, string> = {}
  tempStyle = hackForBorderRadius(view, style);
  return tempStyle
}

// HACK: 针对IOS中Image标签，需要添加Overflow实现圆角效果
function hackForBorderRadius(view:any, style:Record<string, string>){
  if(view && view.__NAME === NODE_IMAGE && hasSpecialAttr(style, isBorderRadius)){
    style['overflow'] = 'hidden';
  }
  return style
}

/**
 * 判断对象中是否包含样式中任一属性
 */
function hasSpecialAttr(obj: Object, func:Function){
  return Object.keys(obj).some(key => {
    return func(key)
  })
}
