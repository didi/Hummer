const { Document: _Document } = __hummer__

import { Element } from "../Element"
import { BasicAnimation } from "../anim/BasicAnimation"
import { KeyframeAnimation } from "../anim/KeyframeAnimation"



export interface HummerGlobalProxy {


    //设置样式
    setStyle(element: Element, style: object, flag: boolean): undefined;

    //       /**
    //    * 设定元素样式，进行聚合
    //    * @param style 
    //    * @param flag 是否来自 style 属性
    //    */
    //   setStyle(style: any, flag: boolean = false) {
    //     let tempStyle = this.hackForStyle(style, this)
    //     flag && (this._baseStyle = tempStyle);
    //     let newStyle = {
    //       ...this._defaultStyle,
    //       ...tempStyle,
    //       ...this._baseStyle
    //     };
    //     handleFixedNodeByStyle(this, newStyle);
    //     this.element.style = this._style = newStyle;
    //   }


    //根据class更新样式
    updateClassStyle(element: Element, className: string): undefined;

    // setAttribute(element: Element, key: string, value: any): undefined;

    /**
     *  处理动画
     * 将tenon传递的动画转化为hummer可以处理的动画
     * 
     * @param element
     * @param animation 
     */
    handleAnimation(element: Element, animation: BasicAnimation | KeyframeAnimation): undefined;

    //挂载
    onMounted(element: Element,): undefined;

    //销毁
    onDestoryed(element: Element,): undefined;

    //  // Destoryed 生命周期
    //     private _onDestoryed() {
    //     removeChildWithFixed(this);
    //     this.onDestoryed();
    // }

    /**
     * 处理接收到的事件消息
     * 
     * @param element 响应目标元素
     * @param event  事件对象
     */
    onHandleRecieveEvent(element: Element, event: any): any;

    // this.element.addEventListener(event, (e: any) => {
    //     // iOS 中 event 无法被重新赋值，不要进行 event 的深拷贝
    //     e.target = {
    //       dataset: this.dataset
    //     }
    //     func.call(this, e)
    //   })
}