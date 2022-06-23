import {OperationType, Operation, Operations} from './types'
export const NAMESPACE = Hummer.env.namespace || '';

const randomChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
/**
 * 对象的Diff操作
 * @param left Origin Object
 * @param right Target Object
 */
export function diff(left:Record<string, any>, right:Record<string, any>, parentKey:Array<string> = []):Operations{
  let ops:Operations = []
  Object.keys(left).forEach(key => {
    if(!right.hasOwnProperty(key)){
      // Delete Attr
      ops.push(createOperation(OperationType.DELETE, [...parentKey, key]))
      return
    }
    if(isObject(left[key]) && isObject(right[key])){
      // Deep Diff Object
      if(!isEqual(left[key], right[key])){
        ops.push(createOperation(OperationType.UPDATE, [...parentKey, key], right[key])) 
      }
      // let diffOps = diff(left[key], right[key], [...parentKey, key]);
      // diffOps.forEach(op => {
      //   ops.push(op)
      // })
    }else {
      if(left[key] !== right[key]){
        ops.push(createOperation(OperationType.UPDATE, [...parentKey, key], right[key]))
      }
    }
    
  })

  Object.keys(right).forEach(key => {
    if(!left.hasOwnProperty(key)){
      // Add Attr
      ops.push(createOperation(OperationType.ADD, [...parentKey,key], right[key]))
    }
  })  
  return ops
}

export function createOperation(type:OperationType, key:Array<string>, value?:any):Operation{
  return {
    type:type,
    key: key,
    value: value 
  }
}

function isObject(x:any):Boolean{
  return Object(x) === x
}

// 对象间比较，判断引用是否更改，同Vue的校验
function isEqual(left:object, right:object):boolean{
  // return JSON.stringify(left) === JSON.stringify(right)
  return left === right
}

// Common Clone Object
export function cloneObject(source: object):object{
  return Object.assign({}, source)
}

export function getUUID(){
  const id = randomString(8, randomChars); 
  return id
}

export function getNotifyEventKey(customKey?: string){
  return `${NAMESPACE || customKey}_UPDATE_STORE`
}

export function getMemoryKey(customKey?: string){
  return `${NAMESPACE || customKey}_STORE_MEMORY`
}

function randomString(length = 8, chars: string) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export const Undefined = Symbol('undefined')
export const StaicUndefined = 'undefined' // 转换的时候，暂时直接使用 undefined 字符串
export function stringify(obj: Object){
  return JSON.stringify(obj, (key:string, value:any) => {
    if(value === undefined){
      return StaicUndefined
    }
    return value
  })
}

export function parseJson(json: string){
  let obj = JSON.parse(json, (key:string, value:any) => {
    if(value === StaicUndefined){
      return Undefined
    }
    return value
  })
  Object.keys(obj).forEach((key) => {
    if(obj[key] === Undefined){
      obj[key] = undefined
    } 
  })
  return obj
}

export function setMemoryByKey(key:string, content: string){
  // 由于 Android getMemory时，会自动反序列化字符串。存储的时候增加前缀，设为非标准 Json String。
  Memory.set(key, 'Memory_'+content);
}

export function getMemoryByKey(key:string){
  let data = Memory.get(key);
  if (data) {
    // 兼容新老版本store 避免页面报错
    if (!data.startsWith('Memory_')) {
      return data
    }
  }
  return data && data.slice(7);
}