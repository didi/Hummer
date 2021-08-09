//
//  HMImageManager.m
//  Hummer
//
//  Created by didi on 2020/11/16.
//

#import "HMImageManager.h"
#import "HMImageLoader.h"
#import "HMBase64ImageLoader.h"
#import "HMLocalImageLoader.h"
#import "HMWebImageLoader.h"
#import "HMImageCache.h"
#import "HMGIFImageDecoder.h"
#import "HMUtility.h"
#import "HMInterceptorManager.h"

@interface HMImageManager()
@property (nonatomic, strong, readwrite) NSMutableArray <id<HMImageLoader>> *loaders;
@property (nonatomic, strong, readwrite) NSMutableArray <id<HMImageDecoder>> *decoders;

@property (nonatomic, strong) HMImageCache *decodedImageCache;
@property (nonatomic, strong) dispatch_queue_t decodeQueue;

@end

@implementation HMImageManager

+ (instancetype)sharedManager {
    
    static HMImageManager *_manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _manager = [HMImageManager new];
        [_manager setup];
    });
    return _manager;
}

- (void)setup {
 
    _loaders = [[NSMutableArray alloc] init];
    _decoders = [[NSMutableArray alloc] init];

    [_loaders addObject:[HMBase64ImageLoader new]];
    [_loaders addObject:[HMWebImageLoader new]];
    [_loaders addObject:[HMLocalImageLoader new]];
    
    _decoders = [[NSMutableArray alloc] init];
    [_decoders addObject:[HMGIFImageDecoder new]];
    [_decoders addObject:[HMImageDecoder new]];
    
    self.decodeQueue = dispatch_queue_create("hummer.imageDecode.queue", DISPATCH_QUEUE_SERIAL);
}

- (nullable id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source
                           inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                                    context:(nullable HMImageLoaderContext *)context
                                 completion:(HMImageCompletionBlock)completionBlock{
    
    id<HMImageLoader> loader = [self loaderForSource:source inJSBundleSource:bundleSource context:context];
    __weak typeof(self) wSelf = self;
    NSString *cacheUrlString = [source hm_asString];
    if ([loader respondsToSelector:@selector(cacheKeyForSource:inJSBundleSource:)]) {
        cacheUrlString = [[loader cacheKeyForSource:source inJSBundleSource:bundleSource] hm_asString];
    }
    //1 check cache
    UIImage *image = [self.decodedImageCache imageForUrl:cacheUrlString context:context];
    if (image) {
        completionBlock(image,nil,HMImageCacheTypeMemory);
        return nil;
    }
    __block  id<HMImageLoaderOperation> operation = nil;
    HMImageLoaderCompletionBlock loaderCompletedBloack = ^(id _Nullable data, BOOL needCache, HMImageCacheType cacheType, NSError * _Nullable error) {
        if (error) {
            hm_safe_main_thread(^{
                completionBlock(nil,error,cacheType);
            });
            return;
        }
        if ([data isKindOfClass:NSData.class]) {
    
            id<HMImageDecoder> decoder = [wSelf decoderForImageData:data];
            HMImageDecoderCompletionBlock decoderBlock = ^(UIImage * _Nullable image, NSError * _Nullable error) {
                if (error) {
                    return;
                }
                if (needCache) {
                    [wSelf.decodedImageCache addImageToCache:image url:cacheUrlString context:context];
                }
                hm_safe_main_thread(^{
                    if ([operation isCancel]) {
                        return;
                    }
                    completionBlock(image,error,cacheType);
                });
            };
            //3 decode image
            dispatch_async(self.decodeQueue, ^{
                [decoder decodeImageData:data context:context completion:decoderBlock];
            });
        }else{
            hm_safe_main_thread(^{
                if ([operation isCancel]) {
                    return;
                }
                completionBlock(((UIImage *)data),nil,cacheType);
            });
        }
    };
    //2 start load（download or local asset）
    operation = [loader load:source inJSBundleSource:bundleSource context:context completion:loaderCompletedBloack];
    return operation;
}

- (BOOL)canLoad:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nonnull id<HMURLConvertible>)bundleSource {
    
    for (id<HMImageLoader> loader in self.loaders) {
        
        if ([loader canLoad:source inJSBundleSource:bundleSource]) {
            return YES;
        }
    }
    return NO;
}


- (id<HMImageLoader>)loaderForSource:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)jsBundleSource context:(nullable HMImageLoaderContext *)context{
    
    __block id<HMImageLoader> loader;
    HMInterceptorScope(context[HMImageManagerContextNamespace], ^{
        loader = [HMImageLoaderInterceptor interceptorCanLoad:source inJSBundleSource:jsBundleSource];
    });
    if (loader) {return loader;}
    for (id<HMImageLoader> loader in self.loaders) {
        
        if ([loader canLoad:source inJSBundleSource:jsBundleSource]) {
            return loader;
        }
    }
    return nil;
}

- (id<HMImageDecoder>)decoderForImageData:(NSData *)imageData {
    
    for (id<HMImageDecoder> decoder in self.decoders) {
        
        if ([decoder canDecodeImageData:imageData]) {
            return decoder;
        }
    }
    return nil;
}

- (HMImageCache *)decodedImageCache {
    if (!_decodedImageCache) {
        _decodedImageCache = [[HMImageCache alloc] init];
    }
    return _decodedImageCache;
}

- (void)registerLoader:(id<HMImageLoader>)loader {
    
    [_loaders addObject:loader];
}

- (void)resignLoader:(id<HMImageLoader>)loader {
    [_loaders removeObject:loader];
}

- (void)registerDecoder:(id<HMImageDecoder>)decoder {
    [_decoders addObject:decoder];
}

- (void)resignDecoder:(id<HMImageDecoder>)decoder {
    [_decoders removeObject:decoder];
}

@end
