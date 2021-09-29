//
//  HMImageIOAnimatedCoder+Internal.h
//  Hummer
//
//  Created by didi on 2021/9/3.
//

#import "HMImageIOAnimatedCoder.h"

NS_ASSUME_NONNULL_BEGIN

// AVFileTypeHEIC/AVFileTypeHEIF is defined in AVFoundation via iOS 11, we use this without import AVFoundation
#define kHMUTTypeHEIC ((__bridge CFStringRef)@"public.heic")
#define kHMUTTypeHEIF ((__bridge CFStringRef)@"public.heif")
// HEIC Sequence (Animated Image)
#define kHMUTTypeHEICS ((__bridge CFStringRef)@"public.heics")
// kUTTypeWebP seems not defined in public UTI framework, Apple use the hardcode string, we define them :)
#define kHMUTTypeWebP ((__bridge CFStringRef)@"org.webmproject.webp")


@interface HMImageIOAnimatedCoder ()

+ (NSTimeInterval)frameDurationAtIndex:(NSUInteger)index source:(nonnull CGImageSourceRef)source;
+ (NSUInteger)imageLoopCountWithSource:(nonnull CGImageSourceRef)source;
+ (nullable UIImage *)createFrameAtIndex:(NSUInteger)index source:(nonnull CGImageSourceRef)source scale:(CGFloat)scale preserveAspectRatio:(BOOL)preserveAspectRatio thumbnailSize:(CGSize)thumbnailSize options:(nullable NSDictionary *)options;
+ (BOOL)canEncodeToFormat:(HMImageFormat)format;
+ (BOOL)canDecodeFromFormat:(HMImageFormat)format;


@end

NS_ASSUME_NONNULL_END
