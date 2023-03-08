//
//  HMImageCacheManager.m
//  Hummer
//
//  Created by didi on 2021/9/2.
//

#import "HMImageCacheManager.h"
#import "HMImageCoder.h"
#import "HMImageDiskCache.h"
#import "HMImageCoderManager.h"
#import "HMUtility.h"

@interface HMImageMemoryCacheWrapper : NSObject

@property (nonatomic, strong) HMStorageExpiration *expiration;
@property (nonatomic, strong) UIImage *imageCache;

- (instancetype)initWithImage:(UIImage *)image;
@end

@implementation HMImageMemoryCacheWrapper

- (instancetype)initWithImage:(UIImage *)image {
    self = [super init];
    if(self){
        
        _imageCache = image;
        _expiration = [HMStorageExpiration never];
    }
    return self;
}
@end


@interface HMImageCacheManager()

@property (nonatomic, strong) NSCache *decodedImageCache;
@property (nonatomic, strong) HMImageDiskCache *diskCache;

@property (nonatomic, strong) dispatch_queue_t ioQueue;
@end

@implementation HMImageCacheManager

static NSString *HMCacheKeyForImage(NSString *imageTag, CGSize size, CGFloat scale,HMResizeMode resizeMode) {
  return [NSString stringWithFormat:@"%@|%g|%g|%g|%lld",
          imageTag, size.width, size.height, scale, (long long)resizeMode];
}
+ (HMImageCacheManager *)sharedManager {
    static HMImageCacheManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [HMImageCacheManager new];
    });
    return manager;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        
        _ioQueue = dispatch_queue_create("com.hummer.imageIO.queue", DISPATCH_QUEUE_SERIAL);

        _decodedImageCache = [[NSCache alloc] init];
        _decodedImageCache.totalCostLimit = NSProcessInfo.processInfo.physicalMemory/4;
        _decodedImageCache.countLimit = NSIntegerMax;
        _decodedImageCache.name = @"com.hummer.imageCache";
        
        HMImageDiskCacheConfig *config = [HMImageDiskCacheConfig defaultConfig];
        _diskCache = [[HMImageDiskCache alloc] initWithConfig:config];
        
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(clearMemoryCache) name:UIApplicationDidReceiveMemoryWarningNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(cleanExpiredDiskCache) name:UIApplicationWillTerminateNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(backgroundCleanExpiredDiskCache) name:UIApplicationDidEnterBackgroundNotification object:nil];
    }
    return self;
}

#pragma mark - notification
- (void)clearMemoryCache {
    [self.decodedImageCache removeAllObjects];
}
// todo
- (void)cleanExpiredDiskCache {
    
}

