//
//  HMPanEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMPanEvent.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMBaseValue.h"

@interface HMPanEvent()

@property (nonatomic, assign) CGPoint previousLocation;
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

- (NSDictionary<NSString *, NSString *> *)__translation {
    return @{@"deltaX": [NSString stringWithFormat:@"%.0f", self.translation.x], @"deltaY": [NSString stringWithFormat:@"%.0f", self.translation.y]};
}

- (void)__setTranslation:(__unused HMBaseValue *)translation {
    NSAssert(NO, @"cannot set read only property");
}

- (NSNumber *)__state {
    return @(self.gesture.state);
}

- (void)__setState:(__unused HMBaseValue *)state {
    NSAssert(NO, @"cannot set read only property");
}

@end
