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

- (void)_addDestoryBlock:(dispatch_block_t)block DEPRECATED_MSG_ATTRIBUTE("上下文释放时，触发回事任务，后续会被移除");

- (void)_postEvent:(NSString *)eventName data:(nullable NSDictionary *)eventData;
@end

NS_ASSUME_NONNULL_END
