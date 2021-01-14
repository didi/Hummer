//
//  HMNotifyCenter.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMNotifyCenter.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import <Hummer/HMBaseValue.h>

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

- (void)removeEvent:(HMBaseValue *)value callback:(HMBaseValue *)callback {
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
        __block HMBaseValue *targetValue = nil;
        [callbacks enumerateObjectsUsingBlock:^(HMBaseValue *_Nonnull obj,
                                                NSUInteger idx,
                                                BOOL * _Nonnull stop) {
            if ([obj isEqualToObject:callback]) {
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

- (void)addEvent:(HMBaseValue *)value callback:(HMBaseValue *)callback {
    if (!value || !callback)  { return; }
    NSString *name = value.toString;
    if (![name isKindOfClass:[NSString class]]) {
        return;
    }
    NSMutableArray *callbacks = self.eventCallbackMap[name];
    
    if (!callbacks) {
        callbacks = [[NSMutableArray alloc] init];
        self.eventCallbackMap[name] = callbacks;
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(notify:)
                                                     name:name
                                                   object:nil];
    }
    [callbacks addObject:callback];
}

- (void)postEvent:(HMBaseValue *)value object:(HMBaseValue *)valueObjc {
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
    if ([notificationObject isKindOfClass:HMBaseValue.class]) {
        // 通知有可能是其他页面传入的，如果不做判断，callWithArguments: 会导致崩溃，因为不同的虚拟机之间不能传递值
        HMBaseValue *notificationValue = notificationObject;
        if (notificationValue.context != self.hmValue.context) {
            // 需要复制转换
            // 因此不能支持复制 OBJC 对象
            notificationObject = notificationValue.toPortableObject;
        }
    }
    [callbacks enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull callbackValue,
                                            NSUInteger idx,
                                            BOOL * _Nonnull stop) {
        NSArray *arguments = notificationObject ? @[notificationObject] : @[];
        [callbackValue callWithArguments:arguments];
    }];
}

@end
