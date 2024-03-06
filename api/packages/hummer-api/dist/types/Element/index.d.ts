import { Node } from "../Node";
import { BasicAnimation } from "../anim/BasicAnimation";
import { KeyframeAnimation } from "../anim/KeyframeAnimation";
export declare class Element extends Node {
    private _attributes;
    private _style;
    constructor(tag: string, name?: string, props?: any);
    setAttribute(key: string, value: any): void;
    protected _setAttribute(key: string, value: any): void;
    protected _setAttributes(attribute: object): void;
    getAttribute(key: string): any;
    protected _getAttribute(key: string): any;
    setEnable(enabled: any): void;
    getEnable(): any;
    protected setStyle(style: object, flag?: boolean): void;
    protected _setStyles(style: object): void;
    getStyle(): Record<string, string>;
    addAnimation(animation: BasicAnimation | KeyframeAnimation, key?: string): void;
    private _addAnimation;
    removeAnimationForKey(key: string): void;
    private _removeAnimationForKey;
    removeAllAnimation(): void;
    private _removeAllAnimation;
    getRect(callback: Function): void;
    hide(): void;
    show(): void;
    dbg_getDescription(callback: Function, id: Number): void;
}
