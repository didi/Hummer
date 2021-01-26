import {Base} from './Base'

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
export function getComponent(tag: string):Base{
  let component = components.get(tag)
  return component.factory()
}