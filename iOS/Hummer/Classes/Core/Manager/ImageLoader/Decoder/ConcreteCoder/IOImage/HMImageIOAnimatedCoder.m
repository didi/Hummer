//
//  HMIOImageAnimatedCoder.m
//  Hummer
//
//  Created by didi on 2021/9/3.
//

#import "HMImageIOAnimatedCoder.h"
#import "UIImage+HMMetadata.h"
#import "NSData+Hummer.h"
#import "HMImageCoderHelper.h"
#import "UIImage+HMForceDecode.h"
#import <ImageIO/ImageIO.h>

// Specify DPI for vector format in CGImageSource, like PDF
static NSString * kHMCGImageSourceRasterizationDPI = @"kCGImageSourceRasterizationDPI";
// Specify File Size for lossy format encoding, like JPEG
static NSString * kHMCGImageDestinationRequestedFileSize = @"kCGImageDestinationRequestedFileSize";

@interface HMImageIOCoderFrame : NSObject

@property (nonatomic, assign) NSUInteger index; // Frame index (zero based)
@property (nonatomic, assign) NSTimeInterval duration; // Frame duration in seconds

@end

@implementation HMImageIOCoderFrame
@end
//以下属性在 HMAnimatedImage 下生效，和 HMAnimatedImage 为绑定关系，因此不存在线程安全问题
@implementation HMImageIOAnimatedCoder {
    size_t _width, _height;
    CGImageSourceRef _imageSource;
    NSData *_imageData;
    CGFloat _scale;
    NSUInteger _loopCount;
    NSUInteger _frameCount;
    NSArray<HMImageIOCoderFrame *> *_frames;
    BOOL _finished;
    BOOL _preserveAspectRatio;
    CGSize _thumbnailSize;
}

+ (void)load {
    [self canEncodeToFormat:HMImageFormatGIF];
}
- (void)dealloc
{
    if (_imageSource) {
        CFRelease(_imageSource);
        _imageSource = NULL;
    }
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIApplicationDidReceiveMemoryWarningNotification object:nil];
}

- (void)didReceiveMemoryWarning:(NSNotification *)notification
{
    if (_imageSource) {
        for (size_t i = 0; i < _frameCount; i++) {
            CGImageSourceRemoveCacheAtIndex(_imageSource, i);
        }
    }
}

#pragma mark - Subclass Override

+ (HMImageFormat)imageFormat {
    @throw [NSException exceptionWithName:NSInternalInconsistencyException
                                   reason:[NSString stringWithFormat:@"For `HMImageIOAnimatedCoder` subclass, you must override %@ method", NSStringFromSelector(_cmd)]
                                 userInfo:nil];
}

+ (NSString *)imageUTType {
    @throw [NSException exceptionWithName:NSInternalInconsistencyException
                                   reason:[NSString stringWithFormat:@"For `HMImageIOAnimatedCoder` subclass, you must override %@ method", NSStringFromSelector(_cmd)]
                                 userInfo:nil];
}

+ (NSString *)dictionaryProperty {
    @throw [NSException exceptionWithName:NSInternalInconsistencyException
                                   reason:[NSString stringWithFormat:@"For `HMImageIOAnimatedCoder` subclass, you must override %@ method", NSStringFromSelector(_cmd)]
                                 userInfo:nil];
}

+ (NSString *)unclampedDelayTimeProperty {
    @throw [NSException exceptionWithName:NSInternalInconsistencyException
                                   reason:[NSString stringWithFormat:@"For `HMImageIOAnimatedCoder` subclass, you must override %@ method", NSStringFromSelector(_cmd)]
                                 userInfo:nil];
}

+ (NSString *)delayTimeProperty {
    @throw [NSException exceptionWithName:NSInternalInconsistencyException
                                   reason:[NSString stringWithFormat:@"For `HMImageIOAnimatedCoder` subclass, you must override %@ method", NSStringFromSelector(_cmd)]
                                 userInfo:nil];
}

+ (NSString *)loopCountProperty {
    @throw [NSException exceptionWithName:NSInternalInconsistencyException
                                   reason:[NSString stringWithFormat:@"For `HMImageIOAnimatedCoder` subclass, you must override %@ method", NSStringFromSelector(_cmd)]
                                 userInfo:nil];
}

