//
//  HMLottieLoader.h
//  Hummer
//
//  Created by didi on 2022/12/28.
//

#import <Foundation/Foundation.h>
#import "HMImageLoader.h"

NS_ASSUME_NONNULL_BEGIN

@protocol HMLottieLoader <HMImageLoader>

- (nullable id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source
                           inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                                    context:(nullable HMImageLoaderContext *)context
                             dataCompletion:(HMDataLoaderCompletionBlock)completionBlock;

@end

NS_ASSUME_NONNULL_END
