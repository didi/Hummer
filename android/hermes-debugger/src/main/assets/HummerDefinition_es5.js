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
var idGenerator = function idGenerator() {
    return hm_id++;
};

var transSingleArg = function transSingleArg(arg) {
    if (arg instanceof Base) {
        arg = arg.objID;
    } else if (arg instanceof Function) {
        // do nothing
    } else if (arg instanceof Object) {
        arg = JSON.stringify(arg);
    }
    return arg;
};

var transSingleArgWithPrefix = function transSingleArgWithPrefix(arg) {
    if (arg instanceof Base) {
        arg = arg.objID;
    } else if (arg instanceof Function) {
        // do nothing
    } else if (arg instanceof Array) {
        arg = HUMMER_ARRAY_PREFIX + JSON.stringify(arg);
    } else if (arg instanceof Object) {
        arg = HUMMER_OBJECT_PREFIX + JSON.stringify(arg);
    }
    return arg;
};

var transArgs = function transArgs() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    for (var i = 0; i < args.length; i++) {
        args[i] = transSingleArg(args[i]);
    }
    return args;
};

var transArgsWithPrefix = function transArgsWithPrefix() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    for (var i = 0; i < args.length; i++) {
        args[i] = transSingleArgWithPrefix(args[i]);
    }
    return args;
};

var console = {
    log: function log() {
        for (var _len3 = arguments.length, msgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            msgs[_key3] = arguments[_key3];
        }

        return printLog.apply(undefined, ["console.log"].concat(msgs));
    },
    debug: function debug() {
        for (var _len4 = arguments.length, msgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            msgs[_key4] = arguments[_key4];
        }

        return printLog.apply(undefined, ["console.debug"].concat(msgs));
    },
    info: function info() {
        for (var _len5 = arguments.length, msgs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            msgs[_key5] = arguments[_key5];
        }

        return printLog.apply(undefined, ["console.info"].concat(msgs));
    },
    warn: function warn() {
        for (var _len6 = arguments.length, msgs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            msgs[_key6] = arguments[_key6];
        }

        return printLog.apply(undefined, ["console.warn"].concat(msgs));
    },
    error: function error() {
        for (var _len7 = arguments.length, msgs = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            msgs[_key7] = arguments[_key7];
        }

        return printLog.apply(undefined, ["console.error"].concat(msgs));
    }
};

var __IS_DEBUG__ = false;
/**
 * 下面的日志打印逻辑，是为了支持前端console.log的Object类型参数和多参数情况
 */
var printLog = function printLog(funcName) {
    for (var _len8 = arguments.length, msgs = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        msgs[_key8 - 1] = arguments[_key8];
    }

    if (__IS_DEBUG__) {
        var msg = '';
        if (msgs.length == 1) {
            var m = msgs[0];
            if (m instanceof Function) {
                msg = m.toString();
            } else if (m instanceof Object) {
                msg = JSON.stringify(m);
            } else if (typeof m === 'undefined') {
                msg = 'undefined';
            } else if (typeof m === 'null') {
                msg = 'null';
            } else {
                msg = m.toString();
            }
        } else if (msgs.length > 1) {
            for (var i = 0; i < msgs.length; i++) {
                if (i > 0) {
                    msg = msg.concat(', ');
                }
                var _m = msgs[i];
                if (_m instanceof Function) {
                    msg = msg.concat(_m.toString());
                } else if (_m instanceof Object) {
                    msg = msg.concat(JSON.stringify(_m));
                } else if (typeof _m === 'undefined') {
                    msg = msg.concat('undefined');
                } else if (typeof _m === 'null') {
                    msg = msg.concat('null');
                } else {
                    msg = msg.concat(_m);
                }
            }
        }
        invoke("Hummer", 0, funcName, msg);
    }
};

var setTimeout = function setTimeout(func, timeout) {
    var timer = new Timer();
    timer.setTimeout(func, timeout);
    return timer;
};

var clearTimeout = function clearTimeout(timer) {
    if (timer instanceof Timer) {
        timer.clearTimeout();
    }
};

var setInterval = function setInterval(func, interval) {
    var timer = new Timer();
    timer.setInterval(func, interval);
    return timer;
};

var clearInterval = function clearInterval(timer) {
    if (timer instanceof Timer) {
        timer.clearInterval();
    }
};

var setImmediate = function setImmediate(func) {
    var timer = new Timer();
    timer.setTimeout(func, 0);
    return timer;
};

