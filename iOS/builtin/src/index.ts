import injectClassModel, { ClassModel } from "./injectClassModel";

declare class View { viewID?: string }

declare interface Timer {
    setInterval(handler: () => void, timeout?: number): void;
    clearInterval(): void;
    setTimeout(handler: () => void, timeout?: number): void;
    clearTimeout(): void;
}

/*
enum LOG_LEVELS {
    trace = 0,
    info = 1,
    warn = 2,
    error = 3,
}

function consoleAssertPolyfill(expression: unknown, label: string) {
    if (!expression) {
        globalThis.nativeLoggingHook('Assertion failed: ' + label, LOG_LEVELS.error);
    }
}

function isUndefined(arg: unknown): arg is undefined {
    return arg === void 0;
}

function isString(arg: unknown): arg is string {
    return typeof arg === 'string';
}
function isNumber(arg: unknown): arg is number {
    return typeof arg === 'number';
}

function isBoolean(arg: unknown): arg is boolean {
    return typeof arg === 'boolean';
}
function isNull(arg: unknown): arg is null {
    return arg === null;
}
function isObject(arg: unknown): arg is Record<string, unknown> {
    return typeof arg === 'object' && arg !== null;
}
function objectToString(o: unknown) {
    return Object.prototype.toString.call(o);
}

function isRegExp(re: unknown): re is RegExp {
    return isObject(re) && objectToString(re) === '[object RegExp]';
}

function isError(e: unknown) {
    return (
        isObject(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error)
    );
}

function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
        const simple =
            "'" +
            JSON.stringify(value)
                .replace(/^"|"$/g, '')
                .replace(/'/g, "\\'")
                .replace(/\\"/g, '"') +
            "'";
        return ctx.stylize(simple, 'string');
    }
    if (isNumber(value)) return ctx.stylize('' + value, 'number');
    if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value)) return ctx.stylize('null', 'null');
}

function arrayToHash(array: string[]) {
    const hash = {};

    array.forEach(function (val) {
        hash[val] = true;
    });

    return hash;
}

function isArray(ar: unknown): ar is unknown[] {
    return Array.isArray(ar);
}

function isDate(d: unknown): d is Date {
    return isObject(d) && objectToString(d) === '[object Date]';
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(arg: unknown): arg is Function {
    return typeof arg === 'function';
}

function formatError(value: unknown) {
    return '[' + Error.prototype.toString.call(value) + ']';
}

interface Context {seen: unknown[], formatValueCalls: number, stylize: (str: unknown, _styleType: string) => unknown}

function formatArray(ctx: Context, value:Record<string, unknown>, recurseTimes:number, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(
          formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true,
          ),
        );
      } else {
        output.push('');
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(
          formatProperty(ctx, value, recurseTimes, visibleKeys, key, true),
        );
      }
    });
    return output;
  }

function formatValue(ctx: Context, value: Record<string, unknown>, recurseTimes: number) {
    ctx.formatValueCalls++;
    if (ctx.formatValueCalls > 200) {
        return `[TOO BIG formatValueCalls ${ctx.formatValueCalls
            } exceeded limit of 200]`;
    }

    // Primitive types cannot have properties
    const primitive = formatPrimitive(ctx, value);
    if (primitive) {
        return primitive;
    }

    // Look up the keys of the object.
    const keys = Object.keys(value);
    const visibleKeys = arrayToHash(keys);

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (
        isError(value) &&
        (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)
    ) {
        return formatError(value);
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
        if (isFunction(value)) {
            const name = value.name ? ': ' + value.name : '';
            return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
            return formatError(value);
        }
    }

    let base = '',
        array = false,
        braces = ['{', '}'];

    // Make Array say that they are Array
    if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
    }

    // Make functions say that they are functions
    if (isFunction(value)) {
        const n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
    }

    // Make error with message first say the error
    if (isError(value)) {
        base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
        if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
            return ctx.stylize('[Object]', 'special');
        }
    }

    ctx.seen.push(value);

    let output: unknown;
    if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
        output = keys.map(function (key) {
            return formatProperty(
                ctx,
                value,
                recurseTimes,
                visibleKeys,
                key,
                array,
            );
        });
    }

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function stylizeNoColor(str: unknown, _styleType: string) {
    return str;
}

function inspect(obj: unknown, opts: { depth: number }) {
    const ctx = {
        seen: [],
        formatValueCalls: 0,
        stylize: stylizeNoColor,
    };
    return formatValue(ctx, obj, opts.depth);
}

function getNativeLogFunction(level) {
    return function (...args: unknown[]) {
        let str;
        if (arguments.length === 1 && typeof args[0] === 'string') {
            str = args[0];
        } else {
            str = Array.prototype.map
                .call(args, function (arg) {
                    return inspect(arg, { depth: 10 });
                })
                .join(', ');
        }

        // TRICKY
        // If more than one argument is provided, the code above collapses them all
        // into a single formatted string. This transform wraps string arguments in
        // single quotes (e.g. "foo" -> "'foo'") which then breaks the "Warning:"
        // check below. So it's important that we look at the first argument, rather
        // than the formatted argument string.
        const firstArg = arguments[0];

        let logLevel = level;
        if (
            typeof firstArg === 'string' &&
            firstArg.slice(0, 9) === 'Warning: ' &&
            logLevel >= LOG_LEVELS.error
        ) {
            // React warnings use console.error so that a stack trace is shown,
            // but we don't (currently) want these to show a redbox
            // (Note: Logic duplicated in ExceptionsManager.js.)
            logLevel = LOG_LEVELS.warn;
        }
        if (global.__inspectorLog) {
            global.__inspectorLog(
                INSPECTOR_LEVELS[logLevel],
                str,
                [].slice.call(arguments),
                INSPECTOR_FRAMES_TO_SKIP,
            );
        }
        if (groupStack.length) {
            str = groupFormat('', str);
        }
        global.nativeLoggingHook(str, logLevel);
    };
}

if (globalThis.nativeLoggingHook) {
    const originalConsole = globalThis.console;
    if (originalConsole) {
        const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'console');
        if (descriptor) {
            Object.defineProperty(globalThis, 'originalConsole', descriptor);
        }
    }
}
*/

