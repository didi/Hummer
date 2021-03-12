//
//  HMAnimationManager.h
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import <Foundation/Foundation.h>
#import "HMAnimator.h"

NS_ASSUME_NONNULL_BEGIN

/**
 *      HMAnimationManager
 *      /         |        \
 *     /          |         \
 *  HMAnimator  HMAnimator  ...
 *  
 */


@interface HMAnimationManager : NSObject

+ (void)addAnimation:(id<HMAnimator>)animation forView:(UIView *)view key:(nullable NSString *)animationKey;

+ (void)removeAnimationForView:(UIView *)view key:(nonnull NSString *)animationKey;

+ (void)notifyStartAnimation;

@end

NS_ASSUME_NONNULL_END
