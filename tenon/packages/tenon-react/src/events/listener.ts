import {Base as Element} from "@hummer/tenon-core"
import {getFiberCurrentPropsFromNode} from '../hostConfig/utils'
/**
 * 获取标准的 Listener函数
 */
export function getListener(node: Element, propName: string, func:Function){
  return function(...args: Array<any>){
    let props = getFiberCurrentPropsFromNode(node);
    let originFunc = props[propName];
    originFunc.apply(null, args)
  }
}