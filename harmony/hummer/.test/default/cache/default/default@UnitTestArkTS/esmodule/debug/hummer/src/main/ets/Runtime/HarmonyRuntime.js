import { HMContextEventType } from '@bundle:com.example.hummer/hummer/ets/Context/HMContext';
import { HMNode } from '@bundle:com.example.hummer/hummer/ets/Components/Node';
import { EventEmitter } from '@bundle:com.example.hummer/hummer/ets/Context/EventEmitter';
import { MethodType } from '@bundle:com.example.hummer/hummer/ets/Instruction/IPlatformInst';
import { componentNotFind, unrecognizedMethod } from '@bundle:com.example.hummer/hummer/ets/Utils/Error';
import { isArray, isObject } from '@bundle:com.example.hummer/hummer/ets/Utils/is';
import { forceToString } from '@bundle:com.example.hummer/hummer/ets/Utils/Utils';
class GlobalObject {
}
class Hummer {
}
/// 鸿蒙运行时，模拟 Hummer Core 工作，实现 tenon 2 鸿蒙平台 bridge，调用鸿蒙平台指令
export class Document {
    constructor(runtime) {
        this.runtime = runtime;
    }
    createElement(tag, props) {
        return this.runtime.createElement(tag, props);
    }
    createComponent(name, props) {
        return this.runtime.createComponent(name, props);
    }
    render(element) {
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
export class HarmonyRuntime {
    constructor(context) {
        this.id = 1;
        this.hummerObject = new Hummer();
        this.globalObject = new GlobalObject();
        this.eventEmitter = new EventEmitter();
        this.context = context;
        let document = new Document(this);
        this.globalObject.Hummer = this.hummerObject;
        this.hummerObject.document = document;
    }
    genId() {
        return this.id++;
    }
    createElement(tag, props) {
        return this._createInstance(tag, true, props);
    }
    _createInstance(tag, isElement, props) {
        let componentCls = this.context.builtinComponentRegistry[tag];
        if (!componentCls && this.context.config.componentRegistry) {
            componentCls = this.context.config.componentRegistry[tag];
        }
        if (!componentCls && isElement) {
            componentCls = HMNode; //UI 组件默认使用node构建
        }
        if (!componentCls) {
            this.context.handleError(componentNotFind(tag));
            return;
        }
        const component = new componentCls(this.context, this.genId(), tag, props);
        return component;
    }
    //后续如果 可以去除多 node 类，则可以移除 builtinComponentRegistry 的注册
    createComponent(name, props) {
        return this._createInstance(name, false, props);
    }
    renderNode(element) {
        this.eventEmitter.emit(HMContextEventType.RenderSuccess, element);
    }
    /* 平台指令 */
    invoke(type, thisHandle, methodType, componentName, methodName, ...args) {
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
    _create(thisHandle, componentName, ...args) {
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
    _delete(thisHandle, componentName, ...args) {
    }
    _call(thisHandle, methodName, ...args) {
        const nativeHandle = thisHandle.__nativeHandle__;
        /// 不使用
        const props = nativeHandle[methodName];
        if (props instanceof Function) {
            const func = props;
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
    create(node, ...args) {
        this._create(node, node.tag, ...args);
    }
    /// JS 内无法感知到 GC，因此不会调用 delete，
    delete(node, ...args) {
    }
    appendChild(thisObject, child) {
        const superNode = thisObject.__nativeHandle__;
        const childNode = child.__nativeHandle__;
        superNode.appendChild(childNode);
    }
    removeChild(thisObject, child) {
        const superNode = thisObject.__nativeHandle__;
        const childNode = child.__nativeHandle__;
        superNode.removeChild(childNode);
    }
    removeAll(thisObject) {
        const superNode = thisObject.__nativeHandle__;
        superNode.removeAll();
    }
    insertBefore(thisObject, newChild, referenceChild) {
        const superNode = thisObject.__nativeHandle__;
        const newNode = newChild.__nativeHandle__;
        const refNode = referenceChild.__nativeHandle__;
        superNode.insertBefore(newNode, refNode);
    }
    replaceChild(thisObject, newChild, oldChild) {
        const superNode = thisObject.__nativeHandle__;
        const newNode = newChild.__nativeHandle__;
        const oldNode = oldChild.__nativeHandle__;
        superNode.replaceChild(newNode, oldNode);
    }
    setStyle(thisObject, style) {
        const node = thisObject.__nativeHandle__;
        node.setStyles(style);
    }
    setAttributes(thisObject, attrs) {
        const node = thisObject.__nativeHandle__;
        node.setAttributes(attrs);
    }
    getAttribute(thisObject, key, callback) {
        const node = thisObject.__nativeHandle__;
        node.getAttribute(key, callback);
    }
    setEventTarget(thisObject, eventTarget) {
        const node = thisObject.__nativeHandle__;
        node.eventChannel = eventTarget;
    }
    addEventListener(thisObject, event) {
        const node = thisObject.__nativeHandle__;
        node.addEventListener(event);
    }
    removeEventListener(thisObject, event) {
        const node = thisObject.__nativeHandle__;
        node.removeEventListener(event);
    }
    getReact(thisObject, callback) {
        const node = thisObject.__nativeHandle__;
        node.getRect(callback);
    }
    render(node) {
        this.eventEmitter.emit(HMContextEventType.RenderSuccess, node.__nativeHandle__);
    }
    etsInvoke(thisHandle, methodName, ...args) {
        const node = thisHandle.__nativeHandle__;
        const _args = this.convertToNativeArray(args);
        return node.invoke(methodName, ..._args);
    }
    convertToNativeArray(args) {
        const res = [];
        const length = args.length;
        for (let index = 0; index < length; index++) {
            const value = args[index];
            if (isArray(value)) {
                res.push(this.convertToNativeArray(value));
            }
            else if (isObject(value)) {
                res.push(this.convertNativeObject(value));
            }
            else {
                res.push(value);
            }
        }
        return res;
    }
    convertNativeObject(param) {
        if (param['__nativeHandle__']) {
            return param;
        }
        const res = {};
        for (const key in param) {
            const value = param[key];
            if (isArray(value)) {
                res[key] = this.convertToNativeArray(value);
            }
            else if (isObject(value)) {
                res[key] = this.convertNativeObject(value);
            }
            else {
                res[key] = value;
            }
        }
        return res;
    }
}
//# sourceMappingURL=HarmonyRuntime.js.map