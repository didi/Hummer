const __GLOBAL__ = this;

const HUMMER_OBJECT_PREFIX = '-_-_-_hummer-object_-_-_-';
const HUMMER_ARRAY_PREFIX = '-_-_-_hummer-array_-_-_-';

var hm_id = 1;
const idGenerator = () => hm_id++;

const transSingleArg = (arg) => {
    if (arg instanceof Base) {
        arg = arg.objID;
    } else if (arg instanceof Function) {
        // do nothing
    } else if (arg instanceof Object) {
        arg = JSON.stringify(arg);
    }
    return arg;
}

const transSingleArgWithPrefix = (arg) => {
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
}

const transArgs = (...args) => {
    for (let i = 0; i < args.length; i++) {
        args[i] = transSingleArg(args[i]);
    }
    return args;
}

const transArgsWithPrefix = (...args) => {
    for (let i = 0; i < args.length; i++) {
        args[i] = transSingleArgWithPrefix(args[i]);
    }
    return args;
}

const console = {
    log: (...msgs) => printLog("console.log", ...msgs),
    debug: (...msgs) => printLog("console.debug", ...msgs),
    info: (...msgs) => printLog("console.info", ...msgs),
    warn: (...msgs) => printLog("console.warn", ...msgs),
    error: (...msgs) => printLog("console.error", ...msgs)
}

var __IS_DEBUG__ = false;
/**
 * 下面的日志打印逻辑，是为了支持前端console.log的Object类型参数和多参数情况
 */
const printLog = (funcName, ...msgs) => {
    if (__IS_DEBUG__) {
        let msg = '';
        if (msgs.length == 1) {
            let m = msgs[0];
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
            for (let i = 0; i < msgs.length; i++) {
                if (i > 0) {
                    msg = msg.concat(', ');
                }
                let m = msgs[i];
                if (m instanceof Function) {
                    msg = msg.concat(m.toString());
                } else if (m instanceof Object) {
                    msg = msg.concat(JSON.stringify(m));
                } else if (typeof m === 'undefined') {
                    msg = msg.concat('undefined');
                } else if (typeof m === 'null') {
                    msg = msg.concat('null');
                } else {
                    msg = msg.concat(m);
                }
            }
        }
        invoke("Hummer", 0, funcName, msg);
    }
}

const setTimeout = (func, timeout) => {
    let timer = new Timer();
    timer.setTimeout(func, timeout);
    return timer;
}

const clearTimeout = (timer) => {
    if (timer instanceof Timer) {
        timer.clearTimeout();
    }
}

const setInterval = (func, interval) => {
    let timer = new Timer();
    timer.setInterval(func, interval);
    return timer;
}

const clearInterval = (timer) => {
    if (timer instanceof Timer) {
        timer.clearInterval();
    }
}

const NotifyCenter = {
    addEventListener: (event, callback) => {
        invoke("NotifyCenter", 0, "addEventListener", event, callback);
    },
    removeEventListener: (event, callback) => {
        invoke("NotifyCenter", 0, "removeEventListener", event, callback);
    },
    triggerEvent: (event, value) => {
        invoke("NotifyCenter", 0, "triggerEvent", event, JSON.stringify(value));
    }
}

const Hummer = {
    setBasicWidth: (width) => {
        invoke("Hummer", 0, "setBasicWidth", width);
    },
    render: (view) => {
        invoke("Hummer", 0, "render", view.objID);
    },
    loadScript: (script) => {
        return invoke("Hummer", 0, "loadScript", script);
    },
    loadScriptWithUrl: (url, callback) => {
        invoke("Hummer", 0, "loadScriptWithUrl", url, callback);
    },
    postException: (err) => {
        err = transSingleArg(err);
        invoke("Hummer", 0, "postException", err);
    },
    notifyCenter: NotifyCenter,
}

class Base {
    constructor(className, ...args) {
        this.className = className;
        this.objID = idGenerator();
        this.recycler = new Recycler(this.objID);

        let params = transArgs(...args);
        invoke(this.className, this.objID, "constructor", this, ...params);

        // 已弃用
        this.initialize(...args);

        // 此方法只用于调试，为了统计组件树和函数调用树
        if (__IS_DEBUG__) {
            invoke(this.className, this.objID, "constructor_end", this);
        }
    }

    // 已弃用
    initialize(...args) {}

    set style(arg) {
        this._style = arg;
        arg = transSingleArg(arg);
        invoke(this.className, this.objID, "setStyle", arg);
    }

    get style() {
        return this._style;
    }

    set enabled(arg) {
        this._enabled = arg;
        invoke(this.className, this.objID, "setEnabled", arg);
    }

    get enabled() {
        return this._enabled;
    }

    set accessible(arg) {
        this._accessible = arg;
        invoke(this.className, this.objID, "setAccessible", arg);
    }

    get accessible() {
        return this._accessible;
    }

    set accessibilityLabel(arg) {
        this._accessibilityLabel = arg;
        invoke(this.className, this.objID, "setAccessibilityLabel", arg);
    }

    get accessibilityLabel() {
        return this._accessibilityLabel;
    }

    set accessibilityHint(arg) {
        this._accessibilityHint = arg;
        invoke(this.className, this.objID, "setAccessibilityHint", arg);
    }

    get accessibilityHint() {
        return this._accessibilityHint;
    }

    set accessibilityRole(arg) {
        this._accessibilityRole = arg;
        invoke(this.className, this.objID, "setAccessibilityRole", arg);
    }

    get accessibilityRole() {
        return this._accessibilityRole;
    }

    set accessibilityState(arg) {
        this._accessibilityState = arg;
        arg = transSingleArg(arg);
        invoke(this.className, this.objID, "setAccessibilityState", arg);
    }

    get accessibilityState() {
        return this._accessibilityState;
    }

    addEventListener(...args) {
        invoke(this.className, this.objID, "addEventListener", ...args);
    }

    removeEventListener(...args) {
        invoke(this.className, this.objID, "removeEventListener", ...args);
    }

    addAnimation(...args) {
        let stash = args;
        args = transArgs(...args);
        invoke(this.className, this.objID, "addAnimation", ...args);
    }

    removeAnimationForKey(arg) {
        invoke(this.className, this.objID, "removeAnimationForKey", arg);
    }

    removeAllAnimation() {
        invoke(this.className, this.objID, "removeAllAnimation");
    }

    getRect(arg) {
        invoke(this.className, this.objID, "getRect", arg);
    }

    resetStyle() {
        invoke(this.className, this.objID, "resetStyle");
    }

    recycle() {
        invoke(this.className, this.objID, "recycle");
    }
}

__GLOBAL__.Hummer = Hummer;
__GLOBAL__.Base = Base;