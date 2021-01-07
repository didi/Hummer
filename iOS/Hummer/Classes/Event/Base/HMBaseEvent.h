//
//  HMEvent.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

FOUNDATION_EXTERN NSString * const HMLongPressEventName;
FOUNDATION_EXTERN NSString * const HMTapEventName;
FOUNDATION_EXTERN NSString * const HMSwipeEventName;
FOUNDATION_EXTERN NSString * const HMPinchEventName;
FOUNDATION_EXTERN NSString * const HMPanEventName;
FOUNDATION_EXTERN NSString * const HMScrollEventName;
FOUNDATION_EXTERN NSString * const HMInputEventName;
FOUNDATION_EXTERN NSString * const HMSwitchEventName;
FOUNDATION_EXTERN NSString * const HMTouchEventName;

@interface HMBaseEvent : NSObject

@property (nonatomic, strong, readonly) NSString *type;
@property (nonatomic, weak) id target;
@property (nonatomic, assign) NSTimeInterval timestamp;

- (void)updateEvent:(UIView *)view withContext:(nullable id)context;

@end

NS_ASSUME_NONNULL_END
