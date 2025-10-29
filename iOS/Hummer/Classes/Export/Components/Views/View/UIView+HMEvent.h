//
//  UIView+HMEvent.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Hummer/HMBaseExecutorProtocol.h>

@class HMEventHandler;
NS_ASSUME_NONNULL_BEGIN

@interface UIView(HMEvent)

- (void)hm_addEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener;
- (void)hm_removeEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener;

- (void)hm_notifyWithEventName:(NSString *)eventName params:(NSDictionary *)params;

NS_ASSUME_NONNULL_END

@end
