//
//  HMRequest.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRequest.h"
#import "HMUtility.h"
#import "HMExportManager.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"
#import "HMExportManager.h"
#import "HMInterceptor.h"
#import "HMResponse.h"

@interface HMRequest()

@property (nonatomic, copy) NSString *url; 
@property (nonatomic, copy) NSString *method;           // default POST
@property (nonatomic, assign) NSTimeInterval timeout;
@property (nonatomic, strong) NSDictionary *header;
@property (nonatomic, strong) NSDictionary *param;

@end

@implementation HMRequest

HM_EXPORT_CLASS(Request, HMRequest)

HM_EXPORT_PROPERTY(url, __url, __setUrl:)
HM_EXPORT_PROPERTY(method, __method, __setMethod:)
HM_EXPORT_PROPERTY(timeout, __timeout, __setTimeout:)
HM_EXPORT_PROPERTY(header, __header, __setHeader:)
HM_EXPORT_PROPERTY(param, __param, __setParam:)

HM_EXPORT_METHOD(send, send:)

- (instancetype)init {
    self = [super init];
    if (self) {
        self.timeout = 20;
        self.method = @"POST";
    }
    return self;
}

- (NSURL *)requestURL {
    if ([HMInterceptor hasInterceptor:HMInterceptorTypeNetwork]) {
        __block NSURL *url = nil;
        [HMInterceptor enumerateInterceptor:HMInterceptorTypeNetwork
                                  withBlock:^(id<HMRequestProtocol> interceptor,
                                              NSUInteger idx,
                                              BOOL * _Nonnull stop) {
            if([interceptor respondsToSelector:@selector(requestURL)]){
                url = [interceptor requestURL];
            } *stop = YES;
        }];
        return url;
    }
    
    NSURLComponents *components = [NSURLComponents componentsWithString:self.url];
    
    if ([[self.method uppercaseString] isEqualToString:@"POST"] || self.param.count <= 0) {
        return components.URL;
    }
    NSMutableArray *queryItems = [NSMutableArray array];
    [self.param enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key,
                                                    id  _Nonnull obj,
                                                    BOOL * _Nonnull stop) {
        if ([obj isKindOfClass:NSString.class]) {
            [queryItems addObject:[NSURLQueryItem queryItemWithName:key value:obj]];
        } else if ([obj isKindOfClass:NSNumber.class]) {
            [queryItems addObject:[NSURLQueryItem queryItemWithName:key value:[(NSNumber *)obj stringValue]]];
        }
    }];
    components.queryItems = queryItems;
    return components.URL;
}

- (void)handleResponse:(NSHTTPURLResponse *)resp
              withData:(NSData *)data
             withError:(NSError *)error
              callback:(HMFuncCallback)callback {
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        /**
         * 可能存在主线程回调之后，context已经被销毁。此时不应该在执行回调
         */
        if(weakSelf.hmContext == nil){
            
            return;
        }
        JSValue *value = [JSValue hm_valueWithClass:[HMResponse class]
                                          inContext:weakSelf.hmContext];
        HMResponse *response = [value hm_toObjCObject];
        response.error = error; response.status = resp.statusCode;
        response.header = [resp allHeaderFields];
        NSString *string = [[NSString alloc] initWithData:data
                                                 encoding:NSUTF8StringEncoding];
        response.data = HMJSONDecode(string);
        
        if(callback) {
            HMAssert(value, @"JSValue must not be nil");
            callback(value?@[value]:@[]);
        }

    });
}

- (NSURLRequest *)urlRequest {
    NSURL *url = [self requestURL];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    request.timeoutInterval = self.timeout;
    [self.header enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key,
                                                     id  _Nonnull obj,
                                                     BOOL * _Nonnull stop) {
        [request addValue:[NSString stringWithFormat:@"%@", obj] forHTTPHeaderField:key];
    }];
    if ([[self.method uppercaseString] isEqualToString:@"POST"]) {
        request.HTTPMethod = @"POST";
        if (self.param && self.param.count > 0) {
            NSData *data = [NSJSONSerialization dataWithJSONObject:self.param options:0 error:nil];
            request.HTTPBody = data;
        }
    }
    return request;
}

#pragma mark - Export Property

- (JSValue *)__url {
    return [JSValue valueWithObject:self.url inContext:self.hmContext];
}

- (void)__setUrl:(JSValue *)host {
    self.url = [host toString];
}

- (JSValue *)__method {
    return [JSValue valueWithObject:self.method inContext:self.hmContext];
}

- (void)__setMethod:(JSValue *)method {
    self.method = [method toString];
}

- (JSValue *)__timeout {
    return [JSValue valueWithDouble:self.timeout inContext:self.hmContext];
}

- (void)__setTimeout:(JSValue *)timeout {
    self.timeout = [[timeout toNumber] floatValue];
}

- (JSValue *)__header {
    return [JSValue valueWithObject:self.header inContext:self.hmContext];
}

- (void)__setHeader:(JSValue *)header {
    self.header = [header toObject];
}

- (JSValue *)__param {
    return [JSValue valueWithObject:self.param inContext:self.hmContext];
}

- (void)__setParam:(JSValue *)param {
    self.param = [param toObject];
}

#pragma mark - Export Method

- (void)send:(HMFuncCallback)callback {
    __weak typeof(self) weakSelf = self;
    NSURLSessionDataTask *dataTask = [[NSURLSession sharedSession] dataTaskWithRequest:[self urlRequest]
                                                                     completionHandler:^(NSData * _Nullable data,
                                                                                         NSURLResponse * _Nullable response,
                                                                                         NSError * _Nullable error) {
        if(response && ![response isKindOfClass:[NSHTTPURLResponse class]]){
            error = HMError(-100, @"not http response");
            data = nil; response = nil;
        }
        [weakSelf handleResponse:(NSHTTPURLResponse *)response
                        withData:data
                       withError:error
                        callback:[callback copy]];
    }];
    [dataTask resume];
}

@end
