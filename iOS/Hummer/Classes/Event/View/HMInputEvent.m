//
//  HMInputEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMInputEvent.h"
#import "HMExportManager.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"


NSString * const kHMInputType = @"type";
NSString * const kHMInputState = @"state";
NSString * const kHMInputText = @"text";

@interface HMInputEvent()

@property (nonatomic, assign) NSInteger state;
@property (nonatomic, strong) NSString *text;

@end

@implementation HMInputEvent

HM_EXPORT_CLASS(InputEvent, HMInputEvent)

HM_EXPORT_PROPERTY(text, __text, __setText:)
HM_EXPORT_PROPERTY(state, __state, __setState:)

- (void)updateEvent:(UIView *)view withContext:(id)context {
    NSDictionary *dict = (NSDictionary *)context;
    self.state = [dict[kHMInputState] integerValue];
    self.text = dict[kHMInputText];
}

#pragma mark - Export Method

- (JSValue *)__state {
    return [JSValue valueWithObject:@(self.state) inContext:self.hmContext];
}

- (void)__setState:(__unused JSValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__text {
    return [JSValue valueWithObject:self.text ?:@"" inContext:self.hmContext];
}

- (void)__setText:(__unused JSValue *)text {
    NSAssert(NO, @"cannot set read only property");
}

@end
