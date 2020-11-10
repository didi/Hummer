//
//  LogInterceptor.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "LogInterceptor.h"
#import "Hummer.h"

@interface LogInterceptor () <HMLoggerProtocol, HMReporterProtocol>

@end

@implementation LogInterceptor

HM_EXPORT_INTERCEPTOR(LogInterceptor)

#pragma mark - HMLoggerProtocol

- (BOOL)handleJSLog:(NSString *)log level:(HMLogLevel)level {
    NSLog(@"----- >> js log:%@",log);
    return YES;
}

- (BOOL)handleNativeLog:(NSString *)log level:(HMLogLevel)level {
    NSLog(@"----- >> native log:%@",log);
    return YES;
}

#pragma mark - HMReporterProtocol

- (void)handleJSPerformanceWithKey:(NSString *)key info:(NSDictionary *)info {
    NSLog(@"------ >> performance : %@", info.description);
}

@end
