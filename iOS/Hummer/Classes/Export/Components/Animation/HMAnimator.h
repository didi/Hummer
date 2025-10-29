//
//  HMAnimator.h
//  Pods
//
//  Created by didi on 2021/2/22.
//



NS_ASSUME_NONNULL_BEGIN


@protocol HMAnimator <NSObject>
 
- (void)pauseAnimation:(NSTimeInterval)pauseTime DEPRECATED_MSG_ATTRIBUTE("动画暂不支持暂停，后续将会被删除");

- (void)resumeAnimation:(NSTimeInterval)resumeTime DEPRECATED_MSG_ATTRIBUTE("动画暂不支持暂停，后续将会被删除");
- (void)setAnimationView:(UIView *)view forKey:(nullable NSString *)animationKey;
- (BOOL)canStartAnimation;

- (void)startAnimation;
- (void)stopAnimation;
@end


NS_ASSUME_NONNULL_END

