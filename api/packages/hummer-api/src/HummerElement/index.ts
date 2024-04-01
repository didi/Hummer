const { document: _Document_, proxy: _Proxy_ } = __Hummer__
import { FlexStyle, Element } from "../Element"
import { HummerGlobalProxy } from "./HummerGlobalProxy"


/**
 * 基础事件结构
 */
export interface HMEvent<T> {
    /**
     * 	事件类 type: 'input'
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
        if (_Proxy_ && _Proxy_.globalProxy) {
            this.globalProxy = _Proxy_.globalProxy;
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
    public set style(value: FlexStyle | Record<string,any>) {
        this.setStyle(value, false);
    }

    protected setStyle(value: FlexStyle | Record<string,any>, flag: boolean = false) {
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
}