+ (NSUInteger)defaultLoopCount {
    @throw [NSException exceptionWithName:NSInternalInconsistencyException
                                   reason:[NSString stringWithFormat:@"For `HMImageIOAnimatedCoder` subclass, you must override %@ method", NSStringFromSelector(_cmd)]
                                 userInfo:nil];
}

#pragma mark - Utils

+ (BOOL)canDecodeFromFormat:(HMImageFormat)format {
    static dispatch_once_t onceToken;
    static NSSet *imageUTTypeSet;
    dispatch_once(&onceToken, ^{
        NSArray *imageUTTypes = (__bridge_transfer NSArray *)CGImageSourceCopyTypeIdentifiers();
        imageUTTypeSet = [NSSet setWithArray:imageUTTypes];
    });
    CFStringRef imageUTType = [NSData hm_UTTypeFromImageFormat:format];
    if ([imageUTTypeSet containsObject:(__bridge NSString *)(imageUTType)]) {
        // Can decode from target format
        return YES;
    }
    return NO;
}

+ (BOOL)canEncodeToFormat:(HMImageFormat)format {
    static dispatch_once_t onceToken;
    static NSSet *imageUTTypeSet;
    dispatch_once(&onceToken, ^{
        NSArray *imageUTTypes = (__bridge_transfer NSArray *)CGImageDestinationCopyTypeIdentifiers();
        imageUTTypeSet = [NSSet setWithArray:imageUTTypes];
    });
    CFStringRef imageUTType = [NSData hm_UTTypeFromImageFormat:format];
    if ([imageUTTypeSet containsObject:(__bridge NSString *)(imageUTType)]) {
        // Can encode to target format
        return YES;
    }
    return NO;
}

+ (NSUInteger)imageLoopCountWithSource:(CGImageSourceRef)source {
    NSUInteger loopCount = self.defaultLoopCount;
    NSDictionary *imageProperties = (__bridge_transfer NSDictionary *)CGImageSourceCopyProperties(source, NULL);
    NSDictionary *containerProperties = imageProperties[self.dictionaryProperty];
    if (containerProperties) {
        NSNumber *containerLoopCount = containerProperties[self.loopCountProperty];
        if (containerLoopCount != nil) {
            loopCount = containerLoopCount.unsignedIntegerValue;
        }
    }
    return loopCount;
}

+ (NSTimeInterval)frameDurationAtIndex:(NSUInteger)index source:(CGImageSourceRef)source {
    NSDictionary *options = @{
        (__bridge NSString *)kCGImageSourceShouldCacheImmediately : @(YES),
        (__bridge NSString *)kCGImageSourceShouldCache : @(YES) // Always cache to reduce CPU usage
    };
    NSTimeInterval frameDuration = 0.1;
    CFDictionaryRef cfFrameProperties = CGImageSourceCopyPropertiesAtIndex(source, index, (__bridge CFDictionaryRef)options);
    if (!cfFrameProperties) {
        return frameDuration;
    }
    NSDictionary *frameProperties = (__bridge NSDictionary *)cfFrameProperties;
    NSDictionary *containerProperties = frameProperties[self.dictionaryProperty];
    
    NSNumber *delayTimeUnclampedProp = containerProperties[self.unclampedDelayTimeProperty];
    if (delayTimeUnclampedProp != nil) {
        frameDuration = [delayTimeUnclampedProp doubleValue];
    } else {
        NSNumber *delayTimeProp = containerProperties[self.delayTimeProperty];
        if (delayTimeProp != nil) {
            frameDuration = [delayTimeProp doubleValue];
        }
    }
    
    // Many annoying ads specify a 0 duration to make an image flash as quickly as possible.
    // We follow Firefox's behavior and use a duration of 100 ms for any frames that specify
    // a duration of <= 10 ms. See <rdar://problem/7689300> and <http://webkit.org/b/36082>
    // for more information.
    
    if (frameDuration < 0.011) {
        frameDuration = 0.1;
    }
    
    CFRelease(cfFrameProperties);
    return frameDuration;
}

