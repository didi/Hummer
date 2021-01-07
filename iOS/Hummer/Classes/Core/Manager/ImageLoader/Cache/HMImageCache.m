//
//  HMImageCache.m
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import "HMImageCache.h"
#import "HMImageDecoder.h"

@interface HMImageCache()

@property (nonatomic, strong) NSCache *decodedImageCache;

@end

@implementation HMImageCache

static NSString *HMCacheKeyForImage(NSString *imageTag, CGSize size, CGFloat scale,HMResizeMode resizeMode) {
  return [NSString stringWithFormat:@"%@|%g|%g|%g|%lld",
          imageTag, size.width, size.height, scale, (long long)resizeMode];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _decodedImageCache = [[NSCache alloc] init];
        _decodedImageCache.totalCostLimit = 20 * 1024 * 1024;
        _decodedImageCache.name = @"com.hummer.imageCache";
    }
    return self;
}

- (void)addImageToCache:(UIImage *)image forKey:(NSString *)cacheKey {
    if (!image) {return;}
    [self.decodedImageCache setObject:image forKey:cacheKey];
}

- (nullable UIImage *)imageForUrl:(NSString *)url context:(HMImageLoaderContext *)context{
    
    CGSize destSize = [context[HMImageManagerContextImageResize] CGSizeValue];
    CGFloat scale = [context[HMImageManagerContextImageScaleFactor] floatValue];
    HMResizeMode mode = [context[HMImageManagerContextImageResizeMode] integerValue];
    NSString *tag = url;
    NSString *key = HMCacheKeyForImage(tag, destSize, scale, mode);
    return [self.decodedImageCache objectForKey:key];
}

- (void)addImageToCache:(UIImage *)image url:(NSString *)url context:(HMImageLoaderContext *)context {
    CGSize destSize = [context[HMImageManagerContextImageResize] CGSizeValue];
    CGFloat scale = [context[HMImageManagerContextImageScaleFactor] floatValue];
    HMResizeMode mode = [context[HMImageManagerContextImageResizeMode] integerValue];
    NSString *tag = url;
    NSString *key = HMCacheKeyForImage(tag, destSize, scale, mode);
    [self addImageToCache:image forKey:key];
}

@end
