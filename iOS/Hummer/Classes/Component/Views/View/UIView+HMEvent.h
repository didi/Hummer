//
//  UIView+HMEvent.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Hummer/HMBaseExecutorProtocol.h>
#import "HMPanEvent.h"

@interface UIGestureRecognizer(Hummer)

@property (nonatomic, copy) NSString *hm_eventName;

@end

@interface UIView(HMEvent)

@property (nonatomic, strong, readonly) NSMutableDictionary<NSString *, NSMutableArray<HMBaseValue *> *> *hm_eventTable;
@property (nonatomic, strong) HMBaseEvent *hm_eventObj;

- (void)hm_notifyEvent:(NSString *)eventName
             withValue:(HMBaseEvent *)value
          withArgument:(id)argument;

- (void)hm_addEvent:(HMBaseValue *)eventName
       withListener:(HMBaseValue *)listener;

- (void)hm_removeEvent:(HMBaseValue *)eventName
          withListener:(HMBaseValue *)listener;

- (BOOL)hm_isGestureEventName:(NSString *)eventName;

NS_ASSUME_NONNULL_BEGIN

- (NSMutableArray<HMBaseValue *> *)hm_listenerArrayForEvent:(NSString *)eventName;

- (BOOL)hm_hasListenerForEvent:(NSString *)eventName;

- (void)hm_notifyWithEventName:(NSString *)eventName argument:(nullable id)argument;

- (void)hm_notifyTouchesWithTouches:(NSSet<UITouch *> *)touches;

NS_ASSUME_NONNULL_END

@end
