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
#import <Hummer/HMConfigEntryManager.h>

@implementation HMUpgradeManager
/**
 * storage 升级之前存储方案：
 * document/HMCache/keyname.file
 * 升级之后
 * document/com_hummer_cache/namespace/keyname.file
 *
 * @note 20220905 之后再次升级
 * document/com_hummer_cache/namespace/组件名或功能名/keyname.file
 * 如：
 * sandbox/com_hummer_cache/namespace/hm_storage/keyname.file
 * sandbox/com_hummer_cache/namespace/hmx_screen_shot/keyname.file
 *
 * storage namespace 升级兼容方案。
 * 由于之前 storage 没有 namespace 区分。
 * 本次升级，为了保证业务方 使用原来的key 仍然能够访问到，需要拷贝原HMCache 目录下所有文件到 namespace 下。
 * 1. 最老版本            ——-> 最新版
 * sandbox/com_hummer_cache/namespace/keyname.file  &&  !document/com_hummer_cache/namespace
 * 2. namespace隔离版本   ---> 最新版
 * document/com_hummer_cache/namespace   && !document/com_hummer_cache/namespace/hm_storage
 *
 * 3. 特殊case
 * hummer_default -> namespace_hummer_default
 */

/// 迁移 storage 到对应 namespce
/// @note
/// 通常情况下 namespace1 == namesapce2，只有升级 默认namesace 时，会不一致：hummer_default -> namespace_hummer_default
+ (void)checkStorageVersionForNamespace1:(NSString *)namespace1 namesapce2:(NSString *)namesapce2 {
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    //sandbox/com_hummer_cache/
    NSString *documentRootPath = [[HMFileManager sharedManager] hummerDocumentDirectoryRoot];
    
    //sandbox/HMCache/
    NSString *HMCacheKeyDir = [[HMFileManager sharedManager] cacheDirectoryOld];
    
    //sandbox/com_hummer_cache/namespace/
    NSString *dirWithNamespace = [documentRootPath stringByAppendingPathComponent:namespace1];
    
    
    //sandbox/com_hummer_cache/namespace/storage/
    NSString *namespaceWithComponent = [[documentRootPath stringByAppendingPathComponent:namesapce2] stringByAppendingPathComponent:HMStorageDirectoryDefaultKey];

    
    BOOL hasOldestCache = [fileManager fileExistsAtPath:HMCacheKeyDir];
    BOOL hasNamespaceCache = [fileManager fileExistsAtPath:dirWithNamespace];
    BOOL hasNewestCache = [fileManager fileExistsAtPath:namespaceWithComponent];

    // 不存在 最老版本 或已经升级
    if (hasOldestCache == NO || hasNewestCache) {
        //已经升级完成
        HMLogDebug(@"升级 storage log ==> namespace=%@ 不需要升级", namesapce2);
        return;
    }
    NSError *hasCreateError = nil;
    [[NSFileManager defaultManager] createDirectoryAtPath:namespaceWithComponent withIntermediateDirectories:YES attributes:nil error:&hasCreateError];
    if (hasCreateError) {
        HMLogDebug(@"升级 storage log ==> 升级失败");
        return;
    }
    NSString *sourceDirPath = nil;
    if (hasOldestCache && hasNamespaceCache == NO) {
        // case 1: 最老版本            ——-> 最新版
        sourceDirPath = HMCacheKeyDir;
        
    }else if(hasNamespaceCache && hasNewestCache == NO){
        
        // case 1: namespace隔离版本   ---> 最新版
        sourceDirPath = dirWithNamespace;
    }
    HMLogDebug(@"升级 storage log ==> namespace = %@ 开始升级", namesapce2);
    if (sourceDirPath) {
        NSDirectoryEnumerator<NSString *> *enumerator = [fileManager enumeratorAtPath:sourceDirPath];
        for (NSString *path in enumerator) {
            NSLog(@"path = %@", path);
            NSString *srcPath = [sourceDirPath stringByAppendingPathComponent:path];
            NSString *targetPath = [namespaceWithComponent stringByAppendingPathComponent:path];
            NSError *_error = nil;
            NSDictionary<NSFileAttributeKey, id> *attrDic = [fileManager attributesOfItemAtPath:srcPath error:&_error];
            if (_error || [[attrDic fileType] isEqualToString:@""]) {
                //跳过文件夹
                continue;
            }
            _error = nil;
            [[NSFileManager defaultManager] copyItemAtPath:srcPath toPath:targetPath error:&_error];
            HMLogDebug(@"升级 storage log ==> namespace = %@, 复制文件%@ -> 目标%@，结果%@", namesapce2, srcPath, targetPath, _error?@"失败":@"成功");
        }
    }
}

+ (void)upgrageStorageForDefaultNamespace{

    [self checkStorageVersionForNamespace1:@"hummer_default" namesapce2:HMDefaultNamespaceUnderline];
}

+ (void)upgrageStorageForNamespace:(NSString *)namespace {
    [self checkStorageVersionForNamespace1:namespace namesapce2:namespace];
}

@end
