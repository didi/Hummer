//
//  HMTapEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMTapEvent.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "JSValue+Hummer.h"
#import "HMUtility.h"

@interface HMTapEvent()

@property (nonatomic, assign) CGPoint position;
@property (nonatomic, strong) UITapGestureRecognizer *gesture;

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
}

#pragma mark - Export Method

- (JSValue *)__position {
    NSDictionary *dict = @{@"x": [NSString stringWithFormat:@"%.0f", self.position.x],
                           @"y": [NSString stringWithFormat:@"%.0f", self.position.y]};
    return [JSValue valueWithObject:dict inContext:self.hmContext];
}

- (void)__setPosition:(__unused JSValue *)position {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__state {
    return [JSValue valueWithObject:@(self.gesture.state) inContext:self.hmContext];
}

- (void)__setState:(__unused JSValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

@end
