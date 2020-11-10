//
//  CAAnimation+Timing.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "CAAnimation+Timing.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMBaseValue.h"

@implementation CAAnimation (Timing)

HM_EXPORT_PROPERTY(duration, __duration, __setDuration:)
HM_EXPORT_PROPERTY(repeatCount, __repeatCount, __setRepeatCount:)
HM_EXPORT_PROPERTY(delay, delay, setDelay:)

#pragma mark - Export Property

- (double)__duration {
    return self.duration;
}

- (void)__setDuration:(HMBaseValue *)value {
    [self setDuration:[value.toNumber doubleValue]];
}

- (float)__repeatCount {
    return self.repeatCount;
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

@end
