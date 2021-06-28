export type Length = string | number
export type UnitWidth = string
export type Width =  Length | Keyword.AUTO
export type Style = Record<string, string | number>
export type RgbaColor = string

export const rgbaReg = /rgba?\([\d\.\s,]+\)/

export enum Keyword {
  AUTO = "auto"
}

export enum BorderStyle {
  NONE = 'none',
  SOLID = 'solid',
  DASHED = 'dashed',
  DOTTED = 'dotted'
}

/**
 * 判断是否是 Number 类型
 * @param num<number> 待判断的 Number 类型 
 * @returns Boolean 是否是Number 类型
 */
export function isNumber(num: any):Boolean{
  return !isNaN(num)
}

/**
 * 判断是否是 Width 类型
 * @param width<Width> 待判断的 width
 * @returns Boolean 是否是 Width 类型
 */
export function isWidth(width: Width):Boolean{
  return isLength(width) || width === Keyword.AUTO
}


/**
 * 判断是否是 length 类型
 * @param length any
 * @returns Boolean 是否是 Length 类型
 */
export function isLength(length: any):Boolean{
  let lengthReg = /^[\d\.]+(%|rem|hm|cpx|px|vw|vh)?$/
  return lengthReg.test(length)
}



/**
 * 判断是否是 BorderStyle 类型
 * @param value 
 * @returns 
 */
 export function isBorderStyle(value: string):Boolean{
  return [BorderStyle.NONE,BorderStyle.DASHED,BorderStyle.DOTTED, BorderStyle.SOLID].findIndex((borderStyle:BorderStyle) => {
    return value === borderStyle
  }) !== -1
}

/**
 * 是否包含 Rgba Color
 * @param value 
 * @returns 
 */
export function hasRgbaColor(value:string):Boolean{
  return rgbaReg.test(value)
}

export function getRgbaColor(value:string):RgbaColor|null{
  if(!value){
    return null
  }
  let matches = value.match(rgbaReg)
  if(matches && matches.length > 0){
    let matchStr = matches[0]
    return matchStr
  }else{
    return null
  }
}