- (void)backgroundCleanExpiredDiskCache {

    __block UIBackgroundTaskIdentifier identifier;
    identifier = [[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:^{

        [[UIApplication sharedApplication] endBackgroundTask:identifier];
    }];
    NSArray *res = [self.diskCache removeSizeExceededValues];
    HMLogDebug(@"call removeSizeExceededValues when enter background, %@ is deleted", res);
}

#pragma mark - memory
- (void)_addImageToCache:(UIImage *)image forKey:(NSString *)cacheKey {
    if (!image) {return;}
    HMImageMemoryCacheWrapper *wrapper = [[HMImageMemoryCacheWrapper alloc] initWithImage:image];
    [self.decodedImageCache setObject:wrapper forKey:cacheKey];
}

- (nullable UIImage *)_imageForUrl:(NSString *)url context:(HMImageLoaderContext *)context{
    
    NSString *key = [self buildMemoryKeyWithUrl:url context:context];
    HMImageMemoryCacheWrapper *wrapper = [self.decodedImageCache objectForKey:key];
    return wrapper.imageCache;
}

- (NSString *)buildMemoryKeyWithUrl:(NSString *)url context:(HMImageLoaderContext *)context{
    CGSize destSize = [context[HMImageManagerContextImageThumbnailPixelSize] CGSizeValue];
    CGFloat scale = [context[HMImageManagerContextImageScaleFactor] floatValue];
    HMResizeMode mode = [context[HMImageManagerContextImageResizeMode] integerValue];
    NSString *tag = url;
    NSString *key = HMCacheKeyForImage(tag, destSize, scale, mode);
    return key;
}

- (void)addImageToCache:(UIImage *)image url:(NSString *)url context:(HMImageLoaderContext *)context {
    NSString *key = [self buildMemoryKeyWithUrl:url context:context];
    [self _addImageToCache:image forKey:key];
}

#pragma mark - public

- (id<HMImageLoaderOperation>)queryImageWithSource:(id<HMURLConvertible>)source context:(HMImageLoaderContext *)context result:(HMImageCacheCompletionBlock)result {
        
    //内存缓存需要根据scale mode 等作为key
    HMImageCacheType queryCacheType = HMImageCacheTypeAll;
    if (context[HMImageContextQueryCacheType]) {
        queryCacheType = [context[HMImageContextQueryCacheType] integerValue];
    }
    if(queryCacheType == HMImageCacheTypeNone){
        result(nil, nil, nil,HMImageCacheTypeNone, nil);
        return nil;
    }
    BOOL shouldQueryMemory = (queryCacheType ==  HMImageCacheTypeMemory || queryCacheType == HMImageCacheTypeAll);
    BOOL shouldQueryDisk = (queryCacheType ==  HMImageCacheTypeDisk || queryCacheType == HMImageCacheTypeAll);
    
    UIImage *image = [self _imageForUrl:[source hm_asString] context:context];
    if (image && shouldQueryMemory) {
        result(image, nil, nil, HMImageCacheTypeMemory, nil);
        return nil;
    }
    
    HMImageLoaderOperation *operation = [HMImageLoaderOperation new];
    HMImageCacheType storeCacheType = HMImageCacheTypeAll;
    if (context[HMImageContextStoreCacheType]) {
        storeCacheType = [context[HMImageContextStoreCacheType] integerValue];
    }
    BOOL shouldStoreMemory = (storeCacheType ==  HMImageCacheTypeMemory || storeCacheType == HMImageCacheTypeAll);
    
    //disk
    if(shouldQueryDisk){
        dispatch_async(self.ioQueue, ^{
            NSString *filePath = nil;
            NSData *data = [self.diskCache dataForKey:[source hm_asString] filePath:&filePath];
            if (!data) {
                hm_safe_main_thread(^{
                    result(nil, nil, nil, HMImageCacheTypeNone, nil);
                });
                return;
            }
            BOOL needDecode = ![context[HMImageContextImageDoNotDecode] boolValue];
            UIImage *image = nil;
            if(data && needDecode){
                image = HMImageLoaderDecodeImageData(data, [source hm_asUrl], context);
            }
            hm_safe_main_thread(^{
                if(image && shouldStoreMemory){
                    [self addImageToCache:image url:[source hm_asString] context:context];
                }
                result(image, data, filePath, HMImageCacheTypeDisk, nil);
            });
        });
    }    
    return operation;
}


- (void)storeImage:(nullable UIImage *)image data:(nullable NSData *)data source:(nonnull id<HMURLConvertible>)source context:(nonnull HMImageLoaderContext *)context result:(nullable void (^)(NSString * _Nullable))result{
    
    HMImageCacheType queryCacheType = HMImageCacheTypeAll;
    if (context[HMImageContextStoreCacheType]) {
        queryCacheType = [context[HMImageContextStoreCacheType] integerValue];
    }
    if(queryCacheType == HMImageCacheTypeNone){
        return;
    }
    BOOL shouldStoreMemory = (queryCacheType ==  HMImageCacheTypeMemory || queryCacheType == HMImageCacheTypeAll);
    BOOL shouldStoreDisk = (queryCacheType ==  HMImageCacheTypeDisk || queryCacheType == HMImageCacheTypeAll);
    if(image && shouldStoreMemory){
        [self addImageToCache:image url:[source hm_asString] context:context];
    }
    if (data && shouldStoreDisk) {
        dispatch_async(self.ioQueue, ^{
            NSString *path = [self.diskCache storeData:(id<HMDataConvertible>)data forKey:[source hm_asString]];
            if(result){
                HMSafeMainThread(^{
                    result(path);
                });
            }
        });
    }
    return;
}




- (NSData *)imageDataFromDiskCacheForKey:(id<HMURLConvertible>)key context:(HMImageLoaderContext *)context {
    __block NSData *data = nil;
    dispatch_sync(self.ioQueue, ^{
        data = [self.diskCache dataForKey:[key hm_asString] filePath:nil];
    });
    return data;
}

- (void)removeDiskCacheForKey:(id<HMURLConvertible>)key context:(HMImageLoaderContext *)context{
    dispatch_sync(self.ioQueue, ^{
        [self.diskCache removeCacheForKey:[key hm_asString]];
    });
}

- (UIImage *)imageFromMemoryCacheForKey:(id<HMURLConvertible>)key context:(HMImageLoaderContext *)context {
    //内存缓存需要根据scale mode 等作为key
    return [self _imageForUrl:[key hm_asString] context:context];
}

- (void)removeMemoryCacheForKey:(id<HMURLConvertible>)key  context:(HMImageLoaderContext *)context{
    if (!key) {return;}
    NSString *_key = [self buildMemoryKeyWithUrl:[key hm_asString] context:context];
    [self.decodedImageCache removeObjectForKey:_key];
}

- (void)removeCacheForKey:(id<HMURLConvertible>)key context:(HMImageLoaderContext *)context{
    
    [self removeMemoryCacheForKey:key context:context];
    [self removeDiskCacheForKey:key context:context];
}


- (void)clearAll {
    
    [self clearMemoryCache];
    [self clearDiskCache];
}

- (void)clearDiskCache {
    dispatch_sync(self.ioQueue, ^{
        [self.diskCache removeAll];
    });
}
@end
