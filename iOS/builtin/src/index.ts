interface MethodPropertyModel {
    readonly nameString?: string,
    readonly isClass?: boolean,
    readonly isMethod?: boolean,
}

interface LoaderClassModel {
    readonly className?: string,
    readonly methodPropertyList?: [MethodPropertyModel],
    readonly superClassName?: string,
}

globalThis.__GLOBAL__ = globalThis;

globalThis.hummerValueStorageAdd = (value: any) => {
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

globalThis.hummerValueStorageDelete = (value: any) => {
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

function isString(value: any) {
    return typeof value === 'string' && value.length > 0;
}

globalThis.exportedClassNameCache = Symbol();

class HummerBase extends Object {
    readonly _private: any

    constructor(...args: [any]) {
        super();
        let className = this.constructor.name;
        if (isString(this.constructor[globalThis.exportedClassNameCache]) && globalThis.exporedComponentMap?.get(this.constructor[globalThis.exportedClassNameCache])) {
            // 直接使用缓存类名
            className = this.constructor[globalThis.exportedClassNameCache];
            if (Object.getPrototypeOf(this.constructor.prototype).constructor[globalThis.exportedClassNameCache] && this.constructor.hasOwnProperty(globalThis.exportedClassNameCache)) {
                // 原型链上已经缓存并且自身也重复缓存则删除自身缓存
                delete this.constructor[globalThis.exportedClassNameCache];
            }
        } else if (!globalThis.exporedComponentMap?.get(className)) {
            // 不是导出组件
            let prototype = Object.getPrototypeOf(this);
            // 结束条件 1 找到导出组件
            // 结束条件 2 prototype === HummerBase.prototype
            while (!globalThis.exporedComponentMap?.get(className) && prototype !== HummerBase.prototype) {
                prototype = Object.getPrototypeOf(prototype);
                className = prototype.constructor.name;
            }
            // 找到了导出组件
            if (prototype === HummerBase.prototype || !isString(className)) {
                // 排除特殊情况
                console.error('兜底断言触发');

                return;
            }
            // 缓存
            this.constructor[globalThis.exportedClassNameCache] = className;
        }
        // 构造 _private
        this._private = globalThis.hummerCreate(className, this, ...args);
        // 兼容代码
        this.initialize(...args);
    }

    initialize(..._args: [any]) { }
}

globalThis.hummerCreateClosure = (object: any) => {
    const closureValue = (...args: [any]) => {
        return globalThis.hummerCallClosure(object, ...args);
    }
    // 给原生 convertValueRefToClosure 方法使用
    closureValue._privateClosure = object;

    return closureValue;
}

globalThis.hummerCreateObject = (privatePointer: any, jsClassName: string) => {
    // Object.create 不会执行构造函数
    const newObject = Object.create(globalThis[jsClassName].prototype);
    newObject._private = privatePointer;

    return newObject;
}

globalThis.hummerLoadClass = (loaderModel?: Object) => {
    if (!loaderModel) {
        // 提示错误信息
        console.error('hummerLoaderClass 空调用');

        return;
    }

    Object.keys(loaderModel).forEach(jsClassName => {
        interface StackModel {
            jsClassName: string,
            value: LoaderClassModel,
            // jsClass: new (...args: [any]) => any
        }
        let stackArray: Array<StackModel> | undefined;

        let value: LoaderClassModel | undefined = loaderModel[jsClassName];
        if (!isString(jsClassName) || globalThis.exporedComponentMap?.get(jsClassName) || !value) {
            return;
        }
        do {
            if (!value) {
                return;
            }
            let jsClass: new (...args: [any]) => any = HummerBase;
            if (value.superClassName && isString(value.superClassName) && loaderModel[value.superClassName]) {
                // 有父类
                if (!globalThis.exporedComponentMap?.get(value.superClassName)) {
                    // 父类未加载，则递归加载
                    if (!stackArray) {
                        stackArray = [];
                    }
                    // 压栈
                    stackArray.push({
                        jsClassName,
                        value
                    });
                    jsClassName = value.superClassName;
                    value = loaderModel[jsClassName];
                    // 下一个循环
                    continue;
                } else {
                    // 正常加载父类
                    jsClass = globalThis.exporedComponentMap?.get(value.superClassName);
                }
            }
            jsClass = class extends jsClass { };
            value.methodPropertyList?.forEach(value => {
                if (!value.nameString || !isString(value.nameString)) {
                    return;
                }
                // 由于栈帧恢复，所以需要使用新变量绑定原变量
                const inlineJSClassName = jsClassName;
                const prototypeOrClsss = value.isClass ? jsClass : jsClass?.prototype;
                if (value.isMethod) {
                    prototypeOrClsss[value.nameString] = function (...args: [any]) {
                        if (value.isClass) {
                            return globalThis.hummerCall(inlineJSClassName, value.nameString, ...args);
                        } else {
                            return globalThis.hummerCall(this._private, inlineJSClassName, value.nameString, ...args);
                        }
                    }
                } else {
                    Object.defineProperty(prototypeOrClsss, value.nameString, {
                        get: function () {
                            if (value.isClass) {
                                return globalThis.hummerGetProperty(inlineJSClassName, value.nameString);
                            } else {
                                return globalThis.hummerGetProperty(this._private, inlineJSClassName, value.nameString);
                            }
                        },
                        set: function (newValue: any) {
                            if (value.isClass) {
                                return globalThis.hummerSetProperty(inlineJSClassName, value.nameString, newValue);
                            } else {
                                return globalThis.hummerSetProperty(this._private, inlineJSClassName, value.nameString, newValue);
                            }
                        }
                    })
                }
            })
            // writable: false, enumerable: false, configurable: true                
            Object.defineProperty(jsClass, 'name', { value: jsClassName });
            // 挂载类
            if (!globalThis.exporedComponentMap) {
                globalThis.exporedComponentMap = new Map();
            }
            globalThis.exporedComponentMap.set(jsClassName, jsClass);
            globalThis[jsClassName] = jsClass;
            if (stackArray && stackArray.length == 0) {
                stackArray = undefined;
            }
            const stackTop = stackArray?.pop();
            if (stackTop) {
                // 恢复栈帧
                jsClassName = stackTop.jsClassName;
                value = stackTop.value;
            }
        } while (stackArray)
    });

    if (globalThis.Hummer && !globalThis.Hummer.notifyCenter) {
        globalThis.Hummer.notifyCenter = new NotifyCenter();
    }

    globalThis.setInterval = (handler: (...args: any[]) => void, timeout?: number) => {
        const timer = new Timer();
        globalThis.hummerValueStorageAdd(timer);
        timer.setInterval(handler, timeout);

        return timer;
    }

    globalThis.clearInterval = (timer: Timer) => {
        timer.clearInterval();
        globalThis.hummerValueStorageDelete(timer);
    }

    globalThis.setTimeout = (handler: (...args: any[]) => void, timeout?: number) => {
        const timer = new Timer();
        globalThis.hummerValueStorageAdd(timer);
        timer.setTimeout(() => {
            globalThis.hummerValueStorageDelete(timer);
            handler();
        }, timeout);

        return timer;
    }

    globalThis.clearTimeout = (timer: Timer) => {
        timer.clearTimeout();
        globalThis.hummerValueStorageDelete(timer);
    }
}


globalThis.Memory = new class Memory {
    typedKey(key: string) {
        if (!key) {
            return key;
        }
        return key + '_type_hm'
    }
    set(key: string, value: any) {
        if (!key) {
            return
        }
        let tk = this.typedKey(key)

        if (value instanceof View) {
            let vid = value.viewID
            MemoryProxy.set(key, vid)
            MemoryProxy.set(tk, 'view')
            return
        }
        if (value instanceof Function) {
            MemoryProxy.set(key, value)
            MemoryProxy.set(tk, 'function')
            return
        }
        if ((value instanceof Array) || (value instanceof Object)) {
            let str = JSON.stringify(value)
            MemoryProxy.set(key, str)
            MemoryProxy.set(tk, 'object')
            return
        }
        MemoryProxy.set(key, value)
    }
    get(key: string) {
        if (!key) {
            return
        }
        let value = MemoryProxy.get(key)
        let tk = this.typedKey(key)
        let typeValue = MemoryProxy.get(tk)
        if (typeValue && typeValue === 'object') {
            let obj = JSON.parse(value)
            return obj
        }
        return value
    }
    remove(key: string) {
        if (!key) {
            return
        }
        let tk = this.typedKey(key)
        MemoryProxy.remove(key)
        MemoryProxy.remove(tk)
    }
    exist(key: any) {
        return MemoryProxy.exist(key)
    }
};

export {}