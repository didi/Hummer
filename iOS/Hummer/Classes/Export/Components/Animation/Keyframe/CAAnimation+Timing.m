//
//  CAAnimation+Timing.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "CAAnimation+Timing.h"
#import "HMExportManager.h"
#import <objc/runtime.h>
#import "NSObject+Hummer.h"
#import "HMBaseValue.h"

@implementation CAAnimation (Timing)

HM_EXPORT_PROPERTY(duration, __duration, __setDuration:)
HM_EXPORT_PROPERTY(repeatCount, __repeatCount, __setRepeatCount:)
HM_EXPORT_PROPERTY(delay, delay, setDelay:)

#pragma mark - Export Property

- (HMBaseValue *)__duration {
    return [HMBaseValue valueWithDouble:[self.facadeDuration doubleValue] inContext:self.hmContext];
}

- (void)__setDuration:(HMBaseValue *)value {
    NSNumber *num = value.toNumber;
    self.facadeDuration = num;
    if (!num || [num doubleValue] == 0) {
        /**
         *对其android方案，当Duration为0时，
         *ios默认0.25s动画。
         *android为极短时间的动画（表现为无动画过度）。
         */
        num = @0.001;
    }
    [self setDuration:[num doubleValue]];
}

- (HMBaseValue *)__repeatCount {
    return [HMBaseValue valueWithInt32:self.repeatCount inContext:self.hmContext];
}

- (void)__setRepeatCount:(HMBaseValue *)value {
    float repeatCount = [value.toNumber floatValue];
    if (repeatCount < 0) {
        repeatCount = MAXFLOAT;
    }
    [self setRepeatCount:repeatCount];
}

- (HMBaseValue *)delay {
    return nil;
}

- (void)setDelay:(HMBaseValue *)value {
    float delay = [value.toNumber floatValue];
    self.beginTime = CACurrentMediaTime() + delay;
}


- (NSNumber *)facadeDuration{
    
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setFacadeDuration:(NSNumber *)facadeDuration{
 
    objc_setAssociatedObject(self, @selector(facadeDuration), facadeDuration, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end
