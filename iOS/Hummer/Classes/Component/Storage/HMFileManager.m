//
//  HMFileManager.m
//  Hummer
//
//  Created by didi on 2021/7/8.
//

#import "HMFileManager.h"
NSString * const HMCacheDirectoryKey = @"com_hummer_cache";

NSString * const HMCacheDirectoryDefaultKey = @"hummer_default";


@implementation HMFileManager

static NSString * __cacheDirectory;
static NSString * __cacheDirectoryOld;
static NSString * __rootDirectory;

+ (NSString *)rootDirectory {
    if (!__rootDirectory) {
        __rootDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
    }
    return __rootDirectory;
}

+ (NSString *)cacheDirectoryOld {
    if (!__cacheDirectoryOld) {
        __cacheDirectoryOld = [[self rootDirectory] stringByAppendingPathComponent:@"HMCache"];
        BOOL isDir = NO;
        BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:__cacheDirectoryOld isDirectory:&isDir];
        if (!isExist || !isDir) {
            [[NSFileManager defaultManager] createDirectoryAtPath:__cacheDirectoryOld withIntermediateDirectories:YES attributes:nil error:nil];
        }
    }
    return __cacheDirectoryOld;
}

+ (NSString *)cacheDirectory {
    if (!__cacheDirectory) {
        __cacheDirectory = [[self rootDirectory] stringByAppendingPathComponent:HMCacheDirectoryKey];
        BOOL isDir = NO;
        BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:__cacheDirectory isDirectory:&isDir];
        if (!isExist || !isDir) {
            [[NSFileManager defaultManager] createDirectoryAtPath:__cacheDirectory withIntermediateDirectories:YES attributes:nil error:nil];
        }
    }
    return __cacheDirectory;
}


+ (NSString *)createDirectoryForKey:(NSString *)key {
    NSAssert(key!=nil, @"hmStorage cache key can not be nil");
    
    NSString * filePath = [[self cacheDirectory] stringByAppendingPathComponent:key];
    BOOL isDir = NO;
    BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:filePath isDirectory:&isDir];
    if (!isExist || !isDir) {
        [[NSFileManager defaultManager] createDirectoryAtPath:filePath withIntermediateDirectories:YES attributes:nil error:nil];
    }
    return filePath;
}


+ (void)reset{
    __cacheDirectory = nil;
    __rootDirectory = nil;
    __cacheDirectoryOld = nil;
}

@end
