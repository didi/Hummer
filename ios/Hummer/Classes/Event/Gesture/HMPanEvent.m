//
//  HMPanEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMPanEvent.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "JSValue+Hummer.h"
#import "HMUtility.h"

@interface HMPanEvent()

@property (nonatomic, assign) CGPoint previousLocation;
@property (nonatomic, assign) CGPoint translation;
@property (nonatomic, strong) UIPanGestureRecognizer *gesture;

@end

@implementation HMPanEvent

HM_EXPORT_CLASS(PanEvent, HMPanEvent)

HM_EXPORT_PROPERTY(translation, __translation, __setTranslation:)
HM_EXPORT_PROPERTY(state, __state, __setState:)

- (NSString *)type {
    return HMPanEventName;
}

- (void)updateEvent:(UIView *)view withContext:(id)context {
    [super updateEvent:view withContext:context];
    self.gesture = (UIPanGestureRecognizer *)context;
    // CGPoint translation = [self.gesture translationInView:view];
    
//    CGPoint location = [self.gesture locationInView:view];
    CGPoint location = [self.gesture translationInView:view];

    if (self.gesture.state == UIGestureRecognizerStateBegan) {
        self.previousLocation = location;
        self.translation = CGPointZero;
    } else {
        self.translation = CGPointMake(location.x - self.previousLocation.x, location.y - self.previousLocation.y);
        self.previousLocation = location;
    }
}

#pragma mark - Export Method

- (JSValue *)__translation {
    NSDictionary *dict = @{@"deltaX": [NSString stringWithFormat:@"%.0f", self.translation.x],
                           @"deltaY": [NSString stringWithFormat:@"%.0f", self.translation.y]};
    return [JSValue valueWithObject:dict inContext:self.hmContext];
}

- (void)__setTranslation:(__unused JSValue *)translation {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__state {
    return [JSValue valueWithObject:@(self.gesture.state) inContext:self.hmContext];
}

- (void)__setState:(__unused JSValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

@end
