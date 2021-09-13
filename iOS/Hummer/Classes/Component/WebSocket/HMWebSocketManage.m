//
//  HMWebSocketManage.m
//  Hummer
//
//  Created by wzp on 2021/9/8.
//

#import "HMWebSocketManage.h"
#import "HMWebSocket.h"
#import "HMBaseExecutorProtocol.h"
/*
 * 单例的数组 或者 set 里面存放所有 打开的 WebSocket 和他们各自的回调方法。
 */
@interface HMWebSocketManage ()
@property(nonatomic, strong)NSMutableArray * webSocketSet;
@end



@implementation HMWebSocketManage

- (instancetype)init {
    if (self = [super init]) {
        self.webSocketSet =  [NSMutableArray set];
    }
    return self;
}


#pragma  mark - public-

- (void)addWebSocket:(HMWebSocket *)webScoket {
    if ([webScoket isKindOfClass:[HMWebSocket class]]) {
        [self.webSocketSet addObject:webScoket];
    }
}

- (void)removeAllWebSocket {
    if (!self.webSocketSet.count) {
        return;
    }
    
    [self.webSocketSet enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        HMWebSocket *websocket =  (HMWebSocket *)obj;
        [websocket close];
        [websocket clearAllBack];
    }];
    
    [self.webSocketSet removeAllObjects];
}

- (void)removeWebSocket:(HMWebSocket *)webScoket {
    if (![self.webSocketSet containsObject: webScoket]) {
        return;
    }
    
    if ([webScoket isKindOfClass:[HMWebSocket class]]) {
        [self.webSocketSet removeObject:webScoket];
        [webScoket close];
        [webScoket clearAllBack];
        webScoket = nil;
    }
}



@end
