//
//  HMAnimationManager.m
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import "HMAnimationManager.h"

@implementation HMAnimationManager
static NSMutableArray *_HMAnimationManager_animations = nil;
static NSMutableDictionary *_HMAnimationManager_animationMap = nil;

+ (void)initialize {
    _HMAnimationManager_animations = [NSMutableArray new];
    _HMAnimationManager_animationMap = [NSMutableDictionary new];
}
+ (void)addAnimation:(id<HMAnimator>)animation forView:(UIView *)view key:(nullable NSString *)animationKey{
    
    [_HMAnimationManager_animations addObject:animation];
    [_HMAnimationManager_animationMap setObject:animation forKey:animationKey];
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

+ (void)removeAnimationForKey:(NSString *)animationKey {
    id<HMAnimator> animator = _HMAnimationManager_animationMap[animationKey];
    
    [_HMAnimationManager_animationMap removeObjectForKey:animationKey];
    [_HMAnimationManager_animations removeObject:animator];
    [animator stopAnimation];
}
//render 函数执行完毕
+ (void)notifyStartAnimation {
    [self startAnimation];
}

+ (void)notifyFinishAnimation:(id<HMAnimator>)animation forKey:(NSString *)animationKey {
    [_HMAnimationManager_animationMap removeObjectForKey:animationKey];
    [_HMAnimationManager_animations removeObject:animation];
}

@end
