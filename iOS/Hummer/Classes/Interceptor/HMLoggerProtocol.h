//
//  HMLoggerProtocol.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMBaseExecutorProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMLoggerProtocol <NSObject>
@optional

- (BOOL)handleJSLog:(NSString *)log level:(HMLogLevel)level;
- (BOOL)handleNativeLog:(NSString *)log level:(HMLogLevel)level DEPRECATED_MSG_ATTRIBUTE("违背 namespace 设计");;

@end

NS_ASSUME_NONNULL_END
