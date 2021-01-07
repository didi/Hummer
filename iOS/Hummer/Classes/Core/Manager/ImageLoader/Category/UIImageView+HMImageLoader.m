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
          inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                   context:(nullable HMImageLoaderContext *)context
                completion:(nullable HMImageCompletionBlock)completionBlock{
    
    __weak typeof(self) wSelf = self;
    [self hm_internalSetImageWithURL:source inJSBundleSource:bundleSource context:context completion:^(UIImage * _Nullable image, NSError * _Nullable error, HMImageCacheType cacheType) {
        if (image) {
            wSelf.image = image;
            if (completionBlock) {
                completionBlock(image,error,cacheType);
            }
        }
    }];
}


@end
