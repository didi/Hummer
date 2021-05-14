//
//  HMTapEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMTapEvent.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMBaseValue.h"

@interface HMTapEvent()

@property (nonatomic, assign) CGPoint position;
@property (nonatomic, strong) UITapGestureRecognizer *gesture;

@property (nonatomic, assign) CGPoint windowLocation;

@end

@implementation HMTapEvent

HM_EXPORT_CLASS(TapEvent, HMTapEvent)

HM_EXPORT_PROPERTY(position, __position, __setPosition:)
HM_EXPORT_PROPERTY(state, __state, __setState:)

- (NSString *)type {
    return HMTapEventName;
}

- (void)updateEvent:(UIView *)view withContext:(id)context {
    [super updateEvent:view withContext:context];
    UITapGestureRecognizer *gesture = (UITapGestureRecognizer *)context;
    self.gesture = (UITapGestureRecognizer *)context;
    self.position = [gesture locationInView:view];
    self.windowLocation = [gesture locationInView:nil];
}

#pragma mark - Export Method

- (NSDictionary<NSString *, NSString *> *)__position {
    return @{
        @"x": [NSString stringWithFormat:@"%.0f", self.position.x],
        @"y": [NSString stringWithFormat:@"%.0f", self.position.y],
        @"rawX": @(self.windowLocation.x).stringValue,
        @"rawY": @(self.windowLocation.y).stringValue
    };
}

- (void)__setPosition:(__unused HMBaseValue *)position {
    NSAssert(NO, @"cannot set read only property");
}

- (NSNumber *)__state {
    return @(self.gesture.state);
}

- (void)__setState:(__unused HMBaseValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

@end
