//
//  HMWebSocket.h
//  Hummer
//
//  Copyright © 2021年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

FOUNDATION_EXTERN NSString * const HMWebCloseEventName ;
FOUNDATION_EXTERN NSString * const HMwebOpenEventName ;
FOUNDATION_EXTERN NSString * const HMWebErrorEventName ;
FOUNDATION_EXTERN NSString * const HMWebMessageEventName ;

@interface HMWebSocket : NSObject

@end

NS_ASSUME_NONNULL_END
