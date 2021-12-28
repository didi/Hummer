#import "HMWebSocket.h"
#import <Hummer/HMJSGlobal.h>
#import <Hummer/HMExportManager.h>
#import <Hummer/HMBaseValue.h>
#import <Hummer/NSString+HMConvertible.h>
#import <Hummer/NSObject+Hummer.h>
#import <SocketRocket/SRWebSocket.h>

NS_ASSUME_NONNULL_BEGIN

// TODO(ChasonTang): iOS 13 后替换为系统库
@interface HMWebSocket () <SRWebSocketDelegate>

/// 持有连接资源
@property (nonatomic, strong, nullable) SRWebSocket *webSocket;

@property (nonatomic, copy, nullable) HMFunctionType onOpen;

@property (nonatomic, copy, nullable) HMFunctionType onClose;

@property (nonatomic, copy, nullable) HMFunctionType onError;

@property (nonatomic, copy, nullable) HMFunctionType onMessage;

@property (nonatomic, weak, nullable) HMJSContext *context;

- (void)send:(nullable HMBaseValue *)data;

@end

NS_ASSUME_NONNULL_END

@implementation HMWebSocket

HM_EXPORT_CLASS(WebSocket, HMWebSocket)

HM_EXPORT_PROPERTY(onopen, onOpen, setOnOpen:)

HM_EXPORT_PROPERTY(onclose, onClose, setOnClose:)

HM_EXPORT_PROPERTY(onerror, onError, setOnError:)

HM_EXPORT_PROPERTY(onmessage, onMessage, setOnMessage:)

HM_EXPORT_METHOD(close, close)

HM_EXPORT_METHOD(send, send:)

- (void)close {
    HMAssertMainQueue();
    [self.webSocket close];
    self.webSocket = nil;

    self.onOpen = nil;
    self.onError = nil;
    self.onClose = nil;
    self.onMessage = nil;
    // 将自身从集合中移除
    if (self.context) {
        NSMutableSet<HMWebSocket *> *webSocketSet = self.context.webSocketSet.mutableCopy;
        self.context.webSocketSet = nil;
        [webSocketSet removeObject:self];
        if (webSocketSet.count > 0) {
            self.context.webSocketSet = webSocketSet;
        }
    }
}

- (void)send:(HMBaseValue *)data {
    HMAssertMainQueue();
    NSString *dataString = data.toString;
    if (!dataString) {
        return;
    }
    // 如果当前连接尚未准备好，则忽略错误，或者抛出 JS 异常
    // 正常应当从 onopen 调用后开始 send
    [self.webSocket send:dataString];
}

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    HMAssertMainQueue();
    // 可空构造
    HMBaseValue *urlValue = values.firstObject;
    NSString *urlString = urlValue.toString;
    if (!urlString || !HMCurrentExecutor) {
        return nil;
    }
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    if (!context) {
        return nil;
    }
    NSURL *url = [NSURL URLWithString:urlString];
    if (!url) {
        return nil;
    }
    self = [super init];
    _webSocket = [[SRWebSocket alloc] initWithURL:url];
    _webSocket.delegate = self;
    [_webSocket open];
    _context = context;

    return self;
}

/// MARK: - SRWebSocketDelegate

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message {
    if ([message isKindOfClass:NSString.class]) {
        [self webSocket:webSocket didReceiveMessageWithString:message];
    } else {
        NSAssert(NO, @"webSocket:didReceiveMessage: pass unknown message object");
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessageWithString:(NSString *)string {
    HMAssertMainQueue();
    // 调用回调
    self.onMessage ? self.onMessage(@[@{@"data": string}]) : nil;
}

// - webSocket:didReceiveMessageWithData: 暂时不实现

- (void)webSocketDidOpen:(SRWebSocket *)webSocket {
    HMAssertMainQueue();
    // 将自身加入到集合
    if (!self.context) {
        return;
    }
    NSMutableSet<HMWebSocket *> *webSocketSet = self.context.webSocketSet.mutableCopy;
    self.context.webSocketSet = nil;
    if (!webSocketSet) {
        webSocketSet = NSMutableSet.set;
    }
    [webSocketSet addObject:self];
    self.context.webSocketSet = webSocketSet;
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error {
    HMAssertMainQueue();
    if (webSocket.readyState != SR_OPEN) {
        // 主要是清理资源，防止连接建立失败后，依然存在闭包，并且需要调用 onclose
        self.onClose ? self.onClose(@[@{}]) : nil;
        [self close];
    } else {
        self.onError ? self.onError(@[@{}]) : nil;
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean {
    HMAssertMainQueue();
    self.onClose ? self.onClose(@[@{}]) : nil;
}

@end

