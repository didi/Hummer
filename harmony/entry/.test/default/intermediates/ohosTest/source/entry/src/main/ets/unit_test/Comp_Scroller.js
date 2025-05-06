export function renderFunc(__Hummer__, __GLOBAL__) {
    /******/ (() => { // webpackBootstrap
        /******/ 	"use strict";
        /******/ 	var __webpack_modules__ = ({

            /***/ "./node_modules/@didi/hummer-api/dist/hummer-api.es.js":
            /*!*************************************************************!*\
              !*** ./node_modules/@didi/hummer-api/dist/hummer-api.es.js ***!
              \*************************************************************/
            /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                    /* harmony export */   BasicAnimation: () => (/* binding */ BasicAnimation),
                    /* harmony export */   Button: () => (/* binding */ Button),
                    /* harmony export */   Canvas: () => (/* binding */ Canvas),
                    /* harmony export */   Dialog: () => (/* binding */ Dialog),
                    /* harmony export */   Element: () => (/* binding */ Element),
                    /* harmony export */   EventTarget: () => (/* binding */ EventTarget),
                    /* harmony export */   HMObject: () => (/* binding */ HMObject),
                    /* harmony export */   Hummer: () => (/* binding */ Hummer),
                    /* harmony export */   HummerComponent: () => (/* binding */ HummerComponent),
                    /* harmony export */   HummerElement: () => (/* binding */ HummerElement),
                    /* harmony export */   Image: () => (/* binding */ Image),
                    /* harmony export */   Input: () => (/* binding */ Input),
                    /* harmony export */   KeyframeAnimation: () => (/* binding */ KeyframeAnimation),
                    /* harmony export */   List: () => (/* binding */ List),
                    /* harmony export */   Memory: () => (/* binding */ Memory),
                    /* harmony export */   Navigator: () => (/* binding */ Navigator),
                    /* harmony export */   Node: () => (/* binding */ Node),
                    /* harmony export */   NotifyCenter: () => (/* binding */ NotifyCenter),
                    /* harmony export */   Request: () => (/* binding */ Request),
                    /* harmony export */   Scroller: () => (/* binding */ Scroller),
                    /* harmony export */   Storage: () => (/* binding */ Storage),
                    /* harmony export */   Text: () => (/* binding */ Text),
                    /* harmony export */   TextArea: () => (/* binding */ TextArea),
                    /* harmony export */   Toast: () => (/* binding */ Toast),
                    /* harmony export */   View: () => (/* binding */ View)
                    /* harmony export */ });
                const { document: _Document_$1 } = __Hummer__;
                class HMObject {
                    constructor(tag, isApi = true, props) {
                        this.tag = tag;
                        this.name = tag;
                        this.isApi = isApi;
                        this.props = props;
                        if (isApi) {
                            this.obj = _Document_$1.createComponent(tag, props);
                            this.obj.__element__ = this;
                        }
                        else {
                            this.obj = _Document_$1.createElement(tag, props);
                            this.obj.__element__ = this;
                        }
                    }
                    getThis() {
                        return this.obj;
                    }
                    call(methodName, ...args) {
                        return this.obj.invoke(methodName, ...args);
                    }
                }

                class EventTarget extends HMObject {
                    constructor(tag, isApi = true, props) {
                        super(tag, isApi, props);
                        this.envents = new Map();
                    }
                    onReceiveEvent(eventName, event) {
                        event = this.onHandleReceiveEvent(eventName, event);
                        this.dispatchEvent(eventName, event);
                    }
                    onHandleReceiveEvent(eventName, event) {
                        return event;
                    }
                    bindEventTarget() {
                        this.obj.setEventTarget((eventName, event) => {
                            this.onReceiveEvent(eventName, event);
                        });
                    }
                    dispatchEvent(eventName, event) {
                        var listeners = this.envents.get(eventName);
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
                        var listeners = this.envents.get(eventName);
                        if (listeners == undefined) {
                            listeners = new Array();
                            this.envents.set(eventName, listeners);
                        }
                        listeners.push(eventListener);
                        this._addEventListener(eventName);
                    }
                    _addEventListener(eventName) {
                        this.obj.addEventListener(eventName);
                    }
                    removeEventListener(eventName, eventListener, useCapture) {
                        var listeners = this.envents.get(eventName);
                        if (listeners != undefined) {
                            if (eventListener == undefined) {
                                listeners.splice(0, listeners.length);
                                this.envents.delete(eventName);
                                this._removeEventListener(eventName);
                            }
                            else {
                                const index = listeners.indexOf(eventListener);
                                if (index > -1) {
                                    listeners.splice(index, 1);
                                }
                                if (listeners.length == 0) {
                                    this.envents.delete(eventName);
                                    this._removeEventListener(eventName);
                                }
                            }
                        }
                    }
                    _removeEventListener(eventName) {
                        this.obj.removeEventListener(eventName);
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
                        if (!child) {
                            return;
                        }
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
                        this._insertBefore(child, anchor);
                        child._onMounted();
                    }
                    _insertBefore(child, anchor) {
                        this.obj.insertBefore(child.obj, anchor.obj);
                    }
                    replaceChild(newNode, oldNode) {
                        if (!newNode || !oldNode) {
                            return;
                        }
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
                            this.obj.setAttributes({ [key]: value });
                        }
                    }
                    _removeAttribute(key) {
                        delete this._attributes[key];
                    }
                    _initAttributes(attribute) {
                        this._attributes = attribute || {};
                        this.obj.setAttributes(attribute);
                    }
                    _setAttributes(attribute) {
                        this._attributes = Object.assign(Object.assign({}, this._attributes), attribute);
                        this.obj.setAttributes(attribute);
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
                        this._style = Object.assign(Object.assign({}, newStyle), style);
                        this.obj.setStyles(this._style);
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
                        this._animationMap && this._animationMap.set(key, animation);
                        this.obj.addAnimation(animation, key);
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
                        this.obj.removeAnimationForKey(key);
                    }
                    removeAllAnimation() {
                        this._removeAllAnimation();
                    }
                    _removeAllAnimation() {
                        this.removeEventListener(AnimationStartName);
                        this.removeEventListener(AnimationEndName);
                        this._animationMap.clear();
                        this.obj.removeAllAnimation();
                    }
                    getRect(callback) {
                        this.obj.getRect((rect) => {
                            callback.call(this, rect);
                        });
                    }
                    dbg_getDescription(callback, id) {
                    }
                }

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
                        this.globalProxy = undefined;
                        this.bindEventTarget();
                        this.__view_id = __view_id;
                        this.globalProxy = this.getProxy();
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
                            super.setStyle(value, false);
                        }
                    }
                    superSetStyle(value, flag = false) {
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
                    setCacheProp(key, value) {
                        if (/^data/.test(key)) {
                            let dataKey = key.slice(4).toLowerCase();
                            if (dataKey) {
                                this.dataset[dataKey] = value;
                            }
                        }
                    }
                    onHandleReceiveEvent(eventName, event) {
                        if (this.globalProxy) {
                            return this.globalProxy.onHandleReceiveEvent(this, event);
                        }
                        return super.onHandleReceiveEvent(eventName, event);
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
                        this._setAttribute(key, value);
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
                        this.call("fillText", x, y, maxWidth);
                    }
                    drawImage(src, x, y, width, height) {
                        this.call("drawImage", x, y, width, height);
                    }
                }

                class Text extends HummerElement {
                    constructor(id = "", name = "", props = {}) {
                        super("Text", name, Object.assign(Object.assign({}, props), { viewId: id }));
                        this._initAttributes({
                            text: '',
                            richText: '',
                            textCopyEnable: 'false'
                        });
                    }
                    set style(value) {
                        this.setStyle(value, false);
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
                        this._setAttribute(key, value);
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

                var ListEventState;
                (function (ListEventState) {
                    ListEventState[ListEventState["normal"] = 0] = "normal";
                    ListEventState[ListEventState["beganDrag"] = 1] = "beganDrag";
                    ListEventState[ListEventState["scroll"] = 2] = "scroll";
                    ListEventState[ListEventState["stop"] = 3] = "stop";
                    ListEventState[ListEventState["endDrag"] = 4] = "endDrag";
                })(ListEventState || (ListEventState = {}));
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
                            return value(type).getThis();
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
                        this._setAttribute("refreshView", value.getThis());
                    }
                    get loadMoreView() {
                        return this._getAttribute("loadMoreView");
                    }
                    set loadMoreView(value) {
                        this._setAttribute("loadMoreView", value.getThis());
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
                }

                class ViewPager extends HummerElement {
                    constructor(id = "", name = "", props = {}) {
                        super("Input", name, Object.assign(Object.assign({}, props), { viewId: id }));
                    }
                    set style(value) {
                        this.setStyle(value, false);
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
                            let thisElement = view === null || view === void 0 ? void 0 : view.__element__;
                            let element = callback(position, thisElement);
                            return element.getThis();
                        });
                    }
                }

                var ScrollEventState;
                (function (ScrollEventState) {
                    ScrollEventState[ScrollEventState["normal"] = 0] = "normal";
                    ScrollEventState[ScrollEventState["beganDrag"] = 1] = "beganDrag";
                    ScrollEventState[ScrollEventState["scroll"] = 2] = "scroll";
                    ScrollEventState[ScrollEventState["stop"] = 3] = "stop";
                    ScrollEventState[ScrollEventState["endDrag"] = 4] = "endDrag";
                })(ScrollEventState || (ScrollEventState = {}));
                class Scroller extends LifeCycleElement {
                    constructor(id = "", name = "", props = {}) {
                        super("Scroller", name, Object.assign(Object.assign({}, props), { viewId: id }));
                        this._onScrollTop = undefined;
                        this._onScrollBottom = undefined;
                        this._onRefresh = undefined;
                        this._onLoadMore = undefined;
                        this.addEventListener("onRefresh", (event) => {
                            this.onDispatch("onRefresh", event);
                        })
                        this.addEventListener("onLoadMore", (event) => {
                            this.onDispatch("onLoadMore", event);
                        })
                        this.addEventListener("onScrollTop", () => {
                            this.onDispatch("onScrollTop");
                        })
                        this.addEventListener("onScrollBottom", () => {
                            this.onDispatch("onScrollBottom");
                        })
                    }
                    onDispatch(type, event) {
                        switch (type) {
                            case "onRefresh":
                                if (this._onRefresh) {
                                    this._onRefresh(event?.state);
                                }
                                break
                            case "onLoadMore":
                                if (this._onLoadMore) {
                                    this._onLoadMore(event?.state);
                                }
                                break
                            case "onScrollTop":
                                if (this._onScrollTop) {
                                    this._onScrollTop();
                                }
                                break
                            case "onScrollBottom":
                                if (this._onScrollBottom) {
                                    this._onScrollBottom();
                                }
                                break
                            default:
                                break
                        }

                    }
                    get refreshView() {
                        return this._getAttribute("refreshView");
                    }
                    set refreshView(value) {
                        this._setAttribute("refreshView", value.getThis());
                    }
                    get loadMoreView() {
                        return this._getAttribute("loadMoreView");
                    }
                    set loadMoreView(value) {
                        this._setAttribute("loadMoreView", value.getThis());
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
                        super.addEventListener(eventName, eventListener, useCapture);
                    }
                }

                class TextArea extends HummerElement {
                    constructor(id = "", name = "", props = {}) {
                        super("TextArea", name, Object.assign(Object.assign({}, props), { viewId: id }));
                        this._initAttributes({
                            text: '',
                            placeholder: '',
                            focused: 'false'
                        });
                        this.addEventListener('input', (event) => {
                            this._setAttribute("text", event.text, false);
                        });
                    }
                    set style(value) {
                        this.setStyle(value, false);
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
                    constructor(tag, props) {
                        super(tag, true, props);
                        this.bindEventTarget();
                    }
                }

                const HUMMER$7 = __Hummer__;
                class HummerApi extends HummerComponent {
                    constructor(props = {}) {
                        super("Hummer", props);
                        this._rootElement = undefined;
                    }
                    static newInstance() {
                        return new HummerApi();
                    }
                    static checkInstance() {
                        if (!HUMMER$7.__hummerApi__) {
                            HUMMER$7.__hummerApi__ = HummerApi.newInstance();
                        }
                    }
                    static get instance() {
                        return HUMMER$7.__hummerApi__;
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

                const HUMMER$6 = __Hummer__;
                class NotifyCenter extends HummerComponent {
                    constructor(props = {}) {
                        super("NotifyCenter", props);
                    }
                    static checkInstance() {
                        if (!HUMMER$6.__notifyCenter__) {
                            HUMMER$6.__notifyCenter__ = NotifyCenter.newInstance();
                        }
                    }
                    static newInstance() {
                        return new NotifyCenter();
                    }
                    static get instance() {
                        return HUMMER$6.__notifyCenter__;
                    }
                    static addEventListener(event, callback) {
                        NotifyCenter.checkInstance();
                        NotifyCenter.instance.addEventListener(event, callback);
                    }
                    static removeEventListener(event, callback) {
                        NotifyCenter.checkInstance();
                        if (!callback) {
                            NotifyCenter.instance.call("removeAllEventListener", event);
                        }
                        else {
                            NotifyCenter.instance.removeEventListener(event, callback);
                        }
                    }
                    static triggerEvent(event, value) {
                        NotifyCenter.checkInstance();
                        NotifyCenter.instance.call("triggerEvent", event, value);
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
                        _Document_.render(element.getThis());
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
                        this.type = 'basic';
                        this.property = 'position';
                        this._startFunc = undefined;
                        this._endFunc = undefined;
                        this._startCallback = () => {
                            if (this._startFunc) {
                                this._startFunc();
                            }
                        };
                        this._endCallback = () => {
                            if (this._endFunc) {
                                this._endFunc();
                            }
                        };
                        this.property = property;
                    }
                    get startCallback() {
                        return this._startCallback;
                    }
                    get endCallback() {
                        return this._endCallback;
                    }
                    _onEventListener(event, callback) {
                        switch (event) {
                            case 'start':
                                this._startFunc = callback;
                                break;
                            case 'end':
                                this._endFunc = callback;
                                break;
                        }
                    }
                    on(event, eventListener) {
                        this._onEventListener(event, eventListener);
                    }
                }

                class KeyframeAnimation {
                    constructor(property) {
                        this.keyframes = [];
                        this.duration = 0;
                        this.delay = 0;
                        this.repeatCount = 1;
                        this.easing = 'ease';
                        this.type = 'keyframe';
                        this.property = 'position';
                        this._startFunc = undefined;
                        this._endFunc = undefined;
                        this._startCallback = () => {
                            if (this._startFunc) {
                                this._startFunc();
                            }
                        };
                        this._endCallback = () => {
                            if (this._endFunc) {
                                this._endFunc();
                            }
                        };
                        this.property = property;
                    }
                    get startCallback() {
                        return this._startCallback;
                    }
                    get endCallback() {
                        return this._endCallback;
                    }
                    _onEventListener(event, callback) {
                        switch (event) {
                            case 'start':
                                this._startFunc = callback;
                                break;
                            case 'end':
                                this._endFunc = callback;
                                break;
                        }
                    }
                    on(event, eventListener) {
                        this._onEventListener(event, eventListener);
                    }
                }

                const HUMMER$5 = __Hummer__;
                class Memory extends HummerComponent {
                    constructor(props = {}) {
                        super("Memory", props);
                    }
                    static newInstance() {
                        return new Memory();
                    }
                    static checkInstance() {
                        if (!HUMMER$5.__memory__) {
                            HUMMER$5.__memory__ = Memory.newInstance();
                        }
                    }
                    static get instance() {
                        return HUMMER$5.__memory__;
                    }
                    static set(key, value, cb) {
                        Memory.checkInstance();
                        Memory.instance.set(key, value, cb);
                    }
                    static get(key, cb) {
                        Memory.checkInstance();
                        return Memory.instance.get(key, cb);
                    }
                    static remove(key, cb) {
                        Memory.checkInstance();
                        Memory.instance.remove(key, cb);
                    }
                    static removeAll(cb) {
                        Memory.checkInstance();
                        Memory.instance.removeAll(cb);
                    }
                    static exist(key, cb) {
                        Memory.checkInstance();
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

                const HUMMER$4 = __Hummer__;
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
                        if (!HUMMER$4.__dialog__) {
                            HUMMER$4.__dialog__ = Dialog.newInstance();
                        }
                    }
                    static get instance() {
                        return HUMMER$4.__dialog__;
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
                        this.call("custom", view);
                    }
                    dismiss() {
                        this.call("dismiss");
                    }
                }

                const HUMMER$3 = __Hummer__;
                class Toast extends HummerComponent {
                    constructor(props = {}) {
                        super("Toast", props);
                    }
                    static newInstance() {
                        return new Toast();
                    }
                    static checkInstance() {
                        if (!HUMMER$3.__toast__) {
                            HUMMER$3.__toast__ = Toast.newInstance();
                        }
                    }
                    static get instance() {
                        return HUMMER$3.__toast__;
                    }
                    static show(msg, duration) {
                        Toast.checkInstance();
                        Toast.instance.show(msg, duration);
                    }
                    static custom(view, duration) {
                        Toast.checkInstance();
                        Toast.instance.custom(view, duration);
                    }
                    show(msg, duration) {
                        this.call("show", msg, duration);
                    }
                    custom(view, duration) {
                        this.call("custom", view, duration);
                    }
                }

                const HUMMER$2 = __Hummer__;
                class Navigator extends HummerComponent {
                    constructor(props = {}) {
                        super("Navigator", props);
                    }
                    static newInstance() {
                        return new Navigator();
                    }
                    static checkInstance() {
                        if (!HUMMER$2.__navigator__) {
                            HUMMER$2.__navigator__ = Navigator.newInstance();
                        }
                    }
                    static get instance() {
                        return HUMMER$2.__navigator__;
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

                const HUMMER$1 = __Hummer__;
                class Storage extends HummerComponent {
                    constructor(props = {}) {
                        super("Storage", props);
                    }
                    static newInstance() {
                        return new Storage();
                    }
                    static checkInstance() {
                        if (!HUMMER$1.__storage__) {
                            HUMMER$1.__storage__ = Storage.newInstance();
                        }
                    }
                    static get instance() {
                        return HUMMER$1.__storage__;
                    }
                    static set(key, value, cb) {
                        Storage.checkInstance();
                        return Storage.instance.set(key, value, cb);
                    }
                    static get(key, cb) {
                        Storage.checkInstance();
                        return Storage.instance.get(key, cb);
                    }
                    static remove(key, cb) {
                        Storage.checkInstance();
                        return Storage.instance.remove(key, cb);
                    }
                    static removeAll(cb) {
                        Storage.checkInstance();
                        return Storage.instance.removeAll(cb);
                    }
                    static exist(key, cb) {
                        Storage.checkInstance();
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

                const HUMMER = __Hummer__;
                class Request extends HummerComponent {
                    constructor(props = {}) {
                        super("Request", props);
                        this._url = '';
                        this._method = 'POST';
                        this._timeout = 10000;
                        this._header = {};
                        this._param = {};
                    }
                    static newInstance() {
                        return new Request();
                    }
                    static checkInstance() {
                        if (!HUMMER.__request__) {
                            HUMMER.__request__ = Request.newInstance();
                        }
                    }
                    static get instance() {
                        return HUMMER.__request__;
                    }
                    set url(value) {
                        this._url = value;
                        this.call("setUrl", value);
                    }
                    set method(value) {
                        this._method = value;
                        this.call("setMethod", value);
                    }
                    set timeout(value) {
                        this._timeout = value;
                        this.call("setTimeout", value);
                    }
                    set header(value) {
                        this._header = value;
                        this.call("setHeader", value);
                    }
                    set param(value) {
                        this._param = value;
                        this.call("setParam", value);
                    }
                    static send(callback) {
                        Request.checkInstance();
                        Request.instance.send(callback);
                    }
                    send(callback) {
                        this.call("send", callback);
                    }
                }

                __GLOBAL__.Hummer = {
                    getRootView() {
                        return Hummer.getRootView();
                    }
                };


                //# sourceMappingURL=hummer-api.es.js.map


                /***/ }),

            /***/ "./node_modules/@hummer/tenon-dev-tool/dist/tenon-dev-tool.es.js":
            /*!***********************************************************************!*\
              !*** ./node_modules/@hummer/tenon-dev-tool/dist/tenon-dev-tool.es.js ***!
              \***********************************************************************/
            /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                    /* harmony export */   run: () => (/* binding */ run)
                    /* harmony export */ });
                const NODE_VIEW = "Symbol(NODE_VIEW)";
                const NODE_TEXT = "Symbol(NODE_TEXT)";
                const NODE_IMAGE = "Symbol(NODE_IMAGE)";
                const NODE_BUTTON = "Symbol(NODE_BUTTON)";
                const NODE_TEXTAREA = "Symbol(NODE_TEXTAREA)";
                const NODE_INPUT = "Symbol(NODE_INPUT)";
                const NODE_SWITCH = "Symbol(NODE_SWITCH)";
                const NODE_SCROLLER = "Symbol(NODE_SCROLLER)";
                const NODE_REFRESH = "Symbol(NODE_REFRESH)";
                const NODE_LOADMORE = "Symbol(NODE_LOADMORE)";
                const HUMMER_VIEW = 'View';
                const HUMMER_TEXT = 'Text';
                const HUMMER_BUTTON = 'Button';
                const HUMMER_IMAGE = 'Image';
                const HUMMER_INPUT = 'Input';
                const HUMMER_TEXTAREA = 'TextArea';
                const HUMMER_SWITCH = 'Switch';
                const HUMMER_LOADING = 'Loading';
                const HUMMER_SCROLLER = 'Scroller';
                const HUMMER_HORIZONTALSCROLLER = 'HorizontalScroller';
                const HUMMER_LIST = 'List';
                const HUMMER_VIEWPAGER = 'ViewPager';
                const HUMMER_DIALOG = 'Dialog';
                function getElementTagMap() {
                    let tagMap = new Map();
                    tagMap.set(NODE_VIEW, 'view');
                    tagMap.set(NODE_TEXT, 'text');
                    tagMap.set(NODE_IMAGE, 'image');
                    tagMap.set(NODE_BUTTON, 'button');
                    tagMap.set(NODE_TEXTAREA, 'textarea');
                    tagMap.set(NODE_INPUT, 'input');
                    tagMap.set(NODE_SWITCH, 'switch');
                    tagMap.set(NODE_SCROLLER, 'scroller');
                    tagMap.set(NODE_REFRESH, 'refresh');
                    tagMap.set(NODE_LOADMORE, 'loadmore');
                    tagMap.set(HUMMER_VIEW, 'view');
                    tagMap.set(HUMMER_TEXT, 'text');
                    tagMap.set(HUMMER_BUTTON, 'button');
                    tagMap.set(HUMMER_IMAGE, 'image');
                    tagMap.set(HUMMER_INPUT, 'input');
                    tagMap.set(HUMMER_TEXTAREA, 'textarea');
                    tagMap.set(HUMMER_SWITCH, 'switch');
                    tagMap.set(HUMMER_LOADING, 'loading');
                    tagMap.set(HUMMER_SCROLLER, 'scroller');
                    tagMap.set(HUMMER_HORIZONTALSCROLLER, 'horizontalscroller');
                    tagMap.set(HUMMER_LIST, 'list');
                    tagMap.set(HUMMER_VIEWPAGER, 'viewpager');
                    tagMap.set(HUMMER_DIALOG, 'view');
                    return tagMap;
                }
                const ELEMNT_TAG_MAP = getElementTagMap();
                const getPartUrlByParam = (url, param) => {
                    const reg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
                    const res = reg.exec(url);
                    const fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
                    return res[fields.indexOf(param)];
                };
                const formatNode = function (node, type = 'tenon-vue') {
                    let formatedNode = Object.create({});
                    const treeTraveler = function (node, rootView) {
                        processView(node, rootView, type);
                        if (node.children) {
                            let arr = Array.from(node.children);
                            if (arr.length) {
                                rootView.children = Array.apply(null, new Array(arr.length)).map(() => { return {}; });
                                arr.forEach((n, i) => {
                                    treeTraveler(n, rootView.children[i]);
                                });
                            }
                        }
                    };
                    treeTraveler(node, formatedNode);
                    return formatedNode;
                };
                const getViewData = function (container, type = 'tenon-vue') {
                    let simpleRoot = Object.create({});
                    let viewMap = Object.create({});
                    const treeTraveler = function (node, rootView) {
                        var _a, _b, _c, _d, _e;
                        if (node === null || node === void 0 ? void 0 : node.tagName) {
                            node.name = node === null || node === void 0 ? void 0 : node.tagName.toLowerCase();
                            node.style = (_a = node === null || node === void 0 ? void 0 : node.element) === null || _a === void 0 ? void 0 : _a._style;
                            node.__view_id = (_b = node === null || node === void 0 ? void 0 : node.element) === null || _b === void 0 ? void 0 : _b.objID;
                            switch (node.name) {
                                case 'text':
                                    node.text = (_c = node.element) === null || _c === void 0 ? void 0 : _c._text;
                                    break;
                                case 'image':
                                    node.src = (_d = node.element) === null || _d === void 0 ? void 0 : _d._src;
                                    break;
                            }
                        }
                        rootView = Object.assign(rootView, node);
                        viewMap[rootView.__view_id] = node;
                        delete rootView.children;
                        delete rootView.element;
                        if (node.name === 'template' && node !== container) {
                            if (node === null || node === void 0 ? void 0 : node.element.dbg_getDescription) {
                                node === null || node === void 0 ? void 0 : node.element.dbg_getDescription((thatNode) => {
                                    var _a;
                                    if (thatNode === null || thatNode === void 0 ? void 0 : thatNode.children) {
                                        thatNode.children.forEach((item, index) => {
                                            var _a, _b;
                                            thatNode.children[index].name = item === null || item === void 0 ? void 0 : item.tagName;
                                            thatNode.children[index].style = (_a = item === null || item === void 0 ? void 0 : item.element) === null || _a === void 0 ? void 0 : _a._style;
                                            thatNode.children[index].__view_id = (_b = item === null || item === void 0 ? void 0 : item.element) === null || _b === void 0 ? void 0 : _b.objID;
                                            switch (item.name) {
                                                case 'Text':
                                                    thatNode.children[index].text = item.element._text;
                                                    break;
                                                case 'Image':
                                                    thatNode.children[index].src = item.element._src;
                                                    break;
                                            }
                                        });
                                        node.children = thatNode.children;
                                    }
                                    node.name = thatNode.tagName.toLowerCase();
                                    rootView.name = node.name;
                                    if (node.children && node.children.length > 0) {
                                        rootView.children = Array.apply(null, new Array(((_a = node === null || node === void 0 ? void 0 : node.children) === null || _a === void 0 ? void 0 : _a.length) || 0)).map(() => { return {}; });
                                        let arr = Array.from(node.children);
                                        arr.forEach((n, i) => {
                                            treeTraveler(n, rootView.children[i]);
                                        });
                                    }
                                });
                            }
                        }
                        else {
                            if (node.children && node.children.length > 0) {
                                rootView.children = Array.apply(null, new Array(((_e = node === null || node === void 0 ? void 0 : node.children) === null || _e === void 0 ? void 0 : _e.length) || 0)).map(() => { return {}; });
                                let arr = Array.from(node.children);
                                arr.forEach((n, i) => {
                                    treeTraveler(n, rootView.children[i]);
                                });
                            }
                        }
                    };
                    treeTraveler(container, simpleRoot);
                    return {
                        simpleRoot,
                        viewMap
                    };
                };
                const processView = function (node, rootView, type = 'tenon-vue') {
                    var _a;
                    let nameKey = '__NAME', idKey = '__view_id', textKey = '_text', srcKey = '_src', elementKey = 'element', styleKey = 'style', classNameKey = 'className';
                    rootView.style = node[styleKey];
                    switch (type) {
                        case 'hummer':
                            nameKey = 'tagName';
                            idKey = 'id';
                            textKey = 'content';
                            srcKey = 'content';
                            rootView.style = node.element.style;
                            break;
                    }
                    rootView.__view_id = node[idKey];
                    rootView.name = node[nameKey] && ELEMNT_TAG_MAP.get(node[nameKey].toString()) || 'template';
                    rootView.element = node[elementKey];
                    rootView.className = node[classNameKey];
                    ((_a = node[elementKey]) === null || _a === void 0 ? void 0 : _a.node) && (node[elementKey].node.__view_id = node[idKey]);
                    switch (rootView.name) {
                        case 'text':
                            rootView.text = node[textKey];
                            break;
                        case 'image':
                            rootView.src = node[srcKey];
                            break;
                    }
                };
                const updateOptions = function (oldOptions, newOptions) {
                    for (const key in oldOptions) {
                        if (!(key in newOptions)) {
                            delete oldOptions[key];
                        }
                    }
                    for (const key in newOptions) {
                        oldOptions[key] = newOptions[key];
                    }
                    return oldOptions;
                };
                const log = function (str) {
                };
                const error = function (str) {
                };
                const guid = function () {
                    function S4() {
                        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                    }
                    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
                };

                const { __storageInterceptFlag__, Storage, Memory: Memory$1 } = __GLOBAL__;
                const getAllStorage = (ws, params) => {
                    let storageAll = Storage.getAll();
                    let newStorageAll = [];
                    for (const key in storageAll) {
                        if (/_#_hummer_.*_#_/.test(key)) {
                            continue;
                        }
                        let item = {
                            key: key,
                            value: storageAll[key],
                        };
                        newStorageAll.push(item);
                    }
                    sendMessage(ws, {
                        type: 'storage',
                        method: 'setStorageList',
                        params: Object.assign(Object.assign({}, params), { storageAll: newStorageAll })
                    });
                };
                const storageintercept = (ws) => {
                    __GLOBAL__.__storageInterceptFlag__ = true;
                    !__storageInterceptFlag__ && (__GLOBAL__.__storageOriginSet__ = Storage.set, __GLOBAL__.__storageOriginRemove__ = Storage.remove, __GLOBAL__.__storageOriginRemoveAll__ = Storage.removeAll);
                    Storage.set = function () {
                        if (Memory$1.get("_#_hummer_tenonIp_#_")) {
                            sendMessage(ws, {
                                type: 'storage',
                                method: 'updateStorageList',
                                params: {
                                    tenonIp: Memory$1.get("_#_hummer_tenonIp_#_"),
                                    key: arguments[0],
                                    value: arguments[1],
                                }
                            });
                        }
                        __GLOBAL__.__storageOriginSet__.apply(this, arguments);
                    };
                    Storage.remove = function () {
                        __GLOBAL__.__storageOriginRemove__.apply(this, arguments);
                        if (Memory$1.get("_#_hummer_tenonIp_#_")) {
                            getAllStorage(ws, { tenonIp: Memory$1.get("_#_hummer_tenonIp_#_") });
                        }
                    };
                    Storage.removeAll = function () {
                        __GLOBAL__.__storageOriginRemoveAll__.apply(this, arguments);
                        if (Memory$1.get("_#_hummer_tenonIp_#_")) {
                            sendMessage(ws, {
                                type: 'storage',
                                method: 'setStorageList',
                                params: {
                                    tenonIp: Memory$1.get("_#_hummer_tenonIp_#_"),
                                    storageAll: []
                                }
                            });
                        }
                    };
                };

                const { __memoryInterceptFlag__, Memory } = __GLOBAL__;
                const getAllMemory = (ws, params) => {
                    let memoryAll = Memory.getAll();
                    let newMemoryAll = [];
                    for (const key in memoryAll) {
                        if (/_#_hummer_.*_#_/.test(key)) {
                            continue;
                        }
                        let item = {
                            key: key,
                            value: memoryAll[key],
                        };
                        newMemoryAll.push(item);
                    }
                    sendMessage(ws, {
                        type: 'memory',
                        method: 'setMemoryList',
                        params: Object.assign(Object.assign({}, params), { memoryAll: newMemoryAll })
                    });
                };
                const memoryintercept = (ws) => {
                    __GLOBAL__.__memoryInterceptFlag__ = true;
                    !__memoryInterceptFlag__ && (__GLOBAL__.__memoryOriginSet__ = Memory.set, __GLOBAL__.__memoryOriginRemove__ = Memory.remove, __GLOBAL__.__memoryOriginRemoveAll__ = Memory.removeAll);
                    Memory.set = function () {
                        if (Memory.get("_#_hummer_tenonIp_#_")) {
                            sendMessage(ws, {
                                type: 'memory',
                                method: 'updateMemoryList',
                                params: {
                                    tenonIp: Memory.get("_#_hummer_tenonIp_#_"),
                                    key: arguments[0],
                                    value: arguments[1],
                                }
                            });
                        }
                        __GLOBAL__.__memoryOriginSet__.apply(this, arguments);
                    };
                    Memory.remove = function () {
                        __GLOBAL__.__memoryOriginRemove__.apply(this, arguments);
                        if (Memory.get("_#_hummer_tenonIp_#_")) {
                            getAllMemory(ws, { tenonIp: Memory.get("_#_hummer_tenonIp_#_") });
                        }
                    };
                    Memory.removeAll = function () {
                        __GLOBAL__.__memoryOriginRemoveAll__.apply(this, arguments);
                        if (Memory.get("_#_hummer_tenonIp_#_")) {
                            sendMessage(ws, {
                                type: 'memory',
                                method: 'setMemoryList',
                                params: {
                                    tenonIp: Memory.get("_#_hummer_tenonIp_#_"),
                                    memoryAll: []
                                }
                            });
                        }
                    };
                };

                const requestintercept = (ws) => {
                    const { Request, __requestInterceptFlag__ } = __GLOBAL__;
                    __GLOBAL__.__requestInterceptFlag__ = true;
                    !__requestInterceptFlag__ && (__GLOBAL__.__requestOriginSend__ = Request.prototype.send);
                    const interceptTime = __GLOBAL__.__devReloadTimestamp__;
                    Request.prototype.send = function () {
                        const canSendMessage = interceptTime === __GLOBAL__.__devReloadTimestamp__;
                        const requestId = guid();
                        canSendMessage && sendMessage(ws, {
                            type: 'netWork',
                            method: 'updateNetWorkList',
                            params: {
                                id: requestId,
                                requestInfo: {
                                    method: this.method,
                                    header: this.header,
                                    url: this.url,
                                    param: this.param,
                                },
                            }
                        });
                        const callback = arguments[0];
                        const mergeCallback = (res) => {
                            canSendMessage && sendMessage(ws, {
                                type: 'netWork',
                                method: 'updateNetWorkList',
                                params: {
                                    id: requestId,
                                    responseInfo: res,
                                }
                            });
                            callback.call(this, res);
                        };
                        __GLOBAL__.__requestOriginSend__.apply(this, [mergeCallback]);
                    };
                };

                let ws, currentType;
                function initSocket (url, handlers) {
                    ws = new __GLOBAL__.WebSocket(url);
                    ws.onopen = () => {
                        log('websocket opened~');
                        storageintercept(ws);
                        memoryintercept(ws);
                        requestintercept(ws);
                    };
                    ws.onmessage = (event) => {
                        log(JSON.stringify(event));
                        let msg = JSON.parse(event.data);
                        currentType = msg.type || '';
                        if (handlers[msg.method]) {
                            handlers[msg.method](ws, msg.params);
                        }
                    };
                    ws.onclose = () => {
                        ws = null;
                        log('websocket closed~');
                    };
                }
                const sendMessage = function (ws, options) {
                    const type = options.type || currentType;
                    const method = options.method || 'ignore';
                    const params = options.params || {};
                    ws.send(JSON.stringify({
                        type, method, params
                    }));
                };

                let isWebPlatform = __GLOBAL__.Hummer.pageInfo && JSON.stringify(__GLOBAL__.Hummer.pageInfo) === '{}';
                function run(container, type = 'tenon-vue') {
                    __GLOBAL__.__devReloadTimestamp__ = +new Date();
                    let formatedNode = formatNode(container, type);
                    log('Socket Initializing');
                    const { url } = __GLOBAL__.Hummer.pageInfo || {};
                    if (!url) {
                        error(`get url error, initialization failed`);
                        return;
                    }
                    const { Storage, Memory } = __GLOBAL__;
                    let host = getPartUrlByParam(url, 'host');
                    let port = getPartUrlByParam(url, 'port');
                    let path = getPartUrlByParam(url, 'path');
                    let scheme = getPartUrlByParam(url, 'scheme');
                    if (!['http', 'https'].includes(scheme) || !port) {
                        error(`invalid url[${url}], initialization failed`);
                        return;
                    }
                    let wsTenonUrl = `ws://${host}:${port}/proxy/tenon`;
                    if (isWebPlatform) {
                        wsTenonUrl = 'ws://172.23.166.43:8000/proxy/tenon';
                    }
                    let viewMap = {}, viewId, view;
                    const onSocketMsgHandlers = {
                        'getViewTree': function (ws, params) {
                            var _a;
                            let data = getViewData(formatedNode, type);
                            viewMap = data.viewMap;
                            if ((_a = formatedNode === null || formatedNode === void 0 ? void 0 : formatedNode.element) === null || _a === void 0 ? void 0 : _a.dbg_getDescription) {
                                formatedNode.element.dbg_getDescription((node) => {
                                    sendMessage(ws, {
                                        method: 'setViewTree',
                                        params: Object.assign(Object.assign({}, params), { viewTree: [data.simpleRoot], path: path, baseInfo: __GLOBAL__.Hummer.env, devToolType: type })
                                    });
                                });
                            }
                            else {
                                sendMessage(ws, {
                                    method: 'setViewTree',
                                    params: Object.assign(Object.assign({}, params), { viewTree: [data.simpleRoot], path: path, baseInfo: __GLOBAL__.Hummer.env, devToolType: type })
                                });
                            }
                        },
                        'getViewInfo': function (ws, params) {
                            viewId = params.viewId;
                            view = viewMap[viewId];
                            view.element.getRect((rect) => {
                                view.element.dbg_highlight && view.element.dbg_highlight(true);
                                sendMessage(ws, {
                                    method: 'setViewInfo',
                                    params: Object.assign(Object.assign({}, params), { rect: rect, style: view.style, className: view.className || '' })
                                });
                            });
                        },
                        'setViewStyle': function (ws, params) {
                            viewId = params.viewId;
                            view = viewMap[viewId];
                            const style = params.style;
                            view.element.style = updateOptions(view.style, style);
                            sendMessage(ws, { method: 'setStyleSuccess' });
                        },
                        'setStorage': function (ws, params) {
                            const { type, key, value } = params.storage;
                            switch (type) {
                                case 'delete':
                                    Storage.remove(key);
                                    break;
                                case 'revise':
                                    Storage.set(key, value);
                                    break;
                            }
                            sendMessage(ws, { method: 'setStorageSuccess' });
                        },
                        'getStorage': function (ws, params) {
                            Memory.set("_#_hummer_tenonIp_#_", params === null || params === void 0 ? void 0 : params.tenonIp);
                            getAllStorage(ws, params);
                        },
                        'setMemory': function (ws, params) {
                            const { type, key, value } = params.memory;
                            switch (type) {
                                case 'delete':
                                    Memory.remove(key);
                                    break;
                                case 'revise':
                                    Memory.set(key, value);
                                    break;
                            }
                            sendMessage(ws, { method: 'setMemorySuccess' });
                        },
                        'getMemory': function (ws, params) {
                            Memory.set("_#_hummer_tenonIp_#_", params === null || params === void 0 ? void 0 : params.tenonIp);
                            getAllMemory(ws, params);
                        },
                    };
                    initSocket(wsTenonUrl, onSocketMsgHandlers);
                    log('Socket initializing complete');
                }


                //# sourceMappingURL=tenon-dev-tool.es.js.map


                /***/ })

            /******/ 	});
        /************************************************************************/
        /******/ 	// The module cache
        /******/ 	var __webpack_module_cache__ = {};
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {
            /******/ 		// Check if module is in cache
            /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
            /******/ 		if (cachedModule !== undefined) {
                /******/ 			return cachedModule.exports;
                /******/ 		}
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = __webpack_module_cache__[moduleId] = {
                /******/ 			// no module.id needed
                /******/ 			// no module.loaded needed
                /******/ 			exports: {}
                /******/ 		};
            /******/
            /******/ 		// Execute the module function
            /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/ 	}
        /******/
        /************************************************************************/
        /******/ 	/* webpack/runtime/define property getters */
        /******/ 	(() => {
            /******/ 		// define getter functions for harmony exports
            /******/ 		__webpack_require__.d = (exports, definition) => {
                /******/ 			for(var key in definition) {
                    /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                        /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                        /******/ 				}
                    /******/ 			}
                /******/ 		};
            /******/ 	})();
        /******/
        /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
        /******/ 	(() => {
            /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
            /******/ 	})();
        /******/
        /******/ 	/* webpack/runtime/make namespace object */
        /******/ 	(() => {
            /******/ 		// define __esModule on exports
            /******/ 		__webpack_require__.r = (exports) => {
                /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                    /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                    /******/ 			}
                /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
                /******/ 		};
            /******/ 	})();
        /******/
        /************************************************************************/
        var __webpack_exports__ = {};
        // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
        (() => {
            /*!**************************************************!*\
              !*** ./src/example/DJCircleProgressBar/index.ts ***!
              \**************************************************/
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var _hummer_tenon_dev_tool_dist_tenon_dev_tool_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hummer/tenon-dev-tool/dist/tenon-dev-tool.es */ "./node_modules/@hummer/tenon-dev-tool/dist/tenon-dev-tool.es.js");
            /* harmony import */ var _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @didi/hummer-api */ "./node_modules/@didi/hummer-api/dist/hummer-api.es.js");


            class RootView extends _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.View {
                constructor() {
                    super();
                    this.style = {
                        width: '100%',
                        height: '100%'
                    };
                    this.scroll = new _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.Scroller();
                    this.scroll.style = {
                        width: '388',
                        height: '500'
                    };
                    //    this.scroll.showScrollBar = true;
                    //    this.scroll.bounces = false;

                    for (let i = 0; i < 10; i++) {
                        let item = new _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.Text();
                        item.text = "" + i;
                        item.style = {
                            width: '100%',
                            height: 120,
                            margin: 15,
                            backgroundColor: '#FF000022',
                            textAlign: 'center'
                        };
                        this.scroll.appendChild(item);
                    }

                    // 下拉刷新和加载更多
                    this.page = 1;
                    let pullRefreshCell = new PullRefreshCell();
                    this.scroll.refreshView = pullRefreshCell;
                    this.scroll.onRefresh = state => {
                        console.log("PullRefresh: state = " + state);
                        if (state == 0) {
                            pullRefreshCell.setHint("下拉刷新");
                        } else if (state == 1) {
                            pullRefreshCell.setHint("加载中...");
                            this.page = 1;
                            this.loadData();
                        } else {
                            pullRefreshCell.setHint("加载完成");
                        }
                    };
                    let loadMoreCell = new LoadMoreCell();
                    this.scroll.loadMoreView = loadMoreCell;
                    this.scroll.onLoadMore = state => {
                        console.log("LoadMore: state = " + state);
                        if (state == 1) {
                            loadMoreCell.setHint("加载中...");
                            this.page++;
                            this.loadMore();
                        } else if (state == 3) {
                            loadMoreCell.setHint("没有更多数据");
                        } else if (state == 0) {
                            loadMoreCell.setHint("上拉加载");
                        } else {
                            loadMoreCell.setHint("加载完成");
                        }
                    };
                    this.scroll.addEventListener('scroll', event => {

                    });
                    this.scroll.setOnScrollToTopListener(() => {
                    });
                    this.scroll.setOnScrollToBottomListener(() => {
                    });
                    this.appendChild(this.scroll);

                    // 底部操作按钮
                    let btnLayout = new _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.View();
                    btnLayout.style = {
                        position: 'absolute',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        width: 200,
                        bottom: 0
                    };
                    let btn1 = new _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.Button();
                    btn1.style = {
                        height: 50,
                        flexGrow: 1
                    };
                    btn1.text = "滑到顶部";
                    btn1.addEventListener("tap", event => {
                        this.scroll.scrollToTop();
                    });
                    let btn2 = new _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.Button();
                    btn2.style = {
                        height: 50,
                        flexGrow: 1
                    };
                    btn2.text = "滑到底部";
                    btn2.addEventListener("tap", event => {
                        this.scroll.scrollToBottom();
                    });
                    btnLayout.appendChild(btn1);
                    btnLayout.appendChild(btn2);
                    this.appendChild(btnLayout);
                }
                loadData() {
                    setTimeout(() => {
                        // do something
                        this.scroll.stopPullRefresh();
                    }, 300);
                }
                loadMore() {
                    if (this.page < 1000) {
                        setTimeout(() => {
                            for (let i = 0; i < 10; i++) {
                                let item = new _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.Text();
                                item.text = "" + i;
                                item.style = {
                                    width: '100%',
                                    height: 120,
                                    margin: 15,
                                    backgroundColor: '#FF000022',
                                    textAlign: 'center'
                                };
                                this.scroll.appendChild(item);
                            }
                            this.scroll.stopLoadMore(true);
                            // do something
                        }, 2000);
                    } else {
                        this.scroll.stopLoadMore(false);
                    }
                }
            }
            class PullRefreshCell extends _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.View {
                constructor() {
                    super();
                    this.style = {
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFFF00'
                    };
                    this.textView = new _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.Text();
                    this.textView.text = 'PullRefreshCell';
                    this.appendChild(this.textView);
                }
                setHint(hint) {
                    this.textView.text = hint;
                }
            }
            class LoadMoreCell extends _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.View {
                constructor() {
                    super();
                    this.style = {
                        width: '100%',
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00FF00'
                    };
                    this.textView = new _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.Text();
                    this.textView.text = 'LoadMoreCell';
                    this.appendChild(this.textView);
                }
                setHint(hint) {
                    this.textView.text = hint;
                }
            }
            _didi_hummer_api__WEBPACK_IMPORTED_MODULE_1__.Hummer.render(new RootView());
            setTimeout(() => {
                try {
                    __GLOBAL__.Hummer.getRootView().dbg_getDescription(res => {
                        (0,_hummer_tenon_dev_tool_dist_tenon_dev_tool_es__WEBPACK_IMPORTED_MODULE_0__.run)(res, 'hummer');
                    }, 0);
                } catch (e) {
                    console.log('[DEVTOOL]: fail to get tree view');
                }
            }, 0);
        })();

        /******/ })()
    ;
    //# sourceMappingURL=http://172.23.144.224:8000/DJCircleProgressBar.js.map
}