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
                  inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                           context:(nullable HMImageLoaderContext *)context
                        completion:(nullable HMImageCompletionBlock)completionBlock{
    
    id<HMURLConvertible> bundle = bundleSource;
    if (!bundle) {
        HMJSContext *hummerJSContext = [HMJSGlobal.globalObject currentContext:self.hmValue.context];
        bundle = hummerJSContext.url;
    }
    [[self hm_webImageOperation] cancel];
    self.hm_webImageOperation = [[HMImageManager sharedManager] load:source inJSBundleSource:bundle context:context completion:^(UIImage * _Nullable image, NSError * _Nullable error, HMImageCacheType cacheType) {
        if (completionBlock) {
            completionBlock(image,error,cacheType);
        }
    }];
}
@end
