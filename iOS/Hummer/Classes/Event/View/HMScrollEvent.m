//
//  HMScrollEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMScrollEvent.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMBaseValue.h"

NSString * const kHMScrollState     = @"state";
NSString * const kHMScrollDeltaX    = @"dx";
NSString * const kHMScrollDeltaY    = @"dy";
NSString * const kHMScrollOffsetX   = @"offsetX";
NSString * const kHMScrollOffsetY   = @"offsetY";

@interface HMScrollEvent()
@property (nonatomic, assign) NSInteger state;
@property (nonatomic, assign) CGFloat deltaX;
@property (nonatomic, assign) CGFloat deltaY;
@property (nonatomic, assign) CGFloat offsetx;
@property (nonatomic, assign) CGFloat offsety;
@end

@implementation HMScrollEvent

HM_EXPORT_CLASS(ScrollEvent, HMScrollEvent)

HM_EXPORT_PROPERTY(dx, __deltaX, __setDeltaX:)
HM_EXPORT_PROPERTY(dy, __deltaY, __setDeltaY:)
HM_EXPORT_PROPERTY(offsetx, __offsetx, __setOffsetx:)
HM_EXPORT_PROPERTY(offsety, __offsety, __setOffsety:)
HM_EXPORT_PROPERTY(state, __state, __setState:)

- (void)updateEvent:(UIView *)view withContext:(id)context {
    NSDictionary *dict = (NSDictionary *)context;
    self.state = [dict[kHMScrollState] integerValue];
    self.deltaX = [dict[kHMScrollDeltaX] floatValue];
    self.deltaY = [dict[kHMScrollDeltaY] floatValue];
    self.offsetx = [dict[kHMScrollOffsetX] floatValue];
    self.offsety = [dict[kHMScrollOffsetY] floatValue];
}

#pragma mark - Export Method

- (NSNumber *)__state {
    return @(self.state);
}

- (void)__setState:(__unused HMBaseValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

- (NSNumber *)__deltaX {
    return @(self.deltaX);
}

- (void)__setDeltaX:(__unused HMBaseValue *)deltaX {
    NSAssert(NO, @"cannot set read only property");
}

- (NSNumber *)__deltaY {
    return @(self.deltaY);
}

- (void)__setDeltaY:(__unused HMBaseValue *)deltaY {
    NSAssert(NO, @"cannot set read only property");
}

- (NSNumber *)__offsetx {
    return @(self.offsetx);
}

- (void)__setOffsetx:(__unused HMBaseValue *)deltaX {
    NSAssert(NO, @"cannot set read only property");
}

- (NSNumber *)__offsety {
    return @(self.offsety);
}

- (void)__setOffsety:(__unused HMBaseValue *)deltaY {
    NSAssert(NO, @"cannot set read only property");
}

@end