globalThis.__GLOBAL__ = globalThis;

globalThis.hummerValueStorageAdd = (value: unknown) => {
    if (!value) {
        return;
    }
    if (!globalThis.hummerValueStorage) {
        globalThis.hummerValueStorage = new Map([[value, 1]]);

        return;
    }
    const referenceCount = globalThis.hummerValueStorage.get(value);
    if (referenceCount && referenceCount >= 1) {
        globalThis.hummerValueStorage.set(value, referenceCount + 1);
    } else {
        globalThis.hummerValueStorage.set(value, 1);
    }
}

globalThis.hummerValueStorageDelete = (value: unknown) => {
    if (!value) {
        return;
    }
    const referenceCount = globalThis.hummerValueStorage?.get(value);
    if (referenceCount && referenceCount > 1) {
        globalThis.hummerValueStorage?.set(value, referenceCount - 1);
    } else {
        globalThis.hummerValueStorage?.delete(value);
    }
    if (globalThis.hummerValueStorage?.size === 0) {
        globalThis.hummerValueStorage = undefined;
    }
}

globalThis.hummerCreateFunction = (object: unknown) => {
    const functionValue = (...args: unknown[]) => {
        return globalThis.hummerCallFunction(object, ...args);
    }
    // 给原生 convertValueRefToFunction 方法使用
    functionValue._privateFunction = object;

    return functionValue;
}

globalThis.hummerCreateObject = (privatePointer: unknown, jsClassName: string) => {
    // Object.create 不会执行构造函数
    const newObject = Object.create(globalThis[jsClassName].prototype);
    newObject._private = privatePointer;

    return newObject;
}

// 定时器
globalThis.setInterval = (handler, timeout) => {
    const timer = new globalThis.Timer
    globalThis.hummerValueStorageAdd(timer);
    timer.setInterval(handler, timeout);

    return timer
}

globalThis.clearInterval = timer => {
    // 强制类型转换
    (timer as unknown as Timer).clearInterval();
    globalThis.hummerValueStorageDelete(timer);
}

globalThis.setTimeout = (handler, timeout) => {
    const timer = new globalThis.Timer();
    globalThis.hummerValueStorageAdd(timer);
    timer.setTimeout(() => {
        globalThis.hummerValueStorageDelete(timer);
        // 去除 string 调用全局函数的情况
        if (handler instanceof Function) {
            handler();
        }
    }, timeout);

    return timer;
}

globalThis.clearTimeout = timer => {
    if (!timer) {
        return;
    }
    globalThis.hummerValueStorageDelete(timer);
}

// 由于 Object.keys 会返回 string[]，因此不需要考虑 number 和 symbol 情况
// LoaderClassModel 本身就可以是一个 {}，因此 只需要额外考虑 undefined 和 null 的情况
globalThis.hummerLoadClass = (classModelMap?: Record<string, ClassModel | undefined | null>) => {
    if (!classModelMap) {
        // 提示错误信息
        console.error('hummerLoaderClass empty ');

        return;
    }

    Object.keys(classModelMap).forEach(jsClassName => {
        const loaderClassModel = classModelMap[jsClassName];
        if (globalThis[jsClassName] || !loaderClassModel) {
            return;
        }
        injectClassModel(jsClassName, loaderClassModel, classModelMap)
    });

    if (globalThis.Hummer && !globalThis.Hummer.notifyCenter) {
        globalThis.Hummer.notifyCenter = new globalThis.NotifyCenter();
    }
}

// 未来需要被废弃
globalThis.Memory = new class Memory {
    typedKey(key: string) {
        if (!key) {
            return key;
        }
        return key + '_type_hm'
    }
    set(key: string, value: unknown) {
        if (!key) {
            return
        }
        const tk = this.typedKey(key)

        if (value instanceof View) {
            const vid = value.viewID
            globalThis.MemoryProxy.set(key, vid)
            globalThis.MemoryProxy.set(tk, 'view')
            return
        }
        if (value instanceof Function) {
            globalThis.MemoryProxy.set(key, value)
            globalThis.MemoryProxy.set(tk, 'function')
            return
        }
        if ((value instanceof Array) || (value instanceof Object)) {
            const str = JSON.stringify(value)
            globalThis.MemoryProxy.set(key, str)
            globalThis.MemoryProxy.set(tk, 'object')
            return
        }
        globalThis.MemoryProxy.set(key, value)
    }
    get(key: string) {
        if (!key) {
            return
        }
        const value = globalThis.MemoryProxy.get(key)
        const tk = this.typedKey(key)
        const typeValue = globalThis.MemoryProxy.get(tk)
        if (typeValue && typeValue === 'object') {
            const obj = JSON.parse(value)
            return obj
        }
        return value
    }
    remove(key: string) {
        if (!key) {
            return
        }
        const tk = this.typedKey(key)
        globalThis.MemoryProxy.remove(key)
        globalThis.MemoryProxy.remove(tk)
    }
    exist(key: unknown) {
        return globalThis.MemoryProxy.exist(key)
    }
};

export { }