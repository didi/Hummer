#import <Hummer/HMBaseExecutorProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMJSExecutor : NSObject <HMBaseExecutorProtocol>


- (nullable instancetype)init NS_DESIGNATED_INITIALIZER;

- (void)enableDebuggerWithTitle:(nullable NSString *)title;

@end

NS_ASSUME_NONNULL_END

