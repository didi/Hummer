import { CallEts } from '@bundle:com.example.hummer/hummer/ets/Utils/CallEts';
import { domOperationError, invalidArg, unrecognizedMethod } from '@bundle:com.example.hummer/hummer/ets/Utils/Error';
import { forceToString, nextTick } from '@bundle:com.example.hummer/hummer/ets/Utils/Utils';
import HMBase from '@bundle:com.example.hummer/hummer/ets/Components/Base';
import generateBarcode from '@hms:core.scan.generateBarcode';
export var MutationType;
(function (MutationType) {
    MutationType["Style"] = "style";
    MutationType["Attribute"] = "attribute";
    MutationType["Children"] = "children";
    MutationType["Event"] = "event";
})(MutationType || (MutationType = {}));
export class HMNode extends HMBase {
    constructor() {
        super(...arguments);
        this.childNodes = [];
        /* 状态变量 */
        this.attributes = {};
        this.updateFuncRegistry = new Map();
        this.nativeFuncRegistry = new Map();
        this._styleStore = generateDefaultAnimationStyle();
    }
    setStyles(style) {
        const currentStyle = this._styleStore;
        const newStyle = Object.assign(Object.assign({}, currentStyle), style);
        this._styleStore = newStyle;
        //todo: notify reload
        this.processFixed(this.parentNode);
        this.triggerMutation(MutationType.Style, newStyle);
    }
    registerUpdateFunc(key, updateFunc) {
        this.updateFuncRegistry.set(key, updateFunc);
        return this;
    }
    registerNativeFunc(key, updateFunc) {
        this.nativeFuncRegistry.set(key, updateFunc);
        return this;
    }
    unregisterAllUpdateFuncs() {
        this.updateFuncRegistry = new Map();
        ;
    }
    unregisterAllNativeFuncs() {
        this.nativeFuncRegistry = new Map();
        ;
    }
    registerUpdateFuncs(funcs) {
        for (const key in funcs) {
            this.updateFuncRegistry.set(key, funcs[key]);
        }
    }
    triggerMutation(type, ...args) {
        const func = this.updateFuncRegistry.get(type);
        if (func) {
            func(...args);
        }
    }
    // 处理 fixd 样式，可能被 setstyle、appendChild 等dom API调用
    processFixed(superNode) {
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
    isFixedNode() {
        var _a;
        return ((_a = this.style) === null || _a === void 0 ? void 0 : _a.position) === 'fixed';
    }
    get style() {
        return this._styleStore;
    }
    /**
     * 方法将一个节点附加到指定父节点的子节点列表的末尾处。
     * 如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置
     *
     * https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
     * */
    appendChild(child) {
        var _a;
        if (!child) {
            this.context.handleError(domOperationError('Node:appendChild `child` cannot be nil'));
            return undefined;
        }
        if (child.processFixed(this)) {
            return undefined;
        }
        const idxOfRef = this.findIndex(child);
        if (idxOfRef < 0) {
            (_a = child.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(child);
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
    removeChild(child) {
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
    removeAll() {
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
    insertBefore(newNode, referenceNode) {
        var _a;
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
            (_a = newNode.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(newNode); // trigger remove
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
    replaceChild(newChild, oldChild) {
        var _a;
        (_a = newChild.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(newChild);
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
    addEventListener(event) {
        const res = super.addEventListener(event);
        this.triggerMutation(MutationType.Event, event);
        return res;
    }
    removeEventListener(event) {
        const res = super.removeEventListener(event);
        this.triggerMutation(MutationType.Event, event);
        return res;
    }
    setAttributes(attrs) {
        for (const key in attrs) {
            this.attributes[key] = attrs[key];
        }
        this.triggerMutation(MutationType.Attribute, this.attributes);
    }
    getAttribute(key, callback) {
        callback(this.attributes[key]);
    }
    getRect(callback) {
        nextTick(() => {
            const jsonDescription = getInspectorByKey(this.uniqueId);
            callback(jsonDescription);
        });
    }
    //优先使用 ets 订阅结果，如果没有，则使用 node 自身方法，实现类似 override 的效果
    invoke(funcName, ...args) {
        let func = this.nativeFuncRegistry.get(funcName);
        let _this = undefined;
        if (!func) {
            func = this[funcName];
            _this = func ? this : undefined;
        }
        if (func) {
            try {
                return func.call(_this, ...args);
            }
            catch (e) {
                this.context.handleException(forceToString(e));
            }
        }
        else {
            this.context.handleError(unrecognizedMethod(funcName));
        }
        return undefined;
    }
    // type：basic
    addAnimation(animation, key) {
        if (animation['type'] == 'basic') {
            CallEts.addBasicAnimation(this, animation, key);
        }
        else if (animation['type'] == 'keyframe') {
            CallEts.addKeyframeAnimation(this, animation, key);
        }
        else {
            this.context.handleError(invalidArg('动画参数type无效'));
        }
    }
    // todo: 鸿蒙暂不支持 移除
    removeAnimationForKey(key) { }
    removeAllAnimation() { }
    findIndex(refChild) {
        const idx = this.childNodes.findIndex((element) => {
            return refChild === element;
        });
        return idx;
    }
    dispose() {
        this.parentNode = null;
        this.childNodes = [];
    }
}
function generateDefaultAnimationStyle() {
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
//# sourceMappingURL=Node.js.map