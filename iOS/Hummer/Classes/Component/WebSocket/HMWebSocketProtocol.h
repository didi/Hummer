//
//  HMWebSocketProtocol.h
//  Hummer
//
//  Created by didi on 2020/10/10.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
@protocol HMWebSocketDelegate;
@protocol HMStringDataConvertible;
@protocol HMWebSocketAdaptor <NSObject>

@required
- (void)send:(NSString *)message;
- (void)openWithWSUrl:(NSURL *)wsUrl;
- (void)close:(NSInteger)code reason:(nullable id<HMStringDataConvertible>)reason;

@property (nonatomic, weak)id<HMWebSocketDelegate> delegate;
@end


@protocol HMWebSocketDelegate <NSObject>

@optional
- (void)webSocket:(id<HMWebSocketAdaptor>)webSocket didReceiveMessage:(id)message;

- (void)webSocketDidOpen:(id<HMWebSocketAdaptor>)webSocket;

- (void)webSocket:(id<HMWebSocketAdaptor>)webSocket didFailWithError:(NSError *)error;

- (void)webSocket:(id<HMWebSocketAdaptor>)webSocket didCloseWithCode:(NSInteger)code reason:(id<HMStringDataConvertible>)reason wasClean:(BOOL)wasClean;
@end



NS_ASSUME_NONNULL_END
