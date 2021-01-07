//
//  HMNetworkProtocol.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMRequestProtocol <NSObject>
@optional
- (NSURL *)requestURL;

@end

@protocol HMResponseProtocol <NSObject>
@optional
- (NSDictionary *)responseData;

@end

NS_ASSUME_NONNULL_END
