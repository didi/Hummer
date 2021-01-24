//
//  HMConsole.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/9/7.
//

#import "HMConsole.h"
#import "HMExportManager.h"
#import "HMBaseExecutorProtocol.h"
#import "HMBaseValue.h"
#import "HMLogger.h"

@implementation HMConsole

HM_EXPORT_CLASS(console, HMConsole)

HM_EXPORT_CLASS_METHOD(log, log)

HM_EXPORT_CLASS_METHOD(info, info)

HM_EXPORT_CLASS_METHOD(warn, warn)

HM_EXPORT_CLASS_METHOD(error, error)

HM_EXPORT_CLASS_METHOD(trace, trace)

+ (void)log {
    [self logToNativeWithLevel:HMLogLevelDebug];
}

+ (void)info {
    [self logToNativeWithLevel:HMLogLevelInfo];
}

+ (void)warn {
    [self logToNativeWithLevel:HMLogLevelWarning];
}

+ (void)error {
    [self logToNativeWithLevel:HMLogLevelError];
}

+ (void)trace {
    [self logToNativeWithLevel:HMLogLevelTrace];
}

+ (void)logToNativeWithLevel:(HMLogLevel)logLevel {
    NSMutableString *string = NSMutableString.string;
    [HMOtherArguments enumerateObjectsUsingBlock:^(HMBaseValue * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        id argString = obj.toObject;
        [string appendFormat:@"%@", argString];
    }];
    [HMLogger printJSLog:string level:logLevel];
}

@end
