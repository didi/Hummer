//
//  HMWebNetSocket.m
//  Hummer
//
//  Copyright © 2021年 didi. All rights reserved.
//

#import "HMWebNetSocket.h"
#import "HMSRWebSocket.h"
#import "HMExportManager.h"
#import "HMWebSocketProtocol.h"
#import "HMURLSessionWebSocket.h"
#import "HMBaseExecutorProtocol.h"
#import "HMBaseValue.h"
#import "NSString+HMConvertible.h"
#import "HMUtility.h"
#import <Hummer/NSObject+Hummer.h>

NSString * const HMWebCloseEventName   = @"close";
NSString * const HMwebOpenEventName    = @"open";
NSString * const HMWebErrorEventName   = @"error";
NSString * const HMWebMessageEventName = @"message";

@interface HMWebNetSocket() <HMWebSocketDelegate>

@property (nonatomic, strong)id <HMWebSocketAdaptor> webSocket;

@property (nonatomic, copy) HMFunctionType openCallBack;
@property (nonatomic, copy) HMFunctionType closeCallBack;
@property (nonatomic, copy) HMFunctionType errorCallBack;
@property (nonatomic, copy) HMFunctionType messageCallBack;


@end

@implementation HMWebNetSocket

HM_EXPORT_CLASS(WebNetSocket, HMWebNetSocket)

//设置回调
HM_EXPORT_METHOD(onopen, __onopen:)
HM_EXPORT_METHOD(onclose, __onclose:)
HM_EXPORT_METHOD(onerror, __onerror:)
HM_EXPORT_METHOD(onmessage, __onmessage:)

//method 方法
HM_EXPORT_METHOD(close, __close:reason:)
HM_EXPORT_METHOD(send, __send:)

//监听事件
HM_EXPORT_METHOD(addEventListener, __addEventListener: callEventBack:)

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    self = [super initWithHMValues:values];
    self.webSocket = [[HMSRWebSocket alloc]init];
    self.webSocket.delegate = self;
    
    HMBaseValue * value = values.firstObject;
    if (value && value.isString) {
        NSString *wsUrl = value.toString;
        [self WebSocket:wsUrl];
    }
    
    return self;
}


- (void)__onopen:(HMFunctionType)openCallBack {
    self.openCallBack = openCallBack;
}

- (void)__onclose:(HMFunctionType)closeCallBack {
    self.closeCallBack = closeCallBack;
}

- (void)__onerror:(HMFunctionType)errorCallBack {
    self.errorCallBack = errorCallBack;
}

- (void)__onmessage:(HMFunctionType)messageCallBack {
    self.messageCallBack = messageCallBack;
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

- (void)__addEventListener:(HMBaseValue *)jsValue callEventBack:(HMFunctionType)callEventBack {
    NSString *eventName = jsValue.isString ? jsValue.toString : nil;
    [self addEventListener:eventName callEventBack:callEventBack];

}


#pragma mark - Private

- (void)WebSocket:(NSString *)wsUrl {
    NSURL *URL = wsUrl.length > 0 ? [NSURL URLWithString:wsUrl] : nil;
    if (URL) {
        [self.webSocket openWithWSUrl:URL];
    } else {
        HMExecOnMainQueue(^{
            HM_SafeRunBlock(self.errorCallBack, @[@"WebSocket URL is nil"]);
        });
    }
}


#pragma mark - web socket

- (void)close {
    [self.webSocket close:1000 reason:nil];
     self.webSocket.delegate = nil;
     self.webSocket = nil;
}

- (void)closeWithCode:(NSInteger)code reason:(NSString *)reason {
    [self.webSocket close:code reason:reason];
    self.webSocket.delegate = nil;
    self.webSocket = nil;
}

- (void)sendWithText:(NSString *)text {
    if (text.length == 0) {
        return;
    }
    [self.webSocket send:text];
}

- (void)addEventListener:(NSString *)event callEventBack:(HMFunctionType)callEventBack {
    if ([event isEqualToString:HMwebOpenEventName]) {
        self.openCallBack = callEventBack;
    }else if([event isEqualToString:HMWebMessageEventName]) {
        self.messageCallBack = callEventBack;
    }else if([event isEqualToString:HMWebErrorEventName]) {
        self.errorCallBack = callEventBack;
    }else if([event isEqualToString:HMWebCloseEventName]) {
        self.closeCallBack = callEventBack;
    }
    
}

#pragma mark - SRWebSocketDelegate
- (void)webSocket:(id<HMWebSocketAdaptor>)webSocket didReceiveMessage:(id)message {
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.messageCallBack, @[message ?:@""]);
    });
}

- (void)webSocket:(id<HMWebSocketAdaptor>)webSocket didFailWithError:(NSError *)error {
    NSString *errorMsg = HMJSONEncode(error.userInfo) ?: @"WebSocket did fail";
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.errorCallBack, @[errorMsg]);
    });
}

- (void)webSocketDidOpen:(id<HMWebSocketAdaptor>)webSocket {
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.openCallBack, @[]);
    });
}

- (void)webSocket:(id<HMWebSocketAdaptor>)webSocket didCloseWithCode:(NSInteger)code reason:(id<HMStringDataConvertible>)reason wasClean:(BOOL)wasClean {
    HMExecOnMainQueue(^{
        HM_SafeRunBlock(self.closeCallBack,@[@(code),[reason hm_asString]?:@""]);
    });
}


@end
