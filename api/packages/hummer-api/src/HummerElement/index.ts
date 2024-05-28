import { EventListener } from "src/EventTarget";
import { FlexStyle, Element } from "../Element"
import { HummerGlobalProxy } from "./HummerGlobalProxy"


/**
 * 基础事件结构
 */
export interface HMEvent<T> {
    /**
     * 	事件类 
     * 
     * eg: type: 'input'
     */
    type?: string,

    /**
     * 输入状态	
     * eg:<input>
     * // state: 1 // began（输入框获得焦点时的回调）
     * // state: 2 // changed（输入框输入内容时的回调）
     * // state: 3 // ended（输入框失去焦点时的回调）
     * // state: 4 // confirmed（输入框完成输入时的回调）
     */
    state: T,

    /**
     * 时间戳	timestamp: 1578973450142
     */
    timestamp?: number
}


/**
 * 触摸事件
 * 
 * eventName:'touch'
 * 
 */
export interface TouchEvent extends HMEvent<number> {

    /**
     * 手势状态
     * 
     * state: 0 // normal
     * state: 1 // began
     * state: 2 // changed
     * state: 3 // ended
     * state: 4 // cancelled   
     */
    state: number,

    /**
     * 触摸位置（单位：dp或pt）	
     * 
     * position: {x: 111.1, y: 222.2}
     */
    position?: object
}

/**
 * 点击事件
 * 
 * eventName:'tap'
 */
export interface TapEvent extends HMEvent<number> {

    /**
    * 手势状态 
    * 
    * state: 0 // normal
    * state: 1 // began
    * state: 2 // changed
    * state: 3 // ended
    * state: 4 // cancelled   
    */
    state: number,
    /**
    * 触摸位置（单位：dp或pt）	
    * 
    * position: {x: 111.1, y: 222.2}
    */
    position?: object

}

/**
 * 长按事件
 * 
 * eventName:'longPress'
 */
export interface LongPressEvent extends HMEvent<number> {

    /**
    * 手势状态 
    * 
    * state: 0 // normal
    * state: 1 // began
    * state: 2 // changed
    * state: 3 // ended
    * state: 4 // cancelled   
    */
    state: number,
    /**
    * 触摸位置（单位：dp或pt）	
    * 
    * position: {x: 111.1, y: 222.2}
    */
    position?: object

}

/**
 * 拖动事件
 * 
 * eventName:'pan'
 */
export interface PanEvent extends HMEvent<number> {

    /**
    * 手势状态 
    * 
    * state: 0 // normal
    * state: 1 // began
    * state: 2 // changed
    * state: 3 // ended
    * state: 4 // cancelled   
    */
    state: number,
    /**
    * 移动的偏移位置（单位：dp或pt）	
    * 
    * translation: {deltaX: 10, deltaY: 20.5}
    */
    translation?: object
}

/**
 * 扫动事件
 * 
 * eventName:'swipe'
 */
export interface SwipeEvent extends HMEvent<number> {

    /**
     * 手势状态 
     * 
     * state: 0 // normal
     * state: 1 // began
     * state: 2 // changed
     * state: 3 // ended
     * state: 4 // cancelled   
     */
    state: number,
    /**
     * 滑动方向	(1:right, 2:left, 4:up, 8:down)	
     * 
     * direction: 1
     * 
     */
    direction?: number
}

/**
 * 缩放事件
 * 
 * eventName:'pinch'
 */
export interface PinchEvent extends HMEvent<number> {
    /**
     * 手势状态 
     * 
     * state: 0 // normal
     * state: 1 // began
     * state: 2 // changed
     * state: 3 // ended
     * state: 4 // cancelled   
     */
    state: number,

    /**
     * 拉伸的比例		
     * 
     * scale: 1.5
     */
    scale?: number

}


export type ViewEvent = TouchEvent | TapEvent | LongPressEvent | PanEvent | SwipeEvent | PinchEvent;


let __view_id = 0;
/**
 * HummerElement
 * 
 * 1、提供Element标准以外的Hummer能力
 * 2、对接Tenon实现/保留能力
 */
export class HummerElement extends Element {


    public __scopedIds = new Set<string>();//作用域ID

    public __NAME: Symbol | null = null;//节点类型（）
    public __view_id: number = 0;


    public dataset: any = {};//扩展数据存储   

    public viewId: string = "";

    protected __defaultStyle: Record<string, string> | null = {};
    protected __style: Record<string, string> | null = {};
    protected __baseStyle: Record<string, string> | null = {};
    protected __propsVue__ = new Map<any, any>();

    private globalProxy: HummerGlobalProxy | undefined = undefined;//代理处理



    /**
     * 视图Element构造函数
     * 
     * @param tag  视图标签，必须与平台导出组件名称一致
     * @param name  视图名称，用于给组件取名称，组件封装后应当给封装的组件根节点一个表示其功能的名称，设计用于加快DIFF算法。
     * @param props 组件构造参数：必须包含：viewId，用于“getElementById()” 查找节点。或者 Node dump标示不同Element。
     */
    public constructor(tag: string, name: string = tag, props: any) {
        super(tag, name, props);
        this.bindEventTarget();
        this.__view_id = ++__view_id;
        this.viewId = props.viewId;
        this.globalProxy = this.getProxy();
        this.initialize();
    }


