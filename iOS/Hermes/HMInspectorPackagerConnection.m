#import "HMInspectorPackagerConnection.h"
#import <SocketRocket/SocketRocket.h>
#import "HMInspector.h"

static const uint16_t RECONNECT_DELAY_MS = 2000;


NS_ASSUME_NONNULL_BEGIN

@interface HMInspectorPackagerConnection () <SRWebSocketDelegate>

@property (nonatomic, copy) NSURL *url;

@property (nonatomic, nullable, copy) NSDictionary<NSString *, HMInspectorLocalConnection *> *inspectorConnection;

@property (nonatomic, nullable, strong) SRWebSocket *webSocket;

@property (nonatomic, strong) dispatch_queue_t jsQueue;

//目前js运行在主线，因此在自线程进行重试。
@property (nonatomic, strong) dispatch_queue_t retryQueue;

@property (nonatomic, assign) BOOL closed;

@property (nonatomic, assign) BOOL suppressConnectionErrors;

- (void)handleProxyMessage:(nullable NSDictionary<NSString *, id> *)message;

- (void)closeAllConnections;

- (void)handleConnect:(nullable NSDictionary *)payload;

- (void)handleDisconnect:(nullable NSDictionary *)payload;

- (void)removeConnectionForPage:(nullable NSString *)pageId;

- (void)handleWrappedEvent:(nullable NSDictionary *)payload;

- (nullable NSArray *)pages;

- (void)sendWrappedEvent:(nullable NSString *)pageId message:(nullable NSString *)message;

- (void)sendEvent:(nullable NSString *)name payload:(nullable id)payload;

- (void)abort:(nullable NSString *)message withCause:(nullable NSError *)cause;

- (void)disposeWebSocket;

- (void)reconnect;

- (void)sendToPackager:(nullable NSDictionary *)messageObject;

@end

@interface HMInspectorRemoteConnection ()

@property (nonatomic, weak) HMInspectorPackagerConnection *owningPackagerConnection;

@property (nonatomic, copy) NSString *pageId;

@end

NS_ASSUME_NONNULL_END

@implementation HMInspectorPackagerConnection

- (void)closeQuietly {
    self.closed = true;
    [self disposeWebSocket];
}

- (instancetype)initWithUrl:(NSURL *)url {
    if (!url) {
        return nil;
    }
    dispatch_queue_t jsQueue = dispatch_queue_create("com.didi.hummer.WebSocketExecutor", DISPATCH_QUEUE_SERIAL);
    dispatch_queue_t retryQueue = dispatch_queue_create("com.didi.hummer.Packager.RetryQueue", DISPATCH_QUEUE_SERIAL);

    if (!jsQueue) {
        return nil;
    }
    self = [super init];
    _jsQueue = jsQueue;
    _retryQueue = retryQueue;
    _url = url.copy;

    return self;
}

- (void)handleProxyMessage:(nullable NSDictionary<NSString *, id> *)message {
    NSString *event = message[@"event"];
    NSDictionary *payload = message[@"payload"];
    if ([@"getPages" isEqualToString:event]) {
        [self sendEvent:event payload:[self pages]];
    } else if ([@"wrappedEvent" isEqualToString:event]) {
        [self handleWrappedEvent:payload];
    } else if ([@"connect" isEqualToString:event]) {
        [self handleConnect:payload];
    } else if ([@"disconnect" isEqualToString:event]) {
        [self handleDisconnect:payload];
    } else {
#ifndef NDEBUG
        NSLog(@"Unknown event: %@", event);
#endif
    }
}

- (void)closeAllConnections {
    [self.inspectorConnection enumerateKeysAndObjectsUsingBlock:^(NSString *_Nonnull key, HMInspectorLocalConnection *_Nonnull obj, BOOL *_Nonnull stop) {
        [obj disconnect];
    }];
    self.inspectorConnection = nil;
}

