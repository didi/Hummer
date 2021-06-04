export enum LifeCycle {
  ONLOAD = 'onLoad',
  ONSHOW = 'onShow',
  ONHIDE = 'onHide',
  ONUNLOAD = 'onUnload',
  ONBACK = 'onBack'
}

export type Listener = Function

const lifeCycleListener:Map<LifeCycle, Array<Listener>> = new Map()

export const lifeCycles = [LifeCycle.ONLOAD, LifeCycle.ONSHOW, LifeCycle.ONHIDE, LifeCycle.ONUNLOAD, LifeCycle.ONBACK]

/**
 * 注册生命周期函数
 * @param evenName<LifeCycle> 生命周期
 * @param callback<Function>  生命周期监听器
 */
export function registerLifeCycle(evenName: LifeCycle, listener: Listener){
  let eventListeners = lifeCycleListener.get(evenName)
  if(!eventListeners){
    lifeCycleListener.set(evenName, [listener])
  }else{
    eventListeners.push(listener)
  }
}

/**
 * 触发生命周期函数
 * onBack 需要考虑多个函数的返回值复用的问题
 * 
 * @param evenName<LifeCycle> 生命周期
 */
export function triggerLifeCycle(evenName: LifeCycle){
  if(evenName === LifeCycle.ONBACK){
    return triggerLifeCycleOnBack()
  }else{
    triggerLifeCycleCommon(evenName)
  }
}

/**
 * 触发 onBack 生命周期函数
 * @returns<Boolean> 是否拦截返回，true 拦截，false 不拦截
 */
function triggerLifeCycleOnBack():Boolean{
  let listeners = lifeCycleListener.get(LifeCycle.ONBACK)
  let flag = false
  if(listeners && listeners.length > 0){
    for(let i = 0;i < listeners.length; i++){
      flag = listeners[i]() || false
    }
  }
  return flag
}

/**
 * 触发通用生命周期函数
 * @param evenName<LifeCycle> 生命周期
 */
function triggerLifeCycleCommon(evenName: LifeCycle){
  let listeners = lifeCycleListener.get(evenName)
  if(listeners && listeners.length > 0){
    listeners.forEach((listener: Listener) => {
      listener()
    })
  }
}


/**
 * 校验生命周期是否合法，给予提示，防止异常
 * @param eventName<LifeCycle> 生命周期
 * @returns<Boolean> 是否合法
 */
export function validateLifeCycle(eventName: LifeCycle):Boolean{
  return lifeCycles.some((item:LifeCycle) => {
    return item === eventName
  })
}
