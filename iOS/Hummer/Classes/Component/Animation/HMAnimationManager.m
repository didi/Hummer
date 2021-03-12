//
//  HMAnimationManager.m
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import "HMAnimationManager.h"
#import "UIView+HMAnimation.h"

@implementation HMAnimationManager
static NSMutableArray *_HMAnimationManager_animations = nil;

+ (void)initialize {
    _HMAnimationManager_animations = [NSMutableArray new];
}
+ (void)addAnimation:(id<HMAnimator>)animation forView:(UIView *)view key:(nullable NSString *)animationKey{
    
    [_HMAnimationManager_animations addObject:animation];
    if (animationKey) {
        [view.hm_animationMap setObject:animation forKey:animationKey];
    }
    [animation setAnimationView:view forKey:animationKey];
    [self startAnimation];
}

+ (void)startAnimation {
    
    if (_HMAnimationManager_animations.count == 0) {return;}
    NSMutableArray *finshes = [[NSMutableArray alloc] init];
    for (id<HMAnimator> anim in _HMAnimationManager_animations) {
        
        if ([anim canStartAnimation]) {
            [anim startAnimation];
            [finshes addObject:anim];
        }
    }
    [_HMAnimationManager_animations removeObjectsInArray:finshes];
}

+ (void)removeAnimationForView:(UIView *)view key:(NSString *)animationKey {
    if (animationKey) {
        id<HMAnimator> animator = [view.hm_animationMap objectForKey:animationKey];
        [view.hm_animationMap removeObjectForKey:animationKey];
        [animator stopAnimation];
    }
}

//render 函数执行完毕
+ (void)notifyStartAnimation {
    [self startAnimation];
}
@end
