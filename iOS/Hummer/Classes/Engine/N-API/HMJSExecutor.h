#import <Hummer/HMBaseExecutorProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMJSExecutor : NSObject <HMBaseExecutorProtocol>

@property (nonatomic, copy, nullable) HMExceptionHandler exceptionHandler;

@property (nonatomic, copy, nullable) void (^consoleHandler)(NSString *_Nullable logString, HMLogLevel logLevel);

@property (nonatomic, copy, nullable) void (^webSocketHandler)(NSString *_Nullable logString, HMLogLevel logLevel);

- (nullable instancetype)init NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END

