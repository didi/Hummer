//
//  HMStorage.m
//  Hummer
//
//  Created by UJOY on 2020/2/6.
//  Copyright © 2020 didi. All rights reserved.
//

#import "HMStorage.h"
#import "NSString+Hummer.h"
#import "HMExportManager.h"
#import "HMJSGlobal.h"
#import "HMBaseValue.h"
#import <Hummer/HMConfigEntryManager.h>
#import <Hummer/HMFileManager.h>

@implementation HMStorage

#pragma mark - Export

HM_EXPORT_CLASS(Storage, HMStorage)

HM_EXPORT_METHOD(set, __set:object:)

HM_EXPORT_METHOD(get, __getObjectForKey:)

HM_EXPORT_METHOD(remove,__removeObjectForKey:)

HM_EXPORT_METHOD(exist,__existForKey:)

HM_EXPORT_METHOD(getAll,__getAll)

HM_EXPORT_METHOD(allKeys,__allKeys)

HM_EXPORT_METHOD(removeAll,__removeAll)

+ (NSNumber *)__set:(HMBaseValue *)key object:(HMBaseValue *)object {
    if (object.isUndefined || object.isNull  || !key.isString) {
        return @(NO);
    }
    id<NSCoding> data = nil;
    if (object.isNumber) {
        data = object.toNumber;
    } else if (object.isBoolean) {
        data = @(object.toBool);
    } else if (object.isString) {
        data = object.toString;
    } else if (object.isArray) {
        data = object.toArray;
    } else if (object.isObject) {
        data  = object.toObject;
    }
    if (data) {
        
        id<HMStorage> storage = [HMStorageAdaptor storageWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
        return @([storage saveData:data forKey:key.toString]);
    }

    return @NO;
}

+ (id<NSCoding>)__getObjectForKey:(HMBaseValue *)key {
    if (!key.isString) {
        return nil;
    }
    id<HMStorage> storage = [HMStorageAdaptor storageWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    return [storage ObjectForKey:key.toString];
}

+ (NSNumber *)__removeObjectForKey:(HMBaseValue *)key {
    if (!key.isString) {
        return @(NO);
    }
    id<HMStorage> storage = [HMStorageAdaptor storageWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    return @([storage removeForKey:key.toString]);
}

+ (NSNumber *)__existForKey:(HMBaseValue *)key {
    if (!key.isString) {
        return @(false);
    }
    id<HMStorage> storage = [HMStorageAdaptor storageWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    return @([storage existForKey:key.toString]);
}

+ (void)__removeAll {
    
    id<HMStorage> storage = [HMStorageAdaptor storageWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    [storage removeAll];
}

+ (nonnull NSArray<NSString *> *)__allKeys {
    
    id<HMStorage> storage = [HMStorageAdaptor storageWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    return [storage allKeys];
}

+ (NSDictionary *)__getAll {
 
    id<HMStorage> storage = [HMStorageAdaptor storageWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
    return [storage getAll];
}

@end

@interface HMStorageImp()

@property (nonatomic, strong, readwrite) NSString *path;

@property (nonatomic, strong, readwrite) NSString *cachePath;

@end

@implementation HMStorageImp

- (instancetype)initWithPath:(NSString *)path {
    
    self = [super init];
    if (self) {
        
        _path = path;
        //Document/namespace/hm_storage/key.xxx
        _cachePath = [[HMFileManager sharedManager] createDirectoryAtHMDocumentRoot:[NSString stringWithFormat:@"%@/%@", path, HMStorageDirectoryDefaultKey]];
    }
    return self;;
}
#pragma mark - common

- (BOOL)existForKey:(NSString *)key {
    
    if (![NSString hm_isValidString:key]) {
        return NO;
    }
    NSString *fullPath = [self getFilePathWithKey:key];
    return [[NSFileManager defaultManager] fileExistsAtPath:fullPath];
}


- (BOOL)removeForKey:(NSString *)key {
    if (![self existForKey:key]) {
        return YES;
    }
    NSString * fullPath = [self getFilePathWithKey:key];
    NSError * error ;
    [[NSFileManager defaultManager] removeItemAtPath:fullPath error:&error];
    return error!=nil;
}

- (BOOL)removeAll {
    NSError * error ;
    [[NSFileManager defaultManager] removeItemAtPath:self.cachePath error:&error];
    return error!=nil;
}


- (BOOL)saveData:(id<NSCoding>)data forKey:(NSString *)key {
    if (![NSString hm_isValidString:key]) {
        return YES;
    }
    BOOL ret = [NSKeyedArchiver archiveRootObject:data toFile:[self getFilePathWithKey:key]];
    return ret;
}

-(id<NSCoding>)ObjectForKey:(NSString *)key {
    if (![NSString hm_isValidString:key]) {
        return nil;
    }
    NSString *fullPath = [self getFilePathWithKey:key];
    return (id<NSCoding>)[NSKeyedUnarchiver unarchiveObjectWithFile:fullPath];
}

- (nonnull NSArray<NSString *> *)allKeys {

    NSArray<NSString *> *keys = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:self.cachePath error:nil];
    if (keys) {
     
        return keys;
    }
    return @[];
}

- (NSDictionary *)getAll {
    NSArray<NSString *> *keys = [self allKeys];
    if (keys) {
        NSMutableDictionary *res = [NSMutableDictionary new];
        [keys enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            id value = [self ObjectForKey:obj];
            if (value) {
                
                [res setObject:value forKey:obj];
            }
        }];
        return res;
    }
    return @{};
}

#pragma mark - Private

- (NSString *)getFilePathWithKey:(NSString *)key {
    NSAssert(key!=nil, @"hmStorage cache key can not be nil");
    NSString * filePath = [_cachePath stringByAppendingPathComponent:key];
    return filePath;
}



@end
