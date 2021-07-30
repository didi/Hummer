#import <Foundation/Foundation.h>

@class HMInspectorRemoteConnection;

NS_ASSUME_NONNULL_BEGIN

@interface HMInspectorLocalConnection : NSObject

- (void)sendMessage:(nullable NSString *)message;

- (void)disconnect;

@end

// TODO(ChasonTang): Plain Ordinary Object
@interface HMInspectorPage : NSObject

@property (nonatomic, readonly, assign) NSInteger id;

@property (nonatomic, readonly, copy, nullable) NSString *title;

@property (nonatomic, readonly, copy, nullable) NSString *vm;

- (instancetype)initWithId:(NSInteger)id title:(nullable NSString *)title vm:(nullable NSString *)vm NS_DESIGNATED_INITIALIZER;

- (instancetype)init;

@end

@interface HMInspector : NSObject

+ (nullable NSArray<HMInspectorPage *> *)pages;

+ (nullable HMInspectorLocalConnection *)connectPage:(NSInteger)pageId
                                 forRemoteConnection:(nullable HMInspectorRemoteConnection *)remote;

- (instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
