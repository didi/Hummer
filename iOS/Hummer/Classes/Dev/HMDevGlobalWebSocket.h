//
//  HMDevGlobalWebSocket.h
//  Hummer
//
//  Created by didi on 2021/12/25.
//

#import <Foundation/Foundation.h>
#import <SocketRocket/SRWebSocket.h>
#import <HMURLConvertible.h>

NS_ASSUME_NONNULL_BEGIN
@class HMDevGlobalWebSocket;
typedef void(^LocalConnectionReceiveHandler)(NSDictionary *msgDic);
@interface HMDevLocalConnection : NSObject

@property (nonatomic, copy)LocalConnectionReceiveHandler receiveHandler;

@property (nonatomic, copy, readonly) NSString *pageUrl;

- (instancetype)init NS_UNAVAILABLE;
- (instancetype)initWithPage:(id<HMURLConvertible>)url remoteConnection:(HMDevGlobalWebSocket *)remoteConnection;

- (void)sendMessage:(NSString *)message completionHandler:(nullable void (^)(NSError * _Nullable error))completionHandler;

- (void)close;
@end

@interface HMDevGlobalWebSocket : NSObject

@property (nonatomic, strong, readonly) SRWebSocket *webSocket;
@property (nonatomic, strong, readonly) NSURL *wsURL;

- (instancetype)init NS_UNAVAILABLE;
- (instancetype)initWithURL:(NSURL *)url;

- (BOOL)canSend;
- (nullable HMDevLocalConnection *)getLocalConnection:(id<HMURLConvertible>)pageUrl;
- (void)closeLocalConnection:(HMDevLocalConnection *)localConnection;
@end
NS_ASSUME_NONNULL_END
