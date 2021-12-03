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
    [self.loaders addObject:[HMWebImageLoader new]];
    [self.loaders addObject:[HMBase64ImageLoader new]];

    self.defaultLoader = [HMLocalImageLoader new];
}

- (BOOL)canLoad:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nonnull id<HMURLConvertible>)bundleSource {
    return YES;
}

- (nullable id<HMImageLoaderOperation>)load:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource context:(nullable HMImageLoaderContext *)context completion:(nonnull HMImageCompletionBlock)completionBlock {
    
    HMImageCombinedOperation *operation = [HMImageCombinedOperation new];
    id<HMImageLoader> loader = [self getLoaderWithSource:source inJSBundleSource:bundleSource context:context];
    NSString *cacheUrlString = [source hm_asString];
    if ([loader respondsToSelector:@selector(cacheKeyForSource:inJSBundleSource:)]) {
        cacheUrlString = [[loader cacheKeyForSource:source inJSBundleSource:bundleSource] hm_asString];
    }
    __weak typeof(operation) wOperation = operation;
    operation.cacheOperation = [[HMImageCacheManager sharedManager] queryImageWithSource:cacheUrlString context:context result:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, HMImageCacheType cacheType) {
        //HMImageCacheManager 必定返回 解压之后的image
        if (!wOperation || wOperation.isCancel) {
            // Image combined operation cancelled by user
            completionBlock(nil,nil,[NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorCancelled userInfo:@{NSLocalizedDescriptionKey : @"Operation cancelled by user during querying the cache"}],HMImageCacheTypeNone);
            return;
        }
        if (image) {
            completionBlock(image, data, error, cacheType);
            return;
        }
        [self callLoader:loader operation:operation sourace:source inJSBundleSource:bundleSource context:context completion:completionBlock];
    }];
    return operation;
}

- (void)callLoader:(id<HMImageLoader>)loader operation:(HMImageCombinedOperation *)operation sourace:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource context:(nullable HMImageLoaderContext *)context completion:(nonnull HMImageCompletionBlock)completionBlock {
    
    __weak typeof(operation) wOperation = operation;
    operation.loaderOperation = [loader load:source inJSBundleSource:bundleSource context:context completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error) {
                
        if (!wOperation || wOperation.isCancel) {
            
            // Image combined operation cancelled by user
            return;
        }
        if (image || data) {
            [self storeImage:image data:data source:source context:context];
        }
        completionBlock(image, data, error, HMImageCacheTypeNone);
    }];
}

- (void)storeImage:(UIImage *)image data:(NSData *)data source:(nonnull id<HMURLConvertible>)source context:(HMImageLoaderContext *)context{
    
    [[HMImageCacheManager sharedManager] storeImage:image data:data source:source context:context];
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
@end
