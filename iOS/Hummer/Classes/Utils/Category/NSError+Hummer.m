//
//  NSError+Hummer.m
//  Hummer
//
//  Created by didi on 2022/11/9.
//

#import "NSError+Hummer.h"
#import "NSDictionary+HMErrorResponse.h"

#import <objc/runtime.h>
NSString *HMErrorDomain = @"com.hummer";

@implementation NSError (Hummer)


+ (instancetype)hm_errorWithDomain:(nullable NSString*)domain
                              code:(NSInteger)code
                       description:(NSString*)desc
                     failureReason:(NSString*)failureReason {
    
    NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
    NSString *_domain = domain ? domain : HMErrorDomain;
    if(desc){
        [userInfo setObject:desc forKey:NSLocalizedDescriptionKey];
    }
    if(failureReason){
        [userInfo setObject:failureReason forKey:NSLocalizedFailureReasonErrorKey];
    }
    return [NSError errorWithDomain:_domain code:code userInfo:userInfo];
    
}


+ (instancetype)hm_errorWithDomain:(nullable NSString*)domain
                              code:(NSInteger)code
                       description:(NSString*)desc {
    return [self hm_errorWithDomain:domain code:code description:desc failureReason:nil];
}

+ (instancetype)hm_errorWithDomain:(nullable NSString*)domain
                              code:(NSInteger)code
                     failureReason:(NSString*)failureReason {
    return [self hm_errorWithDomain:domain code:code description:nil failureReason:failureReason];
}

- (NSString *)hm_descriptionOrReason {
    
    NSString *desc = [self localizedDescription];
    NSString *reason = [self localizedFailureReason];
    if(desc){
        return desc;
    }else if (reason){
        return reason;
    }else{
        desc = [self description];
        return desc ? desc : @"未知错误";
    }
}

- (NSDictionary *)hm_errorResponse {
    return [HMErrorResponse hm_responseWithError:self];
}

- (void)setHm_subCode:(NSNumber *)hm_subCode {
    objc_setAssociatedObject(self, @selector(hm_subCode), hm_subCode, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSNumber *)hm_subCode {
    return objc_getAssociatedObject(self, _cmd);
}

@end
