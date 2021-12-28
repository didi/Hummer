//
//  HMDevService.m
//  Hummer
//
//  Created by didi on 2021/12/24.
//

#import "HMDevService.h"
#import "HMUtility.h"
#import <Hummer/HMDefines.h>
#import <Hummer/NSURL+hummer.h>
#import <Hummer/HMDevGlobalWebSocket.h>

@interface HMDevServiceSession()

@property (nonatomic, strong) NSURLSession *cliSession;

@property (nonatomic, strong) dispatch_queue_t getPageQueue;

@end

@implementation HMDevServiceSession

- (instancetype)init {
    self = [super init];
    if (self) {
        NSURLSessionConfiguration *config = [NSURLSessionConfiguration ephemeralSessionConfiguration];
        config.timeoutIntervalForRequest = 0.5;
        config.requestCachePolicy = NSURLRequestReloadIgnoringLocalCacheData;
        _cliSession = [NSURLSession sessionWithConfiguration:config];
        _getPageQueue = dispatch_queue_create("com.hummer.cliSession.thread", DISPATCH_QUEUE_SERIAL);

    }
    return self;
}

- (void)requesWithUrl:(id<HMURLConvertible>)url completionHandler:(void (^)(id _Nullable, NSError * _Nullable))callback {
    
    NSURLRequest *req = [NSURLRequest requestWithURL:[url hm_asUrl]];
    NSURLSessionDataTask *dataTask = [self.cliSession dataTaskWithRequest:req completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        if ([response isKindOfClass:NSHTTPURLResponse.class] && ((NSHTTPURLResponse *)response).statusCode == 200) {
            NSString *string = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
            @try {
                NSDictionary *resp = HMJSONDecode(string);
                callback(resp, nil);
            } @catch (NSException *exception) {
                callback(nil, [NSError errorWithDomain:HMUrlSessionErrorDomain code:1000 userInfo:@{NSLocalizedDescriptionKey : @"response decoder fail"}]);
            }
        }else{
            callback(nil, error?error:[NSError errorWithDomain:HMUrlSessionErrorDomain code:1000 userInfo:@{NSLocalizedDescriptionKey : @"request fail"}]);
        }
    }];
    [dataTask resume];

}

@end

@interface HMDevService ()

@property (nonatomic, strong) NSMutableDictionary<NSString *, HMDevGlobalWebSocket *> *nativeWSConnections;

@property (nonatomic, copy) NSString *cliNativeWSPath;


@end
@implementation HMDevService
- (instancetype)init {
    self = [super init];
    if (self) {

        _cliSession = [HMDevServiceSession new];
        _cliNativeWSPath = @"proxy/native";
        _nativeWSConnections = [NSMutableDictionary new];
    }
    return self;
}
+ (instancetype)sharedService {
    static HMDevService *ins = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        ins = [HMDevService new];
    });
    return ins;
}

- (nullable HMDevLocalConnection *)getLocalConnection:(id<HMURLConvertible>)pageUrl {
    
    NSURL *url = [pageUrl hm_asUrl];
    NSString *host = url.host;
    NSNumber *port = url.port;
    if ([[host hm_asString] isPureIP] && port) {
        // check native ws connect
        //@"ws://172.23.144.11:8000/proxy/native"
        NSString *nativeWSUrl = [NSString stringWithFormat:@"ws://%@:%@/%@",host,port,_cliNativeWSPath];
        NSString *checkDevUrl = [NSString stringWithFormat:@"http://%@:%@/%@",host,port,@"fileList"];
        if (![self isDevUrl:checkDevUrl]) {
            return nil;
        }
        
        HMDevGlobalWebSocket *ws = nil;
        @synchronized (self) {
            ws = [_nativeWSConnections objectForKey:nativeWSUrl];
        }
        if (!ws) {
            ws = [[HMDevGlobalWebSocket alloc] initWithURL:[NSURL URLWithString:nativeWSUrl]];
        }
        @synchronized (self) {
            [_nativeWSConnections setObject:ws forKey:nativeWSUrl];
        }
        return [ws getLocalConnection:pageUrl];
    }
    return nil;
}


- (BOOL)isDevUrl:(NSString *)urlString {
    
    dispatch_semaphore_t lock = dispatch_semaphore_create(0);
    __block BOOL isDev = NO;
    [[HMDevService sharedService].cliSession requesWithUrl:urlString completionHandler:^(id  _Nullable response, NSError * _Nullable error) {
        
        if (response) {
            if ([response[@"code"] intValue] == 0) {
                isDev = YES;
            }
        }
        dispatch_semaphore_signal(lock);
    }];
    dispatch_semaphore_wait(lock, DISPATCH_TIME_FOREVER);
    return isDev;
}

- (void)closeWebSocket:(HMDevGlobalWebSocket *)webSocket {
    [self.nativeWSConnections removeObjectForKey:[webSocket.wsURL hm_asString]];
}
@end
