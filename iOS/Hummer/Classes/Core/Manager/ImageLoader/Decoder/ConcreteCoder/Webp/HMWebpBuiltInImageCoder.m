//
//  HMWebpBuiltInImageCoder.m
//  Hummer
//
//  Created by didi on 2021/9/1.
//

#import "HMWebpBuiltInImageCoder.h"
#import "NSData+Hummer.h"
#import "HMImageIOAnimatedCoder+Internal.h"

// These constants are available from iOS 14+ and Xcode 12. This raw value is used for toolchain and firmware compatibility
static NSString * kHMCGImagePropertyWebPDictionary = @"{WebP}";
static NSString * kHMCGImagePropertyWebPLoopCount = @"LoopCount";
static NSString * kHMCGImagePropertyWebPDelayTime = @"DelayTime";
static NSString * kHMCGImagePropertyWebPUnclampedDelayTime = @"UnclampedDelayTime";

@implementation HMWebpBuiltInImageCoder

+ (void)initialize {
#if __IPHONE_14_0 || __TVOS_14_0 || __MAC_11_0 || __WATCHOS_7_0
    // Xcode 12
    if (@available(iOS 14, tvOS 14, macOS 11, watchOS 7, *)) {
        // Use SDK instead of raw value
        kHMCGImagePropertyWebPDictionary = (__bridge NSString *)kCGImagePropertyWebPDictionary;
        kHMCGImagePropertyWebPLoopCount = (__bridge NSString *)kCGImagePropertyWebPLoopCount;
        kHMCGImagePropertyWebPDelayTime = (__bridge NSString *)kCGImagePropertyWebPDelayTime;
        kHMCGImagePropertyWebPUnclampedDelayTime = (__bridge NSString *)kCGImagePropertyWebPUnclampedDelayTime;
    }
#endif
}

#pragma mark - HMImageCoder

- (BOOL)canDecodeFromData:(nullable NSData *)data {
    switch ([NSData hm_imageFormatForImageData:data]) {
        case HMImageFormatWebP:
            // Check WebP decoding compatibility
            return [self.class canDecodeFromFormat:HMImageFormatWebP];
        default:
            return NO;
    }
}

- (BOOL)canEncodeToFormat:(HMImageFormat)format {
    switch (format) {
        case HMImageFormatWebP:
            // Check WebP encoding compatibility
            return [self.class canEncodeToFormat:HMImageFormatWebP];
        default:
            return NO;
    }
}
- (UIImage *)decodedImageWithData:(NSData *)data options:(HMImageCoderOptions *)options {
    return [super decodedImageWithData:data options:options];
}
#pragma mark - Subclass Override

+ (HMImageFormat)imageFormat {
    return HMImageFormatWebP;
}

+ (NSString *)imageUTType {
    return (__bridge NSString *)kHMUTTypeWebP;
}

+ (NSString *)dictionaryProperty {
    return kHMCGImagePropertyWebPDictionary;
}

+ (NSString *)unclampedDelayTimeProperty {
    return kHMCGImagePropertyWebPUnclampedDelayTime;
}

+ (NSString *)delayTimeProperty {
    return kHMCGImagePropertyWebPDelayTime;
}

+ (NSString *)loopCountProperty {
    return kHMCGImagePropertyWebPLoopCount;
}

+ (NSUInteger)defaultLoopCount {
    return 0;
}

@end
