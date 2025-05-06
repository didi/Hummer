import { HMContextEventType } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Context/HMContext";
import type { HMContext } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Context/HMContext";
import type { Node } from '../Components/Node';
import { EventEmitter } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Context/EventEmitter";
import { MethodType } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Instruction/IPlatformInst";
import type { External, InvokeType, IPlatformInst, IPlatformRenderInst } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Instruction/IPlatformInst";
import type { IHummerStyle } from '../Style/IHummerStyle';
import { componentNotFind, unrecognizedMethod } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Error";
import type Base from '../Components/Base';
import { isArray, isObject } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/is";
import { forceToString } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Utils";
import type { fn } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Utils";
class GlobalObject {
    public Hummer: Hummer;
}
class Hummer {
    public document: Document;
}
/// 鸿蒙运行时，模拟 Hummer Core 工作，实现 tenon 2 鸿蒙平台 bridge，调用鸿蒙平台指令
export class Document {
    private runtime: HarmonyRuntime;
    constructor(runtime: HarmonyRuntime) {
        this.runtime = runtime;
    }
    public createElement(tag: string, props?: object): Base {
        return this.runtime.createElement(tag, props);
    }
    public createComponent(name: string, props?: object): Base {
        return this.runtime.createComponent(name, props);
    }
    public render(element: Node): void {
        this.runtime.renderNode(element);
    }
}
/**
 * 鸿蒙运行时 <---> 鸿蒙平台：参数传递为 JS 直接传递
 * 对象持有关系：
 *        Hummer API                                        鸿蒙平台对象
 * External(Element|Component).__nativeHandle__     ->     Node|Component
 *
 *
 * 内存模型：
 * Hummer API  -> external -> Base  <--- ets
 *                             ⬇️        ⬇️
 * HarmonyRuntime    <->    HMContext <---
 */
