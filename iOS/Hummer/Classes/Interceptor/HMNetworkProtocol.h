//
//  HMNetworkProtocol.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * 这个两个协议将会被弃用。原因：并没有“替换实现”的功能
 */
NS_ASSUME_NONNULL_BEGIN
DEPRECATED_MSG_ATTRIBUTE("HMRequestProtocol is deprecated.")
@protocol HMRequestProtocol <NSObject>
@optional
- (NSURL *)requestURL;

@end
DEPRECATED_MSG_ATTRIBUTE("HMResponseProtocol is deprecated.")
@protocol HMResponseProtocol <NSObject>
@optional
- (NSDictionary *)responseData;

@end


@class HMRequest, HMJSContext;
@protocol HMRequestInterceptor <NSObject>
- (void)willsendRequest:(HMRequest *)request inContext:(HMJSContext *)context;

- (void)HMRequest:(HMRequest *)request didReceiveResponse:(NSDictionary *)response inContext:(HMJSContext *)context;
@end

NS_ASSUME_NONNULL_END