    /**
     * //TODO 后续发布需要移除，并在业务代码中替换为新的方式，用“构造函数”替代
     * 已废弃/临时兼容旧版本
     */
    protected initialize(){

    }

    /**
     * 获取代理接口
     * @returns 
     */
    private getProxy() {
        if (__Hummer__ && __Hummer__.__globalProxy__) {
            return __Hummer__.__globalProxy__;
        }
        return undefined;
    }

    //扩展支持disabled,与enabled相反
    public get enabled() {
        return super.getEnable();
    }

    //扩展支持disabled,与enabled相反
    public set enabled(enabled: boolean) {
        super.setEnable(enabled);
    }

    //扩展支持disabled,与enabled相反
    public get disabled() {
        return !this.getEnable();
    }

    //扩展支持disabled,与enabled相反
    public set disabled(disabled: Boolean | Record<string, any>) {
        if (typeof disabled === 'boolean') {
            super.setEnable(!disabled);
        }
    }

    //扩展支持 className
    public get className() {
        return this._getAttribute('class')
    }


    //扩展样式属性
    public get style() {
        return this.getStyle() || {};
    }

    //扩展样式属性：有代理时通过代理处理
    public set style(value: FlexStyle | Record<string, any>) {
        this.setStyle(value, false);
    }

    protected setStyle(value: FlexStyle | Record<string, any>, flag: boolean = false) {
        if (this.globalProxy) {
            this.globalProxy.setStyle(this, value, flag);
        } else {
            super.setStyle(value, false);
        }
    }


    /**
     *  提供的父类方法，绕开代理
     * @param value
     * @param flag 
     */
    public superSetStyle(value: FlexStyle | object, flag: boolean = false) {
        super.setStyle(value, false);
    }

    public setScopeId(id: string) {
        this.__scopedIds.add(id)
        this.updateStyle();
    }


    public updateStyle() {
        let className = this._getAttribute('class');
        this.updateClassStyle(className);
    }

    /**
     * 根据class更新样式，如果不在tenon环境中无globalProxy，无操作
     * 
     * @param className class名称
     */
    public updateClassStyle(className: string) {
        if (this.globalProxy) {
            this.globalProxy.updateClassStyle(this, className);
        }
    }

    /**
     * 扩展处理动画
     * 
     * @param animation 
     * TODO:保持 Tenon Vue 的兼容，后期切换成同一 Core后，进行变更
     */
    public handleAnimation(animation: any) {
        this.setAnimation(animation);
    }

    /**
     * 扩展设置动画
     * 
     * @param animation 
     */
    public setAnimation(animation: any) {
        if (this.globalProxy) {
            this.globalProxy.handleAnimation(this, animation);
        } else {
            super.addAnimation(animation);
        }
    }

    /**
     * 不支持方法
     * @param text 
     */
    public setElementText(text: string) {
        // TODO 抛出异常
        console.warn('非text元素不支持')
    }

    /**
    * 获取属性名
    * @param key 属性名
    */
    public getAttribute(key: string) {
        switch (key) {
            case 'disabled':
                return this.disabled
            default:
                return this._getAttribute(key)
        }
    }

    /**
     * 设定属性
     * @param key 属性名
     * @param value 属性值
     */
    public setAttribute(key: string, value: any) {
        this.setCacheProp(key, value)
        switch (key) {
            case 'disabled':
                this.disabled = value !== false;
                break;
            case 'class':
                this.updateClassStyle(value);
                break;
            default:
                this._setAttribute(key, value);
                break;
        }
    }


    public get props() {
        return this.__propsVue__;
    }

    // Cache Props To Get
    private setCacheProp(key: string, value: any) {
        // 如果是 dataattr 格式的属性，缓存到 dataset 中，方便事件可以获取到 dataset （Chameleon事件需求）
        if (/^data/.test(key)) {
            let dataKey = key.slice(4).toLowerCase()
            if (dataKey) {
                this.dataset[dataKey] = value
            }
        }
        this.__propsVue__.set(key, value)
    }


    protected override onHandleReceiveEvent(eventName: string, event: any): any {
        if (this.globalProxy) {
            return this.globalProxy.onHandleReceiveEvent(this, event);
        }
        return super.onHandleReceiveEvent(eventName, event);
    }




    public addEventListener(eventName: string,
        eventListener: (event: TouchEvent | TapEvent | LongPressEvent | PanEvent | SwipeEvent | PinchEvent | any) => void
            | Function
            | EventListener,
        useCapture?: boolean | undefined): void {
        super.addEventListener(eventName, eventListener, useCapture);
    }


    public getElementById(id: string): HummerElement | undefined {
        return this.findElementById(id);
    }

    public findElementById(id: string): HummerElement | undefined {
        //console.info("findElementById() this=" + this.viewId + ",id=" + id + ",__view_id=" + this.__view_id);
        if (id == "") {
            return undefined;
        }
        if (this.viewId == id) {
            return this;
        }
        let result = undefined;

        let childNode: HummerElement | undefined = this.firstChild ? this.firstChild as HummerElement : undefined;

        while (childNode) {
            let target = childNode.findElementById(id);
            if (target) {
                //console.info("findElementById(): this=" + this.__view_id + ",id=" + id + ",__view_id=" + target.__view_id);
         
                result = target;
                childNode = undefined;
            }else{
                childNode = childNode.nextSibling?childNode.nextSibling as HummerElement :undefined;
            }
        }
        return result;
    }
}