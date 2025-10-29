//
//  HMCAAnimation.m
//  Hummer
//
//  Created by didi on 2021/3/1.
//

#import "HMCAAnimation.h"
#import "HMBaseExecutorProtocol.h"
#import <Hummer/HMCAAnimation+Internal.h>
#import <Hummer/HMBaseValue.h>
#import <Hummer/HMUtility.h>
#import "HMAnimationManager.h"
#import "UIView+HMAnimation.h"
#import "NSObject+Hummer.h"
#import "UIView+HMRenderObject.h"
#import "UIView+HMDom.h"

@interface HMCAAnimation ()

@property (nonatomic, assign) BOOL isPaused;
@property (nonatomic, assign) BOOL enteredBackground;
@property (nonatomic, assign) NSTimeInterval startTimestamp;
@property (nonatomic, assign) NSTimeInterval pauseTime;
@property (nonatomic, assign) NSTimeInterval pauseDuration;
@end

@implementation HMCAAnimation
- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}
- (instancetype)initWithHMValues:(NSArray *)values {
    self = [self init];
    if (self) {
        NSString *value = values.count > 0 ? [values[0] toString] : @"";
        NSString *animationKeyPath = value;
        NSAssert(animationKeyPath != nil, @"HMBasicAnimation init must set keypath!!!");
        self.keyPath = value;
        _isFinish = NO;
        _isStop = NO;
        _enteredBackground = NO;
        _pauseTime = 0;
        _pauseDuration = 0;
        _isPaused = NO;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didEnterBackground) name:UIApplicationDidEnterBackgroundNotification object:nil];
    }
    return self;
}


#pragma mark <UIApplicationDidEnterBackgroundNotification>
- (void)didEnterBackground {
    self.enteredBackground = YES;
}

#pragma mark <HMAnimator>
- (void)pauseAnimation:(NSTimeInterval)pauseTime {
    //如果没有进入过后台
    self.pauseTime = pauseTime;
    self.isPaused = YES;
    if(!self.enteredBackground){
        return;
    }
    // 取消后台计时，等待 resumeAnimation 重新计算时间
    [self.class cancelPreviousPerformRequestsWithTarget:self];
}

- (void)resumeAnimation:(NSTimeInterval)resumeTime {
    //如果没有进入过后台
    self.isPaused = NO;;
    self.pauseDuration += (resumeTime - self.pauseTime);
    if(!self.enteredBackground){
        return;
    }
    [self startBackgroundCompletion];
}

- (BOOL)canStartAnimation {
    return !self.animatedView.hm_renderObject.isDirty;
//    return YES;

}

- (void)setAnimationView:(nonnull UIView *)view forKey:(nullable NSString *)animationKey {
    self.animatedView = view;
    self.animationKey = animationKey ? animationKey : self.keyPath;
}

- (void)startAnimation {
    self.startTimestamp = ([[NSDate date] timeIntervalSince1970] * 1000);
}

/// 可能由开发者主动调用，也可能由 CAAnimation animationDidStop 调用
- (void)stopAnimation {
    if(self.isStop){
        return;
    }
    self.isStop = YES;
    for (id<HMCAAnimationInfo> info in self.infos) {
        [info.animatedView.layer removeAnimationForKey:[self uniqueAnimationKeyWithInfo:info]];
        if([info.animatedView hm_addPathAnimationWhenInAnimated] && [info.propertyName isEqualToString:@"path"]){
            [info.animatedView.hm_maskLayer removeAnimationForKey:[self uniqueAnimationKeyWithInfo:info]];
            [info.animatedView.hm_backgroundColorMaskLayer removeAnimationForKey:[self uniqueAnimationKeyWithInfo:info]];
            [info.animatedView.hm_backgroundColorShapeLayer removeAnimationForKey:[self uniqueAnimationKeyWithInfo:info]];
        }
    }
    
    if (self.stopBlock) {
        NSMutableArray *args = NSMutableArray.new;
        if (self.hmValue) {
            [args addObject:self.hmValue];
            [args addObject:[HMBaseValue valueWithBool:self.isFinish inContext:self.hmValue.context]];
        } else {
            HMLogDebug(@"class [%@] JSValue is nil", [self class]);
        }
        if (self.stopBlock) {self.stopBlock(args);}
    }
}

