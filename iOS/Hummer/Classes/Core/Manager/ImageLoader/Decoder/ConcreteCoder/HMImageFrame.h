//
//  HMImageFrame.h
//  Hummer
//
//  Created by didi on 2021/9/1.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
/**
 This class is used for creating animated images via `animatedImageWithFrames` in `HMImageCoderHelper`.
 @note If you need to specify animated images loop count, use `HM_imageLoopCount` property in `UIImage+Metadata.h`.
 */
@interface HMImageFrame : NSObject

/**
 The image of current frame. You should not set an animated image.
 */
@property (nonatomic, strong, readonly, nonnull) UIImage *image;
/**
 The duration of current frame to be displayed. The number is seconds but not milliseconds. You should not set this to zero.
 */
@property (nonatomic, readonly, assign) NSTimeInterval duration;

/**
 Create a frame instance with specify image and duration

 @param image current frame's image
 @param duration current frame's duration
 @return frame instance
 */
+ (instancetype _Nonnull)frameWithImage:(UIImage * _Nonnull)image duration:(NSTimeInterval)duration;
@end

NS_ASSUME_NONNULL_END
