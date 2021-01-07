//
//  HMResponse.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMResponse.h"
#import "HMExportManager.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"
#import "HMInterceptor.h"

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

- (JSValue *)__status {
    return [JSValue valueWithObject:@(self.status) inContext:self.hmContext];
}


- (void)__setStatus:(__unused JSValue *)status {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__header {
    return [JSValue valueWithObject:self.header inContext:self.hmContext];
}

- (void)__setHeader:(__unused JSValue *)header {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__data {
    NSDictionary *data = [self responseData];
    return [JSValue valueWithObject:data inContext:self.hmContext];
}

- (void)__setData:(__unused JSValue *)data {
    NSAssert(NO, @"cannot set read only property");
}

- (JSValue *)__error {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    [dict setValue:@(self.error.code) forKey:@"code"];
    if(self.error.userInfo){
        [dict setValuesForKeysWithDictionary:self.error.userInfo];
    }
    return [JSValue valueWithObject:dict inContext:self.hmContext];
}

- (void)__setError:(__unused JSValue *)error {
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
