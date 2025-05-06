'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const { document: _Document_$1 } = __Hummer__;
class HMObject {
    constructor(tag, isApi = true, props) {
        this.tag = tag;
        this.name = tag;
        this.isApi = isApi;
        this.__props__ = props;
        if (isApi) {
            this.__obj__ = _Document_$1.createComponent(tag, props);
            this.__obj__.__shadow__ = this;
        }
        else {
            this.__obj__ = _Document_$1.createElement(tag, props);
            this.__obj__.__shadow__ = this;
        }
    }
    static getShadowObject(obj) {
        if (obj && obj.__shadow__) {
            return obj.__shadow__;
        }
        return undefined;
    }
    static getOriginObject(obj) {
        if (obj && obj.__obj__) {
            return obj.__obj__;
        }
    }
    getThis() {
        return this.__obj__;
    }
    getOriginObject() {
        return this.__obj__;
    }
    getCreateProps() {
        return this.__props__;
    }
    call(methodName, ...args) {
        return this.__obj__.invoke(methodName, ...args);
    }
}

class EventTarget extends HMObject {
    constructor(tag, isApi = true, props) {
        super(tag, isApi, props);
        this.__enventListenerMap__ = new Map();
    }
    onReceiveEvent(eventName, event) {
        event = this.onHandleReceiveEvent(eventName, event);
        this.dispatchEvent(eventName, event);
    }
    onHandleReceiveEvent(eventName, event) {
        return event;
    }
    bindEventTarget() {
        this.getOriginObject().setEventTarget((eventName, event) => {
            this.onReceiveEvent(eventName, event);
        });
    }
    dispatchEvent(eventName, event) {
        var listeners = this.__enventListenerMap__.get(eventName);
        if (listeners != undefined) {
            listeners.forEach((lisener => {
                if (lisener instanceof Function) {
                    lisener.call(this, event);
                }
                else {
                    lisener.onEvent(event);
                }
            }));
        }
    }
    addEventListener(eventName, eventListener, useCapture) {
        var listeners = this.__enventListenerMap__.get(eventName);
        if (listeners == undefined) {
            listeners = new Array();
            this.__enventListenerMap__.set(eventName, listeners);
        }
        listeners.push(eventListener);
        this._addEventListener_(eventName);
    }
    _addEventListener_(eventName) {
        this.getOriginObject().addEventListener(eventName);
    }
    removeEventListener(eventName, eventListener, useCapture) {
        var listeners = this.__enventListenerMap__.get(eventName);
        if (listeners != undefined) {
            if (eventListener == undefined) {
                listeners.splice(0, listeners.length);
                this.__enventListenerMap__.delete(eventName);
                this._removeEventListener_(eventName);
            }
            else {
                const index = listeners.indexOf(eventListener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
                if (listeners.length == 0) {
                    this.__enventListenerMap__.delete(eventName);
                    this._removeEventListener_(eventName);
                }
            }
        }
    }
    _removeEventListener_(eventName) {
        this.getOriginObject().removeEventListener(eventName);
    }
}

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
    _onMounted_() {
        this.onMounted();
    }
    onMounted() {
    }
    _onDestoryed_() {
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
        if (!child) {
            return;
        }
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
        this._appendChild_(child);
        child._onMounted_();
    }
    _appendChild_(child) {
        this.getOriginObject().appendChild(child.getOriginObject());
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
        if (!child) {
            return;
        }
        child._onDestoryed_();
        child.unlinkSiblings();
        child.parentNode = undefined;
        this.children.delete(child);
        this._removeChild_(child);
    }
    _removeChild_(child) {
        this.getOriginObject().removeChild(child.getOriginObject());
    }
    insertBefore(child, anchor) {
        if (!child || !anchor) {
            return;
        }
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
        this._insertBefore_(child, anchor);
        child._onMounted_();
    }
    _insertBefore_(child, anchor) {
        this.getOriginObject().insertBefore(child.getOriginObject(), anchor.getOriginObject());
    }
    replaceChild(newNode, oldNode) {
        if (!newNode || !oldNode) {
            return;
        }
        oldNode._onDestoryed_();
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
        this._replaceChild_(newNode, oldNode);
        newNode._onMounted_();
    }
    _replaceChild_(newNode, oldNode) {
        this.getOriginObject().replaceChild(newNode.getOriginObject(), oldNode.getOriginObject());
    }
    removeAll() {
        this.children.forEach(child => {
            child._onDestoryed_();
            child.unlinkSiblings();
            child.parentNode = undefined;
        });
        this.children.clear();
        this._removeAll_();
    }
    _removeAll_() {
        this.getOriginObject().removeAll();
    }
}

const AnimationStartName = "__onAnimationStart__";
const AnimationEndName = "__onAnimationEnd__";
class Element extends Node {
    constructor(tag, name = tag, props = undefined) {
        super(tag, name, props);
        this._attributes = {};
        this._style = {};
        this._animationMap = new Map();
    }
    setAttribute(key, value) {
        this._setAttribute(key, value);
    }
    _setAttribute(key, value, update = true) {
        this._attributes[key] = value;
        if (update) {
            this.getOriginObject().setAttributes({ [key]: value });
        }
    }
    _removeAttribute(key) {
        delete this._attributes[key];
    }
    _initAttributes(attribute) {
        this._attributes = attribute || {};
        this.getOriginObject().setAttributes(attribute);
    }
    _setAttributes(attribute) {
        this._attributes = Object.assign(Object.assign({}, this._attributes), attribute);
        this.getOriginObject().setAttributes(attribute);
    }
    getAttribute(key) {
        return this._getAttribute(key);
    }
    _getAttribute(key) {
        return this._attributes[key];
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
        let newStyle = {};
        if (style.margin !== undefined) {
            newStyle.marginLeft = style.margin;
            newStyle.marginTop = style.margin;
            newStyle.marginRight = style.margin;
            newStyle.marginBottom = style.margin;
        }
        if (style.padding !== undefined) {
            newStyle.paddingLeft = style.padding;
            newStyle.paddingTop = style.padding;
            newStyle.paddingRight = style.padding;
            newStyle.paddingBottom = style.padding;
        }
        if (style.borderStyle !== undefined) {
            newStyle.borderLeftStyle = style.borderStyle;
            newStyle.borderTopStyle = style.borderStyle;
            newStyle.borderRightStyle = style.borderStyle;
            newStyle.borderBottomStyle = style.borderStyle;
        }
        if (style.borderColor !== undefined) {
            newStyle.borderLeftColor = style.borderColor;
            newStyle.borderTopColor = style.borderColor;
            newStyle.borderRightColor = style.borderColor;
            newStyle.borderBottomColor = style.borderColor;
        }
        if (style.borderWidth !== undefined) {
            newStyle.borderLeftWidth = style.borderWidth;
            newStyle.borderTopWidth = style.borderWidth;
            newStyle.borderRightWidth = style.borderWidth;
            newStyle.borderBottomWidth = style.borderWidth;
        }
        if (style.borderRadius !== undefined) {
            newStyle.borderTopLeftRadius = style.borderRadius;
            newStyle.borderTopRightRadius = style.borderRadius;
            newStyle.borderBottomLeftRadius = style.borderRadius;
            newStyle.borderBottomRightRadius = style.borderRadius;
        }
        this._style = Object.assign(Object.assign({}, newStyle), style);
        this.getOriginObject().setStyles(this._style);
    }
    getStyle() {
        return this._style || {};
    }
    addAnimation(animation, key = "") {
        if (animation) {
            this._addAnimation(animation, key);
        }
    }
    _addAnimation(animation, key = "__default__") {
        let lastAnim = this._animationMap.get(key);
        if (lastAnim) {
            this.removeEventListener(AnimationStartName, lastAnim.startCallback);
            this.removeEventListener(AnimationEndName, lastAnim.endCallback);
        }
        this.addEventListener(AnimationStartName, animation.startCallback);
        this.addEventListener(AnimationEndName, animation.endCallback);
        animation.key = key;
        this._animationMap && this._animationMap.set(key, animation);
        this.getOriginObject().addAnimation(animation, key);
    }
    removeAnimationForKey(key) {
        this._removeAnimationForKey(key);
    }
    _removeAnimationForKey(key) {
        let lastAnim = this._animationMap.get(key);
        if (lastAnim) {
            this.removeEventListener(AnimationStartName, lastAnim.startCallback);
            this.removeEventListener(AnimationEndName, lastAnim.endCallback);
        }
        this._animationMap.delete(key);
        this.getOriginObject().removeAnimationForKey(key);
    }
    removeAllAnimation() {
        this._removeAllAnimation();
    }
    _removeAllAnimation() {
        this.removeEventListener(AnimationStartName);
        this.removeEventListener(AnimationEndName);
        this._animationMap.clear();
        this.getOriginObject().removeAllAnimation();
    }
    getRect(callback) {
        this.getOriginObject().getRect((rect) => {
            callback.call(this, rect);
        });
    }
    dbg_getDescription(callback, id) {
    }
}

