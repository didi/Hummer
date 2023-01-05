//
//  HMImageCacheManager.h
//  Hummer
//
//  Created by didi on 2021/9/2.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMImageCache.h>
NS_ASSUME_NONNULL_BEGIN


@interface HMImageCacheManager : NSObject<HMImageCache>

/**
 * context 带有 namespace 参数。后续预留，按 namespace 区分缓存接口。
 * 内存缓存默认
 **/

+ (HMImageCacheManager *)sharedManager;


/* unit test */
- (void)clearMemoryCache;
- (void)clearDiskCache;
- (void)clearAll;

// memory only
- (UIImage *)imageFromMemoryCacheForKey:(id<HMURLConvertible>)key context:(HMImageLoaderContext *)context;
- (NSData *)imageDataFromDiskCacheForKey:(id<HMURLConvertible>)key context:(HMImageLoaderContext *)context;

- (void)removeDiskCacheForKey:(id<HMURLConvertible>)key context:(HMImageLoaderContext *)context;
- (void)removeMemoryCacheForKey:(id<HMURLConvertible>)key context:(HMImageLoaderContext *)context;
- (void)removeCacheForKey:(id<HMURLConvertible>)key context:(HMImageLoaderContext *)context;

@end

NS_ASSUME_NONNULL_END
