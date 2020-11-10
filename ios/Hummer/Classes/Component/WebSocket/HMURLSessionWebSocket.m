//
//  HMURLSessionWebSocket.m
//  Hummer
//
//  Created by didi on 2020/10/10.
//

#import "HMURLSessionWebSocket.h"
#import "NSData+HMConvertible.h"
#import "NSString+HMConvertible.h"

@interface HMURLSessionWebSocket()<NSURLSessionWebSocketDelegate>

@property (nonatomic, strong)NSURLSession *session;
@property (nonatomic, strong)NSURLSessionWebSocketTask *task;


@end

@implementation HMURLSessionWebSocket
@synthesize delegate;

- (instancetype)init {
    self = [super init];
    if (self) {
        [self setup];
    }
    return self;
}

- (void)setup {
    
    dispatch_queue_t wsq = dispatch_queue_create("hummer.webSocket.gcd.queue", DISPATCH_QUEUE_SERIAL);
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    queue.name = @"hummer.webSocket.delegateQueue";
    queue.maxConcurrentOperationCount = 1;
    queue.underlyingQueue = wsq;
    self.session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:queue];
}

#pragma mark - HMWebSocketAdaptor

- (void)openWithWSUrl:(NSURL *)wsUrl{
    
    self.task = [self.session webSocketTaskWithURL:wsUrl];
    [self.task resume];
    [self listen];
}

- (void)listen {
   
    [self.task receiveMessageWithCompletionHandler:^(NSURLSessionWebSocketMessage * _Nullable message, NSError * _Nullable error) {
        if (error) {
            if ([self.delegate respondsToSelector:@selector(webSocket:didFailWithError:)]) {
                [self.delegate webSocket:self didFailWithError:error];
            }
        }else{
            if ([self.delegate respondsToSelector:@selector(webSocket:didReceiveMessage:)]) {
                [self.delegate webSocket:self didReceiveMessage:message.data?:message.string];
            }
        }
        if (message && !error) {
            [self listen];
        }
    }];

}

- (void)send:(NSString *)message {
    NSURLSessionWebSocketMessage *msg = [[NSURLSessionWebSocketMessage alloc] initWithString:message];
    [self.task sendMessage:msg completionHandler:^(NSError * _Nullable error) {
        if (error) {
            if ([self.delegate respondsToSelector:@selector(webSocket:didFailWithError:)]) {
                [self.delegate webSocket:self didFailWithError:error];
            }
        }
    }];
}

- (void)close:(NSInteger)code reason:(nullable id<HMStringDataConvertible>)reason{
    [self.task cancelWithCloseCode:code reason:[reason hm_asData]];
}


#pragma mark <NSURLSessionWebSocketDelegate>

- (void)URLSession:(NSURLSession *)session webSocketTask:(NSURLSessionWebSocketTask *)webSocketTask didOpenWithProtocol:(NSString *)protocol {
    if ([self.delegate respondsToSelector:@selector(webSocketDidOpen:)]) {
        [self.delegate webSocketDidOpen:self];
    }
}

- (void)URLSession:(NSURLSession *)session webSocketTask:(NSURLSessionWebSocketTask *)webSocketTask didCloseWithCode:(NSURLSessionWebSocketCloseCode)closeCode reason:(NSData *)reason {
    if ([self.delegate respondsToSelector:@selector(webSocket:didCloseWithCode:reason:wasClean:)]) {
        [self.delegate webSocket:self didCloseWithCode:closeCode reason:reason wasClean:YES];
    }
}

@end
