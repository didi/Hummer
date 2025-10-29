//
//  NSDictionary+HMErrorResponse.m
//  Hummer
//
//  Created by GY on 2025/9/10.
//

#import "NSDictionary+HMErrorResponse.h"
#import "NSError+Hummer.h"

@implementation NSDictionary (HMErrorResponse)

+ (nonnull HMErrorResponse *)hm_responseWithCode:(nonnull NSNumber *)errNo subCode:(nullable NSNumber *)subCode message:(nonnull NSString *)errMsg {
    NSMutableDictionary *error = [NSMutableDictionary new];
    [error setObject:errNo forKey:@"errno"];
    if (errMsg) {
        [error setObject:errMsg forKey:@"errMsg"];
    }
    if (subCode) {
        [error setObject:subCode forKey:@"subCode"];
    }
    return error.copy;
}

+ (nonnull HMErrorResponse *)hm_responseWithCode:(nonnull NSNumber *)errNo message:(nonnull NSString *)errMsg {
    return [self hm_responseWithCode:errNo subCode:nil message:errMsg];
}

+ (HMErrorResponse *)hm_responseWithError:(NSError *)error {
    return [self hm_responseWithCode:@(error.code) subCode:error.hm_subCode message:error.hm_descriptionOrReason];
}

- (NSInteger)hm_errNo {
    return [[self objectForKey:@"errno"] integerValue];
}


+ (nonnull HMErrorResponse *)hmx_responseWithCode:(nonnull NSNumber *)errNo subCode:(nullable NSNumber *)subCode message:(nonnull NSString *)errMsg {
    return [self hm_responseWithCode:errNo subCode:subCode message:errMsg];
}

+ (nonnull HMErrorResponse *)hmx_responseWithCode:(nonnull NSNumber *)errNo message:(nonnull NSString *)errMsg {
    return [self hm_responseWithCode:errNo subCode:nil message:errMsg];
}

+ (HMErrorResponse *)hmx_responseWithError:(NSError *)error {
    return [self hm_responseWithCode:@(error.code) subCode:error.hm_subCode message:error.hm_descriptionOrReason];
}

- (NSInteger)hmx_errNo {
    return [self hm_errNo];
}
@end
