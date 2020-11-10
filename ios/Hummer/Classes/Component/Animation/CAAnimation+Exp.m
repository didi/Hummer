//
//  CAAnimation+Exp.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "CAAnimation+Exp.h"
#import "HMExportManager.h"
#import <objc/runtime.h>
#import <NSObject+Hummer.h>
#import "HMUtility.h"
#import "HMAnimationConverter.h"
#import "HMBaseExecutor.h"
#import "HMBaseValue.h"
#import "HMBaseWeakValue.h"

#define kHMBasicAnimationEventStart    @"start"      // 动画开始事件
#define kHMBasicAnimationEventEnd      @"end"        // 动画结束事件

@interface CAAnimation () <CAAnimationDelegate>
@property (nonatomic, copy, getter=getStartBlock, setter=setStartBlock:) HMClosureType startBlock;
@property (nonatomic, copy, getter=getStopBlock, setter=setStopBlock:) HMClosureType stopBlock;
@property (nonatomic, copy, getter=getTimingFunctionName, setter=setTimingFunctionName:) NSString *timingFunctionName;

@end

@implementation CAAnimation (Base)

HM_EXPORT_CLASS(CAAnimation, CAAnimation)

HM_EXPORT_PROPERTY(timingFunction, __getTimingFunction, __setTimingFunction:)
HM_EXPORT_METHOD(on, on:callback:)

- (void (^)(CAAnimation *, BOOL))onEnding
{
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setOnEnding:(void (^)(CAAnimation *, BOOL))onEnding
{
    objc_setAssociatedObject(self, @selector(onEnding), onEnding, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (HMClosureType)getStartBlock {
    return objc_getAssociatedObject(self, @selector(getStartBlock));
}

- (void)setStartBlock:(HMClosureType)startBlock {
    objc_setAssociatedObject(self, @selector(getStartBlock), startBlock, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (HMClosureType)getStopBlock {
    return objc_getAssociatedObject(self, @selector(getStopBlock));
}

- (void)setStopBlock:(HMClosureType)stopBlock {
    objc_setAssociatedObject(self, @selector(getStopBlock), stopBlock, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (NSString *)getTimingFunctionName {
    return objc_getAssociatedObject(self, @selector(getTimingFunctionName));
}

- (void)setTimingFunctionName:(NSString *)timingFunctionName {
    objc_setAssociatedObject(self, @selector(getTimingFunctionName), timingFunctionName, OBJC_ASSOCIATION_COPY_NONATOMIC);
    self.timingFunction = [HMAnimationConverter convertMediaTimingFunction:timingFunctionName];
}

- (NSString *)__getTimingFunction {
    return [self getTimingFunctionName];
}

- (void)__setTimingFunction:(HMBaseValue *)value {
    [self setTimingFunctionName:[value.executor convertValueToString:value]];
}

- (void)on:(HMBaseValue *)value callback:(HMClosureType)callback{
    NSString *event = [value.executor convertValueToString:value];
    if ([event isEqualToString:kHMBasicAnimationEventStart]) {
        self.startBlock = callback;
    } else if ([event isEqualToString:kHMBasicAnimationEventEnd]) {
        self.stopBlock = callback;
    }
}

#pragma mark - CAAnimationDelegate

- (void)animationDidStart:(CAAnimation *)anim {
    if (self.startBlock && self.hm_value.isValid) {
        self.startBlock(@[(HMBaseValue *)self.hm_value]);
    }
}

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
    if (self.stopBlock && self.hm_value.isValid && self.hm_value.executor) {
        self.stopBlock(@[self.hm_value, @(flag)]);
    }
    if (self.onEnding) {
        void(^onEnding)(CAAnimation *, BOOL) = self.onEnding;
        self.onEnding = nil;
        dispatch_async(dispatch_get_main_queue(), ^{
            onEnding(anim, flag);
        });
    }
}

@end
