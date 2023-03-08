//
//  HMImageDiskCache.h
//  Hummer
//
//  Created by didi on 2021/8/30.
//

#import <Foundation/Foundation.h>
#import "HMConvertibleProtocol.h"
#import "HMImageCache.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMImageFileMeta : NSObject

@property (nonatomic ,strong) NSDate *lastAccessDate;
@property (nonatomic ,strong) NSDate *estimatedExpirationDate;
@property (nonatomic ,strong) NSURL *url;
@property (nonatomic ,assign) unsigned long long size;

- (HMImageFileMeta *)initWithUrl:(NSURL *)url;
- (BOOL)isExpired:(NSDate *)date;
- (NSData *)accessDataWithFileManager:(NSFileManager *)manager date:(NSDate *)accessDate;
@end
@interface HMImageDiskCacheConfig : NSObject

+ (HMImageDiskCacheConfig *)defaultConfig;
@end

/**
 * hummer 默认缓存策略
 * 存储原始data，url(md5)作为key + creationDate(访问时间) + ModificationDate(过期时间)
 * features：
 * 1. lru
 * 2. size 限制
 * 3. 过期策略
 * behavior
 * 1. 清除策略： lru
 * 2. 清除时机：后台，退出app。主动。
 * 3. 清除指标：清除后为 size 限制的 3/2
 * caveat
 * 处于效率考虑，并不会在获取缓存时进行 清除行为。
 *
 */
@interface HMImageDiskCache : NSObject

- (HMImageDiskCache *)initWithConfig:(HMImageDiskCacheConfig *)config;


/// @param key 文件名
/// @return 存储路径
- (nullable NSString *)storeData:(id<HMDataConvertible>)data forKey:(NSString *)key;

/// @param key 文件名
/// @param outFilePath 存储路径
/// @return 缓存data
- (nullable NSData *)dataForKey:(NSString *)key filePath:(NSString **)outFilePath;

- (void)removeCacheForKey:(NSString *)key;

- (void)removeCacheForKey:(NSString *)key completion:(nullable void(^)(void))completion;


- (nullable NSMutableArray<NSURL *> *)removeSizeExceededValues;

- (void)removeAll;
@end

NS_ASSUME_NONNULL_END
