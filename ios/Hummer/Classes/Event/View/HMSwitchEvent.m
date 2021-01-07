//
//  HMSwitchEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMSwitchEvent.h"
#import "HMExportManager.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"

NSString * const kHMSwitchType = @"type";
NSString * const kHMSwitchState = @"state";

@interface HMSwitchEvent()

@property (nonatomic, assign) BOOL state;

@end

@implementation HMSwitchEvent

HM_EXPORT_CLASS(SwitchEvent, HMSwitchEvent)
HM_EXPORT_PROPERTY(state, __state, __setState:)

- (void)updateEvent:(UIView *)view withContext:(id)context {
    NSDictionary *dict = (NSDictionary *)context;
    self.state = [dict[kHMSwitchState] boolValue];
}

#pragma mark - Export Method

- (JSValue *)__state {
    return [JSValue valueWithObject:@(self.state) inContext:self.hmContext];
}

- (void)__setState:(__unused JSValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

@end