const FixedViewCache = new Map();
const handleFixedNodeByStyle = (node, newStyle) => {
    let oldPosition = node.style && node.style.position;
    let newPosition = newStyle && newStyle.position;
    if (newPosition === 'fixed') {
        registerFixedNode(node);
        return true;
    }
    if (oldPosition === 'fixed' && newPosition !== 'fixed') {
        unRegisterFixedNode(node);
        return false;
    }
    return false;
};
const registerFixedNode = (node) => {
    let fixedNode = {
        node,
        parents: node.parentNode ? getParentIds(node) : null
    };
    FixedViewCache.set(node.__view_id, fixedNode);
};
const unRegisterFixedNode = (node) => {
    let { __view_id: id } = node;
    FixedViewCache.delete(id);
};
const removeChildWithFixed = (node) => {
    let { __view_id } = node;
    FixedViewCache.forEach((fixedNode) => {
        let { node: iNode, parents } = fixedNode;
        if (fixedNode.parents === null) {
            parents = fixedNode.parents = getParentIds(iNode);
        }
        if (parents && parents.has(__view_id)) {
            deleteNode(iNode);
        }
        if (node === iNode) {
            FixedViewCache.delete(__view_id);
        }
    });
};
function getParentIds(node) {
    let ids = new Set();
    let iNode = node;
    while (iNode) {
        if (iNode.parentNode) {
            ids.add(iNode.parentNode.__view_id);
        }
        iNode = iNode.parentNode;
    }
    return ids;
}
function deleteNode(node) {
    let { __view_id } = node;
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
    FixedViewCache.delete(__view_id);
}

let __view_id = 0;
class HummerElement extends Element {
    constructor(tag, name = tag, props) {
        super(tag, name, props);
        this.__scopedIds = new Set();
        this.__NAME = null;
        this.__view_id = 0;
        this.dataset = {};
        this.viewId = "";
        this.__defaultStyle = {};
        this.__style = {};
        this.__baseStyle = {};
        this.__propsVue__ = new Map();
        this.globalProxy = undefined;
        this.bindEventTarget();
        this.__view_id = ++__view_id;
        this.viewId = props.viewId;
        this.globalProxy = this.getProxy();
        this.initialize();
    }
    initialize() {
    }
    getProxy() {
        if (__Hummer__ && __Hummer__.__globalProxy__) {
            return __Hummer__.__globalProxy__;
        }
        return undefined;
    }
    get enabled() {
        return super.getEnable();
    }
    set enabled(enabled) {
        super.setEnable(enabled);
    }
    get disabled() {
        return !this.getEnable();
    }
    set disabled(disabled) {
        if (typeof disabled === 'boolean') {
            super.setEnable(!disabled);
        }
    }
    get className() {
        return this._getAttribute('class');
    }
    get style() {
        return this.getStyle() || {};
    }
    set style(value) {
        this.setStyle(value, false);
    }
    setStyle(value, flag = false) {
        if (this.globalProxy) {
            this.globalProxy.setStyle(this, value, flag);
        }
        else {
            this.superSetStyle(value, false);
        }
    }
    onDestoryed() {
        removeChildWithFixed(this);
    }
    superSetStyle(value, flag = false) {
        handleFixedNodeByStyle(this, value);
        super.setStyle(value, false);
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
    empty() {
        this.call("empty");
    }
    get props() {
        return this.__propsVue__;
    }
    setCacheProp(key, value) {
        if (/^data/.test(key)) {
            let dataKey = key.slice(4).toLowerCase();
            if (dataKey) {
                this.dataset[dataKey] = value;
            }
        }
        this.__propsVue__.set(key, value);
    }
    onHandleReceiveEvent(eventName, event) {
        if (this.globalProxy) {
            return this.globalProxy.onHandleReceiveEvent(this, event);
        }
        return super.onHandleReceiveEvent(eventName, event);
    }
    addEventListener(eventName, eventListener, useCapture) {
        super.addEventListener(eventName, eventListener, useCapture);
    }
    getElementById(id) {
        return this.findElementById(id);
    }
    findElementById(id) {
        if (id == "") {
            return undefined;
        }
        if (this.viewId == id) {
            return this;
        }
        let result = undefined;
        let childNode = this.firstChild ? this.firstChild : undefined;
        while (childNode) {
            let target = childNode.findElementById(id);
            if (target) {
                result = target;
                childNode = undefined;
            }
            else {
                childNode = childNode.nextSibling ? childNode.nextSibling : undefined;
            }
        }
        return result;
    }
}

__Hummer__;
class LifeCycleElement extends HummerElement {
    constructor(tag, name = tag, props) {
        super(tag, name, props);
    }
    dispatchEvent(eventName, event) {
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
        super.dispatchEvent(eventName, event);
    }
    onCreate(e) {
    }
    onAppear() {
    }
    onDisappear() {
    }
    onDestroy() {
    }
    onBack() {
    }
    get canGoBack() {
        return this._getAttribute('canGoBack');
    }
    set canGoBack(canGoBack) {
        this._setAttribute('canGoBack', canGoBack);
    }
}

class View extends LifeCycleElement {
    constructor(id = "", name = "", props = {}) {
        super("View", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._initAttributes({
            overflow: 'visible'
        });
    }
    set style(value) {
        this.setStyle(value, false);
    }
    get style() {
        return this.getStyle() || {};
    }
    set overflow(value) {
        this._setAttribute("overflow", value);
    }
    get overflow() {
        return this._getAttribute('overflow');
    }
}

class Anchor extends View {
    constructor(id = "", name = "", props = {}) {
        super(id, name, props);
        this.setStyle({
            display: "none"
        });
    }
}

class Button extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Button", name, Object.assign(Object.assign({}, props), { viewId: id }));
    }
    set style(value) {
        this.setStyle(value, false);
    }
    get style() {
        return this.getStyle() || {};
    }
    get text() {
        return this._getAttribute("text");
    }
    set text(value) {
        this._setAttribute("text", value);
    }
    get pressed() {
        return this._getAttribute("pressed");
    }
    set pressed(value) {
        this._setAttribute("pressed", value);
    }
    setElementText(text) {
        this.text = text;
    }
    get disabled() {
        return this._getAttribute("disabled");
    }
    set disabled(value) {
        if (typeof value === "boolean") {
            super.disabled = value;
        }
        else {
            this._setAttribute("disabled", value);
        }
    }
    setAttribute(key, value) {
        switch (key) {
            case 'disabled':
                if (typeof value === "boolean") {
                    super.disabled = value;
                }
                else {
                    this._setAttribute("disabled", value);
                }
                return;
        }
        super.setAttribute(key, value);
    }
}

