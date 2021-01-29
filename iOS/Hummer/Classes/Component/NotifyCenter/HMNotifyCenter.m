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
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (instancetype)init {
    self = [super init];
    _eventHandlerMap = [[NSMutableDictionary alloc] init];
    
    return self;
}

#pragma mark - Export Method

- (void)removeEvent:(HMBaseValue *)value callback:(HMBaseValue *)callback {
    NSString *name = value.toString;
    if (name.length == 0) {
        return;
    }
    NSMutableDictionary<NSString *, NSArray<HMBaseValue *> *> *eventHandlerDictionary = self.eventHandlerMap.mutableCopy;
    self.eventHandlerMap = nil;
    NSMutableArray<HMBaseValue *> *callbackArray = eventHandlerDictionary[name].mutableCopy;
    eventHandlerDictionary[name] = nil;
    if (callback) {
        // try to remove a specific listener
        __block NSIndexSet *indexSet = nil;
        [callbackArray enumerateObjectsUsingBlock:^(HMBaseValue *_Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            if ([obj isEqualToObject:callback] || !obj.context) {
                NSMutableIndexSet *mutableIndexSet = indexSet.mutableCopy;
                indexSet = nil;
                if (!mutableIndexSet) {
                    mutableIndexSet = NSMutableIndexSet.indexSet;
                }
                [mutableIndexSet addIndex:idx];
                indexSet = mutableIndexSet.copy;
            }
        }];
        if (indexSet) {
            [callbackArray removeObjectsAtIndexes:indexSet];
        }
        if (callbackArray.count == 0) {
            callbackArray = nil;
            [[NSNotificationCenter defaultCenter] removeObserver:self
                                                            name:name
                                                          object:nil];
        }
        eventHandlerDictionary[name] = callbackArray.copy;
    } else {
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
    self.eventHandlerMap = nil;
    NSMutableArray<HMBaseValue *> *callbackArray = eventHandlerDictionary[name].mutableCopy;
    eventHandlerDictionary[name] = nil;
    
//    __block NSIndexSet *indexSet = nil;
//    [callbackArray enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
//        if (!obj.context) {
//            NSMutableIndexSet *mutableIndexSet = indexSet.mutableCopy;
//            indexSet = nil;
//            if (!mutableIndexSet) {
//                mutableIndexSet = NSMutableIndexSet.indexSet;
//            }
//            [mutableIndexSet addIndex:idx];
//            indexSet = mutableIndexSet.copy;
//        }
//    }];
//    if (indexSet) {
//        [callbackArray removeObjectsAtIndexes:indexSet];
//    }
    
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
    __block NSIndexSet *indexSet = nil;
    [self.eventHandlerMap[name] enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if (!obj.context) {
            NSMutableIndexSet *mutableIndexSet = indexSet.mutableCopy;
            indexSet = nil;
            if (!mutableIndexSet) {
                mutableIndexSet = NSMutableIndexSet.indexSet;
            }
            [mutableIndexSet addIndex:idx];
            indexSet = mutableIndexSet.copy;
            
            return;
        }
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
    if (indexSet) {
        NSMutableDictionary<NSString *, NSArray<HMBaseValue *> *> *eventHandlerDictionary = self.eventHandlerMap.mutableCopy;
        self.eventHandlerMap = nil;
        NSMutableArray<HMBaseValue *> *callbackArray = eventHandlerDictionary[name].mutableCopy;
        eventHandlerDictionary[name] = nil;
        
        __block NSIndexSet *newIndexSet = nil;
        // 判断是否超出范围
        [indexSet enumerateIndexesUsingBlock:^(NSUInteger idx, BOOL * _Nonnull stop) {
            if (idx < callbackArray.count) {
                NSMutableIndexSet *mutableIndexSet = newIndexSet.mutableCopy;
                newIndexSet = nil;
                if (!mutableIndexSet) {
                    mutableIndexSet = NSMutableIndexSet.indexSet;
                }
                [mutableIndexSet addIndex:idx];
                newIndexSet = mutableIndexSet.copy;
            }
        }];
        
        [callbackArray removeObjectsAtIndexes:newIndexSet];
        
        if (callbackArray.count == 0) {
            callbackArray = nil;
            [[NSNotificationCenter defaultCenter] removeObserver:self
                                                            name:name
                                                          object:nil];
        }
        eventHandlerDictionary[name] = callbackArray.copy;
        if (eventHandlerDictionary.count == 0) {
            eventHandlerDictionary = nil;
        }
        self.eventHandlerMap = eventHandlerDictionary;
    }
}

@end
