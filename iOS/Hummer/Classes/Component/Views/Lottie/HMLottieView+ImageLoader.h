//
//  HMLottieView+ImageLoader.h
//  Hummer
//
//  Created by didi on 2022/12/22.
//

#import "HMLottieView.h"
#import "HMLottieLoaderManager.h"

NS_ASSUME_NONNULL_BEGIN


@interface HMLottieView (ImageLoader)

- (id<HMImageLoaderOperation>)hm_setLottieWithSrc:(id<HMURLConvertible>)source
           inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                    context:(nullable HMImageLoaderContext *)context
                                       completion:(nullable HMLottieCompletionBlock)completionBlock;
@end

NS_ASSUME_NONNULL_END
