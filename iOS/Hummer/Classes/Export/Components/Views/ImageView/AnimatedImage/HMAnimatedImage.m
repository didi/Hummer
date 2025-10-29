//
//  HMImageCoder.m
//  Hummer
//
//  Created by didi on 2021/8/31.
//


#import "HMAnimatedImage.h"
#import "HMImageCoder.h"
#import "HMImageCoderManager.h"
#import "HMImageFrame.h"
#import "UIImage+HMMetadata.h"
#import "HMImageCoderHelper.h"
#import "objc/runtime.h"

static CGFloat HMImageScaleFromPath(NSString *string) {
    if (string.length == 0 || [string hasSuffix:@"/"]) return 1;
    NSString *name = string.stringByDeletingPathExtension;
    __block CGFloat scale = 1;
    
    NSRegularExpression *pattern = [NSRegularExpression regularExpressionWithPattern:@"@[0-9]+\\.?[0-9]*x$" options:NSRegularExpressionAnchorsMatchLines error:nil];
    [pattern enumerateMatchesInString:name options:kNilOptions range:NSMakeRange(0, name.length) usingBlock:^(NSTextCheckingResult *result, NSMatchingFlags flags, BOOL *stop) {
        scale = [string substringWithRange:NSMakeRange(result.range.location + 1, result.range.length - 2)].doubleValue;
    }];
    
    return scale;
}

@interface HMAnimatedImage ()

@property (nonatomic, strong) id<HMAnimatedImageCoder> animatedCoder;
@property (nonatomic, assign, readwrite) HMImageFormat animatedImageFormat;
@property (atomic, copy) NSArray<HMImageFrame *> *loadedAnimatedImageFrames; // Mark as atomic to keep thread-safe
@property (nonatomic, assign, getter=isAllFramesLoaded) BOOL allFramesLoaded;

@end

@implementation HMAnimatedImage
@dynamic scale; // call super

- (instancetype)initWithData:(NSData *)data scale:(CGFloat)scale options:(HMImageCoderOptions *)options {
    if (!data || data.length == 0) {
        return nil;
    }
    data = [data copy]; // avoid mutable data
    id<HMAnimatedImageCoder> animatedCoder = nil;
    for (id<HMImageCoder>coder in [HMImageCoderManager sharedManager].coders.reverseObjectEnumerator) {
        if ([coder conformsToProtocol:@protocol(HMAnimatedImageCoder)]) {
            if ([coder canDecodeFromData:data]) {
                if (!options) {
                    options = @{HMImageCoderDecodeScaleFactor : @(scale)};
                }
                animatedCoder = [[[coder class] alloc] initWithAnimatedImageData:data options:options];
                break;
            }
        }
    }
    if (!animatedCoder) {
        return nil;
    }
    return [self initWithAnimatedCoder:animatedCoder scale:scale];
}

- (instancetype)initWithAnimatedCoder:(id<HMAnimatedImageCoder>)animatedCoder scale:(CGFloat)scale {
    if (!animatedCoder) {
        return nil;
    }
    UIImage *image = [animatedCoder animatedImageFrameAtIndex:0];
    if (!image) {
        return nil;
    }
    self = [super initWithCGImage:image.CGImage scale:MAX(scale, 1) orientation:image.imageOrientation];
    if (self) {
        // Only keep the animated coder if frame count > 1, save RAM usage for non-animated image format (APNG/WebP)
        if (animatedCoder.animatedImageFrameCount > 1) {
            _animatedCoder = animatedCoder;
        }
        NSData *data = [animatedCoder animatedImageData];
        HMImageFormat format = [NSData hm_imageFormatForImageData:data];
        _animatedImageFormat = format;
    }
    return self;
}

#pragma mark - Preload
- (void)preloadAllFrames {
    if (!_animatedCoder) {
        return;
    }
    if (!self.isAllFramesLoaded) {
        NSMutableArray<HMImageFrame *> *frames = [NSMutableArray arrayWithCapacity:self.animatedImageFrameCount];
        for (size_t i = 0; i < self.animatedImageFrameCount; i++) {
            UIImage *image = [self animatedImageFrameAtIndex:i];
            NSTimeInterval duration = [self animatedImageDurationAtIndex:i];
            HMImageFrame *frame = [HMImageFrame frameWithImage:image duration:duration]; // through the image should be nonnull, used as nullable for `animatedImageFrameAtIndex:`
            [frames addObject:frame];
        }
        self.loadedAnimatedImageFrames = frames;
        self.allFramesLoaded = YES;
    }
}

- (void)unloadAllFrames {
    if (!_animatedCoder) {
        return;
    }
    if (self.isAllFramesLoaded) {
        self.loadedAnimatedImageFrames = nil;
        self.allFramesLoaded = NO;
    }
}
#pragma mark - HMAnimatedImageProvider

- (NSData *)animatedImageData {
    return [self.animatedCoder animatedImageData];
}

- (NSUInteger)animatedImageLoopCount {
    return [self.animatedCoder animatedImageLoopCount];
}

- (NSUInteger)animatedImageFrameCount {
    return [self.animatedCoder animatedImageFrameCount];
}

- (UIImage *)animatedImageFrameAtIndex:(NSUInteger)index {
    if (index >= self.animatedImageFrameCount) {
        return nil;
    }
    if (self.isAllFramesLoaded) {
        HMImageFrame *frame = [self.loadedAnimatedImageFrames objectAtIndex:index];
        return frame.image;
    }
    return [self.animatedCoder animatedImageFrameAtIndex:index];
}

- (NSTimeInterval)animatedImageDurationAtIndex:(NSUInteger)index {
    if (index >= self.animatedImageFrameCount) {
        return 0;
    }
    if (self.isAllFramesLoaded) {
        HMImageFrame *frame = [self.loadedAnimatedImageFrames objectAtIndex:index];
        return frame.duration;
    }
    return [self.animatedCoder animatedImageDurationAtIndex:index];
}

@end


@implementation HMAnimatedImage (Metadata)

- (BOOL)hm_isAnimated {
    return YES;
}

- (NSUInteger)hm_imageLoopCount {
    return self.animatedImageLoopCount;
}
- (void)setHm_imageLoopCount:(NSUInteger)hm_imageLoopCount {

    return;
}

- (HMImageFormat)hm_imageFormat {
    return self.animatedImageFormat;
}

- (void)setHm_imageFormat:(HMImageFormat)hm_imageFormat {
    return;
}

- (BOOL)hm_isVector {
    return NO;
}

@end
