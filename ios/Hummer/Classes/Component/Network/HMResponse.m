//
//  HMResponse.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMResponse.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMInterceptor.h"
#import "HMBaseValue.h"

@implementation HMResponse

HM_EXPORT_CLASS(Response, HMResponse)

HM_EXPORT_PROPERTY(status, __status, __setStatus:)
HM_EXPORT_PROPERTY(header, __header, __setHeader:)
HM_EXPORT_PROPERTY(data, __data, __setData:)
HM_EXPORT_PROPERTY(error, __error, __setError:)

- (NSDictionary *)responseData {
    if([HMInterceptor hasInterceptor:HMInterceptorTypeNetwork]){
        __block NSDictionary *data = nil;
        [HMInterceptor enumerateInterceptor:HMInterceptorTypeNetwork
                                  withBlock:^(id<HMResponseProtocol> interceptor,
                                              NSUInteger idx,
                                              BOOL * _Nonnull stop) {
            if([interceptor respondsToSelector:@selector(responseData)]){
                data = [interceptor responseData];
            } *stop = YES;
        }]; return data;
    }
    return self.data;
}

#pragma mark - Export Method

- (NSNumber *)__status {
    return @(self.status);
}


- (void)__setStatus:(__unused HMBaseValue *)status {
    NSAssert(NO, @"cannot set read only property");
}

- (NSDictionary<NSString *, id> *)__header {
    return self.header;
}

- (void)__setHeader:(__unused HMBaseValue *)header {
    NSAssert(NO, @"cannot set read only property");
}

- (NSDictionary<NSString *, id> *)__data {
    return [self responseData];
}

- (void)__setData:(__unused HMBaseValue *)data {
    NSAssert(NO, @"cannot set read only property");
}

- (NSDictionary<NSString *, id> *)__error {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    [dict setValue:@(self.error.code) forKey:@"code"];
    if(self.error.userInfo){
        [dict setValuesForKeysWithDictionary:self.error.userInfo];
    }
    
    return dict.copy;
}

- (void)__setError:(__unused HMBaseValue *)error {
    NSAssert(NO, @"cannot set read only property");
}

@end
