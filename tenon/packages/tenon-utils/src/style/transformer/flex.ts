/**
 * 转换Flex Attribute
 * @param style 待转换的Style值
 */
export function transformFlex(style:Record<string, string>){
  let tempStyle:Record<string, string> = {
    ...style
  }
  if(tempStyle['flex']){
    let value = tempStyle['flex']
    delete tempStyle['flex']
    tempStyle = {
      ...splitFlexStyle(value),
      ...tempStyle
    }
  }
  return tempStyle
}

/**
 * 拆解Flex样式
 * @param value 
 * Ex.
 * flex: 1; => flex-grow: 1;
 * flex: 1 1; => flex-grow:1;flex-shink:1;
 * flex: 1 1 10px; => flex-grow:1;flex-shink:1;flex-basics: 10px;
 * flex: 10px; => flex-basics: 10px;
 * flex: 1 10px; => flex-grow:1;flex-basics: 10px;
 * flex: 10rem; => flex-basics: 10rem;
 */
function splitFlexStyle(value:string):Record<string, string>{
  let values = value.split(/\s+/)
  let tempStyle:Record<string, string> = {}
  let [grow, shrink, basis] = values
  if(grow) {
    if((/\d+(px|rem)/).test(grow)){
      tempStyle['flex-basis'] = grow
    }else {
      tempStyle['flex-grow'] = grow
    }
  }
  if(shrink) {
    if((/\d+px/).test(shrink)){
      tempStyle['flex-basis'] = shrink
    }else {
      tempStyle['flex-shrink'] = shrink
    }
  }
  basis && (tempStyle['flex-basis'] = basis)
  return tempStyle
}