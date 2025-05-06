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
/*!*********************************!*\
  !*** ./src/Comp_View_Layout.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
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
    this.testMargin();
    this.testPadding();
    this.testAbsolute();
  }
  testMargin() {
    let titleView = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    titleView.text = 'View - Margin';
    titleView.style = {
      color: '#333333',
      fontSize: 16
    };
    let viewLayout = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    viewLayout.style = {
      flexDirection: 'row',
      padding: 10,
      borderWidth: 1,
      borderColor: '#22222222',
      flexWrap: 'wrap'
    };

    // marginLeft: 10
    let subLayout1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout1.style = {
      alignItems: 'center'
    };
    let view1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view1.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      justifyContent: 'center'
    };
    let child1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child1.style = {
      width: 20,
      height: 20,
      marginLeft: 10,
      backgroundColor: '#0000FF'
    };
    let text1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text1.text = 'margLeft: 10';
    text1.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // marginTop: 10
    let subLayout2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout2.style = {
      alignItems: 'center',
      marginLeft: 10
    };
    let view2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view2.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      alignItems: 'center'
    };
    let child2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child2.style = {
      width: 20,
      height: 20,
      marginTop: 10,
      backgroundColor: '#0000FF'
    };
    let text2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text2.text = 'marginTop: 10';
    text2.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // marginRight: 10
    let subLayout3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout3.style = {
      alignItems: 'center',
      marginLeft: 10
    };
    let view3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view3.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      justifyContent: 'center',
      alignItems: 'flex-end'
    };
    let child3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child3.style = {
      width: 20,
      height: 20,
      marginRight: 10,
      backgroundColor: '#0000FF'
    };
    let text3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text3.text = 'marginRight: 10';
    text3.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // marginBottom: 10
    let subLayout4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout4.style = {
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 20
    };
    let view4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view4.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      justifyContent: 'flex-end',
      alignItems: 'center'
    };
    let child4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child4.style = {
      width: 20,
      height: 20,
      marginBottom: 10,
      backgroundColor: '#0000FF'
    };
    let text4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text4.text = 'marginBottom: 10';
    text4.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // margin: 10
    let subLayout5 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout5.style = {
      alignItems: 'center',
      marginTop: 10
    };
    let view5 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view5.style = {
      backgroundColor: '#FF000022',
      justifyContent: 'center',
      alignItems: 'center'
    };
    let child5 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child5.style = {
      width: 20,
      height: 20,
      margin: 10,
      backgroundColor: '#0000FF'
    };
    let text5 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text5.text = 'margin: 10';
    text5.style = {
      fontSize: 10,
      textAlign: 'center'
    };
    view1.appendChild(child1);
    subLayout1.appendChild(view1);
    subLayout1.appendChild(text1);
    viewLayout.appendChild(subLayout1);
    view2.appendChild(child2);
    subLayout2.appendChild(view2);
    subLayout2.appendChild(text2);
    viewLayout.appendChild(subLayout2);
    view3.appendChild(child3);
    subLayout3.appendChild(view3);
    subLayout3.appendChild(text3);
    viewLayout.appendChild(subLayout3);
    view4.appendChild(child4);
    subLayout4.appendChild(view4);
    subLayout4.appendChild(text4);
    viewLayout.appendChild(subLayout4);
    view5.appendChild(child5);
    subLayout5.appendChild(view5);
    subLayout5.appendChild(text5);
    viewLayout.appendChild(subLayout5);
    this.appendChild(titleView);
    this.appendChild(viewLayout);
  }
  testPadding() {
    let titleView = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    titleView.text = 'View - Padding';
    titleView.style = {
      color: '#333333',
      fontSize: 16,
      marginTop: 10
    };
    let viewLayout = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    viewLayout.style = {
      flexDirection: 'row',
      padding: 10,
      borderWidth: 1,
      borderColor: '#22222222',
      flexWrap: 'wrap'
    };

    // paddingLeft: 10
    let subLayout1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout1.style = {
      alignItems: 'center'
    };
    let view1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view1.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      justifyContent: 'center',
      paddingLeft: 10
    };
    let child1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child1.style = {
      width: 20,
      height: 20,
      backgroundColor: '#0000FF'
    };
    let text1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text1.text = 'paddingLeft: 10';
    text1.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // paddingTop: 10
    let subLayout2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout2.style = {
      alignItems: 'center',
      marginLeft: 10
    };
    let view2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view2.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      alignItems: 'center',
      paddingTop: 10
    };
    let child2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child2.style = {
      width: 20,
      height: 20,
      backgroundColor: '#0000FF'
    };
    let text2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text2.text = 'paddingTop: 10';
    text2.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // paddingRight: 10
    let subLayout3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout3.style = {
      alignItems: 'center',
      marginLeft: 10
    };
    let view3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view3.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 10
    };
    let child3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child3.style = {
      width: 20,
      height: 20,
      backgroundColor: '#0000FF'
    };
    let text3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text3.text = 'paddingRight: 10';
    text3.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // paddingBottom: 10
    let subLayout4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout4.style = {
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 20
    };
    let view4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view4.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 10
    };
    let child4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child4.style = {
      width: 20,
      height: 20,
      backgroundColor: '#0000FF'
    };
    let text4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text4.text = 'paddingBottom: 10';
    text4.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // padding: 10
    let subLayout5 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout5.style = {
      alignItems: 'center',
      marginTop: 10
    };
    let view5 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view5.style = {
      backgroundColor: '#FF000022',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    };
    let child5 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child5.style = {
      width: 20,
      height: 20,
      backgroundColor: '#0000FF'
    };
    let text5 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text5.text = 'padding: 10';
    text5.style = {
      fontSize: 10,
      textAlign: 'center'
    };
    view1.appendChild(child1);
    subLayout1.appendChild(view1);
    subLayout1.appendChild(text1);
    viewLayout.appendChild(subLayout1);
    view2.appendChild(child2);
    subLayout2.appendChild(view2);
    subLayout2.appendChild(text2);
    viewLayout.appendChild(subLayout2);
    view3.appendChild(child3);
    subLayout3.appendChild(view3);
    subLayout3.appendChild(text3);
    viewLayout.appendChild(subLayout3);
    view4.appendChild(child4);
    subLayout4.appendChild(view4);
    subLayout4.appendChild(text4);
    viewLayout.appendChild(subLayout4);
    view5.appendChild(child5);
    subLayout5.appendChild(view5);
    subLayout5.appendChild(text5);
    viewLayout.appendChild(subLayout5);
    this.appendChild(titleView);
    this.appendChild(viewLayout);
  }
  testAbsolute() {
    let titleView = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    titleView.text = 'View - Absolute';
    titleView.style = {
      color: '#333333',
      fontSize: 16,
      marginTop: 10
    };
    let viewLayout = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    viewLayout.style = {
      flexDirection: 'row',
      padding: 10,
      borderWidth: 1,
      borderColor: '#22222222',
      flexWrap: 'wrap'
    };

    // Absolute Left: 10
    let subLayout1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout1.style = {
      alignItems: 'center'
    };
    let view1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view1.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      justifyContent: 'center'
    };
    let child1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child1.style = {
      position: 'absolute',
      left: 10,
      width: 20,
      height: 20,
      backgroundColor: '#0000FF'
    };
    let text1 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text1.text = 'left: 10';
    text1.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // Absolute Top: 10
    let subLayout2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout2.style = {
      alignItems: 'center',
      marginLeft: 10
    };
    let view2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view2.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      alignItems: 'center'
    };
    let child2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child2.style = {
      position: 'absolute',
      top: 10,
      width: 20,
      height: 20,
      backgroundColor: '#0000FF'
    };
    let text2 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text2.text = 'top: 10';
    text2.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // Absolute Right: 10
    let subLayout3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout3.style = {
      alignItems: 'center',
      marginLeft: 10
    };
    let view3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view3.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      justifyContent: 'center',
      alignItems: 'flex-end'
    };
    let child3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child3.style = {
      position: 'absolute',
      right: 10,
      width: 20,
      height: 20,
      backgroundColor: '#0000FF'
    };
    let text3 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text3.text = 'right: 10';
    text3.style = {
      fontSize: 10,
      textAlign: 'center'
    };

    // Absolute Bottom: 10
    let subLayout4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    subLayout4.style = {
      alignItems: 'center',
      marginLeft: 10
    };
    let view4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    view4.style = {
      width: 70,
      height: 70,
      backgroundColor: '#FF000022',
      justifyContent: 'flex-end',
      alignItems: 'center'
    };
    let child4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    child4.style = {
      position: 'absolute',
      bottom: 10,
      width: 20,
      height: 20,
      backgroundColor: '#0000FF'
    };
    let text4 = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './../../../packages/hummer-api/dist/hummer-api.es'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    text4.text = 'bottom: 10';
    text4.style = {
      fontSize: 10,
      textAlign: 'center'
    };
    view1.appendChild(child1);
    subLayout1.appendChild(view1);
    subLayout1.appendChild(text1);
    viewLayout.appendChild(subLayout1);
    view2.appendChild(child2);
    subLayout2.appendChild(view2);
    subLayout2.appendChild(text2);
    viewLayout.appendChild(subLayout2);
    view3.appendChild(child3);
    subLayout3.appendChild(view3);
    subLayout3.appendChild(text3);
    viewLayout.appendChild(subLayout3);
    view4.appendChild(child4);
    subLayout4.appendChild(view4);
    subLayout4.appendChild(text4);
    viewLayout.appendChild(subLayout4);
    this.appendChild(titleView);
    this.appendChild(viewLayout);
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
//# sourceMappingURL=http://172.23.145.60:8000/Comp_View_Layout.js.map