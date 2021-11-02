//
//  HMDebugService.h
//  Hummer
//
//  Created by didi on 2021/10/25.
//

#import <Foundation/Foundation.h>
#import <HMURLConvertible.h>
#import <NSString+Hummer.h>

NS_ASSUME_NONNULL_BEGIN
/**
 * 考虑到 集成APP 的场景，hummer 没用使用 编译期写入 debug ip 的方案。
 */

typedef void(^HMDebugServiceDevPagesCallBack)(NSArray *);

@interface HMDebugService : NSObject

+ (instancetype)sharedService;

// 显示指定 debug 服务地址。注意，一旦指定将忽略 guessDebugHostWithDevUrl。
// 手动指定，所以忽略 dev/pages/list 判断
- (void)setDebugServiceHost:(NSString *)debugHost;

// 通过 dev/pages/list 判断是否为 debug host。
- (NSArray *)guessDebugHostWithDevUrl:(id<HMURLConvertible>)devUrl autoConnect:(BOOL)autoConnect;

- (NSArray *)getDevPages:(NSNumber *)port;
- (void)getDevPages:(NSNumber *)port asyncCallback:(HMDebugServiceDevPagesCallBack)callback;

- (BOOL)shouldWaitForDebugWithScriptUrl:(id<HMURLConvertible>)scriptUrl;

- (void)startDebugConnection;
- (void)stopDebugConnection;

@end

NS_ASSUME_NONNULL_END
