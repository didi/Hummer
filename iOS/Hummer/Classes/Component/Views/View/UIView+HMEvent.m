//
//  UIView+HMEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "UIView+HMEvent.h"
#import <objc/runtime.h>
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMTapEvent.h"
#import "HMSwipeEvent.h"
#import "HMPinchEvent.h"
#import "HMLongPressEvent.h"
#import "HMJSGlobal.h"
#import "HMBaseValue.h"
#import <Hummer/HMConfigEntryManager.h>
#import <Hummer/HMEventTrackManager.h>

@import ObjectiveC.runtime;

NS_ASSUME_NONNULL_BEGIN

static IMP _Nullable swizzleImp(Class clazz, SEL fromSel, IMP toImp);

static void handleTouches(id self, NSSet<UITouch *> *touches);

static void touchesBegan(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *_Nullable event);

static void (*touchesBeganOldImpPointer)(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *_Nullable event) = NULL;

static void touchesMoved(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *_Nullable event);

static void (*touchesMovedOldImpPointer)(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *_Nullable event) = NULL;

static void touchesEnded(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *_Nullable event);

static void (*touchesEndedOldImpPointer)(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *_Nullable event) = NULL;

static void touchesCancelled(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *_Nullable event);

static void (*touchesCancelledOldImpPointer)(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *_Nullable event) = NULL;

NS_ASSUME_NONNULL_END

static void handleTouches(id self, NSSet<UITouch *> *touches) {
    if ([self isKindOfClass:UIView.class]) {
        UIView *view = self;
        [view hm_notifyTouchesWithTouches:touches];
    }
}

static void touchesBegan(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *event) {
    touchesBeganOldImpPointer ? touchesBeganOldImpPointer(self, _cmd, touches, event) : nil;
    handleTouches(self, touches);
}

static void touchesMoved(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *event) {
    touchesMovedOldImpPointer ? touchesMovedOldImpPointer(self, _cmd, touches, event) : nil;
    handleTouches(self, touches);
}

static void touchesEnded(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *event) {
    touchesEndedOldImpPointer ? touchesEndedOldImpPointer(self, _cmd, touches, event) : nil;
    handleTouches(self, touches);
}

static void touchesCancelled(id self, SEL _cmd, NSSet<UITouch *> *touches, UIEvent *event) {
    touchesCancelledOldImpPointer ? touchesCancelledOldImpPointer(self, _cmd, touches, event) : nil;
    handleTouches(self, touches);
}

static IMP swizzleImp(Class clazz, SEL fromSel, IMP toImp) {
    Method method = class_getInstanceMethod(clazz, fromSel);
    if (method) {
        IMP oldImp = NULL;
        oldImp = class_replaceMethod(clazz, fromSel, toImp, method_getTypeEncoding(method));
        if (oldImp == NULL) {
            // 方法在父类实现会导致进入这里，因此需要从 Method 拿到原先的实现
            oldImp = method_getImplementation(method);
        }
        
        return oldImp;
    } else {
        assert(false);
    }
};

@implementation UIGestureRecognizer(Hummer)

- (NSString *)hm_eventName {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_eventName:(NSString *)hm_eventName {
    objc_setAssociatedObject(self,
                             @selector(hm_eventName),
                             hm_eventName,
                             OBJC_ASSOCIATION_COPY_NONATOMIC);
}

@end

@implementation UIView(HMEvent)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        touchesBeganOldImpPointer = (void (*)(id, SEL, NSSet<UITouch *> *, UIEvent *)) swizzleImp(UIView.class, @selector(touchesBegan:withEvent:), (IMP) touchesBegan);
        touchesMovedOldImpPointer = (void (*)(id, SEL, NSSet<UITouch *> *, UIEvent *)) swizzleImp(UIView.class, @selector(touchesMoved:withEvent:), (IMP) touchesMoved);
        touchesEndedOldImpPointer = (void (*)(id, SEL, NSSet<UITouch *> *, UIEvent *)) swizzleImp(UIView.class, @selector(touchesEnded:withEvent:), (IMP) touchesEnded);
        touchesCancelledOldImpPointer = (void (*)(id, SEL, NSSet<UITouch *> *, UIEvent *)) swizzleImp(UIView.class, @selector(touchesCancelled:withEvent:), (IMP) touchesCancelled);
    });
}

HM_EXPORT_METHOD(addEventListener, hm_addEvent:withListener:)
HM_EXPORT_METHOD(removeEventListener, hm_removeEvent:withListener:)

