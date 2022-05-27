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
@end

NS_ASSUME_NONNULL_END
