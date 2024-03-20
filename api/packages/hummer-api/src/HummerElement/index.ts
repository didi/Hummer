const { document: _Document, proxy: _Proxy } = __Hummer__

import { Element } from "../Element"
import { HummerGlobalProxy } from "./HummerGlobalProxy"

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

    protected __defaultStyle: Record<string, string> | null = {};
    protected __style: Record<string, string> | null = {};
    protected __baseStyle: Record<string, string> | null = {};

    private globalProxy: HummerGlobalProxy | undefined = undefined;//代理处理

    public constructor(tag: string, name: string = tag, props: any) {
        super(tag, name, props);
        this.bindEventTarget();
        this.__view_id = __view_id;
        if (_Proxy && _Proxy.globalProxy) {
            this.globalProxy = _Proxy.globalProxy;
        }

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
    public set disabled(disabled: Boolean | Object) {
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
        return this.getStyle || {};
    }

    //扩展样式属性：有代理时通过代理处理
    public set style(value: object) {
        this.setStyle(value, false);
    }

    protected setStyle(value: object, flag: boolean = false) {
        if (this.globalProxy) {
            this.globalProxy.setStyle(this, value, flag);
        } else {
            super.setStyle(value, false);
        }
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

        // if (!this.__scopedIds.size) {
        //     return
        // }

        // this.__scopedIds.forEach(scopedId => {
        //     let elementStyle = getClassStyle(this, className, true, scopedId);
        //     if (Object.keys(elementStyle).length > 0) {
        //         this.setStyle(elementStyle, false);
        //     }
        // })
    }

    /**
     * 扩展处理动画
     * 
     * @param animation 
     * TODO:保持 Tenon Vue 的兼容，后期切换成同一 Core后，进行变更
     */
    public handleAnimation(animation: Animation) {
        this.setAnimation(animation);
    }

    /**
     * 扩展设置动画
     * 
     * @param animation 
     */
    public setAnimation(animation: Animation) {
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

    // Cache Props To Get
    private setCacheProp(key: string, value: any) {
        // 如果是 dataattr 格式的属性，缓存到 dataset 中，方便事件可以获取到 dataset （Chameleon事件需求）
        if (/^data/.test(key)) {
            let dataKey = key.slice(4).toLowerCase()
            if (dataKey) {
                this.dataset[dataKey] = value
            }
        }
        // TODO:  这数据结构不对 会报错
        // this.props.set(key, value)
    }


    protected override onHandleReceiveEvent(eventName: string, event: any): any {
        if (this.globalProxy) {
            return this.globalProxy.onHandleReceiveEvent(this, event);
        }
        return super.onHandleReceiveEvent(eventName, event);
    }



    /**
     * 分发页面事件
     * 
     * 页面事件无需注册，自动向下分发
     * 
     * @param eventName  事件名称
     * @param event 事件类型
     */
    public override dispatchEvent(eventName: string, event: any): void {
        switch (eventName) {
            case '__onCreate__':
                this.onCreate();
                break;
            case '__onAppear__':
                this.onAppear();
                break;
            case '__onDisappear__':
                this.onDisappear();
                break;
            case '__onDestroy__':
                this.onDestroy();
                break;
            case '__onBack__':
                this.onBack();
                break;
        }
        //继续向下分发事件
        super.dispatchEvent(eventName, event);
    }


    /**
     * 页面创建
     *  native 不提供onReady， 
     *  需手动加一个onReady生命周期
     */
    public onCreate() {

    }

    /**
     * 页面显示周期
     */
    public onAppear() {

    }

    /**
     * 页面隐藏
     */
    public onDisappear() {

    }

    /**
     * 页面销毁
     */
    public onDestroy() {

    }

    /**
     * 页面返回事件
     * 需要控制页面是否可以返回，需要设置属性：canGoBack；而不是通过返回值
     * @param event  事件信息，包含当前页面是否可返回:canGoBack
     * @returns 
     */
    public onBack() {

    }

    public get canGoBack(): boolean {
        return this._getAttribute('canGoBack');
    }

    public set canGoBack(canGoBack: boolean) {
        this._setAttribute('canGoBack', canGoBack);
    }


    // public addEventListener(event: string, func: Function) {
    //     // this.element.addEventListener(event, (e: any) => {
    //     //     // iOS 中 event 无法被重新赋值，不要进行 event 的深拷贝
    //     //     e.target = {
    //     //         dataset: this.dataset
    //     //     }
    //     //     func.call(this, e)
    //     // })
    // }
    // public removeEventListener(event: string, func?: Function) {
    //     // this.element.removeEventListener(event, func)
    // }

}