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
/*!****************************!*\
  !*** ./src/Comp_Canvas.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hummer_tenon_dev_tool_dist_tenon_dev_tool_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hummer/tenon-dev-tool/dist/tenon-dev-tool.es */ "./node_modules/@hummer/tenon-dev-tool/dist/tenon-dev-tool.es.js");

class RootView extends View {
  constructor() {
    super();
    let environment = Hummer.env;
    this.style = {
      width: "100%",
      height: "100%"
    };
    this.drawCanvas(environment.deviceWidth, environment.deviceHeight);
  }
  drawCanvas(width, height) {
    let canvas = new CanvasView();
    canvas.lineWidth(2.0);
    canvas.style = {
      marginTop: 10,
      width: "100%",
      height: "100%"
    };
    this.drawRect(canvas);
    this.drawLines(width, height, canvas);
    this.drawText(width, height, canvas);
    this.drawCircle(width, height, canvas);
    this.drawImage(width, height, canvas);
    this.appendChild(canvas);
  }
  drawRect(canvas) {
    //开盘
    let data1 = [85, 135, 60, 131, 151, 153, 88, 117];
    //收盘
    let data2 = [52, 68, 123, 152, 145, 98, 158, 52];
    //最高
    let data3 = [152, 141, 124, 163, 152, 161, 159, 192];
    //最低
    let data4 = [39, 53, 39, 88, 141, 41, 82, 49];
    let width_half = 5;
    let space = 15;
    // canvas.lineColor("#FF0000")
    // canvas.fillRect(80, 300, space * 2, 150)
    // canvas.drawLine(100, 170, 100, 490)
    let start_w = 20;
    for (let i = 0; i < data1.length; i++) {
      let d1 = data1[i];
      let d2 = data2[i];
      let d3 = data3[i];
      let d4 = data4[i];
      if (d2 >= d1) {
        canvas.lineColor("#FF0000");
        canvas.strokeRect(start_w, d1, width_half * 2, d2 - d1);
        canvas.lineColor("#FF0000");
        canvas.drawLine(start_w + width_half, d3, start_w + width_half, d4);
      } else {
        canvas.fillColor("#00FF00");
        canvas.fillRect(start_w, d2, width_half * 2, d1 - d2);
        canvas.lineColor("#00FF00");
        canvas.drawLine(start_w + width_half, d3, start_w + width_half, d4);
      }
      start_w = start_w + width_half * 2 + space;
    }
  }
  drawText(width, height, canvas) {
    let start_w = 1;
    canvas.fontSize(8);
    canvas.fillText("200", start_w, 200 - 10, 40);
    canvas.fillText("150", start_w, 150 - 10, 40);
    canvas.fillText("100", start_w, 100 - 10, 40);
    canvas.fillText("50", start_w, 50 - 10, 40);
    let data = ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"];
    let width_half = 5;
    let space = 15;
    let height_bottom = 200;
    start_w = 20;
    canvas.fontSize(10);
    canvas.textColor("#0000FF");
    for (let i = 0; i < data.length; i++) {
      canvas.fillText(data[i], start_w, height_bottom, width_half * 2 + space / 2);
      start_w += width_half * 2 + space;
    }
  }
  drawLines(width, height, canvas) {
    this.drawLinesWithNormal(width, height, canvas);
    // this.drawLinesWithPath(width, height, canvas)
  }

  // drawLinesWithPath(width, height, canvas) {
  //     let data = [60, 106, 40, 90, 150];
  //     let path = new CanvasPath()

  //     let start_line = 15
  //     let x = 15
  //     let y = 100;
  //     let space = (width - start_line * 2) / data.length
  //     path.moveTo(x, y)
  //     console.log("y:" + y);
  //     for (let i = 0; i < data.length; i++) {
  //         x += space
  //         y = data[i]
  //         console.log("y:" + y);
  //         path.moveTo(x, y)
  //     }
  //     console.log("path:" + path);
  //     canvas.drawPath(path)
  // }

  drawLinesWithNormal(width, height, canvas) {
    let start_line = 15;
    let data = [22, 33, 30, 31, 28, 52, 51, 60, 77, 62, 13, 38, 32, 38, 20, 45, 33, 35, 20];
    let space = (width - start_line * 2) / data.length;
    canvas.lineColor("#FF00FF");
    //轴
    canvas.drawLine(start_line, 0, start_line, 200);
    canvas.drawLine(start_line, 200, width - start_line, 200);
    let x = start_line;
    let y = 100;
    //数据
    for (let i = 0; i < data.length; i++) {
      let n_x = x + space;
      let n_y = data[i];
      canvas.drawLine(x, y, n_x, n_y);
      x = n_x;
      y = n_y;
    }
  }
  drawImage(width, height, canvas) {
    //资源图片
    let path = "ic_loading";
    //网络图片
    // let path = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F03%2F20170803110751_8NLev.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630219778&t=45bfb77ae5fe1722be22e141075a9af6"
    //绝对路径
    // let path = "file://内部存储/bluetooth/test.jepg"
    canvas.drawImage(path, 180, 330, 50, 50);
  }
  drawCircle(width, height, canvas) {
    canvas.fillCircle(100, 300, 20);
    canvas.strokeCircle(200, 300, 20);
    canvas.arc(300, 300, 20, Math.PI / 4, Math.PI / 5, false);
    canvas.strokeEllipse(100, 400, 300, 500);
    canvas.fillEllipse(100, 600, 300, 700);
  }
}
Hummer.render(new RootView());
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
//# sourceMappingURL=http://172.23.145.60:8000/Comp_Canvas.js.map