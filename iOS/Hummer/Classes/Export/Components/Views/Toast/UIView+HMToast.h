//
//  UIView+HMToast.h
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HMToastView.h"

NS_ASSUME_NONNULL_BEGIN

@interface UIView (HMToast) <HMToastViewDelegate>

/** toast在window的底部展示，时长单位秒 */
- (HMToastView *)hm_showToastWithText:(NSString *)text duration:(NSTimeInterval)duration;

- (HMToastView *)hm_showToastWithView:(UIView *)view duration:(NSTimeInterval)duration;

- (void)hm_hideToast:(BOOL)animated;

@end

NS_ASSUME_NONNULL_END