export class HarmonyRuntime implements IPlatformInst<External>, IPlatformRenderInst<External> {
    private id: number = 1;
    public readonly hummerObject: Hummer = new Hummer();
    public readonly globalObject: GlobalObject = new GlobalObject();
    public readonly context: HMContext;
    public readonly eventEmitter: EventEmitter = new EventEmitter();
    constructor(context: HMContext) {
        this.context = context;
        let document = new Document(this);
        this.globalObject.Hummer = this.hummerObject;
        this.hummerObject.document = document;
    }
    public genId() {
        return this.id++;
    }
    public createElement(tag: string, props?: object): Base {
        let componentCls = this.context.builtinComponentRegistry[tag];
        if (!componentCls && this.context.config.componentRegistry) {
            componentCls = this.context.config.componentRegistry[tag];
        }
        if (!componentCls) {
            this.context.handleError(componentNotFind(tag));
            return;
        }
        const component = new componentCls(this.context, this.genId(), tag, props);
        return component;
    }
    //后续如果 可以去除多 node 类，则可以移除 builtinComponentRegistry 的注册
    public createComponent(name: string, props?: object): Base {
        return this.createElement(name, props);
    }
    public renderNode(element: Node): void {
        this.eventEmitter.emit(HMContextEventType.RenderSuccess, element);
    }
    /* 平台指令 */
    invoke(type: InvokeType, thisHandle: External, methodType: MethodType, componentName: string, methodName?: string, ...args: any[]): any | undefined {
        if (methodType == MethodType.New) {
            this._create(thisHandle, componentName, ...args);
        }
        else if (methodType == MethodType.Delete) {
            this._delete(thisHandle, componentName, ...args);
        }
        else if (methodType == MethodType.Call) {
            return this._call(thisHandle, methodName, ...args);
        }
    }
    private _create(thisHandle: External, componentName: string, ...args: any[]): void {
        let componentCls = this.context.builtinComponentRegistry[componentName];
        if (!componentCls && this.context.config.componentRegistry) {
            componentCls = this.context.config.componentRegistry[componentName];
        }
        if (!componentCls) {
            this.context.handleError(componentNotFind(componentName));
            return;
        }
        const component = new componentCls(this.context, thisHandle.id, thisHandle.tag, ...args);
        //挂载对象
        thisHandle.__nativeHandle__ = component;
    }
    /// JS 内无法感知到 GC，因此不会调用 delete，
    private _delete(thisHandle: External, componentName: string, ...args: any[]): void {
    }
    private _call(thisHandle: External, methodName?: string, ...args: any[]): any | undefined {
        const nativeHandle = thisHandle.__nativeHandle__;
        /// 不使用
        const props = nativeHandle[methodName];
        if (props instanceof Function) {
            const func = props as Function;
            try {
                const _args = this.convertToNativeArray(args);
                return func.call(nativeHandle, ..._args);
            }
            catch (e) {
                this.context.handleException(forceToString(e));
            }
        }
        else {
            this.context.handleError(unrecognizedMethod(methodName));
        }
    }
    create(node: External, ...args: any[]): void {
        this._create(node, node.tag, ...args);
    }
    /// JS 内无法感知到 GC，因此不会调用 delete，
    delete(node: External, ...args: any[]): void {
    }
    appendChild(thisObject: External, child: External): void {
        const superNode = thisObject.__nativeHandle__ as Node;
        const childNode = child.__nativeHandle__ as Node;
        superNode.appendChild(childNode);
    }
    removeChild(thisObject: External, child: External): void {
        const superNode = thisObject.__nativeHandle__ as Node;
        const childNode = child.__nativeHandle__ as Node;
        superNode.removeChild(childNode);
    }
    removeAll(thisObject: External): void {
        const superNode = thisObject.__nativeHandle__ as Node;
        superNode.removeAll();
    }
    insertBefore(thisObject: External, newChild: External, referenceChild: External): void {
        const superNode = thisObject.__nativeHandle__ as Node;
        const newNode = newChild.__nativeHandle__ as Node;
        const refNode = referenceChild.__nativeHandle__ as Node;
        superNode.insertBefore(newNode, refNode);
    }
    replaceChild(thisObject: External, newChild: External, oldChild: External): void {
        const superNode = thisObject.__nativeHandle__ as Node;
        const newNode = newChild.__nativeHandle__ as Node;
        const oldNode = oldChild.__nativeHandle__ as Node;
        superNode.replaceChild(newNode, oldNode);
    }
    setStyle(thisObject: External, style: IHummerStyle): void {
        const node = thisObject.__nativeHandle__ as Node;
        node.setStyles(style);
    }
    setAttributes(thisObject: External, attrs: {
        [x: string]: any;
    }): void {
        const node = thisObject.__nativeHandle__ as Node;
        node.setAttributes(attrs);
    }
    getAttribute(thisObject: External, key: string, callback: fn): void {
        const node = thisObject.__nativeHandle__ as Node;
        node.getAttribute(key, callback);
    }
    setEventTarget(thisObject: External, eventTarget: Function): void {
        const node = thisObject.__nativeHandle__ as Node;
        node.eventChannel = eventTarget;
    }
    addEventListener(thisObject: External, event: string): void {
        const node = thisObject.__nativeHandle__ as Node;
        node.addEventListener(event);
    }
    removeEventListener(thisObject: External, event: string): void {
        const node = thisObject.__nativeHandle__ as Node;
        node.removeEventListener(event);
    }
    getReact(thisObject: External, callback: fn): void {
        const node = thisObject.__nativeHandle__ as Node;
        node.getRect(callback);
    }
    render(node: External): void {
        this.eventEmitter.emit(HMContextEventType.RenderSuccess, node.__nativeHandle__);
    }
    etsInvoke(thisHandle: External, methodName?: string, ...args: any[]): undefined | any {
        const node = thisHandle.__nativeHandle__ as Node;
        const _args = this.convertToNativeArray(args);
        return node.invoke(methodName, ..._args);
    }
    convertToNativeArray(args: any[]): any[] {
        const res = [];
        const length = args.length;
        for (let index = 0; index < length; index++) {
            const value = args[index];
            if (isArray(value)) {
                res.push(this.convertToNativeArray(value));
            }
            else if (isObject<object>(value)) {
                res.push(this.convertNativeObject(value));
            }
            else {
                res.push(value);
            }
        }
        return res;
    }
    convertNativeObject(param: object): object {
        if (param['__nativeHandle__']) {
            return param;
        }
        const res = {};
        for (const key in param) {
            const value = param[key];
            if (isArray(value)) {
                res[key] = this.convertToNativeArray(value);
            }
            else if (isObject<object>(value)) {
                res[key] = this.convertNativeObject(value);
            }
            else {
                res[key] = value;
            }
        }
        return res;
    }
}
