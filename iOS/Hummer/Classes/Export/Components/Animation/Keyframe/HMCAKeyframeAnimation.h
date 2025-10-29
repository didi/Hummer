//
//  HMKeyFrameAnimation.h
//  Hummer
//
//  Created by didi on 2021/2/22.
//

#import <Foundation/Foundation.h>
#import "HMCAAnimation.h"

NS_ASSUME_NONNULL_BEGIN
@interface HMCAKeyframeAnimationInfo : NSObject<HMCAAnimationInfo>


@property(nullable, copy) NSArray *values;
@property(nullable, copy) NSArray<NSNumber *> *keyTimes;

@end


@interface HMCAKeyframeAnimation : HMCAAnimation<HMAnimator>


@end

NS_ASSUME_NONNULL_END
