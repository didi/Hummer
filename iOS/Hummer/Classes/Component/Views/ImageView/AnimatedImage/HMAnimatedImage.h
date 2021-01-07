//
//  HMAnimatedImage.h
//  Hummer
//
//  Created by didi on 2020/11/25.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMAnimatedImage : UIImage

- (NSUInteger)animatedImageLoopCount;
- (NSUInteger)animatedImageFrameCount;
- (NSTimeInterval)animatedImageDurationAtIndex:(NSUInteger)index;
- (UIImage *)animatedImageFrameAtIndex:(NSUInteger)index;

- (instancetype)initWithData:(NSData *)data scale:(CGFloat)scale;
@end

NS_ASSUME_NONNULL_END
