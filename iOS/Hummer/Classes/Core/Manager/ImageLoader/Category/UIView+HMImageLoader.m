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

- (id <HMImageLoaderOperation>)hm_webImageOperationPlaceholder {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_webImageOperationPlaceholder:(id <HMImageLoaderOperation>)hmWebImageOperationPlaceholder {
    objc_setAssociatedObject(self, @selector(hm_webImageOperationPlaceholder), hmWebImageOperationPlaceholder, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (id <HMImageLoaderOperation>)hm_webImageOperationError {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_webImageOperationError:(id <HMImageLoaderOperation>)hmWebImageOperationError {
    objc_setAssociatedObject(self, @selector(hm_webImageOperationError), hmWebImageOperationError, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}


- (void)hm_internalSetImageWithURL:(id<HMURLConvertible>)source
                       placeholder:(nullable id<HMURLConvertible>)placeholderSource
                       failedImage:(nullable id<HMURLConvertible>)failedImageSource
                  inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                      processBlock:(nullable HMImageLoadProcessBlock)process
                           context:(nullable HMImageLoaderContext *)context
                        completion:(HMImageCompletionBlock)completionBlock{
   
    HMJSContext *hummerJSContext = [HMJSGlobal.globalObject currentContext:self.hmValue.context];
    id<HMURLConvertible> bundle = bundleSource ? : hummerJSContext.url;
    NSString *namespace = hummerJSContext.nameSpace;
    if (namespace) {
        if (![context objectForKey:HMImageManagerContextNamespace]) {
            NSMutableDictionary *_context = context;
            _context = _context ? [NSMutableDictionary dictionaryWithDictionary:context] : [NSMutableDictionary new];
            [_context setObject:namespace forKey:HMImageManagerContextNamespace];
            context = _context.copy;
        }
    }
    [[self hm_webImageOperation] cancel];
    [[self hm_webImageOperationPlaceholder] cancel];
    [[self hm_webImageOperationError] cancel];

    self.hm_webImageOperationPlaceholder = nil;
    self.hm_webImageOperationError = nil;

    if (placeholderSource) {
       self.hm_webImageOperationPlaceholder = [[HMImageManager sharedManager] load:placeholderSource inJSBundleSource:bundleSource context:context completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, HMImageCacheType cacheType) {
            if ([self isKindOfClass:UIImageView.class]) {
                UIImageView *imageView = (UIImageView *)self;
                if (imageView.image) { return;}
                imageView.image = image;
            }
        }];
    }

    __weak typeof(self) wSelf = self;
    self.hm_webImageOperation = [[HMImageManager sharedManager] load:source inJSBundleSource:bundle context:context completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, HMImageCacheType cacheType) {
        if (error && failedImageSource) {
            wSelf.hm_webImageOperationError =  [[HMImageManager sharedManager] load:failedImageSource inJSBundleSource:bundleSource context:context completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, HMImageCacheType cacheType) {
                if ([self isKindOfClass:UIImageView.class]) {
                    UIImageView *imageView = (UIImageView *)self;
                    imageView.image = image;
                }
            }];
        }
        if (completionBlock) {
            completionBlock(image,data,error,cacheType);
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
