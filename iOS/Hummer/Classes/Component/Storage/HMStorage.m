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

@implementation HMStorage

#pragma mark - Export

HM_EXPORT_CLASS(Storage, HMStorage)

HM_EXPORT_METHOD(set, __set:object:)

HM_EXPORT_METHOD(get, __getObjectForKey:)

HM_EXPORT_METHOD(remove,__removeObjectForKey:)

HM_EXPORT_METHOD(exist,__existForKey:)

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
        return @([HMStorage saveData:data forKey:key.toString]);
    }

    return @NO;
}

+ (id<NSCoding>)__getObjectForKey:(HMBaseValue *)key {
    if (!key.isString) {
        return nil;
    }
    return [HMStorage ObjectForKey:key.toString];
}

+ (NSNumber *)__removeObjectForKey:(HMBaseValue *)key {
    if (!key.isString) {
        return @(NO);
    }
    return @([HMStorage removeForKey:key.toString]);
}

+ (NSNumber *)__existForKey:(HMBaseValue *)key {
    if (!key.isString) {
        return @(false);
    }
    return @([HMStorage existForKey:key.toString]);
}

#pragma mark - common

+ (BOOL)existForKey:(NSString *)key {
    if (![NSString hm_isValidString:key]) {
        return NO;
    }
    NSString *fullPath = [self getFilePathWithKey:key];
    return [[NSFileManager defaultManager] fileExistsAtPath:fullPath];
}

+ (BOOL)removeForKey:(NSString *)key {
    if (![self existForKey:key]) {
        return YES;
    }
    NSString * fullPath = [self getFilePathWithKey:key];
    NSError * error ;
    [[NSFileManager defaultManager] removeItemAtPath:fullPath error:&error];
    return error!=nil;
}

+ (BOOL)removeAll {
    NSError * error ;
    [[NSFileManager defaultManager ] removeItemAtPath:[self cacheDirectory] error:&error];
    return error!=nil;
}

#pragma mark - File

+ (NSString *)cacheKeyWithURL:(NSString *)URL {
    if (![NSString hm_isValidString:URL]) {
        return nil;
    }
    return [URL hm_md5String];
}

+ (BOOL)saveWithURL:(NSString *)URL key:(NSString *)key {
    if (!URL.hm_isURLString || ![NSString hm_isValidString:key]) {
        return NO;
    }
    NSURL * url = [NSURL URLWithString:URL];
    NSString *fullPath = [self getFilePathWithKey:key];
    NSError *moveError = nil;
    [[NSFileManager defaultManager] moveItemAtURL:url
                                            toURL:[NSURL fileURLWithPath:fullPath]
                                            error:&moveError];
    return !moveError;
}

#pragma mark - Archive

+ (BOOL)saveData:(id<NSCoding>)data forKey:(NSString *)key {
    if (![NSString hm_isValidString:key]) {
        return YES;
    }
    BOOL ret = [NSKeyedArchiver archiveRootObject:data toFile:[self getFilePathWithKey:key]];
    return ret;
}

+(id<NSCoding>)ObjectForKey:(NSString *)key {
    if (![NSString hm_isValidString:key]) {
        return nil;
    }
    NSString *fullPath = [self getFilePathWithKey:key];
    return (id<NSCoding>)[NSKeyedUnarchiver unarchiveObjectWithFile:fullPath];
}

#pragma mark - UIImage

+ (UIImage *)ImageWithKey:(NSString *)key {
    NSData * data = [self dataWithKey:key];
    if (!data) {
        return nil;
    }
    return [UIImage imageWithData:data];
}

#pragma mark - NSData

+ (NSData *)dataWithKey:(NSString *)key {
    if (![NSString hm_isValidString:key]) {
        return nil;
    }
    return [NSData dataWithContentsOfFile:[self getFilePathWithKey:key]];
}

#pragma mark - Private

static NSString * __cacheDirectory;
+ (NSString *)cacheDirectory {
    if (!__cacheDirectory) {
        __cacheDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject] ;
        __cacheDirectory = [__cacheDirectory stringByAppendingPathComponent:@"HMCache"];
        BOOL isDir = NO;
        BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:__cacheDirectory isDirectory:&isDir];
        if (!isExist || !isDir) {
            [[NSFileManager defaultManager] createDirectoryAtPath:__cacheDirectory withIntermediateDirectories:YES attributes:nil error:nil];
        }
    }
    return __cacheDirectory;
}

+ (NSString *)getFilePathWithKey:(NSString *)key {
    NSAssert(key!=nil, @"hmStorage cache key can not be nil");
    NSString * filePath = [[self cacheDirectory] stringByAppendingPathComponent:key];
    return filePath;
}

@end
