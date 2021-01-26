/**
 * 属性名驼峰转换
 * @param style 待转换的Style值
 */
export function transformAttr(style:Record<string, string>){
  let tempStyle:Record<string, string> = {}
  Object.keys(style).forEach(key => {
    let humpKey = transformHumpKey(key)
    tempStyle[humpKey] = style[key]
  })
  return tempStyle
}

function transformHumpKey(key: string):string{
  let humpKey = key.replace(/-(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
  })
  return humpKey
}