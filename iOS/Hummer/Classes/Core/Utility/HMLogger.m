//
//  HMLogger.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMInterceptor.h"

@implementation HMLogger

void _HMLogInternal(HMLogLevel level,
                    NSString *func,
                    NSString *file,
                    NSUInteger line,
                    NSString *format, ...) {
    NSString *levelString = nil;
    switch (level) {
        case HMLogLevelError: levelString = @"[ERROR]"; break;
        case HMLogLevelWarning: levelString = @"[WARNING]"; break;
        case HMLogLevelInfo: levelString = @"[INFO]"; break;
        case HMLogLevelTrace: levelString = @"[TRACE]"; break;
        default: levelString = @"[FATAL]"; break;
    }
    
    va_list args;
    va_start(args, format);
    NSString *message = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);

    
#if DEBUG
        NSLog(@"%@ 函数名:%@, 文件名:%@, 行数:%lu, %@", levelString, func, file, (unsigned long)line, message);
#endif
}

- (BOOL)handleNativeLog:(NSString *)log level:(HMLogLevel)level {

    return YES;
}

- (BOOL)handleJSLog:(NSString *)log level:(HMLogLevel)level {
    
    if (level == HMLogLevelInfo)     { HMLogInfo(@"%@", log); }
    if (level == HMLogLevelWarning)  { HMLogWarning(@"%@", log); }
    if (level == HMLogLevelError)    { HMLogError(@"%@", log); }
    if (level == HMLogLevelTrace)    { HMLogTrace(@"%@", log); }
    return YES;
}

+ (void)printJSLog:(NSString *)log level:(HMLogLevel)logLevel {
    NSArray *interceptors = [HMInterceptor interceptor:HMInterceptorTypeLog];
    BOOL isIntercept = NO;
    if (interceptors.count > 0) {
        for (id <HMLoggerProtocol> interceptor in interceptors) {
            if ([interceptor respondsToSelector:@selector(handleJSLog:level:)]) {
                isIntercept = [interceptor handleJSLog:log level:logLevel];
            }
        }
    }
    
    if (!isIntercept) {
        if (logLevel == HMLogLevelInfo)     { HMLogInfo(@"%@", log); }
        if (logLevel == HMLogLevelWarning)  { HMLogWarning(@"%@", log); }
        if (logLevel == HMLogLevelError)    { HMLogError(@"%@", log); }
        if (logLevel == HMLogLevelTrace)    { HMLogTrace(@"%@", log); }
    }
}

@end