class Canvas extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Canvas", name, Object.assign(Object.assign({}, props), { viewId: id }));
    }
    lineWidth(widthValue) {
        this.call("lineWidth", widthValue);
    }
    lineColor(colorHex) {
        this.call("lineColor", colorHex);
    }
    lineCap(value) {
        this.call("lineCap", value);
    }
    lineJoin(value) {
        this.call("lineJoin", value);
    }
    drawLine(fraomX, fromY, toX, toY) {
        this.call("drawLine", fraomX, fromY, toX, toY);
    }
    strokeRect(x, y, w, h) {
        this.call("strokeRect", x, y, w, h);
    }
    strokeEllipse(x, y, trailX, trailY) {
        this.call("strokeEllipse", x, y, trailX, trailY);
    }
    strokeCircle(x, y, radius) {
        this.call("strokeCircle", x, y, radius);
    }
    arc(x, y, radius, startAngle, endAngle, clockwise) {
        this.call("arc", x, y, radius, startAngle, endAngle, clockwise);
    }
    fillColor(colorHex) {
        this.call("fillColor", colorHex);
    }
    fillRect(x, y, w, h) {
        this.call("fillRect", x, y, w, h);
    }
    fillEllipse(x, y, trailX, trailY) {
        this.call("fillEllipse", x, y, trailX, trailY);
    }
    fillCircle(x, y, radius) {
        this.call("fillCircle", x, y, radius);
    }
    fontSize(size) {
        this.call("fontSize", size);
    }
    textColor(colorHex) {
        this.call("textColor", colorHex);
    }
    fillText(text, x, y, maxWidth) {
        this.call("fillText", text, x, y, maxWidth);
    }
    drawImage(src, x, y, width, height) {
        this.call("drawImage", src, x, y, width, height);
    }
}

class Text extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Text", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._initAttributes({
            textCopyEnable: false
        });
    }
    set style(value) {
        this.setStyle(value, false);
    }
    get style() {
        return this.getStyle() || {};
    }
    get text() {
        return this._getAttribute('text');
    }
    set text(value) {
        this._setAttribute("text", value);
    }
    setElementText(text) {
        this.text = text;
    }
    get richText() {
        return this._getAttribute('richText');
    }
    set richText(value) {
        this._setAttribute("richText", value);
    }
    get textCopyEnable() {
        return this._getAttribute('textCopyEnable');
    }
    set textCopyEnable(value) {
        this._setAttribute("textCopyEnable", value);
    }
}

class Image extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Image", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._initAttributes({
            gifRepeatCount: 0
        });
        this.addEventListener("__onImageLoad__", (event) => {
            this.onImageOnLoad(event);
        });
    }
    set style(value) {
        this.setStyle(value, false);
    }
    get style() {
        return this.getStyle() || {};
    }
    get src() {
        return this._getAttribute("src");
    }
    set src(value) {
        this._setAttribute("src", value);
        this._removeAttribute("gifSrc");
    }
    get gifSrc() {
        return this._getAttribute("gifSrc");
    }
    set gifSrc(value) {
        this._setAttribute("gifSrc", value);
        this._removeAttribute("src");
    }
    get gifRepeatCount() {
        return this._getAttribute("gifRepeatCount");
    }
    set gifRepeatCount(value) {
        this._setAttribute("gifRepeatCount", value);
    }
    get failedImage() {
        return this._getAttribute("failedImage");
    }
    set failedImage(value) {
        this._setAttribute("failedImage", value);
    }
    get placeholder() {
        return this._getAttribute("placeholder");
    }
    set placeholder(value) {
        this._setAttribute("placeholder", value);
    }
    get onLoad() {
        return this._onLoad;
    }
    set onLoad(value) {
        this._onLoad = value;
    }
    onImageOnLoad(event) {
        if (this._onLoad) {
            let isSuccess = false;
            if (event.state === 0) {
                isSuccess = true;
            }
            this._onLoad(event.srcType, isSuccess);
        }
    }
    load(source, callback) {
        if (typeof source === 'string') {
            this._setAttribute("src", source);
            this._removeAttribute("gifSrc");
        }
        else {
            this._setAttribute("src", source.src);
            this._removeAttribute("gifSrc");
            if (!source.gifSrc && source.gifSrc !== "") {
                this._setAttribute("gifSrc", source.gifSrc);
                this._removeAttribute("src");
            }
            if (source.placeholder) {
                this._setAttribute("placeholder", source.placeholder);
            }
            if (source.failedImage) {
                this._setAttribute("failedImage", source.failedImage);
            }
            if (source.gifRepeatCount) {
                this._setAttribute("gifRepeatCount", source.gifRepeatCount);
            }
        }
        this._onLoad = callback;
    }
    setAttribute(key, value) {
        switch (key) {
            case 'src':
                this.src = value;
                return;
            case 'gifSrc':
                this.gifSrc = value;
                return;
        }
        super.setAttribute(key, value);
    }
    addEventListener(eventName, eventListener, useCapture) {
        super.addEventListener(eventName, eventListener, useCapture);
    }
}

class Input extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Input", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this.addEventListener('input', (event) => {
            this._setAttribute("text", event.text, false);
        });
    }
    set style(value) {
        this.setStyle(value, false);
    }
    get style() {
        return this.getStyle() || {};
    }
    get text() {
        return this._getAttribute("text");
    }
    set text(value) {
        this._setAttribute("text", value);
    }
    get placeholder() {
        return this._getAttribute("placeholder");
    }
    set placeholder(value) {
        this._setAttribute("placeholder", value);
    }
    get focused() {
        return this._getAttribute("focused");
    }
    set focused(value) {
        this._setAttribute("focused", value);
    }
    addEventListener(eventName, eventListener, useCapture) {
        super.addEventListener(eventName, eventListener, useCapture);
    }
}

