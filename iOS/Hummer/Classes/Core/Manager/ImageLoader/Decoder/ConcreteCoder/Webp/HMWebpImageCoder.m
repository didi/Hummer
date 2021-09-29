//
//  HMWebpImageCoder.m
//  Hummer
//
//  Created by didi on 2021/9/1.
//

#import "HMWebpImageCoder.h"
#import "HMWebPImageCoderDefine.h"
#import "NSData+Hummer.h"
#import "UIImage+Hummer.h"
#import "UIImage+HMMetadata.h"
#import "HMImageCoderHelper.h"
#import "HMImageCoderManager.h"
#import <Accelerate/Accelerate.h>
#import <os/lock.h>
#import <libkern/OSAtomic.h>

#if __has_include("webp/decode.h") && __has_include("webp/encode.h") && __has_include("webp/demux.h") && __has_include("webp/mux.h")
#import "webp/decode.h"
#import "webp/encode.h"
#import "webp/demux.h"
#import "webp/mux.h"
#elif __has_include(<libwebp/decode.h>) && __has_include(<libwebp/encode.h>) && __has_include(<libwebp/demux.h>) && __has_include(<libwebp/mux.h>)
#import <libwebp/decode.h>
#import <libwebp/encode.h>
#import <libwebp/demux.h>
#import <libwebp/mux.h>
#else
@import libwebp;
#endif


/// Calculate the actual thumnail pixel size
static CGSize HMCalculateThumbnailSize(CGSize fullSize, BOOL preserveAspectRatio, CGSize thumbnailSize) {
    CGFloat width = fullSize.width;
    CGFloat height = fullSize.height;
    CGFloat resultWidth;
    CGFloat resultHeight;
    
    if (width == 0 || height == 0 || thumbnailSize.width == 0 || thumbnailSize.height == 0 || (width <= thumbnailSize.width && height <= thumbnailSize.height)) {
        // Full Pixel
        resultWidth = width;
        resultHeight = height;
    } else {
        // Thumbnail
        if (preserveAspectRatio) {
            CGFloat pixelRatio = width / height;
            CGFloat thumbnailRatio = thumbnailSize.width / thumbnailSize.height;
            if (pixelRatio > thumbnailRatio) {
                resultWidth = thumbnailSize.width;
                resultHeight = ceil(thumbnailSize.width / pixelRatio);
            } else {
                resultHeight = thumbnailSize.height;
                resultWidth = ceil(thumbnailSize.height * pixelRatio);
            }
        } else {
            resultWidth = thumbnailSize.width;
            resultHeight = thumbnailSize.height;
        }
    }
    
    return CGSizeMake(resultWidth, resultHeight);
}

@interface HMWebPCoderFrame : NSObject

@property (nonatomic, assign) NSUInteger index; // Frame index (zero based)
@property (nonatomic, assign) NSTimeInterval duration; // Frame duration in seconds
@property (nonatomic, assign) NSUInteger width; // Frame width
@property (nonatomic, assign) NSUInteger height; // Frame height
@property (nonatomic, assign) NSUInteger offsetX; // Frame origin.x in canvas (left-bottom based)
@property (nonatomic, assign) NSUInteger offsetY; // Frame origin.y in canvas (left-bottom based)
@property (nonatomic, assign) BOOL hasAlpha; // Whether frame contains alpha
@property (nonatomic, assign) BOOL isFullSize; // Whether frame size is equal to canvas size
@property (nonatomic, assign) BOOL shouldBlend; // Frame dispose method
@property (nonatomic, assign) BOOL shouldDispose; // Frame blend operation
@property (nonatomic, assign) NSUInteger blendFromIndex; // The nearest previous frame index which blend mode is WEBP_MUX_BLEND

@end

@implementation HMWebPCoderFrame
@end

//以下属性在 HMAnimatedImage 下生效，和 HMAnimatedImage 为绑定关系，因此不存在线程安全问题
@implementation HMWebpImageCoder {
    WebPIDecoder *_idec;
    WebPDemuxer *_demux;
    NSData *_imageData;
    CGFloat _scale;
    NSUInteger _loopCount;
    NSUInteger _frameCount;
    NSArray<HMWebPCoderFrame *> *_frames;
    CGContextRef _canvas;
    CGColorSpaceRef _colorSpace;
    BOOL _hasAnimation;
    BOOL _hasAlpha;
    BOOL _finished;
    CGFloat _canvasWidth;
    CGFloat _canvasHeight;
    NSUInteger _currentBlendIndex;
    BOOL _preserveAspectRatio;
    CGSize _thumbnailSize;
}

- (void)dealloc {
    if (_idec) {
        WebPIDelete(_idec);
        _idec = NULL;
    }
    if (_demux) {
        WebPDemuxDelete(_demux);
        _demux = NULL;
    }
    if (_canvas) {
        CGContextRelease(_canvas);
        _canvas = NULL;
    }
    if (_colorSpace) {
        CGColorSpaceRelease(_colorSpace);
        _colorSpace = NULL;
    }
}

+ (instancetype)sharedCoder {
    static HMWebpImageCoder *coder;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        coder = [[HMWebpImageCoder alloc] init];
    });
    return coder;
}

#pragma mark - Decode
- (BOOL)canDecodeImageData:(NSData *)data {
    return ([NSData hm_imageFormatForImageData:data] == HMImageFormatWebP);
}

