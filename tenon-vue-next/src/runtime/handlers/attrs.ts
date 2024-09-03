import { HummerElement as Base } from '@hummer/hummer-api'
export  function patchAttrs(
  el: Base,
  key: string,
  prevValue: any,
  nextValue: any){
  
  el.setAttribute(key, nextValue);
}