exports.ListEventState = void 0;
(function (ListEventState) {
    ListEventState[ListEventState["normal"] = 0] = "normal";
    ListEventState[ListEventState["beganDrag"] = 1] = "beganDrag";
    ListEventState[ListEventState["scroll"] = 2] = "scroll";
    ListEventState[ListEventState["stop"] = 3] = "stop";
    ListEventState[ListEventState["endDrag"] = 4] = "endDrag";
})(exports.ListEventState || (exports.ListEventState = {}));
class List extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("List", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._onRegister = undefined;
        this._onCreate = undefined;
        this._onUpdate = undefined;
        this._onRefresh = undefined;
        this._onLoadMore = undefined;
        this.addEventListener("onRegister", (event) => {
            this.onDispatch("onRegister", event);
        });
        this.addEventListener("onCreate", (event) => {
            this.onDispatch("onCreate", event);
        });
        this.addEventListener("onUpdate", (event) => {
            this.onDispatch("onUpdate", event);
        });
        this.addEventListener("onRefresh", (event) => {
            this.onDispatch("onRefresh", event);
        });
        this.addEventListener("onLoadMore", (event) => {
            this.onDispatch("onLoadMore", event);
        });
    }
    set style(value) {
        this.setStyle(value, false);
    }
    get style() {
        return this.getStyle() || {};
    }
    onDispatch(type, event, cell) {
        switch (type) {
            case "onRegister":
                if (this._onRegister) {
                    this._onRegister(event);
                }
                break;
            case "onCreate":
                if (this._onCreate) {
                    this._onCreate(event);
                }
                break;
            case "onUpdate":
                if (this._onUpdate) {
                    this._onUpdate(event, cell);
                }
                break;
            case "onRefresh":
                if (this._onRefresh) {
                    this._onRefresh(event.state);
                }
                break;
            case "onLoadMore":
                if (this._onLoadMore) {
                    this._onLoadMore(event.state);
                }
                break;
        }
    }
    get onRegister() {
        return this._getAttribute("onRegister");
    }
    set onRegister(value) {
        this._setAttribute("onRegister", value);
        this._onRegister = value;
    }
    get onCreate() {
        return this._getAttribute("onCreate");
    }
    set onCreate(value) {
        let _onCreate = (type) => {
            return value(type).getOriginObject();
        };
        this._setAttribute("onCreate", _onCreate);
        this._onCreate = value;
    }
    get onUpdate() {
        return this._getAttribute("onUpdate");
    }
    set onUpdate(value) {
        this._setAttribute("onUpdate", value);
        this._onUpdate = value;
    }
    get refreshView() {
        return this._getAttribute("refreshView");
    }
    set refreshView(value) {
        this._setAttribute("refreshView", value.getOriginObject());
    }
    get loadMoreView() {
        return this._getAttribute("loadMoreView");
    }
    set loadMoreView(value) {
        this._setAttribute("loadMoreView", value.getOriginObject());
    }
    get onRefresh() {
        return this._getAttribute("onRefresh");
    }
    set onRefresh(value) {
        this._setAttribute("onRefresh", value);
        this._onRefresh = value;
    }
    get onLoadMore() {
        return this._getAttribute("onLoadMore");
    }
    set onLoadMore(value) {
        this._setAttribute("onLoadMore", value);
        this._onLoadMore = value;
    }
    get showScrollBar() {
        return this._getAttribute("showScrollBar");
    }
    set showScrollBar(value) {
        this._setAttribute("showScrollBar", value);
    }
    get bounces() {
        return this._getAttribute("bounces");
    }
    set bounces(value) {
        this._setAttribute("bounces", value);
    }
    refresh(count) {
        this.call("refresh", count);
    }
    scrollToPosition(position) {
        this.call("scrollToPosition", position);
    }
    scrollTo(x, y) {
        this.call("scrollTo", x, y);
    }
    scrollBy(dx, dy) {
        this.call("scrollBy", dx, dy);
    }
    stopPullRefresh() {
        this.call("stopPullRefresh");
    }
    stopLoadMore(enable) {
        this.call("stopLoadMore", enable);
    }
    addEventListener(eventName, eventListener, useCapture) {
        super.addEventListener(eventName, eventListener, useCapture);
    }
}

class ViewPager extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("ViewPager", name, Object.assign(Object.assign({}, props), { viewId: id }));
    }
    set style(value) {
        this.setStyle(value, false);
    }
    get style() {
        return this.getStyle() || {};
    }
    get data() {
        return this._getAttribute("data");
    }
    set data(value) {
        this._setAttribute("data", value);
    }
    setCurrentItem(position) {
        this.call("setCurrentItem", position);
    }
    onPageChange(callback) {
        this.call("onPageChange", callback);
    }
    onItemClick(callback) {
        this.call("onItemClick", callback);
    }
    onItemView(callback) {
        this.call("onItemView", (position, view) => {
            let thisElement = HMObject.getShadowObject(view);
            let element = callback(position, thisElement);
            return element && element.getOriginObject() || null;
        });
    }
}

class Refresh extends View {
    constructor(id = "", name = "", props = {}) {
        super("View", name, Object.assign(Object.assign({}, props), { viewId: id }));
    }
}

class LoadMore extends View {
    constructor(id = "", name = "", props = {}) {
        super("View", name, Object.assign(Object.assign({}, props), { viewId: id }));
    }
}

exports.ScrollEventState = void 0;
(function (ScrollEventState) {
    ScrollEventState[ScrollEventState["normal"] = 0] = "normal";
    ScrollEventState[ScrollEventState["beganDrag"] = 1] = "beganDrag";
    ScrollEventState[ScrollEventState["scroll"] = 2] = "scroll";
    ScrollEventState[ScrollEventState["stop"] = 3] = "stop";
    ScrollEventState[ScrollEventState["endDrag"] = 4] = "endDrag";
})(exports.ScrollEventState || (exports.ScrollEventState = {}));
class Scroller extends LifeCycleElement {
    constructor(id = "", name = "", props = {}) {
        super("Scroller", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._onScrollTop = undefined;
        this._onScrollBottom = undefined;
        this._onRefresh = undefined;
        this._onLoadMore = undefined;
        this.addEventListener("onRefresh", (event) => {
            this.onDispatch("onRefresh", event);
        });
        this.addEventListener("onLoadMore", (event) => {
            this.onDispatch("onLoadMore", event);
        });
        this.addEventListener("onScrollTop", () => {
            this.onDispatch("onScrollTop");
        });
        this.addEventListener("onScrollBottom", () => {
            this.onDispatch("onScrollBottom");
        });
    }
    onDispatch(type, event) {
        switch (type) {
            case "onRefresh":
                if (this._onRefresh) {
                    this._onRefresh(event === null || event === void 0 ? void 0 : event.state, this);
                }
                break;
            case "onLoadMore":
                if (this._onLoadMore) {
                    this._onLoadMore(event === null || event === void 0 ? void 0 : event.state, this);
                }
                break;
            case "onScrollTop":
                if (this._onScrollTop) {
                    this._onScrollTop();
                }
                break;
            case "onScrollBottom":
                if (this._onScrollBottom) {
                    this._onScrollBottom();
                }
                break;
        }
    }
    get refreshView() {
        let view = this._getAttribute("refreshView");
        if (view) {
            return HMObject.getShadowObject(view);
        }
        return undefined;
    }
    set refreshView(value) {
        this._setAttribute("refreshView", value === null || value === void 0 ? void 0 : value.getOriginObject());
    }
    get loadMoreView() {
        let view = this._getAttribute("loadMoreView");
        if (view) {
            return HMObject.getShadowObject(view);
        }
        return undefined;
    }
    set loadMoreView(value) {
        this._setAttribute("loadMoreView", value === null || value === void 0 ? void 0 : value.getOriginObject());
    }
    get onLoadMore() {
        return this._getAttribute("onLoadMore");
    }
    set onLoadMore(value) {
        this._onLoadMore = value;
        this._setAttribute("onLoadMore", value);
    }
    get onRefresh() {
        return this._getAttribute("onRefresh");
    }
    set onRefresh(value) {
        this._onRefresh = value;
        this._setAttribute("onRefresh", value);
    }
    get bounces() {
        return this._getAttribute("bounces");
    }
    set bounces(value) {
        this._setAttribute("bounces", value);
    }
    get showScrollBar() {
        return this._getAttribute("showScrollBar");
    }
    set showScrollBar(value) {
        this._setAttribute("showScrollBar", value);
    }
    get enableLoadMore() {
        return this._getAttribute("enableLoadMore");
    }
    set enableLoadMore(value) {
        this._setAttribute("enableLoadMore", value);
    }
    get enableRefresh() {
        return this._getAttribute("enableRefresh");
    }
    set enableRefresh(value) {
        this._setAttribute("enableRefresh", value);
    }
    scrollTo(x, y) {
        this.call("scrollTo", x, y);
    }
    scrollBy(dx, dy) {
        this.call("scrollBy", dx, dy);
    }
    scrollToTop() {
        this.call("scrollToTop");
    }
    scrollToBottom() {
        this.call("scrollToBottom");
    }
    setOnScrollToTopListener(callback) {
        this._onScrollTop = callback;
    }
    setOnScrollToBottomListener(callback) {
        this._onScrollBottom = callback;
    }
    stopPullRefresh() {
        this.call("stopPullRefresh");
    }
    stopLoadMore(enable) {
        this.call("stopLoadMore", enable);
    }
    addEventListener(eventName, eventListener, useCapture) {
        switch (eventName) {
            case "refresh":
                this.onRefresh = eventListener;
                break;
            case "loadMore":
                this.onLoadMore = eventListener;
                break;
            case "scrollToTop":
                this.setOnScrollToTopListener(eventListener);
                break;
            case "scrollToBottom":
                this.setOnScrollToBottomListener(eventListener);
                break;
            default:
                super.addEventListener(eventName, eventListener, useCapture);
                break;
        }
    }
    insertBefore(child, anchor) {
        if (!child || !anchor) {
            return;
        }
        if (child instanceof Refresh) {
            this.refreshView = child;
        }
        else if (child instanceof LoadMore) {
            this.loadMoreView = child;
        }
        else {
            super.insertBefore(child, anchor);
        }
    }
    appendChild(child) {
        if (!child) {
            return;
        }
        if (child instanceof Refresh) {
            this.refreshView = child;
        }
        else if (child instanceof LoadMore) {
            this.loadMoreView = child;
        }
        else {
            super.appendChild(child);
        }
    }
}

class TextArea extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("TextArea", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._initAttributes({
            text: '',
            placeholder: '',
            focused: false
        });
        this.addEventListener('input', (event) => {
            this._setAttribute("text", event.text, false);
        });
    }
    set style(value) {
        this.setStyle(value, false);
    }
    get style() {
        return this.getStyle() || {};
    }
    get text() {
        return this._getAttribute('text');
    }
    set text(value) {
        this._setAttribute("text", value);
    }
    get placeholder() {
        return this._getAttribute('placeholder');
    }
    set placeholder(value) {
        this._setAttribute("placeholder", value);
    }
    get focused() {
        return this._getAttribute('focused');
    }
    set focused(value) {
        this._setAttribute("focused", value);
    }
}

