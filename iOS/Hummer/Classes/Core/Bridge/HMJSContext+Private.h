//
//  HMJSContext+Private.h
//  Hummer
//
//  Created by didi on 2022/3/14.
//

#import "HMJSContext.h"
#import "HMBaseValue.h"
#import "HMJSContext+PrivateVariables.h"
NS_ASSUME_NONNULL_BEGIN

@interface HMJSContext (Private)

- (void)didRenderPage:(HMBaseValue *)page nativeView:(UIView *)view;

/// 根据 上下文 获取当前namespace，如果 当前不在 JS 执行上下文，则返回默认 namespace
+ (NSString *)getNamespace;
@end

NS_ASSUME_NONNULL_END
