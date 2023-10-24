//
//  HMJSContext+PrivateVariables.h
//  Hummer
//
//  Created by didi on 2022/3/29.
//

#import "HMJSContext.h"

NS_ASSUME_NONNULL_BEGIN
@class HMBaseValue;
@interface HMJSContext ()
@property (nonatomic, assign) BOOL didCallRender;

- (void)_didRenderPage:(HMBaseValue *)page nativeView:(UIView *)view;

- (void)_setNotifyCenter:(HMBaseValue *)notifyCenter nativeValue:(HMNotifyCenter *)nativeNotifyCenter;
@end

NS_ASSUME_NONNULL_END
