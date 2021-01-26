/**
 * 单位处理中间件，将Css中的单位转换为Hummer中特有的单位
 * rem => hm （相对于750像素）
 * px => px hummer侧自行转换
 * 100% => 100%
 * FIXME: 去除Vw和Vh的转换，在compiler编译时，无法取得Hummer的env，这一步需要放到运行时
 * 100vh => 100 * Hummer.env.availableHeight
 * 100vw => 100 * Hummer.env.availableWidth
 * 100vmin => (100 * (Hummer.env.availableWidth < Hummer.env.availableHeight?availableWidth:availableHeight))
 * 100vmax => (100 * (Hummer.env.availableWidth > Hummer.env.availableHeight?availableWidth:availableHeight))
 * Hummer特有单位
 * 100hm 相对于750
 * 100(dp/pt) 原生单位
 * 100px
 * 100%
 * @param style 待处理的Style
 */
import { makeMapByArr } from "../../utils"

// import { makeMapByArr, getEnvironmentInfo } from "../../utils"
// 待转换单位的属性列表
export const unitAttrs = [
  'font-size', 'placeholder-font-size',
  'flex-basis',
  'width', 'max-width','min-width', 'height','max-height','min-height',
  'padding', 'padding-left', 'padding-right', 'padding-bottom', 'padding-top',
  'margin', 'margin-left', 'margin-right', 'margin-bottom', 'margin-top',
  'left', 'right', 'top', 'bottom',
  'border-width', 'border-left-width','border-right-width', 'border-top-width', 'border-bottom-width',
  'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'
]
export const isNeedUnitTrasform = makeMapByArr(unitAttrs)
const isRemUnit = /rem$/
const isVUnit = /v(h|w|min|max)$/
const isCpxUnit = /cpx$/
// const isVhUnit = /vh$/
// const isVwUnit = /vw$/
// const isVminUnit = /vmin$/
// const isVmaxUnit = /vmax$/
// const isPxUnit = /px$/

export function transformUnit(style: Record<string, string>) {
  Object.keys(style).forEach(key => {
    if(isNeedUnitTrasform(key)){
      let value = transformUnitValue(style[key])
      style[key] = value
    }
  })
  return style
}

export function transformUnitValue(value:string):string{
  if(isRemUnit.test(value)){
    return transfromRem(value)
  }else if(isVUnit.test(value) ){
    return transformVUnit(value)
  }else if(isCpxUnit.test(value)){
    return transfromCpx(value)
  }
  return value
}

export function hexify(color:string){
  var values = color
  .replace(/rgba?\(/, '')
  .replace(/\)/, '')
  .replace(/[\s+]/g, '')
  .split(',');
  var a = parseFloat(values[3] || "1"),
  r = parseInt(values[0]),
  g = parseInt(values[1]),
  b = parseInt(values[2]),
  a = Math.floor(a * 255);
  return "#" +
  ("0" + r.toString(16)).slice(-2) +
  ("0" + g.toString(16)).slice(-2) +
  ("0" + b.toString(16)).slice(-2) + 
  ("0" + a.toString(16)).slice(-2);
}

function transfromRem(value: string):string{
  let num = (Number(value.replace(/rem/, '')) * 100) .toFixed(2)
  return num + 'hm'
}

function transfromCpx(value: string):string{
  let num = value.replace(/cpx/, 'hm')
  return num
}

function transformVUnit(value:string):string{
  return value
  // let {availableWidth, availableHeight} = getEnvironmentInfo()
  // let num = Number.parseInt(value.replace(/vh|vw|vmin|vmax/, ''))
  // let newValue = ''
  // if(isNaN(num)){
  //   // 如果数字不合法，不做处理
  //   return value
  // }
  // if(isVhUnit.test(value)){
  //   newValue = formatDpUnit(num/100 * availableHeight)
  // }else if(isVwUnit.test(value)){
  //   newValue = formatDpUnit(num/100 * availableWidth)
  // }else if(isVminUnit.test(value)){
  //   newValue = formatDpUnit(num/100 * (availableWidth <= availableHeight?availableWidth: availableHeight))
  // }else if(isVmaxUnit.test(value)){
  //   newValue = formatDpUnit(num/100 * (availableWidth >= availableHeight?availableWidth: availableHeight))
  // }
  // return newValue
}

// /**
//  * 格式化Dp单位，支持小数点后一位
//  */
// function formatDpUnit(value:number):string{
//   return value.toFixed(1).toString()
// }