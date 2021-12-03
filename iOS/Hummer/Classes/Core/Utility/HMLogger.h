//
//  HMLogger.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMLoggerProtocol.h"

void _HMLogInternal(HMLogLevel level,
                    NSString * _Nullable func,
                    NSString * _Nullable file,
                    NSUInteger line,
                    NSString * _Nullable format, ...);

#define _HMLog(level, fmt, ...) \
do { \
_HMLogInternal(level, @(__func__), @(__FILE__), __LINE__, (fmt), ## __VA_ARGS__); \
} while(0)

#define HMLogDebug(format, ...)         _HMLog(HMLogLevelTrace, format, ##__VA_ARGS__)
#define HMLogWarning(format, ...)       _HMLog(HMLogLevelWarning, format ,##__VA_ARGS__)
#define HMLogError(format, ...)         _HMLog(HMLogLevelError, format, ##__VA_ARGS__)
#define HMLogInfo(format, ...)          _HMLog(HMLogLevelInfo, format, ##__VA_ARGS__)
#define HMLogTrace(format, ...)         _HMLog(HMLogLevelTrace, format, ##__VA_ARGS__)

@interface HMLogger : NSObject<HMLoggerProtocol>

+ (void)printJSLog:(nullable NSString *)log level:(HMLogLevel)logLevel DEPRECATED_MSG_ATTRIBUTE("使用 HMLoggerProtocol 协议方法代替");

@end
