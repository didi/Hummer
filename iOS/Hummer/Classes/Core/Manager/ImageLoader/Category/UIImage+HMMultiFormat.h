//
//  UIImage+HMMultiFormat.h
//  Hummer
//
//  Created by didi on 2021/9/7.
//

#import <UIKit/UIKit.h>
#import "NSData+Hummer.h"

NS_ASSUME_NONNULL_BEGIN

@interface UIImage (HMMultiFormat)
#pragma mark - Decode

+ (nullable UIImage *)hm_imageWithData:(nullable NSData *)data;
+ (nullable UIImage *)hm_imageWithData:(nullable NSData *)data scale:(CGFloat)scale;
+ (nullable UIImage *)hm_imageWithData:(nullable NSData *)data scale:(CGFloat)scale firstFrameOnly:(BOOL)firstFrameOnly;

#pragma mark - Encode
- (nullable NSData *)hm_imageData;
- (nullable NSData *)hm_imageDataAsFormat:(HMImageFormat)imageFormat;
- (nullable NSData *)hm_imageDataAsFormat:(HMImageFormat)imageFormat compressionQuality:(double)compressionQuality;
- (nullable NSData *)hm_imageDataAsFormat:(HMImageFormat)imageFormat compressionQuality:(double)compressionQuality firstFrameOnly:(BOOL)firstFrameOnly;

@end

NS_ASSUME_NONNULL_END