var NotifyCenter = {
    addEventListener: function addEventListener(event, callback) {
        invoke("NotifyCenter", 0, "addEventListener", event, callback);
    },
    removeEventListener: function removeEventListener(event, callback) {
        invoke("NotifyCenter", 0, "removeEventListener", event, callback);
    },
    triggerEvent: function triggerEvent(event, value) {
        invoke("NotifyCenter", 0, "triggerEvent", event, JSON.stringify(value));
    }
};

var Hummer = {
    setBasicWidth: function setBasicWidth(width) {
        invoke("Hummer", 0, "setBasicWidth", width);
    },
    render: function render(view) {
        invoke("Hummer", 0, "render", view.objID);
    },
    notifyCenter: NotifyCenter
};

var Base = function () {
    function Base(className) {
        _classCallCheck(this, Base);

        this.className = className;
        this.objID = idGenerator();
//        this.recycler = new Recycler(this.objID);

        for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
            args[_key9 - 1] = arguments[_key9];
        }

        var params = transArgs.apply(undefined, args);
        invoke.apply(undefined, [this.className, this.objID, "constructor", this].concat(_toConsumableArray(params)));

        this.initialize.apply(this, args);

        // 此方法只用于调试，为了统计组件树和函数调用树
        if (__IS_DEBUG__) {
            invoke(this.className, this.objID, "constructor_end", this);
        }
    }

    _createClass(Base, [{
        key: 'initialize',
        value: function initialize() {}
    }, {
        key: 'addEventListener',
        value: function addEventListener() {
            for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                args[_key10] = arguments[_key10];
            }

            invoke.apply(undefined, [this.className, this.objID, "addEventListener"].concat(args));
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener() {
            for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                args[_key11] = arguments[_key11];
            }

            invoke.apply(undefined, [this.className, this.objID, "removeEventListener"].concat(args));
        }
    }, {
        key: 'addAnimation',
        value: function addAnimation() {
            for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                args[_key12] = arguments[_key12];
            }

            var stash = args;
            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, [this.className, this.objID, "addAnimation"].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'removeAnimationForKey',
        value: function removeAnimationForKey(arg) {
            invoke(this.className, this.objID, "removeAnimationForKey", arg);
        }
    }, {
        key: 'removeAllAnimation',
        value: function removeAllAnimation() {
            invoke(this.className, this.objID, "removeAllAnimation");
        }
    }, {
        key: 'requestViewWidth',
        value: function requestViewWidth(arg) {
            invoke(this.className, this.objID, "requestViewWidth", arg);
        }
    }, {
        key: 'requestViewHeight',
        value: function requestViewHeight(arg) {
            invoke(this.className, this.objID, "requestViewHeight", arg);
        }
    }, {
        key: 'resetStyle',
        value: function resetStyle() {
            invoke(this.className, this.objID, "resetStyle");
        }
    }, {
        key: 'recycle',
        value: function recycle() {
            invoke(this.className, this.objID, "recycle");
        }
    }, {
        key: 'style',
        set: function set(arg) {
            this._style = arg;
            arg = transSingleArg(arg);
            invoke(this.className, this.objID, "setStyle", arg);
        },
        get: function get() {
            return this._style;
        }
    }, {
        key: 'enabled',
        set: function set(arg) {
            this._enabled = arg;
            invoke(this.className, this.objID, "setEnabled", arg);
        },
        get: function get() {
            return this._enabled;
        }
    }, {
        key: 'accessible',
        set: function set(arg) {
            this._accessible = arg;
            invoke(this.className, this.objID, "setAccessible", arg);
        },
        get: function get() {
            return this._accessible;
        }
    }, {
        key: 'accessibilityLabel',
        set: function set(arg) {
            this._accessibilityLabel = arg;
            invoke(this.className, this.objID, "setAccessibilityLabel", arg);
        },
        get: function get() {
            return this._accessibilityLabel;
        }
    }, {
        key: 'accessibilityHint',
        set: function set(arg) {
            this._accessibilityHint = arg;
            invoke(this.className, this.objID, "setAccessibilityHint", arg);
        },
        get: function get() {
            return this._accessibilityHint;
        }
    }, {
        key: 'accessibilityRole',
        set: function set(arg) {
            this._accessibilityRole = arg;
            invoke(this.className, this.objID, "setAccessibilityRole", arg);
        },
        get: function get() {
            return this._accessibilityRole;
        }
    }, {
        key: 'accessibilityState',
        set: function set(arg) {
            this._accessibilityState = arg;
            arg = transSingleArg(arg);
            invoke(this.className, this.objID, "setAccessibilityState", arg);
        },
        get: function get() {
            return this._accessibilityState;
        }
    }]);

    return Base;
}();

__GLOBAL__.Hummer = Hummer;
__GLOBAL__.Base = Base;