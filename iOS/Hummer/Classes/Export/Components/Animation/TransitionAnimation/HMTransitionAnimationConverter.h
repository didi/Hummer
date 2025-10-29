//
//  HMTransitionAnimationConverter.h
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <Foundation/Foundation.h>
#import "HMViewAnimation.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMTransitionAnimationConverter : NSObject

/// 返回style动画属性名与basic动画属性名的映射
+ (NSDictionary <NSString *, NSString *> *)transformBasicAnimationMap;

/// 解析style transition中动画属性及其动画duration
/// @param propertiesStr transition-property
/// @param durationsStr transition-duration
+ (NSDictionary <NSString *, NSNumber *> *)convertProperties:(NSString *)propertiesStr durations:(NSString *)durationsStr;

/// 将style中解析到的动画属性及值，转换成basicAnimation需要的值
/// @param animations style中解析到的动画属性及值
+ (NSDictionary <NSString *, NSObject *> *)convertStyleToAnimations:(NSDictionary <NSString *, NSObject *> *)animations;

@end

NS_ASSUME_NONNULL_END
