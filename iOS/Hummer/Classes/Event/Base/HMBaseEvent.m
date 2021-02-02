//
//  HMBaseEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMBaseEvent.h"
#import "HMExportManager.h"
#import "UIView+HMEvent.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"

NSString * const HMLongPressEventName   = @"longPress";
NSString * const HMTapEventName         = @"tap";
NSString * const HMSwipeEventName       = @"swipe";
NSString * const HMPinchEventName       = @"pinch";
NSString * const HMPanEventName         = @"pan";
NSString * const HMScrollEventName      = @"scroll";
NSString * const HMInputEventName       = @"input";
NSString * const HMSwitchEventName      = @"switch";
NSString * const HMTouchEventName       = @"touch";

@implementation HMBaseEvent

HM_EXPORT_CLASS(Event, HMBaseEvent);

HM_EXPORT_PROPERTY(type, __type, __setType:)
HM_EXPORT_PROPERTY(target, __target, __setTarget:)
HM_EXPORT_PROPERTY(timestamp, __timestamp, __setTimestamp:)

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    self = [super initWithHMValues:values];
    if(self){
        _timestamp = [[NSDate date] timeIntervalSince1970];
    }
    return self;
}

- (void)updateEvent:(UIView *)view withContext:(id)context {
    self.target = view;
}

#pragma mark - Export Method

- (NSString *)__type {
    return self.type;
}

- (void)__setType:(__unused HMBaseValue *)type {
    HMLogError(@"cannot set read only property");
}

- (HMBaseValue *)__target {
    return (HMBaseValue *)((NSObject *)self.target).hmValue;
}

- (void)__setTarget:(__unused HMBaseValue *)target {
    HMLogError(@"cannot set read only property");
}

- (NSNumber *)__timestamp {
    return @(self.timestamp);
}

- (void)__setTimestamp:(__unused HMBaseValue *)timestamp {
    HMLogError(@"cannot set read only property");
}

@end
