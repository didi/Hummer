//
//  HMFileManager.h
//  Hummer
//
//  Created by didi on 2021/7/8.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
// hummer 文件存储 根目录名
extern NSString * const HMSandboxDirectoryKey;

// hummer storage 文件名
extern NSString * const HMStorageDirectoryDefaultKey;
/**
 * 目录结构如下：
 * 未区分 namespace 之前：
 * sandbox/HMCache/key
 *
 * 区分 namespace：
 * sandbox/com_hummer_cache/namespace/key
 *
 * 未设置 namespace:
 * sandbox/com_hummer_cache/hummer_default/key
 *
 */
@interface HMFileManager : NSObject

@property(nonatomic, copy)NSString *documentDirectory;
@property(nonatomic, copy)NSString *cacheDirectory;
@property(nonatomic, copy)NSString *tmpDirectory;

/// 返回 未按 namespace 隔离之前版本的 storage 目录：HMCache
@property(nonatomic, copy)NSString *cacheDirectoryOld DEPRECATED_MSG_ATTRIBUTE("仅做兼容使用，未来会被删除");

/// documentDirectory/HMSandboxDirectoryKey  ->  document/com_hummer_cache
@property(nonatomic, copy)NSString *hummerDocumentDirectoryRoot;

/// Library/Caches/HMSandboxDirectoryKey  ->  Library/Caches/com_hummer_cache
@property(nonatomic, copy)NSString *hummerCacheDirectoryRoot;

/// tmp/HMSandboxDirectoryKey  ->  tmp/com_hummer_cache
@property(nonatomic, copy)NSString *hummerTmpDirectoryRoot;

+ (instancetype)sharedManager;

/// 在 document/com_hummer_cache 目录下创建文件夹
- (NSString *)createDirectoryAtHMDocumentRoot:(NSString *)folderName;

/// 在  Library/Caches/com_hummer_cache 目录下创建文件夹
- (NSString *)createDirectoryAtHMCacheRoot:(NSString *)folderName;

/// 在  tmp/com_hummer_cache 目录下创建文件夹
- (NSString *)createDirectoryAtTmpRoot:(NSString *)folderName;


//unit test only;
- (void)reset;
- (BOOL)fileExistsAtPath:(NSString *)path isDirectory:(nullable BOOL *)isDirectory;

/// 根据路径查询文件是否存在
/// @param path 查询路径，如包含扩展名，则使用 fileExistsAtPath:isDirectory:，否则将 path 的 lastPathComponent 作为文件名，枚举 path 上级目录。
- (nullable NSString *)fileExistsAtPathIgnoreExtension:(NSString *)path isDirectory:(nullable BOOL *)isDirectory;
@end


NS_ASSUME_NONNULL_END
