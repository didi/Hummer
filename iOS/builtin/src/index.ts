declare class View { viewID?: string }

declare interface Timer {
    setInterval(handler: () => void, timeout?: number): void;
    clearInterval(): void;
    setTimeout(handler: () => void, timeout?: number): void;
    clearTimeout(): void;
}

interface MethodPropertyModel {
    readonly nameString?: string,
    readonly isClass?: boolean,
    readonly isMethod?: boolean,
}

interface LoaderClassModel {
    readonly className?: string,
    readonly methodPropertyList?: (MethodPropertyModel | null | undefined)[],
    readonly superClassName?: string,
}

function isOfType<T>(varToBeChecked: unknown, propertyToCheckFor: keyof T): varToBeChecked is T {
    return (varToBeChecked as T)[propertyToCheckFor] !== undefined;
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

function isString(value: unknown): value is string {
    return typeof value === 'string' && value.length > 0;
}

const exportedClassNameCache = Symbol();

class HummerBase extends Object {
    readonly _private: unknown

    constructor(...args: unknown[]) {
        super();
        let className = this.constructor[exportedClassNameCache]
        // 1. 已缓存
        //   1. 已注入
        //   2. 未注入（兜底错误处理）实际上基本不可能存在
        // 2. 未缓存
        //   1. 本身就是注入组件
        //   2. 不是注入组件，则需要查找原型链，查找最近的属于注入组件的类名
        //     1. 查找成功，缓存
        //     2. 查找失败（兜底错误逻辑）比如 new HummerBase() 或者 class TestA extends HummerBase {}
        // 已注入 === globalThis 存在该类/函数
        // 当 globalThis.X = class X extends View {} 的情况的时候，会走到 2.1 的情况，并且直接把 X 当做注入原生组件的 JS 类名
        // 所以绝对禁止上述写法，业务方类不能放到全局声明
        if (typeof className === 'string' && !globalThis[className]) {
            console.error(`${className} 已缓存未注入`)

            return;
        }

        if (typeof className !== 'string') {
            let prototype = Object.getPrototypeOf(this);
            // new HummerBase() 情况需要排除，不能进入循环
            if (prototype !== HummerBase.prototype) {
                // 结束条件 1 找到导出组件
                // 结束条件 2 prototype === HummerBase.prototype
                do {
                    className = prototype.constructor.name;
                    prototype = Object.getPrototypeOf(prototype);
                } while (globalThis[className] || prototype == HummerBase.prototype)
            }
            // 缓存
            if (typeof className === 'string' && globalThis[className]) {
                this.constructor[exportedClassNameCache] = className;
            } else {
                // 兜底错误
                console.error('兜底异常，大概率为 new HummerBase() 或者 class TestA extends HummerBase {}')

                return;
            }
        }

        this._private = globalThis.hummerCreate(className, this, ...args);
        if (!this._private) {
            console.error('兜底异常，大概率为 globalThis.X = class X extends View {} 全局声明业务类的情况')

            return;
        }

        // 兼容代码
        this.initialize(...args);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initialize(..._args: unknown[]) {
        // 等待继承
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

// 由于 Object.keys 会返回 string[]，因此不需要考虑 number 和 symbol 情况
// LoaderClassModel 本身就可以是一个 {}，因此 只需要额外考虑 undefined 和 null 的情况
globalThis.hummerLoadClass = (loaderModel?: Record<string, LoaderClassModel | undefined | null>) => {
    if (!loaderModel) {
        // 提示错误信息
        console.error('hummerLoaderClass 空调用');

        return;
    }

    Object.keys(loaderModel).forEach(jsClassName => {
        const loaderClassModel = loaderModel[jsClassName];
        if (globalThis[jsClassName] || !loaderClassModel) {
            return;
        }
        function injectModel(loaderClassModel: LoaderClassModel, loaderModel: Record<string, LoaderClassModel | undefined | null>): typeof HummerBase | undefined {
            let jsClass = HummerBase;
            if (isString(loaderClassModel.superClassName) && loaderModel[loaderClassModel.superClassName] && !globalThis[loaderClassModel.superClassName]) {
                // 有父类并且没有注入则先注入父类
                const innerLoaderClassModel = loaderModel[loaderClassModel.superClassName]
                if (innerLoaderClassModel) {
                    const superClass = injectModel(innerLoaderClassModel, loaderModel)
                    if (superClass) {
                        jsClass = superClass
                    }
                }
            }
            jsClass = class extends jsClass { };
            loaderClassModel.methodPropertyList?.forEach(methodPropertyModel => {
                if (!methodPropertyModel || !isString(methodPropertyModel.nameString)) {
                    return;
                }
                // 由于栈帧恢复，所以需要使用新变量绑定原变量
                const inlineJSClassName = jsClassName;
                const prototypeOrClsss = methodPropertyModel.isClass ? jsClass : jsClass.prototype;
                if (methodPropertyModel.isMethod) {
                    prototypeOrClsss[methodPropertyModel.nameString] = function (...args: unknown[]) {
                        if (isOfType<HummerBase>(this, '_private')) {
                            return globalThis.hummerCall(this._private, inlineJSClassName, methodPropertyModel.nameString, ...args);
                        } else {
                            return globalThis.hummerCall(inlineJSClassName, methodPropertyModel.nameString, ...args);
                        }
                    }
                } else {
                    Object.defineProperty(prototypeOrClsss, methodPropertyModel.nameString, {
                        // 未能自动推断出来的 this 类型，最好加 unknown，保证 call apply 等情况
                        get: function (this: HummerBase | unknown) {
                            if (isOfType<HummerBase>(this, '_private')) {
                                return globalThis.hummerGetProperty(this._private, inlineJSClassName, methodPropertyModel.nameString);
                            } else {
                                return globalThis.hummerGetProperty(inlineJSClassName, methodPropertyModel.nameString);
                            }
                        },
                        set: function (this: HummerBase | unknown, newValue: unknown) {
                            if (isOfType<HummerBase>(this, '_private')) {
                                return globalThis.hummerSetProperty(this._private, inlineJSClassName, methodPropertyModel.nameString, newValue);
                            } else {
                                return globalThis.hummerSetProperty(inlineJSClassName, methodPropertyModel.nameString, newValue);
                            }
                        }
                    })
                }
            })
            // writable: false, enumerable: false, configurable: true                
            Object.defineProperty(jsClass, 'name', { value: jsClassName });
            // 挂载
            globalThis[jsClassName] = jsClass;

            return jsClass;
        }
        injectModel(loaderClassModel, loaderModel)
    });

    if (globalThis.Hummer && !globalThis.Hummer.notifyCenter) {
        globalThis.Hummer.notifyCenter = new globalThis.NotifyCenter();
    }

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