//
//  HMFileManager.m
//  Hummer
//
//  Created by didi on 2021/7/8.
//

#import "HMFileManager.h"
NSString * const HMSandboxDirectoryKey = @"com_hummer_cache";
NSString * const HMStorageDirectoryDefaultKey = @"hm_storage";



@implementation HMFileManager

+ (instancetype)sharedManager {
    static id _sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _sharedInstance = [[self alloc] init];
    });
    return _sharedInstance;
}

- (NSString *)documentDirectory {
    if (!_documentDirectory) {
        _documentDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
    }
    return _documentDirectory;
}

- (NSString *)cacheDirectory {
    if (!_cacheDirectory) {
        _cacheDirectory = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject];
    }
    return _cacheDirectory;
}


- (NSString *)hummerDocumentDirectoryRoot {
    if (!_hummerDocumentDirectoryRoot) {
        NSString *root = [self.documentDirectory stringByAppendingPathComponent:HMSandboxDirectoryKey];
        BOOL isDir = NO;
        BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:root isDirectory:&isDir];
        if (!isExist || !isDir) {
            [[NSFileManager defaultManager] createDirectoryAtPath:root withIntermediateDirectories:YES attributes:nil error:nil];
        }
        _hummerDocumentDirectoryRoot = root;
    }
    return _hummerDocumentDirectoryRoot;
}

- (NSString *)hummerCacheDirectoryRoot {
    
    if (!_hummerCacheDirectoryRoot) {
        NSString *root = [self.cacheDirectory stringByAppendingPathComponent:HMSandboxDirectoryKey];
        BOOL isDir = NO;
        BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:root isDirectory:&isDir];
        if (!isExist || !isDir) {
            [[NSFileManager defaultManager] createDirectoryAtPath:root withIntermediateDirectories:YES attributes:nil error:nil];
        }
        _hummerCacheDirectoryRoot = root;
    }
    return _hummerCacheDirectoryRoot;
}

- (NSString *)cacheDirectoryOld {
    if (!_cacheDirectoryOld) {
        _cacheDirectoryOld = [[[HMFileManager sharedManager] documentDirectory] stringByAppendingPathComponent:@"HMCache"];
        BOOL isDir = NO;
        BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:_cacheDirectoryOld isDirectory:&isDir];
        if (!isExist || !isDir) {
            [[NSFileManager defaultManager] createDirectoryAtPath:_cacheDirectoryOld withIntermediateDirectories:YES attributes:nil error:nil];
        }
    }
    return _cacheDirectoryOld;
}


- (NSString *)createDirectoryAtHMDocumentRoot:(NSString *)folderName {
    NSAssert(folderName!=nil, @"hmStorage cache key can not be nil");
    return [self __createDirectoryAtPath:self.hummerDocumentDirectoryRoot folderName:folderName];

}

- (NSString *)createDirectoryAtHMCacheRoot:(NSString *)folderName {
    NSAssert(folderName!=nil, @"hmStorage cache key can not be nil");
    return [self __createDirectoryAtPath:self.hummerCacheDirectoryRoot folderName:folderName];
}


- (NSString *)__createDirectoryAtPath:(NSString *)path folderName:(NSString *)folderName {
    
    NSString * filePath = [path stringByAppendingPathComponent:folderName];
    BOOL isDir = NO;
    BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:filePath isDirectory:&isDir];
    if (!isExist || !isDir) {
        [[NSFileManager defaultManager] createDirectoryAtPath:filePath withIntermediateDirectories:YES attributes:nil error:nil];
    }
    return filePath;
}

- (BOOL)fileExistsAtPath:(NSString *)path isDirectory:(BOOL *)isDirectory {
    BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:path isDirectory:isDirectory];
    return isExist;
}


- (void)reset{
    _documentDirectory = nil;
    _cacheDirectory = nil;
    _hummerDocumentDirectoryRoot = nil;
    _cacheDirectoryOld = nil;
}

@end
