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
#import <Hummer/HMConfigEntryManager.h>
#import <Hummer/HMJSGlobal.h>

@implementation HMMemCache

#pragma mark Export

HM_EXPORT_CLASS(Memory, HMMemCache)
HM_EXPORT_CLASS_METHOD(set, __setKey:value:)
HM_EXPORT_CLASS_METHOD(get, __getValueForKey:)
HM_EXPORT_CLASS_METHOD(remove, __removeForKey:)
HM_EXPORT_CLASS_METHOD(exist, __existForKey:)
HM_EXPORT_CLASS_METHOD(getAll,__getAll)
HM_EXPORT_CLASS_METHOD(allKeys,__allKeys)

static NSMutableDictionary *  __HMConfigMap ;

+ (void)__setKey:(HMBaseValue *)key value:(HMBaseValue *)value {
    NSString *keyString = key.toString;
    if (keyString.length == 0) {
        return;
    }
    id data = value.toObject;
    
    id<HMMemoryComponent> mem = [HMMemoryAdaptor memoryWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    [mem setValue:data forKey:key.toString];
}

+ (id)__getValueForKey:(HMBaseValue *)key {
    NSString *keyString = key.toString;
    if (keyString.length == 0) {
        return nil;
    }
    id<HMMemoryComponent> mem = [HMMemoryAdaptor memoryWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    return [mem getValueForKey:keyString];
}

+ (void)__removeForKey:(HMBaseValue *)key {
    NSString *keyString = key.toString;
    if (keyString.length == 0) {
        return;
    }
    id<HMMemoryComponent> mem = [HMMemoryAdaptor memoryWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    [mem removeForKey:keyString];
}

+ (BOOL)__existForKey:(HMBaseValue *)key {
    NSString *keyString = key.toString;
    if (keyString.length == 0) {
        return NO;
    }
    id<HMMemoryComponent> mem = [HMMemoryAdaptor memoryWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    return [mem getValueForKey:keyString] ? YES : FALSE;
}

+ (nonnull NSArray<NSString *> *)__allKeys {
    
    id<HMMemoryComponent> mem = [HMMemoryAdaptor memoryWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    return [mem allKeys];
}

+ (NSDictionary *)__getAll {
 
    id<HMMemoryComponent> mem = [HMMemoryAdaptor memoryWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    return [mem getAll];
}

@end

@interface HMMemoryComponent()
@property (nonatomic, strong, readwrite) NSString *namespace;
@property (nonatomic, strong, readwrite) NSMutableDictionary *cache;

@end

@implementation HMMemoryComponent

- (instancetype)initWithNamespace:(NSString *)namespace {
    self = [super init];
    if (self) {
        _namespace = namespace;
        _cache = [NSMutableDictionary new];
    }
    return self;
}

- (nullable NSArray *)getArrayForForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSArray class]]) {
        return (NSArray *)data;
    }
    return nil;
}

- (nullable NSDictionary *)getDictionaryForForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSDictionary class]]) {
        return (NSDictionary *)data;
    }
    return nil;
}

- (float)getFloatForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSNumber class]]) {
        return ((NSNumber *)data).floatValue;
    }
    return 0.0;
}

- (NSUInteger)getIntegerForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSNumber class]]) {
        return ((NSNumber *)data).integerValue;
    }
    return 0.0;
}

- (nullable NSString *)getStringValueForForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSString class]]) {
        return (NSString *)data;
    }
    return nil;
}

- (nullable id)getValueForKey:(nonnull NSString *)key {
    
    return [self.cache objectForKey:key];
}

- (void)removeForKey:(nonnull NSString *)key {
    
    if (!key) {
        return;
    }
    [self.cache removeObjectForKey:key];
}

- (void)setValue:(nonnull id)value forKey:(nonnull NSString *)key {
    [self.cache setObject:value forKey:key];
}

- (nonnull NSArray<NSString *> *)allKeys {
    
    //A new array containing the dictionary’s keys, or an empty array if the dictionary has no entries.
    return [self.cache allKeys];
}


- (nonnull NSDictionary *)getAll {
    
    NSDictionary *dic = self.cache.copy;
    if (dic) {
        return dic;
    }
    return @{};
}


@end
