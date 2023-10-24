//
//  HMEventHandler.m
//  Hummer
//
//  Created by didi on 2023/3/13.
//

#import "HMEventHandler.h"
#import "HMUtility.h"
#import "HMTouchGestureRecognizer.h"
#import "UIView+HMEvent.h"
#import "HMEventDefines.h"

#import <objc/runtime.h>

@interface UIPanGestureRecognizer (HMEvent)

@property (nonatomic, assign) CGPoint hm_preLocation;
@end

@implementation UIPanGestureRecognizer (HMEvent)
- (void)setHm_preLocation:(CGPoint)hm_preLocation {
    objc_setAssociatedObject(self, @selector(hm_preLocation), [NSValue valueWithCGPoint:hm_preLocation], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CGPoint)hm_preLocation {
    NSValue *ptr = objc_getAssociatedObject(self, _cmd);
    if(ptr){
        return [ptr CGPointValue];
    }
    return CGPointZero;
}
@end

@interface HMEventHandler()<UIGestureRecognizerDelegate>

@property (nonatomic, weak, readwrite) UIView *view;
@property (nonatomic, strong, readwrite) NSMutableDictionary<NSString *, NSMutableArray<HMBaseValue *> *> *eventTable;

@property (nonatomic, strong) HMTouchGestureRecognizer *touch;
@property (nonatomic, strong) UITapGestureRecognizer *tap;
@property (nonatomic, strong) UILongPressGestureRecognizer *longPress;
@property (nonatomic, strong) UIPanGestureRecognizer *pan;
@property (nonatomic, strong) NSMutableArray <UISwipeGestureRecognizer *> *swipes;
@property (nonatomic, strong) UIPinchGestureRecognizer *pinch;


@end

@implementation HMEventHandler
- (instancetype)initWithView:(UIView *)view {
    self = [super init];
    if(self){
        _view = view;
        _eventTable = [NSMutableDictionary new];
    }
    return self;
}
- (void)addJSEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener {
    NSString *eventNameStr = eventName.toString;
    if([self isValid:eventNameStr] && listener.isFunction){
        NSMutableArray *listeners = self.eventTable[eventNameStr];
        if(listeners == nil){
            listeners = [NSMutableArray new];
            [self.eventTable setObject:listeners forKey:eventNameStr];
            [self createGestureRecognizerIfNeeded:eventNameStr];
        }
        [listeners addObject:listener];
    }
}

- (void)removeJSEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener {
    
    NSString *eventNameStr = eventName.toString;
    if([self isValid:eventNameStr] == NO){
        return;
    }
    HMFunctionType callback = listener.toFunction;
    if(callback == nil){
        // remove all listenters
        [self.eventTable removeObjectForKey:eventNameStr];
        [self removeGestureRecognizerIfNeeded:eventNameStr];
    }else{
        // remove specific listenter
        NSMutableArray *listeners = self.eventTable[eventNameStr];
        NSMutableArray *toBeDeleted = [NSMutableArray new];
        [listeners enumerateObjectsUsingBlock:^(HMBaseValue *obj, NSUInteger idx, BOOL * _Nonnull stop) {
            if ([listener isEqualToObject:obj]) {
                [toBeDeleted addObject:obj];
            }
        }];
        [toBeDeleted enumerateObjectsUsingBlock:^(HMBaseValue *obj, NSUInteger idx, BOOL * _Nonnull stop) {
            [listeners removeObject:obj];
        }];
        if(listeners.count <= 0){
            [self.eventTable removeObjectForKey:eventNameStr];
            [self removeGestureRecognizerIfNeeded:eventNameStr];
        }
    }
}

- (void)fireEvent:(NSString *)eventName withParams:(NSDictionary *)params{
    
    NSMutableDictionary *_params = [NSMutableDictionary dictionaryWithDictionary:params?params:@{}];
    double timestamp = HMTimestampMilliSeconds();
    UIView *strongView = self.view;
    if(strongView == nil){return;}
    [_params setObject:strongView forKey:@"target"];
    [_params setObject:@(timestamp) forKey:@"timestamp"];
    NSMutableArray *listeners = self.eventTable[eventName];
    [listeners enumerateObjectsUsingBlock:^(HMBaseValue *listener, NSUInteger idx, BOOL * _Nonnull stop) {
        [listener callWithArguments:@[_params]];
    }];
}

#pragma mark <UIGestureRecognizerDelegate>
//- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer {
//    return NO;
//}
#pragma mark <gestureRecognizer - sel>
- (void)onTap:(UITapGestureRecognizer *)gestureRecognizer {
    CGPoint location = [gestureRecognizer locationInView:gestureRecognizer.view];
    NSDictionary *params = @{
        @"type": @"tap",
        @"state": @(3),//UIGestureRecognizerStateEnded
        @"position": @{
            @"x": @(location.x),
            @"y": @(location.y)
        }
    };
    [self fireEvent:HMTapEventName withParams:params];
}

- (void)onLongPress:(UILongPressGestureRecognizer *)gestureRecognizer {
    CGPoint location = [gestureRecognizer locationInView:gestureRecognizer.view];
    
    //维持老逻辑，只有 end 才会回调
    if (gestureRecognizer.state == UIGestureRecognizerStateEnded) {
        NSDictionary *params = @{
            @"type": @"longPress",
            @"state": @(1),//UIGestureRecognizerStateBegan
            @"position": @{
                @"x": @(location.x),
                @"y": @(location.y)
            }
        };
        [self fireEvent:HMLongPressEventName withParams:params];
    }
}

- (void)onPan:(UIPanGestureRecognizer *)gestureRecognizer {
    CGPoint location = [gestureRecognizer translationInView:gestureRecognizer.view];
    CGPoint translation = CGPointZero;
    CGPoint previousLocation = gestureRecognizer.hm_preLocation;
    if(gestureRecognizer.state != UIGestureRecognizerStateBegan){
        translation = CGPointMake(location.x - previousLocation.x, location.y - previousLocation.y);
    }
    NSDictionary *params = @{
        @"type": @"pan",
        @"state": @(gestureRecognizer.state),
        @"translation": @{
            @"deltaX": @(translation.x),
            @"deltaY": @(translation.y)
        }
    };
    gestureRecognizer.hm_preLocation = location;
    [self fireEvent:HMPanEventName withParams:params];
}

- (void)onSwipe:(UISwipeGestureRecognizer *)gestureRecognizer {
    
    NSDictionary *params = @{
        @"type": @"pinch",
        @"state": @(gestureRecognizer.state),//UIGestureRecognizerStateBegan
        @"direction": @(gestureRecognizer.direction)
    };
    [self fireEvent:HMSwipeEventName withParams:params];
}

- (void)onPinch:(UIPinchGestureRecognizer *)gestureRecognizer {
    NSDictionary *params = @{
        @"type": @"pinch",
        @"state": @(gestureRecognizer.state),//UIGestureRecognizerStateBegan
        @"scale": @(gestureRecognizer.scale)
    };
    [self fireEvent:HMPinchEventName withParams:params];
}

#pragma mark <private>
- (void)createGestureRecognizerIfNeeded:(NSString *)eventName {
    if([self isGestureEventName:eventName] == NO){
        return;
    }
    if([eventName isEqualToString:HMTouchEventName]){
        self.touch = [[HMTouchGestureRecognizer alloc] initWithHandler:self];
//        self.touch.delegate = self;
        [self.view addGestureRecognizer:self.touch];
    }else if([eventName isEqualToString:HMTapEventName]){
        
        self.tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(onTap:)];
//        self.tap.delegate = self;
        [self.view addGestureRecognizer:self.tap];
    }else if([eventName isEqualToString:HMLongPressEventName]){
        
        self.longPress = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(onLongPress:)];
        self.longPress.delegate = self;
        [self.view addGestureRecognizer:self.longPress];
    }else if([eventName isEqualToString:HMPanEventName]){
        
        self.pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(onPan:)];
