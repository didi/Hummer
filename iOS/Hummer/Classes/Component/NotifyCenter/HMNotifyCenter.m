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
#import "HMUtility.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMNotifyCenter()

@property (nonatomic, copy, nullable) NSDictionary<NSString *, NSArray<HMBaseValue *> *> *eventHandlerMap;

- (void)removeEvent:(nullable HMBaseValue *)value callback:(nullable HMBaseValue *)callback;

- (void)addEvent:(nullable HMBaseValue *)value callback:(nullable HMBaseValue *)callback;

- (void)notify:(nullable NSNotification *)center;

- (void)postEvent:(nullable HMBaseValue *)value object:(nullable HMBaseValue *)valueObjc;

@end

NS_ASSUME_NONNULL_END

@implementation HMNotifyCenter

HM_EXPORT_CLASS(NotifyCenter, HMNotifyCenter)

HM_EXPORT_METHOD(addEventListener, addEvent:callback:)

HM_EXPORT_METHOD(removeEventListener, removeEvent:callback:)

HM_EXPORT_METHOD(triggerEvent, postEvent:object:)

- (void)dealloc {
    [NSNotificationCenter.defaultCenter removeObserver:self];
}

#pragma mark - Export Method

- (void)removeEvent:(HMBaseValue *)value callback:(HMBaseValue *)callback {
    NSString *name = value.toString;
    if (name.length == 0) {
        return;
    }
    NSMutableDictionary<NSString *, NSArray<HMBaseValue *> *> *eventHandlerDictionary = self.eventHandlerMap.mutableCopy;
    NSMutableArray<HMBaseValue *> *callbackArray = eventHandlerDictionary[name].mutableCopy;
    if (callback && !callback.isUndefined && !callback.isNull) {
        // try to remove a specific listener
        [callbackArray enumerateObjectsUsingBlock:^(HMBaseValue *_Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            HMAssert(obj.context, @"obj.context == nil");
            if ([obj isEqualToObject:callback]) {
                [callbackArray removeObjectAtIndex:idx];
            }
        }];
        if (callbackArray.count == 0) {
            callbackArray = nil;
            [[NSNotificationCenter defaultCenter] removeObserver:self
                                                            name:name
                                                          object:nil];
        }
        eventHandlerDictionary[name] = callbackArray.copy;
    } else {
        [eventHandlerDictionary removeObjectForKey:name];
        [[NSNotificationCenter defaultCenter] removeObserver:self
                                                        name:name
                                                      object:nil];
    }
    if (eventHandlerDictionary.count == 0) {
        eventHandlerDictionary = nil;
    }
    self.eventHandlerMap = eventHandlerDictionary;
}

- (void)addEvent:(HMBaseValue *)value callback:(HMBaseValue *)callback {
    NSString *name = value.toString;
    if (name.length == 0 || !callback) {
        return;
    }
    NSMutableDictionary<NSString *, NSArray<HMBaseValue *> *> *eventHandlerDictionary = self.eventHandlerMap.mutableCopy;
    if (!eventHandlerDictionary) {
        eventHandlerDictionary = NSMutableDictionary.dictionary;
    }
    NSMutableArray<HMBaseValue *> *callbackArray = eventHandlerDictionary[name].mutableCopy;
    
    if (!callbackArray) {
        callbackArray = [NSMutableArray array];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(notify:)
                                                     name:name
                                                   object:nil];
    }
    [callbackArray addObject:callback];
    eventHandlerDictionary[name] = callbackArray.copy;
    self.eventHandlerMap = eventHandlerDictionary;
}

- (void)postEvent:(HMBaseValue *)value object:(HMBaseValue *)valueObjc {
    NSString *name = value.toString;
    if (name.length == 0) {
        return;
    }
    [[NSNotificationCenter defaultCenter] postNotificationName:name
                                                        object:valueObjc
                                                      userInfo:nil];
}

- (void)notify:(NSNotification *)center {
    NSString *name = center.name;
    id notificationObject = center.object;
    __block id portableObject = nil;
    [self.eventHandlerMap[name] enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        // 1. 普通对象 -> 直接返回
        // 2. HMBaseValue
        //   1. 同一个 Context -> HMBaseValue;
        //   2. 不同 Context -> portableObject;
        if (![notificationObject isKindOfClass:HMBaseValue.class]) {
            [obj callWithArguments:notificationObject ? @[notificationObject] : nil];
        } else {
            if (((HMBaseValue *) notificationObject).context == obj.context) {
                [obj callWithArguments:@[notificationObject]];
            } else {
                if (!portableObject) {
                    portableObject = ((HMBaseValue *) notificationObject).toPortableObject;
                }
                [obj callWithArguments:portableObject ? @[portableObject] : nil];
            }
        }
    }];
}

@end
