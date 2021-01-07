//
//  HMLoggerProtocol.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, HMLogLevel) {
    HMLogLevelDebug,
    HMLogLevelInfo,
    HMLogLevelWarning,
    HMLogLevelError,
    HMLogLevelTrace,
};

@protocol HMLoggerProtocol <NSObject>
@optional

- (BOOL)handleJSLog:(NSString *)log level:(HMLogLevel)level;
- (BOOL)handleNativeLog:(NSString *)log level:(HMLogLevel)level;

@end

NS_ASSUME_NONNULL_END