- (void)handleConnect:(NSDictionary *)payload {
    NSString *pageId = payload[@"pageId"] ?: @"";
    HMInspectorLocalConnection *existingConnection = self.inspectorConnection[pageId];
    if (existingConnection) {
        NSMutableDictionary<NSString *, HMInspectorLocalConnection *> *inspectorConnection = self.inspectorConnection.mutableCopy;
        self.inspectorConnection = nil;
        inspectorConnection[pageId] = nil;
        self.inspectorConnection = inspectorConnection;
        [existingConnection disconnect];
#ifndef NDEBUG
        NSLog(@"Already connected: %@", pageId);
#endif

        return;
    }
    HMInspectorRemoteConnection *remoteConnection = [[HMInspectorRemoteConnection alloc] initWithPackagerConnection:self pageId:pageId];
    NSMutableDictionary<NSString *, HMInspectorLocalConnection *> *inspectorConnection = self.inspectorConnection.mutableCopy;
    self.inspectorConnection = nil;
    if (!inspectorConnection) {
        inspectorConnection = NSMutableDictionary.dictionary;
    }
    inspectorConnection[pageId] = [HMInspector connectPage:pageId.integerValue forRemoteConnection:remoteConnection];
    self.inspectorConnection = inspectorConnection;
}

- (void)handleDisconnect:(nullable NSDictionary *)payload {
    NSString *pageId = payload[@"pageId"];
    HMInspectorLocalConnection *inspectorConnection = self.inspectorConnection[pageId];
    if (inspectorConnection) {
        [self removeConnectionForPage:pageId];
        [inspectorConnection disconnect];
    }
}

- (void)removeConnectionForPage:(NSString *)pageId {
    NSMutableDictionary<NSString *, HMInspectorLocalConnection *> *inspectorConnection = self.inspectorConnection.mutableCopy;
    self.inspectorConnection = nil;
    inspectorConnection[pageId ?: @""] = nil;
    self.inspectorConnection = inspectorConnection;
}

- (void)handleWrappedEvent:(NSDictionary *)payload {
    NSString *pageId = payload[@"pageId"];
    NSString *wrappedEvent = payload[@"wrappedEvent"];
    HMInspectorLocalConnection *inspectorConnection = self.inspectorConnection[pageId];
    if (!inspectorConnection) {
#ifndef NDEBUG
        NSLog(@"Not connected to page: %@ , failed trying to handle event: %@", pageId, wrappedEvent);
#endif

        return;
    }
    [inspectorConnection sendMessage:wrappedEvent];
}

- (NSArray *)pages {
    NSArray<HMInspectorPage *> *pages = HMInspector.pages;
    if (!HMInspector.pages.count) {
        return nil;
    }
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:pages.count];
    [pages enumerateObjectsUsingBlock:^(HMInspectorPage *_Nonnull obj, NSUInteger idx, BOOL *_Nonnull stop) {
        NSDictionary *jsonPage = @{
                @"id": @(obj.id).stringValue,
                @"title": obj.title ?: @"",
                @"app": NSBundle.mainBundle.bundleIdentifier ?: @"",
                @"vm": obj.vm ?: @""
        };
        [array addObject:jsonPage];
    }];

    return array;
}

- (void)sendWrappedEvent:(NSString *)pageId message:(NSString *)message {
    [self sendEvent:@"wrappedEvent" payload:@{
            @"pageId": pageId ?: @"",
            @"wrappedEvent": message ?: @"",
    }];
}

- (void)sendEvent:(NSString *)name payload:(id)payload {
    [self sendToPackager:@{
            @"event": name ?: @"",
            @"payload": payload ?: @"",
    }];
}

