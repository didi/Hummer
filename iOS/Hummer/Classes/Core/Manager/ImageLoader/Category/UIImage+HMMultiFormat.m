//
//  UIImage+HMMultiFormat.m
//  Hummer
//
//  Created by didi on 2021/9/7.
//

#import "UIImage+HMMultiFormat.h"
#import "HMImageCoderManager.h"

@implementation UIImage (HMMultiFormat)

+ (nullable UIImage *)hm_imageWithData:(nullable NSData *)data {
    return [self hm_imageWithData:data scale:1];
}

+ (nullable UIImage *)hm_imageWithData:(nullable NSData *)data scale:(CGFloat)scale {
    return [self hm_imageWithData:data scale:scale firstFrameOnly:NO];
}

+ (nullable UIImage *)hm_imageWithData:(nullable NSData *)data scale:(CGFloat)scale firstFrameOnly:(BOOL)firstFrameOnly {
    if (!data) {
        return nil;
    }
    HMImageCoderOptions *options = @{HMImageCoderDecodeScaleFactor : @(MAX(scale, 1)), HMImageCoderDecodeFirstFrameOnly : @(firstFrameOnly)};
    return [[HMImageCoderManager sharedManager] decodedImageWithData:data options:options];
}

- (nullable NSData *)hm_imageData {
    return [self hm_imageDataAsFormat:HMImageFormatUndefined];
}

- (nullable NSData *)hm_imageDataAsFormat:(HMImageFormat)imageFormat {
    return [self hm_imageDataAsFormat:imageFormat compressionQuality:1];
}

- (nullable NSData *)hm_imageDataAsFormat:(HMImageFormat)imageFormat compressionQuality:(double)compressionQuality {
    return [self hm_imageDataAsFormat:imageFormat compressionQuality:compressionQuality firstFrameOnly:NO];
}

- (nullable NSData *)hm_imageDataAsFormat:(HMImageFormat)imageFormat compressionQuality:(double)compressionQuality firstFrameOnly:(BOOL)firstFrameOnly {
    HMImageCoderOptions *options = @{HMImageCoderEncodeCompressionQuality : @(compressionQuality), HMImageCoderEncodeFirstFrameOnly : @(firstFrameOnly)};
    return [[HMImageCoderManager sharedManager] encodedDataWithImage:self format:imageFormat options:options];
}
@end
