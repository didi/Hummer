//
//  HMImageCoder.m
//  Hummer
//
//  Created by didi on 2021/8/31.
//

#import "HMImageCoderManager.h"
#import "HMGIFImageDecoder.h"
#import "HMImageIOCoder.h"
#import "HMAnimatedImage.h"
#import "HMImageCoderHelper.h"
#import "HMImageAPNGCoder.h"
#import "HMImageIOCoder.h"
#import "HMImageCoder.h"
#import "HMWebpBuiltInImageCoder.h"
#if __has_include(<Hummer/HMWebpImageCoder.h>)
#import <Hummer/HMWebpImageCoder.h>
#endif

@interface HMImageCoderManager()

@end
@implementation HMImageCoderManager

UIImage * _Nullable HMImageLoaderDecodeImageData(NSData * _Nonnull imageData, NSURL * _Nonnull imageURL, HMImageDecoderContext * _Nullable context) {

    if (imageData) {
        
        NSNumber *scaleValue = context[HMImageManagerContextImageScaleFactor];
        CGFloat scale = scaleValue ? scaleValue.doubleValue : 1;
        
        NSNumber *preserveAspectRatioValue = context[HMImageCoderDecodePreserveAspectRatio];
        NSValue *thumbnailSizeValue;
        
        if (context[HMImageManagerContextImageThumbnailPixelSize]) {
            thumbnailSizeValue = context[HMImageManagerContextImageThumbnailPixelSize];
        }
        HMImageCoderMutableOptions *mutableCoderOptions = [NSMutableDictionary dictionaryWithCapacity:2];
        mutableCoderOptions[HMImageCoderDecodeFirstFrameOnly] = @(NO);
        mutableCoderOptions[HMImageCoderDecodeScaleFactor] = @(scale);
        mutableCoderOptions[HMImageCoderDecodePreserveAspectRatio] = preserveAspectRatioValue;
        mutableCoderOptions[HMImageCoderDecodeThumbnailPixelSize] = thumbnailSizeValue;
        mutableCoderOptions[HMImageCoderWebImageContext] = context;
        HMImageCoderOptions *coderOptions = [mutableCoderOptions copy];
        
        // Grab the image coder
        id<HMImageCoder> imageCoder = [HMImageCoderManager sharedManager];
        
        // check whether we should use `HMAnimatedImage`, for gif src
        Class animatedImageClass = context[HMImageManagerContextAnimatedImageClass];
        UIImage *image = nil;
        if (animatedImageClass) {
            image = [[HMAnimatedImage alloc] initWithData:imageData scale:scale options:coderOptions];
        }
        if (!image) {
            image = [imageCoder decodedImageWithData:imageData options:coderOptions];
        }
        if (image) {
            BOOL shouldDecode = YES;
            if ([animatedImageClass isKindOfClass:HMAnimatedImage.class]) {
                // `HMAnimatedImage` do not decode
                shouldDecode = NO;
            } else if (image.hm_isAnimated) {
                // animated image do not decode
                shouldDecode = NO;
            }
            
            if (shouldDecode) {
                image = [HMImageCoderHelper decodedImageWithImage:image];
            }
        }
        return image;
    }
    return nil;
}


+ (HMImageCoderManager *)sharedManager {
    static HMImageCoderManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [HMImageCoderManager new];
        [manager setup];
    });
    return manager;
}


- (void)setup {
    
    _coders = [NSMutableArray new];
    [_coders addObject:[HMImageIOCoder new]];
    [_coders addObject:[HMGIFImageDecoder new]];
    [_coders addObject:[HMImageAPNGCoder new]];
    if (@available(iOS 14, tvOS 14, macOS 11, watchOS 7, *)) {
        // iOS 14 supports WebP built-in
        [_coders addObject:[HMWebpBuiltInImageCoder new]];
    } else {
        // iOS 13 does not supports WebP, use third-party codec
#if __has_include(<Hummer/HMWebpImageCoder.h>)
        [_coders addObject:[HMWebpImageCoder new]];
#endif

    }
}

- (BOOL)canDecodeFromData:(nullable NSData *)data {
    NSArray<id<HMImageCoder>> *coders = self.coders;
    for (id<HMImageCoder> coder in coders.reverseObjectEnumerator) {
        if ([coder canDecodeFromData:data]) {
            return YES;
        }
    }
    return NO;
}

- (UIImage *)decodedImageWithData:(NSData *)data options:(HMImageCoderOptions *)options {
    if (!data) {
        return nil;
    }
    UIImage *image;
    NSArray<id<HMImageCoder>> *coders = self.coders;
    for (id<HMImageCoder> coder in coders.reverseObjectEnumerator) {
        if ([coder canDecodeFromData:data]) {
            image = [coder decodedImageWithData:data options:options];
            break;
        }
    }
    return image;
}

- (BOOL)canEncodeToFormat:(HMImageFormat)format {
    
    NSArray<id<HMImageCoder>> *coders = self.coders;
    for (id<HMImageCoder> coder in coders.reverseObjectEnumerator) {
        if ([coder canEncodeToFormat:format]) {
            return YES;
        }
    }
    return NO;
}

- (nullable NSData *)encodedDataWithImage:(nullable UIImage *)image format:(HMImageFormat)format options:(nullable HMImageCoderOptions *)options {
    if (!image) {
        return nil;
    }
    NSArray<id<HMImageCoder>> *coders = self.coders;
    for (id<HMImageCoder> coder in coders.reverseObjectEnumerator) {
        if ([coder canEncodeToFormat:format]) {
            return [coder encodedDataWithImage:image format:format options:options];
        }
    }
    return nil;
}

@end
