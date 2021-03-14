//
//  HMTransitionAnimation.h
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <Foundation/Foundation.h>
#import "HMViewAnimation.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMTransitionAnimation : NSObject

/// 动画演示时间
@property (nonatomic, strong) NSNumber *delay;

/// 动画过度类型
@property (nonatomic, copy) NSString *animationType;

/// 动画作用的view
@property (nonatomic, weak) UIView *animatedView;

/// 记录了动画属性及对应动画时间 @{@"transform": @2}
@property (nonatomic, copy) NSDictionary <NSString *, NSNumber *> *needAnimations;

- (instancetype)init NS_UNAVAILABLE;

- (instancetype)initWithTransitions:(NSDictionary <NSString *, NSObject *> *)transitions view:(UIView *)view NS_DESIGNATED_INITIALIZER;

/// 将style 中解析出来的动画属性及值添加到动画中
/// @param animations  动画属性及属性值
- (void)addAnimations:(NSDictionary <NSString *, NSObject *> *)animations;

@end

NS_ASSUME_NONNULL_END
