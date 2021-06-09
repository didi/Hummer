// Tenon React Event
const eventReg = /^on[A-Z]/

/**
 * 校验属性值是否是标准事件
 * 事件标准:
 * 以 on 开头的驼峰式属性名称，比如：onClick、onTap、onScrollTo
 * @param propName 待判断的属性值
 * @returns 
 */
export function isEventProp(propName: string){
  return eventReg.test(propName)
}


/**
 * 获取标准的事件名称
 * @param name 
 */
export function getEventName(rawName: string){
  let eventName = rawName.slice(2).toLowerCase()
  if(eventName === 'longpress'){
    eventName = "longPress"
  }
  return eventName
}




export * from './listener'
export * from './event'