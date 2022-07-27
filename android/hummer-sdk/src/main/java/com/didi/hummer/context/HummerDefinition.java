package com.didi.hummer.context;

/**
 * Created by XiaoFeng on 2022/6/2.
 */
public class HummerDefinition {

    /**
     * 正常模式下的核心定义
     */
    public static final String CORE = "const __GLOBAL__ = this;\n" +
            "\n" +
            "const HUMMER_OBJECT_PREFIX = '-_-_-_hummer-object_-_-_-';\n" +
            "const HUMMER_ARRAY_PREFIX = '-_-_-_hummer-array_-_-_-';\n" +
            "\n" +
            "var hm_id = 1;\n" +
            "const idGenerator = () => hm_id++;\n" +
            "\n" +
            "const transSingleArg = (arg) => {\n" +
            "    if (arg instanceof Base) {\n" +
            "        arg = arg.objID;\n" +
            "    } else if (arg instanceof Function) {\n" +
            "        // do nothing\n" +
            "    } else if (arg instanceof Object) {\n" +
            "        arg = JSON.stringify(arg);\n" +
            "    }\n" +
            "    return arg;\n" +
            "}\n" +
            "\n" +
            "const transSingleArgWithPrefix = (arg) => {\n" +
            "    if (arg instanceof Base) {\n" +
            "        arg = arg.objID;\n" +
            "    } else if (arg instanceof Function) {\n" +
            "        // do nothing\n" +
            "    } else if (arg instanceof Array) {\n" +
            "        arg = HUMMER_ARRAY_PREFIX + JSON.stringify(arg);\n" +
            "    } else if (arg instanceof Object) {\n" +
            "        arg = HUMMER_OBJECT_PREFIX + JSON.stringify(arg);\n" +
            "    }\n" +
            "    return arg;\n" +
            "}\n" +
            "\n" +
            "const transArgs = (...args) => {\n" +
            "    for (let i = 0; i < args.length; i++) {\n" +
            "        args[i] = transSingleArg(args[i]);\n" +
            "    }\n" +
            "    return args;\n" +
            "}\n" +
            "\n" +
            "const transArgsWithPrefix = (...args) => {\n" +
            "    for (let i = 0; i < args.length; i++) {\n" +
            "        args[i] = transSingleArgWithPrefix(args[i]);\n" +
            "    }\n" +
            "    return args;\n" +
            "}\n" +
            "\n" +
            "const console = {\n" +
            "    log: (...msgs) => printLog(\"console.log\", ...msgs),\n" +
            "    debug: (...msgs) => printLog(\"console.debug\", ...msgs),\n" +
            "    info: (...msgs) => printLog(\"console.info\", ...msgs),\n" +
            "    warn: (...msgs) => printLog(\"console.warn\", ...msgs),\n" +
            "    error: (...msgs) => printLog(\"console.error\", ...msgs)\n" +
            "}\n" +
            "\n" +
            "var __IS_DEBUG__ = false;\n" +
            "/**\n" +
            " * 下面的日志打印逻辑，是为了支持前端console.log的Object类型参数和多参数情况\n" +
            " */\n" +
            "const printLog = (funcName, ...msgs) => {\n" +
            "    if (__IS_DEBUG__) {\n" +
            "        let msg = '';\n" +
            "        if (msgs.length == 1) {\n" +
            "            let m = msgs[0];\n" +
            "            if (typeof m === 'undefined') {\n" +
            "                msg = 'undefined';\n" +
            "            } else if (m == null) {\n" +
            "                msg = 'null';\n" +
            "            } else if (m instanceof Error) {\n" +
            "                msg = m.toString() + '\\n' + m.stack;\n" +
            "            } else if (m instanceof Function) {\n" +
            "                msg = m.toString();\n" +
            "            } else if (m instanceof Object) {\n" +
            "                msg = JSON.stringify(m);\n" +
            "            } else {\n" +
            "                msg = m.toString();\n" +
            "            }\n" +
            "        } else if (msgs.length > 1) {\n" +
            "            for (let i = 0; i < msgs.length; i++) {\n" +
            "                if (i > 0) {\n" +
            "                    msg = msg.concat(', ');\n" +
            "                }\n" +
            "                let m = msgs[i];\n" +
            "                if (typeof m === 'undefined') {\n" +
            "                    msg = msg.concat('undefined');\n" +
            "                } else if (m == null) {\n" +
            "                    msg = msg.concat('null');\n" +
            "                } else if (m instanceof Error) {\n" +
            "                    msg = msg.concat(m.toString() + '\\n' + m.stack);\n" +
            "                } else if (m instanceof Function) {\n" +
            "                    msg = msg.concat(m.toString());\n" +
            "                } else if (m instanceof Object) {\n" +
            "                    msg = msg.concat(JSON.stringify(m));\n" +
            "                } else {\n" +
            "                    msg = msg.concat(m.toString());\n" +
            "                }\n" +
            "            }\n" +
            "        }\n" +
            "        invoke(\"Hummer\", 0, funcName, msg);\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "const setTimeout = (func, timeout) => {\n" +
            "    let timer = new Timer();\n" +
            "    timer.setTimeout(func, timeout);\n" +
            "    return timer;\n" +
            "}\n" +
            "\n" +
            "const clearTimeout = (timer) => {\n" +
            "    if (timer instanceof Timer) {\n" +
            "        timer.clearTimeout();\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "const setInterval = (func, interval) => {\n" +
            "    let timer = new Timer();\n" +
            "    timer.setInterval(func, interval);\n" +
            "    return timer;\n" +
            "}\n" +
            "\n" +
            "const clearInterval = (timer) => {\n" +
            "    if (timer instanceof Timer) {\n" +
            "        timer.clearInterval();\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "const NotifyCenter = {\n" +
            "    addEventListener: (event, callback) => {\n" +
            "        invoke(\"NotifyCenter\", 0, \"addEventListener\", event, callback);\n" +
            "    },\n" +
            "    removeEventListener: (event, callback) => {\n" +
            "        invoke(\"NotifyCenter\", 0, \"removeEventListener\", event, callback);\n" +
            "    },\n" +
            "    triggerEvent: (event, value) => {\n" +
            "        invoke(\"NotifyCenter\", 0, \"triggerEvent\", event, JSON.stringify(value));\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "const Hummer = {\n" +
            "    setBasicWidth: (width) => {\n" +
            "        invoke(\"Hummer\", 0, \"setBasicWidth\", width);\n" +
            "    },\n" +
            "    render: (view) => {\n" +
            "        invoke(\"Hummer\", 0, \"render\", view.objID);\n" +
            "    },\n" +
            "    onRenderFinished: (isSucceed) => {\n" +
            "        invoke(\"Hummer\", 0, \"onRenderFinished\", isSucceed);\n" +
            "    },\n" +
            "    getRootView: () => {\n" +
            "        return invoke(\"Hummer\", 0, \"getRootView\");\n" +
            "    },\n" +
            "    loadScript: (script) => {\n" +
            "        return invoke(\"Hummer\", 0, \"loadScript\", script);\n" +
            "    },\n" +
            "    loadScriptWithUrl: (url, callback) => {\n" +
            "        invoke(\"Hummer\", 0, \"loadScriptWithUrl\", url, callback);\n" +
            "    },\n" +
            "    postException: (err) => {\n" +
            "        err = transSingleArg(err);\n" +
            "        invoke(\"Hummer\", 0, \"postException\", err);\n" +
            "    },\n" +
            "    notifyCenter: NotifyCenter,\n" +
            "}\n" +
            "\n" +
            "class Base {\n" +
            "    constructor(className, ...args) {\n" +
            "        this.className = className;\n" +
            "        this.objID = idGenerator();\n" +
            "        this.recycler = new Recycler(this.objID);\n" +
            "\n" +
            "        let params = transArgs(...args);\n" +
            "        invoke(this.className, this.objID, \"constructor\", this, ...params);\n" +
            "\n" +
            "        // 已弃用\n" +
            "        this.initialize(...args);\n" +
            "\n" +
            "        // 此方法只用于调试，为了统计组件树和函数调用树\n" +
            "        if (__IS_DEBUG__) {\n" +
            "            invoke(this.className, this.objID, \"constructor_end\", this);\n" +
            "        }\n" +
            "    }\n" +
            "\n" +
            "    // 已弃用\n" +
            "    initialize(...args) {}\n" +
            "\n" +
            "    set style(arg) {\n" +
            "        this._style = arg;\n" +
            "        arg = transSingleArg(arg);\n" +
            "        invoke(this.className, this.objID, \"setStyle\", arg);\n" +
            "    }\n" +
            "\n" +
            "    get style() {\n" +
            "        return this._style;\n" +
            "    }\n" +
            "\n" +
            "    set enabled(arg) {\n" +
            "        this._enabled = arg;\n" +
            "        invoke(this.className, this.objID, \"setEnabled\", arg);\n" +
            "    }\n" +
            "\n" +
            "    get enabled() {\n" +
            "        return this._enabled;\n" +
            "    }\n" +
            "\n" +
            "    set accessible(arg) {\n" +
            "        this._accessible = arg;\n" +
            "        invoke(this.className, this.objID, \"setAccessible\", arg);\n" +
            "    }\n" +
            "\n" +
            "    get accessible() {\n" +
            "        return this._accessible;\n" +
            "    }\n" +
            "\n" +
            "    set accessibilityLabel(arg) {\n" +
            "        this._accessibilityLabel = arg;\n" +
            "        invoke(this.className, this.objID, \"setAccessibilityLabel\", arg);\n" +
            "    }\n" +
            "\n" +
            "    get accessibilityLabel() {\n" +
            "        return this._accessibilityLabel;\n" +
            "    }\n" +
            "\n" +
            "    set accessibilityHint(arg) {\n" +
            "        this._accessibilityHint = arg;\n" +
            "        invoke(this.className, this.objID, \"setAccessibilityHint\", arg);\n" +
            "    }\n" +
            "\n" +
            "    get accessibilityHint() {\n" +
            "        return this._accessibilityHint;\n" +
            "    }\n" +
            "\n" +
            "    set accessibilityRole(arg) {\n" +
            "        this._accessibilityRole = arg;\n" +
            "        invoke(this.className, this.objID, \"setAccessibilityRole\", arg);\n" +
            "    }\n" +
            "\n" +
            "    get accessibilityRole() {\n" +
            "        return this._accessibilityRole;\n" +
            "    }\n" +
            "\n" +
            "    set accessibilityState(arg) {\n" +
            "        this._accessibilityState = arg;\n" +
            "        arg = transSingleArg(arg);\n" +
            "        invoke(this.className, this.objID, \"setAccessibilityState\", arg);\n" +
            "    }\n" +
            "\n" +
            "    get accessibilityState() {\n" +
            "        return this._accessibilityState;\n" +
            "    }\n" +
            "\n" +
            "    addEventListener(...args) {\n" +
            "        invoke(this.className, this.objID, \"addEventListener\", ...args);\n" +
            "    }\n" +
            "\n" +
            "    removeEventListener(...args) {\n" +
            "        invoke(this.className, this.objID, \"removeEventListener\", ...args);\n" +
            "    }\n" +
            "\n" +
            "    addAnimation(...args) {\n" +
            "        let stash = args;\n" +
            "        args = transArgs(...args);\n" +
            "        invoke(this.className, this.objID, \"addAnimation\", ...args);\n" +
            "    }\n" +
            "\n" +
            "    removeAnimationForKey(arg) {\n" +
            "        invoke(this.className, this.objID, \"removeAnimationForKey\", arg);\n" +
            "    }\n" +
            "\n" +
            "    removeAllAnimation() {\n" +
            "        invoke(this.className, this.objID, \"removeAllAnimation\");\n" +
            "    }\n" +
            "\n" +
            "    getRect(arg) {\n" +
            "        invoke(this.className, this.objID, \"getRect\", arg);\n" +
            "    }\n" +
            "\n" +
            "    resetStyle() {\n" +
            "        invoke(this.className, this.objID, \"resetStyle\");\n" +
            "    }\n" +
            "\n" +
            "    recycle() {\n" +
            "        invoke(this.className, this.objID, \"recycle\");\n" +
            "    }\n" +
            "\n" +
            "    dbg_highlight(arg) {\n" +
            "        let stash = arg;\n" +
            "        arg = transSingleArg(arg);\n" +
            "        invoke(this.className, this.objID, \"dbg_highlight\", arg);\n" +
            "    }\n" +
            "\n" +
            "    dbg_getDescription(...args) {\n" +
            "        let stash = args;\n" +
            "        args = transArgs(...args);\n" +
            "        invoke(this.className, this.objID, \"dbg_getDescription\", ...args);\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "__GLOBAL__.Hummer = Hummer;\n" +
            "__GLOBAL__.Base = Base;";

    /**
     * ES5版本的核心定义（仅用于Hermes调式模式）
     */
    public static String ES5_CORE = "";

    /**
     * ES5版本的SDK定义（仅用于Hermes调式模式）
     */
    public static String ES5_SDK = "";

    /**
     * ES5版本的组件定义（仅用于Hermes调式模式）
     */
    public static String ES5_COMP = "";

    /**
     * BABEL定义（仅用于Hermes调式模式）
     */
    public static String BABEL = "";
}
