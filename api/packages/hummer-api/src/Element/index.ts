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
    constructor(tag: string, name: string = tag, props: any=undefined) {
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
        return this._attributes.get(key);
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

    protected _setStyles(style: object) {
        this._style = { ...style };
        this.obj.setStyles(style);
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

    public hide() {
        // TOOD 隐藏当前元素
        // TODO 不实现
    }

    public show() {
        // TODO 展示当前元素
        // TODO 不实现
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