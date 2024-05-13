'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __GLOBAL__ = this;

var HUMMER_OBJECT_PREFIX = '-_-_-_hummer-object_-_-_-';
var HUMMER_ARRAY_PREFIX = '-_-_-_hummer-array_-_-_-';
var hm_id = 1;

var idGenerator = () => hm_id++;

var transSingleArg = arg => {
  if (arg instanceof Base) {
    arg = arg.objID;
  } else if (arg instanceof Function) {// do nothing
  } else if (arg instanceof Object) {
    arg = JSON.stringify(arg);
  }

  return arg;
};

var transSingleArgWithPrefix = arg => {
  if (arg instanceof Base) {
    arg = arg.objID;
  } else if (arg instanceof Function) {// do nothing
  } else if (arg instanceof Array) {
    arg = HUMMER_ARRAY_PREFIX + JSON.stringify(arg);
  } else if (arg instanceof Object) {
    arg = HUMMER_OBJECT_PREFIX + JSON.stringify(arg);
  }

  return arg;
};

var transArgs = (...args) => {
  for (let i = 0; i < args.length; i++) {
    args[i] = transSingleArg(args[i]);
  }

  return args;
};

var transArgsWithPrefix = (...args) => {
  for (let i = 0; i < args.length; i++) {
    args[i] = transSingleArgWithPrefix(args[i]);
  }

  return args;
};

var console = {
  log: (...msgs) => printLog("console.log", ...msgs),
  debug: (...msgs) => printLog("console.debug", ...msgs),
  info: (...msgs) => printLog("console.info", ...msgs),
  warn: (...msgs) => printLog("console.warn", ...msgs),
  error: (...msgs) => printLog("console.error", ...msgs)
};
var __IS_DEBUG__ = false;
/**
 * 下面的日志打印逻辑，是为了支持前端console.log的Object类型参数和多参数情况
 */

var printLog = (funcName, ...msgs) => {
  if (__IS_DEBUG__) {
    let msg = '';

    if (msgs.length == 1) {
      let m = msgs[0];

      if (typeof m === 'undefined') {
        msg = 'undefined';
      } else if (m == null) {
        msg = 'null';
      } else if (m instanceof Error) {
        msg = m.toString() + '\n' + m.stack;
      } else if (m instanceof Function) {
        msg = m.toString();
      } else if (m instanceof Object) {
        msg = JSON.stringify(m);
      } else {
        msg = m.toString();
      }
    } else if (msgs.length > 1) {
      for (let i = 0; i < msgs.length; i++) {
        if (i > 0) {
          msg = msg.concat(', ');
        }

        let m = msgs[i];

        if (typeof m === 'undefined') {
          msg = msg.concat('undefined');
        } else if (m == null) {
          msg = msg.concat('null');
        } else if (m instanceof Error) {
          msg = msg.concat(m.toString() + '\n' + m.stack);
        } else if (m instanceof Function) {
          msg = msg.concat(m.toString());
        } else if (m instanceof Object) {
          msg = msg.concat(JSON.stringify(m));
        } else {
          msg = msg.concat(m.toString());
        }
      }
    }

    invoke("Hummer", 0, funcName, msg);
  }
};

var setTimeout = (func, timeout) => {
  let timer = new Timer();
  timer.setTimeout(func, timeout);
  return timer;
};

var clearTimeout = timer => {
  if (timer instanceof Timer) {
    timer.clearTimeout();
  }
};

var setInterval = (func, interval) => {
  let timer = new Timer();
  timer.setInterval(func, interval);
  return timer;
};

var clearInterval = timer => {
  if (timer instanceof Timer) {
    timer.clearInterval();
  }
};

var setImmediate = (func) => {
    var timer = new Timer();
    timer.setTimeout(func, 0);
    return timer;
};

var NotifyCenter = {
  addEventListener: (event, callback) => {
    invoke("NotifyCenter", 0, "addEventListener", event, callback);
  },
  removeEventListener: (event, callback) => {
    invoke("NotifyCenter", 0, "removeEventListener", event, callback);
  },
  triggerEvent: (event, value) => {
    invoke("NotifyCenter", 0, "triggerEvent", event, JSON.stringify(value));
  }
};
var Hummer = {
  setBasicWidth: width => {
    invoke("Hummer", 0, "setBasicWidth", width);
  },
  render: view => {
    invoke("Hummer", 0, "render", view.objID);
  },
  onRenderFinished: isSucceed => {
    invoke("Hummer", 0, "onRenderFinished", isSucceed);
  },
  getRootView: () => {
    return invoke("Hummer", 0, "getRootView");
  },
  loadScript: script => {
    return invoke("Hummer", 0, "loadScript", script);
  },
  loadScriptWithUrl: (url, callback) => {
    invoke("Hummer", 0, "loadScriptWithUrl", url, callback);
  },
  postException: err => {
    err = transSingleArg(err);
    invoke("Hummer", 0, "postException", err);
  },
  notifyCenter: NotifyCenter
};

