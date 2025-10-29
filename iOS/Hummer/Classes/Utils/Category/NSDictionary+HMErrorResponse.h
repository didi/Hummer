//
//  NSDictionary+HMErrorResponse.h
//  Hummer
//
//  Created by GY on 2025/9/10.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
typedef NSDictionary HMErrorResponse;

@interface NSDictionary (HMrrorResponse)
+ (nonnull HMErrorResponse *)hm_responseWithCode:(nonnull NSNumber *)errNo subCode:(nullable NSNumber *)subCode message:(nonnull NSString *)errMsg;

+ (nonnull HMErrorResponse *)hm_responseWithCode:(nonnull NSNumber *)errNo message:(nonnull NSString *)errMsg;

+ (nonnull HMErrorResponse *)hm_responseWithError:(nonnull NSError *)error;

// 兼容Hummerx 错误，Hummerx移除了下列方法，这里做个兼容。
+ (nonnull HMErrorResponse *)hmx_responseWithCode:(nonnull NSNumber *)errNo subCode:(nullable NSNumber *)subCode message:(nonnull NSString *)errMsg;

+ (nonnull HMErrorResponse *)hmx_responseWithCode:(nonnull NSNumber *)errNo message:(nonnull NSString *)errMsg;

+ (nonnull HMErrorResponse *)hmx_responseWithError:(nonnull NSError *)error;

- (NSInteger)hm_errNo;
- (NSInteger)hmx_errNo;
@end

NS_ASSUME_NONNULL_END
