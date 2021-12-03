//
//  UIImage+HMForceDecode.h
//  Hummer
//
//  Created by didi on 2021/9/1.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
/**
 UIImage category about force decode feature (avoid Image/IO's lazy decoding during rendering behavior).
 */

@interface UIImage (HMForceDecode)

/**
 A bool value indicating whether the image has already been decoded. This can help to avoid extra force decode.
 */
@property (nonatomic, assign) BOOL hm_isDecoded;

/**
 Decode the provided image. This is useful if you want to force decode the image before rendering to improve performance.

 @param image The image to be decoded
 @return The decoded image
 */
+ (nullable UIImage *)hm_decodedImageWithImage:(nullable UIImage *)image;

/**
 Decode and scale down the provided image

 @param image The image to be decoded
 @return The decoded and scaled down image
 */
+ (nullable UIImage *)hm_decodedAndScaledDownImageWithImage:(nullable UIImage *)image;

/**
 Decode and scale down the provided image with limit bytes
 
 @param image The image to be decoded
 @param bytes The limit bytes size. Provide 0 to use the build-in limit.
 @return The decoded and scaled down image
 */
+ (nullable UIImage *)hm_decodedAndScaledDownImageWithImage:(nullable UIImage *)image limitBytes:(NSUInteger)bytes;

@end

NS_ASSUME_NONNULL_END
