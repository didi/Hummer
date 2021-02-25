//
//  HMBasicAnimationWapper.m
//  Hummer
//
//  Created by didi on 2021/2/22.
//

#import "HMBasicAnimationWapper.h"
#import "HMViewAnimation.h"
#import "HMBaseExecutorProtocol.h"
#import "HMExportManager.h"
#import "HMAnimationConverter.h"
#import "UIView+HMAnimation.h"
#import <Hummer/HMBaseValue.h>
#import "NSObject+Hummer.h"
#import <Hummer/HMBasicAnimation.h>
#import <Hummer/HMCABasicAnimation.h>
#import <Hummer/HMUtility.h>


@interface HMBasicAnimationWapper()

@property (nonatomic, copy, getter=getStartBlock, setter=setStartBlock:) HMFuncCallback startBlock;
@property (nonatomic, copy, getter=getStopBlock, setter=setStopBlock:) HMFuncCallback stopBlock;
@property (nonatomic, copy, getter=getTimingFunctionName, setter=setTimingFunctionName:) NSString *timingFunctionName;

@property (nonatomic, copy)NSString *animationKeyPath;
@end

@implementation HMBasicAnimationWapper

HM_EXPORT_CLASS(BasicAnimation, HMBasicAnimationWapper)
HM_EXPORT_PROPERTY(value, animValue, setAnimValue:)

HM_EXPORT_PROPERTY(duration, __duration, __setDuration:)
HM_EXPORT_PROPERTY(repeatCount, __repeatCount, __setRepeatCount:)
HM_EXPORT_PROPERTY(delay, __delay, __setDelay:)
HM_EXPORT_PROPERTY(timingFunction, __getTimingFunction, __setTimingFunction:)
HM_EXPORT_METHOD(on, on:callback:)

- (instancetype)initWithHMValues:(NSArray *)values {
    self = [self init];
    if (self) {
        NSString *value = values.count > 0 ? [values[0] toString] : @"";
        NSString *animationKeyPath = value;
        NSAssert(animationKeyPath != nil, @"HMBasicAnimation init must set keypath!!!");
        __weak typeof(self) wSelf = self;
        if (animationKeyPath) {
            self.animationKeyPath = animationKeyPath;
            self.realAnimator = [HMCABasicAnimation new];
            self.realAnimator.animationKeyPath = self.animationKeyPath;
            self.realAnimator.startBlock = ^{
                NSMutableArray *args = NSMutableArray.new;
                if (wSelf.hmValue) {
                    [args addObject:wSelf.hmValue];
                } else {
                    HMLogDebug(@"class [%@] JSValue is nil", [wSelf class]);
                }
                if (wSelf.startBlock) {wSelf.startBlock(args);}
            };
            
            self.realAnimator.endBlock = ^(BOOL isFinish) {
                NSMutableArray *args = NSMutableArray.new;
                if (wSelf.hmValue) {
                    [args addObject:wSelf.hmValue];
                    [args addObject:[HMBaseValue valueWithBool:isFinish inContext:wSelf.hmValue.context]];
                } else {
                    HMLogDebug(@"class [%@] JSValue is nil", [wSelf class]);
                }
                if (wSelf.stopBlock) {wSelf.stopBlock(args);}
            };
        }
    }
    return self;
}

#pragma mark <HMAnimator>

- (void)stopAnimation {
    [self.realAnimator stopAnimation];
}

- (BOOL)canStartAnimation {
    
    return [self.realAnimator canStartAnimation];
}

- (void)startAnimation {
    
    [self.realAnimator startAnimation];
}

- (void)setAnimationView:(UIView *)view forKey:(NSString *)animationKey {
    [self.realAnimator setAnimationView:view forKey:animationKey];
}

#pragma mark <js export>

- (HMBaseValue *)animValue {
    return nil;
}

- (void)setAnimValue:(HMBaseValue *)value {
    id animationValue = [HMAnimationConverter convertAnimationValue:value.hm_toObjCObject
                                                            keyPath:self.animationKeyPath];
    self.realAnimator.property = animationValue;
//    self.realAnimator.property = [[HMBasicAnimationProperty alloc] initWithKey:self.animationKeyPath propertyValue:animationValue];
    
}

- (HMBaseValue *)__duration {
    return [HMBaseValue valueWithDouble:self.realAnimator.duration inContext:self.hmContext];
}

- (void)__setDuration:(HMBaseValue *)value {
    self.realAnimator.duration = [value.toNumber doubleValue];
}

- (HMBaseValue *)__repeatCount {
    return [HMBaseValue valueWithInt32:self.realAnimator.repeatCount inContext:self.hmContext];
}

/**
 * 小于0，相当于 infinate
 * 0，执行1次。
 * 大于等于 1 的数字，代表动画执行的次数。
 */
- (void)__setRepeatCount:(HMBaseValue *)value {
    float repeatCount = [value.toNumber floatValue];
    if (repeatCount < 0) {
        repeatCount = MAXFLOAT;
    }
    [self.realAnimator setRepeatCount:repeatCount];
}

- (HMBaseValue *)__delay {
    return [HMBaseValue valueWithDouble:self.realAnimator.delay inContext:self.hmContext];
}

- (void)__setDelay:(HMBaseValue *)value{
    
    self.realAnimator.delay = [value.toNumber floatValue];
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
        if ([event isEqualToString:@"start"]) {
            self.startBlock = callback;
        } else if ([event isEqualToString:@"end"]) {
            self.stopBlock = callback;
        }
    }
}
@end
