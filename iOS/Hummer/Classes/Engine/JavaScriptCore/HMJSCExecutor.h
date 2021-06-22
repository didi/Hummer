//
//  HMJSCExecutor.h
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import <Hummer/HMBaseExecutorProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCExecutor : NSObject <HMBaseExecutorProtocol>

@property (nonatomic, copy, nullable) HMExceptionHandler exceptionHandler;

@property (nonatomic, copy, nullable) void (^consoleHandler)(NSString *_Nullable logString, HMLogLevel logLevel);

@property (nonatomic, copy, nullable) void (^webSocketHandler)(NSString *_Nullable logString, HMLogLevel logLevel);

@end

NS_ASSUME_NONNULL_END
