//
//  HMDebugService.m
//  Hummer
//
//  Created by didi on 2021/10/25.
//

#import "HMDebugService.h"
#include "NSString+Hummer.h"
#import "HMUtility.h"
#import "HMDevService.h"

#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)

#import <Hummer/HMInspectorPackagerConnection.h>

#endif


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

- (NSArray *)getDevPages:(NSNumber *)devPort {
        
    dispatch_semaphore_t lock = dispatch_semaphore_create(0);
    NSMutableArray *array = [[NSMutableArray alloc] init];
    [[HMDevService sharedService].cliSession requesWithUrl:[NSString stringWithFormat:@"%@%@?devPort=%@",self.debugHost,_devPagePath,devPort] completionHandler:^(id  _Nullable response, NSError * _Nullable error) {
        
        if (response) {
            if ([response[@"code"] intValue] == 0) {
                [array addObjectsFromArray:response[@"data"]];
            }
        }
        dispatch_semaphore_signal(lock);
    }];
    dispatch_semaphore_wait(lock, DISPATCH_TIME_FOREVER);
    return [array copy];
}

- (void)getDevPages:(NSNumber *)port asyncCallback:(HMDebugServiceDevPagesCallBack)callback{
    dispatch_async(self.getPageQueue, ^{
        NSArray *array = [self getDevPages:port];
        callback(array);
    });
}

// 手动设置,将不会做调试服务检查
- (void)setDebugServiceHost:(NSString *)debugHost {

    _debugHost = debugHost;
    [self startDebugConnection];
}

// 通过 dev/pages/list 判断是否为 debug host。
- (NSArray *)guessDebugHostWithDevUrl:(id<HMURLConvertible>)devUrl autoConnect:(BOOL)autoConnect {

    NSURL *url = [devUrl hm_asUrl];
    NSString *host = url.host;
    NSNumber *port = url.port;
    if ([host isPureIP] && port) {
        self.debugHost = [NSString stringWithFormat:@"http://%@:%@", host, _debugPort];
        NSArray *debugServiceIsReady = [self getDevPages:port];
        if (autoConnect && debugServiceIsReady) {
            [self startDebugConnection];
        }
        return debugServiceIsReady;
    }
    return @[];
}

- (BOOL)shouldWaitForDebugWithScriptUrl:(id<HMURLConvertible>)scriptUrl {
    
    NSURL *url = [scriptUrl hm_asUrl];
    NSString *host = url.host;
    NSNumber *port = url.port;
    if ([host isPureIP] && port) {
        NSArray *debugablePages = [self getDevPages:port];
        return [debugablePages containsObject:scriptUrl.hm_asString];
    }
    return false;
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
