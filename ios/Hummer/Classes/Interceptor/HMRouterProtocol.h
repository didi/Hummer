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

@end

NS_ASSUME_NONNULL_END

#endif /* HMRouterProtocol_h */
