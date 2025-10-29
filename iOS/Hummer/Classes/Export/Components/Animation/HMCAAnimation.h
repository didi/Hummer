//
//  HMCAAnimation.h
//  Hummer
//
//  Created by didi on 2021/3/1.
//

#import <Foundation/Foundation.h>
#import "HMAnimator.h"

NS_ASSUME_NONNULL_BEGIN

@protocol HMCAAnimationInfo <NSObject>

@property (nonatomic, weak) UIView *animatedView;
@property (nonatomic, strong) NSString *propertyName;
@property (nonatomic, strong) CAMediaTimingFunction *timingFunction;
@property (nonatomic, assign) CGPoint originAnchorPoint;
@end

@interface HMCAAnimation : NSObject<HMAnimator>

@property (nonatomic, assign) double duration;
@property (nonatomic, assign) double delay;
@property (nonatomic, assign) double repeatCount;
@property (nonatomic, strong) NSString *easing;

@property (nonatomic, strong) NSString *keyPath;
@property (nonatomic, strong) UIView *animatedView;


// addAnimationForkey。用于取消，添加动画。
@property (nonatomic, copy) NSString *animationKey;

// js 侧设置的属性
@property (nonatomic, strong)id property;


- (instancetype)initWithHMValues:(NSArray *)values;

// 获取动画唯一标识
- (NSString *)uniqueAnimationKeyWithInfo:(id<HMCAAnimationInfo>)info;
- (BOOL)isTransformAnimation;
@end


NS_ASSUME_NONNULL_END
