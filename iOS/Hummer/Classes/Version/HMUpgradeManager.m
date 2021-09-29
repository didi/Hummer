//
//  HMUpgradeManager.m
//  Expecta
//
//  Created by didi on 2021/7/8.
//

#import "HMUpgradeManager.h"
#import <Hummer/HMStorage.h>
#import <Hummer/HMLogger.h>
#import <Hummer/HMFileManager.h>

@implementation HMUpgradeManager
/**
 * storage 升级之前存储方案：
 * sandbox/HMCache/keyname/file
 * 升级之后
 * sandbox/HMCache/namespace/keyname/file
 *
 * storage namespace 升级兼容方案。
 * 由于之前 storage 没有 namespace 区分。
 * 本次升级，为了保证业务方 使用原来的key 仍然能够访问到，需要拷贝原HMCache 目录下所有文件到 namespace 下。
 */

+ (void)checkStorageVersionForNamespace:(NSString *)namespace {
    
    //sandbox/HMCache/
    NSString *HMCacheKeyDir = [HMFileManager cacheDirectoryOld];
    
    //sandbox/com_hummer_cache/namespace/
    NSString *dirWithNamespace = [[HMCacheKeyDir stringByDeletingLastPathComponent] stringByAppendingPathComponent:HMCacheDirectoryKey];
    dirWithNamespace = [dirWithNamespace stringByAppendingPathComponent:namespace];
    if ([[NSFileManager defaultManager] fileExistsAtPath:dirWithNamespace]) {
        //已经升级完成
        HMLogDebug(@"升级 storage log ==> namespace=%@ 不需要升级", namespace);
        return;
    }
    //创建 namespace 文件夹
    HMLogDebug(@"升级 storage log ==> namespace = %@ 开始升级", namespace);
    BOOL isMade = [[NSFileManager defaultManager] createDirectoryAtPath:dirWithNamespace withIntermediateDirectories:YES attributes:nil error:nil];
    //复制文件
    if (isMade) {
       
        NSDirectoryEnumerator<NSString *> *enumerator = [[NSFileManager defaultManager] enumeratorAtPath:HMCacheKeyDir];
        
        for (NSString *path in enumerator) {
            NSLog(@"path = %@", path);
            NSString *srcPath = [HMCacheKeyDir stringByAppendingPathComponent:path];
            NSString *targetPath = [dirWithNamespace stringByAppendingPathComponent:path];

            NSError *error = nil;
            BOOL isCopied = [[NSFileManager defaultManager] copyItemAtPath:srcPath toPath:targetPath error:&error];
            HMLogDebug(@"升级 storage log ==> namespace = %@, 复制文件%@ -> 目标%@，结果%@", namespace, srcPath, targetPath, error?@"失败":@"成功");

        }
    }
}


+ (void)upgrageStorageForNamespace:(NSString *)namespace {
    
    [self checkStorageVersionForNamespace:HMCacheDirectoryDefaultKey];
    [self checkStorageVersionForNamespace:namespace];
}

@end
