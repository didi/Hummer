//
//  HMCABasicAnimation.h
//  Hummer
//
//  Created by didi on 2021/2/22.
//

#import <Foundation/Foundation.h>
#import "HMCAAnimation.h"
#import "HMAnimator.h"

NS_ASSUME_NONNULL_BEGIN
//基于 CoreAnimation 的动画实现。在UIView Animation 某些场景下(repeat + rotation 180+) 实现比较困，因此切换实现

/**
 *      HMCABasicAnimation
 *      /         |        \
 *     /          |         \
 *  H17Info    H17Info      ...
 *
 */

@interface HMCABasicAnimationInfo : NSObject<HMCAAnimationInfo>

@property (nonatomic, strong) id fromValue;
@property (nonatomic, strong) id toValue;

@end

@interface HMCABasicAnimation : HMCAAnimation<HMAnimator>


@end

NS_ASSUME_NONNULL_END
