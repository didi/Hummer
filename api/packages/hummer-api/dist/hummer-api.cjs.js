'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const { Document: _Document$2 } = __hummer__;
class HMObject {
    constructor(tag, isApi = true, props) {
        this.tag = tag;
        this.name = tag;
        this.isApi = isApi;
        this.props = props;
        if (isApi) {
            this.obj = _Document$2.createComponent(tag, props);
        }
        else {
            this.obj = _Document$2.createElement(tag, props);
        }
    }
    call(methodName, ...args) {
        this.obj.invoke(methodName, args);
    }
}

const { Document: _Document$1 } = __hummer__;
class Document {
    static render(element) {
        _Document$1.render(element);
    }
}

__hummer__;
class EventTarget extends HMObject {
    constructor(tag, isApi = true, props) {
        super(tag, isApi, props);
        this.envents = new Map();
    }
    onRecieveEvent(event) {
        event = this.onHandleRecieveEvent(event);
        this.dispatchEvent(event.eventName, event);
    }
    onHandleRecieveEvent(event) {
        return event;
    }
    bindEventTarget() {
        this.obj.setEventTarget(this.onRecieveEvent);
    }
    dispatchEvent(eventName, event) {
        var listeners = this.envents.get(eventName);
        if (listeners != undefined) {
            listeners.forEach((lisener => {
                if (lisener != undefined) {
                    lisener.onEvent(event);
                }
            }));
        }
    }
    addEventListener(eventName, eventLisener, useCapture) {
        var listeners = this.envents.get(eventName);
        if (listeners == undefined) {
            listeners = new Array();
            this.envents.set(eventName, listeners);
        }
        listeners.push(eventLisener);
    }
    removeEventListener(eventName, eventLisener, useCapture) {
        var listeners = this.envents.get(eventName);
        if (listeners != undefined) {
            if (eventLisener == undefined) {
                listeners.splice(0, listeners.length);
                this.envents.delete(eventName);
            }
            else {
                const index = listeners.indexOf(eventLisener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            }
        }
    }
}

__hummer__;
class Node extends EventTarget {
    constructor(tag, name = tag, props, nodeName = tag) {
        super(tag, false, props);
        this.nodeName = "";
        this.name = "";
        this.nodeType = 0;
        this.parentNode = undefined;
        this.prevSibling = null;
        this.nextSibling = null;
        this.children = new Set();
        this.firstChild = null;
        this.lastChild = null;
        this.name = name;
        this.nodeName = nodeName;
    }
    _onMounted() {
        this.onMounted();
    }
    onMounted() {
    }
    _onDestoryed() {
        this.onDestoryed();
    }
    onDestoryed() {
    }
    hasChildNodes() {
        if (this.children.size > 0) {
            return true;
        }
        return false;
    }
    appendChild(child) {
        child.unlinkSiblings();
        child.parentNode = this;
        this.children.add(child);
        if (!this.firstChild) {
            this.firstChild = child;
        }
        child.prevSibling = this.lastChild;
        child.nextSibling = null;
        if (this.lastChild) {
            this.lastChild.nextSibling = child;
        }
        this.lastChild = child;
        this._appendChild(child);
        child._onMounted();
    }
    _appendChild(child) {
        this.obj.appendChild(child.obj);
    }
    unlinkSiblings() {
        if (this.parentNode && this.parentNode.firstChild === this) {
            this.parentNode.firstChild = this.nextSibling;
        }
        if (this.parentNode && this.parentNode.lastChild === this) {
            this.parentNode.lastChild = this.prevSibling;
        }
        if (this.prevSibling) {
            this.prevSibling.nextSibling = this.nextSibling;
        }
        if (this.nextSibling) {
            this.nextSibling.prevSibling = this.prevSibling;
        }
        this.prevSibling = null;
        this.nextSibling = null;
    }
    removeChild(child) {
        child._onDestoryed();
        child.unlinkSiblings();
        child.parentNode = undefined;
        this.children.delete(child);
        this._removeChild(child);
    }
    _removeChild(child) {
        this.obj.removeChild(child.obj);
    }
    insertBefore(child, anchor) {
        child.unlinkSiblings();
        child.parentNode = this;
        if (anchor.prevSibling) {
            child.prevSibling = anchor.prevSibling;
            anchor.prevSibling.nextSibling = child;
        }
        anchor.prevSibling = child;
        child.nextSibling = anchor;
        if (this.firstChild === anchor) {
            this.firstChild = child;
        }
        this.children.add(child);
        this._insertBefore(child, anchor);
        child._onMounted();
    }
    _insertBefore(child, anchor) {
        this.obj.insertBefore(child.obj, anchor.obj);
    }
    replaceChild(newNode, oldNode) {
        oldNode._onDestoryed();
        var _prevSibling = oldNode.prevSibling;
        var _nextSibling = oldNode.nextSibling;
        oldNode.unlinkSiblings();
        oldNode.parentNode = undefined;
        this.children.delete(oldNode);
        newNode.unlinkSiblings();
        newNode.parentNode = this;
        if (_prevSibling) {
            _prevSibling.nextSibling = newNode;
            newNode.prevSibling = _prevSibling;
        }
        if (_nextSibling) {
            _nextSibling.prevSibling = newNode;
            newNode.nextSibling = _nextSibling;
        }
        if (this.firstChild === oldNode) {
            this.firstChild = newNode;
        }
        if (this.lastChild === oldNode) {
            this.lastChild = newNode;
        }
        this.children.add(newNode);
        this._replaceChild(newNode, oldNode);
        newNode._onMounted();
    }
    _replaceChild(newNode, oldNode) {
        this.obj.replaceChild(newNode.obj, oldNode.obj);
    }
    removeAll() {
        this.children.forEach(child => {
            child._onDestoryed();
            child.unlinkSiblings();
            child.parentNode = undefined;
        });
        this.children.clear();
        this._removeAll();
    }
    _removeAll() {
        this.obj.removeAll();
    }
}

__hummer__;
class Element extends Node {
    constructor(tag, name = tag, props) {
        super(tag, name, props);
        this._attributes = {};
        this._style = {};
    }
    setAttribute(key, value) {
        this._setAttribute(key, value);
    }
    _setAttribute(key, value) {
        this._attributes.set(key, value);
        this.obj.setAttributes({ key: value });
    }
    _setAttributes(attribute) {
        this._attributes = Object.assign(Object.assign({}, this._attributes), attribute);
        this.obj.setAttributes(attribute);
    }
    getAttribute(key) {
        return this._getAttribute(key);
    }
    _getAttribute(key) {
        return this._attributes.get(key);
    }
    setEnable(enabled) {
        this._setAttribute("enable", enabled);
    }
    getEnable() {
        return this._getAttribute("enable");
    }
    setStyle(style, flag = false) {
        this._setStyles(style);
    }
    _setStyles(style) {
        this._style = Object.assign({}, style);
        this.obj.setStyles(style);
    }
    getStyle() {
        return this._style || {};
    }
    addAnimation(animation, key = "") {
        this._addAnimation(animation, key);
    }
    _addAnimation(animation, key = "") {
        this.obj.addAnimation(animation, key);
    }
    removeAnimationForKey(key) {
        this._removeAnimationForKey(key);
    }
    _removeAnimationForKey(key) {
        this.obj.removeAnimationForKey(key);
    }
    removeAllAnimation() {
        this._removeAllAnimation();
    }
    _removeAllAnimation() {
        this.obj.removeAllAnimation();
    }
    getRect(callback) {
        this.obj.getRect((rect) => {
            callback.call(this, rect);
        });
    }
    hide() {
    }
    show() {
    }
}

const { Document: _Document } = __hummer__;
let __view_id = 0;
class HummerElement extends Element {
    constructor(tag, name = tag, props) {
        super(tag, name, props);
        this.__scopedIds = new Set();
        this.__NAME = null;
        this.__view_id = 0;
        this.dataset = {};
        this.__defaultStyle = {};
        this.__style = {};
        this.__baseStyle = {};
        this._enabled = null;
        this.bindEventTarget();
        this.__view_id = __view_id;
        this.globalProxy = _Document.tenon.globalProxy;
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(enabled) {
        this._enabled = enabled;
        super.setEnable(this._enabled);
    }
    get disabled() {
        return !this._enabled;
    }
    set disabled(disabled) {
        this._enabled = !disabled;
        super.setEnable(this.enabled);
    }
    get className() {
        return this._getAttribute('class');
    }
    get style() {
        return this.getStyle || {};
    }
    set style(value) {
        this.setStyle(value, false);
    }
    setStyle(value, flag = false) {
        if (this.globalProxy) {
            this.globalProxy.setStyle(this, value, flag);
        }
        else {
            super.setStyle(value, false);
        }
    }
    setScopeId(id) {
        this.__scopedIds.add(id);
        this.updateStyle();
    }
    updateStyle() {
        let className = this._getAttribute('class');
        this.updateClassStyle(className);
    }
    updateClassStyle(className) {
        if (this.globalProxy) {
            this.globalProxy.updateClassStyle(this, className);
        }
    }
    handleAnimation(animation) {
        this.setAnimation(animation);
    }
    setAnimation(animation) {
        if (this.globalProxy) {
            this.globalProxy.handleAnimation(this, animation);
        }
        else {
            super.addAnimation(animation);
        }
    }
    setElementText(text) {
    }
    getAttribute(key) {
        switch (key) {
            case 'disabled':
                return this.disabled;
            default:
                return this._getAttribute(key);
        }
    }
    setAttribute(key, value) {
        this.setCacheProp(key, value);
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
    setCacheProp(key, value) {
        if (/^data/.test(key)) {
            let dataKey = key.slice(4).toLowerCase();
            if (dataKey) {
                this.dataset[dataKey] = value;
            }
        }
        this.props.set(key, value);
    }
    onHandleRecieveEvent(event) {
        if (this.globalProxy) {
            return this.globalProxy.onHandleRecieveEvent(this, event);
        }
        return super.onHandleRecieveEvent(event);
    }
}

__hummer__;
class BasicAnimation {
}

__hummer__;
class KeyframeAnimation {
}

__hummer__;
class View extends HummerElement {
    constructor(id = "", name = "", props) {
        super("View", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._overflow = "visible";
    }
    set overflow(value) {
        this._overflow = value;
        this.setAttribute("overflow", value);
    }
    get overflow() {
        return this._overflow;
    }
}

__hummer__;
class Text extends HummerElement {
    constructor(id="", name = "", props) {
        super("View", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._text = "";
        this._richText = "";
        this._textCopyEnable = false;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this._setAttribute("text", value);
    }
    get richText() {
        return this._richText;
    }
    set richText(value) {
        this._richText = value;
        this._setAttribute("richText", value);
    }
    get textCopyEnable() {
        return this._textCopyEnable;
    }
    set textCopyEnable(value) {
        this._textCopyEnable = value;
        this._setAttribute("textCopyEnable", value);
    }
}

__hummer__;
class Iamge extends HummerElement {
    constructor(id, name = "", props) {
        super("Image", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._src = "";
        this._gifSrc = "";
        this._gifRepeatCount = 0;
    }
    get src() {
        return this._src;
    }
    set src(value) {
        this._src = value;
        this._setAttribute("src", value);
    }
    get gifSrc() {
        return this._gifSrc;
    }
    set gifSrc(value) {
        this._gifSrc = value;
        this._setAttribute("gifSrc", value);
    }
    get gifRepeatCount() {
        return this._gifRepeatCount;
    }
    set gifRepeatCount(value) {
        this._gifRepeatCount = value;
        this._setAttribute("gifRepeatCount", value);
    }
    load(src, listener) {
        this.call("load", src, listener);
    }
}

__hummer__;
class HummerComponent extends EventTarget {
    constructor(tag, props) {
        super(tag, true, props);
    }
}

__hummer__;
class Memory extends HummerComponent {
    constructor(props = {}) {
        super("Memory", props);
    }
    static newInstance() {
        return new Memory();
    }
    static checkInstance() {
        if (!Memory.instance) {
            Memory.instance = Memory.newInstance();
        }
    }
    static set(key, value) {
        Memory.checkInstance();
        Memory.instance.set(key, value);
    }
    static get(key) {
        Memory.checkInstance();
        return Memory.instance.get(key);
    }
    static remove(key) {
        Memory.checkInstance();
        Memory.instance.remove(key);
    }
    static removeAll() {
        Memory.checkInstance();
        Memory.instance.removeAll();
    }
    static exist(key) {
        Memory.checkInstance();
        return Memory.instance.exist(key);
    }
    set(key, value) {
        this.call("set", key, value);
    }
    get(key) {
        return this.call("get", key);
    }
    remove(key) {
        this.call("remove", key);
    }
    removeAll() {
        this.call("removeAll");
    }
    exist(key) {
        let value = this.call("exist", key);
        return value;
    }
}

__hummer__;
class Navigator extends HummerComponent {
    constructor(props = {}) {
        super("Navigator", props);
    }
    static newInstance() {
        return new Navigator();
    }
    static checkInstance() {
        if (!Navigator.instance) {
            Navigator.instance = Navigator.newInstance();
        }
    }
    static openPage(pageInfo, callback) {
        Navigator.checkInstance();
        Navigator.instance.openPage(pageInfo, callback);
    }
    static popPage(pageInfo) {
        Navigator.checkInstance();
        Navigator.instance.popPage(pageInfo);
    }
    static popToPage(pageInfo) {
        Navigator.checkInstance();
        Navigator.instance.popToPage(pageInfo);
    }
    static popToRootPage(pageInfo) {
        Navigator.checkInstance();
        Navigator.instance.popToRootPage(pageInfo);
    }
    static popBack(count, pageInfo) {
        Navigator.checkInstance();
        Navigator.instance.popBack(count, pageInfo);
    }
    openPage(pageInfo, callback) {
        this.call("openPage", pageInfo, callback);
    }
    popPage(pageInfo) {
        this.call("popPage", pageInfo);
    }
    popToPage(pageInfo) {
        this.call("popToPage", pageInfo);
    }
    popToRootPage(pageInfo) {
        this.call("popToRootPage", pageInfo);
    }
    popBack(count, pageInfo) {
        this.call("popBack", count, pageInfo);
    }
}

__hummer__;
class Storage extends HummerComponent {
    constructor(props = {}) {
        super("Storage", props);
    }
    static newInstance() {
        return new Storage();
    }
    static checkInstance() {
        if (!Storage.instance) {
            Storage.instance = Storage.newInstance();
        }
    }
    static set(key, value) {
        Storage.checkInstance();
        Storage.instance.set(key, value);
    }
    static get(key) {
        Storage.checkInstance();
        return Storage.instance.get(key);
    }
    static remove(key) {
        Storage.checkInstance();
        Storage.instance.remove(key);
    }
    static removeAll() {
        Storage.checkInstance();
        Storage.instance.removeAll();
    }
    static exist(key) {
        Storage.checkInstance();
        return Storage.instance.exist(key);
    }
    set(key, value) {
        this.call("set", key, value);
    }
    get(key) {
        return this.call("get", key);
    }
    remove(key) {
        this.call("remove", key);
    }
    removeAll() {
        this.call("removeAll");
    }
    exist(key) {
        let value = this.call("exist", key);
        return value;
    }
}

exports.BasicAnimation = BasicAnimation;
exports.Document = Document;
exports.Element = Element;
exports.EventTarget = EventTarget;
exports.HMObject = HMObject;
exports.HummerComponent = HummerComponent;
exports.HummerElement = HummerElement;
exports.Iamge = Iamge;
exports.KeyframeAnimation = KeyframeAnimation;
exports.Memory = Memory;
exports.Navigator = Navigator;
exports.Node = Node;
exports.Storage = Storage;
exports.Text = Text;
exports.View = View;
//# sourceMappingURL=hummer-api.cjs.js.map