+ (UIImage *)createFrameAtIndex:(NSUInteger)index source:(CGImageSourceRef)source scale:(CGFloat)scale preserveAspectRatio:(BOOL)preserveAspectRatio thumbnailSize:(CGSize)thumbnailSize options:(NSDictionary *)options {
    // Some options need to pass to `CGImageSourceCopyPropertiesAtIndex` before `CGImageSourceCreateImageAtIndex`, or ImageIO will ignore them because they parse once :)
    // Parse the image properties
    NSDictionary *properties = (__bridge_transfer NSDictionary *)CGImageSourceCopyPropertiesAtIndex(source, index, (__bridge CFDictionaryRef)options);
    NSUInteger pixelWidth = [properties[(__bridge NSString *)kCGImagePropertyPixelWidth] unsignedIntegerValue];
    NSUInteger pixelHeight = [properties[(__bridge NSString *)kCGImagePropertyPixelHeight] unsignedIntegerValue];
    CGImagePropertyOrientation exifOrientation = (CGImagePropertyOrientation)[properties[(__bridge NSString *)kCGImagePropertyOrientation] unsignedIntegerValue];
    if (!exifOrientation) {
        exifOrientation = kCGImagePropertyOrientationUp;
    }
    
    CFStringRef uttype = CGImageSourceGetType(source);
    // Check vector format
    BOOL isVector = NO;
    if ([NSData hm_imageFormatFromUTType:uttype] == HMImageFormatPDF) {
        isVector = YES;
    }

    NSMutableDictionary *decodingOptions;
    if (options) {
        decodingOptions = [NSMutableDictionary dictionaryWithDictionary:options];
    } else {
        decodingOptions = [NSMutableDictionary dictionary];
    }
    CGImageRef imageRef;
    BOOL createFullImage = thumbnailSize.width == 0 || thumbnailSize.height == 0 || pixelWidth == 0 || pixelHeight == 0 || (pixelWidth <= thumbnailSize.width && pixelHeight <= thumbnailSize.height);
    if (createFullImage) {
        if (isVector) {
            if (thumbnailSize.width == 0 || thumbnailSize.height == 0) {
                // Provide the default pixel count for vector images, simply just use the screen size
                thumbnailSize = UIScreen.mainScreen.bounds.size;
            }
            CGFloat maxPixelSize = MAX(thumbnailSize.width, thumbnailSize.height);
            NSUInteger DPIPerPixel = 2;
            NSUInteger rasterizationDPI = maxPixelSize * DPIPerPixel;
            decodingOptions[kHMCGImageSourceRasterizationDPI] = @(rasterizationDPI);
        }
        imageRef = CGImageSourceCreateImageAtIndex(source, index, (__bridge CFDictionaryRef)[decodingOptions copy]);
    } else {
        decodingOptions[(__bridge NSString *)kCGImageSourceCreateThumbnailWithTransform] = @(preserveAspectRatio);
        CGFloat maxPixelSize;
        if (preserveAspectRatio) {
            CGFloat pixelRatio = pixelWidth / pixelHeight;
            CGFloat thumbnailRatio = thumbnailSize.width / thumbnailSize.height;
            if (pixelRatio > thumbnailRatio) {
                maxPixelSize = thumbnailSize.width;
            } else {
                maxPixelSize = thumbnailSize.height;
            }
        } else {
            maxPixelSize = MAX(thumbnailSize.width, thumbnailSize.height);
        }
        decodingOptions[(__bridge NSString *)kCGImageSourceThumbnailMaxPixelSize] = @(maxPixelSize);
        decodingOptions[(__bridge NSString *)kCGImageSourceCreateThumbnailFromImageAlways] = @(YES);
        imageRef = CGImageSourceCreateThumbnailAtIndex(source, index, (__bridge CFDictionaryRef)[decodingOptions copy]);
    }
    if (!imageRef) {
        return nil;
    }
    // Thumbnail image post-process
    if (!createFullImage) {
        if (preserveAspectRatio) {
            // kCGImageSourceCreateThumbnailWithTransform will apply EXIF transform as well, we should not apply twice
            exifOrientation = kCGImagePropertyOrientationUp;
        } else {
            // `CGImageSourceCreateThumbnailAtIndex` take only pixel dimension, if not `preserveAspectRatio`, we should manual scale to the target size
            CGImageRef scaledImageRef = [HMImageCoderHelper CGImageCreateScaled:imageRef size:thumbnailSize];
            CGImageRelease(imageRef);
            imageRef = scaledImageRef;
        }
    }
    
    UIImageOrientation imageOrientation = [HMImageCoderHelper imageOrientationFromEXIFOrientation:exifOrientation];
    UIImage *image = [[UIImage alloc] initWithCGImage:imageRef scale:scale orientation:imageOrientation];

    CGImageRelease(imageRef);
    return image;
}

