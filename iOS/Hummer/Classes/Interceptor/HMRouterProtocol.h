//
//  HMRouterProtocol.h
//  Pods
//
//  Created by didi on 2020/4/8.
//

#ifndef HMRouterProtocol_h
#define HMRouterProtocol_h

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class HMNavigatorPageInfo;

@protocol HMRouterProtocol <NSObject>
@optional

/// 自定义方式打开视图控制器
///
/// @return 返回YES表示处理，返回NO表示不处理;
///
- (BOOL)handleOpenViewController:(__kindof UIViewController *)viewController pageInfo:(HMNavigatorPageInfo *)pageInfo;

- (BOOL)handlePopWithViewController:(nullable UIViewController *)viewController animated:(BOOL)animated;

- (BOOL)handlePopToRootWithParams:(NSDictionary *)params;

- (BOOL)handlePopBackWithCount:(NSUInteger)count params:(NSDictionary *)params;

/// 兼容老版(注解)拦截器，新版(HMConfigEntryManager)拦截器不需要实现如下协议。
- (BOOL)handlePopToRootWithAnimated:(BOOL)animated DEPRECATED_MSG_ATTRIBUTE("使用 - handlePopToRootWithParams: 替代");

- (BOOL)handlePopBackWithCount:(NSUInteger)count animated:(BOOL)animated DEPRECATED_MSG_ATTRIBUTE("使用 + handlePopBackWithCount:params: 替代");

@end

NS_ASSUME_NONNULL_END

#endif /* HMRouterProtocol_h */
