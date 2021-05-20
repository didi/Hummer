import {Style, isNumber} from '../common/utils'
/**
 * 转换Flex Attribute
 * @param style 待转换的Style值
 */
export function transformFlex(style:Record<string, string>){
  let tempStyle:Style = {
    ...style
  }
  if(tempStyle['flex']){
    let value = tempStyle['flex']
    delete tempStyle['flex']
    tempStyle = {
      ...defaultFlexStyle,
      ...transformFlexStyle(value + ""),
      ...tempStyle
    }
  }
  return tempStyle
}

/**
 * 默认的 Flex Style
 */
export const defaultFlexStyle = {
  "flex-grow": 0,
  "flex-shrink": 0,
  "flex-basis": 'auto'
}

/**
 * 支持 Flex缩写
 * Flex 语法对齐 Web Flex的实现，具体参考文档：https://developer.mozilla.org/en-US/docs/Web/CSS/flex
 * @param flexStyle 
 * @returns 
 */
function transformFlexStyle(flexStyleValue: string):Style{
  let tempStyle:Style = {}
  let values = flexStyleValue.trim().split(/\s+/)
  switch(values.length){
    case 1:
      tempStyle = handleFlexStyleBy1(values);
      break;
    case 2:
      tempStyle = handleFlexStyleBy2(values);
      break;
    case 3:
      tempStyle = handleFlexStyleBy3(values);
      break;
    default:
      break;
  }
  return tempStyle
}

/**
 * 
 * One-value syntax:
 * - a <number>: In this case it is interpreted as flex: <number> 1 0; the <flex-shrink> value is assumed to be 1 and the <flex-basis> value is assumed to be 0.
one of the keywords: none, auto, or initial.
 * - one of the keywords: none, auto, or initial.
 * @param values []
 * @returns Style
 */
function handleFlexStyleBy1(values: Array<string>):Style{
  let value = values[0];
  let tempStyle:Style = {};
  if(isNaN(parseInt(value))){
    tempStyle["flex-basis"] = value
  }else{
    if(value === "0"){
      tempStyle["flex-basis"] = 0
    }else{
      tempStyle["flex-grow"] = Number(value)
      tempStyle["flex-shrink"] = Number(value)
    }
  }
  return tempStyle
}

/**
 * 
 * Two-value syntax:
 * - The first value must be:
 *   - a <number> and it is interpreted as <flex-grow>.
 * - The second value must be one of:
 *   - a <number>: then it is interpreted as <flex-shrink>.
 *   - a valid value for width: then it is interpreted as <flex-basis>.
 * @param values []
 * @returns Style
 */
function handleFlexStyleBy2(values: Array<string>):Style{
  let tempStyle:Style = {};
  let [firstValue, secondValue] = values; 
  if(firstValue){
    tempStyle["flex-grow"] = firstValue;
  }
  if(secondValue){
    if(isNumber(secondValue)){
      tempStyle["flex-shrink"] = Number(secondValue);
    }else{
      tempStyle["flex-basis"] = secondValue;
    }
  }
  return tempStyle
}

/**
 * 
 * Three-value syntax: the values must be in the following order:
 * 1.a <number> for <flex-grow>.
 * 2.a <number> for <flex-shrink>.
 * 3.a valid value for width for <flex-basis>.
 * @param values []
 * @returns Style
 */
function handleFlexStyleBy3(values: Array<string>):Style{
  let [firstValue, secondValue, thirdValue] = values; 
  return {
    "flex-grow": firstValue,
    "flex-shrink": secondValue,
    "flex-basis": thirdValue
  }
}
