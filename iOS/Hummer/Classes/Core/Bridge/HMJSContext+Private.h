//
//  HMJSContext+Private.h
//  Hummer
//
//  Created by didi on 2022/3/14.
//

#import "HMJSContext.h"
#import "HMBaseValue.h"
NS_ASSUME_NONNULL_BEGIN
@class HMViewComponent;
@interface HMJSContext (Private)

- (void)didRenderPage:(HMBaseValue *)page nativeView:(HMViewComponent *)view;
@end

NS_ASSUME_NONNULL_END
