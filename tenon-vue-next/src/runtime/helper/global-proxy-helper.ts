import { BasicAnimation, HummerElement, HummerGlobalProxy, KeyframeAnimation } from "@hummer/hummer-api";
import { styleDynamicTransformer } from '@hummer/tenon-utils'
import { handleFixedNodeByStyle } from './fixed-helper'
import { handleAnimation, Animation } from './animation-helper'

import { getClassStyle } from '../../utils/style'

export const initGlobalProxy = () => {
  if (!__Hummer__.__globalProxy__) {
    __Hummer__.__globalProxy__ =  new GlobalProxy()
  }
}

export class GlobalProxy implements HummerGlobalProxy {
  /**
   * 设定元素样式，进行聚合
   * @param style 
   * @param flag 是否来自 style 属性
   */
  setStyle(element: HummerElement, style: Record<string, string>, flag: boolean): undefined {
    let tempStyle = this.hackForStyle(style, element)
    // flag && (element._baseStyle = tempStyle);
    let newStyle: Record<string, any> = {
      ...element.style,
      ...tempStyle
    };
    // 处理 fixed 节点
    handleFixedNodeByStyle(element, newStyle);
    // 调用父类设置样式方法
    element.superSetStyle(newStyle)
  }

  updateClassStyle(element: HummerElement, className: string): undefined {
    if (!element.__scopedIds.size) {
      return
    }
    element.__scopedIds.forEach(scopedId => {
        let elementStyle = getClassStyle(element, className, true, scopedId);
        if (Object.keys(elementStyle).length > 0) {
          element.style = elementStyle
        }
    })
  }

  handleAnimation(element: HummerElement, animation: BasicAnimation | KeyframeAnimation): undefined {
    handleAnimation(element, animation as unknown as Animation)
  }

  onHandleReceiveEvent(element: HummerElement, event: any = {}) {
    // FIXME: 运行时报错  先注释这部分逻辑 可能是event类型错误
    // event.target = {
    //   dataset: element.dataset
    // }
    return event
  }

  onMounted(element: HummerElement): undefined {
      
  }

  onDestroyed(element: HummerElement): undefined {
      // TODO: 安卓IOS下需要hack
  }


  protected hackForStyle(style: any, base: HummerElement) {
    return styleDynamicTransformer.transformStyle(style, base)
  }
}