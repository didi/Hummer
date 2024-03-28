import { HummerElement } from "../HummerElement"
import { FlexStyle } from "../Element"



export interface HummerGlobalProxy {


    //设置样式
    /**
     * 设置样式
     * 
     * 说明：在给Element/组件设置样式的时候，在这里能拦截到设置的样式，如果被拦截转发到这里，原设置样式将不执行，需要调用
     * element.setStyle(value,flag);将最终目标样式更新到视图上。
     * 
     * @param element 组件实例
     * @param style  样式
     * @param flag  标记
     */
    setStyle(element: HummerElement, style: FlexStyle | Record<string, any>, flag: boolean): undefined;

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


    /**
     * 根据class更新样式
     * 
     * 说明：当class改变级scopeid 更新后会被调用
     * 
     * @param element 组件实例
     * @param className  class名称
     */
    updateClassStyle(element: HummerElement, className: string): undefined;

    // setAttribute(element: Element, key: string, value: any): undefined;

    /**
     *  处理动画
     * 将tenon传递的动画转化为hummer可以处理的动画
     * 
     * 说明：设置动画时将在这里被拦截，如果设置的动画类型不是hummer动画需要在这里转化为Hummer动画。
     * 
     * @param element
     * @param animation 
     */
    handleAnimation(element: HummerElement, animation: any): undefined;

    //挂载
    onMounted(element: HummerElement,): undefined;

    //销毁
    onDestroyed(element: HummerElement,): undefined;

    //  // Destoryed 生命周期
    //     private _onDestroyed() {
    //     removeChildWithFixed(this);
    //     this.onDestroyed();
    // }

    /**
     * 处理接收到的事件消息
     *
     * 说明：需要重新对事件内容做处理时，在这里修改或者追加Event数据。
     * 
     * @param element 响应目标元素
     * @param event  事件对象
     */
    onHandleReceiveEvent(element: HummerElement, event: any): any;

    // this.element.addEventListener(event, (e: any) => {
    //     // iOS 中 event 无法被重新赋值，不要进行 event 的深拷贝
    //     e.target = {
    //       dataset: this.dataset
    //     }
    //     func.call(this, e)
    //   })
}