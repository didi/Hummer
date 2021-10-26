//
//  HMDebugService.m
//  Hummer
//
//  Created by didi on 2021/10/25.
//

#import "HMDebugService.h"
#include <arpa/inet.h>
#import "HMUtility.h"

#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)

#import <Hummer/HMInspectorPackagerConnection.h>

#endif

@interface NSString (IPValidate)

- (BOOL)isPureIP;
@end

@implementation NSString (IPValidate)

- (BOOL)isPureIP{
    
    const char *utf8 = [self UTF8String];
    int success;
    struct in_addr dst;
    success = inet_pton(AF_INET, utf8, &dst);
    if (success != 1) {

        struct in6_addr dst6;
        success = inet_pton(AF_INET6, utf8, &dst6);
    }
    return success == 1;
}
@end

// todo：暂时通过条件编译做，后续抽象Connection
@interface HMDebugService()

@property (nonatomic, copy) NSString *debugHost;

@property (nonatomic, strong) NSURLSession *session;

@property (nonatomic, strong) dispatch_queue_t getPageQueue;

#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)

@property (nonatomic, strong) HMInspectorPackagerConnection *inspectorPackagerConnection;
#endif

@end

@implementation HMDebugService {
    
    NSString *_devPagePath;
    NSNumber *_debugPort;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        NSURLSessionConfiguration *config = [NSURLSessionConfiguration ephemeralSessionConfiguration];
        config.timeoutIntervalForRequest = 0.5;
        config.requestCachePolicy = NSURLRequestReloadIgnoringLocalCacheData;
        _session = [NSURLSession sessionWithConfiguration:config];
        _getPageQueue = dispatch_queue_create("com.hummer.debugService.thread", DISPATCH_QUEUE_SERIAL);
        _devPagePath = @"/dev/page/list";
        _debugPort = @8081;

    }
    return self;
}
+ (instancetype)sharedService {
    static HMDebugService *ins = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        ins = [HMDebugService new];
    });
    return ins;
}

- (NSArray *)getDevPages {
    
    dispatch_semaphore_t lock = dispatch_semaphore_create(0);
    NSURLRequest *req = [NSURLRequest requestWithURL:[[self.debugHost stringByAppendingString:_devPagePath] hm_asUrl]];
    NSMutableArray *array = [[NSMutableArray alloc] init];
    NSURLSessionDataTask *dataTask = [self.session dataTaskWithRequest:req completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        if ([response isKindOfClass:NSHTTPURLResponse.class] && ((NSHTTPURLResponse *)response).statusCode == 200) {
            NSString *string = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
            @try {
                NSDictionary *resp = HMJSONDecode(string);
                if ([resp[@"code"] intValue] == 0) {
                    [array addObjectsFromArray:resp[@"data"]];
                }
            } @catch (NSException *exception) {}
        }
        dispatch_semaphore_signal(lock);
    }];
    [dataTask resume];
    dispatch_semaphore_wait(lock, DISPATCH_TIME_FOREVER);
    return [array copy];
}

- (void)getDevPagesAsync:(HMDebugServiceDevPagesCallBack)callback {

    dispatch_async(self.getPageQueue, ^{
        NSArray *array = [self getDevPages];
        callback(array);
    });
}

- (void)setDebugServiceHost:(NSString *)debugHost {

    _debugHost = debugHost;
    bool debugServiceIsReady = [self getDevPages];
    if (debugServiceIsReady) {
        [self startDebugConnection];
    }
}

- (NSArray *)guessDebugHostWithDevUrl:(id<HMURLConvertible>)devUrl autoConnect:(BOOL)autoConnect {

    NSURL *url = [devUrl hm_asUrl];
    NSString *host = url.host;
    NSNumber *port = url.port;
    if ([host isPureIP] && port) {
        self.debugHost = [NSString stringWithFormat:@"http://%@:%@", host, _debugPort];
        NSArray *debugServiceIsReady = [self getDevPages];
        if (autoConnect && debugServiceIsReady) {
            [self startDebugConnection];
        }
        return debugServiceIsReady;
    }
    return @[];
}

- (BOOL)shouldWaitForDebugWithScriptUrl:(id<HMURLConvertible>)scriptUrl {

    NSArray *debugablePages = [self getDevPages];
    return [debugablePages containsObject:scriptUrl.hm_asString];
}

- (void)startDebugConnection {
    
#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)

    if (!_inspectorPackagerConnection) {
        NSString *escapedDeviceName = [[[UIDevice currentDevice] name]
                stringByAddingPercentEncodingWithAllowedCharacters:NSCharacterSet.URLQueryAllowedCharacterSet];
        NSString *escapedAppName = [[[NSBundle mainBundle] bundleIdentifier]
                stringByAddingPercentEncodingWithAllowedCharacters:NSCharacterSet.URLQueryAllowedCharacterSet];
        NSURL *inspectorDeviceUrl = [NSURL URLWithString:[NSString stringWithFormat:@"%@/inspector/device?name=%@&app=%@",self.debugHost,escapedDeviceName, escapedAppName]];
        _inspectorPackagerConnection = [[HMInspectorPackagerConnection alloc] initWithUrl:inspectorDeviceUrl];
        [_inspectorPackagerConnection connect];
    }
#endif
}


- (void)stopDebugConnection {
    
#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)
    [self.inspectorPackagerConnection closeQuietly];
    self.inspectorPackagerConnection = nil;
#endif
}


@end
