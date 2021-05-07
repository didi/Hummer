/**
 * 属性适配，特定场景下增加属性值
 * @param style 待转换的Style值
 * @param view 组件
 */
import {makeMap} from '../../utils'

const borderRadius = "border-radius,border-top-left-radius,border-top-right-radius,border-bottom-left-radius,border-bottom-right-radius"
const isBorderRadius = makeMap(borderRadius)


export function transformAdapter(style:Record<string, string>){
  let tempStyle:Record<string, string> = {
    ...style
  }
  tempStyle = hackForBorderRadius(tempStyle);
  tempStyle = hackForDefaultFlex(tempStyle);
  tempStyle = hackForWhiteSpace(tempStyle);
  return tempStyle
}


// HACK: 针对WhiteSpace属性，做属性转换，使用textLineClamp来禁止分行
function hackForWhiteSpace(style:Record<string, string>){
  if(style['white-space'] === 'nowrap'){
    style['textLineClamp'] = "1";
  }
  return style
}


// HACK: diplay:flex 中增加flex-direction:row的默认值
function hackForDefaultFlex(style:Record<string, string>){
  if(style['display'] === 'flex' && !style['flex-direction']){
    style['flex-direction'] = 'row';
  }
  return style
}

// HACK: iOS中不支持radius 100%，只支持固定宽度
function hackForBorderRadius(style:Record<string, string>){
  if(hasSpecialAttr(style, isBorderRadius)){
    transformBorderRadius(style);
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

/**
 * 转换Border Radius
 * HACK: 处理radius: 100%；iOS不支持的case
 * @param style 
 */
function transformBorderRadius(style: Record<string, string>){
  if(!style.width){
    return
  }
  let [, width, unit] = style.width.split(/([\d\.]+)/);
  if(unit === '%'){
    return
  }
  Object.keys(style).forEach(key => {
    if(isBorderRadius(key)){
      style[key] = getBorderRadius(style[key], {width, unit})
    }
  })
}

/**
 * 计算百分比对应的宽度
 */
function getBorderRadius(value:string, {width,unit}:any){
  let [, bPercent, bUnit] = value.split(/([\d\.]+)/);
  if(bUnit === '%'){
    return (width * parseFloat(bPercent) / 100).toFixed(2) + unit
  }
  return value
}