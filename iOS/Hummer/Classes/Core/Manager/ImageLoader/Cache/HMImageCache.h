//
//  HMImageCache.h
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <Foundation/Foundation.h>
#import "HMImageLoaderDefine.h"
#import "HMImageLoaderOperation.h"
#import "HMURLConvertible.h"

NS_ASSUME_NONNULL_BEGIN

/**
 * 以下所有方法均在主线程调用。
 */
@protocol HMImageCache <NSObject>
/**
 * @param image  存入内存
 * @param data   存入磁盘
 */
- (void)storeImage:(nullable UIImage *)image data:(nullable NSData *)data source:(id<HMURLConvertible>)source context:(HMImageLoaderContext *)context;


// @result callback in main queue
- (id<HMImageLoaderOperation>)queryImageWithSource:(id<HMURLConvertible>)source context:(HMImageLoaderContext *)context result:(HMImageCompletionBlock)result;

@end

@interface HMStorageExpiration : NSObject

+ (HMStorageExpiration *)never;

+ (HMStorageExpiration *)seconds:(NSTimeInterval)seconds;

+ (HMStorageExpiration *)days:(NSInteger)day;

- (NSDate *)estimatedExpirationSinceNow;

- (BOOL)isExpired;

@end


NS_ASSUME_NONNULL_END
