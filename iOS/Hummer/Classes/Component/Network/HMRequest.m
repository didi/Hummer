//
//  HMRequest.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRequest.h"
#import "HMUtility.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMExportManager.h"
#import "HMInterceptor.h"
#import "HMBaseExecutorProtocol.h"
#import <Hummer/HMBaseValue.h>
#import <Hummer/HMURLUtility.h>
#import <Hummer/HMLogger.h>
#import <Hummer/HMConfigEntryManager.h>
#import <Hummer/HMJSGlobal.h>


@interface HMRequest()

@property (nonatomic, strong) HMBaseValue *oriParamValue;

@property (nonatomic, strong) id<HMRequestComponent> request_impl;
@end

@implementation HMRequest{
    NSString *_url;
    NSString *_method;           // default POST
    NSTimeInterval _timeout;
    NSDictionary *_header;
    NSDictionary *_param;
}

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
        self.request_impl = [HMRequestAdaptor createComponentWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace];
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

typedef NSMutableDictionary HMPrimitiveResponse;
- (void)handleResponse:(NSHTTPURLResponse *)resp
              withData:(NSData *)data
             withError:(NSError *)error
              callback:(HMFuncCallback)callback {
    
    NSString *string = [[NSString alloc] initWithData:data
                                             encoding:NSUTF8StringEncoding];
    
    HMPrimitiveResponse *respone = [HMPrimitiveResponse new];
    [respone setValue:@(resp.statusCode) forKey:@"status"];
    if (error) {

        NSMutableDictionary *errorDic = [NSMutableDictionary new];
        [errorDic setObject:@(error.code) forKey:@"code"];
        if(error.userInfo){
            [errorDic setValuesForKeysWithDictionary:error.userInfo];
        }
        [respone setObject:errorDic forKey:@"error"];
    }
    [respone setValue:[resp allHeaderFields] forKey:@"header"];
    [respone setValue:HMJSONDecode(string) forKey:@"data"];
    
    __weak typeof(self) wSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        if (wSelf) {
            __strong typeof(wSelf) sSelf = wSelf;
            HMJSContext *context = [[HMJSGlobal globalObject] currentContext:wSelf.hmContext];
            [HMRequestInterceptor HMRequest:sSelf didReceiveResponse:respone inContext:context];
        }
        if(callback) {
            callback(@[respone]);
        }
    });
}

- (NSURLRequest *)urlRequest {
    NSURL *url = [self requestURL];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    request.timeoutInterval = self.timeout;
    __block NSString *contentType = nil;
    [self.header enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key,
                                                     id  _Nonnull obj,
                                                     BOOL * _Nonnull stop) {
        if ([key isKindOfClass:NSString.class]) {
            if ([((NSString *)key) isEqualToString:@"Content-Type"]) {
                if ([obj isKindOfClass:NSString.class]) {
                    contentType = (NSString *)obj;
                }
            }
        }
        [request addValue:[NSString stringWithFormat:@"%@", obj] forHTTPHeaderField:key];
    }];
    if ([[self.method uppercaseString] isEqualToString:@"POST"]) {

        if (self.param && self.param.count > 0) {
            // TODO: 其他 Content-Type 序列化兼容
            request.HTTPMethod = @"POST";
            if (contentType && [contentType isEqualToString:@"application/x-www-form-urlencoded"]) {
                
                NSString *query = HMQueryStringFromParameters(self.param);
                if (query) {
                    [request setHTTPBody:[query dataUsingEncoding:NSUTF8StringEncoding]];
                }
            }else{
                NSData *data = nil;
                if (HMCurrentExecutor) {
                    HMBaseValue *global = HMCurrentExecutor.globalObject;
                    HMBaseValue *JSONObj = [HMCurrentExecutor getWithValue:global propertyName:@"JSON"];
                    HMBaseValue *res = [JSONObj invokeMethod:@"stringify" withArguments:@[self.oriParamValue]];
                    NSString *jsonStr = [res toString];
                    if (jsonStr) {
                        data = [jsonStr dataUsingEncoding:NSUTF8StringEncoding];
                    }
                }
                if (!data) {
                    if ([NSJSONSerialization isValidJSONObject:self.param]) {
                        data = [NSJSONSerialization dataWithJSONObject:self.param options:0 error:nil];
                    }else{
                        HMLogError(@"HMRequest JSON Serialization failed");
                    }
                }
                request.HTTPBody = data;
            }
        }
    }
    return request;
}

