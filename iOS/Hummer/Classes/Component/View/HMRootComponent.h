//
//  HMRootComponent.h
//  Hummer
//
//  Created by didi on 2022/6/9.
//

#import "HMViewComponent.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMRootComponent : HMViewComponent

@property (nonatomic, assign) CGSize availableSize;

- (instancetype)initWithNativeView:(UIView *)view;
@end

NS_ASSUME_NONNULL_END
