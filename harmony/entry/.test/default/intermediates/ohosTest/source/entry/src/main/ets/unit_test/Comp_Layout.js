export function renderFunc(__Hummer__, __GLOBAL__) {
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@hummer/tenon-dev-tool/dist/tenon-dev-tool.es.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@hummer/tenon-dev-tool/dist/tenon-dev-tool.es.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../../packages/hummer-api/dist/hummer-api.es.js":
/*!*******************************************************!*\
  !*** ../../packages/hummer-api/dist/hummer-api.es.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BasicAnimation: () => (/* binding */ BasicAnimation),
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   Canvas: () => (/* binding */ Canvas),
/* harmony export */   Dialog: () => (/* binding */ Dialog),
/* harmony export */   Element: () => (/* binding */ Element),
/* harmony export */   EventTarget: () => (/* binding */ EventTarget),
/* harmony export */   HMObject: () => (/* binding */ HMObject),
/* harmony export */   HMXIDiDiMapView: () => (/* binding */ HMXIDiDiMapView),
/* harmony export */   HMXIMapMarker: () => (/* binding */ HMXIMapMarker),
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
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_map_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/map/index.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/map/index.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_map_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_map_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/splice.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/splice.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_set_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/set/index.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/set/index.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_set_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_set_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/slice.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/slice.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_slice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_slice_js__WEBPACK_IMPORTED_MODULE_3__);




