//
//  HMNotifyCenter.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMNotifyCenter.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMBaseValue.h"
#import "HMConfigEntryManager.h"
#import "HMJSContext.h"

#import "HMUtility.h"
#import "HMNotificationCenter.h"

NS_ASSUME_NONNULL_BEGIN
@interface HMNotifyCenter()

@property (nonatomic, copy, nullable) NSMutableDictionary<NSString *, NSMutableArray<HMBaseValue *> *> *eventHandlerMap;

@property (nonatomic, strong, nullable) HMNotificationCenter *notificationCenter;

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
//TODO: 目前由于 业务线 初始化时namepsace传入相对较晚，因此提供set方式，后续namespace作为context初始化参数后可以去掉
- (void)setNamespace:(NSString *)namespace {
    
    [self createNofificationCenterIfNeeded:namespace];
}
- (void)dealloc {
    [_notificationCenter removeObserver:self];
}

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values{
    if(self = [super initWithHMValues:values]) {
        NSString *namespace = [HMJSContext getCurrentNamespace];
        [self createNofificationCenterIfNeeded:namespace];
        _eventHandlerMap = [NSMutableDictionary new];
    }
    return self;
}

- (void)createNofificationCenterIfNeeded:(NSString *)namespace {
    if(_notificationCenter){
        return;
    }
    /// 优先使用配置中的 notifyCenter
    _notificationCenter = [[HMConfigEntryManager manager] getConfig:namespace].notifyCenter;
    if(!_notificationCenter && namespace){
        /// 使用 namespace 隔离的 notifyCenter
        _notificationCenter = [HMNotificationCenter namespaceCenter:namespace];
    }
}
#pragma mark - Export Method

- (void)removeEvent:(HMBaseValue *)value callback:(HMBaseValue *)callback {
    NSString *name = value.toString;
    if (name.length == 0) {
        return;
    }
    NSMutableArray<HMBaseValue *> *callbackArray = self.eventHandlerMap[name];
    if (callback && !callback.isUndefined && !callback.isNull) {
        // try to remove a specific listener
        [callbackArray enumerateObjectsUsingBlock:^(HMBaseValue *_Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            HMAssert(obj.context, @"obj.context == nil");
            if ([obj isEqualToObject:callback]) {
                *stop = YES;
                [callbackArray removeObjectAtIndex:idx];
            }
        }];
        if (callbackArray.count == 0) {
            // remove all
            [self.eventHandlerMap removeObjectForKey:name];
            [_notificationCenter removeObserver:self
                                           name:name
                                         object:nil];
        }
    } else {
        // remove all
        [self.eventHandlerMap removeObjectForKey:name];
        [_notificationCenter removeObserver:self
                                       name:name
                                     object:nil];
    }
}

- (void)addEvent:(HMBaseValue *)value callback:(HMBaseValue *)callback {
    NSString *name = value.toString;
    if (name.length == 0 || !callback) {
        return;
    }
    NSMutableArray<HMBaseValue *> *callbackArray = self.eventHandlerMap[name];
    if (!callbackArray) {
        callbackArray = [NSMutableArray array];
        [_notificationCenter addObserver:self
                                selector:@selector(notify:)
                                    name:name
                                  object:nil];
        [self.eventHandlerMap setObject:callbackArray forKey:name];
    }
    __block BOOL canAdd = YES;
    [callbackArray enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if([obj isEqualToObject:callback]){
            canAdd = NO;
            *stop = YES;
        }
    }];
    if(canAdd){
        [callbackArray addObject:callback];
    }
}

- (void)postEvent:(HMBaseValue *)value object:(HMBaseValue *)valueObjc {
    NSString *name = value.toString;
    if (name.length == 0) {
        return;
    }
    [_notificationCenter postNotificationName:name
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


