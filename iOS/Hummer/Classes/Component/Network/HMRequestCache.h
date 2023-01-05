//
//  HMRequestCache.h
//  Hummer
//
//  Created by didi on 2022/11/28.
//

#import <Foundation/Foundation.h>
#import "HMURLConvertible.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMRequestCache : NSObject
/**
 * filepath:
 * case 1: path/filename.ext
 * case 2: path/path
 * case 3: path
 *
 * 保存路径：
 * case 1: sandbox/namespace/hm_request/path/filename.ext
 * case 2: sandbox/namespace/path/path/urlmd5.suggestedfilename
 * case 3: sandbox/namespace/path/urlmd5.suggestedfilename
 */

/// 根据 url 生成下载缓存路径
/// @param downloadURL 下载url
/// @param namespace 业务线 namespace 用于缓存隔离，如不传，则使用 hummer 默认 namespace。
/// @param filePath 指定存储文件的相对路径（或文件名）
+ (NSString *)generateCachePath:(NSString *)downloadURL namespace:(NSString *)namespace filePath:(nullable NSString *)filePath;

+ (NSString *)generatedPath:(NSString *)path appendExtension:(NSString *)pathExtension;

+ (BOOL)saveCache:(id<HMURLConvertible>)fromURL to:(id<HMURLConvertible>)toURL;
+ (BOOL)saveCacheData:(NSData *)cacheData to:(id<HMURLConvertible>)toURL;
@end

NS_ASSUME_NONNULL_END
