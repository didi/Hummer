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

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/concat.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/concat.js ***!
  \************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


__webpack_require__(/*! ../../../modules/es.array.concat */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.concat.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('Array', 'concat');


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/splice.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/splice.js ***!
  \************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


__webpack_require__(/*! ../../../modules/es.array.splice */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.splice.js");
var getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in-prototype-method.js");

module.exports = getBuiltInPrototypeMethod('Array', 'splice');


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/concat.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/concat.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../array/virtual/concat */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/concat.js");

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.concat;
  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.concat) ? method : own;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/splice.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/splice.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../array/virtual/splice */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/splice.js");

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.splice;
  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.splice) ? method : own;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js ***!
  \*********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-method-has-species-support.js":
/*!*******************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-method-has-species-support.js ***!
  \*******************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-set-length.js":
/*!***************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-set-length.js ***!
  \***************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-constructor.js":
/*!************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-constructor.js ***!
  \************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isArray = __webpack_require__(/*! ../internals/is-array */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-constructor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-create.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-create.js ***!
  \*******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var arraySpeciesConstructor = __webpack_require__(/*! ../internals/array-species-constructor */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-constructor.js");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js ***!
  \******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js":
/*!*****************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js ***!
  \*****************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js":
/*!*************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js ***!
  \*************************************************************************************************************************************************/
/***/ ((module) => {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property.js":
/*!**************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property.js ***!
  \**************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-global-property.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-global-property.js ***!
  \*********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/delete-property-or-throw.js":
/*!***********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/delete-property-or-throw.js ***!
  \***********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js");

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-create-element.js":
/*!**********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-create-element.js ***!
  \**********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js":
/*!***************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js ***!
  \***************************************************************************************************************************************************/
/***/ ((module) => {


var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-user-agent.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-user-agent.js ***!
  \****************************************************************************************************************************************/
/***/ ((module) => {


module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-v8-version.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-v8-version.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js ***!
  \*****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-apply.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-descriptor.js").f);
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-forced.js");
var path = __webpack_require__(/*! ../internals/path */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-context.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
// add debugging info
__webpack_require__(/*! ../internals/shared-store */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js");

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof Wrapper) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return apply(NativeConstructor, this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : global[TARGET] && global[TARGET].prototype;

  var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (!FORCED && !PROTO && typeof targetProperty == typeof sourceProperty) continue;

    // bind methods to global for calling from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changes in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && isCallable(sourceProperty)) resultProperty = uncurryThis(sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    createNonEnumerableProperty(target, key, resultProperty);

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!hasOwn(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty);
      // export real prototype methods
      if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js":
/*!****************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js ***!
  \****************************************************************************************************************************/
/***/ ((module) => {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-apply.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-apply.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-context.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-context.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js");
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js ***!
  \*******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js ***!
  \************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-clause.js":
/*!***************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-clause.js ***!
  \***************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in-prototype-method.js":
/*!****************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in-prototype-method.js ***!
  \****************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var path = __webpack_require__(/*! ../internals/path */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js");

module.exports = function (CONSTRUCTOR, METHOD) {
  var Namespace = path[CONSTRUCTOR + 'Prototype'];
  var pureMethod = Namespace && Namespace[METHOD];
  if (pureMethod) return pureMethod;
  var NativeConstructor = global[CONSTRUCTOR];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  return NativePrototype && NativePrototype[METHOD];
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var path = __webpack_require__(/*! ../internals/path */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");

var aFunction = function (variable) {
  return isCallable(variable) ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-method.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-method.js ***!
  \*********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js ***!
  \*****************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js":
/*!***************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js ***!
  \***************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ie8-dom-define.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ie8-dom-define.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-create-element.js");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/indexed-object.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/indexed-object.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/inspect-source.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/inspect-source.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js ***!
  \**********************************************************************************************************************************/
/***/ ((module) => {


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-constructor.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-constructor.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/inspect-source.js");

var noop = function () { /* empty */ };
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-forced.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-forced.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js ***!
  \*******************************************************************************************************************************************/
/***/ ((module) => {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-pure.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-pure.js ***!
  \******************************************************************************************************************************/
/***/ ((module) => {


module.exports = true;


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-symbol.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-symbol.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js ***!
  \*******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toLength = __webpack_require__(/*! ../internals/to-length */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/math-trunc.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/math-trunc.js ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ie8-dom-define.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/v8-prototype-define-bug.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-property-key.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-descriptor.js":
/*!*********************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-descriptor.js ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js ***!
  \*********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-property-is-enumerable.js":
/*!****************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-property-is-enumerable.js ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ordinary-to-primitive.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ordinary-to-primitive.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js":
/*!***************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js ***!
  \***************************************************************************************************************************/
/***/ ((module) => {


module.exports = {};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/require-object-coercible.js":
/*!***********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/require-object-coercible.js ***!
  \***********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js");

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-pure.js");
var globalThis = __webpack_require__(/*! ../internals/global */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-global-property.js");

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.36.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared.js ***!
  \*****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var store = __webpack_require__(/*! ../internals/shared-store */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js");

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/symbol-constructor-detection.js":
/*!***************************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/symbol-constructor-detection.js ***!
  \***************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-absolute-index.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-absolute-index.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js ***!
  \*********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var trunc = __webpack_require__(/*! ../internals/math-trunc */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/math-trunc.js");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-length.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-length.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/require-object-coercible.js");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-primitive.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-primitive.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-property-key.js":
/*!**************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-property-key.js ***!
  \**************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string-tag-support.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string-tag-support.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js ***!
  \************************************************************************************************************************************/
/***/ ((module) => {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/uid.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/uid.js ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/use-symbol-as-uid.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/use-symbol-as-uid.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/symbol-constructor-detection.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/v8-prototype-define-bug.js":
/*!**********************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/v8-prototype-define-bug.js ***!
  \**********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/symbol-constructor-detection.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.concat.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.concat.js ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js");
var doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-create.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-method-has-species-support.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-v8-version.js");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.splice.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.splice.js ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-absolute-index.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js");
var setArrayLength = __webpack_require__(/*! ../internals/array-set-length */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-set-length.js");
var doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-create.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property.js");
var deletePropertyOrThrow = __webpack_require__(/*! ../internals/delete-property-or-throw */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/delete-property-or-throw.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    setArrayLength(O, len - actualDeleteCount + insertCount);
    return A;
  }
});


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/concat.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/concat.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var parent = __webpack_require__(/*! ../../es/instance/concat */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/concat.js");

module.exports = parent;


/***/ }),

/***/ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/splice.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/splice.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var parent = __webpack_require__(/*! ../../es/instance/splice */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/splice.js");

module.exports = parent;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/*!********************************!*\
  !*** ./src/Comp_View_Child.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/splice.js */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/splice.js");
/* harmony import */ var _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_concat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/concat.js */ "../../../../../.nvm/versions/node/v16.20.0/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/concat.js");
/* harmony import */ var _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_concat_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_concat_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hummer_tenon_dev_tool_dist_tenon_dev_tool_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hummer/tenon-dev-tool/dist/tenon-dev-tool.es */ "./node_modules/@hummer/tenon-dev-tool/dist/tenon-dev-tool.es.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());




class RootView extends Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
  constructor() {
    super();
    this.style = {
      width: '100%',
      height: '100%',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10
    };
    this.testChild();
  }
  testChild() {
    let childViews = new Array();
    this.viewId = 0;
    let titleView = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    titleView.text = 'View - 动态添加和删除子View';
    titleView.style = {
      color: '#333333',
      fontSize: 16
    };
    let viewLayout = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    viewLayout.style = {
      flexDirection: 'row',
      padding: 5,
      borderWidth: 1,
      borderColor: '#22222222',
      flexWrap: 'wrap'
    };
    let view = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view.style = {
      width: 60,
      height: 60,
      backgroundColor: '#FF0000',
      margin: 5
    };
    let btnLayout = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    btnLayout.style = {
      flexDirection: 'row',
      marginTop: 10,
      flexWrap: 'wrap'
    };

    // appendChild
    let btnAppendChild = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    btnAppendChild.text = 'appendChild';
    btnAppendChild.style = {
      width: 110,
      height: 40
    };
    btnAppendChild.addEventListener('tap', event => {
      // let text = this.makeTextView(childViews);
      viewLayout.appendChild(null);
      childViews.push(text);
      this.printViewIds(viewIdsText, childViews);
    });

    // removeChild
    let btnRemoveChild = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    btnRemoveChild.text = 'removeChild';
    btnRemoveChild.style = {
      width: 110,
      height: 40
    };
    btnRemoveChild.addEventListener('tap', event => {
      viewLayout.removeChild(childViews[0]);
      childViews.shift();
      this.printViewIds(viewIdsText, childViews);
    });

    // insertBefore
    let btnInsertBefore = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    btnInsertBefore.text = 'insertBefore';
    btnInsertBefore.style = {
      width: 110,
      height: 40
    };
    btnInsertBefore.addEventListener('tap', event => {
      let text = this.makeTextView(childViews);
      viewLayout.insertBefore(text, childViews[1]);
      _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_2___default()(childViews).call(childViews, 1, 0, text);
      this.printViewIds(viewIdsText, childViews);
    });

    // replaceChild
    let btnReplaceChild = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    btnReplaceChild.text = 'replaceChild';
    btnReplaceChild.style = {
      width: 110,
      height: 40
    };
    btnReplaceChild.addEventListener('tap', event => {
      let text = this.makeTextView(childViews);
      viewLayout.replaceChild(text, childViews[1]);
      _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_2___default()(childViews).call(childViews, 1, 1, text);
      this.printViewIds(viewIdsText, childViews);
    });

    // removeAll
    let btnRemoveAll = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    btnRemoveAll.text = 'removeAll';
    btnRemoveAll.style = {
      width: 110,
      height: 40
    };
    btnRemoveAll.addEventListener('tap', event => {
      viewLayout.removeAll();
      _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_2___default()(childViews).call(childViews, 0, childViews.length);
      this.printViewIds(viewIdsText, childViews);
    });

    // removeAll
    let btnGetElementById = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    btnGetElementById.text = 'getElementById';
    btnGetElementById.style = {
      width: 130,
      height: 40
    };
    btnGetElementById.addEventListener('tap', event => {
      let lastViewId = this.viewId - 1;
      let lastChild = viewLayout.getElementById('' + lastViewId);
      viewIdsText.text = 'lastChild.text = ' + lastChild.text + ", viewId = " + lastViewId;
    });
    let viewIdsText = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    viewIdsText.style = {
      margin: 5
    };
    viewLayout.appendChild(view);
    btnLayout.appendChild(btnAppendChild);
    btnLayout.appendChild(btnRemoveChild);
    btnLayout.appendChild(btnInsertBefore);
    btnLayout.appendChild(btnReplaceChild);
    btnLayout.appendChild(btnRemoveAll);
    btnLayout.appendChild(btnGetElementById);
    this.appendChild(titleView);
    this.appendChild(viewLayout);
    this.appendChild(btnLayout);
    this.appendChild(viewIdsText);
  }
  makeTextView(childViews) {
    let text = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('' + this.viewId);
    text.style = {
      width: 60,
      height: 60,
      backgroundColor: '#0000FF',
      margin: 5,
      color: '#FFFFFF',
      textAlign: 'center'
    };
    text.text = '' + this.viewId++;
    return text;
  }
  printViewIds(viewIdsText, childViews) {
    let str = 'viewId array: [';
    childViews.forEach((child, index) => {
      str = _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_concat_js__WEBPACK_IMPORTED_MODULE_3___default()(str).call(str, child.text);
      if (index < childViews.length - 1) {
        str = _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_concat_js__WEBPACK_IMPORTED_MODULE_3___default()(str).call(str, ', ');
      }
    });
    str = _Users_didi_nvm_versions_node_v16_20_0_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_concat_js__WEBPACK_IMPORTED_MODULE_3___default()(str).call(str, ']');
    viewIdsText.text = str;
  }
}
Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).render(new RootView());
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
//# sourceMappingURL=http://172.23.145.60:8000/Comp_View_Child.js.map