//
//  HMApplicationRouterProtocol.h
//  Hummer
//
//  Created by didi on 2023/5/24.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
/// 应用间跳转
@protocol HMApplicationRouterProtocol <NSObject>

/// 拦截 UIApplication openUrl, return YES 则不使用系统跳转行为
- (BOOL)handleOpenUrl:(NSURL *)url;
@end

NS_ASSUME_NONNULL_END
