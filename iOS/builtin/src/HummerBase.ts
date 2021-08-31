const exportedClassNameCache = Symbol()

export default class HummerBase extends Object {
    readonly _private: unknown

    constructor(...args: unknown[]) {
        super()
        // 只有非导出组件才需要考虑缓存问题
        let className = this.constructor.name
        if (!globalThis[this.constructor.name] || globalThis[this.constructor.name] !== this.constructor) {
            className = this.constructor[exportedClassNameCache]
            // 1. 已缓存
            //   1. 已注入
            //   2. 未注入（兜底错误处理）实际上基本不可能存在
            // 2. 未缓存则查找原型链，查找最近的属于注入组件的类名
            //   1. 查找成功，缓存
            //   2. 查找失败（兜底错误逻辑）比如 new HummerBase() 或者 class TestA extends HummerBase {}
            // 已注入 === globalThis 存在该类/函数
            // 当 globalThis.X = class X extends View {} 的情况的时候，会走到 2.1 的情况，并且直接把 X 当做注入原生组件的 JS 类名
            // 所以绝对禁止上述写法，业务方类不能放到全局声明
            if (typeof className === 'string' && !globalThis[className]) {
                console.error(`${className} 已缓存未注入`)

                return
            }

            if (typeof className !== 'string') {
                let prototype = Object.getPrototypeOf(this)
                // new HummerBase() 情况需要排除，不能进入循环
                if (prototype !== HummerBase.prototype) {
                    let isExportedClass = false
                    // 结束条件 1 找到导出组件
                    // 结束条件 2 prototype === HummerBase.prototype
                    do {
                        className = prototype.constructor.name
                        if (globalThis[className] && prototype.constructor == globalThis[className]) {
                            isExportedClass = true
                        }
                        prototype = Object.getPrototypeOf(prototype)
                    } while (!isExportedClass && prototype !== HummerBase.prototype)
                }
                // 缓存
                if (typeof className === 'string' && globalThis[className]) {
                    this.constructor[exportedClassNameCache] = className
                } else {
                    // 兜底错误
                    console.error('兜底异常，大概率为 new HummerBase() 或者 class TestA extends HummerBase {}')

                    return
                }
            }
        }

        this._private = globalThis.hummerCreate(className, this, ...args)
        if (!this._private) {
            console.error('兜底异常，大概率为 globalThis.X = class X extends View {} 全局声明业务类的情况')

            return
        }

        // 兼容代码
        this.initialize(...args)
    }

    initialize(..._args: unknown[]): void {
        // 等待继承
        _args
    }
}