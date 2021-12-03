//
//  HMFileManager.h
//  Hummer
//
//  Created by didi on 2021/7/8.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
// hummer 文件存储 根目录
extern NSString * const HMCacheDirectoryKey;

// 文件存储默认路径(所有没配置 namespace 的目录)
extern NSString * const HMCacheDirectoryDefaultKey;

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

+ (NSString *)cacheDirectoryOld;

+ (NSString *)cacheDirectory;

+ (NSString *)createDirectoryForKey:(NSString *)key;

//unit test only;
+ (void)reset;
@end


NS_ASSUME_NONNULL_END
