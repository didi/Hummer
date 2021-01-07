//
//  HMAnimationManager.m
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import "HMAnimationManager.h"

@implementation HMAnimationManager
static NSMutableArray *_HMAnimationManager_animations = nil;

+ (void)initialize {
    _HMAnimationManager_animations = [NSMutableArray new];
}

+ (void)addAnimation:(id<HMViewAnimation>)animation {
    [_HMAnimationManager_animations addObject:animation];
    [self startAnimation];
}

+ (void)startAnimation {
    
    if (_HMAnimationManager_animations.count == 0) {return;}
    NSMutableArray *finshes = [[NSMutableArray alloc] init];
    for (id<HMViewAnimation> anim in _HMAnimationManager_animations) {
        
        if ([anim canStartAnimation]) {
            [anim startAnimation];
            [finshes addObject:anim];
        }
    }
    [_HMAnimationManager_animations removeObjectsInArray:finshes];
}

//render 函数执行完毕
+ (void)notifyStartAnimation {
    [self startAnimation];
}

@end
