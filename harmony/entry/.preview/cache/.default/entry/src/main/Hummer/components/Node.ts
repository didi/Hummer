import type { IHummerStyle } from '../Style/IHummerStyle';
import { CallEts } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/CallEts";
import { domOperationError, invalidArg, unrecognizedMethod } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Error";
import { forceToString, nextTick } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Utils";
import type { fn } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Utils";
import Base from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Base";
import type { IDomInstruction } from './IPlatformInst';
import type { BasicAnimation, KeyframeAnimation } from './Module/Animation';
export enum MutationType {
    Style = "style",
    Attribute = "attribute",
    Children = "children"
}
export type AttributesType = Record<string, any>;
type MutationFunction = (mutationType: MutationType) => void;
type UpdateFunc = fn;
type NativeFunc = fn;
export class Node extends Base implements IDomInstruction {
    public parentNode?: Node;
    public childNodes: Node[] = [];
    /* 状态变量 */
    public eventListeners: Set<string> = new Set();
    public eventChannel?: Function;
    public attributes: AttributesType = {};
    private updateFuncRegistry?: Map<string, UpdateFunc> = new Map();
    private nativeFuncRegistry?: Map<string, NativeFunc> = new Map();
    // 保存fixe之前的愿容器
    private _oriParent?: Node;
    private _styleStore: IHummerStyle = generateDefaultAnimationStyle();
    public setStyles(style: any) {
        const currentStyle = this._styleStore;
        const newStyle: IHummerStyle = {
            ...currentStyle,
            ...style
        };
        this._styleStore = newStyle;
        //todo: notify reload
        this.processFixed(this.parentNode);
        this.triggerMutation(MutationType.Style, newStyle);
    }
    public registerUpdateFunc(key: string, updateFunc: UpdateFunc): Node {
        this.updateFuncRegistry.set(key, updateFunc);
        return this;
    }
    public registerNativeFunc(key: string, updateFunc: UpdateFunc): Node {
        this.nativeFuncRegistry.set(key, updateFunc);
        return this;
    }
    public unregisterAllUpdateFuncs() {
        this.updateFuncRegistry = new Map();
        ;
    }
    public registerUpdateFuncs(funcs: Record<string, UpdateFunc>) {
        for (const key in funcs) {
            this.updateFuncRegistry.set(key, funcs[key]);
        }
    }
    public triggerMutation(type: MutationType, ...args) {
        const func = this.updateFuncRegistry.get(type);
        if (func) {
            func(...args);
        }
    }
    // 处理 fixd 样式，可能被 setstyle、appendChild 等dom API调用
    private processFixed(superNode: Node): boolean {
        const isFixedNode = this.isFixedNode();
        // 当前 是  fixed 节点 && 有父视图 && 父节点 不是 root，则加入 root
        if (isFixedNode && this.parentNode != this.context.rootNode && superNode) {
            // 当前是 fixed 节点 &&
            this._oriParent = superNode;
            this.context.rootNode.appendChild(this);
            return true;
        }
        else if (!isFixedNode && this._oriParent && this.parentNode != this._oriParent && this.parentNode == this.context.rootNode) {
            this.context.rootNode.removeChild(this);
            this._oriParent.appendChild(this);
            this._oriParent = undefined;
            return true;
        }
        return false;
    }
    private isFixedNode(): boolean {
        return this.style?.position === 'fixed';
    }
    get style(): IHummerStyle {
        return this._styleStore;
    }
    /**
     * 方法将一个节点附加到指定父节点的子节点列表的末尾处。
     * 如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置
     *
     * https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
     * */
    appendChild(child: Node): Node | undefined {
        if (!child) {
            this.context.handleError(domOperationError('Node:appendChild `child` cannot be nil'));
            return undefined;
        }
        if (child.processFixed(this)) {
            return undefined;
        }
        const idxOfRef = this.findIndex(child);
        if (idxOfRef < 0) {
            child.parentNode?.removeChild(child);
            this.childNodes.push(child);
            // todo: notify add
        }
        else {
            this.childNodes.splice(idxOfRef, 1);
            this.childNodes.push(child);
            // todo: notify move: idxOfRef -> length-1
        }
        child.parentNode = this;
        this.triggerMutation(MutationType.Children, this.childNodes);
        return child;
    }
    /**
     * 方法从 DOM 中删除一个子节点。返回删除的节点
     * child 节点不是node节点的子节点，则该方法会抛出异常
     * */
    removeChild(child: Node): Node | undefined {
        if (!child) {
            this.context.handleError(domOperationError('Node:removeChild `child` cannot be nil'));
            return undefined;
        }
        const idx = this.findIndex(child);
        if (idx < 0) {
            this.context.handleError(domOperationError('Node:removeChild NotFoundError'));
            return undefined;
        }
        this.childNodes.splice(idx, 1);
        // todo: notify remove
        child.parentNode = undefined;
        this.triggerMutation(MutationType.Children, this.childNodes);
        return child;
    }
    removeAll(): void {
        this.childNodes.forEach((child) => {
            child.parentNode = undefined;
        });
        this.childNodes = [];
        this.triggerMutation(MutationType.Children, this.childNodes);
        // todo: notify remove all
    }
    /**
     * 在参考节点(referenceNode) 之前，插入 新节点(newNode)，可能会出发以下行为：
     * 如果引用节点为 null && newNode不在 node 的子树中，则将指定的节点添加到指定父节点的子节点列表的末尾。
     * https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore
     * */
    insertBefore(newNode: Node, referenceNode?: Node): Node | undefined {
        if (!newNode) {
            this.context.handleError(domOperationError('Node:insertBefore `newNode` cannot be nil'));
            return undefined;
        }
        if (referenceNode && referenceNode.parentNode != this) {
            this.context.handleError(domOperationError('Node:insertBefore `referenceNode` NotFoundError'));
            return undefined;
        }
        if (newNode.processFixed(this)) {
            return undefined;
        }
        // 有 newNode && (referenceNode.super == this || !referenceNode)
        if (!referenceNode) {
            // 没有参考节点，则直接添加
            this.appendChild(newNode);
        }
        else {
            newNode.parentNode?.removeChild(newNode); // trigger remove
            const idxOfRef = this.findIndex(referenceNode);
            this.childNodes.splice(idxOfRef, 0, newNode);
            newNode.parentNode = this;
            // todo: notify add
        }
        this.triggerMutation(MutationType.Children, this.childNodes);
        return newNode;
    }
    /**
     * 方法用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点。
     *
     * */
    replaceChild(newChild: Node, oldChild: Node): Node | undefined {
        newChild.parentNode?.removeChild(newChild);
        const idxOfRef = this.findIndex(oldChild);
        if (idxOfRef < 0) {
            this.context.handleError(domOperationError('Node:replaceChild NotFoundError'));
            return undefined;
        }
        if (newChild.processFixed(this)) {
            return undefined;
        }
        this.childNodes[idxOfRef] = newChild;
        oldChild.parentNode = undefined;
        newChild.parentNode = this;
        // todo: notify reload
        this.triggerMutation(MutationType.Children, this.childNodes);
        return oldChild;
    }
    setEventTarget(eventTarget: Function) {
        this.eventChannel = eventTarget;
    }
    addEventListener(event: string) {
        if (this.eventListeners.has(event)) {
            return;
        }
        this.eventListeners.add(event);
    }
    removeEventListener(event: string) {
        if (!this.eventListeners.has(event)) {
            return;
        }
        this.eventListeners.delete(event);
    }
    dispatchEvent(eventName: string, ...args: any[]) {
        if (this.eventChannel) {
            this.eventChannel(eventName, ...args);
        }
    }
    setAttributes(attrs: Record<string, any>) {
        for (const key in attrs) {
            this.attributes[key] = attrs[key];
        }
        this.triggerMutation(MutationType.Attribute, this.attributes);
    }
    getAttribute(key: string, callback: fn) {
        callback(this.attributes[key]);
    }
    getRect(callback: fn) {
        nextTick(() => {
            const jsonDescription = getInspectorByKey(this.uniqueId);
            callback(jsonDescription);
        });
    }
    invoke(funcName: string, ...args: any[]): undefined | any {
        const func = this.nativeFuncRegistry.get(funcName);
        if (func) {
            try {
                return func(...args);
            }
            catch (e) {
                this.context.handleException(forceToString(e));
            }
            return func(...args);
        }
        else {
            this.context.handleError(unrecognizedMethod(funcName));
        }
    }
    // type：basic
    addAnimation(animation: object, key: string) {
        if (animation['type'] == 'basic') {
            CallEts.addBasicAnimation(this, animation as BasicAnimation);
        }
        else if (animation['type'] == 'keyframe') {
            CallEts.addKeyframeAnimation(this, animation as KeyframeAnimation);
        }
        else {
            this.context.handleError(invalidArg('动画参数type无效'));
        }
    }
    // todo: 鸿蒙暂不支持 移除
    removeAnimationForKey(key: string) { }
    removeAllAnimation() { }
    public findIndex(refChild: Node): number {
        const idx = this.childNodes.findIndex((element) => {
            return refChild === element;
        });
        return idx;
    }
    public dispose() {
        this.parentNode = null;
        this.childNodes = [];
    }
}
function generateDefaultAnimationStyle(): IHummerStyle {
    return {
        opacity: 1,
        backgroundColor: 'transparent',
        transformModel: {
            translate: { x: 0, y: 0 },
            scale: { x: 1, y: 1 },
            rotation: { x: 0, y: 0, z: 0, angle: 0 }
        }
    };
}
