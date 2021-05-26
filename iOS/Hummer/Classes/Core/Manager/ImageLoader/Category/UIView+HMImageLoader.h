//
//  UIView+HMImageLoader.h
//  Hummer
//
//  Created by didi on 2020/12/3.
//

#import <UIKit/UIKit.h>
#import "HMImageLoader.h"
NS_ASSUME_NONNULL_BEGIN

@interface UIView (HMImageLoader)

- (void)hm_internalSetImageWithURL:(id<HMURLConvertible>)source
                       placeholder:(nullable id<HMURLConvertible>)placeholderSource
                       failedImage:(nullable id<HMURLConvertible>)failedImageSource
                  inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                      processBlock:(nullable HMImageLoadProcessBlock)process
                           context:(nullable HMImageLoaderContext *)context
                        completion:(HMImageCompletionBlock)completionBlock;

- (void)hm_internalSetImageWithURL:(id<HMURLConvertible>)source
                  inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                           context:(nullable HMImageLoaderContext *)context
                        completion:(nullable HMImageCompletionBlock)completionBlock;
@end

NS_ASSUME_NONNULL_END
