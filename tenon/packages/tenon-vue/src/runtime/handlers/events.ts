import { Base } from '../nodes/Base'
import {
  ComponentInternalInstance,
  callWithAsyncErrorHandling
} from '@vue/runtime-core'

const LongPress = 'longpress'
interface Invoker extends EventListener {
  value: EventValue
}
type EventValue = Function & {
  invoker?: Invoker | null
}

export function patchEvents(
  el: Base,
  rawName: string,
  prevValue: EventValue | null,
  nextValue: EventValue | null,
  instance: ComponentInternalInstance | null = null
){
  const event = getStaticEventName(rawName)
  const value = nextValue
  const invoker = prevValue && prevValue.invoker
  if(nextValue && value){
    if(invoker){
      (prevValue as EventValue).invoker = null
      invoker.value = value
      nextValue.invoker = invoker
    }else {
      addEventListener(el, event, createInvoker(value, instance))
    }
  }else if(invoker){
    removeEventListener(el, event, invoker)
  }
}

function patchInvokerHandler(initialValue: any, instance: ComponentInternalInstance | null, args: any) {
  // TODO: Array.isArray兼容性测试
  if (Array.isArray(initialValue)) {
    return initialValue.map(func => () => func && func.apply(instance, args))
  } else {
    return () => initialValue.apply(instance, args)
  }
}

function createInvoker(
  initialValue: EventValue,
  instance: ComponentInternalInstance | null
){
  const invoker:Invoker = (...args) => {
    // 搜集 Error
    callWithAsyncErrorHandling(
      patchInvokerHandler(initialValue, instance, [...args]),
      instance,
      5,
      [...args]
    );
  }
  invoker.value = initialValue
  initialValue.invoker = invoker
  return invoker
}

export function addEventListener(el:Base, event: string, handler: EventListener){
  el.addEventListener(event, handler)
}
export function removeEventListener(el:Base, event: string, handler: EventListener){
  el.removeEventListener(event, handler)
}

export function getStaticEventName(rawName: string){
  // vue 3.3后的 compiler core 中，非native组件，事件名会以on:开头，需要去掉:
  let eventName = rawName.replace(':', '').slice(2).toLowerCase()
  if(eventName === LongPress){
    eventName = "longPress"
  }
  return eventName
}