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
#import "HMBaseExecutorProtocol.h"
#import <Hummer/HMBaseValue.h>

#define kHMBasicAnimationEventStart    @"start"      // 动画开始事件
#define kHMBasicAnimationEventEnd      @"end"        // 动画结束事件

@interface CAAnimation () <CAAnimationDelegate>
@property (nonatomic, copy, getter=getStartBlock, setter=setStartBlock:) HMFuncCallback startBlock;
@property (nonatomic, copy, getter=getStopBlock, setter=setStopBlock:) HMFuncCallback stopBlock;
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

- (HMFuncCallback)getStartBlock {
    return objc_getAssociatedObject(self, @selector(getStartBlock));
}

- (void)setStartBlock:(HMFuncCallback)startBlock {
    objc_setAssociatedObject(self, @selector(getStartBlock), startBlock, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (HMFuncCallback)getStopBlock {
    return objc_getAssociatedObject(self, @selector(getStopBlock));
}

- (void)setStopBlock:(HMFuncCallback)stopBlock {
    objc_setAssociatedObject(self, @selector(getStopBlock), stopBlock, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (NSString *)getTimingFunctionName {
    return objc_getAssociatedObject(self, @selector(getTimingFunctionName));
}

- (void)setTimingFunctionName:(NSString *)timingFunctionName {
    objc_setAssociatedObject(self, @selector(getTimingFunctionName), timingFunctionName, OBJC_ASSOCIATION_COPY_NONATOMIC);
    self.timingFunction = [HMAnimationConverter convertMediaTimingFunction:timingFunctionName];
}

- (HMBaseValue *)__getTimingFunction {
    return [self getTimingFunctionName].hmValue;
}

- (void)__setTimingFunction:(HMBaseValue *)value {
    if ([value isString]) {
        [self setTimingFunctionName:value.toString];
    }
}

- (void)on:(HMBaseValue *)value callback:(HMFuncCallback)callback{
    if ([value isString]) {
        NSString *event = value.toString;
        if ([event isEqualToString:kHMBasicAnimationEventStart]) {
            self.startBlock = callback;
        } else if ([event isEqualToString:kHMBasicAnimationEventEnd]) {
            self.stopBlock = callback;
        }
    }
}

#pragma mark - CAAnimationDelegate

- (void)animationDidStart:(CAAnimation *)anim {
    if (self.startBlock) {
        NSMutableArray *args = NSMutableArray.new;
        if (self.hmValue) {
            [args addObject:self.hmValue];
        } else {
            HMLogDebug(@"class [%@] JSValue is nil", [self class]);
        }
        self.startBlock(args);
    }
}

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (self.onEnding) {
            void(^onEnding)(CAAnimation *, BOOL) = self.onEnding;
            self.onEnding = nil;
            onEnding(anim, flag);
        }
        // 后通知 JS 动画执行完成
        if (self.stopBlock) {
            NSMutableArray *args = NSMutableArray.new;
            if (self.hmValue) {
                [args addObject:self.hmValue];
                [args addObject:[HMBaseValue valueWithBool:flag inContext:self.hmValue.context]];
            } else {
                HMLogDebug(@"class [%@] JSValue is nil", [self class]);
            }
            self.stopBlock(args.copy);
        }
    });
}

@end
