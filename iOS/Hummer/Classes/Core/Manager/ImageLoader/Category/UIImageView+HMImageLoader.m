//
//  UIImageView+HMImageLoader.m
//  Hummer
//
//  Created by didi on 2020/12/3.
//

#import "UIImageView+HMImageLoader.h"
#import "UIView+HMImageLoader.h"

@implementation UIImageView (HMImageLoader)

- (void)hm_setImageWithURL:(id<HMURLConvertible>)url{
    [self hm_setImageWithURL:url inJSBundleSource:nil context:nil completion:nil];
}
- (void)hm_setImageWithURL:(id<HMURLConvertible>)source
               placeholder:(nullable id<HMURLConvertible>)placeholderSource
               failedImage:(nullable id<HMURLConvertible>)failedImageSource
          inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
              processBlock:(nullable HMImageLoadProcessBlock)process
                   context:(nullable HMImageLoaderContext *)context
                completion:(HMImageCompletionBlock)completionBlock {
    
    __weak typeof(self) wSelf = self;
    [self hm_internalSetImageWithURL:source placeholder:placeholderSource failedImage:failedImageSource inJSBundleSource:bundleSource processBlock:process context:context completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, HMImageCacheType cacheType) {
        if (image) {
            wSelf.image = image;
        }
        if (completionBlock) {
            completionBlock(image,data,error,cacheType);
        }
    }];
}

- (void)hm_setImageWithURL:(id<HMURLConvertible>)source
          inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                   context:(nullable HMImageLoaderContext *)context
                completion:(nullable HMImageCompletionBlock)completionBlock {
    
    [self hm_setImageWithURL:source placeholder:nil failedImage:nil inJSBundleSource:bundleSource processBlock:nil context:context completion:completionBlock];
}


@end