class HummerComponent extends EventTarget {
    constructor(tag, props, viewType = true) {
        super(tag, true, Object.assign(Object.assign({}, props), { viewType: viewType }));
        this.bindEventTarget();
    }
}

const HUMMER$6 = __Hummer__;
class HummerApi extends HummerComponent {
    constructor(props = {}) {
        super("Hummer", props, false);
        this._rootElement = undefined;
    }
    static newInstance() {
        return new HummerApi();
    }
    static checkInstance() {
        if (!HUMMER$6.__hummerApi__) {
            HUMMER$6.__hummerApi__ = HummerApi.newInstance();
        }
    }
    static get instance() {
        return HUMMER$6.__hummerApi__;
    }
    static getEnv() {
        HummerApi.checkInstance();
        return HummerApi.instance.getEnv();
    }
    getEnv() {
        return this.call("getEnv");
    }
    static getPageInfo() {
        HummerApi.checkInstance();
        return HummerApi.instance.getPageInfo();
    }
    getPageInfo() {
        return this.call("getPageInfo");
    }
    static setPageResult(param) {
        HummerApi.checkInstance();
        return HummerApi.instance.setPageResult(param);
    }
    setPageResult(param) {
        return this.call("setPageResult", param);
    }
    static get rootElement() {
        HummerApi.checkInstance();
        return HummerApi.instance._rootElement;
    }
    static set rootElement(rootElement) {
        HummerApi.checkInstance();
        HummerApi.instance._rootElement = rootElement;
    }
}

const HUMMER$5 = __Hummer__;
class NotifyCenter extends HummerComponent {
    constructor(props = {}) {
        super("NotifyCenter", props);
    }
    static get instance() {
        if (!HUMMER$5.__notifyCenter__) {
            HUMMER$5.__notifyCenter__ = new NotifyCenter();
        }
        return HUMMER$5.__notifyCenter__;
    }
    static addEventListener(event, callback) {
        NotifyCenter.instance.addEventListener(event, callback);
    }
    static removeEventListener(event, callback) {
        if (!callback) {
            NotifyCenter.instance.call("removeAllEventListener", event);
        }
        else {
            NotifyCenter.instance.removeEventListener(event, callback);
        }
    }
    static triggerEvent(eventName, value) {
        let event = {
            type: eventName,
            state: 0,
            timestamp: new Date().getTime(),
            value: value,
        };
        NotifyCenter.instance.call("triggerEvent", eventName, event);
    }
    onHandleReceiveEvent(eventName, event) {
        if (event) {
            return event.value;
        }
        return undefined;
    }
}

class Loading extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Loading", name, Object.assign(Object.assign({}, props), { viewId: id }));
    }
}

class Switch extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Switch", name, Object.assign(Object.assign({}, props), { viewId: id }));
    }
    set style(value) {
        this.setStyle(value, false);
    }
    get style() {
        return this.getStyle() || {};
    }
    set checked(value) {
        this._setAttribute("checked", value);
    }
    get checked() {
        return this._getAttribute('checked');
    }
    addEventListener(eventName, eventListener, useCapture) {
        super.addEventListener(eventName, eventListener, useCapture);
    }
}

