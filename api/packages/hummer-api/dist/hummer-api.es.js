const { document: _Document$2 } = __Hummer__;
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
    getThis() {
        return this.obj;
    }
    call(methodName, ...args) {
        return this.obj.invoke(methodName, ...args);
    }
}

__Hummer__;
class EventTarget extends HMObject {
    constructor(tag, isApi = true, props) {
        super(tag, isApi, props);
        this.envents = new Map();
    }
    onRecieveEvent(eventName, event) {
        this.dispatchEvent(eventName, event);
    }
    onHandleRecieveEvent(eventName, event) {
        return event;
    }
    bindEventTarget() {
        this.obj.setEventTarget((eventName, event) => {
            this.onRecieveEvent(eventName, event);
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
        else {
            console.log("未找到事件处理器");
        }
    }
    addEventListener(eventName, eventLisener, useCapture) {
        var listeners = this.envents.get(eventName);
        if (listeners == undefined) {
            listeners = new Array();
            this.envents.set(eventName, listeners);
        }
        listeners.push(eventLisener);
        this._addEventListener(eventName);
    }
    _addEventListener(eventName) {
        this.obj.addEventListener(eventName);
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
                else {
                    console.log("未找到指定对象");
                }
            }
            this._removeEventListener(eventName);
        }
    }
    _removeEventListener(eventName) {
        this.obj.removeEventListener(eventName);
    }
}

__Hummer__;
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

__Hummer__;
class Element extends Node {
    constructor(tag, name = tag, props = undefined) {
        super(tag, name, props);
        this._attributes = {};
        this._style = {};
    }
    setAttribute(key, value) {
        this._setAttribute(key, value);
    }
    _setAttribute(key, value) {
        this._attributes[key] = value;
        this.obj.setAttributes({ [key]: value });
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
    dbg_getDescription(callback, id) {
        console.log("dbg_getDescription()");
    }
}

const { document: _Document$1, proxy: _Proxy } = __Hummer__;
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
        this.globalProxy = undefined;
        this.bindEventTarget();
        this.__view_id = __view_id;
        if (_Proxy && _Proxy.globalProxy) {
            this.globalProxy = _Proxy.globalProxy;
        }
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
        console.warn('非text元素不支持');
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
    onHandleRecieveEvent(eventName, event) {
        if (this.globalProxy) {
            return this.globalProxy.onHandleRecieveEvent(this, event);
        }
        return super.onHandleRecieveEvent(eventName, event);
    }
}

__Hummer__;
class View extends HummerElement {
    constructor(id = "", name = "", props = {}) {
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

__Hummer__;
class Text extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Text", name, Object.assign(Object.assign({}, props), { viewId: id }));
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

__Hummer__;
class Image extends HummerElement {
    constructor(id = "", name = "", props = {}) {
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

__Hummer__;
class Input extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Input", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._text = "";
        this._placeholder = "";
        this._focused = false;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this._setAttribute("text", value);
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this._setAttribute("placeholder", value);
    }
    get focused() {
        return this._focused;
    }
    set focused(value) {
        this._focused = value;
        this._setAttribute("focused", value);
    }
}

__Hummer__;
class TextArea extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("TextArea", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._text = "";
        this._placeholder = "";
        this._focused = false;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this._setAttribute("text", value);
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this._setAttribute("placeholder", value);
    }
    get focused() {
        return this._focused;
    }
    set focused(value) {
        this._focused = value;
        this._setAttribute("focused", value);
    }
}

__Hummer__;
class HummerComponent extends EventTarget {
    constructor(tag, props) {
        super(tag, true, props);
    }
}

class HummerApi extends HummerComponent {
    constructor(props = {}) {
        super("Hummer", props);
    }
    static newInstance() {
        return new HummerApi();
    }
    static checkInstance() {
        if (!HummerApi.instance) {
            HummerApi.instance = HummerApi.newInstance();
        }
    }
    static getEnv() {
        HummerApi.checkInstance();
        return HummerApi.instance.getEnv();
    }
    getEnv() {
        return this.call("getEnv");
    }
}

const { document: _Document } = __Hummer__;
class Hummer {
    static initGlobal() {
    }
    static get Env() {
        return HummerApi.getEnv();
    }
    static render(element) {
        Hummer.initGlobal();
        Hummer.rootElement = element;
        _Document.render(element.getThis());
    }
    static createElement(tag) {
        switch (tag) {
            case "view":
                return new View();
            case "text":
                return new Text();
            case "image":
                return new Image();
            case "input":
                return new Input();
            case "textarea":
                return new TextArea();
        }
        return undefined;
    }
    static getRootView() {
        return Hummer.rootElement;
    }
}
Hummer.rootElement = undefined;

__Hummer__;
class BasicAnimation {
}

__Hummer__;
class KeyframeAnimation {
}

__Hummer__;
class Button extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Button", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._text = "";
        this._pressed = {};
        this._disabled = {};
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this._setAttribute("text", value);
    }
    get pressed() {
        return this._pressed;
    }
    set pressed(value) {
        this._pressed = value;
        this._setAttribute("placeholder", value);
    }
    get focused() {
        return this._disabled;
    }
    set focused(value) {
        this._disabled = value;
        this._setAttribute("disabled", value);
    }
}

