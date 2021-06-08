import {Base} from './Base'

const components = new Map()

export interface NativeComponent {
  name: string,
  factory: ()=>void
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
  const {name} = component
  components.set(`ex-${name}`, component)
}
export function getComponent(tag: string):Base{
  const component = components.get(tag)
  return component.factory()
}