//
//  UIView+HMImageLoader.m
//  Hummer
//
//  Created by didi on 2020/12/3.
//

#import "UIView+HMImageLoader.h"
#import "NSObject+Hummer.h"
#import "HMJSGlobal.h"
#import "HMImageManager.h"
#import "WeakPointerWrapper.h"
#import <objc/runtime.h>
#import <Hummer/HMBaseValue.h>

@implementation UIView (HMImageLoader)

- (id <HMImageLoaderOperation>)hm_webImageOperation {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_webImageOperation:(id <HMImageLoaderOperation>)hmWebImageOperation {
    objc_setAssociatedObject(self, @selector(hm_webImageOperation), hmWebImageOperation, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (void)hm_internalSetImageWithURL:(id<HMURLConvertible>)source
                       placeholder:(nullable id<HMURLConvertible>)placeholderSource
                       failedImage:(nullable id<HMURLConvertible>)failedImageSource
                  inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                      processBlock:(nullable HMImageLoadProcessBlock)process
                           context:(nullable HMImageLoaderContext *)context
                        completion:(HMImageCompletionBlock)completionBlock{
   
    id<HMURLConvertible> bundle = bundleSource;
    if (!bundle) {
        HMJSContext *hummerJSContext = [HMJSGlobal.globalObject currentContext:self.hmValue.context];
        bundle = hummerJSContext.url;
    }
    [[self hm_webImageOperation] cancel];

    if (placeholderSource) {
        [[HMImageManager sharedManager] load:placeholderSource inJSBundleSource:bundleSource context:context completion:^(UIImage * _Nullable image, NSError * _Nullable error, HMImageCacheType cacheType) {
            if ([self isKindOfClass:UIImageView.class]) {
                UIImageView *imageView = (UIImageView *)self;
                if (imageView.image) { return;}
                imageView.image = image;
            }
        }];
    }


    self.hm_webImageOperation = [[HMImageManager sharedManager] load:source inJSBundleSource:bundle context:context completion:^(UIImage * _Nullable image, NSError * _Nullable error, HMImageCacheType cacheType) {
        if (error && failedImageSource) {
            [[HMImageManager sharedManager] load:failedImageSource inJSBundleSource:bundleSource context:context completion:^(UIImage * _Nullable image, NSError * _Nullable error, HMImageCacheType cacheType) {
                if ([self isKindOfClass:UIImageView.class]) {
                    UIImageView *imageView = (UIImageView *)self;
                    imageView.image = image;
                }
            }];
        }
        if (completionBlock) {
            completionBlock(image,error,cacheType);
        }
    }];
}


- (void)hm_internalSetImageWithURL:(id<HMURLConvertible>)source
                  inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                           context:(nullable HMImageLoaderContext *)context
                        completion:(nullable HMImageCompletionBlock)completionBlock{
 
    [self hm_internalSetImageWithURL:source placeholder:nil failedImage:nil inJSBundleSource:bundleSource processBlock:nil context:context completion:completionBlock];
}
@end
