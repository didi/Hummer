//
//  HMAnimationManager.m
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import "HMAnimationManager.h"
#import "UIView+HMAnimation.h"
#import "NSObject+Hummer.h"

@implementation HMAnimationManager
static NSMutableArray <id<HMAnimator>> *_HMAnimationManager_toBePlayedAnimations = nil;

+ (void)initialize {
    _HMAnimationManager_toBePlayedAnimations = [NSMutableArray new];
}
+ (void)addAnimation:(id<HMAnimator>)animation {
    
    [_HMAnimationManager_toBePlayedAnimations addObject:animation];
    [self startAnimation];
}

+ (void)startAnimation {
    
    if (_HMAnimationManager_toBePlayedAnimations.count == 0) {return;}
    NSMutableArray *finshes = [[NSMutableArray alloc] init];
    for (id<HMAnimator> anim in _HMAnimationManager_toBePlayedAnimations) {
        
        if ([anim canStartAnimation]) {
            [anim startAnimation];
            [finshes addObject:anim];
        }
    }
    [_HMAnimationManager_toBePlayedAnimations removeObjectsInArray:finshes];
}

+ (void)removeAnimation:(id<HMAnimator>)animation {
    
    [_HMAnimationManager_toBePlayedAnimations removeObject:animation];
}

//render 函数执行完毕
+ (void)notifyStartAnimation {
    [self startAnimation];
}
@end
