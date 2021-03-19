import { getColor, COLOR_MAP } from '../common/color'
import { CLIP_LIST, REPEAT_LIST, SIZE_LIST } from '../common/background'
import {hexify} from './unit'
/**
 * 转换Background Image
 * @param style 待转换的Style值
 */

const isUrl = /url\((?:"|')/
const isImageBase64Reg = /url\(data:/
const isLinearGradient =  /linear\-gradient/

const imageUrlReg = /url\((?:"|')?([\w\W]+)(?:"|')\)/
const imageBase64Reg = /url\(([\w\W]+)\)/
const linearReg = /linear\-gradient\(([\w\W]+)\)/
export function transformBackground(style:Record<string, string>){
  let tempStyle:Record<string, string> = {
    ...style
  }
  if(tempStyle['background-image']){
    let value = tempStyle['background-image']
    if(isLinearGradient.test(value.trim())){
      delete tempStyle['background-image']
      let matches = value.match(linearReg)
      let linearValue = matches && matches[1] || ''
      tempStyle['background-color'] = 'linear-gradient(' + transformLinear(linearValue) + ')'
    } else{
      tempStyle['background-image'] = transformBackgroundImage(value)
    }
  }
  if(tempStyle['background']){
    const value = tempStyle['background']
    delete tempStyle['background']
    tempStyle = {
      ...splitBackground(value),
      ...tempStyle
    }
  }
  return tempStyle
}

/**
 *  background拆分
 *  background-color: red|#fff|rgb(0,0,0)|rgba(0,0,0,0)
 *  background-image: url()
 *  background-clip: border-box|padding-box|content-box|text
 *  background-repeat: no-repeat 单值语法
 *  background-size: cover|contain 关键字
 */

function splitBackground(value:string):any {
  let newBackgroundMap:Record<string, string> = {}
  // color
  const colorKeys = Object.keys(COLOR_MAP).join('|')
  const color = '(#\\w{3,8})|(rgba?\\(.+\\))'
  const isColor = new RegExp(`(${color}|${colorKeys})`)
  if (isColor.test(value)) {
    // background-color
    const match = isColor.exec(value)
    if (match) {
      newBackgroundMap['background-color'] = match[0]
    }
  }

  // image
  if (isUrl.test(value)) {
    const urlMatch = /url\(.+\)/
    const match = urlMatch.exec(value)
    let backgorundImage = match && match[0]
    if (backgorundImage) {
      newBackgroundMap['background-image'] = transformBackgroundImage(backgorundImage)
    }
  }

  // clip
  const clipMatch = matchKeyList(CLIP_LIST, value)
  if (clipMatch) {
    newBackgroundMap['backgrond-clip'] = clipMatch
  }

  // repeat
  const repeatMatch = matchKeyList(REPEAT_LIST, value)
  if (repeatMatch) {
    newBackgroundMap['background-repeat'] = repeatMatch
  }

  // size关键字
  const sizeMatch = matchKeyList(SIZE_LIST, value)
  if (sizeMatch) {
    newBackgroundMap['background-size'] = sizeMatch
  }

  return newBackgroundMap
}

function matchKeyList(list:string[], value:string):string {
  const matchList = list.join('|')
  const isList = new RegExp(matchList)
  if (isList.test(value)) {
    const match = isList.exec(value)
    if (match) {
      return match[0]
    }
  }
  return ''
}

// TODO: 处理BackgroundImage渐变的情况
function transformBackgroundImage(value:string):string{
  let backgroundImage = value.trim()
  if(isUrl.test(backgroundImage)){
    let matches = backgroundImage.match(imageUrlReg)
    return (matches && matches[1]) || ''
  }else if(isImageBase64Reg.test(backgroundImage)){
    let matches = backgroundImage.match(imageBase64Reg)
    return (matches && matches[1]) || ''
  }
  return ''
}
function transformLinear (value:string){
  let backgroundLinear = value.replace(/\s+/g,'')
  let isRgba = /rgba?/
  let rgbaReg = /rgba\(\d+,\d+,\d+,[\d\.]+\)/g
  if(isRgba.test(backgroundLinear)){
    let matcheList = backgroundLinear.match(rgbaReg)
    for(let item in matcheList){
      backgroundLinear = backgroundLinear.replace(matcheList[parseInt(item)],hexify(matcheList[parseInt(item)]))
    }
  }
  backgroundLinear = backgroundLinear.split(',').map(res => getColor(res)).join(' ')
  return backgroundLinear
}