const { document: _Document } = __Hummer__

import { Node } from "../Node"
import { BasicAnimation } from "../anim/BasicAnimation"
import { KeyframeAnimation } from "../anim/KeyframeAnimation"

/**
 * Element 
 * 
 * 需要对齐前端Element方法，参数MDN
 * 
 *
 */
export class Element extends Node {

    /**
     * 元素属性集合
     */
    private _attributes: Record<string, any> = {};


    /**
     * 样式集合
     */
    private _style: Record<string, string> | null = {};

    /**
     * 节点构造函数
     * 
     * @param tag  节点标签
     * @param name 节点名称
     * @param props  构造参数
     */
    constructor(tag: string, name: string = tag, props: any = undefined) {
        super(tag, name, props)
    }

    /**
    * 设置属性
    * 
    * @param key 属性名称
    * @param value  属性值
    */
    public setAttribute(key: string, value: any) {
        this._setAttribute(key, value);
    }


    protected _setAttribute(key: string, value: any) {
        this._attributes[key] = value;
        this.obj.setAttributes({ [key]: value });
    }


    /**
    * 初始化属性
    * 
    * @param attribute  属性
    */
    protected _initAttributes(attribute: object) {
        this._attributes = attribute || {};
        this.obj.setAttributes(attribute);
    }

    /**
     * 设置属性
     * 
     * @param attribute  属性
     */
    protected _setAttributes(attribute: object) {
        this._attributes = { ...this._attributes, ...attribute }
        this.obj.setAttributes(attribute);
    }


    /**
     * 获取属性名
     * @param key 属性名
     */
    public getAttribute(key: string) {
        return this._getAttribute(key);
    }

    protected _getAttribute(key: string) {
        return this._attributes[key];
    }


    public setEnable(enabled: any) {
        this._setAttribute("enable", enabled);
    }


    public getEnable(): any {
        return this._getAttribute("enable");
    }

    /**
     * 设置样式
     * 
     * @param style 样式对象
     * @param flag 标记
     */
    protected setStyle(style: object, flag: boolean = false) {
        this._setStyles(style);
    }


    protected _setStyles(style: object | any) {
        //TODO 临时代码，待优化
        let newStyle: any = {};
        if (style.margin) {
            newStyle.marginLeft = style.margin;
            newStyle.marginTop = style.margin;
            newStyle.marginRight = style.margin;
            newStyle.marginBottom = style.margin;
        }
        if (style.padding) {
            newStyle.paddingLeft = style.padding;
            newStyle.paddingTop = style.padding;
            newStyle.paddingRight = style.padding;
            newStyle.paddingBottom = style.padding;
        }
        if (style.borderStyle) {
            newStyle.borderLeftStyle = style.borderStyle;
            newStyle.borderTopStyle = style.borderStyle;
            newStyle.borderRightStyle = style.borderStyle;
            newStyle.borderBottomStyle = style.borderStyle;
        }
        if (style.borderColor) {
            newStyle.borderLeftColor = style.borderColor;
            newStyle.borderTopColor = style.borderColor;
            newStyle.borderRightColor = style.borderColor;
            newStyle.borderBottomColor = style.borderColor;
        }
        if (style.borderWidth) {
            newStyle.borderLeftWidth = style.borderWidth;
            newStyle.borderTopWidth = style.borderWidth;
            newStyle.borderRightWidth = style.borderWidth;
            newStyle.borderBottomWidth = style.borderWidth;
        }

        if (style.borderRadius) {
            newStyle.borderTopLeftRadius = style.borderRadius;
            newStyle.borderTopRightRadius = style.borderRadius;
            newStyle.borderBottomLeftRadius = style.borderRadius;
            newStyle.borderBottomRightRadius = style.borderRadius;
        }

        this._style = { ...newStyle, ...style };
        this.obj.setStyles(this._style);
    }


    public getStyle() {
        return this._style || {}
    }

    /**
     *  添加动画
     * 
     * @param animation 动画对象
     * @param key  动画唯一key
     */
    public addAnimation(animation: BasicAnimation | KeyframeAnimation, key: string = "") {
        this._addAnimation(animation, key);
    }

    private _addAnimation(animation: any, key: string = "") {
        this.obj.addAnimation(animation, key);
    }

    /**
     * 移除指定动画
     * @param key 动画对象的唯一key
     */
    public removeAnimationForKey(key: string) {
        this._removeAnimationForKey(key);
    }

    private _removeAnimationForKey(key: string) {
        this.obj.removeAnimationForKey(key);
    }

    /**
     * 移除全部动画
     */
    public removeAllAnimation() {
        this._removeAllAnimation();
    }


    private _removeAllAnimation() {
        this.obj.removeAllAnimation();
    }

    /**
     * 获取视图区域
     * @param callback  区域信息回调
     */
    public getRect(callback: Function) {
        this.obj.getRect((rect: object) => {
            callback.call(this, rect);
        })
    }


    /**
     * 获取节点调试信息
     * 
     * @param callback 
     * @param id 
     */
    public dbg_getDescription(callback: Function, id: Number) {
        console.log("dbg_getDescription()");
    }

}