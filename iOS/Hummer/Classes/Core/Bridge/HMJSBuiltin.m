//
//  HMJSBuiltin.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSBuiltin.h"

@implementation HMJSBuiltin

NSString * const HMBuiltinBaseJSScript = @"\
const __GLOBAL__ = this;\n\
class HMJSObject extends Object {\n\
    constructor(...args){\n\
        super(...args);\n\
        this.private = this.getPrivate(...args);\n\
        this.registerMethods();\n\
        this.registerVariables();\n\
        this.retained(this,()=>{\n\
            this.finalize();\n\
        });\n\
        this.initialize(...args);\n\
    }\n\
    registerMethods(){\n\
        for(let method of this.private.methods){\n\
            this[method] = function(...args){\n\
                return this.private[method](...args);\n\
            }\n\
        }\n\
    }\n\
    registerVariables(){\n\
        for(let variable of this.private.variables){\n\
            var self = this;\n\
            Object.defineProperty(self, variable, {\n\
                get : function(){ return self.private[variable]; },\n\
                set : function(newValue){ self.private[variable] = newValue; },\n\
                enumerable : true,\n\
                configurable : true,\n\
            })\n\
        }\n\
    }\n\
    getPrivate(...args){ return null; }\n\
    initialize(){ }\n\
    finalize(){ }\n\
}\n\
class HMJSUtility extends Object {\n\
    static createClass(className){\n\
        let privateClass = class Private extends HMJSObject {\n\
            getPrivate(...args){\n\
                var objcClass = 'OBJC_' + className;\n\
                return __GLOBAL__[objcClass](...args);\n\
            }\n\
        };\n\
        Object.defineProperty(privateClass, 'name', {value: className});\n\
        return privateClass;\n\
    }\n\
    static registerStatics(className, methods){\n\
        for(let method of methods){\n\
            __GLOBAL__[className][method] = function(...args){\n\
                return Hummer.callFunc(className, method, args);\n\
            }\n\
        }\n\
    }\n\
    static initGlobalEnv(classList){\n\
        for(let className in classList){\n\
            let privateClass = this.createClass(className);\n\
            Object.defineProperty(__GLOBAL__, className, {value: privateClass});\n\
            this.registerStatics(className, classList[className]);\n\
        }\n\
    }\n\
}";

NSString * const HMBuiltinMemoryJSScript = @" \
\n \
var Memory = new class Memory { \n\
    typedKey(key) { \n\
        if (!key) { \n\
            return key; \n\
        } \n\
        return key + '_type_hm' \n\
    } \n\
    set(key, value) { \n\
        if (!key) { \n\
            return \n\
        } \n\
        let tk = this.typedKey(key) \n\
        \n\
        if (value instanceof View) { \n\
            let vid = value.viewID \n\
            MemoryProxy.set(key, vid) \n\
            MemoryProxy.set(tk, 'view') \n\
            return \
        } \n\
        if (value instanceof Function) { \n\
            MemoryProxy.set(key, value) \n\
            MemoryProxy.set(tk, 'function') \n\
            return \n\
        } \n\
        if ((value instanceof Array) || (value instanceof Object)) { \n\
            let str = JSON.stringify(value) \n\
            MemoryProxy.set(key, str) \n\
            MemoryProxy.set(tk, 'object') \n\
            return \n\
        } \n\
        MemoryProxy.set(key, value) \n\
    } \n\
    get(key) { \n\
        if (!key) { \n\
            return \n\
        } \n\
        let value = MemoryProxy.get(key) \n\
        let tk = this.typedKey(key) \n\
        let typeValue = MemoryProxy.get(tk) \n\
        if (typeValue && typeValue === 'object') { \n\
            let obj = JSON.parse(value) \n\
            return obj \n\
        } \n\
        return value \n\
    } \n\
    remove(key) { \n\
        if (!key) { \n\
            return \n\
        } \n\
        let tk = this.typedKey(key) \n\
        MemoryProxy.remove(key) \n\
        MemoryProxy.remove(tk) \n\
    } \n\
    exist(key) { \n\
        return MemoryProxy.exist(key) \n\
    } \n\
}; \n\
\n \
";

@end
