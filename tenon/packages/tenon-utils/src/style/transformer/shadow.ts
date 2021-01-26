import {traverseArr} from '../../utils'
import {transformUnitValue, hexify} from './unit'
const attrs = ["box-shadow"]

export function transformShadow(style:Record<string, string>):Record<string, string>{
  traverseArr(attrs, function(item:any, index:number){
    if(style[item]){
      style["shadow"] = getShadowValue(style[item])
      delete style[item]
    }
  })
  return style
}

/**
 * 获取阴影的值
 * @param value
 * 类似值:"0 8hm 20hm 0 #09284741"的时候，需要过滤掉第四个值
 */
function getShadowValue(value:string) {
  let values = value
  if (!values) {
    return ''
  }
  const shadowItems = transformValue(value)
  if (shadowItems.length > 4) {
    values =  [
      shadowItems[0],
      shadowItems[1],
      shadowItems[2],
      shadowItems[4]
    ].join(' ')
  }else{
    values = shadowItems.join(' ')
  }
  return values
}
/**
 * 对value进行拆分单位转换
 * @param value
 * style 的 value:'1rem 1rem 1rem rgba(0, 0, 0, 0.1)'，需要转换hm单位和rgba
 * */
function transformValue(value:string){
  const rgbReg = /rgb?/,
  rgbaReg = /rgba?/
  let values = value,
  shadowItems: Array<string> = new Array()
  if(rgbReg.test(values)){
    shadowItems = [
      ...values.slice(0,values.indexOf('rgb')).trim().split(/\s/),
      values.slice(values.indexOf('rgb'))
    ]
  }else{
    shadowItems = values.split(/\s/)
  }
  for(let i = 0; i< shadowItems.length; i++){
    if(rgbaReg.test(shadowItems[i])){
      shadowItems[i] = hexify(shadowItems[i])
    }else{
      shadowItems[i] = transformUnitValue(shadowItems[i])
    }
  }
  return shadowItems
}
