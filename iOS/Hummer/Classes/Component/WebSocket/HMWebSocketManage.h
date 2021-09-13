//
//  HMWebSocketManage.h
//  Hummer
//
//  Created by wzp on 2021/9/8.
//

#import <Foundation/Foundation.h>
@class HMWebSocket;

#define HMNotificationNewWebSocket  @"NewWebSocket"

NS_ASSUME_NONNULL_BEGIN

@interface HMWebSocketManage : NSObject

- (void)addWebSocket:(HMWebSocket *)webScoket;

- (void)removeAllWebSocket;

- (void)removeWebSocket:(HMWebSocket *)webScoket;


@end

NS_ASSUME_NONNULL_END