let Base = /*#__PURE__*/function () {
  function Base(className, ...args) {
    _classCallCheck(this, Base);

    this.className = className;
    this.objID = idGenerator();
    this.recycler = new Recycler(this.objID);
    let params = transArgs(...args);
    invoke(this.className, this.objID, "constructor", this, ...params); // 已弃用

    this.initialize(...args); // 此方法只用于调试，为了统计组件树和函数调用树

    if (__IS_DEBUG__) {
      invoke(this.className, this.objID, "constructor_end", this);
    }
  } // 已弃用


  _createClass(Base, [{
    key: "initialize",
    value: function initialize(...args) {}
  }, {
    key: "addEventListener",
    value: function addEventListener(...args) {
      invoke(this.className, this.objID, "addEventListener", ...args);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(...args) {
      invoke(this.className, this.objID, "removeEventListener", ...args);
    }
  }, {
    key: "addAnimation",
    value: function addAnimation(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke(this.className, this.objID, "addAnimation", ...args);
    }
  }, {
    key: "removeAnimationForKey",
    value: function removeAnimationForKey(arg) {
      invoke(this.className, this.objID, "removeAnimationForKey", arg);
    }
  }, {
    key: "removeAllAnimation",
    value: function removeAllAnimation() {
      invoke(this.className, this.objID, "removeAllAnimation");
    }
  }, {
    key: "getRect",
    value: function getRect(arg) {
      invoke(this.className, this.objID, "getRect", arg);
    }
  }, {
    key: "resetStyle",
    value: function resetStyle() {
      invoke(this.className, this.objID, "resetStyle");
    }
  }, {
    key: "recycle",
    value: function recycle() {
      invoke(this.className, this.objID, "recycle");
    }
  }, {
    key: "dbg_highlight",
    value: function dbg_highlight(arg) {
      let stash = arg;
      arg = transSingleArg(arg);
      invoke(this.className, this.objID, "dbg_highlight", arg);
    }
  }, {
    key: "dbg_getDescription",
    value: function dbg_getDescription(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke(this.className, this.objID, "dbg_getDescription", ...args);
    }
  }, {
    key: "style",
    set: function (arg) {
      this._style = arg;
      arg = transSingleArg(arg);
      invoke(this.className, this.objID, "setStyle", arg);
    },
    get: function () {
      return this._style;
    }
  }, {
    key: "enabled",
    set: function (arg) {
      this._enabled = arg;
      invoke(this.className, this.objID, "setEnabled", arg);
    },
    get: function () {
      return this._enabled;
    }
  }, {
    key: "accessible",
    set: function (arg) {
      this._accessible = arg;
      invoke(this.className, this.objID, "setAccessible", arg);
    },
    get: function () {
      return this._accessible;
    }
  }, {
    key: "accessibilityLabel",
    set: function (arg) {
      this._accessibilityLabel = arg;
      invoke(this.className, this.objID, "setAccessibilityLabel", arg);
    },
    get: function () {
      return this._accessibilityLabel;
    }
  }, {
    key: "accessibilityHint",
    set: function (arg) {
      this._accessibilityHint = arg;
      invoke(this.className, this.objID, "setAccessibilityHint", arg);
    },
    get: function () {
      return this._accessibilityHint;
    }
  }, {
    key: "accessibilityRole",
    set: function (arg) {
      this._accessibilityRole = arg;
      invoke(this.className, this.objID, "setAccessibilityRole", arg);
    },
    get: function () {
      return this._accessibilityRole;
    }
  }, {
    key: "accessibilityState",
    set: function (arg) {
      this._accessibilityState = arg;
      arg = transSingleArg(arg);
      invoke(this.className, this.objID, "setAccessibilityState", arg);
    },
    get: function () {
      return this._accessibilityState;
    }
  }]);

  return Base;
}();

__GLOBAL__.Hummer = Hummer;
__GLOBAL__.Base = Base;