#pragma mark - set && get

- (void)setUrl:(NSString *)url {
    _url = url;
    if (self.request_impl) {
        self.request_impl.url = url;
    }
}
- (NSString *)url {
    if (self.request_impl) {
        return self.request_impl.url;
    }
    return _url;
}

- (void)setMethod:(NSString *)method {
    _method = method;
    if (self.request_impl) {
        self.request_impl.method = method;
    }
}

- (NSString *)method {
    if (self.request_impl) {
        return self.request_impl.method;
    }
    return _method;
}

- (void)setTimeout:(NSTimeInterval)timeout {
    _timeout = timeout;
    if (self.request_impl) {
        self.request_impl.timeout = timeout;
    }
}
- (NSTimeInterval)timeout {
    if (self.request_impl) {
        return self.request_impl.timeout;
    }
    return _timeout;
}

- (void)setParam:(NSDictionary *)param {
    _param = param;
    if (self.request_impl) {
        self.request_impl.param = param;
    }
}

- (NSDictionary *)param {
    if (self.request_impl) {
        return self.request_impl.param;
    }
    return _param;
}

- (void)setHeader:(NSDictionary *)header {
    
    _header = header;
    if (self.request_impl) {
        self.request_impl.header = header;
    }
}

- (NSDictionary *)header {
    if (self.request_impl) {
        return self.request_impl.header;
    }
    return _header;
}

#pragma mark - Export Property

- (HMBaseValue *)__url {
    return [HMBaseValue valueWithObject:self.url inContext:self.hmContext];
}

- (void)__setUrl:(HMBaseValue *)host {
    self.url = [host toString];
}

- (HMBaseValue *)__method {
    return [HMBaseValue valueWithObject:self.method inContext:self.hmContext];
}

- (void)__setMethod:(HMBaseValue *)method {
    self.method = [method toString];
}

- (HMBaseValue *)__timeout {
    return [HMBaseValue valueWithDouble:self.timeout inContext:self.hmContext];
}

- (void)__setTimeout:(HMBaseValue *)timeout {
    self.timeout = [[timeout toNumber] floatValue];
}

- (HMBaseValue *)__header {
    return [HMBaseValue valueWithObject:self.header inContext:self.hmContext];
}

- (void)__setHeader:(HMBaseValue *)header {
    self.header = [header toObject];
}

- (HMBaseValue *)__param {
    return [HMBaseValue valueWithObject:self.param inContext:self.hmContext];
}

- (void)__setParam:(HMBaseValue *)param {
    self.oriParamValue = param;
    self.param = [param toObject];
}

#pragma mark - Export Method

- (void)send:(HMFuncCallback)callback {
    
    HMJSContext *context = [[HMJSGlobal globalObject] currentContext:self.hmContext];
    [HMRequestInterceptor willSendRequest:self inContext:context];
    
    if (self.request_impl) {
        [self.request_impl send:callback];
        return;
    }
    NSURLSessionDataTask *dataTask = [[NSURLSession sharedSession] dataTaskWithRequest:[self urlRequest]
                                                                     completionHandler:^(NSData * _Nullable data,
                                                                                         NSURLResponse * _Nullable response,
                                                                                         NSError * _Nullable error) {
        if(response && ![response isKindOfClass:[NSHTTPURLResponse class]]){
            error = HMError(-100, @"not http response");
            data = nil; response = nil;
        }
        [self handleResponse:(NSHTTPURLResponse *)response
                        withData:data
                       withError:error
                        callback:callback];
    }];
    [dataTask resume];
}

+ (nonnull id<HMRequestComponent>)create {
    return nil;
}



@synthesize header = _header;
@synthesize method = _method;
@synthesize param = _param;
@synthesize timeout = _timeout;
@synthesize url = _url;

@end
