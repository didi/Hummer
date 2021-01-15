//
//  HMWebSocket.m
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMWebSocket.h"
#import "HMExportManager.h"
#import "HMUtility.h"
#import "HMBaseExecutorProtocol.h"
#import "HMBaseValue.h"
#import "HMWebSocketProtocol.h"
#import "HMSRWebSocket.h"
#import "HMURLSessionWebSocket.h"
#import "NSString+HMConvertible.h"
#import "NSData+HMConvertible.h"

//Close code: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent

@interface HMWebSocket () <HMWebSocketDelegate>

@property (nonatomic, strong) id<HMWebSocketAdaptor> webSocket;

@property (nonatomic, copy) HMFunctionType openCallback;
@property (nonatomic, copy) HMFunctionType closeCallback;
@property (nonatomic, copy) HMFunctionType errorCallback;
@property (nonatomic, copy) HMFunctionType messageCallback;

@end

@implementation HMWebSocket

#pragma mark - Export

HM_EXPORT_CLASS(WebSocket, HMWebSocket)

HM_EXPORT_CLASS_METHOD(onOpen, __onOpen:)
HM_EXPORT_CLASS_METHOD(onClose, __onClose:)
HM_EXPORT_CLASS_METHOD(onError, __onError:)
HM_EXPORT_CLASS_METHOD(onMessage, __onMessage:)

HM_EXPORT_CLASS_METHOD(connect, __connect:)
HM_EXPORT_CLASS_METHOD(close, __close:reason:)
HM_EXPORT_CLASS_METHOD(send, __send:)

+ (void)__onOpen:(HMFunctionType)openCallback
{
    [HMWebSocket sharedInstance].openCallback = openCallback;
}

+ (void)__onClose:(HMFunctionType)closeCallback
{
    [HMWebSocket sharedInstance].closeCallback = closeCallback;
}

+ (void)__onError:(HMFunctionType)errorCallback
{
    [HMWebSocket sharedInstance].errorCallback = errorCallback;
}

+ (void)__onMessage:(HMFunctionType)messageCallback
{
    [HMWebSocket sharedInstance].messageCallback = messageCallback;
}

+ (void)__connect:(HMBaseValue *)jsValue
{
    NSString *wsUrl = jsValue.isString ? jsValue.toString : @"";
    [[HMWebSocket sharedInstance] openWithWSUrl:wsUrl];
}

+ (void)__close:(HMBaseValue *)jsCode reason:(HMBaseValue *)jsReason
{
    NSInteger code = jsCode.isNumber ? jsCode.toNumber.integerValue : 1000;
    NSString *reason = jsReason.isString ? jsReason.toString : nil;
    [[HMWebSocket sharedInstance] closeWithCode:code reason:reason];
}

+ (void)__send:(HMBaseValue *)jsValue
{
    NSString *text = jsValue.isString ? jsValue.toString : nil;
    [[HMWebSocket sharedInstance] sendWithText:text];
}

#pragma mark - Private

+ (instancetype)sharedInstance
{
    static HMWebSocket *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[HMWebSocket alloc] init];
        sharedInstance.webSocket = [[HMSRWebSocket alloc] init];
        sharedInstance.webSocket.delegate = sharedInstance;
    });
    return sharedInstance;
}

#pragma mark - web socket

- (void)close
{
    [self.webSocket close:1000 reason:nil];
    self.webSocket.delegate = nil;
    self.webSocket = nil;
}

- (void)closeWithCode:(NSInteger)code reason:(NSString *)reason
{
    [self.webSocket close:code reason:reason];
    self.webSocket.delegate = nil;
    self.webSocket = nil;
}

- (void)openWithWSUrl:(NSString *)wsUrl
{
    NSURL *URL = wsUrl.length > 0 ? [NSURL URLWithString:wsUrl] : nil;
    if (URL) {
        [self.webSocket openWithWSUrl:URL];
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

- (void)webSocket:(id<HMWebSocketAdaptor>)webSocket didReceiveMessage:(id)message{
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.messageCallback,@[message?:@""]);
    });
}

- (void)webSocket:(id<HMWebSocketAdaptor>)webSocket didFailWithError:(NSError *)error{
    NSString *errorMsg = HMJSONEncode(error.userInfo) ?: @"WebSocket did fail";
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.errorCallback,@[errorMsg]);
    });
}

- (void)webSocketDidOpen:(id<HMWebSocketAdaptor>)webSocket{
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.openCallback,@[]);
    });
}

- (void)webSocket:(id<HMWebSocketAdaptor>)webSocket didCloseWithCode:(NSInteger)code reason:(id<HMStringDataConvertible>)reason wasClean:(BOOL)wasClean{
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.closeCallback,@[@(code),[reason hm_asString]?:@""]);
    });

}


@end