#pragma mark - Decode
- (BOOL)canDecodeFromData:(nullable NSData *)data {
    return ([NSData hm_imageFormatForImageData:data] == self.class.imageFormat);
}

- (UIImage *)decodedImageWithData:(NSData *)data options:(nullable HMImageCoderOptions *)options {
    if (!data) {
        return nil;
    }
    CGFloat scale = 1;
    NSNumber *scaleFactor = options[HMImageCoderDecodeScaleFactor];
    if (scaleFactor != nil) {
        scale = MAX([scaleFactor doubleValue], 1);
    }
    
    CGSize thumbnailSize = CGSizeZero;
    NSValue *thumbnailSizeValue = options[HMImageCoderDecodeThumbnailPixelSize];
    if (thumbnailSizeValue != nil) {

        thumbnailSize = thumbnailSizeValue.CGSizeValue;
    }
    
    BOOL preserveAspectRatio = YES;
    NSNumber *preserveAspectRatioValue = options[HMImageCoderDecodePreserveAspectRatio];
    if (preserveAspectRatioValue != nil) {
        preserveAspectRatio = preserveAspectRatioValue.boolValue;
    }
    
    CGImageSourceRef source = CGImageSourceCreateWithData((__bridge CFDataRef)data, NULL);
    if (!source) {
        return nil;
    }
    size_t count = CGImageSourceGetCount(source);
    UIImage *animatedImage;
    
    BOOL decodeFirstFrame = [options[HMImageCoderDecodeFirstFrameOnly] boolValue];
    if (decodeFirstFrame || count <= 1) {
        animatedImage = [self.class createFrameAtIndex:0 source:source scale:scale preserveAspectRatio:preserveAspectRatio thumbnailSize:thumbnailSize options:nil];
    } else {
        NSMutableArray<HMImageFrame *> *frames = [NSMutableArray array];
        
        for (size_t i = 0; i < count; i++) {
            UIImage *image = [self.class createFrameAtIndex:i source:source scale:scale preserveAspectRatio:preserveAspectRatio thumbnailSize:thumbnailSize options:nil];
            if (!image) {
                continue;
            }
            
            NSTimeInterval duration = [self.class frameDurationAtIndex:i source:source];
            
            HMImageFrame *frame = [HMImageFrame frameWithImage:image duration:duration];
            [frames addObject:frame];
        }
        
        NSUInteger loopCount = [self.class imageLoopCountWithSource:source];
        
        animatedImage = [HMImageCoderHelper animatedImageWithFrames:frames];
        animatedImage.hm_imageLoopCount = loopCount;
    }
    animatedImage.hm_imageFormat = self.class.imageFormat;
    CFRelease(source);
    
    return animatedImage;
}

#pragma mark - Encode

- (BOOL)canEncodeToFormat:(HMImageFormat)format {
    return (format == self.class.imageFormat);
}

