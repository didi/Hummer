/**
 * 属性名驼峰转换
 * @param style 待转换的Style值
 */
export function transformAttr(style:Record<string, string>){
  const tempStyle:Record<string, string> = {}
  Object.keys(style).forEach(key => {
    const humpKey = transformHumpKey(key)
    tempStyle[humpKey] = style[key]
  })
  return tempStyle
}

function transformHumpKey(key: string):string{
  const humpKey = key.replace(/-(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
  })
  return humpKey
}