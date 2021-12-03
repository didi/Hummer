//
//  HMIOImageCoder.m
//  Hummer
//
//  Created by didi on 2021/9/3.
//

#import "HMImageIOCoder.h"
#import "UIImage+Hummer.h"
#import "HMImageCoderHelper.h"
#import <ImageIO/ImageIO.h>
#import "UIImage+HMMetadata.h"
#import "NSData+Hummer.h"
#import "HMImageIOAnimatedCoder+Internal.h"


// Specify File Size for lossy format encoding, like JPEG
static NSString * kHMCGImageDestinationRequestedFileSize = @"kCGImageDestinationRequestedFileSize";

@implementation HMImageIOCoder {
    size_t _width, _height;
    CGImagePropertyOrientation _orientation;
    CGImageSourceRef _imageSource;
    CGFloat _scale;
    BOOL _finished;
    BOOL _preserveAspectRatio;
    CGSize _thumbnailSize;
}

- (void)dealloc {
    if (_imageSource) {
        CFRelease(_imageSource);
        _imageSource = NULL;
    }
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIApplicationDidReceiveMemoryWarningNotification object:nil];
}

- (void)didReceiveMemoryWarning:(NSNotification *)notification
{
    if (_imageSource) {
        CGImageSourceRemoveCacheAtIndex(_imageSource, 0);
    }
}

#pragma mark - Decode
- (BOOL)canDecodeFromData:(nullable NSData *)data {
    return YES;
}

- (UIImage *)decodedImageWithData:(NSData *)data options:(nullable HMImageCoderOptions *)options {
    if (!data) {
        return nil;
    }
//    return [UIImage hm_decodeImageWithData:data size:CGSizeZero scale:0 resizeMode:0];
    CGFloat scale = 1;
    NSNumber *scaleFactor = options[HMImageCoderDecodeScaleFactor];
    if (scaleFactor != nil) {
        scale = MAX([scaleFactor doubleValue], 1) ;
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
    
    UIImage *image = [HMImageIOAnimatedCoder createFrameAtIndex:0 source:source scale:scale preserveAspectRatio:preserveAspectRatio thumbnailSize:thumbnailSize options:nil];
    CFRelease(source);
    if (!image) {
        return nil;
    }
    
    image.hm_imageFormat = [NSData hm_imageFormatForImageData:data];
    return image;
}

#pragma mark - Encode
- (BOOL)canEncodeToFormat:(HMImageFormat)format {
    return YES;
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
    
    if (format == HMImageFormatUndefined) {
        BOOL hasAlpha = [HMImageCoderHelper CGImageContainsAlpha:imageRef];
        if (hasAlpha) {
            format = HMImageFormatPNG;
        } else {
            format = HMImageFormatJPEG;
        }
    }
    
    NSMutableData *imageData = [NSMutableData data];
    CFStringRef imageUTType = [NSData hm_UTTypeFromImageFormat:format];
    
    // Create an image destination.
    CGImageDestinationRef imageDestination = CGImageDestinationCreateWithData((__bridge CFMutableDataRef)imageData, imageUTType, 1, NULL);
    if (!imageDestination) {
        // Handle failure.
        return nil;
    }
    
    NSMutableDictionary *properties = [NSMutableDictionary dictionary];
    CGImagePropertyOrientation exifOrientation = [HMImageCoderHelper exifOrientationFromImageOrientation:image.imageOrientation];
    properties[(__bridge NSString *)kCGImagePropertyOrientation] = @(exifOrientation);
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
    if (maxPixelSize.width > 0 && maxPixelSize.height > 0 && pixelWidth > maxPixelSize.width && pixelHeight > maxPixelSize.height) {
        CGFloat pixelRatio = pixelWidth / pixelHeight;
        CGFloat maxPixelSizeRatio = maxPixelSize.width / maxPixelSize.height;
        CGFloat finalPixelSize;
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
    
    // Add your image to the destination.
    CGImageDestinationAddImage(imageDestination, imageRef, (__bridge CFDictionaryRef)properties);
    
    // Finalize the destination.
    if (CGImageDestinationFinalize(imageDestination) == NO) {
        // Handle failure.
        imageData = nil;
    }
    
    CFRelease(imageDestination);
    
    return [imageData copy];
}

@end
