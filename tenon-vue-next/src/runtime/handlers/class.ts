import { HummerElement as Base } from '@hummer/hummer-api'

export function patchClass(
  el: Base,
  key: string,
  prevValue: any,
  nextValue: any){
    // 处理Class的绑定
    el.setAttribute(key, nextValue);
}
