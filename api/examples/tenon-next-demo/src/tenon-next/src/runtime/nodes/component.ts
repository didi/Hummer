// import {Base} from './Base'
import { HummerElement } from './../../../../../../../packages/hummer-api/src/index'


const components = new Map()

export interface NativeComponent {
  name: string,
  factory: Function
}

export function register(component:NativeComponent | Array<NativeComponent>){
  if(Array.isArray(component)){
    component.forEach((component:NativeComponent) => {
      registerComponent(component)
    })
  }else {
    registerComponent(component)
  }
}
function registerComponent(component:NativeComponent){
  let {name} = component
  components.set(`ex-${name}`, component)
}
// TODO: next 实现组件注册机制
export function getComponent(tag: string):HummerElement{
  let component = components.get(tag)
  return component.factory()
}