__Hummer__;
class Scroller extends HummerElement {
    constructor(id = "", name = "", props = {}) {
        super("Scroller", name, Object.assign(Object.assign({}, props), { viewId: id }));
        this._bounces = true;
        this._showScrollBar = false;
        this._onLoadMore = () => { };
        this._onRefresh = () => { };
        this._refreshView = new View();
        this._loadMoreView = new View();
    }
    get refreshView() {
        return this._refreshView;
    }
    set refreshView(value) {
        this._refreshView = value;
        this._setAttribute("refreshView", value);
    }
    get loadMoreView() {
        return this._loadMoreView;
    }
    set loadMoreView(value) {
        this._loadMoreView = value;
        this._setAttribute("loadMoreView", value);
    }
    get onLoadMore() {
        return this._onLoadMore;
    }
    set onLoadMore(value) {
        this._onLoadMore = value;
        this._setAttribute("onLoadMore", value);
    }
    get onRefresh() {
        return this._onRefresh;
    }
    set onRefresh(value) {
        this._onRefresh = value;
        this._setAttribute("onRefresh", value);
    }
    get bounces() {
        return this._bounces;
    }
    set bounces(value) {
        this._bounces = value;
        this._setAttribute("bounces", value);
    }
    get showScrollBar() {
        return this._showScrollBar;
    }
    set showScrollBar(value) {
        this._showScrollBar = value;
        this._setAttribute("showScrollBar", value);
    }
    appendChild(child) {
        this.call("appendChild", child);
    }
    removeChild(child) {
        this.call("removeChild", child);
    }
    removeAll() {
        this.call("removeAll");
    }
    insertBefore(child, existingChild) {
        this.call("insertBefore", child, existingChild);
    }
    replaceChild(newChild, oldChild) {
        this.call("replaceChild", newChild, oldChild);
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
        this.call("setOnScrollToTopListener", callback);
    }
    setOnScrollToBottomListener(callback) {
        this.call("setOnScrollToBottomListener", callback);
    }
    stopPullRefresh() {
        this.call("stopPullRefresh");
    }
    stopLoadMore(enable) {
        this.call("stopLoadMore", enable);
    }
}

__Hummer__;
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
        Memory.instance.exist(key, cb);
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
        this.call("exist", key, cb);
    }
}

__Hummer__;
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

__Hummer__;
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
    static set(key, value, cb) {
        Storage.checkInstance();
        Storage.instance.set(key, value, cb);
    }
    static get(key, cb) {
        Storage.checkInstance();
        return Storage.instance.get(key, cb);
    }
    static remove(key, cb) {
        Storage.checkInstance();
        Storage.instance.remove(key, cb);
    }
    static removeAll(cb) {
        Storage.checkInstance();
        Storage.instance.removeAll(cb);
    }
    static exist(key, cb) {
        Storage.checkInstance();
        Storage.instance.exist(key, cb);
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
        this.call("exist", key, cb);
    }
}

class NotifyCenter extends HummerComponent {
    constructor(props = {}) {
        super("NotifyCenter", props);
    }
    static newInstance() {
        return new NotifyCenter();
    }
    static checkInstance() {
        if (!NotifyCenter.instance) {
            NotifyCenter.instance = NotifyCenter.newInstance();
        }
    }
    addEventListener(event, callback) {
        NotifyCenter.checkInstance();
        NotifyCenter.instance.__addEventListener(event, callback);
    }
    removeEventListener(event, callback) {
        NotifyCenter.checkInstance();
        return NotifyCenter.instance.__removeEventListener(event, callback);
    }
    triggerEvent(event, value) {
        NotifyCenter.checkInstance();
        NotifyCenter.instance.__triggerEvent(event, value);
    }
    __addEventListener(event, callback) {
        this.call("addEventListener", event, callback);
    }
    __removeEventListener(event, callback) {
        return this.call("removeEventListener", event, callback);
    }
    __triggerEvent(event, value) {
        this.call("triggerEvent", event, value);
    }
}

__GLOBAL__.Hummer = {
    getRootView() {
        return Hummer.getRootView();
    }
};

export { BasicAnimation, Button, Canvas, Element, EventTarget, HMObject, Hummer, HummerComponent, HummerElement, Image, Input, KeyframeAnimation, Memory, Navigator, Node, NotifyCenter, Scroller, Storage, Text, TextArea, View };
//# sourceMappingURL=hummer-api.es.js.map
