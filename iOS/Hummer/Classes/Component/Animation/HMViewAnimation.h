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
typedef void(^HMViewAnimationStartBlock)(void);
typedef void(^HMViewAnimationFinishBlock)(BOOL);

@protocol HMViewAnimation <NSObject>

@property (nonatomic, strong)UIView *animatedView;

// addAnimationForkey。用于取消，添加动画。
@property (nonatomic, copy) NSString *animationKey;

@property (nonatomic, assign) NSTimeInterval duration;
@property (nonatomic, assign) NSTimeInterval delay;
@property (nonatomic, assign) CGFloat springDamping;
@property (nonatomic, assign) CGFloat initialVelocity;
@property (nonatomic, assign) float repeatCount;
@property (nonatomic, copy) NSString *easing;

// 动画属性：position，backgroundColor
@property (nonatomic, copy)NSString *animationKeyPath;


@property (nonatomic, copy) HMViewAnimationStartBlock startBlock;
@property (nonatomic, copy) HMViewAnimationFinishBlock endBlock;

@end

NS_ASSUME_NONNULL_END
