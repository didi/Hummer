//
//  HMNotifyCenter.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMNotifyCenter.h"
#import "HMExportManager.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"

@interface HMNotifyCenter()

@property (nonatomic, strong) NSMutableDictionary *eventCallbackMap;
@end

@implementation HMNotifyCenter

HM_EXPORT_CLASS(NotifyCenter, HMNotifyCenter)

HM_EXPORT_METHOD(addEventListener, addEvent:callback:)
HM_EXPORT_METHOD(removeEventListener, removeEvent:callback:)
HM_EXPORT_METHOD(triggerEvent, postEvent:object:)

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _eventCallbackMap = [[NSMutableDictionary alloc] init];
    }
    return self;
}

#pragma mark - Export Method

- (void)removeEvent:(JSValue *)value callback:(JSValue *)callback {
    if (!value)  {
        return;
    }
    NSString *name = value.toString;
    if (![name isKindOfClass:[NSString class]]) {
        return;
    }
    NSMutableArray *callbacks = self.eventCallbackMap[name];
    if (!callback) {
        // remove all listener
        [callbacks removeAllObjects];
        [self.eventCallbackMap removeObjectForKey:name];
    } else {
        // try to remove a specific listener
        __block JSManagedValue *targetValue = nil;
        [callbacks enumerateObjectsUsingBlock:^(JSManagedValue *_Nonnull obj,
                                                NSUInteger idx,
                                                BOOL * _Nonnull stop) {
            if ([obj.value isEqual:callback]) {
                targetValue = obj;
                *stop = YES;
            }
        }];
        if (targetValue) {
            [callbacks removeObject:targetValue];
        }
    }
    if (callbacks.count == 0) {
        self.eventCallbackMap[name] = nil;
        [[NSNotificationCenter defaultCenter] removeObserver:self
                                                        name:name
                                                      object:nil];
    }
}

- (void)addEvent:(JSValue *)value callback:(JSValue *)callback {
    if (!value || !callback)  { return; }
    NSString *name = value.toString;
    if (![name isKindOfClass:[NSString class]]) {
        return;
    }
    [callback hm_retainedJSValue];
    NSMutableArray *callbacks = self.eventCallbackMap[name];
    
    if (!callbacks) {
        callbacks = [[NSMutableArray alloc] init];
        self.eventCallbackMap[name] = callbacks;
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(notify:)
                                                     name:name
                                                   object:nil];
    }
    JSManagedValue *callbackValue = [JSManagedValue managedValueWithValue:callback];
    [callbacks addObject:callbackValue];
}

- (void)postEvent:(JSValue *)value object:(JSValue *)valueObjc {
    NSString *name = value.toString;
    [[NSNotificationCenter defaultCenter] postNotificationName:name
                                                        object:valueObjc
                                                      userInfo:nil];
}

- (void)notify:(NSNotification *)center {
    if (!self.hmContext) {
        return;
    }
    NSString *name = center.name;
    NSArray *callbacks = [self.eventCallbackMap[name] copy];
    id notificationObject = center.object;
    if ([notificationObject isKindOfClass:JSValue.class]) {
        // 通知有可能是其他页面传入的，如果不做判断，callWithArguments: 会导致崩溃，因为不同的虚拟机之间不能传递值
        JSValue *notificationValue = notificationObject;
        if (notificationValue.context.virtualMachine != self.hmContext.virtualMachine) {
            // 需要复制转换
            // 因此不能支持复制 OBJC 对象
            if (notificationValue.isObject) {
                id object = notificationValue.toObject;
                if ([object isKindOfClass:NSDictionary.class]) {
                    object = ((NSDictionary *) object).copy;
                }
                notificationObject = [JSValue valueWithObject:object inContext:self.hmContext];
            } else if (notificationValue.isDate) {
                notificationObject = [JSValue valueWithObject:notificationValue.toDate.copy inContext:self.hmContext];
            } else if (notificationValue.isNull) {
                notificationObject = [JSValue valueWithNullInContext:self.hmContext];
            } else if (notificationValue.isBoolean) {
                notificationObject = [JSValue valueWithBool:notificationValue.toBool inContext:self.hmContext];
            } else if (notificationValue.isArray) {
                notificationObject = [JSValue valueWithObject:notificationValue.toArray.copy inContext:self.hmContext];
            } else if (notificationValue.isNumber) {
                notificationObject = [JSValue valueWithObject:notificationValue.toNumber.copy inContext:self.hmContext];
            } else if (notificationValue.isString) {
                notificationObject = [JSValue valueWithObject:notificationValue.toString.copy inContext:self.hmContext];
            } else if (notificationValue.isUndefined) {
                notificationObject = [JSValue valueWithUndefinedInContext:self.hmContext];
            } else {
                notificationObject = nil;
            }
        }
    }
    [callbacks enumerateObjectsUsingBlock:^(JSManagedValue * _Nonnull callbackValue,
                                            NSUInteger idx,
                                            BOOL * _Nonnull stop) {
        NSArray *arguments = notificationObject ? @[notificationObject] : @[];
        JSValue *callback = callbackValue.value;
        [callback callWithArguments:arguments];
    }];
}

@end
