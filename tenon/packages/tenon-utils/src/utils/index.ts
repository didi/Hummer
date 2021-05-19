/**
 * 遍历数组执行Callback函数，允许跳出循环
 * @param arr  待处理的数组
 * @param callback 待执行的回调函数，返回false则跳转循环
 */
export function traverseArr(arr:Array<any>, callback:Function){
  for(let i = 0;i< arr.length;i++){
    let item = arr[i]
    let result = callback(item, i)
    if(!result){
      break;
    }
  }
}

/**
 * 将字符串转换为判断是否存在对象中的字符串，空间换时间
 * @param str 待判断的字符串 a,b
 * @param expectedLowerCase 是否要转换为小写
 */
export function makeMap(str:string, expectedLowerCase:Boolean =false){
  const map = Object.create(null)
  const list:Array<string> = str.split(',')
  for(let i = 0; i< list.length; i++){
    map[list[i]] = true
  }
  return expectedLowerCase ? (val:any) => !!map[val.toLowerCase()] : (val:any) => !!map[val]
}

/**
 * 将数组转换为判断是否存在对象中的字符串，空间换时间
 * @param str 待判断的数组 [a,b]
 * @param expectedLowerCase 是否要转换为小写
 */
export function makeMapByArr(list:any, expectedLowerCase:Boolean =false){
  const map = Object.create(null)
  for(let i = 0; i< list.length; i++){
    map[list[i]] = true
  }
  return expectedLowerCase ? (val:any) => !!map[val.toLowerCase()] : (val:any) => !!map[val]
}

const camelizeRE = /-(\w)/g
/**
 * 将字符串转换成驼峰命名方式
 * @param str 待判断的字符串 test-data
 * @returns 返回转换后的字符串 testData
 */
export function camelize(str:string){
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

export * from './api'