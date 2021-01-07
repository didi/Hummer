//
//  HMTransitionAnimation.m
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import "HMTransitionAnimation.h"
#import "HMTransitionAnimationConverter.h"
#import "HMUtility.h"
#import "HMConverter.h"
#import "UIView+HMDom.h"
#import "HMAnimationManager.h"
#import "HMBasicAnimation.h"
#import "HMAnimationConverter.h"

@implementation HMTransitionAnimation

- (instancetype)initWithTransitions:(NSDictionary <NSString *, NSObject *> *)transitions view:(UIView *)view
{
    if (self = [super init]) {
        _delay = (NSNumber *)transitions[@"transitionDelay"]?:@0;
        _animationType = [HMTransitionAnimationConverter convertAnimationCurve:(NSString *)transitions[@"transitionTimingFunction"]];
        _needAnimations = [HMTransitionAnimationConverter convertProperties:(NSString *)transitions[@"transitionProperty"] durations:(NSString *)transitions[@"transitionDuration"]];
        _animatedView = view;
    }
    
    return self;
}

- (void)addAnimations:(NSDictionary <NSString *, NSObject *> *)animations
{
    NSDictionary <NSString *, NSObject *> *convertAnimations = [HMTransitionAnimationConverter convertStyleToAnimations:animations];
    [convertAnimations enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull keyPath, NSObject * _Nonnull value, BOOL * _Nonnull stop) {
        // 将解析出的动画属性及属性值 全部转换成HMBasicAnimation对象，动画实现交由HMBasicAnimation实现
        HMBasicAnimation *basicAnimation = [[HMBasicAnimation alloc] init];
        basicAnimation.animationKeyPath = keyPath;
        id animationValue = [HMAnimationConverter convertAnimationValue:value
                                                                keyPath:keyPath];
        basicAnimation.property = [[HMBasicAnimationProperty alloc] initWithKey:keyPath propertyValue:animationValue];
        basicAnimation.duration = [[[HMTransitionAnimationConverter transformBasicAnimationMap] allValues] containsObject:keyPath] ? self.needAnimations[@"transform"].doubleValue : self.needAnimations[keyPath].doubleValue;
        basicAnimation.delay = self.delay.doubleValue;
        basicAnimation.repeatCount = 1;
        basicAnimation.animationType = self.animationType;
        basicAnimation.animatedView = self.animatedView;
        
        [HMAnimationManager addAnimation:basicAnimation];
    }];
}


@end
