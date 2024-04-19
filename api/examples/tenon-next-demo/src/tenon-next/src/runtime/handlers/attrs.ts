// import { Base } from '../nodes/Base'
import { HummerElement as Base } from "../../../../../../../packages/hummer-api/src";

export  function patchAttrs(
  el: Base,
  key: string,
  prevValue: any,
  nextValue: any){
  
  el.setAttribute(key, nextValue);
}