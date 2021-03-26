import { Base } from '../nodes/Base'

export  function patchAttrs(
  el: Base,
  key: string,
  prevValue: any,
  nextValue: any){
  
  el.setAttribute(key, nextValue);
}