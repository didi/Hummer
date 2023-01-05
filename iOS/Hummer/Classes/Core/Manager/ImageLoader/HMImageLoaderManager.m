//
//  HMImageLoaderManager.m
//  Hummer
//
//  Created by didi on 2021/9/2.
//

#import "HMImageLoaderManager.h"
#import "HMImageLoader.h"
#import "HMLocalImageLoader.h"
#import "HMWebImageLoader.h"
#import "HMBase64ImageLoader.h"
#import "HMConfigEntryManager.h"

#import <Hummer/HMImageCacheManager.h>

@interface HMImageLoaderManager ()


@property (nonatomic, strong) NSMutableArray <id<HMImageLoader>>*loaders;

@property (nonatomic, strong) id<HMImageLoader> defaultLoader;

@property (nonatomic, strong) id<HMImageLoader> webLoader;

@end

@implementation HMImageLoaderManager

+ (HMImageLoaderManager *)sharedManager{
    static HMImageLoaderManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [HMImageLoaderManager new];
        [manager setup];
    });
    return manager;
}

- (void)setup {
    
    self.loaders = [NSMutableArray new];
    
    self.webLoader = [HMWebImageLoader new];
    self.defaultLoader = [HMLocalImageLoader new];
    
    [self.loaders addObject:self.webLoader];
    [self.loaders addObject:[HMBase64ImageLoader new]];

}

- (BOOL)canLoad:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nonnull id<HMURLConvertible>)bundleSource {
    return YES;
}

- (nullable id<HMImageLoaderOperation>)load:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource context:(nullable HMImageLoaderContext *)context completion:(nonnull HMImageCompletionBlock)completionBlock {
    
    HMImageCombinedOperation *operation = [HMImageCombinedOperation new];
    id<HMImageLoader> loader = [self getLoaderWithSource:source inJSBundleSource:bundleSource context:context];
    NSString *cacheUrlString = [source hm_asString];
    if ([loader respondsToSelector:@selector(fixLoadSource:inJSBundleSource:)]) {
        cacheUrlString = [[loader fixLoadSource:source inJSBundleSource:bundleSource] hm_asString];
    }
    __weak typeof(operation) wOperation = operation;
    operation.cacheOperation = [[HMImageCacheManager sharedManager] queryImageWithSource:cacheUrlString context:context result:^(UIImage * _Nullable image, NSData * _Nullable data, NSString *path, HMImageCacheType cacheType, NSError * _Nullable error) {
        //HMImageCacheManager 必定返回 解压之后的image
        if (!wOperation || wOperation.isCancel) {
            // Image combined operation cancelled by user
            completionBlock(nil,nil,[NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorCancelled userInfo:@{NSLocalizedDescriptionKey : @"Operation cancelled by user during querying the cache"}],HMImageCacheTypeNone);
            return;
        }
        if (image || data) {
            completionBlock(image, data, error, cacheType);
            return;
        }
        [self callLoader:loader operation:operation sourace:source inJSBundleSource:bundleSource cacheKey:cacheUrlString context:context completion:completionBlock];
    }];
    return operation;
}

- (void)callLoader:(id<HMImageLoader>)loader operation:(HMImageCombinedOperation *)operation sourace:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource cacheKey:(NSString *)cacheKey context:(nullable HMImageLoaderContext *)context completion:(nonnull HMImageCompletionBlock)completionBlock {
    
    __weak typeof(operation) wOperation = operation;
    operation.loaderOperation = [loader load:source inJSBundleSource:bundleSource context:context completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error) {
                
        if (!wOperation || wOperation.isCancel) {
            
            // Image combined operation cancelled by user
            return;
        }
        if (image || data) {
            // 应该在 HMImageLoaderCompletionBlock 添加 缓存控制，但考虑到拦截器可能已经有使用场景。
            // 此处 hack 处理下，HMLocalImageLoader 只做内存缓存
            NSMutableDictionary *_ctx = context.mutableCopy;
            if([loader isKindOfClass:HMLocalImageLoader.class]){
                [_ctx setObject:@(HMImageCacheTypeMemory) forKey:HMImageContextStoreCacheType];
            }
            [self storeImage:image data:data source:source context:context];
        }
        completionBlock(image, data, error, HMImageCacheTypeNone);
    }];
}

- (void)storeImage:(UIImage *)image data:(NSData *)data source:(nonnull id<HMURLConvertible>)source context:(HMImageLoaderContext *)context{
    
    [[HMImageCacheManager sharedManager] storeImage:image data:data source:source context:context result:nil];
}

- (id<HMImageLoader>)getLoaderWithSource:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nonnull id<HMURLConvertible>)bundleSource context:(nullable HMImageLoaderContext *)context{

    id<HMImageLoader> loader = [HMImageLoaderInterceptor canLoad:source inJSBundleSource:bundleSource namespace:context[HMImageManagerContextNamespace]];
    if (loader) {return loader;}

    for (id<HMImageLoader> loader in self.loaders) {
        if ([loader canLoad:source inJSBundleSource:bundleSource]) {
            return loader;
        }
    }
    return self.defaultLoader;
}

- (void)registerLoader:(id<HMImageLoader>)loader {
    
    [_loaders addObject:loader];
}

- (void)resignLoader:(id<HMImageLoader>)loader {
    [_loaders removeObject:loader];
}

- (id<HMImageLoader>)webLoader {
    return _webLoader;
}

- (id<HMImageLoader>)localLoader {
    return self.defaultLoader;
}
@end
