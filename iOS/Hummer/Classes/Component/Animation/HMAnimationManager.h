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
 *                         view.animationMap
 *                        /         |        \
 *                       /          |         \
 *                   HMAnimator  HMAnimator  ...
 *                      /           |         \
 *   HMCAAnimation(keyframe/basic)  ...
 *                   /
 *      @[info:CAAnimation]
 */


@interface HMAnimationManager : NSObject

+ (void)addAnimation:(id<HMAnimator>)animation;

+ (void)removeAnimation:(id<HMAnimator>)animation;

+ (void)notifyStartAnimation;

@end

NS_ASSUME_NONNULL_END
