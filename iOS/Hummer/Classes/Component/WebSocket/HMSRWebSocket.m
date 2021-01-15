//
//  HMSRWebSocket.m
//  WebSocket
//
//  Created by didi on 2020/10/10.
//

#import "HMSRWebSocket.h"
#import <SocketRocket/SRWebSocket.h>
#import "NSData+HMConvertible.h"
#import "NSString+HMConvertible.h"


@interface HMSRWebSocket()<SRWebSocketDelegate>
@property (nonatomic, strong) SRWebSocket *webSocket;

@end

@implementation HMSRWebSocket
@synthesize delegate;

- (instancetype)init {
    self = [super init];
    if (self) {
        [self setup];
    }
    return self;
}

- (void)setup {
}

#pragma mark - SRWebSocketDelegate

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message {
    if ([self.delegate respondsToSelector:@selector(webSocket:didReceiveMessage:)]) {
        [self.delegate webSocket:self didReceiveMessage:message];
    }
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket {
    if ([self.delegate respondsToSelector:@selector(webSocketDidOpen:)]) {
        [self.delegate webSocketDidOpen:self];
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error {
    if ([self.delegate respondsToSelector:@selector(webSocket:didFailWithError:)]) {
        [self.delegate webSocket:self didFailWithError:error];
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean {
    if ([self.delegate respondsToSelector:@selector(webSocket:didCloseWithCode:reason:wasClean:)]) {
        [self.delegate webSocket:self didCloseWithCode:code reason:reason wasClean:wasClean];
    }
}

#pragma mark - HMWebSocketAdaptor

- (void)openWithWSUrl:(NSURL *)wsUrl {

    self.webSocket = [[SRWebSocket alloc] initWithURL:wsUrl];
    self.webSocket.delegate = self;
    [self.webSocket open];
}

- (void)send:(nonnull NSString *)message {
//    if (self.webSocket.readyState != SR_CONNECTING) {return;}
    [self.webSocket send:message];
}


- (void)close:(NSInteger)code reason:(nullable id<HMStringDataConvertible>)reason{
    [self.webSocket closeWithCode:code reason:[reason hm_asString]];
    self.webSocket.delegate = nil;
    self.webSocket = nil;
}
@end
