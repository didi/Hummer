//
//  HMScrollEvent.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMBaseEvent.h"

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, HMScrollEventState) {
    HMScrollEventNormal                 = 0,
    HMScrollEventBegan                  = 1,
    HMScrollEventScroll                 = 2,
    HMScrollEventEndedDecelerating      = 3,
    HMScrollEventEndedDragging          = 4,
};

FOUNDATION_EXTERN NSString * const kHMScrollState;
FOUNDATION_EXTERN NSString * const kHMScrollDeltaX;
FOUNDATION_EXTERN NSString * const kHMScrollDeltaY;
FOUNDATION_EXTERN NSString * const kHMScrollOffsetX;
FOUNDATION_EXTERN NSString * const kHMScrollOffsetY;

@interface HMScrollEvent : HMBaseEvent

@end

NS_ASSUME_NONNULL_END
