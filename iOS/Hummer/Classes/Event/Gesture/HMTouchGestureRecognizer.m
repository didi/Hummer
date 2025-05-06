//
//  HMTouchGestureRecognizer.m
//  Hummer
//
//  Created by didi on 2023/3/10.
//

#import "HMTouchGestureRecognizer.h"
#import "HMEventHandler.h"
#import "HMUtility.h"

#import <UIKit/UIGestureRecognizerSubclass.h>
// 目前指只识别单指

@interface HMTouchGestureRecognizer ()<UIGestureRecognizerDelegate>

@property (nonatomic, assign) BOOL hasBegan;
@property (nonatomic, weak) HMEventHandler *eventHandler;

@property (nonatomic, copy) NSSet *touchesCache;

@end
@implementation HMTouchGestureRecognizer
- (instancetype)init {
    return [self initWithTarget:nil action:NULL];
}

- (instancetype)initWithHandler:(HMEventHandler *)eventHandler {
    self = [super initWithTarget:nil action:NULL];
    if(self){
        self.cancelsTouchesInView = NO;
        self.delaysTouchesBegan = NO; // This is default value.
        self.delaysTouchesEnded = YES;
        _eventHandler = eventHandler;
    }
    return self;
}
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    [super touchesBegan:touches withEvent:event];
    if(self.hasBegan){
        [touches enumerateObjectsUsingBlock:^(UITouch * _Nonnull touch, BOOL * _Nonnull stop) {
            [self ignoreTouch:touch forEvent:event];
        }];
        return;
    }
    self.hasBegan = YES;
    [self fireTouchEvent:UIGestureRecognizerStateBegan withTouches:touches];

}
- (void)setState:(UIGestureRecognizerState)state {
    [super setState:state];
}
- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    [super touchesMoved:touches withEvent:event];
    [self fireTouchEvent:UIGestureRecognizerStateChanged withTouches:touches];
}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {

    [super touchesEnded:touches withEvent:event];
    self.state = UIGestureRecognizerStateEnded;
    [self fireTouchEvent:UIGestureRecognizerStateEnded withTouches:touches];
}

- (void)touchesCancelled:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    
    [super touchesCancelled:touches withEvent:event];
    self.state = UIGestureRecognizerStateCancelled;
    [self fireTouchEvent:UIGestureRecognizerStateCancelled withTouches:touches];
}

- (void)reset {
    [super reset];
    if(self.state == UIGestureRecognizerStateFailed){
        [self fireTouchEvent:UIGestureRecognizerStateCancelled withTouches:self.touchesCache];
    }
    self.hasBegan = NO;
    self.touchesCache = nil;
    self.state = UIGestureRecognizerStateEnded;
}
- (BOOL)canPreventGestureRecognizer:(UIGestureRecognizer *)preventedGestureRecognizer {
    return NO;
}

#pragma mark <js event>
- (void)fireTouchEvent:(UIGestureRecognizerState)state withTouches:(NSSet<UITouch *> *)touches
{
    double timestamp = HMTimestampMilliSeconds();
    [touches enumerateObjectsUsingBlock:^(UITouch * _Nonnull touch, BOOL * _Nonnull stop) {
        CGPoint location = [touch locationInView:self.view];
        CGPoint windowLocation = [touch locationInView:touch.window];
        NSDictionary *params = @{
                        @"type": @"touch",
                        @"state": @(state),
                        @"timestamp": @(timestamp),
                        @"position": @{
                                @"x": @(location.x),
                                @"y": @(location.y),
                                @"rawX": @(windowLocation.x),
                                @"rawY": @(windowLocation.y)
                        }
        };
        
        [self.eventHandler fireEvent:@"touch" withParams:params];
    }];
    if (touches != self.touchesCache) {
        self.touchesCache = touches;
    }
}
@end
