#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMInspectorPackagerConnection : NSObject

@property (nonatomic, assign, readonly) BOOL isConnected;

- (nullable instancetype)initWithUrl:(nullable NSURL *)url NS_DESIGNATED_INITIALIZER;

- (instancetype)init NS_UNAVAILABLE;

- (void)connect;

- (void)closeQuietly;

//- (void)sendEventToAllConnections:(NSString *)event;

@end

@interface HMInspectorRemoteConnection : NSObject

- (nullable instancetype)initWithPackagerConnection:(nullable HMInspectorPackagerConnection *)owningPackagerConnection pageId:(nullable NSString *)pageId NS_DESIGNATED_INITIALIZER;

- (instancetype)init NS_UNAVAILABLE;

- (void)onMessage:(nullable NSString *)message;

- (void)onDisconnect;

@end

NS_ASSUME_NONNULL_END
