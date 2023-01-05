//
//  HMFileManager.m
//  Hummer
//
//  Created by didi on 2021/7/8.
//

#import "HMFileManager.h"
#import "NSURL+Hummer.h"

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

- (NSString *)tmpDirectory {
    if (!_tmpDirectory) {
        _tmpDirectory = NSTemporaryDirectory();
    }
    return _tmpDirectory;
}

- (NSString *)hummerTmpDirectoryRoot {
    
    if (!_hummerTmpDirectoryRoot) {
        _hummerTmpDirectoryRoot = [self __createDirectoryAtPath:self.tmpDirectory folderName:HMSandboxDirectoryKey];
    }
    return _hummerTmpDirectoryRoot;
}

- (NSString *)hummerDocumentDirectoryRoot {
    if (!_hummerDocumentDirectoryRoot) {
        _hummerDocumentDirectoryRoot = [self __createDirectoryAtPath:self.documentDirectory folderName:HMSandboxDirectoryKey];
    }
    return _hummerDocumentDirectoryRoot;
}

- (NSString *)hummerCacheDirectoryRoot {
    
    if (!_hummerCacheDirectoryRoot) {
        _hummerCacheDirectoryRoot = [self __createDirectoryAtPath:self.cacheDirectory folderName:HMSandboxDirectoryKey];
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

- (NSString *)createDirectoryAtTmpRoot:(NSString *)folderName {
    NSAssert(folderName!=nil, @"hmStorage cache key can not be nil");
    return [self __createDirectoryAtPath:self.hummerTmpDirectoryRoot folderName:folderName];
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

- (BOOL)fileExistsAtPath:(NSString *)path isDirectory:(nullable BOOL *)isDirectory {
    BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:path isDirectory:isDirectory];
    return isExist;
}

- (nullable NSString *)fileExistsAtPathIgnoreExtension:(NSString *)path isDirectory:(nullable BOOL *)isDirectory {

    if(path.pathExtension.length > 0){
        if([self fileExistsAtPath:path isDirectory:isDirectory]){
            return path;
        }
    }else{
        //提取 path 上级文件夹目录
        NSString *dirPath = [path stringByDeletingLastPathComponent];
        NSURL *dirUrl = [NSURL fileURLWithPath:dirPath];
        NSDirectoryEnumerator *enumerator = [[NSFileManager defaultManager] enumeratorAtURL:dirUrl includingPropertiesForKeys:@[] options:NSDirectoryEnumerationSkipsSubdirectoryDescendants|NSDirectoryEnumerationSkipsHiddenFiles errorHandler:nil];
        NSArray <NSURL *> *filePaths = [enumerator allObjects];
        __block NSString *result = nil;
        NSString *pathString = [[NSURL fileURLWithPath:path] hm_asString];// append scheme, file://
        [filePaths enumerateObjectsUsingBlock:^(NSURL * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            NSURL *pathIgnoreExt = [obj URLByDeletingPathExtension];
            NSString *aPath = [pathIgnoreExt hm_asString];
            if([aPath isEqualToString:pathString]){
                result = [obj hm_asFilePath];
                *stop = YES;
            }
        }];
        return result;
    }
    return nil;
}

- (void)reset{
    _documentDirectory = nil;
    _cacheDirectory = nil;
    _hummerDocumentDirectoryRoot = nil;
    _cacheDirectoryOld = nil;
}

@end
 
