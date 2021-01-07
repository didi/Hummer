//
//  HMImageCache.h
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <Foundation/Foundation.h>
#import "HMImageLoaderDefine.h"

NS_ASSUME_NONNULL_BEGIN
@protocol HMImageCache <NSObject>

- (nullable UIImage *)imageForUrl:(NSString *)url context:(HMImageLoaderContext *)context;

- (void)addImageToCache:(UIImage *)image url:(NSString *)url context:(HMImageLoaderContext *)context;

@end
@interface HMImageCache : NSObject<HMImageCache>

@end

NS_ASSUME_NONNULL_END
