//
//  HMLongPressEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMLongPressEvent.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMBaseValue.h"

@interface HMLongPressEvent()

@property (nonatomic, strong) UILongPressGestureRecognizer *gesture;

@end

@implementation HMLongPressEvent

HM_EXPORT_CLASS(LongPressEvent, HMLongPressEvent)

HM_EXPORT_PROPERTY(state, __state, __setState:)

- (NSString *)type {
    return HMLongPressEventName;
}

- (void)updateEvent:(UIView *)view withContext:(id)context {
    [super updateEvent:view withContext:context];
    self.gesture = (UILongPressGestureRecognizer *)context;
}

#pragma mark - Export Method

- (NSNumber *)__state {
    return @(self.gesture.state);
}

- (void)__setState:(__unused HMBaseValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

@end
