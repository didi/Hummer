import { consoleAssertPolyfill, getNativeLogFunction, LogLevel } from "./console"
import injectClassModel, { ClassModel } from "./injectClassModel"

declare interface Timer {
    setInterval(handler: () => void, timeout?: number): void
    clearInterval(): void
    setTimeout(handler: () => void, timeout?: number): void
    clearTimeout(): void
}

if (!(globalThis.console && globalThis.console['_isPolyfilled']) && globalThis.nativeLoggingHook) {
    const originalConsole = globalThis.console
    if (originalConsole) {
        const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'console')
        if (descriptor) {
            Object.defineProperty(globalThis, 'originalConsole', descriptor)
        }
    }
    globalThis.console = {
        ...globalThis.console,
        error: getNativeLogFunction(LogLevel.error),
        info: getNativeLogFunction(LogLevel.info),
        log: getNativeLogFunction(LogLevel.info),
        warn: getNativeLogFunction(LogLevel.warn),
        trace: getNativeLogFunction(LogLevel.trace),
        debug: getNativeLogFunction(LogLevel.trace),
        // table: consoleTablePolyfill,
        // group: consoleGroupPolyfill,
        // groupEnd: consoleGroupEndPolyfill,
        // groupCollapsed: consoleGroupCollapsedPolyfill,
        assert: consoleAssertPolyfill,
    }
    Object.defineProperty(globalThis.console, '_isPolyfilled', {
        value: true,
        enumerable: false,
    })
    // If available, also call the original `console` method since that is
    // sometimes useful. Ex: on OS X, this will let you see rich output in
    // the Safari Web Inspector console.
    if (originalConsole) {
        Object.keys(console).forEach(methodName => {
            const hummerMethod = console[methodName]
            if (originalConsole[methodName]) {
                console[methodName] = function (...args: unknown[]) {
                    // TODO(T43930203): remove this special case once originalConsole.assert properly checks
                    // the condition
                    // if (methodName === 'assert') {
                    //     if (!args[0]) {
                    //         originalConsole.assert(...args)
                    //     }
                    // } else {
                    originalConsole[methodName](...args)
                    // }
                    hummerMethod.apply(console, args)
                }
            }
        })

        // The following methods are not supported by this polyfill but
        // we still should pass them to original console if they are
        // supported by it.
        void ['clear', 'dir', 'dirxml', 'profile', 'profileEnd'].forEach(methodName => {
            if (typeof originalConsole[methodName] === 'function') {
                console[methodName] = function (...args: unknown[]) {
                    originalConsole[methodName](...args)
                }
            }
        })
    }
}

globalThis.__GLOBAL__ = globalThis

globalThis.hummerValueStorageAdd = (value: unknown) => {
    if (!value) {
        return
    }
    if (!globalThis.hummerValueStorage) {
        globalThis.hummerValueStorage = new Map([[value, 1]])

        return
    }
    const referenceCount = globalThis.hummerValueStorage.get(value)
    if (referenceCount && referenceCount >= 1) {
        globalThis.hummerValueStorage.set(value, referenceCount + 1)
    } else {
        globalThis.hummerValueStorage.set(value, 1)
    }
}

globalThis.hummerValueStorageDelete = (value: unknown) => {
    if (!value) {
        return
    }
    const referenceCount = globalThis.hummerValueStorage?.get(value)
    if (referenceCount && referenceCount > 1) {
        globalThis.hummerValueStorage?.set(value, referenceCount - 1)
    } else {
        globalThis.hummerValueStorage?.delete(value)
    }
    if (globalThis.hummerValueStorage?.size === 0) {
        globalThis.hummerValueStorage = undefined
    }
}

globalThis.hummerCreateFunction = (object: unknown) => {
    const functionValue = (...args: unknown[]) => {
        return globalThis.hummerCallFunction(object, ...args)
    }
    // 给原生 convertValueRefToFunction 方法使用
    functionValue._privateFunction = object

    return functionValue
}

globalThis.hummerCreateObject = (privatePointer: unknown, jsClassName: string) => {
    // Object.create 不会执行构造函数
    const newObject = Object.create(globalThis[jsClassName].prototype)
    newObject._private = privatePointer

    return newObject
}

// 定时器
globalThis.setInterval = (handler, timeout) => {
    const timer = new globalThis.Timer
    globalThis.hummerValueStorageAdd(timer)
    timer.setInterval(handler, timeout)

    return timer
}

globalThis.clearInterval = timer => {
    // 强制类型转换
    if (!timer) {
        return
    }
    (timer as unknown as Timer).clearInterval()
    globalThis.hummerValueStorageDelete(timer)
}

globalThis.setTimeout = (handler, timeout) => {
    const timer = new globalThis.Timer()
    globalThis.hummerValueStorageAdd(timer)
    timer.setTimeout(() => {
        globalThis.hummerValueStorageDelete(timer)
        // 去除 string 调用全局函数的情况
        if (handler instanceof Function) {
            handler()
        }
    }, timeout)

    return timer
}

globalThis.clearTimeout = timer => {
    if (!timer) {
        return
    }
    (timer as unknown as Timer).clearTimeout()
    globalThis.hummerValueStorageDelete(timer)
}

// 由于 Object.keys 会返回 string[]，因此不需要考虑 number 和 symbol 情况
// LoaderClassModel 本身就可以是一个 {}，因此 只需要额外考虑 undefined 和 null 的情况
globalThis.hummerLoadClass = (classModelMap?: Record<string, ClassModel | undefined | null>) => {
    if (!classModelMap) {
        // 提示错误信息
        console.error('hummerLoaderClass empty ')

        return
    }

    Object.keys(classModelMap).forEach(jsClassName => {
        const loaderClassModel = classModelMap[jsClassName]
        if (globalThis[jsClassName] || !loaderClassModel) {
            return
        }
        injectClassModel(jsClassName, loaderClassModel, classModelMap)
    })

    if (globalThis.Hummer && !globalThis.Hummer.notifyCenter) {
        globalThis.Hummer.notifyCenter = new globalThis.NotifyCenter()
    }
}

export { }