//
//  HMAnimator.h
//  Pods
//
//  Created by didi on 2021/2/22.
//



NS_ASSUME_NONNULL_BEGIN


@protocol HMAnimator <NSObject>

- (void)setAnimationView:(UIView *)view forKey:(nullable NSString *)animationKey;
- (BOOL)canStartAnimation;

- (void)startAnimation;
- (void)stopAnimation;
@end


NS_ASSUME_NONNULL_END

