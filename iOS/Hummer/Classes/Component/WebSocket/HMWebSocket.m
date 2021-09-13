//
//  HMWebSocket.m
//  Hummer
//
//  Copyright © 2021年 didi. All rights reserved.
//

#import "HMWebSocket.h"
#import "HMExportManager.h"
#import "HMBaseExecutorProtocol.h"
#import "HMBaseValue.h"
#import "NSString+HMConvertible.h"
#import "HMUtility.h"
#import <Hummer/NSObject+Hummer.h>
#import "HMWebSocketManage.h"
#import <SocketRocket/SRWebSocket.h>
#import "NSData+HMConvertible.h"
#import "NSString+HMConvertible.h"

@interface HMWebSocket() <SRWebSocketDelegate>

@property (nonatomic, strong) SRWebSocket *webSocket;

@property (nonatomic, copy, nullable) HMFunctionType openCallBack;
@property (nonatomic, copy, nullable) HMFunctionType closeCallBack;
@property (nonatomic, copy, nullable) HMFunctionType errorCallBack;
@property (nonatomic, copy, nullable) HMFunctionType messageCallBack;


@end

@implementation HMWebSocket

HM_EXPORT_CLASS(WebSocket, HMWebSocket)

//设置回调
HM_EXPORT_METHOD(onopen, __onopen:)
HM_EXPORT_METHOD(onclose, __onclose:)
HM_EXPORT_METHOD(onerror, __onerror:)
HM_EXPORT_METHOD(onmessage, __onmessage:)

//method 方法
HM_EXPORT_METHOD(close, __close:reason:)
HM_EXPORT_METHOD(send, __send:)

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    self = [super initWithHMValues:values];
    HMBaseValue * value = values.firstObject;
    if (value && value.isString) {
        NSString *wsUrl = value.toString;
        [self webSocket:wsUrl];
    }
    return self;
}


- (void)__onopen:(HMFunctionType)openCallBack {
    if(self.webSocket){
        self.openCallBack = openCallBack;
    }
}

- (void)__onclose:(HMFunctionType)closeCallBack {
    if(self.webSocket){
        self.closeCallBack = closeCallBack;
    }
}

- (void)__onerror:(HMFunctionType)errorCallBack {
    if(self.webSocket){
        self.errorCallBack = errorCallBack;
    }
}

- (void)__onmessage:(HMFunctionType)messageCallBack {
    if(self.webSocket){
        self.messageCallBack = messageCallBack;
    }
}


- (void)__close:(HMBaseValue *)jsCode reason:(HMBaseValue *)jsReason {
    NSInteger code = jsCode.isNumber ? jsCode.toNumber.intValue : 1000;
    NSString *reason = jsReason.isString ? jsReason.toString : nil;
    [self closeWithCode:code reason:reason];
}

- (void)__send:(HMBaseValue *)jsValue {
    NSString *text = jsValue.isString ? jsValue.toString : nil;
    [self sendWithText:text];
}


#pragma mark - Private

- (void)webSocket:(NSString *)wsUrl {
    NSURL *URL = wsUrl.length > 0 ? [NSURL URLWithString:wsUrl] : nil;
    if (URL) {
        self.webSocket = [[SRWebSocket alloc] initWithURL:wsUrl];
        self.webSocket.delegate = self;
        [self.webSocket open];
    }
    if (!self.webSocket) {
        HMAssert(!self.webSocket, @"webSocket alloc fail");
    }else {
        [[NSNotificationCenter defaultCenter]postNotificationName:HMNotificationNewWebSocket object:self];
    }
}


#pragma mark - web socket

- (void)closeWithCode:(NSInteger)code reason:(NSString *)reason {
    [self.webSocket closeWithCode:code reason:[reason hm_asString]];
    self.webSocket.delegate = nil;
    self.webSocket = nil;
}

- (void)sendWithText:(NSString *)text {
    if (text.length == 0) {
        return;
    }
    [self.webSocket send:text];
}


#pragma  mark - public
- (void)clearAllBack {
    self.webSocket = nil;
    self.openCallBack = nil;
    self.closeCallBack = nil;
    self.errorCallBack = nil;
    self.messageCallBack = nil;
}

- (void)close {
    [self.webSocket closeWithCode:1000 reason:nil];
}

#pragma mark - SRWebSocketDelegate

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message {
    HMSafeMainThread(^{
        HM_SafeRunBlock(self.messageCallBack, @[message ?:@""]);
    });
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket {
    HMSafeMainThread(^{
        HM_SafeRunBlock(self.openCallBack, @[]);
    });
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error {
    HMSafeMainThread(^{
        HM_SafeRunBlock(self.errorCallBack, @[]);
    });
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean {
    HMSafeMainThread(^{
        HM_SafeRunBlock(self.closeCallBack,@[@(code),[reason hm_asString]?:@""]);
    });
}

@end

