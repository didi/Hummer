//
//  HMScrollEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMScrollEvent.h"
#import "HMExportManager.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"

NSString * const kHMScrollState     = @"state";
NSString * const kHMScrollDeltaX    = @"deltaX";
NSString * const kHMScrollDeltaY    = @"deltaY";
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

- (JSValue *)__state {
    return [JSValue valueWithObject:@(self.state) inContext:self.hmContext];
}

- (void)__setState:(__unused JSValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__deltaX {
    return [JSValue valueWithDouble:self.deltaX inContext:self.hmContext];
}

- (void)__setDeltaX:(__unused JSValue *)deltaX {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__deltaY {
    return [JSValue valueWithDouble:self.deltaY inContext:self.hmContext];
}

- (void)__setDeltaY:(__unused JSValue *)deltaY {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__offsetx {
    return [JSValue valueWithDouble:self.offsetx inContext:self.hmContext];
}

- (void)__setOffsetx:(__unused JSValue *)deltaX {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__offsety {
    return [JSValue valueWithDouble:self.offsety inContext:self.hmContext];
}

- (void)__setOffsety:(__unused JSValue *)deltaY {
    NSAssert(NO, @"cannot set read only property");
}

@end
