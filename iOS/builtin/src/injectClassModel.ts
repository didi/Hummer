import HummerBase from './HummerBase'
import { isOfType, isNotEmptyString } from './utility'

export interface FieldModel {
    readonly nameString?: string,
    readonly isClass?: boolean,
    readonly isMethod?: boolean,
}

export interface ClassModel {
    readonly methodPropertyList?: (FieldModel | null | undefined)[],
    readonly superClassName?: string,
}

export default function injectClassModel(jsClassName: string, classModel: ClassModel, classModelMap: Record<string, ClassModel | undefined | null>): typeof HummerBase | undefined {
    if (!isNotEmptyString(jsClassName)) {
        return
    }
    let jsClass = HummerBase
    if (isNotEmptyString(classModel.superClassName) && classModelMap[classModel.superClassName]) {
        if (typeof globalThis[classModel.superClassName] !== 'function') {
            // 有父类并且没有注入则先注入父类
            const innerLoaderClassModel = classModelMap[classModel.superClassName]
            if (innerLoaderClassModel) {
                const superClass = injectClassModel(classModel.superClassName, innerLoaderClassModel, classModelMap)
                if (superClass) {
                    jsClass = superClass
                }
            }
        } else {
            jsClass = globalThis[classModel.superClassName]
        }
    }
    jsClass = class extends jsClass { }
    classModel.methodPropertyList?.forEach(methodPropertyModel => {
        if (!methodPropertyModel || !isNotEmptyString(methodPropertyModel.nameString)) {
            return
        }
        const prototypeOrClsss = methodPropertyModel.isClass ? jsClass : jsClass.prototype
        if (methodPropertyModel.isMethod) {
            prototypeOrClsss[methodPropertyModel.nameString] = function (...args: unknown[]) {
                if (isOfType<HummerBase>(this, '_private')) {
                    return globalThis.hummerCall(this._private, jsClassName, methodPropertyModel.nameString, ...args)
                } else {
                    return globalThis.hummerCall(jsClassName, methodPropertyModel.nameString, ...args)
                }
            }
        } else {
            Object.defineProperty(prototypeOrClsss, methodPropertyModel.nameString, {
                // 未能自动推断出来的 this 类型，最好加 unknown，保证 call apply 等情况
                get: function (this: HummerBase | unknown) {
                    if (isOfType<HummerBase>(this, '_private')) {
                        return globalThis.hummerGetProperty(this._private, jsClassName, methodPropertyModel.nameString)
                    } else {
                        return globalThis.hummerGetProperty(jsClassName, methodPropertyModel.nameString)
                    }
                },
                set: function (this: HummerBase | unknown, newValue: unknown) {
                    if (isOfType<HummerBase>(this, '_private')) {
                        return globalThis.hummerSetProperty(this._private, jsClassName, methodPropertyModel.nameString, newValue)
                    } else {
                        return globalThis.hummerSetProperty(jsClassName, methodPropertyModel.nameString, newValue)
                    }
                }
            })
        }
    })
    // writable: false, enumerable: false, configurable: true                
    Object.defineProperty(jsClass, 'name', { value: jsClassName })
    // 挂载
    globalThis[jsClassName] = jsClass

    return jsClass
}