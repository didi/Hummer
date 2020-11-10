//
//  HMInputEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMInputEvent.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMBaseValue.h"

NSString * const kHMInputType = @"type";
NSString * const kHMInputState = @"state";
NSString * const kHMInputText = @"text";

@interface HMInputEvent()

@property (nonatomic, assign) NSInteger state;
@property (nonatomic, copy, nullable) NSString *text;

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

- (NSNumber *)__state {
    return @(self.state);
}

- (void)__setState:(__unused HMBaseValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

- (NSString *)__text {
    // 引擎分离架构改造的时候将这里变成了 nullable
    return self.text;
}

- (void)__setText:(__unused HMBaseValue *)text {
    NSAssert(NO, @"cannot set read only property");
}

@end