#pragma mark - SRWebSocketDelegate

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error {
    if (self.webSocket) {
        [self abort:@"WebSocket exception" withCause:error];
    }
    if (!self.closed) {
        [self reconnect];
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message {
    // warn but don't die on unrecognized messages
    if (![message isKindOfClass:NSString.class]) {
#ifndef NDEBUG
        NSLog(@"Unrecognized inspector message, object is of type: %@", [message class]);
#endif

        return;
    }

    NSString *messageText = message;
    NSError *error = nil;

    id parsedJSON = nil;
    NSData *jsonData = [messageText dataUsingEncoding:NSUTF8StringEncoding];
    if (!jsonData) {
        jsonData = [messageText dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:YES];
        if (jsonData) {
#ifndef NDEBUG
            NSLog(@"HMJSONParse received the following string, which could "
                  "not be losslessly converted to UTF8 data: '%@'",
                    messageText);
#endif
        } else {
#ifndef NDEBUG
            NSLog(@"HMJSONParse received invalid UTF8 data");
            NSLog(@"Unrecognized inspector message, string was not valid JSON: %@", messageText);
#endif
        }
    }
    if (!jsonData) {
        return;
    }
    NSJSONReadingOptions options = NSJSONReadingAllowFragments;
    parsedJSON = [NSJSONSerialization JSONObjectWithData:jsonData options:options error:&error];

    if (!parsedJSON || error) {
#ifndef NDEBUG
        NSLog(@"Unrecognized inspector message, string was not valid JSON: %@", messageText);
#endif

        return;
    }

    [self handleProxyMessage:parsedJSON];
}

- (void)abort:(NSString *)message withCause:(NSError *)cause {
    // Don't log ECONNREFUSED at all; it's expected in cases where the server isn't listening.
    if (![cause.domain isEqual:NSPOSIXErrorDomain] || cause.code != ECONNREFUSED) {
#ifndef NDEBUG
        NSLog(@"Error occurred, shutting down websocket connection: %@ %@", message, cause);
#endif
    }

    [self closeAllConnections];
    [self disposeWebSocket];
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean {
    self.webSocket = nil;
    [self closeAllConnections];
    if (!self.closed) {
        [self reconnect];
    }
}

- (void)disposeWebSocket {
    if (self.webSocket) {
        [self.webSocket closeWithCode:1000 reason:@"End of session"];
        self.webSocket.delegate = nil;
        self.webSocket = nil;
    }
}

- (BOOL)isConnected {
    return self.webSocket;
}

- (void)connect {
    if (_closed) {
#ifndef NDEBUG
        NSLog(@"Illegal state: Can't connect after having previously been closed.");
#endif

        return;
    }

    // The corresponding android code has a lot of custom config options for
    // timeouts, but it appears the iOS RCTSRWebSocket API doesn't have the same
    // implemented options.
    self.webSocket = [[SRWebSocket alloc] initWithURL:self.url];
    [self.webSocket setDelegateDispatchQueue:self.jsQueue];
    self.webSocket.delegate = self;
    [self.webSocket open];
}

- (void)reconnect {
    if (self.closed) {
#ifndef NDEBUG
        NSLog(@"Illegal state: Can't reconnect after having previously been closed.");
#endif

        return;
    }

    if (self.suppressConnectionErrors) {
#ifndef NDEBUG
        NSLog(@"Couldn't connect to packager, will silently retry");
#endif
        self.suppressConnectionErrors = YES;
    }

    __weak HMInspectorPackagerConnection *weakSelf = self;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, RECONNECT_DELAY_MS * NSEC_PER_MSEC), self.retryQueue, ^{
        HMInspectorPackagerConnection *strongSelf = weakSelf;
        if (strongSelf && !strongSelf.closed) {
            [strongSelf connect];
        }
    });
}

- (void)sendToPackager:(nullable NSDictionary *)messageObject {
    __weak HMInspectorPackagerConnection *weakSelf = self;
    dispatch_async(self.jsQueue, ^{
        HMInspectorPackagerConnection *strongSelf = weakSelf;
        if (strongSelf && !strongSelf.closed) {
            NSError *error;
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:messageObject
                                                               options:(NSJSONWritingOptions) NSJSONReadingAllowFragments
                                                                 error:&error];
            NSString *messageText = jsonData ? [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding] : nil;
            if (!messageText || error) {
#ifndef NDEBUG
                NSLog(@"Couldn't send event to packager: %@", error);
#endif
            } else {
                [strongSelf.webSocket send:messageText];
            }
        }
    });
}

@end

@implementation HMInspectorRemoteConnection

- (instancetype)initWithPackagerConnection:(HMInspectorPackagerConnection *)owningPackagerConnection
                                    pageId:(NSString *)pageId {
    if (!owningPackagerConnection || !pageId) {
        return nil;
    }
    self = [super init];
    _owningPackagerConnection = owningPackagerConnection;
    _pageId = pageId.copy;

    return self;
}

- (void)onMessage:(NSString *)message {
    [self.owningPackagerConnection sendWrappedEvent:self.pageId message:message];
}

- (void)onDisconnect {
    HMInspectorPackagerConnection *owningPackagerConnectionStrong = self.owningPackagerConnection;
    if (owningPackagerConnectionStrong) {
        [owningPackagerConnectionStrong removeConnectionForPage:self.pageId];
        [owningPackagerConnectionStrong sendEvent:@"disconnect" payload:@{@"pageId": self.pageId ?: @""}];
    }
}

@end
