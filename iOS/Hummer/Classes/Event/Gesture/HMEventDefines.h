//
//  HMEventDefines.h
//  Hummer
//
//  Created by didi on 2023/3/14.
//

#import <Foundation/Foundation.h>

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


FOUNDATION_EXTERN NSString * const kHMInputType;
FOUNDATION_EXTERN NSString * const kHMInputState;
FOUNDATION_EXTERN NSString * const kHMInputText;


typedef NS_ENUM(NSUInteger, HMInputEventState){
    HMInputEventNormal      = 0,
    HMInputEventBegan       = 1,
    HMInputEventChanged     = 2,
    HMInputEventEnded       = 3,
    HMInputEventConfirmed   = 4,
};


FOUNDATION_EXTERN NSString * const kHMSwitchType;
FOUNDATION_EXTERN NSString * const kHMSwitchState;

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


NS_ASSUME_NONNULL_END
