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
#import "HMResponse.h"
#import "HMBaseExecutorProtocol.h"
#import <Hummer/HMBaseValue.h>
#import <Hummer/HMURLUtility.h>
#import <Hummer/HMLogger.h>

@interface HMRequest()

@property (nonatomic, copy) NSString *url; 
@property (nonatomic, copy) NSString *method;           // default POST
@property (nonatomic, assign) NSTimeInterval timeout;
@property (nonatomic, strong) NSDictionary *header;
@property (nonatomic, strong) NSDictionary *param;


@property (nonatomic, strong) HMBaseValue *oriParamValue;

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
    
    dispatch_async(dispatch_get_main_queue(), ^{
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


@end
