//
//  HMAnimationManager.h
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import <Foundation/Foundation.h>
#import "HMViewAnimation.h"
NS_ASSUME_NONNULL_BEGIN

@interface HMAnimationManager : NSObject

+ (void)addAnimation:(id<HMViewAnimation>)animation;

+ (void)notifyStartAnimation;
@end

NS_ASSUME_NONNULL_END