//        self.pan.delegate = self;
        [self.view addGestureRecognizer:self.pan];
    }else if([eventName isEqualToString:HMSwipeEventName]){
        self.swipes = [NSMutableArray new];
        NSArray *directions = @[@(UISwipeGestureRecognizerDirectionRight),
                                @(UISwipeGestureRecognizerDirectionLeft),
                                @(UISwipeGestureRecognizerDirectionUp),
                                @(UISwipeGestureRecognizerDirectionDown),];
        for (NSInteger i = 0; i < directions.count; i++) {
            UISwipeGestureRecognizerDirection direction = [directions[i] integerValue];
            UISwipeGestureRecognizer *swipe = [[UISwipeGestureRecognizer alloc] initWithTarget:self
                                                                                        action:@selector(onSwipe:)];
            swipe.direction = direction;
            [self.view addGestureRecognizer:swipe];
            [self.swipes addObject:swipe];
        }
    }else if([eventName isEqualToString:HMPinchEventName]){
        
        self.pinch = [[UIPinchGestureRecognizer alloc] initWithTarget:self action:@selector(onPinch:)];
//        self.pinch.delegate = self;
        [self.view addGestureRecognizer:self.pinch];
    }
}

- (void)removeGestureRecognizerIfNeeded:(NSString *)eventName {
    if([self isGestureEventName:eventName] == NO){
        return;
    }
    if([eventName isEqualToString:HMTouchEventName]){
        [self.view removeGestureRecognizer:self.touch];
        self.touch.delegate = nil;
        self.touch = nil;
    }else if([eventName isEqualToString:HMTapEventName]){
        
        [self.view removeGestureRecognizer:self.tap];
        self.tap.delegate = nil;
        self.tap = nil;
    }else if([eventName isEqualToString:HMLongPressEventName]){
        
        [self.view removeGestureRecognizer:self.longPress];
        self.longPress.delegate = nil;
        self.longPress = nil;
    }else if([eventName isEqualToString:HMPanEventName]){
        
        [self.view removeGestureRecognizer:self.pan];
        self.pan.delegate = nil;
        self.pan = nil;
    }else if([eventName isEqualToString:HMSwipeEventName]){
        for (UISwipeGestureRecognizer *swipe in self.swipes) {
            [self.view removeGestureRecognizer:swipe];
        }
        self.swipes = nil;
    }else if([eventName isEqualToString:HMPinchEventName]){
        
        [self.view removeGestureRecognizer:self.pinch];
        self.pinch.delegate = nil;
        self.pinch = nil;
    }
}