class HorizontalScroller extends LifeCycleElement {
    constructor(id = "", name = "", props = {}) {
        super("HorizontalScroller", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._onScrollTop = undefined;
        this._onScrollBottom = undefined;
        this.addEventListener("onScrollTop", () => {
            this.onDispatch("onScrollTop");
        });
        this.addEventListener("onScrollBottom", () => {
            this.onDispatch("onScrollBottom");
        });
    }
    onDispatch(type, event) {
        switch (type) {
            case "onScrollTop":
                if (this._onScrollTop) {
                    this._onScrollTop();
                }
                break;
            case "onScrollBottom":
                if (this._onScrollBottom) {
                    this._onScrollBottom();
                }
                break;
        }
    }
    get bounces() {
        return this._getAttribute("bounces");
    }
    set bounces(value) {
        this._setAttribute("bounces", value);
    }
    get showScrollBar() {
        return this._getAttribute("showScrollBar");
    }
    set showScrollBar(value) {
        this._setAttribute("showScrollBar", value);
    }
    scrollTo(x, y) {
        this.call("scrollTo", x, y);
    }
    scrollBy(dx, dy) {
        this.call("scrollBy", dx, dy);
    }
    scrollToTop() {
        this.call("scrollToTop");
    }
    scrollToBottom() {
        this.call("scrollToBottom");
    }
    setOnScrollToTopListener(callback) {
        this._onScrollTop = callback;
    }
    setOnScrollToBottomListener(callback) {
        this._onScrollBottom = callback;
    }
    updateContentSize() {
    }
    addEventListener(eventName, eventListener, useCapture) {
        super.addEventListener(eventName, eventListener, useCapture);
    }
}

const { document: _Document_ } = __Hummer__;
class Hummer {
    static get env() {
        return HummerApi.getEnv();
    }
    static get notifyCenter() {
        return NotifyCenter;
    }
    static get pageInfo() {
        return HummerApi.getPageInfo();
    }
    static set pageResult(param) {
        HummerApi.setPageResult(param);
    }
    static createElement(tag) {
        switch (tag) {
            case "anchor":
                return new Anchor();
            case "view":
                return new View();
            case "text":
                return new Text();
            case "image":
                return new Image();
            case "button":
                return new Button();
            case "canvas":
                return new Canvas();
            case "list":
                return new List();
            case "viewpager":
                return new ViewPager();
            case "scroller":
                return new Scroller();
            case "refresh":
                return new Refresh();
            case "loadmore":
                return new LoadMore();
            case "horizontalscroller":
                return new HorizontalScroller();
            case "switch":
                return new Switch();
            case "loadin":
                return new Loading();
            case "input":
                return new Input();
            case "textarea":
                return new TextArea();
        }
        return Hummer.createElementFromFactor(tag);
    }
    static createElementFromFactor(tag) {
        let factor = Hummer.__elementFactor__[tag];
        if (factor) {
            return factor();
        }
        return undefined;
    }
    static register(tag, factor) {
        Hummer.__elementFactor__[tag] = factor;
    }
    static render(element) {
        HummerApi.rootElement = element;
        _Document_.render(element.getOriginObject());
    }
    static getRootView() {
        return HummerApi.rootElement;
    }
}
Hummer.__elementFactor__ = {};

class BasicAnimation {
    constructor(property) {
        this.value = '';
        this.duration = 0;
        this.delay = 0;
        this.repeatCount = 1;
        this.easing = 'ease';
        this.key = '__default__';
        this.type = 'basic';
        this.property = 'position';
        this.__startFunc__ = undefined;
        this.__endFunc__ = undefined;
        this.__startCallback__ = (event) => {
            if (this.__startFunc__ && (event == undefined || event.key == this.key)) {
                this.__startFunc__();
            }
        };
        this.__endCallback__ = (event) => {
            if (this.__endFunc__ && (event == undefined || event.key == this.key)) {
                this.__endFunc__();
            }
        };
        this.property = property;
    }
    get startCallback() {
        return this.__startCallback__;
    }
    get endCallback() {
        return this.__endCallback__;
    }
    _setOnEventListener_(event, callback) {
        switch (event) {
            case 'start':
                this.__startFunc__ = callback;
                break;
            case 'end':
                this.__endFunc__ = callback;
                break;
        }
    }
    on(event, eventListener) {
        this._setOnEventListener_(event, eventListener);
    }
}

class KeyframeAnimation {
    constructor(property) {
        this.keyframes = [];
        this.duration = 0;
        this.delay = 0;
        this.repeatCount = 1;
        this.easing = 'ease';
        this.key = '__default__';
        this.type = 'keyframe';
        this.property = 'position';
        this.__startFunc__ = undefined;
        this.__endFunc__ = undefined;
        this.__startCallback__ = (event) => {
            if (this.__startFunc__ && (event == undefined || event.key == this.key)) {
                this.__startFunc__();
            }
        };
        this.__endCallback__ = (event) => {
            if (this.__endFunc__ && (event == undefined || event.key == this.key)) {
                this.__endFunc__();
            }
        };
        this.property = property;
    }
    get startCallback() {
        return this.__startCallback__;
    }
    get endCallback() {
        return this.__endCallback__;
    }
    _setOnEventListener_(event, callback) {
        switch (event) {
            case 'start':
                this.__startFunc__ = callback;
                break;
            case 'end':
                this.__endFunc__ = callback;
                break;
        }
    }
    on(event, eventListener) {
        this._setOnEventListener_(event, eventListener);
    }
}

class CanvasView extends Canvas {
    constructor(id = "", name = "", props = {}) {
        super(id, name, props);
    }
}

const HUMMER$4 = __Hummer__;
class Memory extends HummerComponent {
    constructor(props = {}) {
        super("Memory", props, false);
    }
    static get instance() {
        if (!HUMMER$4.__memory__) {
            HUMMER$4.__memory__ = new Memory();
        }
        return HUMMER$4.__memory__;
    }
    static set(key, value, cb) {
        Memory.instance.set(key, value, cb);
    }
    static get(key, cb) {
        return Memory.instance.get(key, cb);
    }
    static remove(key, cb) {
        Memory.instance.remove(key, cb);
    }
    static removeAll(cb) {
        Memory.instance.removeAll(cb);
    }
    static exist(key, cb) {
        return Memory.instance.exist(key, cb);
    }
    set(key, value, cb) {
        this.call("set", key, value, cb);
    }
    get(key, cb) {
        return this.call("get", key, cb);
    }
    remove(key, cb) {
        this.call("remove", key, cb);
    }
    removeAll(cb) {
        this.call("removeAll", cb);
    }
    exist(key, cb) {
        return this.call("exist", key, cb);
    }
}

const HUMMER$3 = __Hummer__;
class Dialog extends HummerComponent {
    constructor(props = {}) {
        super("Dialog", props);
        this._cancelable = true;
        this._lowLayer = false;
    }
    static newInstance() {
        return new Dialog();
    }
    static checkInstance() {
        if (!HUMMER$3.__dialog__) {
            HUMMER$3.__dialog__ = Dialog.newInstance();
        }
    }
    static get instance() {
        return HUMMER$3.__dialog__;
    }
    set cancelable(value) {
        this._cancelable = value;
        this.call("setCancelable", value);
    }
    set lowLayer(value) {
        this._lowLayer = value;
        this.call("setLowLayer", value);
    }
    static alert(msg, btnText, callback) {
        Dialog.checkInstance();
        Dialog.instance.alert(msg, btnText, callback);
    }
    static confirm(title, msg, okBtnText, cancelBtnText, okCallback, cancelCallback) {
        Dialog.checkInstance();
        Dialog.instance.confirm(title, msg, okBtnText, cancelBtnText, okCallback, cancelCallback);
    }
    static loading(msg) {
        Dialog.checkInstance();
        Dialog.instance.loading(msg);
    }
    static custom(view) {
        Dialog.checkInstance();
        Dialog.instance.custom(view);
    }
    static dismiss() {
        Dialog.checkInstance();
        Dialog.instance.dismiss();
    }
    alert(msg, btnText, callback) {
        this.call("alert", msg, btnText, callback);
    }
    confirm(title, msg, okBtnText, cancelBtnText, okCallback, cancelCallback) {
        this.call("confirm", title, msg, okBtnText, cancelBtnText, okCallback, cancelCallback);
    }
    loading(msg) {
        this.call("loading", msg);
    }
    custom(view) {
        this.call("custom", view.getOriginObject());
    }
    dismiss() {
        this.call("dismiss");
    }
}

const HUMMER$2 = __Hummer__;
class Toast extends HummerComponent {
    constructor(props = {}) {
        super("Toast", props);
    }
    static newInstance() {
        return new Toast();
    }
    static checkInstance() {
        if (!HUMMER$2.__toast__) {
            HUMMER$2.__toast__ = Toast.newInstance();
        }
    }
    static get instance() {
        return HUMMER$2.__toast__;
    }
    static show(msg, duration) {
        Toast.checkInstance();
        Toast.instance.show(msg, duration);
    }
    static custom(view, duration) {
        Toast.checkInstance();
        Toast.instance.custom(view.getOriginObject(), duration);
    }
    show(msg, duration) {
        this.call("show", msg, duration);
    }
    custom(view, duration) {
        this.call("custom", view, duration);
    }
}

const HUMMER$1 = __Hummer__;
class Navigator extends HummerComponent {
    constructor(props = {}) {
        super("Navigator", props);
    }
    static get instance() {
        if (!HUMMER$1.__navigator__) {
            HUMMER$1.__navigator__ = new Navigator();
        }
        return HUMMER$1.__navigator__;
    }
    static openPage(pageInfo, callback) {
        Navigator.instance.openPage(pageInfo, callback);
    }
    static popPage(pageInfo) {
        Navigator.instance.popPage(pageInfo);
    }
    static popToPage(pageInfo) {
        Navigator.instance.popToPage(pageInfo);
    }
    static popToRootPage(pageInfo) {
        Navigator.instance.popToRootPage(pageInfo);
    }
    static popBack(count, pageInfo) {
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

const HUMMER = __Hummer__;
class Storage extends HummerComponent {
    constructor(props = {}) {
        super("Storage", props, false);
    }
    static get instance() {
        if (!HUMMER.__storage__) {
            HUMMER.__storage__ = new Storage();
        }
        return HUMMER.__storage__;
    }
    static set(key, value, cb) {
        return Storage.instance.set(key, value, cb);
    }
    static get(key, cb) {
        return Storage.instance.get(key, cb);
    }
    static remove(key, cb) {
        return Storage.instance.remove(key, cb);
    }
    static removeAll(cb) {
        return Storage.instance.removeAll(cb);
    }
    static exist(key, cb) {
        return Storage.instance.exist(key, cb);
    }
    set(key, value, cb) {
        return this.call("set", key, value, cb);
    }
    get(key, cb) {
        return this.call("get", key, cb);
    }
    remove(key, cb) {
        return this.call("remove", key, cb);
    }
    removeAll(cb) {
        return this.call("removeAll", cb);
    }
    exist(key, cb) {
        return this.call("exist", key, cb);
    }
}

class Request extends HummerComponent {
    constructor(props = {}) {
        super("Request", props, false);
        this._url = '';
        this._method = 'POST';
        this._timeout = 10000;
        this._header = undefined;
        this._param = undefined;
    }
    set url(value) {
        this._url = value;
        this.call("setUrl", value);
    }
    get url() {
        return this._url;
    }
    set method(value) {
        this._method = value;
        this.call("setMethod", value);
    }
    get method() {
        return this._method;
    }
    set timeout(value) {
        this._timeout = value;
        this.call("setTimeout", value);
    }
    get timeout() {
        return this._timeout;
    }
    set header(value) {
        this._header = value;
        this.call("setHeader", value);
    }
    get header() {
        return this._header;
    }
    set param(value) {
        this._param = value;
        this.call("setParam", value);
    }
    get param() {
        return this._param;
    }
    send(callback) {
        this.call("send", callback);
    }
}

class WebSocket extends HummerComponent {
    constructor(url) {
        super("WebSocket", {}, false);
        this._url_ = "";
        this.__onopen__ = undefined;
        this.__onmessage__ = undefined;
        this.__onclose__ = undefined;
        this.__onerror__ = undefined;
        this.addEventListener("__onopen__", () => {
            if (this.__onopen__ != undefined) {
                this.__onopen__();
            }
        });
        this.addEventListener("__onmessage__", (event) => {
            if (this.__onmessage__ != undefined) {
                this.__onmessage__(event);
            }
        });
        this.addEventListener("__onclose__", (event) => {
            if (this.__onclose__ != undefined) {
                this.__onclose__(event);
            }
        });
        this.addEventListener("__onerror__", () => {
            if (this.__onerror__ != undefined) {
                this.__onerror__();
            }
        });
        this.connect(url);
    }
    set onopen(onopen) {
        this.__onopen__ = onopen;
    }
    get onopen() {
        return this.__onopen__;
    }
    set onmessage(onmessage) {
        this.__onmessage__ = onmessage;
    }
    get onmessage() {
        return this.__onmessage__;
    }
    set onclose(onclose) {
        this.__onclose__ = onclose;
    }
    get onclose() {
        return this.__onclose__;
    }
    set onerror(onerror) {
        this.__onerror__ = onerror;
    }
    get onerror() {
        return this.__onerror__;
    }
    connect(url) {
        this._url_ = url;
        this.call("connect", url);
    }
    close() {
        this.call("close");
    }
    send(data) {
        this.call("send", data);
    }
}

class ListJS extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("View", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._onRegister = () => { };
        this._onCreate = () => { };
        this._onUpdate = () => { };
        this._onRefreshList = (state) => { };
        this._eventListener = () => { };
        this._onLoadMoreList = null;
        this._refreshView = new View();
        this._loadMoreView = new View();
        this.visibleItems = new Map();
        this.visibleItemHeight = new Map();
        this.scrollY = 0;
        this.startIndex = 0;
        this.maxIndexByAvailableHeight = 0;
        this.lastStartIndex = 0;
        this.initListItemNumber = 0;
        this.deletedIndices = [];
        this.direction = 'down';
        this.topViewId = -1;
        this.onScrollBottom = (state) => {
            if (this.startIndex >= this.initListItemNumber && this._onLoadMoreList) {
                this._onLoadMoreList(state);
            }
        };
        this.onScrollTop = (state) => {
            if (!this._onRefreshList)
                return;
            if (state === 2) {
                this.resetListState();
            }
            this._onRefreshList(state);
        };
        this.scroller = new Scroller();
        this.viewTop = new View();
        this.viewTop.style = {
            height: 0
        };
        this.scroller.appendChild(this.viewTop);
        this.visibleItems.set(this.topViewId, this.viewTop);
        this.appendChild(this.scroller);
        this.scroller.addEventListener('scroll', this.onScroll.bind(this));
    }
    onScroll(event) {
        this._eventListener(event);
        this.scrollY = event.offsetY;
        this.direction = event.dy < 0 ? 'up' : 'down';
        this.updateVisibleItems();
    }
    resetListState() {
        this.startIndex = this.maxIndexByAvailableHeight = 0;
        this.deletedIndices = [];
        this.direction = 'down';
    }
    resetListView() {
        this.scroller.removeAll();
        this.visibleItems.clear();
        let newTopView = new View();
        this.viewTop.style = { height: 0 };
        this.scroller.appendChild(newTopView);
        this.visibleItems.set(this.topViewId, newTopView);
    }
    renderItem(index, cell) {
        this.onUpdate(index, cell);
        this.scroller.appendChild(cell);
    }
    adjustTopView(cell, direction) {
        if (direction === 'down') {
            this.viewTop.style = { height: this.viewTop.style.height + cell.style.height };
        }
        else {
            this.viewTop.style = { height: this.viewTop.style.height - cell.style.height };
        }
        let oldViewTop = this.visibleItems.get(this.topViewId);
        this.scroller.replaceChild(this.viewTop, oldViewTop);
        this.visibleItems.set(this.topViewId, this.viewTop);
    }
    removeDeletedIndex(index) {
        const arrIndex = this.deletedIndices.indexOf(index);
        if (arrIndex !== this.topViewId) {
            this.deletedIndices.splice(arrIndex, 1);
        }
    }
    handleDownDeletion(cell) {
        let { maxValue } = this.getMinAndMaxRenderItemIndex();
        let newIndex = maxValue + 1;
        this.onUpdate(newIndex + "恢复", cell);
        this.visibleItems.set(newIndex, cell);
        this.removeDeletedIndex(newIndex);
        this.scroller.appendChild(cell);
    }
    handleUpDeletion(cell) {
        if (this.startIndex > 0) {
            let { minValue } = this.getMinAndMaxRenderItemIndex();
            let newIndex = minValue - 1;
            if (newIndex < 0)
                return;
            this.onUpdate(newIndex + '恢复', cell);
            let oldCell = this.visibleItems.get(newIndex + 1);
            this.visibleItems.set(newIndex, cell);
            this.removeDeletedIndex(newIndex);
            this.scroller.insertBefore(cell, oldCell);
        }
    }
    removeCell(index, cell) {
        this.scroller.removeChild(cell);
        this.visibleItems.delete(index);
        this.deletedIndices.push(index);
    }
    handleDeletion(index) {
        if (index === this.topViewId || this.deletedIndices.includes(index))
            return;
        const cell = this.visibleItems.get(index);
        if (this.direction === 'down') {
            this.adjustTopView(cell, 'down');
            this.removeCell(index, cell);
            this.handleDownDeletion(cell);
        }
        else {
            this.adjustTopView(cell, 'up');
            this.removeCell(index, cell);
            this.handleUpDeletion(cell);
        }
    }
    getMinAndMaxRenderItemIndex() {
        let maxValue = Number.MIN_SAFE_INTEGER;
        let minValue = Number.MAX_SAFE_INTEGER;
        for (const key of this.visibleItems.keys()) {
            if (key > maxValue) {
                maxValue = key;
            }
            if (key > -1 && key < minValue) {
                minValue = key;
            }
        }
        return {
            minValue,
            maxValue
        };
    }
    calculateVisibleIndices() {
        if (this.scrollY === 0 && this.startIndex !== 0)
            return false;
        let currHeight = 0;
        let currStartIndex = 0;
        for (let i = 0; i <= this.initListItemNumber; i++) {
            let cell = this.visibleItems.get(i);
            if (!cell) {
                let cellInvisibleItemHeight = this.visibleItemHeight.get(i);
                if (cellInvisibleItemHeight) {
                    currHeight += cellInvisibleItemHeight;
                }
            }
            else {
                this.visibleItemHeight.set(i, cell.style.height);
                currHeight += cell.style.height;
            }
            if (currHeight >= this.scrollY) {
                currStartIndex = i;
                break;
            }
            else {
                currStartIndex = i;
            }
        }
        if (currStartIndex === 0)
            return false;
        if (this.lastStartIndex === currStartIndex && this.startIndex !== 0)
            return false;
        this.startIndex = currStartIndex;
        return true;
    }
    handleDown() {
        if (this.startIndex < this.maxIndexByAvailableHeight)
            return;
        for (let index = 0; index <= this.startIndex - this.maxIndexByAvailableHeight; index++) {
            if (!this.deletedIndices.includes(index)) {
                this.handleDeletion(index);
            }
        }
    }
    handleUp() {
        let { minValue, maxValue } = this.getMinAndMaxRenderItemIndex();
        if (maxValue <= 3 * this.maxIndexByAvailableHeight)
            return;
        let dec = this.startIndex - this.maxIndexByAvailableHeight + 1;
        let recoverNum = Math.abs(minValue - dec);
        for (let index = 0; index <= recoverNum; index++) {
            let itemIndex = maxValue - index;
            if (itemIndex < 0)
                break;
            if (!this.deletedIndices.includes(itemIndex)) {
                this.handleDeletion(itemIndex);
            }
        }
    }
    updateVisibleItems() {
        let refresh = this.calculateVisibleIndices();
        if (!refresh)
            return;
        if (this.direction === 'up') {
            this.handleUp();
        }
        else {
            this.handleDown();
        }
        this.lastStartIndex = this.startIndex;
    }
    initList() {
        let currHeight = 0;
        let currEndIndex = 0;
        this.resetListView();
        for (let i = 0; i < this.initListItemNumber; i++) {
            const type = this.onRegister(i);
            const cell = this._onCreate(type);
            this.visibleItems.set(i, cell);
            currHeight += cell.style.height;
            if (currHeight > Hummer.env.availableHeight) {
                currEndIndex = i;
                break;
            }
            else {
                currEndIndex = i;
            }
        }
        this.maxIndexByAvailableHeight = Math.min(this.initListItemNumber, currEndIndex);
        for (let i = 0; i <= 3 * this.maxIndexByAvailableHeight; i++) {
            let cell = this.visibleItems.get(i);
            if (!cell) {
                let type = this.onRegister(i);
                cell = this._onCreate(type);
                this.visibleItems.set(i, cell);
            }
            this.renderItem(i, cell);
        }
    }
    refresh(count) {
        this.initListItemNumber = count;
        if (this.startIndex !== 0) {
            this.updateVisibleItems();
        }
        else {
            this.initList();
        }
    }
    stopLoadMore(enable) {
        this.scroller.stopLoadMore(enable);
    }
    stopPullRefresh() {
        this.scroller.stopPullRefresh();
    }
    set onLoadMore(value) {
        this._onLoadMoreList = value;
        this.scroller.onLoadMore = this.onScrollBottom;
    }
    set onRefresh(value) {
        this._onRefreshList = value;
        this.scroller.onRefresh = this.onScrollTop;
    }
    get refreshView() {
        return this._refreshView;
    }
    set refreshView(value) {
        this._refreshView = value;
        this.scroller.refreshView = this._refreshView;
    }
    get loadMoreView() {
        return this._loadMoreView;
    }
    set loadMoreView(value) {
        this._loadMoreView = value;
        this.scroller.loadMoreView = this._loadMoreView;
    }
    get onCreate() {
        return this._onCreate;
    }
    set onCreate(value) {
        this._onCreate = value;
    }
    get onUpdate() {
        return this._onUpdate;
    }
    set onUpdate(value) {
        this._onUpdate = value;
    }
    get onRegister() {
        return this._onRegister;
    }
    set onRegister(value) {
        this._onRegister = value;
    }
    set showScrollBar(value) {
        this.scroller.showScrollBar = value;
    }
    set bounces(value) {
        this.scroller.bounces = value;
    }
    addEventListener(eventName, eventListener, useCapture) {
        if (eventName === 'scroll') {
            this._eventListener = eventListener;
        }
    }
}

__GLOBAL__.Hummer = {
    getRootView() {
        return Hummer.getRootView();
    },
    Hummer: {
        pageInfo: {},
        dd: "xxx"
    }
};

exports.BasicAnimation = BasicAnimation;
exports.Button = Button;
exports.Canvas = Canvas;
exports.CanvasView = CanvasView;
exports.Dialog = Dialog;
exports.Element = Element;
exports.EventTarget = EventTarget;
exports.HMObject = HMObject;
exports.HorizontalScroller = HorizontalScroller;
exports.Hummer = Hummer;
exports.HummerComponent = HummerComponent;
exports.HummerElement = HummerElement;
exports.Image = Image;
exports.Input = Input;
exports.KeyframeAnimation = KeyframeAnimation;
exports.List = List;
exports.ListJS = ListJS;
exports.LoadMore = LoadMore;
exports.Loading = Loading;
exports.Memory = Memory;
exports.Navigator = Navigator;
exports.Node = Node;
exports.NotifyCenter = NotifyCenter;
exports.Refresh = Refresh;
exports.Request = Request;
exports.Scroller = Scroller;
exports.Storage = Storage;
exports.Switch = Switch;
exports.Text = Text;
exports.TextArea = TextArea;
exports.Toast = Toast;
exports.View = View;
exports.ViewPager = ViewPager;
exports.WebSocket = WebSocket;
//# sourceMappingURL=hummer-api.cjs.js.map