const {
  document: _Document_$2
} = __Hummer__;
class HMObject {
  constructor(tag, isApi = true, props) {
    this.tag = tag;
    this.name = tag;
    this.isApi = isApi;
    this.props = props;
    if (isApi) {
      this.obj = _Document_$2.createComponent(tag, props);
    } else {
      this.obj = _Document_$2.createElement(tag, props);
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
    this.envents = new (_usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_map_index_js__WEBPACK_IMPORTED_MODULE_0___default())();
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
      listeners.forEach(lisener => {
        if (lisener instanceof Function) {
          lisener.call(this, event);
        } else {
          lisener.onEvent(event);
        }
      });
    } else {
      console.log("未找到事件处理器");
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
        _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_1___default()(listeners).call(listeners, 0, listeners.length);
        this.envents.delete(eventName);
        this._removeEventListener(eventName);
      } else {
        const index = listeners.indexOf(eventListener);
        if (index > -1) {
          _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_splice_js__WEBPACK_IMPORTED_MODULE_1___default()(listeners).call(listeners, index, 1);
        } else {
          console.log("未找到指定对象");
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
    this.children = new (_usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_set_index_js__WEBPACK_IMPORTED_MODULE_2___default())();
    this.firstChild = null;
    this.lastChild = null;
    this.name = name;
    this.nodeName = nodeName;
  }
  _onMounted() {
    this.onMounted();
  }
  onMounted() {}
  _onDestoryed() {
    this.onDestoryed();
  }
  onDestoryed() {}
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
const AnimationStartName = "__onAnimationStart__";
const AnimationEndName = "__onAnimationEnd__";
class Element extends Node {
  constructor(tag, name = tag, props = undefined) {
    super(tag, name, props);
    this._attributes = {};
    this._style = {};
    this._animationMap = undefined;
  }
  setAttribute(key, value) {
    this._setAttribute(key, value);
  }
  _setAttribute(key, value, update = true) {
    this._attributes[key] = value;
    if (update) {
      this.obj.setAttributes({
        [key]: value
      });
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
    this._addAnimation(animation, key);
  }
  _addAnimation(animation, key = "") {
    let startFunc = animation._startFunc;
    let endFunc = animation._endFunc;
    if (!this.envents.has(key)) {
      this.addEventListener(AnimationStartName, startFunc);
      this.addEventListener(AnimationEndName, endFunc);
    }
    this._animationMap && this._animationMap.set(key, animation);
    this.obj.addAnimation(animation, key);
  }
  removeAnimationForKey(key) {
    this._removeAnimationForKey(key);
  }
  _removeAnimationForKey(key) {
    let anim = this._animationMap && this._animationMap.get(key);
    if (this.envents.has(key) && anim) {
      this.removeEventListener(AnimationStartName, anim._startFunc);
      this.removeEventListener(AnimationEndName, anim._endFunc);
    }
    this.obj.removeAnimationForKey(key);
  }
  removeAllAnimation() {
    this._removeAllAnimation();
  }
  _removeAllAnimation() {
    this.removeEventListener(AnimationStartName);
    this.removeEventListener(AnimationEndName);
    this._animationMap = undefined;
    this.obj.removeAllAnimation();
  }
  getRect(callback) {
    this.obj.getRect(rect => {
      callback.call(this, rect);
    });
  }
  dbg_getDescription(callback, id) {
    console.log("dbg_getDescription()");
  }
}
const {
  document: _Document_$1,
  proxy: _Proxy_
} = __Hummer__;
let __view_id = 0;
class HummerElement extends Element {
  constructor(tag, name = tag, props) {
    super(tag, name, props);
    this.__scopedIds = new (_usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_set_index_js__WEBPACK_IMPORTED_MODULE_2___default())();
    this.__NAME = null;
    this.__view_id = 0;
    this.dataset = {};
    this.__defaultStyle = {};
    this.__style = {};
    this.__baseStyle = {};
    this.globalProxy = undefined;
    this.bindEventTarget();
    this.__view_id = __view_id;
    if (_Proxy_ && _Proxy_.globalProxy) {
      this.globalProxy = _Proxy_.globalProxy;
    }
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
    } else {
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
    } else {
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
      let dataKey = _usr_local_lib_node_modules_hummer_cli_node_modules_core_js_pure_stable_instance_slice_js__WEBPACK_IMPORTED_MODULE_3___default()(key).call(key, 4).toLowerCase();
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
  onCreate(e) {}
  onAppear() {}
  onDisappear() {}
  onDestroy() {}
  onBack() {}
  get canGoBack() {
    return this._getAttribute('canGoBack');
  }
  set canGoBack(canGoBack) {
    this._setAttribute('canGoBack', canGoBack);
  }
}
class View extends LifeCycleElement {
  constructor(id = "", name = "", props = {}) {
    super("View", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
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
class Text extends HummerElement {
  constructor(id = "", name = "", props = {}) {
    super("Text", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
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
    super("Image", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
    this._initAttributes({
      gifRepeatCount: 0
    });
    this.addEventListener("__onImageLoad__", event => {
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
      this._onLoad(event.srcType, event.state);
    }
  }
  load(source, callback) {
    if (typeof source === 'string') {
      this._setAttribute("src", source);
      this._removeAttribute("gifSrc");
    } else {
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
    super("Input", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
    this.addEventListener('input', event => {
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
class TextArea extends HummerElement {
  constructor(id = "", name = "", props = {}) {
    super("TextArea", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
    this._initAttributes({
      text: '',
      placeholder: '',
      focused: 'false'
    });
    this.addEventListener('input', event => {
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
    } else {
      NotifyCenter.instance.removeEventListener(event, callback);
    }
  }
  static triggerEvent(event, value) {
    NotifyCenter.checkInstance();
    NotifyCenter.instance.call("triggerEvent", event, value);
  }
}
const {
  document: _Document_
} = __Hummer__;
class Hummer {
  static initGlobal() {}
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
  static render(element) {
    Hummer.initGlobal();
    Hummer.rootElement = element;
    _Document_.render(element.getThis());
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
class BasicAnimation {
  constructor(property) {
    this.value = '';
    this.duration = 0;
    this.delay = 0;
    this.repeatCount = 1;
    this.easing = 'ease';
    this.type = 'basic';
    this.property = 'position';
    this._startFunc = () => {};
    this._endFunc = () => {};
    this.property = property;
  }
  _innerFunc(event, callback) {
    switch (event) {
      case 'start':
        this._startFunc = () => {
          callback.call(this, event);
        };
        break;
      case 'end':
        this._endFunc = () => {
          callback.call(this, event);
        };
        break;
    }
  }
  on(event, callback) {
    this._innerFunc(event, callback);
  }
}
class KeyframeAnimation {
  constructor(property) {
    this.keyframes = [{
      percent: 0,
      value: {
        x: 0,
        y: 0
      }
    }, {
      percent: 0.2,
      value: {
        x: 30,
        y: 0
      }
    }, {
      percent: 0.6,
      value: {
        x: 30,
        y: 60
      }
    }, {
      percent: 0.8,
      value: {
        x: 100,
        y: 60
      }
    }, {
      percent: 1.0,
      value: {
        x: 100,
        y: 0
      }
    }];
    this.duration = 0;
    this.delay = 0;
    this.repeatCount = 1;
    this.easing = 'ease';
    this.type = 'keyframe';
    this.property = 'position';
    this._startFunc = () => {};
    this._endFunc = () => {};
    this.property = property;
  }
  _innerFunc(event, callback) {
    switch (event) {
      case 'start':
        this._startFunc = () => {
          callback.call(this, event);
        };
        break;
      case 'end':
        this._endFunc = () => {
          callback.call(this, event);
        };
        break;
    }
  }
  on(event, callback) {
    this._innerFunc(event, callback);
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
    super("List", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
    this._onRegister = undefined;
    this._onCreate = undefined;
    this._onUpdate = undefined;
    this._onRefresh = undefined;
    this._onLoadMore = undefined;
    this.addEventListener("onRegister", event => {
      this.onDispatch("onRegister", event);
    });
    this.addEventListener("onCreate", event => {
      this.onDispatch("onCreate", event);
    });
    this.addEventListener("onUpdate", event => {
      this.onDispatch("onUpdate", event);
    });
    this.addEventListener("onRefresh", event => {
      this.onDispatch("onRefresh", event);
    });
    this.addEventListener("onLoadMore", event => {
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
    let _onCreate = type => {
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
class Button extends HummerElement {
  constructor(id = "", name = "", props = {}) {
    super("Button", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
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
  get disabled() {
    return this._getAttribute("disabled");
  }
  set disabled(value) {
    if (typeof value === "boolean") {
      super.disabled = value;
    } else {
      this._setAttribute("disabled", value);
    }
  }
  setAttribute(key, value) {
    switch (key) {
      case 'disabled':
        if (typeof value === "boolean") {
          super.disabled = value;
        } else {
          this._setAttribute("disabled", value);
        }
        return;
    }
    this._setAttribute(key, value);
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
    super("Scroller", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
    this._onScrollTop = undefined;
    this._onScrollBottom = undefined;
    this._onRefresh = undefined;
    this._onLoadMore = undefined;
    this.addEventListener("onRefresh", event => {
      this.onDispatch("onRefresh", event);
    });
    this.addEventListener("onLoadMore", event => {
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
          this._onRefresh();
        }
        break;
      case "onLoadMore":
        if (this._onLoadMore) {
          this._onLoadMore();
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
    return this._getAttribute("refreshView");
  }
  set refreshView(value) {
    this._setAttribute("refreshView", value);
  }
  get loadMoreView() {
    return this._getAttribute("loadMoreView");
  }
  set loadMoreView(value) {
    this._setAttribute("loadMoreView", value);
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
class Canvas extends HummerElement {
  constructor(id = "", name = "", props = {}) {
    super("Canvas", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
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
class HMXIDiDiMapView extends HummerElement {
  constructor(id = "", name = "", props = {}) {
    super("HMXIDiDiMapView", name, Object.assign(Object.assign({}, props), {
      viewId: id
    }));
    this.addEventListener("__onMapReady__", () => {
      if (this._onMapReadyCallback) {
        this._onMapReadyCallback();
      }
    });
  }
  set center(value) {
    this.call("setCenter", value);
  }
  get center() {
    return this.call("getCenter");
  }
  set padding(value) {
    this._setAttribute("padding", value);
  }
  get padding() {
    return this._getAttribute('padding');
  }
  set zoomLevel(value) {
    this._setAttribute("zoomLevel", value);
  }
  get zoomLevel() {
    return this._getAttribute('zoomLevel');
  }
  set lang(value) {
    this._setAttribute("lang", value);
  }
  get lang() {
    return this._getAttribute('lang');
  }
  set zoomEnable(value) {
    this._setAttribute("zoomEnable", value);
  }
  get zoomEnable() {
    return this._getAttribute('zoomEnable');
  }
  set scrollEnable(value) {
    this._setAttribute("scrollEnable", value);
  }
  get scrollEnable() {
    return this._getAttribute('scrollEnable');
  }
  set rotateEnable(value) {
    this._setAttribute("rotateEnable", value);
  }
  get rotateEnable() {
    return this._getAttribute('rotateEnable');
  }
  set trafficEnable(value) {
    this._setAttribute("trafficEnable", value);
  }
  get trafficEnable() {
    return this._getAttribute('trafficEnable');
  }
  set userLocationEnable(value) {
    this._setAttribute("userLocationEnable", value);
  }
  get userLocationEnable() {
    return this._getAttribute('userLocationEnable');
  }
  setMapReadyCallback(callback) {
    this._onMapReadyCallback = callback;
  }
  getMinZoomLevel() {
    return this.call("getMinZoomLevel");
  }
  getMaxZoomLevel() {
    return this.call("getMaxZoomLevel");
  }
  setCenterOffSetY(offSetY) {
    this.call("setCenterOffSetY", offSetY);
  }
  addMarker(marker, completionListener, failedListener) {
    this.call("addMarker", marker, completionListener, failedListener);
  }
  removeMarker(marker, completionListener, failedListener) {
    this.call("removeMarker", marker, completionListener, failedListener);
  }
  addPolyline(line, completionListener, failedListener) {
    this.call("addPolyline", line, completionListener, failedListener);
  }
  removePolyline(line, completionListener, failedListener) {
    this.call("removePolyline", line, completionListener, failedListener);
  }
  zoomIn() {
    this.call("zoomIn");
  }
  zoomOut() {
    this.call("zoomOut");
  }
  setCenterZoom(center, zoomLevel, anim) {
    this.call("setCenterZoom", center, zoomLevel, anim);
  }
  setFitView(elements, padding, anim, userLocation) {
    this.call("setFitView", elements, padding, anim, userLocation);
  }
  startWaterRippleAnim(animationParams) {
    this.call("startWaterRippleAnim", animationParams);
  }
  stopWaterRippleAnim() {
    this.call("stopWaterRippleAnim");
  }
}
class HMXIBaseMapMarker extends HummerComponent {
  constructor(tag, props = {}) {
    super(tag, props);
  }
  set location(value) {
    this.call('setLocation', value);
  }
  get location() {
    return this.call('getLocation');
  }
  set zIndex(value) {
    this.call('setZIndex', value);
  }
  get zIndex() {
    return this.call('getZIndex');
  }
  set rotation(value) {
    this.call('setRotation', value);
  }
  get rotation() {
    return this.call('getRotation');
  }
  set alpha(value) {
    this.call('setAlpha', value);
  }
  get alpha() {
    return this.call('getAlpha');
  }
  set anchorX(value) {
    this.call('setAnchorX', value);
  }
  get anchorX() {
    return this.call('getAnchorX');
  }
  set anchorY(value) {
    this.call('setAnchorY', value);
  }
  get anchorY() {
    return this.call('getAnchorY');
  }
  set enable(value) {
    this.call('setEnable', value);
  }
  get enable() {
    return this.call('getEnable');
  }
  set infoView(value) {
    this.call('setInfoView', value);
  }
  get infoView() {
    return this.call('getInfoView');
  }
  set offSet(value) {
    this.call('setOffSet', value);
  }
  get offSet() {
    return this.call('getOffSet');
  }
  set collisionEnable(value) {
    this.call('setCollisionEnable', value);
  }
  get collisionEnable() {
    return this.call('getCollisionEnable');
  }
  set collisionPriority(value) {
    this.call('setCollisionPriority', value);
  }
  get collisionPriority() {
    return this.call('getCollisionPriority');
  }
  translateLocation(location, autoRotate, rotate, duration, animationEndListener) {
    this.call('translateLocation', location, autoRotate, rotate, duration, animationEndListener);
  }
  showInfoView() {
    this.call('showInfoView');
  }
  hideInfoView() {
    this.call('hideInfoView');
  }
  startAnimation(animation) {
    this.call('startAnimation', animation);
  }
  stopAnimation() {
    this.call('stopAnimation');
  }
}
class HMXIMapMarker extends HMXIBaseMapMarker {
  constructor(props = {}) {
    super("HMXIMapMarker", props);
  }
  set size(value) {
    this.call('setSize', value);
  }
  get size() {
    return this.call('getSize');
  }
  updateSrc(src, size, success, failed) {
    this.call('updateSrc', src, size, success, failed);
  }
}
__GLOBAL__.Hummer = {
  getRootView() {
    return Hummer.getRootView();
  }
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/slice.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/slice.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../../../modules/es.array.slice */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.slice.js");
var entryVirtual = __webpack_require__(/*! ../../../internals/entry-virtual */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/entry-virtual.js");

module.exports = entryVirtual('Array').slice;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/splice.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/splice.js ***!
  \*********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../../../modules/es.array.splice */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.splice.js");
var entryVirtual = __webpack_require__(/*! ../../../internals/entry-virtual */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/entry-virtual.js");

module.exports = entryVirtual('Array').splice;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/slice.js":
/*!***************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/slice.js ***!
  \***************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../array/virtual/slice */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/slice.js");

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.slice;
  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.slice) ? method : own;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/splice.js":
/*!****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/splice.js ***!
  \****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js");
var method = __webpack_require__(/*! ../array/virtual/splice */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/array/virtual/splice.js");

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.splice;
  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.splice) ? method : own;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/map/index.js":
/*!**********************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/map/index.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../../modules/es.array.iterator */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.iterator.js");
__webpack_require__(/*! ../../modules/es.map */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.map.js");
__webpack_require__(/*! ../../modules/es.object.to-string */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.object.to-string.js");
__webpack_require__(/*! ../../modules/es.string.iterator */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.string.iterator.js");
var path = __webpack_require__(/*! ../../internals/path */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js");

module.exports = path.Map;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/set/index.js":
/*!**********************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/set/index.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../../modules/es.array.iterator */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.iterator.js");
__webpack_require__(/*! ../../modules/es.object.to-string */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.object.to-string.js");
__webpack_require__(/*! ../../modules/es.set */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.set.js");
__webpack_require__(/*! ../../modules/es.string.iterator */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.string.iterator.js");
var path = __webpack_require__(/*! ../../internals/path */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js");

module.exports = path.Set;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js ***!
  \******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-possible-prototype.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-possible-prototype.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/add-to-unscopables.js":
/*!**************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/add-to-unscopables.js ***!
  \**************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-instance.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-instance.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js");

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw $TypeError('Incorrect invocation');
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js ***!
  \*****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-buffer-non-extensible.js":
/*!***********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-buffer-non-extensible.js ***!
  \***********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");

module.exports = fails(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-includes.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-includes.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-iteration.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-iteration.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-context.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-create.js");

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-method-has-species-support.js":
/*!****************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-method-has-species-support.js ***!
  \****************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-v8-version.js");

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-set-length.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-set-length.js ***!
  \************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js");

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
    throw $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-slice-simple.js":
/*!**************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-slice-simple.js ***!
  \**************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property.js");

var $Array = Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-slice.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-slice.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-constructor.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-constructor.js ***!
  \*********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(/*! ../internals/is-array */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-constructor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-create.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-create.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(/*! ../internals/array-species-constructor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-constructor.js");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js":
/*!***************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js ***!
  \***************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

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
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/collection-strong.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/collection-strong.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var create = __webpack_require__(/*! ../internals/object-create */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-create.js");
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-in-accessor.js");
var defineBuiltIns = __webpack_require__(/*! ../internals/define-built-ins */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-ins.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-context.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-instance.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterate.js");
var defineIterator = __webpack_require__(/*! ../internals/iterator-define */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-define.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-iter-result-object.js");
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/set-species.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var fastKey = (__webpack_require__(/*! ../internals/internal-metadata */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-metadata.js").fastKey);
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-state.js");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    defineBuiltIns(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineBuiltInAccessor(Prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return createIterResultObject(undefined, true);
      }
      // return step by kind
      if (kind == 'keys') return createIterResultObject(entry.key, false);
      if (kind == 'values') return createIterResultObject(entry.value, false);
      return createIterResultObject([entry.key, entry.value], false);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/collection.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/collection.js ***!
  \******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-metadata.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterate.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-instance.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/set-to-string-tag.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js").f);
var forEach = (__webpack_require__(/*! ../internals/array-iteration */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-iteration.js").forEach);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-state.js");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var exported = {};
  var Constructor;

  if (!DESCRIPTORS || !isCallable(NativeConstructor)
    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
  ) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else {
    Constructor = wrapper(function (target, iterable) {
      setInternalState(anInstance(target, Prototype), {
        type: CONSTRUCTOR_NAME,
        collection: new NativeConstructor()
      });
      if (iterable != undefined) iterate(iterable, target[ADDER], { that: target, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
        createNonEnumerableProperty(Prototype, KEY, function (a, b) {
          var collection = getInternalState(this).collection;
          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
          var result = collection[KEY](a === 0 ? 0 : a, b);
          return IS_ADDER ? this : result;
        });
      }
    });

    IS_WEAK || defineProperty(Prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).collection.size;
      }
    });
  }

  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: true }, exported);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/correct-prototype-getter.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/correct-prototype-getter.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-iter-result-object.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-iter-result-object.js ***!
  \*********************************************************************************************************************************************/
/***/ ((module) => {

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js":
/*!**************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js ***!
  \**************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js":
/*!**********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js ***!
  \**********************************************************************************************************************************************/
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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-property-key.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-in-accessor.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-in-accessor.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js");

module.exports = function (target, name, descriptor) {
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-in.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-in.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js");

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
  return target;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-ins.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-ins.js ***!
  \************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-in.js");

module.exports = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else defineBuiltIn(target, key, src[key], options);
  } return target;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-global-property.js":
/*!******************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-global-property.js ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/delete-property-or-throw.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/delete-property-or-throw.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js");

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-all.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-all.js ***!
  \********************************************************************************************************************************/
/***/ ((module) => {

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-create-element.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-create-element.js ***!
  \*******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js":
/*!************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js ***!
  \************************************************************************************************************************************************/
/***/ ((module) => {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/dom-iterables.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/dom-iterables.js ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-user-agent.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-user-agent.js ***!
  \*************************************************************************************************************************************/
/***/ ((module) => {

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-v8-version.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-v8-version.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-user-agent.js");

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/entry-virtual.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/entry-virtual.js ***!
  \*********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! ../internals/path */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js");

module.exports = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/enum-bug-keys.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/enum-bug-keys.js ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-apply.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-descriptor.js").f);
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-forced.js");
var path = __webpack_require__(/*! ../internals/path */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-context.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");

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

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;

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

    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js":
/*!*************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/freezing.js":
/*!****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/freezing.js ***!
  \****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-apply.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-apply.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-context.js":
/*!*****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-context.js ***!
  \*****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js");
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js ***!
  \*********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-name.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-name.js ***!
  \*********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-accessor.js":
/*!**************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-accessor.js ***!
  \**************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js");

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-clause.js":
/*!************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-clause.js ***!
  \************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js":
/*!*****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js ***!
  \*****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! ../internals/path */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");

var aFunction = function (variable) {
  return isCallable(variable) ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-iterator-method.js":
/*!***************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-iterator-method.js ***!
  \***************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-method.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-iterator.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-iterator.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-iterator-method.js");

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-method.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-method.js ***!
  \******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js ***!
  \**************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js ***!
  \************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/hidden-keys.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/hidden-keys.js ***!
  \*******************************************************************************************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/html.js":
/*!************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/html.js ***!
  \************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ie8-dom-define.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ie8-dom-define.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-create-element.js");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/indexed-object.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/indexed-object.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/inspect-source.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/inspect-source.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-metadata.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-metadata.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/hidden-keys.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js").f);
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-names.js");
var getOwnPropertyNamesExternalModule = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-names-external.js");
var isExtensible = __webpack_require__(/*! ../internals/object-is-extensible */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-extensible.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/uid.js");
var FREEZING = __webpack_require__(/*! ../internals/freezing */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/freezing.js");

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-state.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-state.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/weak-map-basic-detection.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array-iterator-method.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array-iterator-method.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js":
/*!****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js ***!
  \****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $documentAll = __webpack_require__(/*! ../internals/document-all */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-all.js");

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-constructor.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-constructor.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/inspect-source.js");

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-forced.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-forced.js ***!
  \*****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js ***!
  \****************************************************************************************************************************************/
/***/ ((module) => {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js ***!
  \*****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var $documentAll = __webpack_require__(/*! ../internals/document-all */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-all.js");

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-pure.js":
/*!***************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-pure.js ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

module.exports = true;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-symbol.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-symbol.js ***!
  \*****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterate.js":
/*!***************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterate.js ***!
  \***************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-bind-context.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array-iterator-method.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js");
var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-iterator.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-iterator-method.js");
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-close.js");

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-close.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-close.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-method.js");

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-create-constructor.js":
/*!***********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-create-constructor.js ***!
  \***********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators-core.js").IteratorPrototype);
var create = __webpack_require__(/*! ../internals/object-create */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-define.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-define.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-pure.js");
var FunctionName = __webpack_require__(/*! ../internals/function-name */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-name.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/iterator-create-constructor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-create-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-in.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators-core.js");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators-core.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators-core.js ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-create.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-prototype-of.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-in.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators.js ***!
  \*****************************************************************************************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(/*! ../internals/to-length */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/math-trunc.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/math-trunc.js ***!
  \******************************************************************************************************************************/
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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-create.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-create.js ***!
  \*********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js");
var definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-properties.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-properties.js ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/v8-prototype-define-bug.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js":
/*!******************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js ***!
  \******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ie8-dom-define.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/v8-prototype-define-bug.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-property-key.js");

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
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ie8-dom-define.js");

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-names-external.js":
/*!**********************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-names-external.js ***!
  \**********************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js");
var $getOwnPropertyNames = (__webpack_require__(/*! ../internals/object-get-own-property-names */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-names.js").f);
var arraySlice = __webpack_require__(/*! ../internals/array-slice-simple */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-slice-simple.js");

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-names.js":
/*!*************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-own-property-names.js ***!
  \*************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-prototype-of.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-get-prototype-of.js ***!
  \*******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-extensible.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-extensible.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof-raw.js");
var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(/*! ../internals/array-buffer-non-extensible */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-buffer-non-extensible.js");

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
module.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js":
/*!******************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-is-prototype-of.js ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-keys-internal.js":
/*!****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-keys-internal.js ***!
  \****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js");
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-includes.js").indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-keys.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-keys.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-property-is-enumerable.js":
/*!*************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-property-is-enumerable.js ***!
  \*************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-set-prototype-of.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-set-prototype-of.js ***!
  \*******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this-accessor.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-to-string.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-to-string.js ***!
  \************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string-tag-support.js");
var classof = __webpack_require__(/*! ../internals/classof */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ordinary-to-primitive.js":
/*!*****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ordinary-to-primitive.js ***!
  \*****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js":
/*!************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/path.js ***!
  \************************************************************************************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/require-object-coercible.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/require-object-coercible.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-null-or-undefined.js");

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/set-species.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/set-species.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-built-in.js");
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-built-in-accessor.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineBuiltInAccessor(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/set-to-string-tag.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/set-to-string-tag.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string-tag-support.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js").f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-to-string.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!hasOwn(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty(target, 'toString', toString);
    }
  }
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-key.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-key.js ***!
  \******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(/*! ../internals/shared */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/define-global-property.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared.js ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.30.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.30.2/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/string-multibyte.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/string-multibyte.js ***!
  \************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/require-object-coercible.js");

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/symbol-constructor-detection.js":
/*!************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/symbol-constructor-detection.js ***!
  \************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-absolute-index.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-absolute-index.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js");

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js":
/*!******************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trunc = __webpack_require__(/*! ../internals/math-trunc */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/math-trunc.js");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-length.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-length.js ***!
  \*****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js ***!
  \*****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/require-object-coercible.js");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-primitive.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-primitive.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(/*! ../internals/function-call */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

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
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-property-key.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-property-key.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string-tag-support.js":
/*!*****************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string-tag-support.js ***!
  \*****************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string.js ***!
  \*****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js");

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/try-to-string.js ***!
  \*********************************************************************************************************************************/
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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/uid.js":
/*!***********************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/uid.js ***!
  \***********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/use-symbol-as-uid.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/use-symbol-as-uid.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/symbol-constructor-detection.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/v8-prototype-define-bug.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/v8-prototype-define-bug.js ***!
  \*******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/fails.js");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/weak-map-basic-detection.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/weak-map-basic-detection.js ***!
  \********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-callable.js");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js ***!
  \*************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/symbol-constructor-detection.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/use-symbol-as-uid.js");

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.iterator.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.iterator.js ***!
  \***********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-state.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/object-define-property.js").f);
var defineIterator = __webpack_require__(/*! ../internals/iterator-define */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-define.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-iter-result-object.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-pure.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/descriptors.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  if (kind == 'keys') return createIterResultObject(index, false);
  if (kind == 'values') return createIterResultObject(target[index], false);
  return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.slice.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.slice.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-array.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-constructor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/is-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-indexed-object.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-method-has-species-support.js");
var nativeSlice = __webpack_require__(/*! ../internals/array-slice */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-slice.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var $Array = Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === $Array || Constructor === undefined) {
        return nativeSlice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.splice.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.splice.js ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-absolute-index.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-integer-or-infinity.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/length-of-array-like.js");
var setArrayLength = __webpack_require__(/*! ../internals/array-set-length */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-set-length.js");
var doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-species-create.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-property.js");
var deletePropertyOrThrow = __webpack_require__(/*! ../internals/delete-property-or-throw */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/delete-property-or-throw.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/array-method-has-species-support.js");

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

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.map.constructor.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.map.constructor.js ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var collection = __webpack_require__(/*! ../internals/collection */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/collection.js");
var collectionStrong = __webpack_require__(/*! ../internals/collection-strong */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/collection-strong.js");

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.map.js":
/*!************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.map.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__(/*! ../modules/es.map.constructor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.map.constructor.js");


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.object.to-string.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.object.to-string.js ***!
  \*************************************************************************************************************************************/
/***/ (() => {

// empty


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.set.constructor.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.set.constructor.js ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var collection = __webpack_require__(/*! ../internals/collection */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/collection.js");
var collectionStrong = __webpack_require__(/*! ../internals/collection-strong */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/collection-strong.js");

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.set.js":
/*!************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.set.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__(/*! ../modules/es.set.constructor */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.set.constructor.js");


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.string.iterator.js":
/*!************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.string.iterator.js ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(/*! ../internals/string-multibyte */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/string-multibyte.js").charAt);
var toString = __webpack_require__(/*! ../internals/to-string */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/iterator-define */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterator-define.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-iter-result-object.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/web.dom-collections.iterator.js":
/*!**********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../modules/es.array.iterator */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/es.array.iterator.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/dom-iterables.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/global.js");
var classof = __webpack_require__(/*! ../internals/classof */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/classof.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators[COLLECTION_NAME] = Iterators.Array;
}


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/slice.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/slice.js ***!
  \*******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../../es/instance/slice */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/slice.js");

module.exports = parent;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/splice.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/instance/splice.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../../es/instance/splice */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/instance/splice.js");

module.exports = parent;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/map/index.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/map/index.js ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../../es/map */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/map/index.js");
__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/web.dom-collections.iterator.js");

module.exports = parent;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/set/index.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/stable/set/index.js ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../../es/set */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/es/set/index.js");
__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/core-js-pure/modules/web.dom-collections.iterator.js");

module.exports = parent;


/***/ }),

/***/ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./src/Comp_Layout.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createClass.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/inherits.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createSuper.js */ "../../../../../../../../../../usr/local/lib/node_modules/@hummer/cli/node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _hummer_tenon_dev_tool_dist_tenon_dev_tool_es__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @hummer/tenon-dev-tool/dist/tenon-dev-tool.es */ "./node_modules/@hummer/tenon-dev-tool/dist/tenon-dev-tool.es.js");
/* harmony import */ var _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../packages/hummer-api/dist/hummer-api.es */ "../../packages/hummer-api/dist/hummer-api.es.js");







// ID Count
var count = 0;
// 操作面板
var _playground;
// 选中ID
var selectViewId;
var idText;
var btnAdd;
var btnDelete;
var btnPosition;
var btnDisplay;
var RootView = /*#__PURE__*/function (_View) {
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__["default"])(RootView, _View);
  var _super = (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(RootView);
  function RootView() {
    var _this;
    (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, RootView);
    _this = _super.call(this);
    _this.style = {
      width: '100%',
      height: '100%',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10
    };
    _this.operator();
    _this.playground();
    return _this;
  }
  (0,_usr_local_lib_node_modules_hummer_cli_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RootView, [{
    key: "operator",
    value: function operator() {
      var _this2 = this;
      var layout = new _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.View();
      layout.style = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#22222222"
      };

      // 元素id
      idText = new _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.Text();
      idText.text = "元素id";
      idText.style = {
        display: "block",
        width: 100
      };
      layout.appendChild(idText);

      // 操作列表
      var operation = new _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.View();
      operation.style = {
        display: "block",
        width: 200
      };
      layout.appendChild(operation);
      // 通用样式
      var btnCss = {
        display: "block",
        borderWidth: 1,
        borderColor: "#22222222",
        padding: 4,
        margin: 4,
        textAlign: 'center'
      };
      // 添加节点
      btnAdd = new _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.Text();
      btnAdd.text = "添加节点";
      btnAdd.style = btnCss;
      btnAdd.addEventListener("tap", function (event) {
        var view = _this2.genView();
        if (selectViewId && selectViewId !== 0) {
          var exitView = _playground.getElementById(selectViewId);
          _playground.insertBefore(view, exitView);
        } else {
          _playground.appendChild(view);
        }
      });
      operation.appendChild(btnAdd);
      // 删除节点
      btnDelete = new _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.Text();
      btnDelete.text = "删除节点";
      btnDelete.style = btnCss;
      btnDelete.addEventListener("tap", function (event) {
        if (selectViewId && selectViewId !== 0) {
          var exitView = _playground.getElementById(selectViewId);
          _playground.removeChild(exitView);
        }
      });
      operation.appendChild(btnDelete);
      // 更新position
      btnPosition = new _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.Text();
      btnPosition.text = "更新position";
      btnPosition.style = btnCss;
      btnPosition.addEventListener("tap", function (event) {
        var exitView;
        if (selectViewId != 0) {
          exitView = _playground.getElementById(selectViewId);
        } else {
          exitView = _playground;
        }
        if (exitView) {
          var oldPostion = exitView.style["position"];
          if (!oldPostion || oldPostion == "fixed") {
            exitView.style = {
              position: "relative"
            };
          } else {
            exitView.style = {
              position: "fixed"
            };
          }
        }
        _this2.updateOpetation(selectViewId, exitView);
      });
      operation.appendChild(btnPosition);
      // 更新display
      btnDisplay = new _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.Text();
      btnDisplay.text = "更新display";
      btnDisplay.style = btnCss;
      btnDisplay.addEventListener("tap", function (event) {
        var exitView;
        if (selectViewId != 0) {
          exitView = _playground.getElementById(selectViewId);
        }
        if (exitView) {
          var oldDisplay = exitView.style["display"];
          var newDislpay = null;
          if (!oldDisplay || oldDisplay == "flex") {
            newDislpay = "block";
          } else if (oldDisplay == "block") {
            newDislpay = "inline";
          } else if (oldDisplay == "inline") {
            newDislpay = "inline-block";
          } else if (oldDisplay == "inline-block") {
            newDislpay = "block";
          }
          if (newDislpay) {
            exitView.style = {
              display: "".concat(newDislpay)
            };
          }
        }
        _this2.updateOpetation(selectViewId, exitView);
      });
      operation.appendChild(btnDisplay);
      this.appendChild(layout);
    }
  }, {
    key: "playground",
    value: function playground() {
      var _this3 = this;
      var id = count;
      count++;
      _playground = new _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.View("".concat(id));
      _playground.style = {
        display: "block",
        position: "relative",
        padding: 10,
        borderWidth: 1,
        borderColor: "#22222222"
      };
      _playground.addEventListener("tap", function (event) {
        _this3.updateOpetation(id, _playground);
      });
      this.appendChild(_playground);
    }
  }, {
    key: "genView",
    value: function genView() {
      var _this4 = this;
      var id = count;
      count++;
      var v = new _packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.Text("".concat(id));
      v.text = "".concat(id);
      v.style = {
        display: "block",
        position: "relative",
        borderWidth: 1,
        borderColor: "#22222222",
        padding: 4,
        margin: 4,
        textAlign: 'center',
        height: 50,
        width: 50
      };
      v.addEventListener("tap", function (event) {
        _this4.updateOpetation(id, v);
      });
      return v;
    }
  }, {
    key: "updateOpetation",
    value: function updateOpetation(id, v) {
      selectViewId = "".concat(id);
      idText.text = "\u5143\u7D20\uFF1A".concat(selectViewId);
      btnPosition.text = "position\uFF1A".concat(v.style["position"]);
      btnDisplay.text = "display\uFF1A".concat(v.style["display"]);
    }
  }]);
  return RootView;
}(_packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.View);
_packages_hummer_api_dist_hummer_api_es__WEBPACK_IMPORTED_MODULE_5__.Hummer.render(new RootView());
setTimeout(function () {
  __GLOBAL__.Hummer.getRootView().dbg_getDescription(function (res) {
    console.log(res);
    (0,_hummer_tenon_dev_tool_dist_tenon_dev_tool_es__WEBPACK_IMPORTED_MODULE_4__.run)(res, 'hummer');
  }, 0);
}, 0);
})();

/******/ })()
;
//# sourceMappingURL=http://172.23.161.25:8000/Comp_Layout.js.map
}
