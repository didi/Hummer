//
//  HMMemCache.m
//  Hummer
//
//  Created by UJOY on 2020/2/6.
//  Copyright © 2020 didi. All rights reserved.
//

#import "HMMemCache.h"
#import "HMExportManager.h"
#import <JavaScriptCore/JavaScriptCore.h>

#define HMMemCacheBuildInScript \
class Memory { \
    proxy: MemoryProxy \
    constructor() { \
        this.proxy = new MemoryProxy() \
    } \
    private typedKey(key: string): string { \
        if (!key) { \
            return key; \
        } \
        return key + '_type_hm' \
    } \
    set(key: string, value: any) { \
        if (!key) { \
            return \
        } \
        let tk = this.typedKey(key) \
        /* \
        if (value instanceof View) { \
            let vid = (value as View).viewID \
            this.proxy.set(key, vid) \
            this.proxy.set(tk, 'view') \
            return \
        } \
        */ \
        if (value instanceof Function) { \
            this.proxy.set(key, value) \
            this.proxy.set(tk, 'function') \
            return \
        } \
        if ((value instanceof Array) || (value instanceof Object)) { \
            let str = JSON.stringify(value) \
            this.proxy.set(key, str) \
            this.proxy.set(tk, 'object') \
            return \
        } \
        this.proxy.set(key, value) \
    } \
    get(key): any { \
        if (!key) { \
            return \
        } \
        let value = this.proxy.get(key) \
        let tk = this.typedKey(key) \
        let typeValue = this.proxy.get(tk) \
        if (typeValue && typeValue === 'object') { \
            let obj = JSON.parse(value) \
            return obj \
        } \
        return value \
    } \
    remove(key) { \
        if (!key) { \
            return \
        } \
        let tk = this.typedKey(key) \
        this.proxy.remove(key) \
        this.proxy.remove(tk) \
    } \
    exist(key: string): boolean { \
        return this.proxy.exist(key) \
    } \
}

@implementation HMMemCache

#pragma mark Export

HM_EXPORT_CLASS(MemoryProxy, HMMemCache)
HM_EXPORT_METHOD(set, __setKey:value:)
HM_EXPORT_METHOD(get, __getValueForKey:)
HM_EXPORT_METHOD(remove, __removeForKey:)
HM_EXPORT_METHOD(exist, __existForKey:)

static NSMutableDictionary *  __HMConfigMap ;

+ (void)__setKey:(JSValue *)key value:(JSValue *)value {
    if (key.isUndefined || key.isNull  || !key.isString || value.isUndefined || value.isNull) {
        return;
    }
    id data ;
    if (value.isNumber) {
        data = value.toNumber;
    }else if (value.isBoolean){
        data = @(value.toBool);
    }else if (value.isString){
        data = value.toString;
    }else if (value.isArray){
        data = value.toArray;
    }else if (value.isDate){
        data  = value.toDate;
    }else if (value.isObject){
        data  = value.toObject;
    }
    [self setValue:data forKey:key.toString];
}

+ (id)__getValueForKey:(JSValue *)key {
    if (key.isUndefined || key.isNull || !key.isString) {
        return nil;
    }
    return [self getValueForKey:key.toString];
}

+ (void)__removeForKey:(JSValue *)key {
    if (!key.isString) {
        return ;
    }
    [self removeForKey:key.toString];
}

+ (BOOL)__existForKey:(JSValue *)key {
    if (!key.isString) {
         return NO ;
    }
    return [self existForKey:key.toString];
}

#pragma mark - Public

+ (void)removeForKey:(NSString *)key {
    if (!key) {
        return;
    }
    [__HMConfigMap removeObjectForKey:key];
}

+ (BOOL)existForKey:(NSString *)key {
    if (!key) {
        return NO;
    }
    return __HMConfigMap[key] !=nil;
}

+ (void)setValue:(id)value forKey:(NSString *)key {
    if (!value || !key) {
        return;
    }
    if(!__HMConfigMap){
        __HMConfigMap = [NSMutableDictionary dictionary];
    }
    [__HMConfigMap setObject:value forKey:key];
}

+ (id)getValueForKey:(NSString *)key {
    return __HMConfigMap[key];
}

+ (float)getFloatForKey:(NSString *)key {
    id data = __HMConfigMap[key];
    if ([data isKindOfClass:[NSNumber class]]) {
        return ((NSNumber *)data).floatValue;
    }
    return 0.0;
}

+ (NSUInteger)getIntegerForKey:(NSString *)key {
    id data = __HMConfigMap[key];
    if ([data isKindOfClass:[NSNumber class]]) {
        return ((NSNumber *)data).integerValue;
    }
    return 0.0;
}

+ (NSString *)getStringValueForForKey:(NSString *)key {
    id data = __HMConfigMap[key];
    if ([data isKindOfClass:[NSString class]]) {
        return (NSString *)data;
    }
    return nil;
}

+ (NSArray *)getArrayForForKey:(NSString *)key {
    id data = __HMConfigMap[key];
    if ([data isKindOfClass:[NSArray class]]) {
        return (NSArray *)data;
    }
    return nil;
}

+ (NSDictionary *)getDictionaryForForKey:(NSString *)key {
    id data = __HMConfigMap[key];
    if ([data isKindOfClass:[NSDictionary class]]) {
        return (NSDictionary *)data;
    }
    return nil;
}
@end
