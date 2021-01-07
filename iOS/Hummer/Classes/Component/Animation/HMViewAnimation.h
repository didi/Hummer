//
//  HMViewAnimation.h
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, HMAnimationType) {
    HMAnimationTypeEaseInEaseOut = 0,
    HMAnimationTypeLinear,
    HMAnimationTypeEaseIn,
    HMAnimationTypeEaseOut,
    HMAnimationTypeSpring
};

@protocol HMViewAnimation <NSObject>

@property (nonatomic, assign) NSTimeInterval duration;
@property (nonatomic, assign) NSTimeInterval delay;
@property (nonatomic, assign) CGFloat springDamping;
@property (nonatomic, assign) CGFloat initialVelocity;
@property (nonatomic, assign) int repeatCount;
@property (nonatomic, assign) HMAnimationType animationType;


- (void)startAnimation;
- (BOOL)canStartAnimation;
- (void)stopAnimation:(BOOL) withoutFinishing;
@end

NS_ASSUME_NONNULL_END
