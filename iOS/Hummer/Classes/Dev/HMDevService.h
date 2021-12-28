//
//  HMDevService.h
//  Hummer
//
//  Created by didi on 2021/12/24.
//

#import <Foundation/Foundation.h>
#import <HMURLConvertible.h>
#import <NSString+Hummer.h>
#import <Hummer/HMDevGlobalWebSocket.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMDevServiceSession : NSObject

- (void)requesWithUrl:(id<HMURLConvertible>)url completionHandler:(void(^)(id _Nullable response, NSError * _Nullable error))callback;
@end

// hummer cli dev service
@interface HMDevService : NSObject
@property (nonatomic, strong, readonly) HMDevServiceSession *cliSession;

+ (instancetype)sharedService;
- (void)closeWebSocket:(HMDevGlobalWebSocket *)webSocket;
- (nullable HMDevLocalConnection *)getLocalConnection:(id<HMURLConvertible>)pageUrl;
@end

NS_ASSUME_NONNULL_END
