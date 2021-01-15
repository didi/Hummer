//
//  HMSwipeEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMSwipeEvent.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMBaseValue.h"

@interface HMSwipeEvent()

@property (nonatomic, assign) UISwipeGestureRecognizerDirection direction;
@property (nonatomic, strong) UISwipeGestureRecognizer *gesture;

@end

@implementation HMSwipeEvent

HM_EXPORT_CLASS(SwipeEvent, HMSwipeEvent)

HM_EXPORT_PROPERTY(direction, __direction, __setDirection:)
HM_EXPORT_PROPERTY(state, __state, __setState:)

- (NSString *)type {
    return HMSwipeEventName;
}

- (void)updateEvent:(UIView *)view withContext:(id)context {
    [super updateEvent:view withContext:context];
    UISwipeGestureRecognizer *gesture = (UISwipeGestureRecognizer *)context;
    self.gesture = (UISwipeGestureRecognizer *)context;
    self.direction = gesture.direction;
}

#pragma mark - Export Method

- (NSNumber *)__direction {
    return @(self.direction);
}

- (void)__setDirection:(__unused HMBaseValue *)direction {
    NSAssert(NO, @"cannot set read only property");
}

- (NSNumber *)__state {
    return @(self.gesture.state);
}

- (void)__setState:(__unused HMBaseValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

@end