- (NSData *)encodedDataWithImage:(UIImage *)image format:(HMImageFormat)format options:(nullable HMImageCoderOptions *)options {
    if (!image) {
        return nil;
    }
    CGImageRef imageRef = image.CGImage;
    if (!imageRef) {
        // Earily return, supports CGImage only
        return nil;
    }
    
    if (format != self.class.imageFormat) {
        return nil;
    }
    
    NSMutableData *imageData = [NSMutableData data];
    CFStringRef imageUTType = [NSData hm_UTTypeFromImageFormat:format];
    NSArray<HMImageFrame *> *frames = [HMImageCoderHelper framesFromAnimatedImage:image];
    
    // Create an image destination. Animated Image does not support EXIF image orientation TODO
    // The `CGImageDestinationCreateWithData` will log a warning when count is 0, use 1 instead.
    CGImageDestinationRef imageDestination = CGImageDestinationCreateWithData((__bridge CFMutableDataRef)imageData, imageUTType, frames.count ?: 1, NULL);
    if (!imageDestination) {
        // Handle failure.
        return nil;
    }
    NSMutableDictionary *properties = [NSMutableDictionary dictionary];
    // Encoding Options
    double compressionQuality = 1;
    if (options[HMImageCoderEncodeCompressionQuality]) {
        compressionQuality = [options[HMImageCoderEncodeCompressionQuality] doubleValue];
    }
    properties[(__bridge NSString *)kCGImageDestinationLossyCompressionQuality] = @(compressionQuality);
    CGColorRef backgroundColor = [options[HMImageCoderEncodeBackgroundColor] CGColor];
    if (backgroundColor) {
        properties[(__bridge NSString *)kCGImageDestinationBackgroundColor] = (__bridge id)(backgroundColor);
    }
    CGSize maxPixelSize = CGSizeZero;
    NSValue *maxPixelSizeValue = options[HMImageCoderEncodeMaxPixelSize];
    if (maxPixelSizeValue != nil) {

        maxPixelSize = maxPixelSizeValue.CGSizeValue;
    }
    NSUInteger pixelWidth = CGImageGetWidth(imageRef);
    NSUInteger pixelHeight = CGImageGetHeight(imageRef);
    CGFloat finalPixelSize = 0;
    if (maxPixelSize.width > 0 && maxPixelSize.height > 0 && pixelWidth > maxPixelSize.width && pixelHeight > maxPixelSize.height) {
        CGFloat pixelRatio = pixelWidth / pixelHeight;
        CGFloat maxPixelSizeRatio = maxPixelSize.width / maxPixelSize.height;
        if (pixelRatio > maxPixelSizeRatio) {
            finalPixelSize = maxPixelSize.width;
        } else {
            finalPixelSize = maxPixelSize.height;
        }
        properties[(__bridge NSString *)kCGImageDestinationImageMaxPixelSize] = @(finalPixelSize);
    }
    NSUInteger maxFileSize = [options[HMImageCoderEncodeMaxFileSize] unsignedIntegerValue];
    if (maxFileSize > 0) {
        properties[kHMCGImageDestinationRequestedFileSize] = @(maxFileSize);
        // Remove the quality if we have file size limit
        properties[(__bridge NSString *)kCGImageDestinationLossyCompressionQuality] = nil;
    }
    BOOL embedThumbnail = NO;
    if (options[HMImageCoderEncodeEmbedThumbnail]) {
        embedThumbnail = [options[HMImageCoderEncodeEmbedThumbnail] boolValue];
    }
    properties[(__bridge NSString *)kCGImageDestinationEmbedThumbnail] = @(embedThumbnail);
    
    BOOL encodeFirstFrame = [options[HMImageCoderEncodeFirstFrameOnly] boolValue];
    if (encodeFirstFrame || frames.count == 0) {
        // for static single images
        CGImageDestinationAddImage(imageDestination, imageRef, (__bridge CFDictionaryRef)properties);
    } else {
        // for animated images
        NSUInteger loopCount = image.hm_imageLoopCount;
        NSDictionary *containerProperties = @{
            self.class.dictionaryProperty: @{self.class.loopCountProperty : @(loopCount)}
        };
        // container level properties (applies for `CGImageDestinationSetProperties`, not individual frames)
        CGImageDestinationSetProperties(imageDestination, (__bridge CFDictionaryRef)containerProperties);
        
        for (size_t i = 0; i < frames.count; i++) {
            HMImageFrame *frame = frames[i];
            NSTimeInterval frameDuration = frame.duration;
            CGImageRef frameImageRef = frame.image.CGImage;
            properties[self.class.dictionaryProperty] = @{self.class.delayTimeProperty : @(frameDuration)};
            CGImageDestinationAddImage(imageDestination, frameImageRef, (__bridge CFDictionaryRef)properties);
        }
    }
    // Finalize the destination.
    if (CGImageDestinationFinalize(imageDestination) == NO) {
        // Handle failure.
        imageData = nil;
    }
    
    CFRelease(imageDestination);
    
    return [imageData copy];
}

