//
//  HMDevGlobalWebSocket.m
//  Hummer
//
//  Created by didi on 2021/12/25.
//

#import "HMDevGlobalWebSocket.h"
#import <Hummer/HMDevService.h>
#import <SocketRocket/SRWebSocket.h>
#import <objc/message.h>
#import "HMUtility.h"

@interface HMDevLocalConnection ()
@property (nonatomic, copy, readwrite) NSString *pageUrl;
@property (nonatomic, weak) HMDevGlobalWebSocket *remote;
@end

@implementation HMDevLocalConnection

- (void)dealloc {
    [self.remote closeLocalConnection:self];
}

- (instancetype)initWithPage:(id<HMURLConvertible>)url remoteConnection:(HMDevGlobalWebSocket *)remote{
    
    self.pageUrl = [url hm_asString];
    self.remote = remote;
    return self;
}

- (void)sendMessage:(NSString *)message completionHandler:(nullable void (^)(NSError * _Nullable error))completionHandler {
    //SR_CONNECTING = 0, SR_OPEN = 1,
    if (self.remote && [self.remote canSend]) {
        NSError *error = nil;
        //兼容 socket 版本。
        SEL newer060API = NSSelectorFromString(@"sendString:error:");
        SEL older060API = NSSelectorFromString(@"send:");
        if ([self.remote.webSocket respondsToSelector:newer060API]) {

            ((void(*)(id, SEL,NSString *, NSError **))objc_msgSend)(self.remote.webSocket, newer060API, message, &error);
        }else if ([self.remote.webSocket respondsToSelector:older060API]){

            ((void(*)(id, SEL,NSString *))objc_msgSend)(self.remote.webSocket, older060API, message);
        }
        if (completionHandler) {
            completionHandler(error);
        }
    }
}

- (void)close {
    [self.remote closeLocalConnection:self];
}

@end

@interface HMDevGlobalWebSocket ()<SRWebSocketDelegate>
@property (nonatomic, strong) dispatch_queue_t cliWSQueue;
@property (nonatomic, strong, readwrite) SRWebSocket *webSocket;
@property (nonatomic, strong, readwrite) NSHashTable<HMDevLocalConnection *> *localConnections;
@property (nonatomic, strong, readwrite) NSURL *wsURL;

@end


@implementation HMDevGlobalWebSocket

- (instancetype)initWithURL:(NSURL *)url {
    
    self = [super init];
    if (self) {
        _wsURL = url;
        _localConnections = [NSHashTable weakObjectsHashTable];
        _cliWSQueue = dispatch_queue_create("com.hummer.cliWebSocket.thread", DISPATCH_QUEUE_SERIAL);
        _webSocket = [[SRWebSocket alloc] initWithURL:url];
        _webSocket.delegate = self;
        _webSocket.delegateDispatchQueue = self.cliWSQueue;
        [_webSocket open];
    }
    return self;
}

- (BOOL)canSend {
    return self.webSocket && self.webSocket.readyState == SR_OPEN;
}
- (HMDevLocalConnection *)getLocalConnection:(id<HMURLConvertible>)pageUrl {
    
    HMDevLocalConnection *localConnection = [[HMDevLocalConnection alloc] initWithPage:pageUrl remoteConnection:self];
    // call at main queue
    @synchronized (self) {
        [self.localConnections addObject:localConnection];
    }
    return localConnection;
}

- (void)closeLocalConnection:(HMDevLocalConnection *)localConnection {
    // call at any thread
    BOOL shouldCloseRemote = NO;
    @synchronized (self) {
        [self.localConnections removeObject:localConnection];
        if ([self.localConnections allObjects].count == 0) {
            shouldCloseRemote = YES;
        }
    }
    if (shouldCloseRemote) {
        HMExecOnMainQueue(^{
            [[HMDevService sharedService] closeWebSocket:self];
        });
    }
}
#pragma mark <SRWebSocketDelegate>
- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message {
    NSDictionary *messageDic = _HMObjectFromJSONString(message);
    NSArray *locals = nil;
    @synchronized (self) {
        locals = [self.localConnections allObjects];
    }
    if (messageDic) {
        NSDictionary *urlParam = [messageDic valueForKey:@"params"];
        NSString *URLString = [urlParam valueForKey:@"url"];
        if (URLString) {
            [locals enumerateObjectsUsingBlock:^(HMDevLocalConnection  *local, NSUInteger idx, BOOL * _Nonnull stop) {
                if ([local.pageUrl isEqualToString:URLString]) {
                    if (local.receiveHandler) {
                        HMExecOnMainQueue(^{
                            local.receiveHandler(messageDic);
                        });
                    }
                }
            }];
            return;
        }
    }
    
    //without specify url, notify all local connection
    if (messageDic) {
        [locals enumerateObjectsUsingBlock:^(HMDevLocalConnection  *local, NSUInteger idx, BOOL * _Nonnull stop) {
            if (local.receiveHandler) {
                HMExecOnMainQueue(^{
                    local.receiveHandler(messageDic);
                });
            }
        }];
        
    }
    
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket {
    NSLog(@"----->>> %@", @"webSocketDidOpen");
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error {
    NSLog(@"----->>> %@", error.localizedFailureReason);
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(nullable NSString *)reason wasClean:(BOOL)wasClean {
    
    HMExecOnMainQueue(^{
        [[HMDevService sharedService] closeWebSocket:self];
    });
}

@end
