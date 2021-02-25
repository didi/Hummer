//
//  HMBasicAnimationWapper.h
//  Hummer
//
//  Created by didi on 2021/2/22.
//

#import <Foundation/Foundation.h>
#import "HMAnimator.h"
#import "HMBasicAnimation.h"
#import "HMCABasicAnimation.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMBasicAnimationWapper : NSObject<HMAnimator>

@property (nonatomic, strong) HMCABasicAnimation *realAnimator;
@end

NS_ASSUME_NONNULL_END
