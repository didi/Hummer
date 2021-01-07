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
#import "JSValue+Hummer.h"

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

- (JSValue *)__scale {
    return [JSValue valueWithDouble:self.scale inContext:self.hmContext];
}

- (void)__setScale:(__unused JSValue *)scale {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__state {
    return [JSValue valueWithObject:@(self.gesture.state) inContext:self.hmContext];
}

- (void)__setState:(__unused JSValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

@end
