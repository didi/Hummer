/**
 * css transform 转换
 * transform: rotateX(120deg) scale(0.5) =>  transform: 'rotateX(120),scale(0.5)'
*/
import { transformUnitValue } from './unit'

export function transformTransform(style:Record<string, string>){
  let tempStyle:Record<string, string> = {
    ...style
  }
  if(tempStyle['transform']){
    let value = tempStyle['transform']
    tempStyle = {
      ...tempStyle,
      ...splitToArray(transTranslateUnit(replaceDeg(value)))
    }
  }
  return tempStyle
}

function splitToArray(params: string) {
  return {
    transform: params.trim().split(/\s+/g).join(',')
  }
}

function replaceDeg(str: string) {
  return str.replace(/deg/g, '')
}

function transTranslateUnit(str: string) {
  let arr = (str.replace(/\s/g, '').match(/[a-zA-Z0-9]+\(.+?\)/g)) || [];
  arr.map((item, index) => {
    if (item.indexOf('translate')> -1 || item.indexOf('position')> -1) {
      // translate(100非标准hummer单位, 100非标准hummer单位) => translate(100标准hummer单位, 100标准hummer单位)
      // translate(100非标准hummer单位) => translate(100标准hummer单位)
      // 获取数值
      let temp = item.match(/[^(][a-zA-Z0-9,]+(?=\))/g)
      let key =  item.split('(')[0]
      let value = temp?temp[0]:'0'
      value = value.split(',').map(v => transformUnitValue(v)).join(',')
      arr[index] = `${key}(${value})`
    }
  });
  return arr.join(' ')
}