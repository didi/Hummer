import { Base } from '../nodes/Base'
import {
  ComponentInternalInstance
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

function createInvoker(
  initialValue: EventValue,
  instance: ComponentInternalInstance | null
){
  // TODO: Array.isArray兼容性测试
  const invoker:Invoker = (...args) => {
    if(Array.isArray(initialValue)){
      initialValue.forEach((func:Function) => {
        func.apply(instance, [...args])
      })
    }else {
      initialValue.apply(instance, [...args])
    }
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
  let eventName = rawName.slice(2).toLowerCase()
  if(eventName === LongPress){
    eventName = "longPress"
  }
  return eventName
}