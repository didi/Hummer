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

@implementation UIView (HMImageLoader)

- (id <HMImageLoaderOperation>)hm_webImageOperation {
    WeakPointerWrapper *weakPointerWrapper = objc_getAssociatedObject(self, _cmd);

    if (!weakPointerWrapper.value) {
        objc_setAssociatedObject(self, _cmd, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }

    return weakPointerWrapper.value;
}

- (void)setHm_webImageOperation:(id <HMImageLoaderOperation>)hmWebImageOperation {
    if (!hmWebImageOperation) {
        objc_setAssociatedObject(self, @selector(hm_webImageOperation), nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    } else {
        WeakPointerWrapper<id <HMImageLoaderOperation>> *weakPointerWrapper = objc_getAssociatedObject(self, @selector(hm_webImageOperation));
        if (!weakPointerWrapper) {
            weakPointerWrapper = [[WeakPointerWrapper alloc] init];
            objc_setAssociatedObject(self, @selector(hm_webImageOperation), weakPointerWrapper, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        }
        weakPointerWrapper.value = hmWebImageOperation;
    }
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
    self.hm_webImageOperation = [[HMImageManager sharedManager] load:source inJSBundleSource:bundle context:context completion:^(UIImage * _Nullable image, NSError * _Nullable error, HMImageCacheType cacheType) {
        if (completionBlock) {
            completionBlock(image,error,cacheType);
        }
    }];
}
@end