- (NSMutableDictionary<NSString *, NSMutableArray<HMBaseValue *> *> *)hm_eventTable {
    NSMutableDictionary<NSString *, NSMutableArray<HMBaseValue *> *> *eventTable = objc_getAssociatedObject(self, _cmd);
    if(!eventTable){
        eventTable = [NSMutableDictionary dictionary];
        objc_setAssociatedObject(self, _cmd, eventTable, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    return eventTable;
}

- (NSMutableDictionary *)hm_eventGestureTable {
    NSMutableDictionary *eventGestureTable = objc_getAssociatedObject(self, _cmd);
    if(!eventGestureTable){
        eventGestureTable = [NSMutableDictionary dictionary];
        objc_setAssociatedObject(self, _cmd, eventGestureTable, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    return eventGestureTable;
}

- (HMBaseEvent *)hm_eventObj
{
    HMBaseEvent *eventObj = objc_getAssociatedObject(self, @"hm_eventObj");
    return eventObj;
}

- (void)setHm_eventObj:(HMBaseEvent *)hm_eventObj
{
    objc_setAssociatedObject(self, @"hm_eventObj", hm_eventObj, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (BOOL)hm_isGestureEventName:(NSString *)eventName {
    return ([eventName isEqualToString:HMTapEventName] ||
            [eventName isEqualToString:HMLongPressEventName] ||
            [eventName isEqualToString:HMSwipeEventName] ||
            [eventName isEqualToString:HMPinchEventName] ||
            [eventName isEqualToString:HMPanEventName]);
}

- (__unsafe_unretained Class)hm_eventClassWithGesture:(UIGestureRecognizer *)gesture {
    if ([gesture isKindOfClass:[UITapGestureRecognizer class]]) {
        return [HMTapEvent class];
    } else if ([gesture isKindOfClass:[UISwipeGestureRecognizer class]]) {
        return [HMSwipeEvent class];
    } else if ([gesture isKindOfClass:[UIPinchGestureRecognizer class]]) {
        return [HMPinchEvent class];
    } else if ([gesture isKindOfClass:[UIPanGestureRecognizer class]]) {
        return [HMPanEvent class];
    } else if ([gesture isKindOfClass:[UILongPressGestureRecognizer class]]) {
        return [HMLongPressEvent class];
    }
    
    return [HMBaseEvent class];
}

- (__unsafe_unretained Class)hm_gestureClassForEvent:(NSString *)eventName {
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
    }
    
    HMAssert(NO, @"event:[%@] is not a gesture", eventName);
    return nil;
}

- (void)hm_onEventGesture:(UIGestureRecognizer *)gesture {
    if (gesture.hm_eventName.length == 0) {
        return;
    }
    NSMutableArray<HMBaseValue *> *callbackArray = [self hm_gestureCallbacksForEvent:gesture.hm_eventName];
    if (callbackArray.count == 0) {
        return;
    }
    
    HMJSContext *context = [[HMJSGlobal globalObject] currentContext:self.hmContext];
    [HMEventTrackManager trackWithGesture:gesture namespace:context.nameSpace];

    NSTimeInterval timestamp = floor(NSDate.date.timeIntervalSince1970) * 1000;
    CGPoint location = [gesture locationInView:gesture.view];
    if ([gesture isKindOfClass:UITapGestureRecognizer.class]) {
        [callbackArray enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            [obj callWithArguments:@[@{
                                         @"type": @"tap",
                                         @"state": @(UIGestureRecognizerStateEnded),
                                         @"timestamp": @(timestamp),
                                         @"position": @{
                                                 @"x": @(location.x),
                                                 @"y": @(location.y)
                                         }
            }]];
        }];
        
        return;
    } else if ([gesture isKindOfClass:UILongPressGestureRecognizer.class]) {
        if (gesture.state != UIGestureRecognizerStateBegan) {
            // 只有 end 才会回调
            return;
        }
        CGPoint location = [gesture locationInView:gesture.view];
        [callbackArray enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            [obj callWithArguments:@[@{
                                         @"type": @"longPress",
                                         @"state": @(UIGestureRecognizerStateBegan),
                                         @"timestamp": @(timestamp),
                                         @"position": @{
                                                 @"x": @(location.x),
                                                 @"y": @(location.y)
                                         }
            }]];
        }];
        
        return;
    }
    if (!self.hm_eventObj) {
        Class objcClass = [self hm_eventClassWithGesture:gesture];
        // 时间戳为 0
        self.hm_eventObj = [[objcClass alloc] init];
    }
    [self.hm_eventObj updateEvent:self withContext:gesture];
    
    [callbackArray enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if ([self.hm_eventObj isKindOfClass:HMPanEvent.class]) {
            // pan 事件特殊处理转成字典
            [obj callWithArguments:@[@{
                                         @"type": @"pan",
                                         @"state": @(gesture.state),
                                         @"timestamp": @(timestamp),
                                         @"translation": @{
                                                 @"deltaX": @(((HMPanEvent *) self.hm_eventObj).translation.x),
                                                 @"deltaY": @(((HMPanEvent *) self.hm_eventObj).translation.y)
                                         }
            }]];
        } else {
            [obj callWithArguments:@[self.hm_eventObj]];
        }
    }];
}

- (NSMutableArray<HMBaseValue *> *)hm_gestureCallbacksForEvent:(NSString *)eventName {
    if (!eventName) return nil;
    NSMutableArray *gestureCallbacks = [self.hm_eventTable objectForKey:eventName];
    if (!gestureCallbacks) {
        gestureCallbacks = [[NSMutableArray alloc] init];
        [self.hm_eventTable setObject:gestureCallbacks forKey:eventName];
    }
    return gestureCallbacks;
}

- (NSMutableArray *)hm_gestureRecognizersForEvent:(NSString *)eventName {
    if (!eventName) return nil;
    NSMutableArray *gestureRecognizers = [self.hm_eventGestureTable objectForKey:eventName];
    if (!gestureRecognizers) {
        gestureRecognizers = [[NSMutableArray alloc] init];
        [self.hm_eventGestureTable setObject:gestureRecognizers forKey:eventName];
    }
    return gestureRecognizers;
}

- (NSMutableArray<HMBaseValue *> *)hm_listenerArrayForEvent:(NSString *)eventName {
    if (!eventName) return nil;
    NSMutableArray *array = [self.hm_eventTable objectForKey:eventName];
    if (!array) {
        array = [NSMutableArray array];
        [self.hm_eventTable setObject:array forKey:eventName];
    }
    return array;
}

- (BOOL)hm_hasListenerForEvent:(NSString *)eventName {
    NSMutableArray<HMBaseValue *> *array = [self.hm_eventTable objectForKey:eventName];
    
    return array.count > 0;
}

- (void)hm_notifyWithEventName:(NSString *)eventName argument:(nullable id)argument {
    if (![self hm_isGestureEventName:eventName]) {
        NSArray<HMBaseValue *> *listenerArray = [self hm_listenerArrayForEvent:eventName];
        [listenerArray enumerateObjectsUsingBlock:^(HMBaseValue *obj, NSUInteger idx, BOOL *stop) {
            if (argument) {
                [obj callWithArguments:@[argument]];
            } else {
                [obj callWithArguments:@[]];
            }
        }];
    } else {
        NSAssert(NO, @"手势事件不应当使用该方法发起通知");
    }
}

- (void)hm_notifyTouchesWithTouches:(NSSet<UITouch *> *)touches {
    // 优化处理，防止所有视图都创建一次数组
    if (![self hm_hasListenerForEvent:HMTouchEventName]) {
        return;
    }
    [touches enumerateObjectsUsingBlock:^(UITouch *obj, BOOL *stop) {
        // 可用 1:began, 2:changed, 3:ended, 4:cancelled
        int state = 0;
        switch (obj.phase) {
            case UITouchPhaseBegan:
                state = 1;
                break;
            case UITouchPhaseMoved:
                state = 2;
                break;
            case UITouchPhaseEnded:
                state = 3;
                break;
            case UITouchPhaseCancelled:
                state = 4;
                break;

            default:
                break;
        }
        if (state == 0) {
            return;
        }
        CGPoint windowLocation = [obj locationInView:nil];
        CGPoint location = [obj locationInView:obj.view];
        [self hm_notifyWithEventName:HMTouchEventName argument:@{
                @"type": HMTouchEventName,
                @"state": @(state),
                @"timestamp": @(([[[NSDate alloc] init] timeIntervalSince1970] - NSProcessInfo.processInfo.systemUptime + obj.timestamp) * 1000),
                @"position": @{
                        @"x": @(location.x),
                        @"y": @(location.y),
                        @"rawX": @(windowLocation.x),
                        @"rawY": @(windowLocation.y)
                }
        }];
    }];
}

- (void)hm_notifyEvent:(NSString *)eventName
             withValue:(HMBaseEvent *)value
          withArgument:(id)argument {
    if (!eventName) return;
    // 虽然传入了 value，但是新架构已经不在使用，而是直接传入 Map 作为参数，新事件建议不需要再继承 HMBaseEvent
    if (!self.hm_eventObj) {
        self.hm_eventObj = value;
    }
    [self.hm_eventObj updateEvent:self withContext:argument];
    
    BOOL isNotGestureEvent = ![self hm_isGestureEventName:eventName];
    NSAssert(isNotGestureEvent, @"gesture event should not notify via this methods");
    if (!isNotGestureEvent) {
        return;
    }
    
    NSMutableArray<HMBaseValue *> *array = [self hm_listenerArrayForEvent:eventName];
    for (HMBaseValue *listener in array) {
        [listener callWithArguments:(argument ? @[argument] : @[])];
    }
}

#pragma mark - Export Method

- (void)hm_addEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener {
    if (!eventName || !listener) return;
    
    NSString *nameStr = [eventName toString];
    if ([self hm_isGestureEventName:nameStr]) {
        Class clazz = [self hm_gestureClassForEvent:nameStr];
        if (!clazz) return;
        
        if ([clazz isEqual:[UISwipeGestureRecognizer class]]) {
            NSArray *directions = @[@(UISwipeGestureRecognizerDirectionRight),
                                    @(UISwipeGestureRecognizerDirectionLeft),
                                    @(UISwipeGestureRecognizerDirectionUp),
                                    @(UISwipeGestureRecognizerDirectionDown),];
            for (NSInteger i = 0; i < directions.count; i++) {
                UISwipeGestureRecognizerDirection direction = [directions[i] integerValue];
                UISwipeGestureRecognizer *swipe = [[UISwipeGestureRecognizer alloc] initWithTarget:self
                                                                                            action:@selector(hm_onEventGesture:)];
                swipe.direction = direction;
                swipe.hm_eventName = nameStr;
                [self addGestureRecognizer:swipe];
                
                NSMutableArray *recognizers = [self hm_gestureRecognizersForEvent:nameStr];
                [recognizers addObject:swipe];
            }
        } else {
            UIGestureRecognizer *gesture = [[clazz alloc] initWithTarget:self
                                                                  action:@selector(hm_onEventGesture:)];
            gesture.hm_eventName  = nameStr;
            [self addGestureRecognizer:gesture];
            
            NSMutableArray *recognizers = [self hm_gestureRecognizersForEvent:nameStr];
            [recognizers addObject:gesture];
        }
        
        NSMutableArray<HMBaseValue *> *callbacks = [self hm_gestureCallbacksForEvent:nameStr];
        [callbacks addObject:listener];
    } else {
        NSMutableArray<HMBaseValue *> *array = [self hm_listenerArrayForEvent:nameStr];
        [array addObject:listener];
    }
}

- (void)hm_removeEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener {
    if (!eventName) return;
    NSString *nameStr = [eventName toString];
    if ([self hm_isGestureEventName:nameStr]) {
        NSMutableArray<HMBaseValue *> *callbacks = [self hm_gestureCallbacksForEvent:nameStr];
        if (listener && !listener.isNull) {
            // remove a specific listener
            NSUInteger index = NSNotFound;
            for (int i = 0; i < callbacks.count; i++) {
                HMBaseValue *callback = callbacks[i];
                if ([listener isEqualToObject:callback]) {
                    index = i;
                    break;
                }
            }
            if (index != NSNotFound) {
                [callbacks removeObjectAtIndex:index];
            }
        } else {
            // remove all listeners
            [callbacks removeAllObjects];
        }
        if (callbacks.count == 0) {
            [self.hm_eventTable removeObjectForKey:nameStr];
            NSMutableArray *recognizers = [self hm_gestureRecognizersForEvent:nameStr];
            [recognizers enumerateObjectsUsingBlock:^(UIGestureRecognizer * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                [self removeGestureRecognizer:obj];
            }];
            [self.hm_eventGestureTable removeObjectForKey:nameStr];
        }
    } else {
        if (listener && !listener.isNull) {
            // remove a specific listener
            NSMutableArray<HMBaseValue *> *array = [self hm_listenerArrayForEvent:nameStr];
            __block NSUInteger index = NSNotFound;
            [array enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                if ([obj isEqualToObject:listener]) {
                    index = idx;
                    *stop = YES;
                }
            }];
            if (index != NSNotFound) {
                [array removeObjectAtIndex:index];
            }
        } else {
            // remove all listeners
            NSMutableArray<HMBaseValue *> *array = [self hm_listenerArrayForEvent:nameStr];
            [array removeAllObjects];
            [self.hm_eventTable removeObjectForKey:nameStr];
        }
    }
}

@end