#pragma mark - HMAnimatedImageCoder
- (nullable instancetype)initWithAnimatedImageData:(nullable NSData *)data options:(nullable HMImageCoderOptions *)options {
    if (!data) {
        return nil;
    }
    self = [super init];
    if (self) {
        CGImageSourceRef imageSource = CGImageSourceCreateWithData((__bridge CFDataRef)data, NULL);
        if (!imageSource) {
            return nil;
        }
        BOOL framesValid = [self scanAndCheckFramesValidWithImageSource:imageSource];
        if (!framesValid) {
            CFRelease(imageSource);
            return nil;
        }
        CGFloat scale = 1;
        NSNumber *scaleFactor = options[HMImageCoderDecodeScaleFactor];
        if (scaleFactor != nil) {
            scale = MAX([scaleFactor doubleValue], 1);
        }
        _scale = scale;
        CGSize thumbnailSize = CGSizeZero;
        NSValue *thumbnailSizeValue = options[HMImageCoderDecodeThumbnailPixelSize];
        if (thumbnailSizeValue != nil) {

            thumbnailSize = thumbnailSizeValue.CGSizeValue;
        }
        _thumbnailSize = thumbnailSize;
        BOOL preserveAspectRatio = YES;
        NSNumber *preserveAspectRatioValue = options[HMImageCoderDecodePreserveAspectRatio];
        if (preserveAspectRatioValue != nil) {
            preserveAspectRatio = preserveAspectRatioValue.boolValue;
        }
        _preserveAspectRatio = preserveAspectRatio;
        _imageSource = imageSource;
        _imageData = data;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceiveMemoryWarning:) name:UIApplicationDidReceiveMemoryWarningNotification object:nil];
    }
    return self;
}

- (BOOL)scanAndCheckFramesValidWithImageSource:(CGImageSourceRef)imageSource {
    if (!imageSource) {
        return NO;
    }
    NSUInteger frameCount = CGImageSourceGetCount(imageSource);
    NSUInteger loopCount = [self.class imageLoopCountWithSource:imageSource];
    NSMutableArray<HMImageIOCoderFrame *> *frames = [NSMutableArray array];
    
    for (size_t i = 0; i < frameCount; i++) {
        HMImageIOCoderFrame *frame = [[HMImageIOCoderFrame alloc] init];
        frame.index = i;
        frame.duration = [self.class frameDurationAtIndex:i source:imageSource];
        [frames addObject:frame];
    }
    
    _frameCount = frameCount;
    _loopCount = loopCount;
    _frames = [frames copy];
    
    return YES;
}

- (NSData *)animatedImageData {
    return _imageData;
}

- (NSUInteger)animatedImageLoopCount {
    return _loopCount;
}

- (NSUInteger)animatedImageFrameCount {
    return _frameCount;
}

- (NSTimeInterval)animatedImageDurationAtIndex:(NSUInteger)index {
    if (index >= _frameCount) {
        return 0;
    }
    return _frames[index].duration;
}

- (UIImage *)animatedImageFrameAtIndex:(NSUInteger)index {
    if (index >= _frameCount) {
        return nil;
    }
    // Animated Image should not use the CGContext solution to force decode. Prefers to use Image/IO built in method, which is safer and memory friendly, see https://github.com/SDWebImage/SDWebImage/issues/2961
    NSDictionary *options = @{
        (__bridge NSString *)kCGImageSourceShouldCacheImmediately : @(YES),
        (__bridge NSString *)kCGImageSourceShouldCache : @(YES) // Always cache to reduce CPU usage
    };
    UIImage *image = [self.class createFrameAtIndex:index source:_imageSource scale:_scale preserveAspectRatio:_preserveAspectRatio thumbnailSize:_thumbnailSize options:options];
    if (!image) {
        return nil;
    }
    image.hm_imageFormat = self.class.imageFormat;
    image.hm_isDecoded = YES;
    return image;
}

@end

