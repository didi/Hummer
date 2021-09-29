//
//  HMAnimatedImage.h
//  Hummer
//
//  Created by didi on 2020/11/25.
//

#import <UIKit/UIKit.h>
#import "HMImageCoder.h"
NS_ASSUME_NONNULL_BEGIN

@interface HMAnimatedImage : UIImage

- (NSUInteger)animatedImageLoopCount;
- (NSUInteger)animatedImageFrameCount;
- (NSTimeInterval)animatedImageDurationAtIndex:(NSUInteger)index;
- (UIImage *)animatedImageFrameAtIndex:(NSUInteger)index;

- (nullable instancetype)initWithData:(nonnull NSData *)data scale:(CGFloat)scale options:(nullable HMImageCoderOptions *)options;

@end

NS_ASSUME_NONNULL_END