- (BOOL)isGestureEventName:(NSString *)eventName {
    return ([eventName isEqualToString:HMTouchEventName] ||
            [eventName isEqualToString:HMTapEventName] ||
            [eventName isEqualToString:HMLongPressEventName] ||
            [eventName isEqualToString:HMSwipeEventName] ||
            [eventName isEqualToString:HMPinchEventName] ||
            [eventName isEqualToString:HMPanEventName]);
}

- (__unsafe_unretained Class)gestureClassForEvent:(NSString *)eventName {
    if ([eventName isEqualToString:HMTapEventName]) {
        return [UITapGestureRecognizer class];
    } else if ([eventName isEqualToString:HMLongPressEventName]) {
        return [UILongPressGestureRecognizer class];
    } else if ([eventName isEqualToString:HMSwipeEventName]) {
        return [UISwipeGestureRecognizer class];
    } else if ([eventName isEqualToString:HMPinchEventName]) {
        return [UIPinchGestureRecognizer class];
    } else if ([eventName isEqualToString:HMPanEventName]) {
        return [UIPanGestureRecognizer class];
    } else if ([eventName isEqualToString:HMTouchEventName]) {
        return [HMTouchGestureRecognizer class];
    }
    HMAssert(NO, @"event:[%@] is not a gesture", eventName);
    return nil;
}


- (BOOL)isValid:(NSString *)eventName {
    bool isValid = ([eventName isEqualToString:HMTouchEventName] ||
                    [eventName isEqualToString:HMTapEventName] ||
                    [eventName isEqualToString:HMLongPressEventName] ||
                    [eventName isEqualToString:HMPanEventName] ||
                    [eventName isEqualToString:HMSwipeEventName] ||
                    [eventName isEqualToString:HMPinchEventName] ||
                    [eventName isEqualToString:HMSwitchEventName] ||
                    [eventName isEqualToString:HMInputEventName] ||
                    [eventName isEqualToString:HMScrollEventName]);
    if(!isValid){
        HMLogDebug(@"event:[%@] is not a event", eventName);
    }
    return isValid;
}
@end
