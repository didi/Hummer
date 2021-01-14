//
//  HMMemCache.m
//  Hummer
//
//  Created by UJOY on 2020/2/6.
//  Copyright © 2020 didi. All rights reserved.
//

#import "HMMemCache.h"
#import "HMExportManager.h"
#import "HMJSCExecutor.h"
#import "HMJSCWeakValue.h"

@implementation HMMemCache

#pragma mark Export

HM_EXPORT_CLASS(MemoryProxy, HMMemCache)
HM_EXPORT_CLASS_METHOD(set, __setKey:value:)
HM_EXPORT_CLASS_METHOD(get, __getValueForKey:)
HM_EXPORT_CLASS_METHOD(remove, __removeForKey:)
HM_EXPORT_CLASS_METHOD(exist, __existForKey:)

static NSMutableDictionary *  __HMConfigMap ;

+ (void)__setKey:(HMBaseValue *)key value:(HMBaseValue *)value {
    NSString *keyString = key.toString;
    if (keyString.length == 0) {
        return;
    }
    id data = value.toObject;
    [self setValue:data forKey:key.toString];
}

+ (id)__getValueForKey:(HMBaseValue *)key {
    NSString *keyString = key.toString;
    if (keyString.length == 0) {
        return nil;
    }
    
    return [self getValueForKey:keyString];
}

+ (void)__removeForKey:(HMBaseValue *)key {
    NSString *keyString = key.toString;
    if (keyString.length == 0) {
        return;
    }
    [self removeForKey:keyString];
}

+ (BOOL)__existForKey:(HMBaseValue *)key {
    NSString *keyString = key.toString;
    if (keyString.length == 0) {
        return NO;
    }
    
    return [self existForKey:keyString];
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
