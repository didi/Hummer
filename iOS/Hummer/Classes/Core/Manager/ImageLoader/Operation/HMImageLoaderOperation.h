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

NS_ASSUME_NONNULL_END
