import { HummerElement as Base } from "../../../../../../../packages/hummer-api/src";

// import { Base } from '../nodes/Base'
export function patchClass(
  el: Base,
  key: string,
  prevValue: any,
  nextValue: any){
    // 处理Class的绑定
    el.setAttribute(key, nextValue);
}
