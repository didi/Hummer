import {LifeCycle, registerLifeCycle, validateLifeCycle} from '../lifecycle'

export const usePageEvent = function(eventName: LifeCycle, callback: Function){
  if(!validateLifeCycle(eventName)){
    console.warn('不存在对应的生命周期')
    return
  }
  // TODO Add Page Context To Cache Data
  registerLifeCycle(eventName, callback)
}