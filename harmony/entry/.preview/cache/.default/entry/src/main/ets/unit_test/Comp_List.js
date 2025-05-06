export function renderFunc(__Hummer__, __GLOBAL__) {
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!**************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createSuper.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createSuper.js ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createSuper)
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js");
/* harmony import */ var _possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./possibleConstructorReturn.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");



function _createSuper(Derived) {
  var hasNativeReflectConstruct = (0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  return function _createSuperInternal() {
    var Super = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0,_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, result);
  };
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!**************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js":
/*!************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js ***!
  \************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeReflectConstruct)
/* harmony export */ });
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!*************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \*************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!**************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/typeof.js");

function _toPrimitive(input, hint) {
  if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function _toPropertyKey(arg) {
  var key = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arg, "string");
  return (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key) === "symbol" ? key : String(key);
}

/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

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
/*!**************************!*\
  !*** ./src/Comp_List.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createClass.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/inherits.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createSuper.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _hummer_tenon_dev_tool_dist_tenon_dev_tool_es__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @hummer/tenon-dev-tool/dist/tenon-dev-tool.es */ "./node_modules/@hummer/tenon-dev-tool/dist/tenon-dev-tool.es.js");





var TYPE_TITLE = 1;
var TYPE_ITEM = 2;
var ITEM_COUNT = 20;
var stextView = new Text();
var RootView = /*#__PURE__*/function (_View) {
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__["default"])(RootView, _View);
  var _super = (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(RootView);
  function RootView() {
    var _this;
    (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, RootView);
    _this = _super.call(this);
    _this.style = {
      width: '100%',
      height: '100%'
    };
    _this.listView = new List();
    _this.listView.style = {
      width: '100%',
      height: '50%',
      mode: "list",
      // mode: "grid",
      // mode: "waterfall",
      // column: 4,
      // scrollDirection: "vertical",
      // scrollDirection: "horizontal",
      lineSpacing: 14,
      itemSpacing: 7,
      topSpacing: 10,
      leftSpacing: 10,
      rightSpacing: 10,
      bottomSpacing: 10
    };
    //        this.listView.showScrollBar = true;
    //        this.listView.bounces = false;

    _this.listView.onRegister = function (position) {
      console.log("TypeCallback: position = " + position);
      if (position % 2 === 0) {
        return TYPE_TITLE;
      } else {
        return TYPE_ITEM;
      }
    };
    _this.listView.onCreate = function (type) {
      console.log("CreateCallback: type = " + type);
      if (type === TYPE_TITLE) {
        return new TitleCell();
      } else {
        return new ItemCell();
      }
    };
    _this.listView.onUpdate = function (position, cell) {
      console.log("UpdateCallback: position = " + position + ", cell = " + cell);
      if (cell instanceof ItemCell) {
        cell.refresh(position);
      }
    };

    // 下拉刷新和加载更多
    _this.page = 1;
    var pullRefreshCell = new PullRefreshCell();
    _this.listView.refreshView = pullRefreshCell;
    _this.listView.onRefresh = function (state) {
      console.log("PullRefresh: state = " + state);
      if (state == 1) {
        pullRefreshCell.setHint("下拉刷新");
      } else if (state == 2) {
        pullRefreshCell.setHint("加载中...");
        _this.page = 1;
        _this.loadData();
      } else {
        pullRefreshCell.setHint("加载完成");
      }
    };
    var loadMoreCell = new LoadMoreCell();
    _this.listView.loadMoreView = loadMoreCell;
    _this.listView.onLoadMore = function (state) {
      console.log("LoadMore: state = " + state);
      if (state == 1) {
        loadMoreCell.setHint("加载中...");
        _this.page++;
        _this.loadMore();
      } else if (state == 2) {
        loadMoreCell.setHint("没有更多数据");
      } else {
        loadMoreCell.setHint("加载完成");
      }
    };
    _this.listView.addEventListener('scroll', function (event) {
      console.log('state = ' + event.state);
      console.log('offsetX = ' + event.offsetX);
      console.log('offsetY = ' + event.offsetY);
      console.log('dx = ' + event.dx);
      console.log('dy = ' + event.dy);
    });
    _this.appendChild(_this.listView);
    stextView.text = "~ Hello Hummer ~";
    stextView.style = {
      width: 100,
      height: 100,
      fontSize: 20,
      color: '#000000'
    };
    _this.appendChild(stextView);
    _this.loadData();
    return _this;
  }
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RootView, [{
    key: "loadData",
    value: function loadData() {
      var _this2 = this;
      setTimeout(function () {
        _this2.listView.refresh(ITEM_COUNT);
        _this2.listView.stopPullRefresh();
      }, 300);
    }
  }, {
    key: "loadMore",
    value: function loadMore() {
      var _this3 = this;
      if (this.page < 1000) {
        setTimeout(function () {
          _this3.listView.stopLoadMore(true);
          _this3.listView.refresh(ITEM_COUNT * _this3.page);
        }, 300);
      } else {
        this.listView.stopLoadMore(false);
      }
    }
  }]);
  return RootView;
}(View);
var TitleCell = /*#__PURE__*/function (_View2) {
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__["default"])(TitleCell, _View2);
  var _super2 = (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(TitleCell);
  function TitleCell() {
    var _this4;
    (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, TitleCell);
    _this4 = _super2.call(this);
    _this4.style = {
      backgroundColor: '#dddddd'
    };
    var textView = new Text();
    textView.style = {
      height: 30
    };
    textView.text = 'Title';
    _this4.appendChild(textView);
    return _this4;
  }
  return (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__["default"])(TitleCell);
}(View);
var ItemCell = /*#__PURE__*/function (_View3) {
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__["default"])(ItemCell, _View3);
  var _super3 = (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(ItemCell);
  function ItemCell() {
    var _this5;
    (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ItemCell);
    _this5 = _super3.call(this);
    _this5.style = {
      backgroundColor: '#FF000022'
    };
    _this5.textView = new Text();
    _this5.textView.style = {
      height: 80,
      textAlign: "center"
    };
    var lineView = new View();
    lineView.style = {
      width: '100%',
      height: 0.3,
      backgroundColor: '#999999'
    };
    _this5.appendChild(_this5.textView);
    // this.appendChild(lineView);

    // let isIntercepted = false;
    // this.addEventListener('pan', event => {
    //     if (event.state == 1) {
    //         console.log("event: start");
    //         isIntercepted = false;
    //     } else if (event.state == 2) {
    //         console.log("event: ", event);
    //         console.log("偏移量: ", event.translation.deltaX);

    //         if (Math.abs(event.translation.deltaX) > 3 && !isIntercepted) {
    //             isIntercepted = true;
    //             requestDisallowInterceptTouchEvent(this, true);
    //         }
    //     } else if (event.state == 3) {
    //         console.log("event: end");
    //         isIntercepted = false;
    //     }
    // })

    stextView.text = 's';
    // stextView.style = {
    //     width: 111,
    // }
    return _this5;
  }
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ItemCell, [{
    key: "refresh",
    value: function refresh(position) {
      this.textView.text = position.toString();

      // this.feeInput.text = ''

      // stextView.text = 's';
    }
  }]);
  return ItemCell;
}(View);
var PullRefreshCell = /*#__PURE__*/function (_View4) {
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PullRefreshCell, _View4);
  var _super4 = (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(PullRefreshCell);
  function PullRefreshCell() {
    var _this6;
    (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, PullRefreshCell);
    _this6 = _super4.call(this);
    _this6.style = {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFF00'
    };
    _this6.textView = new Text();
    _this6.textView.text = 'PullRefreshCell';
    _this6.appendChild(_this6.textView);
    return _this6;
  }
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PullRefreshCell, [{
    key: "setHint",
    value: function setHint(hint) {
      this.textView.text = hint;
    }
  }]);
  return PullRefreshCell;
}(View);
var LoadMoreCell = /*#__PURE__*/function (_View5) {
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__["default"])(LoadMoreCell, _View5);
  var _super5 = (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(LoadMoreCell);
  function LoadMoreCell() {
    var _this7;
    (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, LoadMoreCell);
    _this7 = _super5.call(this);
    _this7.style = {
      width: '100%',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00FF00'
    };
    _this7.textView = new Text();
    _this7.textView.text = 'LoadMoreCell';
    _this7.appendChild(_this7.textView);
    return _this7;
  }
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__["default"])(LoadMoreCell, [{
    key: "setHint",
    value: function setHint(hint) {
      this.textView.text = hint;
    }
  }]);
  return LoadMoreCell;
}(View);
Hummer.render(new RootView());
setTimeout(function () {
  __GLOBAL__.Hummer.getRootView().dbg_getDescription(function (res) {
    console.log(res);
    (0,_hummer_tenon_dev_tool_dist_tenon_dev_tool_es__WEBPACK_IMPORTED_MODULE_4__.run)(res, 'hummer');
  }, 0);
}, 0);
})();

/******/ })()
;
//# sourceMappingURL=http://172.23.161.208:8000/Comp_List.js.map
}
