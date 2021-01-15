//
//  HMPinchEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMPinchEvent.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMBaseValue.h"

@interface HMPinchEvent()

@property (nonatomic, assign) CGFloat scale;
@property (nonatomic, strong) UIPinchGestureRecognizer *gesture;

@end

@implementation HMPinchEvent

HM_EXPORT_CLASS(PinchEvent, HMPinchEvent)

HM_EXPORT_PROPERTY(scale, __scale, __setScale:)
HM_EXPORT_PROPERTY(state, __state, __setState:)

- (NSString *)type {
    return HMPinchEventName;
}

- (void)updateEvent:(UIView *)view withContext:(id)context {
    [super updateEvent:view withContext:context];
    self.gesture = (UIPinchGestureRecognizer *)context;
    self.scale = ((UIPinchGestureRecognizer *)context).scale;
}

#pragma mark - Export Method

- (NSNumber *)__scale {
    return @(self.scale);
}

- (void)__setScale:(__unused HMBaseValue *)scale {
    NSAssert(NO, @"cannot set read only property");
}

- (NSNumber *)__state {
    return @(self.gesture.state);
}

- (void)__setState:(__unused HMBaseValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

@end
