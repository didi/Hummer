//
//  HMViewPagerPageAnimator.h
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import <UIKit/UIKit.h>
#import "HMViewPagerLayoutAnimator.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMViewPagerPageAnimator : NSObject <HMViewPagerLayoutAnimator>

@property (nonatomic) CGFloat scaleRate;

@property (nonatomic) CGFloat minAlpha;

@property (nonatomic) CGFloat itemSpacing;

@end

NS_ASSUME_NONNULL_END
