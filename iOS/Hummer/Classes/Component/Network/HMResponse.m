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

- (HMBaseValue *)__status {
    return [HMBaseValue valueWithObject:@(self.status) inContext:self.hmContext];
}


- (void)__setStatus:(__unused HMBaseValue *)status {
    NSAssert(NO, @"cannot set read only property");
}

- (HMBaseValue *)__header {
    return [HMBaseValue valueWithObject:self.header inContext:self.hmContext];
}

- (void)__setHeader:(__unused HMBaseValue *)header {
    NSAssert(NO, @"cannot set read only property");
}

- (HMBaseValue *)__data {
    NSDictionary *data = [self responseData];
    return [HMBaseValue valueWithObject:data inContext:self.hmContext];
}

- (void)__setData:(__unused HMBaseValue *)data {
    NSAssert(NO, @"cannot set read only property");
}

- (HMBaseValue *)__error {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    [dict setValue:@(self.error.code) forKey:@"code"];
    if(self.error.userInfo){
        [dict setValuesForKeysWithDictionary:self.error.userInfo];
    }
    return [HMBaseValue valueWithObject:dict inContext:self.hmContext];
}

- (void)__setError:(__unused HMBaseValue *)error {
    NSAssert(NO, @"cannot set read only property");
}

#pragma mark - HMJSObject

- (void)copyFromObject:(id)object {
    if([object isKindOfClass:[HMResponse class]]){
        self.status = ((HMResponse *)object).status;
        self.data = ((HMResponse *)object).data;
        self.error = ((HMResponse *)object).error;
        self.header = ((HMResponse *)object).header;
    }
}

@end