#pragma mark <CAAnimationDelegate>

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
    
    self.isFinish = self.isFinish | flag;
    [self.animations removeObject:anim];
    // 所有动画播放完毕 && 没有主动调用过 stopAnimation
    if (self.animations.count <= 0 && self.isStop == false) {
        if(self.enteredBackground){
            if(!self.isPaused){
                [self startBackgroundCompletion];
            }
        }else{
            [self.animatedView hm_removeAnimationForKey:self.animationKey];
        }
    }
}
- (void)animationDidStart:(CAAnimation *)anim {
    
    self.isStop = NO;
    [self.animations addObject:anim];
    if (self.animations.count == self.infos.count) {
        //同步transform。bounds 不需要
        if ([self isTransformAnimation]) {

            self.animatedView.layer.transform = [self.animatedView.hm_transform getCATransform3D];
        } else if ([self.keyPath isEqualToString:@"backgroundColor"]) {
            self.animatedView.layer.backgroundColor = (__bridge CGColorRef _Nullable)(self.property);
        } else if ([self.keyPath isEqualToString:@"opacity"]) {
            self.animatedView.alpha = [self.property floatValue];
        }
        if (self.startBlock) {
            NSMutableArray *args = NSMutableArray.new;
            if (self.hmValue) {
                [args addObject:self.hmValue];
            } else {
                HMLogDebug(@"class [%@] JSValue is nil", [self class]);
            }
            if (self.startBlock) {self.startBlock(args);}
        }
    }
}

#pragma mark <private>

- (BOOL)isTransformAnimation {
    return [self.keyPath hasPrefix:@"position"] || [self.keyPath hasPrefix:@"scale"] || [self.keyPath hasPrefix:@"rotation"];
}

- (NSString *)uniqueAnimationKeyWithInfo:(id<HMCAAnimationInfo>)info{
    
    NSString *key = [NSString stringWithFormat:@"%@%@",self.animationKey, info.propertyName];
    return key;
}

- (void)backgroundCompletion {

    if(self.isStop){
        return;
    }
    [self stopAnimation];
}

- (void)startBackgroundCompletion {
    
    [self.class cancelPreviousPerformRequestsWithTarget:self];
    NSTimeInterval delay = [self estimateCompletionTimeInterval];
    [self performSelector:@selector(backgroundCompletion) withObject:nil afterDelay:delay/1000.0 inModes:@[NSRunLoopCommonModes]];
}
/**
 * 当 app 进入后台后，会调用 animationDidStop，但由于 removedOnCompletion = NO，会导致动画仍然执行，因此需要手动增加计时，用于回调
 * 停止时间 = 开始时间+delay+duration*repeatCount+暂停时间
 * 1. 动画被暂停后 -> 记录开始暂停时间
 *    1.1 处于后台 -> 取消计时器，等待 resume
 *    1.2 处于前台：do nothing
 * 2. 动画被恢复后 -> 计算时间
 *    2.1 处于后台 -> 取消计时器，计算callback 事件，启动计时器
 *    2.2 处于前台：do nothing
 */
- (NSTimeInterval)estimateCompletionTimeInterval {
    if(_repeatCount == -1){
        return MAXFLOAT;
    }
    // 停止时间 = 开始时间+delay+duration+暂停时间，暂不处理溢出情况
    NSTimeInterval endTime = self.startTimestamp + ceil((self.delay + self.duration * self.repeatCount + self.pauseDuration) * 1000);
    NSTimeInterval nowTime = [[NSDate date] timeIntervalSince1970] * 1000;
    NSTimeInterval delay = 0;
    if(endTime > nowTime){
        delay = endTime - nowTime;
    }
    return delay;
}
@end
