//
//  HMWebImageOperation.h
//  Hummer
//
//  Created by didi on 2020/11/24.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMImageLoaderOperation <NSObject>

- (void)cancel;
- (BOOL)isCancel;
@end

/// NSOperation conform to `HMWebImageOperation`.
@interface NSOperation (HMImageLoaderOperation) <HMImageLoaderOperation>

@end


@interface HMImageLoaderOperation : NSObject<HMImageLoaderOperation>

@end

@interface HMImageCombinedOperation : NSObject<HMImageLoaderOperation>
/**
 The cache operation from the image cache query
 */
@property (strong, nonatomic, nullable) id<HMImageLoaderOperation> cacheOperation;

/**
 The loader operation from the image loader (such as download operation)
 */
@property (strong, nonatomic, nullable) id<HMImageLoaderOperation> loaderOperation;


@property (strong, nonatomic, nullable) id<HMImageLoaderOperation> coderOperation;

@end

NS_ASSUME_NONNULL_END
