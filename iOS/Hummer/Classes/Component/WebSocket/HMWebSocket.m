//
//  HMWebSocket.m
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMWebSocket.h"
#import "SRWebSocket.h"
#import "HMExportManager.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import "HMUtility.h"

//Close code: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent

@interface HMWebSocket () <SRWebSocketDelegate>

@property (nonatomic, strong) SRWebSocket *webSocket;

@property (nonatomic, copy) HMFuncCallback openCallback;
@property (nonatomic, copy) HMFuncCallback closeCallback;
@property (nonatomic, copy) HMFuncCallback errorCallback;
@property (nonatomic, copy) HMFuncCallback messageCallback;

@end

@implementation HMWebSocket

#pragma mark - Export

HM_EXPORT_CLASS(WebSocket, HMWebSocket)

HM_EXPORT_METHOD(onOpen, __onOpen:)
HM_EXPORT_METHOD(onClose, __onClose:)
HM_EXPORT_METHOD(onError, __onError:)
HM_EXPORT_METHOD(onMessage, __onMessage:)

HM_EXPORT_METHOD(connect, __connect:)
HM_EXPORT_METHOD(close, __close:reason:)
HM_EXPORT_METHOD(send, __send:)

+ (void)__onOpen:(HMFuncCallback)openCallback
{
    [HMWebSocket sharedInstance].openCallback = openCallback;
}

+ (void)__onClose:(HMFuncCallback)closeCallback
{
    [HMWebSocket sharedInstance].closeCallback = closeCallback;
}

+ (void)__onError:(HMFuncCallback)errorCallback
{
    [HMWebSocket sharedInstance].errorCallback = errorCallback;
}

+ (void)__onMessage:(HMFuncCallback)messageCallback
{
    [HMWebSocket sharedInstance].messageCallback = messageCallback;
}

+ (void)__connect:(JSValue *)jsValue
{
    NSString *wsUrl = jsValue.isString ? jsValue.toString : @"";
    [[HMWebSocket sharedInstance] openWithWSUrl:wsUrl];
}

+ (void)__close:(JSValue *)jsCode reason:(JSValue *)jsReason
{
    NSInteger code = jsCode.isNumber ? jsCode.toInt32 : SRStatusCodeNormal;
    NSString *reason = jsReason.isString ? jsReason.toString : nil;
    [[HMWebSocket sharedInstance] closeWithCode:code reason:reason];
}

+ (void)__send:(JSValue *)jsValue
{
    NSString *text = jsValue.isString ? jsValue.toString : nil;
    [[HMWebSocket sharedInstance] sendWithText:text];
}

#pragma mark - Private

+ (instancetype)sharedInstance
{
    static id sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}

#pragma mark - web socket

- (void)close
{
    [self.webSocket close];
    self.webSocket.delegate = nil;
    self.webSocket = nil;
}

- (void)closeWithCode:(NSInteger)code reason:(NSString *)reason
{
    [self.webSocket closeWithCode:code reason:reason];
    self.webSocket.delegate = nil;
    self.webSocket = nil;
}

- (void)openWithWSUrl:(NSString *)wsUrl
{
    NSURL *URL = wsUrl.length > 0 ? [NSURL URLWithString:wsUrl] : nil;
    if (URL) {
        self.webSocket = [[SRWebSocket alloc] initWithURL:URL];
        self.webSocket.delegate = self;
        [self.webSocket open];
    } else {
        HMExecOnMainQueue(^{
            HM_SafeRunBlock(self.errorCallback,@[@"WebSocket URL is nil"]);
        });
    }
}

- (void)sendWithText:(NSString *)text
{
    if (text.length == 0) {
        return;
    }
    [self.webSocket send:text];
}

#pragma mark - SRWebSocketDelegate

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message
{
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.messageCallback,@[message?:@""]);
    });
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket
{
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.openCallback,@[]);
    });
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error
{
    NSString *errorMsg = HMJSONEncode(error.userInfo) ?: @"WebSocket did fail";
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.errorCallback,@[errorMsg]);
    });
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean
{
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.closeCallback,@[@(code),reason?:@""]);
    });
}

@end
