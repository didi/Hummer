//
//  HMAnimation.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMAnimation.h"
#import "HMExportManager.h"
#import <Hummer/HMBaseExecutorProtocol.h>
#import <QuartzCore/CAAnimation.h>
#import <UIKit/UIKit.h>
#import "HMAnimationConverter.h"
#import "HMUtility.h"
#import <Hummer/HMBaseValue.h>

@interface HMKeyframeAnimation ()<CAAnimationDelegate>

@property (nonatomic, copy) NSString *__keyPath;

@end

@implementation HMKeyframeAnimation

//HM_EXPORT_CLASS(KeyframeAnimation, HMKeyframeAnimation)
HM_EXPORT_PROPERTY(keyframes, keyframes, setKeyframes:)

- (instancetype)initWithHMValues:(NSArray *)values {
    self = [HMKeyframeAnimation animation];
    if (self) {
        self.delegate = self;
        self.removedOnCompletion = NO;
        self.fillMode = kCAFillModeForwards;
        self.__keyPath = values.count > 0 ? [values[0] toString] : @"";
        NSString *animationKeyPath = [HMAnimationConverter convertAnimationKeyPath:self.__keyPath];
        HMAssert(animationKeyPath != nil, @"HMBasicAnimation init must set keypath!!!");
        if (animationKeyPath) {
            self.keyPath = animationKeyPath;
            if ([animationKeyPath isEqualToString:@"position"]) {
                self.additive = YES;
            }
        }
    }
    return self;
}

#pragma mark - Export Property

- (HMBaseValue *)keyframes {
    return nil;
}

- (void)setKeyframes:(HMBaseValue *)value {
    NSArray *keyframes = value.toArray;
    if (keyframes.count <= 0) return;
    
    NSMutableArray *values = [NSMutableArray new];
    NSMutableArray *keyTimes = [NSMutableArray new];
    NSMutableArray *timingFunctions = [NSMutableArray new];
    
    for (NSDictionary *item in keyframes) {
        HMAssert([item isKindOfClass:[NSDictionary class]], @"key frame must be dictionary");
        id value = [HMAnimationConverter convertAnimationValue:[item valueForKey:@"value"]
                                                       keyPath:self.__keyPath];
        if (value) {
            [values addObject:value];
        }
        id keyTime = [item valueForKey:@"percent"];
        if (keyTime) {
            [keyTimes addObject:keyTime];
        }
        id timingFunction = [HMAnimationConverter convertMediaTimingFunction:[item valueForKey:@"timingFunction"]];
        if (timingFunction) {
            [timingFunctions addObject:timingFunction];
        }
    }
    self.values = values;
    self.keyTimes = keyTimes;
    self.timingFunctions = timingFunctions;
}

@end