- (UIImage *)decodedImageWithData:(NSData *)data options:(nullable HMImageCoderOptions *)options {
    if (!data) {
        return nil;
    }
    
    WebPData webpData;
    WebPDataInit(&webpData);
    webpData.bytes = data.bytes;
    webpData.size = data.length;
    WebPDemuxer *demuxer = WebPDemux(&webpData);
    if (!demuxer) {
        return nil;
    }
    
    uint32_t flags = WebPDemuxGetI(demuxer, WEBP_FF_FORMAT_FLAGS);
    BOOL hasAnimation = flags & ANIMATION_FLAG;
    BOOL decodeFirstFrame = [options[HMImageCoderDecodeFirstFrameOnly] boolValue];
    CGFloat scale = 1;
    NSNumber *scaleFactor = options[HMImageCoderDecodeScaleFactor];
    if (scaleFactor != nil) {
        scale = [scaleFactor doubleValue];
        if (scale < 1) {
            scale = 1;
        }
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
    
    // for animated webp image
    WebPIterator iter;
    // libwebp's index start with 1
    if (!WebPDemuxGetFrame(demuxer, 1, &iter)) {
        WebPDemuxReleaseIterator(&iter);
        WebPDemuxDelete(demuxer);
        return nil;
    }
    CGColorSpaceRef colorSpace = [self hm_createColorSpaceWithDemuxer:demuxer];
    int canvasWidth = WebPDemuxGetI(demuxer, WEBP_FF_CANVAS_WIDTH);
    int canvasHeight = WebPDemuxGetI(demuxer, WEBP_FF_CANVAS_HEIGHT);
    // Check whether we need to use thumbnail
    CGSize scaledSize = HMCalculateThumbnailSize(CGSizeMake(canvasWidth, canvasHeight), preserveAspectRatio, thumbnailSize);
    
    if (!hasAnimation || decodeFirstFrame) {
        // first frame for animated webp image
        CGImageRef imageRef = [self hm_createWebpImageWithData:iter.fragment colorSpace:colorSpace scaledSize:scaledSize];
        CGColorSpaceRelease(colorSpace);
        UIImage *firstFrameImage = [[UIImage alloc] initWithCGImage:imageRef scale:scale orientation:UIImageOrientationUp];
        firstFrameImage.hm_imageFormat = HMImageFormatWebP;
        CGImageRelease(imageRef);
        WebPDemuxReleaseIterator(&iter);
        WebPDemuxDelete(demuxer);
        return firstFrameImage;
    }
    
    BOOL hasAlpha = flags & ALPHA_FLAG;
    CGBitmapInfo bitmapInfo = kCGBitmapByteOrder32Host;
    bitmapInfo |= hasAlpha ? kCGImageAlphaPremultipliedFirst : kCGImageAlphaNoneSkipFirst;
    CGContextRef canvas = CGBitmapContextCreate(NULL, canvasWidth, canvasHeight, 8, 0, [HMImageCoderHelper colorSpaceGetDeviceRGB], bitmapInfo);
    if (!canvas) {
        WebPDemuxDelete(demuxer);
        CGColorSpaceRelease(colorSpace);
        return nil;
    }
    
    int loopCount = WebPDemuxGetI(demuxer, WEBP_FF_LOOP_COUNT);
    NSMutableArray<HMImageFrame *> *frames = [NSMutableArray array];
    
    do {
        @autoreleasepool {
            CGImageRef imageRef = [self hm_drawnWebpImageWithCanvas:canvas iterator:iter colorSpace:colorSpace scaledSize:scaledSize];
            if (!imageRef) {
                continue;
            }

            UIImage *image = [[UIImage alloc] initWithCGImage:imageRef scale:scale orientation:UIImageOrientationUp];

            CGImageRelease(imageRef);
            
            NSTimeInterval duration = [self hm_frameDurationWithIterator:iter];
            HMImageFrame *frame = [HMImageFrame frameWithImage:image duration:duration];
            [frames addObject:frame];
        }
        
    } while (WebPDemuxNextFrame(&iter));
    
    WebPDemuxReleaseIterator(&iter);
    WebPDemuxDelete(demuxer);
    CGContextRelease(canvas);
    CGColorSpaceRelease(colorSpace);
    
    UIImage *animatedImage = [HMImageCoderHelper animatedImageWithFrames:frames];
    animatedImage.hm_imageLoopCount = loopCount;
    animatedImage.hm_imageFormat = HMImageFormatWebP;
    
    return animatedImage;
}

- (void)hm_blendWebpImageWithCanvas:(CGContextRef)canvas iterator:(WebPIterator)iter colorSpace:(nonnull CGColorSpaceRef)colorSpaceRef {
    size_t canvasHeight = CGBitmapContextGetHeight(canvas);
    CGFloat tmpX = iter.x_offset;
    CGFloat tmpY = canvasHeight - iter.height - iter.y_offset;
    CGRect imageRect = CGRectMake(tmpX, tmpY, iter.width, iter.height);
    
    if (iter.dispose_method == WEBP_MUX_DISPOSE_BACKGROUND) {
        CGContextClearRect(canvas, imageRect);
    } else {
        CGImageRef imageRef = [self hm_createWebpImageWithData:iter.fragment colorSpace:colorSpaceRef scaledSize:CGSizeZero];
        if (!imageRef) {
            return;
        }
        BOOL shouldBlend = iter.blend_method == WEBP_MUX_BLEND;
        // If not blend, cover the target image rect. (firstly clear then draw)
        if (!shouldBlend) {
            CGContextClearRect(canvas, imageRect);
        }
        CGContextDrawImage(canvas, imageRect, imageRef);
        CGImageRelease(imageRef);
    }
}

- (nullable CGImageRef)hm_drawnWebpImageWithCanvas:(CGContextRef)canvas iterator:(WebPIterator)iter colorSpace:(nonnull CGColorSpaceRef)colorSpaceRef scaledSize:(CGSize)scaledSize CF_RETURNS_RETAINED {
    CGImageRef imageRef = [self hm_createWebpImageWithData:iter.fragment colorSpace:colorSpaceRef scaledSize:CGSizeZero];
    if (!imageRef) {
        return nil;
    }
    
    size_t canvasWidth = CGBitmapContextGetWidth(canvas);
    size_t canvasHeight = CGBitmapContextGetHeight(canvas);
    CGFloat tmpX = iter.x_offset;
    CGFloat tmpY = canvasHeight - iter.height - iter.y_offset;
    CGRect imageRect = CGRectMake(tmpX, tmpY, iter.width, iter.height);
    
    BOOL shouldBlend = iter.blend_method == WEBP_MUX_BLEND;
    
    // If not blend, cover the target image rect. (firstly clear then draw)
    if (!shouldBlend) {
        CGContextClearRect(canvas, imageRect);
    }
    CGContextDrawImage(canvas, imageRect, imageRef);
    CGImageRef newImageRef = CGBitmapContextCreateImage(canvas);
    
    CGImageRelease(imageRef);

    if (iter.dispose_method == WEBP_MUX_DISPOSE_BACKGROUND) {
        CGContextClearRect(canvas, imageRect);
    }
    
    // Check whether we need to use thumbnail
    if (!CGSizeEqualToSize(CGSizeMake(canvasWidth, canvasHeight), scaledSize)) {
        // Important: For Animated WebP thumbnail generation, we can not just use a scaled small canvas and draw each thumbnail frame
        // This works **On Theory**. However, image scale down loss details. Animated WebP use the partial pixels with blend mode / dispose method with offset, to cover previous canvas status
        // Because of this reason, even each frame contains small zigzag, the final animation contains visible glitch, this is not we want.
        // So, always create the full pixels canvas (even though this consume more RAM), after drawn on the canvas, re-scale again with the final size
        CGImageRef scaledImageRef = [HMImageCoderHelper CGImageCreateScaled:newImageRef size:scaledSize];
        CGImageRelease(newImageRef);
        newImageRef = scaledImageRef;
    }
    
    return newImageRef;
}

- (nullable CGImageRef)hm_createWebpImageWithData:(WebPData)webpData colorSpace:(nonnull CGColorSpaceRef)colorSpaceRef scaledSize:(CGSize)scaledSize CF_RETURNS_RETAINED {
    WebPDecoderConfig config;
    if (!WebPInitDecoderConfig(&config)) {
        return nil;
    }
    
    if (WebPGetFeatures(webpData.bytes, webpData.size, &config.input) != VP8_STATUS_OK) {
        return nil;
    }
    
    BOOL hasAlpha = config.input.has_alpha;
    // iOS prefer BGRA8888 (premultiplied) or BGRX8888 bitmapInfo for screen rendering, which is same as `UIGraphicsBeginImageContext()` or `- [CALayer drawInContext:]`
    // use this bitmapInfo, combined with right colorspace, even without decode, can still avoid extra CA::Render::copy_image(which marked `Color Copied Images` from Instruments)
    CGBitmapInfo bitmapInfo = kCGBitmapByteOrder32Host;
    bitmapInfo |= hasAlpha ? kCGImageAlphaPremultipliedFirst : kCGImageAlphaNoneSkipFirst;
    config.options.use_threads = 1;
    config.output.colorspace = MODE_bgrA;
    
    // Use scaling for thumbnail
    if (scaledSize.width != 0 && scaledSize.height != 0) {
        config.options.use_scaling = 1;
        config.options.scaled_width = scaledSize.width;
        config.options.scaled_height = scaledSize.height;
    }
    
    // Decode the WebP image data into a RGBA value array
    if (WebPDecode(webpData.bytes, webpData.size, &config) != VP8_STATUS_OK) {
        return nil;
    }
    
    // Construct a UIImage from the decoded RGBA value array
    CGDataProviderRef provider =
    CGDataProviderCreateWithData(NULL, config.output.u.RGBA.rgba, config.output.u.RGBA.size, FreeImageData);
    size_t bitsPerComponent = 8;
    size_t bitsPerPixel = 32;
    size_t bytesPerRow = config.output.u.RGBA.stride;
    size_t width = config.output.width;
    size_t height = config.output.height;
    CGColorRenderingIntent renderingIntent = kCGRenderingIntentDefault;
    CGImageRef imageRef = CGImageCreate(width, height, bitsPerComponent, bitsPerPixel, bytesPerRow, colorSpaceRef, bitmapInfo, provider, NULL, NO, renderingIntent);
    
    CGDataProviderRelease(provider);
    
    return imageRef;
}

- (NSTimeInterval)hm_frameDurationWithIterator:(WebPIterator)iter {
    int duration = iter.duration;
    if (duration <= 10) {
        // WebP standard says 0 duration is used for canvas updating but not showing image, but actually Chrome and other implementations set it to 100ms if duration is lower or equal than 10ms
        // Some animated WebP images also created without duration, we should keep compatibility
        duration = 100;
    }
    return duration / 1000.0;
}

// Create and return the correct colorspace by checking the ICC Profile
- (nonnull CGColorSpaceRef)hm_createColorSpaceWithDemuxer:(nonnull WebPDemuxer *)demuxer CF_RETURNS_RETAINED {
    // WebP contains ICC Profile should use the desired colorspace, instead of default device colorspace
    // See: https://developers.google.com/speed/webp/docs/riff_container#color_profile
    
    CGColorSpaceRef colorSpaceRef = NULL;
    uint32_t flags = WebPDemuxGetI(demuxer, WEBP_FF_FORMAT_FLAGS);
    
    if (flags & ICCP_FLAG) {
        WebPChunkIterator chunk_iter;
        int result = WebPDemuxGetChunk(demuxer, "ICCP", 1, &chunk_iter);
        if (result) {
            // See #2618, the `CGColorSpaceCreateWithICCProfile` does not copy ICC Profile data, it only retain `CFDataRef`.
            // When the libwebp `WebPDemuxer` dealloc, all chunks will be freed. So we must copy the ICC data (really cheap, less than 10KB)
            NSData *profileData = [NSData dataWithBytes:chunk_iter.chunk.bytes length:chunk_iter.chunk.size];
            if (@available(iOS 10, tvOS 10, macOS 10.12, watchOS 3, *)) {
                colorSpaceRef = CGColorSpaceCreateWithICCData((__bridge CFDataRef)profileData);
            } else {
                colorSpaceRef = CGColorSpaceCreateWithICCProfile((__bridge CFDataRef)profileData);
            }
            WebPDemuxReleaseChunkIterator(&chunk_iter);
            if (colorSpaceRef) {
                // We use RGB color model to decode WebP images currently, so we must filter out other colorSpace
                CGColorSpaceModel model = CGColorSpaceGetModel(colorSpaceRef);
                if (model != kCGColorSpaceModelRGB) {
                    CGColorSpaceRelease(colorSpaceRef);
                    colorSpaceRef = NULL;
                }
            }
        }
    }
    
    if (!colorSpaceRef) {
        colorSpaceRef = [HMImageCoderHelper colorSpaceGetDeviceRGB];
        CGColorSpaceRetain(colorSpaceRef);
    }
    
    return colorSpaceRef;
}

#pragma mark - Encode
- (BOOL)canEncodeToFormat:(HMImageFormat)format {
    return (format == HMImageFormatWebP);
}

- (NSData *)encodedDataWithImage:(UIImage *)image format:(HMImageFormat)format options:(nullable HMImageCoderOptions *)options {
    if (!image) {
        return nil;
    }
    
    NSData *data;
    
    double compressionQuality = 1;
    if (options[HMImageCoderEncodeCompressionQuality]) {
        compressionQuality = [options[HMImageCoderEncodeCompressionQuality] doubleValue];
    }
    CGSize maxPixelSize = CGSizeZero;
    NSValue *maxPixelSizeValue = options[HMImageCoderEncodeMaxPixelSize];
    if (maxPixelSizeValue != nil) {


        maxPixelSize = maxPixelSizeValue.CGSizeValue;
    }
    NSUInteger maxFileSize = 0;
    if (options[HMImageCoderEncodeMaxFileSize]) {
        maxFileSize = [options[HMImageCoderEncodeMaxFileSize] unsignedIntegerValue];
    }
    NSArray<HMImageFrame *> *frames = [HMImageCoderHelper framesFromAnimatedImage:image];
    
    BOOL encodeFirstFrame = [options[HMImageCoderEncodeFirstFrameOnly] boolValue];
    if (encodeFirstFrame || frames.count == 0) {
        // for static single webp image
        data = [self hm_encodedWebpDataWithImage:image.CGImage
                                         quality:compressionQuality
                                    maxPixelSize:maxPixelSize
                                     maxFileSize:maxFileSize
                                         options:options];
    } else {
        // for animated webp image
        WebPMux *mux = WebPMuxNew();
        if (!mux) {
            return nil;
        }
        for (size_t i = 0; i < frames.count; i++) {
            HMImageFrame *currentFrame = frames[i];
            NSData *webpData = [self hm_encodedWebpDataWithImage:currentFrame.image.CGImage
                                                         quality:compressionQuality
                                                    maxPixelSize:maxPixelSize
                                                     maxFileSize:maxFileSize
                                                         options:options];
            int duration = currentFrame.duration * 1000;
            WebPMuxFrameInfo frame = { .bitstream.bytes = webpData.bytes,
                .bitstream.size = webpData.length,
                .duration = duration,
                .id = WEBP_CHUNK_ANMF,
                .dispose_method = WEBP_MUX_DISPOSE_BACKGROUND, // each frame will clear canvas
                .blend_method = WEBP_MUX_NO_BLEND
            };
            if (WebPMuxPushFrame(mux, &frame, 0) != WEBP_MUX_OK) {
                WebPMuxDelete(mux);
                return nil;
            }
        }
        
        int loopCount = (int)image.hm_imageLoopCount;
        WebPMuxAnimParams params = { .bgcolor = 0,
            .loop_count = loopCount
        };
        if (WebPMuxSetAnimationParams(mux, &params) != WEBP_MUX_OK) {
            WebPMuxDelete(mux);
            return nil;
        }
        
        WebPData outputData;
        WebPMuxError error = WebPMuxAssemble(mux, &outputData);
        WebPMuxDelete(mux);
        if (error != WEBP_MUX_OK) {
            return nil;
        }
        data = [NSData dataWithBytes:outputData.bytes length:outputData.size];
        WebPDataClear(&outputData);
    }
    
    return data;
}

- (BOOL)canDecodeFromData:(nullable NSData *)data {
    return ([NSData hm_imageFormatForImageData:data] == HMImageFormatWebP);
}

// 暂时不需要
- (nullable NSData *)hm_encodedWebpDataWithImage:(nullable CGImageRef)imageRef
                                         quality:(double)quality
                                    maxPixelSize:(CGSize)maxPixelSize
                                     maxFileSize:(NSUInteger)maxFileSize
                                         options:(nullable HMImageCoderOptions *)options
{
    NSData *webpData;
    if (!imageRef) {
        return nil;
    }
    
    size_t width = CGImageGetWidth(imageRef);
    size_t height = CGImageGetHeight(imageRef);
    if (width == 0 || width > WEBP_MAX_DIMENSION) {
        return nil;
    }
    if (height == 0 || height > WEBP_MAX_DIMENSION) {
        return nil;
    }
    
    size_t bytesPerRow = CGImageGetBytesPerRow(imageRef);
    CGBitmapInfo bitmapInfo = CGImageGetBitmapInfo(imageRef);
    CGImageAlphaInfo alphaInfo = bitmapInfo & kCGBitmapAlphaInfoMask;
    CGBitmapInfo byteOrderInfo = bitmapInfo & kCGBitmapByteOrderMask;
    BOOL hasAlpha = !(alphaInfo == kCGImageAlphaNone ||
                      alphaInfo == kCGImageAlphaNoneSkipFirst ||
                      alphaInfo == kCGImageAlphaNoneSkipLast);
    BOOL byteOrderNormal = NO;
    switch (byteOrderInfo) {
        case kCGBitmapByteOrderDefault: {
            byteOrderNormal = YES;
        } break;
        case kCGBitmapByteOrder32Little: {
        } break;
        case kCGBitmapByteOrder32Big: {
            byteOrderNormal = YES;
        } break;
        default: break;
    }
    // If we can not get bitmap buffer, early return
    CGDataProviderRef dataProvider = CGImageGetDataProvider(imageRef);
    if (!dataProvider) {
        return nil;
    }
    CFDataRef dataRef = CGDataProviderCopyData(dataProvider);
    if (!dataRef) {
        return nil;
    }
    
    uint8_t *rgba = NULL; // RGBA Buffer managed by CFData, don't call `free` on it, instead call `CFRelease` on `dataRef`
    // We could not assume that input CGImage's color mode is always RGB888/RGBA8888. Convert all other cases to target color mode using vImage
    if (byteOrderNormal && ((alphaInfo == kCGImageAlphaNone) || (alphaInfo == kCGImageAlphaLast))) {
        // If the input CGImage is already RGB888/RGBA8888
        rgba = (uint8_t *)CFDataGetBytePtr(dataRef);
    } else {
        // Convert all other cases to target color mode using vImage
        vImageConverterRef convertor = NULL;
        vImage_Error error = kvImageNoError;
        
        vImage_CGImageFormat srcFormat = {
            .bitsPerComponent = (uint32_t)CGImageGetBitsPerComponent(imageRef),
            .bitsPerPixel = (uint32_t)CGImageGetBitsPerPixel(imageRef),
            .colorSpace = CGImageGetColorSpace(imageRef),
            .bitmapInfo = bitmapInfo
        };
        vImage_CGImageFormat destFormat = {
            .bitsPerComponent = 8,
            .bitsPerPixel = hasAlpha ? 32 : 24,
            .colorSpace = [HMImageCoderHelper colorSpaceGetDeviceRGB],
            .bitmapInfo = hasAlpha ? kCGImageAlphaLast | kCGBitmapByteOrderDefault : kCGImageAlphaNone | kCGBitmapByteOrderDefault // RGB888/RGBA8888 (Non-premultiplied to works for libwebp)
        };
        
        convertor = vImageConverter_CreateWithCGImageFormat(&srcFormat, &destFormat, NULL, kvImageNoFlags, &error);
        if (error != kvImageNoError) {
            CFRelease(dataRef);
            return nil;
        }
        
        vImage_Buffer src = {
            .data = (uint8_t *)CFDataGetBytePtr(dataRef),
            .width = width,
            .height = height,
            .rowBytes = bytesPerRow
        };
        vImage_Buffer dest;
        
        error = vImageBuffer_Init(&dest, height, width, destFormat.bitsPerPixel, kvImageNoFlags);
        if (error != kvImageNoError) {
            vImageConverter_Release(convertor);
            CFRelease(dataRef);
            return nil;
        }
        
        // Convert input color mode to RGB888/RGBA8888
        error = vImageConvert_AnyToAny(convertor, &src, &dest, NULL, kvImageNoFlags);
        vImageConverter_Release(convertor);
        if (error != kvImageNoError) {
            CFRelease(dataRef);
            return nil;
        }
        
        rgba = dest.data; // Converted buffer
        bytesPerRow = dest.rowBytes; // Converted bytePerRow
        CFRelease(dataRef); // Use CFData to manage bytes for free, the same code path for error handling
        dataRef = CFDataCreateWithBytesNoCopy(kCFAllocatorDefault, rgba, bytesPerRow * height, kCFAllocatorDefault);
    }
    
    float qualityFactor = quality * 100; // WebP quality is 0-100
    // Encode RGB888/RGBA8888 buffer to WebP data
    // Using the libwebp advanced API: https://developers.google.com/speed/webp/docs/api#advanced_encoding_api
    WebPConfig config;
    WebPPicture picture;
    WebPMemoryWriter writer;
    
    if (!WebPConfigPreset(&config, WEBP_PRESET_DEFAULT, qualityFactor) ||
        !WebPPictureInit(&picture)) {
        // shouldn't happen, except if system installation is broken
        CFRelease(dataRef);
        return nil;
    }

    [self updateWebPOptionsToConfig:&config maxFileSize:maxFileSize options:options];
    picture.use_argb = 0; // Lossy encoding use YUV for internel bitstream
    picture.width = (int)width;
    picture.height = (int)height;
    picture.writer = WebPMemoryWrite; // Output in memory data buffer
    picture.custom_ptr = &writer;
    WebPMemoryWriterInit(&writer);
    
    int result;
    if (hasAlpha) {
        result = WebPPictureImportRGBA(&picture, rgba, (int)bytesPerRow);
    } else {
        result = WebPPictureImportRGB(&picture, rgba, (int)bytesPerRow);
    }
    if (!result) {
        WebPMemoryWriterClear(&writer);
        CFRelease(dataRef);
        return nil;
    }
    
    // Check if need to scale pixel size
    if (maxPixelSize.width > 0 && maxPixelSize.height > 0 && width > maxPixelSize.width && height > maxPixelSize.height) {
        CGSize scaledSize = HMCalculateThumbnailSize(CGSizeMake(width, height), YES, maxPixelSize);
        result = WebPPictureRescale(&picture, scaledSize.width, scaledSize.height);
        if (!result) {
            WebPMemoryWriterClear(&writer);
            WebPPictureFree(&picture);
            CFRelease(dataRef);
            return nil;
        }
    }
    
    result = WebPEncode(&config, &picture);
    WebPPictureFree(&picture);
    CFRelease(dataRef); // Free bitmap buffer
    
    if (result) {
        // success
        webpData = [NSData dataWithBytes:writer.mem length:writer.size];
    } else {
        // failed
        webpData = nil;
    }
    WebPMemoryWriterClear(&writer);
    
    return webpData;
}

- (void) updateWebPOptionsToConfig:(WebPConfig * _Nonnull)config
                       maxFileSize:(NSUInteger)maxFileSize
                           options:(nullable HMImageCoderOptions *)options {

    config->target_size = (int)maxFileSize; // Max filesize for output, 0 means use quality instead
    config->pass = maxFileSize > 0 ? 6 : 1; // Use 6 passes for file size limited encoding, which is the default value of `cwebp` command line
    config->lossless = 0; // Disable lossless encoding (If we need, can add new Encoding Options in future version)

    if ([options[HMImageCoderEncodeWebPMethod] intValue]) {
        config->method = [options[HMImageCoderEncodeWebPMethod] intValue];
    }
    if ([options[HMImageCoderEncodeWebPPass] intValue]) {
        config->pass = [options[HMImageCoderEncodeWebPPass] intValue];
    }
    if ([options[HMImageCoderEncodeWebPPreprocessing] intValue]) {
        config->preprocessing = [options[HMImageCoderEncodeWebPPreprocessing] intValue];
    }
    if ([options[HMImageCoderEncodeWebPThreadLevel] intValue]) {
        config->thread_level = [options[HMImageCoderEncodeWebPThreadLevel] intValue];
    } else {
        config->thread_level = 1;
    }
    if ([options[HMImageCoderEncodeWebPLowMemory] intValue]) {
        config->low_memory = [options[HMImageCoderEncodeWebPLowMemory] intValue];
    }

    if ([options[HMImageCoderEncodeWebPTargetPSNR] floatValue]) {
        config->target_PSNR = [options[HMImageCoderEncodeWebPTargetPSNR] floatValue];
    }

    if ([options[HMImageCoderEncodeWebPSegments] intValue]) {
        config->segments = [options[HMImageCoderEncodeWebPSegments] intValue];
    }

    if ([options[HMImageCoderEncodeWebPSnsStrength] intValue]) {
        config->sns_strength = [options[HMImageCoderEncodeWebPSnsStrength] intValue];
    }

    if ([options[HMImageCoderEncodeWebPFilterStrength] intValue]) {
        config->filter_strength = [options[HMImageCoderEncodeWebPFilterStrength] intValue];
    }

    if ([options[HMImageCoderEncodeWebPFilterSharpness] intValue]) {
        config->filter_sharpness = [options[HMImageCoderEncodeWebPFilterSharpness] intValue];
    }

    if ([options[HMImageCoderEncodeWebPFilterType] intValue]) {
        config->filter_type = [options[HMImageCoderEncodeWebPFilterType] intValue];
    }

    if ([options[HMImageCoderEncodeWebPAutofilter] intValue]) {
        config->autofilter = [options[HMImageCoderEncodeWebPAutofilter] intValue];
    }

    if ([options[HMImageCoderEncodeWebPAlphaCompression] intValue]) {
        config->alpha_compression = [options[HMImageCoderEncodeWebPAlphaCompression] intValue];
    }

    if ([options[HMImageCoderEncodeWebPAlphaFiltering] intValue]) {
        config->alpha_filtering = [options[HMImageCoderEncodeWebPAlphaFiltering] intValue];
    }

    if ([options[HMImageCoderEncodeWebPAlphaQuality] intValue]) {
        config->alpha_quality = [options[HMImageCoderEncodeWebPAlphaQuality] intValue];
    }

    if ([options[HMImageCoderEncodeWebPShowCompressed] intValue]) {
        config->show_compressed = [options[HMImageCoderEncodeWebPShowCompressed] intValue];
    }

    if ([options[HMImageCoderEncodeWebPPartitions] intValue]) {
        config->partitions = [options[HMImageCoderEncodeWebPPartitions] intValue];
    }

    if ([options[HMImageCoderEncodeWebPPartitionLimit] intValue]) {
        config->partition_limit = [options[HMImageCoderEncodeWebPPartitionLimit] intValue];
    }

    if ([options[HMImageCoderEncodeWebPUseSharpYuv] intValue]) {
        config->use_sharp_yuv = [options[HMImageCoderEncodeWebPUseSharpYuv] intValue];
    }
}

static void FreeImageData(void *info, const void *data, size_t size) {
    free((void *)data);
}


#pragma mark - HMAnimatedImageCoder

- (instancetype)initWithAnimatedImageData:(NSData *)data options:(nullable HMImageCoderOptions *)options {
    if (!data) {
        return nil;
    }
    if (self) {
        WebPData webpData;
        WebPDataInit(&webpData);
        webpData.bytes = data.bytes;
        webpData.size = data.length;
        WebPDemuxer *demuxer = WebPDemux(&webpData);
        if (!demuxer) {
            return nil;
        }
        BOOL framesValid = [self scanAndCheckFramesValidWithDemuxer:demuxer];
        if (!framesValid) {
            WebPDemuxDelete(demuxer);
            return nil;
        }
        CGFloat scale = 1;
        NSNumber *scaleFactor = options[HMImageCoderDecodeScaleFactor];
        if (scaleFactor != nil) {
            scale = [scaleFactor doubleValue];
            if (scale < 1) {
                scale = 1;
            }
        }
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
        _scale = scale;
        _demux = demuxer;
        _imageData = data;
        _currentBlendIndex = NSNotFound;
    }
    return self;
}

- (BOOL)scanAndCheckFramesValidWithDemuxer:(WebPDemuxer *)demuxer {
    if (!demuxer) {
        return NO;
    }
    WebPIterator iter;
    if (!WebPDemuxGetFrame(demuxer, 1, &iter)) {
        WebPDemuxReleaseIterator(&iter);
        return NO;
    }
    
    uint32_t iterIndex = 0;
    uint32_t lastBlendIndex = 0;
    uint32_t flags = WebPDemuxGetI(demuxer, WEBP_FF_FORMAT_FLAGS);
    BOOL hasAnimation = flags & ANIMATION_FLAG;
    BOOL hasAlpha = flags & ALPHA_FLAG;
    int canvasWidth = WebPDemuxGetI(demuxer, WEBP_FF_CANVAS_WIDTH);
    int canvasHeight = WebPDemuxGetI(demuxer, WEBP_FF_CANVAS_HEIGHT);
    uint32_t frameCount = WebPDemuxGetI(demuxer, WEBP_FF_FRAME_COUNT);
    uint32_t loopCount = WebPDemuxGetI(demuxer, WEBP_FF_LOOP_COUNT);
    NSMutableArray<HMWebPCoderFrame *> *frames = [NSMutableArray array];
    
    _hasAnimation = hasAnimation;
    _hasAlpha = hasAlpha;
    _canvasWidth = canvasWidth;
    _canvasHeight = canvasHeight;
    _frameCount = frameCount;
    _loopCount = loopCount;
    
    // If static WebP, does not need to parse the frame blend index
    if (frameCount <= 1) {
        return YES;
    }
    
    // We should loop all the frames and scan each frames' blendFromIndex for later decoding, this can also ensure all frames is valid
    do {
        if (!iter.complete) {
            // Skip partial frame
            continue;
        }
        HMWebPCoderFrame *frame = [[HMWebPCoderFrame alloc] init];
        frame.index = iterIndex;
        frame.duration = [self hm_frameDurationWithIterator:iter];
        frame.width = iter.width;
        frame.height = iter.height;
        frame.hasAlpha = iter.has_alpha;
        frame.shouldDispose = iter.dispose_method == WEBP_MUX_DISPOSE_BACKGROUND;
        frame.shouldBlend = iter.blend_method == WEBP_MUX_BLEND;
        frame.offsetX = iter.x_offset;
        frame.offsetY = canvasHeight - iter.y_offset - iter.height;

        BOOL sizeEqualsToCanvas = (iter.width == canvasWidth && iter.height == canvasHeight);
        BOOL offsetIsZero = (iter.x_offset == 0 && iter.y_offset == 0);
        frame.isFullSize = (sizeEqualsToCanvas && offsetIsZero);
        
        if ((!frame.shouldBlend || !frame.hasAlpha) && frame.isFullSize) {
            lastBlendIndex = iterIndex;
            frame.blendFromIndex = iterIndex;
        } else {
            if (frame.shouldDispose && frame.isFullSize) {
                frame.blendFromIndex = lastBlendIndex;
                lastBlendIndex = iterIndex + 1;
            } else {
                frame.blendFromIndex = lastBlendIndex;
            }
        }
        iterIndex++;
        [frames addObject:frame];
    } while (WebPDemuxNextFrame(&iter));
    WebPDemuxReleaseIterator(&iter);
    
    if (frames.count != frameCount) {
        return NO;
    }
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
    if (_frameCount <= 1) {
        return 0;
    }
    return _frames[index].duration;
}

- (UIImage *)animatedImageFrameAtIndex:(NSUInteger)index {
    UIImage *image;
    if (index >= _frameCount) {
        return nil;
    }
    if (_frameCount <= 1) {
        image = [self safeStaticImageFrame];
    } else {
        image = [self safeAnimatedImageFrameAtIndex:index];
    }
    return image;
}

- (UIImage *)safeStaticImageFrame {
    UIImage *image;
    // Static WebP image
    WebPIterator iter;
    if (!WebPDemuxGetFrame(_demux, 1, &iter)) {
        WebPDemuxReleaseIterator(&iter);
        return nil;
    }
    if (!_colorSpace) {
        _colorSpace = [self hm_createColorSpaceWithDemuxer:_demux];
    }
    // Check whether we need to use thumbnail
    CGImageRef imageRef;
    if (_hasAnimation) {
        // If have animation, we still need to allocate a CGContext, because the poster frame may be smaller than canvas
        if (!_canvas) {
            CGBitmapInfo bitmapInfo = kCGBitmapByteOrder32Host;
            bitmapInfo |= _hasAlpha ? kCGImageAlphaPremultipliedFirst : kCGImageAlphaNoneSkipFirst;
            CGContextRef canvas = CGBitmapContextCreate(NULL, _canvasWidth, _canvasHeight, 8, 0, [HMImageCoderHelper colorSpaceGetDeviceRGB], bitmapInfo);
            if (!canvas) {
                return nil;
            }
            _canvas = canvas;
        }
        CGSize scaledSize = HMCalculateThumbnailSize(CGSizeMake(_canvasWidth, _canvasHeight), _preserveAspectRatio, _thumbnailSize);
        imageRef = [self hm_drawnWebpImageWithCanvas:_canvas iterator:iter colorSpace:_colorSpace scaledSize:scaledSize];
    } else {
        CGSize scaledSize = HMCalculateThumbnailSize(CGSizeMake(iter.width, iter.height), _preserveAspectRatio, _thumbnailSize);
        imageRef = [self hm_createWebpImageWithData:iter.fragment colorSpace:_colorSpace scaledSize:scaledSize];
    }
    if (!imageRef) {
        return nil;
    }
    image = [[UIImage alloc] initWithCGImage:imageRef scale:_scale orientation:UIImageOrientationUp];
    CGImageRelease(imageRef);
    WebPDemuxReleaseIterator(&iter);
    return image;
}

- (UIImage *)safeAnimatedImageFrameAtIndex:(NSUInteger)index {
    if (!_canvas) {
        CGBitmapInfo bitmapInfo = kCGBitmapByteOrder32Host;
        bitmapInfo |= _hasAlpha ? kCGImageAlphaPremultipliedFirst : kCGImageAlphaNoneSkipFirst;
        CGContextRef canvas = CGBitmapContextCreate(NULL, _canvasWidth, _canvasHeight, 8, 0, [HMImageCoderHelper colorSpaceGetDeviceRGB], bitmapInfo);
        if (!canvas) {
            return nil;
        }
        _canvas = canvas;
    }
    if (!_colorSpace) {
        _colorSpace = [self hm_createColorSpaceWithDemuxer:_demux];
    }
    
    HMWebPCoderFrame *frame = _frames[index];
    UIImage *image;
    WebPIterator iter;
    
    // Because Animated WebP supports dispose method, which means frames can based on previous canvas context. However, if we clear canvas and loop from the 0 index until the request index, it's harm for performance.
    // But when one frame's dispose method is `WEBP_MUX_DISPOSE_BACKGROUND`, the canvas is cleared after the frame decoded. And subsequent frames are not effected by that frame.
    // So, we calculate each frame's `blendFromIndex`. Then directly draw canvas from that index, instead of always from 0 index.
    
    if (_currentBlendIndex != NSNotFound && _currentBlendIndex + 1 == index) {
        // If the request index is subsequence of current blend index, it does not matter what dispose method is. The canvas is always ready.
        // libwebp's index start with 1
        if (!WebPDemuxGetFrame(_demux, (int)(index + 1), &iter)) {
            WebPDemuxReleaseIterator(&iter);
            return nil;
        }
    } else {
        // Else, this can happen when one image set to different imageViews or one loop end. So we should clear the canvas. Then draw until the canvas is ready.
        if (_currentBlendIndex != NSNotFound) {
            CGContextClearRect(_canvas, CGRectMake(0, 0, _canvasWidth, _canvasHeight));
        }
        
        // Then, loop from the blend from index, draw each of previous frames on the canvas.
        // We use do while loop to call `WebPDemuxNextFrame`(fast), until the endIndex meet.
        size_t startIndex = frame.blendFromIndex;
        size_t endIndex = frame.index;
        // libwebp's index start with 1
        if (!WebPDemuxGetFrame(_demux, (int)(startIndex + 1), &iter)) {
            WebPDemuxReleaseIterator(&iter);
            return nil;
        }
        // Draw from range: [startIndex, endIndex)
        if (endIndex > startIndex) {
            do {
                @autoreleasepool {
                    [self hm_blendWebpImageWithCanvas:_canvas iterator:iter colorSpace:_colorSpace];
                }
            } while ((size_t)iter.frame_num < endIndex && WebPDemuxNextFrame(&iter));
        }
        // libwebp's index start with 1
        if (!WebPDemuxGetFrame(_demux, (int)(index + 1), &iter)) {
            WebPDemuxReleaseIterator(&iter);
            return nil;
        }
    }
    _currentBlendIndex = index;
    
    // Now the canvas is ready, which respects of dispose method behavior. Just do normal decoding and produce image.
    // Check whether we need to use thumbnail
    CGSize scaledSize = HMCalculateThumbnailSize(CGSizeMake(_canvasWidth, _canvasHeight), _preserveAspectRatio, _thumbnailSize);
    CGImageRef imageRef = [self hm_drawnWebpImageWithCanvas:_canvas iterator:iter colorSpace:_colorSpace scaledSize:scaledSize];
    if (!imageRef) {
        return nil;
    }
    image = [[UIImage alloc] initWithCGImage:imageRef scale:_scale orientation:UIImageOrientationUp];
    CGImageRelease(imageRef);
    WebPDemuxReleaseIterator(&iter);
    return image;
}

@end
